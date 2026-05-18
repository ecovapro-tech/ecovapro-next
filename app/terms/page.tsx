import PageShell from "@/components/PageShell";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms & Conditions — EcovaPro",
  description: "Terms governing your use of EcovaPro cleaning services.",
  path: "/terms",
});

export default function Page() {
  return (
    <PageShell>
      <section className="bg-white">
        <div className="max-w-[760px] mx-auto px-5 md:px-8 py-20 prose-ecova">
          <h1 className="font-serif text-4xl font-black mb-6 text-charcoal">Terms &amp; Conditions</h1>
          <p>Last updated: 14 May 2026</p>

          <h2>Bookings</h2>
          <p>A booking is confirmed once you receive a confirmation message from us. The estimated price shown at the quote stage is final unless the property condition or scope materially differs from your description — in which case we'll discuss revised pricing with you before starting.</p>

          <h2>Cancellations</h2>
          <p>Cancellations made more than 24 hours before the booking start time incur no fee. Cancellations within 24 hours are charged at 50% of the booking value. No-shows are charged in full.</p>

          <h2>48-hour guarantee</h2>
          <p>If you're not satisfied with any part of the clean, contact us within 48 hours. We'll return and re-clean the area at no charge. The guarantee applies to the original scope only.</p>

          <h2>Liability</h2>
          <p>EcovaPro is fully insured. In the unlikely event of accidental damage caused by our team, we'll cover the cost of repair or replacement up to the limits of our public liability insurance.</p>

          <h2>Payment</h2>
          <p>Card or bank transfer after the clean. Invoices are due within 7 days. Late payments incur interest at the Bank of England base rate plus 8% in line with the Late Payment of Commercial Debts (Interest) Act 1998.</p>

          <h2>Contact</h2>
          <p>contact@ecovapro.com · +44 7961 739769</p>
        </div>
      </section>
    </PageShell>
  );
}
