import ServicePageTemplate from "@/components/ServicePageTemplate";
import JsonLd from "@/components/JsonLd";
import { getServiceBySlug } from "@/content/services";
import { buildMetadata, serviceJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { startingPrice } from "@/lib/pricing";
import { faqs } from "@/content/site";

const SLUG = "regular-cleaning-london";
const svc = getServiceBySlug(SLUG)!;

export const metadata = buildMetadata({ title: svc.metaTitle, description: svc.metaDescription, path: `/${SLUG}` });

export default function Page() {
  return (
    <>
      <ServicePageTemplate service={svc} />
      <JsonLd data={serviceJsonLd({ name: svc.h1, description: svc.metaDescription, path: `/${SLUG}`, priceFrom: startingPrice(svc.id) })} />
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: svc.title, path: `/${SLUG}` }])} />
    </>
  );
}
