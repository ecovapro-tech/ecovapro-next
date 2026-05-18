import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseServer } from "@/lib/supabase";
import { SERVICE_KEYS, SIZE_KEYS, estimatePrice, type ServiceKey, type SizeKey } from "@/lib/pricing";
import { generateBookingRef } from "@/lib/booking-id";
import { sendBookingEmails } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Body = z.object({
  service: z.enum(SERVICE_KEYS),
  property_size: z.enum(SIZE_KEYS),
  preferred_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable().optional(),
  preferred_slot: z.string().nullable().optional(),
  customer_name: z.string().min(2).max(120),
  customer_email: z.string().email().max(160),
  customer_phone: z.string().min(7).max(40),
  postcode: z.string().max(20).nullable().optional(),
  notes: z.string().max(2000).nullable().optional(),
  // hidden honeypot — should be empty
  website: z.string().optional(),
});

export async function POST(req: Request) {
  let payload: z.infer<typeof Body>;
  try {
    payload = Body.parse(await req.json());
  } catch (e) {
    return NextResponse.json({ error: "Invalid input.", details: (e as Error).message }, { status: 400 });
  }

  // Honeypot: silently accept and discard if any bot fills it.
  if (payload.website && payload.website.trim().length > 0) {
    return NextResponse.json({ ok: true, ref: "ECO-IGNORED" });
  }

  const service = payload.service as ServiceKey;
  const size = payload.property_size as SizeKey;
  const estimated_price = estimatePrice(service, size);
  if (estimated_price === null) {
    return NextResponse.json({ error: "Could not estimate price." }, { status: 400 });
  }

  const ref = generateBookingRef();
  const supabase = supabaseServer();

  const { error } = await supabase.from("bookings").insert({
    ref,
    status: "new",
    service,
    property_size: size,
    preferred_date: payload.preferred_date ?? null,
    preferred_slot: payload.preferred_slot ?? null,
    estimated_price,
    customer_name: payload.customer_name,
    customer_email: payload.customer_email,
    customer_phone: payload.customer_phone,
    postcode: payload.postcode ?? null,
    notes: payload.notes ?? null,
    source: "website",
  });

  if (error) {
    console.error("[bookings] insert failed", error);
    return NextResponse.json({ error: "Database error. Please call us to book." }, { status: 500 });
  }

  // Best-effort email. Booking already saved, so failures here don't roll back.
  try {
    await sendBookingEmails({
      ref,
      service,
      property_size: size,
      preferred_date: payload.preferred_date ?? null,
      preferred_slot: payload.preferred_slot ?? null,
      estimated_price,
      customer_name: payload.customer_name,
      customer_email: payload.customer_email,
      customer_phone: payload.customer_phone,
      postcode: payload.postcode ?? null,
      notes: payload.notes ?? null,
    });
  } catch (e) {
    console.error("[bookings] email failed", e);
  }

  return NextResponse.json({ ok: true, ref });
}
