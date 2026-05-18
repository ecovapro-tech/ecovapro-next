export const testimonials = [
  { name: "Sophie R.", area: "Clapham",       stars: 5, service: "Regular Cleaning",    text: "I've used three cleaning companies this year. EcovaPro is the first time I actually had to check they'd been — the flat looked completely different." },
  { name: "Marcus T.", area: "Islington",      stars: 5, service: "End of Tenancy",       text: "End of tenancy clean. Got every penny of my deposit back. The landlord asked who we used. That says everything." },
  { name: "Priya K.",  area: "Canary Wharf",   stars: 5, service: "Office Cleaning",      text: "Our office smells genuinely clean, not like chemicals. The team are invisible, efficient, and absolutely reliable." },
  { name: "James W.",  area: "Hackney",        stars: 5, service: "Regular Cleaning",    text: "Fortnightly cleans for eight months now. They remember exactly how I like things done. That level of consistency is rare." },
  { name: "Amara O.",  area: "Finchley",       stars: 5, service: "Airbnb & Short-Let",  text: "I manage four Airbnb properties. EcovaPro have made my life measurably easier. Guests consistently mention the cleanliness." },
  { name: "Lena F.",   area: "Battersea",      stars: 5, service: "Deep Cleaning",       text: "We moved into a place that hadn't been touched in years. One visit later and it genuinely felt like a new home. Remarkable." },
];

export const faqs = [
  { q: "What products do you use?", a: "We use certified plant-based, biodegradable cleaning products. They're effective, fragrance-balanced, and free from bleach, ammonia, and synthetic VOCs. Safe around children, pets, and people with allergies." },
  { q: "Are your cleaners DBS checked?", a: "Yes. Every EcovaPro cleaner is DBS checked, fully insured, and has completed our in-house training before visiting any property. You'll always know who's coming." },
  { q: "What does the 48-hour guarantee mean?", a: "If you're not completely satisfied, we return within 48 hours and re-clean the areas in question — at no charge, no questions asked." },
  { q: "How do I get a price?", a: "Use the quote tool. You'll see a price in under 60 seconds — before you enter any contact details. No obligation." },
  { q: "Which parts of London do you cover?", a: "All of Greater London. Finchley, Islington, Hackney, Clapham, Chelsea, Canary Wharf, and everywhere between. If it's in London, we'll be there." },
  { q: "Can I have the same cleaner every time?", a: "Yes — that's our default. You're assigned a consistent team from your first clean. Most of our regular clients have had the same cleaner for over a year." },
  { q: "Do I need to be home during the clean?", a: "Not at all. Most of our clients give us a key or use a key safe. Every team is DBS-checked and fully insured, and you'll get a photo report when we're done." },
  { q: "How do I pay?", a: "Card or bank transfer after the clean. No deposit required for one-off bookings under £400. Regular clients are invoiced monthly." },
];

export const areas = ["Finchley","Islington","Hackney","Clapham","Chelsea","Canary Wharf","Highgate","Muswell Hill","Crouch End","Stoke Newington","Battersea","Fulham"];

export const steps = [
  { n: "01", title: "Get your price", body: "Select your service and property size. See a clear price immediately — before we ask for anything else." },
  { n: "02", title: "Choose your time", body: "Pick a date and slot that works for you. Mornings, evenings, weekends — we fit around your schedule." },
  { n: "03", title: "We handle everything", body: "Your vetted team arrives on time, works thoroughly, and leaves your space genuinely clean." },
];

export const trustStats: [string, string][] = [
  ["500+", "Properties cleaned"],
  ["4.9",  "Average rating"],
  ["48h",  "Re-clean guarantee"],
  ["100%", "Plant-based products"],
];

export const whyPoints: [string, string][] = [
  ["DBS-checked cleaners", "Every member of our team is DBS checked and fully insured before their first visit."],
  ["Consistent teams",      "You get the same cleaner, every time. Continuity matters — they know your home."],
  ["Eco-certified products","We use independently certified plant-based products. Effective, safe, and sustainable."],
  ["48-hour guarantee",     "Not satisfied? We return within 48 hours. No charge, no argument."],
];

export const ecoPoints: [string, string][] = [
  ["No bleach or ammonia",  "No harsh chemicals that linger on surfaces or affect air quality."],
  ["Safe around children",  "Tested, certified non-toxic. Used confidently in family homes."],
  ["Pet safe",              "No fumes, no harmful residues. Safe for all animals."],
  ["Biodegradable",         "Breaks down naturally. Zero environmental damage after use."],
];

// Public business config (used in headers, footers, mailto/tel links)
export const BUSINESS = {
  name: "EcovaPro",
  phoneDisplay: "+44 7961 739769",
  phoneE164: "+447961739769",
  whatsapp: "https://wa.me/447961739769",
  email: "contact@ecovapro.com",
  addressLine: "Finchley, London N3",
};
