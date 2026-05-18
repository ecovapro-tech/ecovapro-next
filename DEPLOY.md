# EcovaPro — Deployment Guide

End-to-end migration from the current Base44 site at ecovapro.com to this Next.js codebase, with zero SEO loss. Estimated time: 60–90 minutes.

---

## 0. Prerequisites

- A GitHub account (for the repo).
- A Vercel account (the recommended host — free Hobby tier is fine for launch).
- A Supabase account (free tier is fine).
- A Resend account (free tier sends 100 emails/day, sufficient for early bookings).
- Access to the DNS records for `ecovapro.com`.

---

## 1. Create the Supabase database (5 min)

1. Go to [supabase.com](https://supabase.com), create a new project. Region: London (EU West 2).
2. Open the **SQL Editor** in the left sidebar.
3. Open `supabase/migrations/0001_init.sql` from this repo, copy the entire contents into the SQL editor, click **Run**.
4. Go to **Project Settings → API**. Copy:
   - `Project URL` → this is `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → this is `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → this is `SUPABASE_SERVICE_ROLE_KEY` (keep secret)

---

## 2. Set up Resend for email (5 min)

1. Go to [resend.com](https://resend.com), sign up.
2. Add and verify the `ecovapro.com` domain (one-time DNS records: SPF + DKIM + DMARC).
3. Once verified, **API Keys → Create API Key**. Scope: *Full Access*. Copy.
4. Decide on a sending address — `bookings@ecovapro.com` is recommended.

---

## 3. Push to GitHub (5 min)

```bash
cd ecovapro-next
git init
git add .
git commit -m "Initial commit: production rebuild"
gh repo create ecovapro-next --private --source=. --remote=origin --push
```

---

## 4. Deploy to Vercel (5 min)

1. Go to [vercel.com/new](https://vercel.com/new). Import the GitHub repo.
2. Framework preset: **Next.js** (auto-detected).
3. **Environment Variables** — add every key from `.env.example` with real values.
4. Click **Deploy**. After ~90 seconds you'll have a `*.vercel.app` preview URL.

---

## 5. Smoke test the preview (10 min)

On the preview URL (`https://ecovapro-next-XXXX.vercel.app`):

1. **Homepage loads.** Hero, services, testimonials, FAQ, footer all render.
2. **All five service pages load** at `/end-of-tenancy-cleaning-london`, etc.
3. **Open the quote modal**, complete all three steps, submit. Confirm:
   - Modal shows a booking ref like `ECO-7K3F2A`.
   - A confirmation email arrives at the address you submitted.
   - A notification email arrives at `EMAIL_ADMIN_NOTIFICATIONS`.
   - In Supabase **Table Editor → bookings**, the row exists with status `new`.
4. **Log into `/admin`** with the password you set. The booking appears in the table. Change its status to `confirmed`. Refresh — change persists.
5. **Export CSV** from `/admin`. Open the file, confirm columns are correct.
6. **View source on the homepage.** Confirm:
   - The `<title>` is "Eco-Friendly Cleaning Services London — EcovaPro".
   - The meta description is cleaning-specific.
   - JSON-LD blocks for LocalBusiness and FAQPage are present.
7. Visit `/robots.txt` and `/sitemap.xml`. Both should render correctly.

If any of these fail, fix before cutting over DNS.

---

## 6. Pre-cutover SEO snapshot (10 min)

Before you switch DNS, capture the current state so you can verify nothing was lost:

1. **Google Search Console**: confirm `ecovapro.com` is verified for the current site. Note current impressions, top queries.
2. Export a list of current indexed URLs:
   ```
   site:ecovapro.com
   ```
   Save the results. The 301 redirects in `next.config.mjs` already cover the known Base44 paths (`/ServicePage`, `/ArticlePage`, `/QuotePage`, etc.). If you find additional indexed URLs not in the redirect list, add them.

---

## 7. DNS cutover (5 min)

In Vercel, **Project → Settings → Domains**:

1. Add `ecovapro.com` and `www.ecovapro.com`.
2. Vercel shows the DNS records you need:
   - `A` record on the apex → `76.76.21.21`
   - `CNAME` on `www` → `cname.vercel-dns.com`
3. Update these in your DNS provider. Lower TTLs first if possible (300s) so the change propagates quickly.
4. Vercel auto-provisions SSL via Let's Encrypt within ~60 seconds.

---

## 8. Post-cutover verification (15 min)

Within an hour of DNS propagation:

1. **Re-test the booking flow** on the live `https://ecovapro.com` — exactly as in step 5.
2. **Resubmit the sitemap** to Google Search Console: `https://ecovapro.com/sitemap.xml`.
3. **Request indexing** in Search Console for the homepage and each service page.
4. **Set up Bing Webmaster Tools** — same sitemap.
5. **Configure Google Business Profile** for "EcovaPro" in Finchley:
   - Categories: "House cleaning service", "Cleaners", "Office cleaning service"
   - All five services as **Service items**
   - Phone: `+44 7961 739769`
   - Email: `contact@ecovapro.com`
   - Hours: matching the schema in `lib/seo.ts`
   - Photos: at least 5 (logo, team, before/after)

---

## 9. Monitor for 14 days

- **Search Console → Coverage**: confirm new pages are indexed within 7 days.
- **Search Console → Performance**: monitor for any drop in clicks/impressions — should rise from week 2.
- **Resend logs**: confirm email deliverability remains 100%.
- **Supabase logs**: monitor for booking failures.

---

## Optional next-week tasks

These weren't in the launch scope but are obvious next steps:

1. **Replace the Unsplash hero image** with branded photography (`/public/hero.jpg`). Update `components/Hero.tsx` to use Next.js `<Image>`.
2. **Add per-area landing pages** (e.g. `/cleaners-in-finchley`). Use `ServicePageTemplate` as the model — same shape, different geo focus per page.
3. **Wire Stripe deposits** for high-value bookings (£300+):
   - Create `app/api/payments/intent/route.ts`
   - Add a "Pay £50 deposit to confirm" step after the booking is created
   - On webhook confirmation, set booking status to `confirmed` automatically
4. **WhatsApp Business API**: integrate via Twilio. Plug send into `lib/email.ts`'s `sendBookingEmails` so the customer gets both an email and a WhatsApp message.
5. **Google Calendar sync**: create an event in your business calendar on booking confirmation. The simplest path is a Google Apps Script that watches the Supabase webhook.

---

## Rollback

If anything goes catastrophically wrong post-cutover, switching DNS back to Base44 is the rollback path. Bookings already saved in Supabase remain there permanently — they're never coupled to Base44.

---

## Support contacts

- Supabase status: [status.supabase.com](https://status.supabase.com)
- Vercel status: [vercel-status.com](https://www.vercel-status.com)
- Resend status: [resend-status.com](https://resend-status.com)
