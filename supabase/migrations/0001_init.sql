-- EcovaPro initial schema
-- Run this in the Supabase SQL editor, or via supabase db push if you have the CLI.

create extension if not exists "pgcrypto";

-- ============================================================
-- bookings
-- ============================================================
create table if not exists public.bookings (
  id              uuid primary key default gen_random_uuid(),
  ref             text unique not null,                    -- human-friendly booking ref, e.g. ECO-2A4F3B
  status          text not null default 'new' check (status in ('new','confirmed','in_progress','completed','cancelled')),
  service         text not null,                           -- eot | regular | deep | airbnb | office
  property_size   text not null,                           -- studio | 1bed | 2bed | 3bed | 4bed+
  preferred_date  date,
  preferred_slot  text,                                    -- morning | afternoon | evening | flexible
  estimated_price integer not null,                        -- £ in whole pounds
  customer_name   text not null,
  customer_email  text not null,
  customer_phone  text not null,
  postcode        text,
  notes           text,
  source          text default 'website',                  -- website | phone | whatsapp | referral
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists bookings_status_idx        on public.bookings (status);
create index if not exists bookings_created_at_idx    on public.bookings (created_at desc);
create index if not exists bookings_preferred_date_idx on public.bookings (preferred_date);

-- updated_at trigger
create or replace function public.set_updated_at() returns trigger as $$
begin
  new.updated_at := now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_bookings_updated_at on public.bookings;
create trigger trg_bookings_updated_at before update on public.bookings
for each row execute function public.set_updated_at();

-- ============================================================
-- leads (form starts that never finished, for marketing/remarketing)
-- ============================================================
create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  service       text,
  property_size text,
  email         text,
  phone         text,
  created_at    timestamptz not null default now()
);

-- ============================================================
-- contact_messages (generic enquiries)
-- ============================================================
create table if not exists public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  phone       text,
  subject     text,
  message     text not null,
  created_at  timestamptz not null default now()
);

-- ============================================================
-- Row Level Security
-- We use the service role key from the server only, so RLS can stay strict.
-- ============================================================
alter table public.bookings enable row level security;
alter table public.leads enable row level security;
alter table public.contact_messages enable row level security;

-- Default-deny: no anon access. The server (service role) bypasses RLS.
-- If you ever need anon insert (e.g. direct from browser), add an explicit policy.

-- ============================================================
-- Seed: helpful comment on usage
-- ============================================================
comment on table public.bookings is 'Customer bookings. Created via POST /api/bookings. Managed via /admin.';
comment on column public.bookings.ref is 'Human-friendly reference shown to customer in confirmation email.';
