import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only client using the service role key.
 * NEVER import this from a Client Component.
 */
let _serverClient: SupabaseClient | null = null;
export function supabaseServer(): SupabaseClient {
  if (_serverClient) return _serverClient;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Supabase env vars missing: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  }
  _serverClient = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return _serverClient;
}

/**
 * Anon (browser-safe) client. Not currently used by the booking flow
 * because we POST through /api/bookings, but kept for future features.
 */
export function supabaseAnon(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key, { auth: { persistSession: false } });
}

// ---------- Types ----------
export type BookingStatus = "new" | "confirmed" | "in_progress" | "completed" | "cancelled";

export interface BookingRow {
  id: string;
  ref: string;
  status: BookingStatus;
  service: string;
  property_size: string;
  preferred_date: string | null;
  preferred_slot: string | null;
  estimated_price: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  postcode: string | null;
  notes: string | null;
  source: string | null;
  created_at: string;
  updated_at: string;
}
