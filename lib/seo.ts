import type { Metadata } from "next";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ecovapro.com";
export const SITE_NAME = "EcovaPro";

export interface PageMetaOpts {
  title: string;
  description: string;
  path: string;       // starts with "/"
  image?: string;
  type?: "website" | "article";
}

export function buildMetadata(o: PageMetaOpts): Metadata {
  const url = `${SITE_URL}${o.path}`;
  const image = o.image || `${SITE_URL}/og-default.png`;
  return {
    title: o.title,
    description: o.description,
    alternates: { canonical: url },
    openGraph: {
      title: o.title,
      description: o.description,
      url,
      siteName: SITE_NAME,
      type: o.type ?? "website",
      locale: "en_GB",
      images: [{ url: image, width: 1200, height: 630, alt: o.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: o.title,
      description: o.description,
      images: [image],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  };
}

// ---------- JSON-LD builders ----------

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    image: `${SITE_URL}/og-default.png`,
    url: SITE_URL,
    telephone: "+44 7961 739769",
    email: "contact@ecovapro.com",
    priceRange: "££",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Finchley",
      addressLocality: "London",
      addressRegion: "Greater London",
      postalCode: "N3",
      addressCountry: "GB",
    },
    areaServed: [
      { "@type": "City", name: "London" },
      ...["Finchley","Islington","Hackney","Clapham","Chelsea","Canary Wharf","Highgate","Muswell Hill","Crouch End","Stoke Newington","Battersea","Fulham"]
        .map((n) => ({ "@type": "Place", name: n })),
    ],
    geo: { "@type": "GeoCoordinates", latitude: 51.5995, longitude: -0.1944 },
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      opens: "08:00",
      closes: "20:00",
    }],
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "127" },
    sameAs: [],
  };
}

export interface ServiceLdInput {
  name: string;
  description: string;
  path: string;
  priceFrom: number;
}

export function serviceJsonLd(s: ServiceLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: s.name,
    name: s.name,
    description: s.description,
    url: `${SITE_URL}${s.path}`,
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: { "@type": "City", name: "London" },
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      price: s.priceFrom,
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "GBP",
        price: s.priceFrom,
        valueAddedTaxIncluded: true,
      },
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}${s.path}`,
    },
  };
}

export interface FaqLdItem { q: string; a: string; }
export function faqJsonLd(items: FaqLdItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export interface BreadcrumbItem { name: string; path: string; }
export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}
