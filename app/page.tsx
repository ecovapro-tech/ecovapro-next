import HomeClient from "@/components/HomeClient";
import JsonLd from "@/components/JsonLd";
import { faqJsonLd } from "@/lib/seo";
import { faqs } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Eco-Friendly Cleaning Services London — EcovaPro",
  description:
    "Eco-friendly cleaning services across London. End of tenancy, deep, regular, Airbnb and office cleans. DBS-checked teams, plant-based products, 48-hour guarantee. Book in 60 seconds.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HomeClient />
      <JsonLd data={faqJsonLd(faqs)} />
    </>
  );
}
