import type { ServiceKey } from "@/lib/pricing";

export interface ServiceMeta {
  id: ServiceKey;
  slug: string;            // public URL slug
  title: string;           // short label
  h1: string;              // landing page H1
  metaTitle: string;
  metaDescription: string;
  cardDesc: string;        // homepage card copy
  long: string[];          // paragraphs for landing page body
  includes: string[];      // bullet list "what's included"
  feature?: boolean;
}

export const SERVICES: ServiceMeta[] = [
  {
    id: "eot",
    slug: "end-of-tenancy-cleaning-london",
    title: "End of Tenancy",
    h1: "End of Tenancy Cleaning London",
    metaTitle: "End of Tenancy Cleaning London — From £180 | EcovaPro",
    metaDescription: "Letting-agency standard end of tenancy cleaning across London. DBS-checked teams, eco products, deposit-back 48-hour guarantee. Book in 60 seconds.",
    cardDesc: "Our most thorough clean. Every surface, every corner — meeting letting agency standards and getting your deposit back.",
    long: [
      "End of tenancy cleaning is the most thorough clean we offer. Every surface in the property is cleaned to the standard demanded by London letting agents and inventory clerks, so you can hand the keys back with confidence and get your full deposit returned.",
      "Our teams arrive with everything needed: industrial-grade equipment, plant-based products that won't trigger inventory complaints about chemical residue, and a checklist matching the major London letting agencies (Foxtons, Dexters, Winkworth, Hamptons, and the rest).",
      "Every end of tenancy clean is covered by our 48-hour re-clean guarantee. If the agent flags any area on inventory return, we come back and re-clean it free of charge — no questions, no quibbling.",
    ],
    includes: [
      "Full kitchen deep clean including oven, hob, extractor and inside cupboards",
      "Bathroom descale — taps, showerheads, grout, tiles, behind toilets",
      "Internal windows, sills, frames and tracks",
      "Skirting boards, switches, sockets, door frames, internal doors",
      "Carpets vacuumed, hard floors mopped and sanitised",
      "Cupboards and drawers inside and out, all surfaces dusted",
      "Light fittings, lampshades, and accessible high-level surfaces",
      "Final walk-through and photo report sent to your phone",
    ],
  },
  {
    id: "regular",
    slug: "regular-cleaning-london",
    title: "Regular Cleaning",
    h1: "Weekly & Fortnightly House Cleaning London",
    metaTitle: "Regular House Cleaning London — From £75 | EcovaPro",
    metaDescription: "Weekly or fortnightly house cleaning across London. Same trusted, DBS-checked team every visit. Plant-based products. Book in 60 seconds.",
    cardDesc: "Weekly or fortnightly home cleans with the same trusted team, every visit.",
    long: [
      "Regular cleaning is the service most of our long-term clients use. You're assigned a consistent team from your first clean — they learn your home, remember your preferences, and keep things to the same standard week after week.",
      "All cleans use independently certified plant-based products, so there's no chemical residue, no harsh fumes, and no risk to children, pets, or anyone with sensitivities. Schedule weekly or fortnightly; we fit around your routine.",
      "Most regular clients are with us for over a year. That's the standard we aim for — not the cheapest first clean, but the relationship that lasts.",
    ],
    includes: [
      "Kitchen surfaces, hob, sink, exterior of appliances",
      "Bathroom cleaning — toilet, basin, bath/shower, mirrors",
      "All floors vacuumed and mopped",
      "Dusting of all reachable surfaces and ornaments",
      "Bins emptied, fresh liners",
      "Beds made (linen change on request)",
      "Same cleaner every visit unless requested otherwise",
    ],
  },
  {
    id: "deep",
    slug: "deep-cleaning-london",
    title: "Deep Cleaning",
    h1: "Deep Cleaning London",
    metaTitle: "Deep Cleaning London — From £140 | EcovaPro",
    metaDescription: "Deep cleaning across London. Top-to-bottom reset after building work, long absences, or before moving in. Plant-based products, DBS team, 48h guarantee.",
    cardDesc: "A full top-to-bottom reset. Perfect after building work, long periods away, or a new move.",
    long: [
      "A deep clean is the reset between phases of life. Most clients book one before moving into a new home, after building or decorating work, after a long period away, or in spring as a refresh.",
      "It's more thorough than a regular clean and more domestic-focused than an end of tenancy clean. Limescale and grease that have built up over months are removed, hard-to-reach areas get attention, and the whole property is left visibly transformed.",
      "All deep cleans use plant-based products. Safe around children, pets, and anyone sensitive to harsh chemical smells.",
    ],
    includes: [
      "Limescale removal in bathroom and kitchen — taps, tiles, glass",
      "Inside of kitchen cupboards, drawers, and appliances",
      "Oven, hob, extractor hood and filter",
      "Skirting boards, doors, frames, switches, sockets",
      "All windows internally, sills, tracks, blinds where reachable",
      "Carpets vacuumed thoroughly, hard floors mopped",
      "All accessible high-level surfaces and light fittings",
    ],
  },
  {
    id: "airbnb",
    slug: "airbnb-cleaning-london",
    title: "Airbnb & Short-Let",
    h1: "Airbnb Cleaning London",
    metaTitle: "Airbnb Cleaning London — From £65 | EcovaPro",
    metaDescription: "Reliable Airbnb and short-let turnovers across London. Linen change, restocking, photo-ready presentation. Trusted by London hosts. Book online.",
    cardDesc: "Reliable turnovers between guests. Linen, restocking, photo-ready presentation.",
    long: [
      "Short-let hosts can't afford 'mostly clean'. Our Airbnb turnover service is built around the realities of back-to-back bookings: tight check-in and check-out windows, linen rotation, restock checks, and the photo-ready standard that keeps your review average above 4.8.",
      "We coordinate with your check-in calendar (iCal sync available on request) and report back with photos after every turnover, so you know the property is guest-ready without driving across London to inspect it yourself.",
      "Hosts with multiple London properties get priority scheduling and consolidated invoicing.",
    ],
    includes: [
      "Full clean of all rooms between guests",
      "Linen and towel change (you supply, we rotate)",
      "Restocking of consumables (toilet roll, soap, tea, coffee — you supply or we source)",
      "Photo report after every turnover",
      "Damage and missing-item reporting to your phone",
      "Coordinated with check-in windows",
      "Multi-property hosts: dedicated account contact",
    ],
  },
  {
    id: "office",
    slug: "office-cleaning-london",
    title: "Office Cleaning",
    h1: "Office Cleaning London",
    metaTitle: "Office Cleaning London — From £90 | EcovaPro",
    metaDescription: "Commercial office cleaning across London. Daily, weekly, or one-off. DBS-checked teams, plant-based products, evening and weekend slots available.",
    cardDesc: "Commercial cleans around your schedule. Daily, weekly, or one-off.",
    long: [
      "Office cleaning that fits around your business, not the other way around. Most clients book us for evening slots after the team has left, or early mornings before they arrive. Weekend cleans for one-off resets are also available.",
      "We use plant-based products throughout. No chemical smell when your team walks in on Monday, no allergy triggers, no residue on shared kitchen surfaces. The team you meet on day one is the team that returns — we don't rotate cleaners.",
      "Frequency options: daily, three-times-weekly, weekly, fortnightly, or one-off. We provide a single proposal with transparent pricing and no auto-renewing contracts.",
    ],
    includes: [
      "Desks, monitors and shared surfaces wiped and sanitised",
      "Floors vacuumed and mopped throughout",
      "Kitchen, breakout area, and meeting rooms reset",
      "Bathrooms cleaned, consumables restocked",
      "All bins emptied, liners replaced",
      "Glass partitions, doors, and entrance areas cleaned",
      "After-hours and weekend slots at no extra charge",
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceMeta | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
