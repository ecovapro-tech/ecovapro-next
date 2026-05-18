import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseServer } from "@/lib/supabase";
import {
  SERVICE_KEYS, SIZE_KEYS, ADDON_KEYS, FREQUENCY_KEYS,
  estimatePrice, bedroomsToSize,
  ADDON_LABELS, ADDON_PRICES, FREQUENCY_LABELS,
  type ServiceKey, type SizeKey, type AddonKey, type FrequencyKey,
} from "@/lib/pricing";
import { generateBookingRef } from "@/lib/booking-id";
import { sendBookingEmails } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Body = z.object({
  service:        z.enum(SERVICE_KEYS),
  // Accept either bedrooms (new modal) or property_size (legacy)
  bedrooms:       z.number().int().min(0).max(10).optional(),
  property_size:  z.enum(SIZE_KEYS).optional(),
  addons:         z.array(z.enum(ADDON_KEYS)).optional().default([]),
  frequency:      z.enum(FREQUENCY_KEYS).optional().default("once"),
  urgent:         z.boolean().optional().default(false),
  preferred_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable().optional(),
  preferred_slot: z.string().nullable().optional(),
  customer_name:  z.string().min(2).max(120),
  customer_email: z.string().email().max(160),
  customer_phone: z.string().min(7).max(40),
  postcode:       z.string().max(20).nullable().optional(),
  address:        z.string().max(200).nullable().optional(),
  notes:          z.string().max(2000).nullable().optional(),
  website:        z.string().optional(), // honeypot
});

export async function POST(req: Request) {
  let payload: z.infer<typeof Body>;
  try {
    payload = Body.parse(await req.json());
  } catch (e) {
    return NextResponse.json({ error: "Invalid input.", details: (e as Error).message }, { status: 400 });
  }

  // Honeypot: bots fill this, humans don't.
  if (payload.website?.trim()) {
    return NextResponse.json({ ok: true, ref: "ECO-IGNORED" });
  }

  const service = payload.service as ServiceKey;
  const size: SizeKey = payload.property_size
    ?? (payload.bedrooms !== undefined ? bedroomsToSize(payload.bedrooms) : "1bed");
  const addons    = (payload.addons    ?? []) as AddonKey[];
  const frequency = (payload.frequency ?? "once") as FrequencyKey;
  const urgent    = payload.urgent ?? false;

  const estimated_price = estimatePrice(service, size, addons, frequency, urgent);
  if (estimated_price === null) {
    return NextResponse.json({ error: "Could not estimate price." }, { status: 400 });
  }

  // Serialize extras into the notes field (no DB migration needed)
  const lines: string[] = [];
  if (addons.length > 0)
    lines.push(`Add-ons: ${addons.map((k) => `${ADDON_LABELS[k]} (+£${ADDON_PRICES[k]})`).join(", ")}.`);
  if (frequency !== "once")
    lines.push(`Frequency: ${FREQUENCY_LABELS[frequency]}.`);
  if (urgent)
    lines.push("Urgent / priority booking (+£30).");
  if (payload.address)
    lines.push(`Address: ${payload.address}.`);
  if (payload.notes)
    lines.push(payload.notes);
  const notesField = lines.join("\n").trim() || null;

  const ref = generateBookingRef();
  const supabase = supabaseServer();

  const { error } = await supabase.from("bookings").insert({
    ref,
    status:          "new",
    service,
    property_size:   size,
    preferred_date:  payload.preferred_date  ?? null,
    preferred_slot:  payload.preferred_slot  ?? null,
    estimated_price,
    customer_name:   payload.customer_name,
    customer_email:  payload.customer_email,
    customer_phone:  payload.customer_phone,
    postcode:        payload.postcode ?? null,
    notes:           notesField,
    source:          "website",
  });

  if (error) {
    console.error("[bookings] insert failed", error);
    return NextResponse.json({ error: "Database error. Please call us to book." }, { status: 500 });
  }

  try {
    await sendBookingEmails({
      ref,
      service,
      property_size:  size,
      preferred_date: payload.preferred_date ?? null,
      preferred_slot: payload.preferred_slot ?? null,
      estimated_price,
      customer_name:  payload.customer_name,
      customer_email: payload.customer_email,
      customer_phone: payload.customer_phone,
      postcode:       payload.postcode ?? null,
      notes:          notesField,
    });
  } catch (e) {
    console.error("[bookings] email failed", e);
  }

  return NextResponse.json({ ok: true, ref });
}
