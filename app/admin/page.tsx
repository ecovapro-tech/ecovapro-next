import { supabaseServer, type BookingRow } from "@/lib/supabase";
import BookingsTable from "@/components/admin/BookingsTable";

export const dynamic = "force-dynamic";

interface SearchParams {
  status?: string;
  q?: string;
}

export default async function AdminDashboard({ searchParams }: { searchParams: SearchParams }) {
  const supabase = supabaseServer();
  let query = supabase.from("bookings").select("*").order("created_at", { ascending: false }).limit(500);
  if (searchParams.status) query = query.eq("status", searchParams.status);
  if (searchParams.q) {
    const q = searchParams.q.replace(/[%_]/g, "");
    query = query.or(
      `customer_name.ilike.%${q}%,customer_email.ilike.%${q}%,customer_phone.ilike.%${q}%,ref.ilike.%${q}%,postcode.ilike.%${q}%`
    );
  }

  const { data, error } = await query;
  const rows = (data ?? []) as BookingRow[];

  // Top-level stats
  const counts = {
    new:        rows.filter((r) => r.status === "new").length,
    confirmed:  rows.filter((r) => r.status === "confirmed").length,
    in_progress: rows.filter((r) => r.status === "in_progress").length,
    completed:  rows.filter((r) => r.status === "completed").length,
    revenue:    rows.filter((r) => r.status === "completed").reduce((a, r) => a + (r.estimated_price ?? 0), 0),
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif font-black text-2xl md:text-3xl">Bookings</h1>
          <p className="text-gray-500 text-sm mt-1">{rows.length} {rows.length === 1 ? "booking" : "bookings"} shown</p>
        </div>
        <a
          href={`/api/admin/export${searchParams.status ? `?status=${searchParams.status}` : ""}`}
          className="bg-charcoal text-white text-sm font-bold px-4 py-2.5 rounded-lg hover:bg-charcoal/90"
        >
          Export CSV
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        <StatCard label="New"         value={counts.new} />
        <StatCard label="Confirmed"   value={counts.confirmed} />
        <StatCard label="In progress" value={counts.in_progress} />
        <StatCard label="Completed"   value={counts.completed} />
        <StatCard label="Completed £" value={`£${counts.revenue.toLocaleString("en-GB")}`} />
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-4">{error.message}</div>}

      <BookingsTable rows={rows} initialQ={searchParams.q ?? ""} initialStatus={searchParams.status ?? ""} />
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="text-xs uppercase tracking-widest text-gray-500">{label}</div>
      <div className="font-serif font-black text-2xl mt-1 text-charcoal">{value}</div>
    </div>
  );
}
