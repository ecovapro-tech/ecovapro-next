import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL, SITE_NAME, localBusinessJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `Eco-Friendly Cleaning Services London — ${SITE_NAME}`, template: `%s | ${SITE_NAME}` },
  description: "Eco-friendly cleaning services across London. End of tenancy, deep, regular, Airbnb and office cleans. DBS-checked teams, plant-based products, 48-hour guarantee.",
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  generator: "Next.js",
  keywords: [
    "cleaning services London",
    "eco cleaning London",
    "end of tenancy cleaning London",
    "deep cleaning London",
    "Airbnb cleaning London",
    "office cleaning London",
    "regular house cleaning London",
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: `${SITE_NAME} — Eco-Friendly Cleaning Services London`,
    description: "DBS-checked teams. Plant-based products. 48-hour guarantee. Book in 60 seconds.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image", title: SITE_NAME },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1F4D3A",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body>
        {children}
        {/* Site-wide LocalBusiness schema */}
        <JsonLd data={localBusinessJsonLd()} />
      </body>
    </html>
  );
}
