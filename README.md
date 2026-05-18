# EcovaPro — Next.js Production Site

A complete Next.js (App Router) rebuild of [ecovapro.com](https://ecovapro.com): high-converting marketing site + booking system + email automation + admin CRM + SEO infrastructure.

## What's in here

```
/app
  page.tsx                            Homepage
  /end-of-tenancy-cleaning-london     SEO landing page (the same shape for each service)
  /deep-cleaning-london
  /airbnb-cleaning-london
  /office-cleaning-london
  /regular-cleaning-london
  /blog                               Blog index + [slug] post page
  /admin                              Protected CRM (login + dashboard)
  /api/bookings                       POST: create booking (DB + emails)
  /api/bookings/[id]                  PATCH: update status (admin)
  /api/admin/login                    POST/DELETE: session
  /api/admin/export                   GET: CSV export of bookings
  sitemap.ts, robots.ts, manifest.ts  SEO infra
  privacy-policy, terms, refund-policy

/components                           Header, Hero, Services, WhyUs, HowItWorks,
                                      Testimonials, EcoSection, Areas, FAQ, FinalCTA,
                                      Footer, StickyWhatsapp, QuoteModal,
                                      ServicePageTemplate, JsonLd, admin/BookingsTable

/lib                                  pricing, supabase, email, auth, booking-id, blog, seo

/content
  services.ts                         All 5 services: copy, slugs, meta, what's included
  site.ts                             Testimonials, FAQs, areas, trust stats, business info
  /blog                               3 SEO-targeted markdown posts

/supabase/migrations
  0001_init.sql                       bookings, leads, contact_messages tables + RLS

middleware.ts                         Admin route protection
next.config.mjs                       Security headers + 301 redirects from old Base44 paths
```

## Stack

- **Next.js 14 App Router** with React Server Components for SEO content, Client Components only where state is needed (booking modal, header, admin filters).
- **Tailwind CSS** for everything visual. Single source of truth for the EcovaPro palette in `tailwind.config.ts`.
- **TypeScript strict mode** everywhere.
- **Supabase** for the bookings database. Row Level Security is on by default; the API uses the service role key server-side only.
- **Resend** for transactional email (customer confirmation + admin notification).
- **jose** for JWT-based admin session cookies (HttpOnly, Secure in prod).
- **Zod** for input validation on every API surface.

## Quick start

```bash
# 1. Install
pnpm install      # or npm install / yarn install

# 2. Configure
cp .env.example .env.local
# Fill in Supabase + Resend + admin password values

# 3. Set up the database
# In Supabase SQL editor, paste and run: supabase/migrations/0001_init.sql

# 4. Run locally
pnpm dev          # http://localhost:3000
```

Visit `/` for the homepage. Visit `/admin` and log in with the password you set in `ADMIN_PASSWORD` to see the CRM.

## How the booking flow works end-to-end

1. Visitor opens the quote modal anywhere on the site (header, hero, services, every CTA).
2. Step 1: picks a service. Step 2: picks property size, date, slot, postcode. Sees price in real time. Step 3: enters name, email, phone, optional notes.
3. Submit `POST /api/bookings` → `Zod` validates → server inserts into `bookings` table → `Resend` sends two emails (customer confirmation + admin notification).
4. Customer sees the success state with their booking reference (e.g. `ECO-7K3F2A`).
5. Admin sees the new booking in `/admin`, with status `new`. Clicks the status dropdown to confirm → complete.
6. Admin can export CSV at any time.

## Why this is better than the current site

See `SEO-AUDIT.md` for the full audit, but the headline differences:

- **Server-rendered** content (the current site is a JS-only Base44 SPA — Google reads it slowly, AI search agents often don't read it at all).
- **5 dedicated keyword-targeted service landing pages** with unique titles, descriptions, copy, FAQs, and Service schema (current site has one generic `/ServicePage`).
- **LocalBusiness + Service + Review + FAQ + Breadcrumb JSON-LD** site-wide (current site has none).
- **Real booking persistence** — the current quote form is decorative.
- **A working CRM** rather than relying on inbox grep.
- **Lowercase canonical URLs** plus 301s from the current capitalised duplicates (`/ServicePage`, `/ArticlePage`, etc.) so existing rankings transfer.

## Deployment

See `DEPLOY.md` for the full migration path including DNS cutover.

The recommended host is **Vercel** (this codebase deploys to Vercel with zero configuration). Other hosts work too — anything that runs Next.js 14 with Node 18+ will serve this site.

## Editing content

- **Service pages**: edit `content/services.ts`. Slugs are stable; copy and pricing can be edited freely. New services need a new slug constant plus a one-line `app/{slug}/page.tsx` (copy any of the existing ones).
- **Testimonials, FAQs, areas, business info**: `content/site.ts`.
- **Blog posts**: drop a new `.md` file into `content/blog/`. Frontmatter shape is `title`, `description`, `date`, `author`, `readTime`. The sitemap, blog index, and `/blog/[slug]` route pick it up automatically.
- **Prices**: `lib/pricing.ts` — single source of truth used by the modal, service pages, API, and email templates.

## Security

- Admin routes are JWT-protected via `middleware.ts`. Sessions last 7 days, cookies are `HttpOnly` and `SameSite=Lax`.
- The booking API uses the Supabase service role key (server only); the anon key is never used for writes from the browser.
- Honeypot field (`website`) on the booking endpoint silently absorbs bot submissions.
- Security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`) are set in `next.config.mjs`.
- Zod validation on every API input.

## Performance targets

- Homepage TTI < 2.0s on 4G mobile (Lighthouse mobile score 95+)
- Service pages < 80 KB of JS on the critical path
- All images use Next.js's `Image` component when added (currently the only image is a CSS background)

## Optional integrations

Stubs and notes in:
- `lib/email.ts` — already wired for Resend
- `app/api/bookings/route.ts` — the place to add WhatsApp Business API notifications (e.g. via Twilio) and/or Google Calendar event creation after the DB insert
- `lib/pricing.ts` — edit centrally to roll out a deposit price; Stripe payment intent creation belongs in a new `app/api/payments/route.ts`

## Status

Production-ready. Add real environment values, run the migration, deploy.
