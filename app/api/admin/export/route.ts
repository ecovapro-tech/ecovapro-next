import { NextResponse } from "next/server";
import { supabaseServer, type BookingRow } from "@/lib/supabase";
import { isAdminRequest } from "@/lib/auth";

export const runtime = "nodejs";

function csvEscape(v: unknown): string {
  if (v === null || v === undefined) return "";
  const s = String(v);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export async function GET(req: Request) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const url = new URL(req.url);
  const status = url.searchParams.get("status");

  const supabase = supabaseServer();
  let q = supabase.from("bookings").select("*").order("created_at", { ascending: false });
  if (status) q = q.eq("status", status);
  const { data, error } = await q;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const rows = (data ?? []) as BookingRow[];
  const headers = [
    "ref", "status", "service", "property_size",
    "preferred_date", "preferred_slot", "estimated_price",
    "customer_name", "customer_email", "customer_phone",
    "postcode", "notes", "source", "created_at",
  ];

  const csv = [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => csvEscape((r as unknown as Record<string, unknown>)[h])).join(",")),
  ].join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="bookings-${new Date().toISOString().split("T")[0]}.csv"`,
    },
  });
}
