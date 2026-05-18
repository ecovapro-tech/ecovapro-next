import PageShell from "@/components/PageShell";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Refund Policy — EcovaPro",
  description: "How EcovaPro handles refunds and our 48-hour re-clean guarantee.",
  path: "/refund-policy",
});

export default function Page() {
  return (
    <PageShell>
      <section className="bg-white">
        <div className="max-w-[760px] mx-auto px-5 md:px-8 py-20 prose-ecova">
          <h1 className="font-serif text-4xl font-black mb-6 text-charcoal">Refund Policy</h1>
          <p>Last updated: 14 May 2026</p>

          <h2>Our promise: 48-hour re-clean guarantee</h2>
          <p>If you're not satisfied with any part of the clean, contact us within 48 hours and we'll return to re-clean the area free of charge. We always prefer to put it right than refund.</p>

          <h2>When refunds apply</h2>
          <p>If we're unable to address the issue with a re-clean — for example, if you've already had another company complete the work — we'll refund the proportion of the booking that relates to the affected scope, at our discretion.</p>

          <h2>Cancellation refunds</h2>
          <p>See the Cancellations section of our <a href="/terms">Terms &amp; Conditions</a> for the cancellation refund schedule.</p>

          <h2>How to claim</h2>
          <p>Email <a href="mailto:contact@ecovapro.com">contact@ecovapro.com</a> with your booking reference and photos of the issue. We respond within one business day.</p>
        </div>
      </section>
    </PageShell>
  );
}
