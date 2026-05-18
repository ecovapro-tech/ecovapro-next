"use client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { BookingRow, BookingStatus } from "@/lib/supabase";
import { SERVICE_LABELS, SIZE_LABELS, formatGBP, type ServiceKey, type SizeKey } from "@/lib/pricing";

const STATUSES: BookingStatus[] = ["new", "confirmed", "in_progress", "completed", "cancelled"];

const STATUS_STYLE: Record<BookingStatus, string> = {
  new:         "bg-amber-100 text-amber-900",
  confirmed:   "bg-blue-100 text-blue-900",
  in_progress: "bg-indigo-100 text-indigo-900",
  completed:   "bg-emerald-100 text-emerald-900",
  cancelled:   "bg-gray-200 text-gray-700",
};

export default function BookingsTable({
  rows,
  initialQ,
  initialStatus,
}: {
  rows: BookingRow[];
  initialQ: string;
  initialStatus: string;
}) {
  const router = useRouter();
  const [q, setQ] = useState(initialQ);
  const [status, setStatus] = useState(initialStatus);
  const [, startTransition] = useTransition();

  function applyFilters() {
    const sp = new URLSearchParams();
    if (q) sp.set("q", q);
    if (status) sp.set("status", status);
    startTransition(() => router.push(`/admin${sp.toString() ? `?${sp}` : ""}`));
  }

  async function updateStatus(id: string, next: BookingStatus) {
    await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    router.refresh();
  }

  return (
    <>
      <div className="flex flex-wrap gap-3 mb-4 items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") applyFilters(); }}
          placeholder="Search ref, name, email, phone, postcode…"
          className="flex-1 min-w-[240px] px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-green text-sm bg-white"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white"
        >
          <option value="">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button type="button" onClick={applyFilters} className="bg-green text-white text-sm font-bold px-5 py-2.5 rounded-lg">Apply</button>
        {(q || status) && (
          <button type="button" onClick={() => { setQ(""); setStatus(""); startTransition(() => router.push("/admin")); }} className="text-sm text-gray-500 hover:text-charcoal">
            Clear
          </button>
        )}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <Th>Ref</Th>
                <Th>Status</Th>
                <Th>Customer</Th>
                <Th>Service · Size</Th>
                <Th>Date</Th>
                <Th>Price</Th>
                <Th>Created</Th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr><td colSpan={7} className="text-center py-12 text-gray-500">No bookings match these filters.</td></tr>
              )}
              {rows.map((b) => (
                <tr key={b.id} className="border-t border-gray-100">
                  <Td>
                    <span className="font-mono text-xs">{b.ref}</span>
                  </Td>
                  <Td>
                    <select
                      value={b.status}
                      onChange={(e) => updateStatus(b.id, e.target.value as BookingStatus)}
                      className={`text-xs font-semibold px-2 py-1 rounded ${STATUS_STYLE[b.status]} border-0 outline-none`}
                    >
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </Td>
                  <Td>
                    <div className="font-semibold text-charcoal">{b.customer_name}</div>
                    <div className="text-xs text-gray-500">
                      <a className="hover:underline" href={`mailto:${b.customer_email}`}>{b.customer_email}</a>
                      {" · "}
                      <a className="hover:underline" href={`tel:${b.customer_phone}`}>{b.customer_phone}</a>
                      {b.postcode && <span> · {b.postcode}</span>}
                    </div>
                  </Td>
                  <Td>
                    <div>{SERVICE_LABELS[b.service as ServiceKey] ?? b.service}</div>
                    <div className="text-xs text-gray-500">{SIZE_LABELS[b.property_size as SizeKey] ?? b.property_size}</div>
                  </Td>
                  <Td>
                    <div>{b.preferred_date ?? "—"}</div>
                    <div className="text-xs text-gray-500">{b.preferred_slot ?? ""}</div>
                  </Td>
                  <Td><strong>{formatGBP(b.estimated_price)}</strong></Td>
                  <Td>
                    <span className="text-xs text-gray-500">{new Date(b.created_at).toLocaleString("en-GB")}</span>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="text-left text-xs font-bold tracking-wider uppercase px-4 py-3">{children}</th>;
}
function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-3 align-top">{children}</td>;
}
