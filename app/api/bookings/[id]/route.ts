import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseServer, type BookingStatus } from "@/lib/supabase";
import { isAdminRequest } from "@/lib/auth";

export const runtime = "nodejs";

const STATUS = ["new", "confirmed", "in_progress", "completed", "cancelled"] as const;
const Patch = z.object({
  status: z.enum(STATUS).optional(),
  notes: z.string().max(2000).optional(),
});

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = Patch.safeParse(await req.json().catch(() => ({})));
  if (!body.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const updates: Partial<{ status: BookingStatus; notes: string }> = {};
  if (body.data.status) updates.status = body.data.status;
  if (typeof body.data.notes === "string") updates.notes = body.data.notes;

  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from("bookings")
    .update(updates)
    .eq("id", params.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, booking: data });
}
