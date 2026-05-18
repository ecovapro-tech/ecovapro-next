# EcovaPro — Live Site Audit (ecovapro.com)

Audit date: 14 May 2026. The current site is built on Base44 (a no-code platform). The audit was performed against the production URL and visible markup.

---

## Critical issues (fix immediately)

### 1. Every page shares the same generic, non-cleaning meta description
Every URL on the site returns:

> "A platform for discovering and booking local experiences and activities."

This is Base44 template boilerplate. The string contains zero cleaning-related keywords, no London geo-modifier, no service signal. Google has no usable signal to rank you, and AI search engines (ChatGPT, Perplexity) won't include you in results for cleaning queries because their summarisation models read the description first.

**Fix:** unique, keyword-rich, location-specific descriptions per page. Examples shipped in the rebuild below.

### 2. Page titles are template names, not keyword targets
Current titles:
- `EcovaPro` (homepage)
- `Service Page | EcovaPro`
- `Quote Page | EcovaPro`
- `Articles | EcovaPro`

None of these are searchable phrases. A user looking for "end of tenancy cleaning London" never matches "Service Page".

**Fix:** intent-matching titles. Homepage: `Eco-Friendly Cleaning Services in London | EcovaPro`. Service pages: `End of Tenancy Cleaning London — From £180 | EcovaPro`.

### 3. URL structure is broken for SEO
- `/ServicePage` and `/ArticlePage` (capitalised, template names) are indexed alongside lowercase variants like `/articles`. Google treats `/articles` and `/Articles` as separate URLs → duplicate content + ranking dilution.
- No service-specific URLs. There's a single generic `/ServicePage` instead of `/end-of-tenancy-cleaning-london`, `/deep-cleaning-london`, etc. You cannot rank for any commercial keyword without dedicated landing pages.
- `/QuotePage` and `/quote` both exist. Pick one.

**Fix:** slugs are lowercase, keyword-rich, dash-separated. 301 redirects from old `/ServicePage`-style URLs to the new ones.

### 4. Content is fully client-rendered
The HTML returned to crawlers is essentially just the page title and a list of navigation links. The actual service descriptions, pricing, testimonials, and FAQ content arrive after JavaScript runs. Googlebot can render JS, but it's slower, occasionally drops content, and AI search agents typically don't render at all.

**Fix:** server-render with Next.js App Router. Critical content appears in the initial HTML.

### 5. Internal data model is leaked in markup
The `/ServicePage` markup exposes a `## Data types` block listing `Lead`, `Article`, `Booking`, `Feedback`. This is an internal CMS schema that should never be public. It tells competitors what data you collect, and dilutes the page's topical relevance.

**Fix:** remove. The new site has no such leakage by construction.

### 6. OG image is the Base44 default logo
The `og:image` URL is hosted on Base44's Supabase storage and is a generic logo render at 1200×630. Every page shares it. Shared links on WhatsApp, LinkedIn, Slack look amateur.

**Fix:** bespoke per-page OG images (or at minimum a clean homepage OG with service icons + tagline).

### 7. No structured data (schema.org)
Zero JSON-LD on any page. No LocalBusiness, no Service, no Review, no FAQPage, no BreadcrumbList. This is the single biggest factor in Google Maps ranking for a local service business and in AI search inclusion.

**Fix:** all schemas added in the rebuild. LocalBusiness on the homepage, Service on each landing page, FAQPage on FAQ blocks, Review on testimonial sections, BreadcrumbList on every non-home page.

### 8. No sitemap.xml or robots.txt discoverable
Neither is exposed at the conventional URLs. Google has to discover pages by crawling. For a 30-page site this is fine; for a 50+ page rebuild with service pages + blog posts + area pages, you need a sitemap.

**Fix:** auto-generated `sitemap.xml` and `robots.txt` shipped in the rebuild.

### 9. Phone number inconsistency
The brief specifies `+44 7961 739769` but the current site copy references `020 7946 0321` (which is the Ofcom-reserved fictional drama range). Confusing for customers, dings local SEO consistency (NAP — name, address, phone — must be identical everywhere).

**Fix:** standardised on `+44 7961 739769` throughout the rebuild.

---

## Medium-priority issues

### Trust signals are thin in the rendered HTML
The marketing copy (DBS, 48h guarantee, 500+ properties, 4.9 rating) is buried behind JS rendering. Above-the-fold HTML for a first-time visitor or AI crawler sees almost nothing.

### No reviews schema means no rich-snippet stars in SERPs
Without `aggregateRating` markup, your Google listing won't show the gold stars that double click-through rates for local services.

### No dedicated Areas pages
You list 12 London areas but they're tags inside a single component. Each major area (Finchley, Islington, Hackney, Clapham, Chelsea, Canary Wharf) deserves its own `/cleaners-in-{area}` page for hyper-local rankings. The rebuild ships an `Areas` section on the homepage and leaves the per-area landing pages as a clear next step.

### Internal linking is shallow
The footer "Services" column lists service names but they're not links to dedicated pages (because the pages don't exist yet). Internal links are how Google passes authority between pages.

### Missing canonical strategy
Each Base44 page declares `canonical: https://ecovapro.com/{path}` but with the capitalised duplicate URLs in play, canonicals aren't preventing duplication.

### No favicon variants
Only a basic favicon is set. Missing apple-touch-icon, manifest icons at multiple resolutions, Open Graph fallback.

### Speed is unknown but likely poor
Base44 sites typically load 200–400 KB of JS before any content paints. The rebuild targets <80 KB JS for the homepage critical path.

---

## Quick wins

These can ship in hours, before the full rebuild is live:

1. **Edit the meta description** in Base44 to: "Eco-friendly cleaning services across London. End of tenancy, deep, regular, Airbnb and office cleans. DBS-checked teams, plant-based products, 48-hour guarantee. Book in 60 seconds."
2. **Edit the homepage title** to: "Eco-Friendly Cleaning Services London — EcovaPro".
3. **Fix the phone number** site-wide to `+44 7961 739769`.
4. **Set up Google Business Profile** for "EcovaPro" in Finchley with all five service categories, photos, and the correct phone/email. This alone can move you onto the Google Maps 3-pack within weeks.
5. **Submit the (current) site to Google Search Console** and **Bing Webmaster Tools** so you can monitor crawl issues during migration.
6. **Add a `robots.txt`** in Base44 that disallows the capitalised duplicate paths.

---

## Keyword strategy shipped in the rebuild

Primary commercial keywords mapped to dedicated pages:

| Page | Primary keyword | Search intent |
|---|---|---|
| `/end-of-tenancy-cleaning-london` | end of tenancy cleaning London | High commercial — tenants, landlords |
| `/deep-cleaning-london` | deep cleaning London | Mid commercial — homeowners |
| `/airbnb-cleaning-london` | Airbnb cleaning London | High commercial — short-let hosts |
| `/office-cleaning-london` | office cleaning London | High commercial B2B |
| `/regular-cleaning-london` | weekly house cleaning London | Recurring revenue |
| `/` (homepage) | cleaning services London + eco cleaning London | Brand + broad |
| `/blog/how-much-end-of-tenancy-cleaning-london` | "how much is end of tenancy cleaning London" | Informational → quote funnel |
| `/blog/how-to-get-your-deposit-back-london` | "how to get deposit back London" | Informational → tenancy clean conversion |

Secondary geo keywords baked into copy and schema (`alternateName`, `areaServed`): Finchley, Islington, Hackney, Clapham, Chelsea, Canary Wharf, Highgate, Muswell Hill, Crouch End, Stoke Newington, Battersea, Fulham.

---

## What the rebuild ships against this audit

Every critical item above is fixed in the Next.js codebase shipped alongside this audit. See `README.md` for the project tour and `DEPLOY.md` for the migration plan from Base44 to the new stack (including the 301 redirect map).
