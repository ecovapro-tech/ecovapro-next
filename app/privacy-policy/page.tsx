import PageShell from "@/components/PageShell";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy — EcovaPro",
  description: "How EcovaPro collects, uses, and protects your personal data under UK GDPR.",
  path: "/privacy-policy",
});

export default function Page() {
  return (
    <PageShell>
      <section className="bg-white">
        <div className="max-w-[760px] mx-auto px-5 md:px-8 py-20 prose-ecova">
          <h1 className="font-serif text-4xl font-black mb-6 text-charcoal">Privacy Policy</h1>
          <p>Last updated: 14 May 2026</p>

          <h2>Who we are</h2>
          <p>EcovaPro Ltd (&quot;we&quot;, &quot;us&quot;) is registered in England and Wales (Reg. No. 12345678) with its trading address at Finchley, London N3.</p>

          <h2>What we collect</h2>
          <p>When you book a clean we collect your name, email address, mobile number, postcode and any notes you choose to share. When you contact us we collect the information you provide in the message.</p>

          <h2>How we use it</h2>
          <p>We use your data to confirm and deliver the booking, to send the confirmation and reminders, to invoice you, and to respond to your enquiries. We never sell your data and we never share it with third parties for marketing.</p>

          <h2>How long we keep it</h2>
          <p>We keep booking records for 6 years to comply with HMRC requirements. After that they are deleted. Marketing-relevant data (where you've opted in) is kept until you unsubscribe.</p>

          <h2>Your rights</h2>
          <p>Under UK GDPR you have the right to access, correct, or request deletion of your personal data, and to lodge a complaint with the ICO. To exercise these rights email us at <a href="mailto:contact@ecovapro.com">contact@ecovapro.com</a>.</p>

          <h2>Cookies</h2>
          <p>We use only essential cookies required for the site to function. We do not run third-party advertising or tracking cookies by default.</p>

          <h2>Contact</h2>
          <p>contact@ecovapro.com · +44 7961 739769</p>
        </div>
      </section>
    </PageShell>
  );
}
