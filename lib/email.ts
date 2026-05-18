import { Resend } from "resend";
import { SERVICE_LABELS, SIZE_LABELS, formatGBP, type ServiceKey, type SizeKey } from "./pricing";

let _resend: Resend | null = null;
function resend(): Resend {
  if (_resend) return _resend;
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY not set.");
  _resend = new Resend(key);
  return _resend;
}

const FROM = process.env.EMAIL_FROM || "EcovaPro <bookings@ecovapro.com>";
const ADMIN = process.env.EMAIL_ADMIN_NOTIFICATIONS || "contact@ecovapro.com";

export interface BookingEmailPayload {
  ref: string;
  service: ServiceKey;
  property_size: SizeKey;
  preferred_date: string | null;
  preferred_slot: string | null;
  estimated_price: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  postcode: string | null;
  notes: string | null;
}

function html(strings: TemplateStringsArray, ...values: unknown[]): string {
  return strings.reduce((acc, s, i) => acc + s + (values[i] ?? ""), "");
}

function customerHtml(p: BookingEmailPayload): string {
  return html`<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#f6f7f7;font-family:'Segoe UI',system-ui,sans-serif;color:#111">
  <div style="max-width:560px;margin:0 auto;padding:32px 24px;background:#ffffff">
    <div style="font-weight:900;letter-spacing:1px;color:#1F4D3A;font-size:18px;margin-bottom:24px">ECOVAPRO</div>
    <h1 style="font-family:Georgia,serif;font-size:26px;margin:0 0 8px;color:#111">Booking received — thanks, ${p.customer_name.split(" ")[0]}.</h1>
    <p style="color:#374151;font-size:15px;line-height:1.7">We'll confirm by text and email within the hour. Your reference is <strong>${p.ref}</strong>.</p>

    <table style="width:100%;border-collapse:collapse;margin:24px 0;font-size:14px">
      <tr><td style="padding:10px 0;border-bottom:1px solid #E2E3E3;color:#6B7280">Service</td><td style="padding:10px 0;border-bottom:1px solid #E2E3E3;text-align:right"><strong>${SERVICE_LABELS[p.service]}</strong></td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #E2E3E3;color:#6B7280">Property size</td><td style="padding:10px 0;border-bottom:1px solid #E2E3E3;text-align:right"><strong>${SIZE_LABELS[p.property_size]}</strong></td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #E2E3E3;color:#6B7280">Preferred date</td><td style="padding:10px 0;border-bottom:1px solid #E2E3E3;text-align:right"><strong>${p.preferred_date ?? "Flexible"}</strong></td></tr>
      <tr><td style="padding:10px 0;color:#6B7280">Estimated price</td><td style="padding:10px 0;text-align:right;font-family:Georgia,serif;font-size:22px;color:#1F4D3A"><strong>${formatGBP(p.estimated_price)}</strong></td></tr>
    </table>

    <p style="color:#6B7280;font-size:13px;line-height:1.7">No payment is due yet. Final price is confirmed when we arrive and review the property. Our 48-hour re-clean guarantee applies to every booking.</p>

    <div style="margin-top:32px;padding-top:24px;border-top:1px solid #E2E3E3;font-size:13px;color:#6B7280">
      Questions? Reply to this email or call <a href="tel:+447961739769" style="color:#1F4D3A">+44 7961 739769</a>.<br/>
      EcovaPro · Finchley, London N3
    </div>
  </div>
</body></html>`;
}

function adminHtml(p: BookingEmailPayload): string {
  return html`<!DOCTYPE html>
<html><body style="font-family:monospace;color:#111;background:#fff;padding:24px">
  <h2 style="margin:0 0 16px">New booking · ${p.ref}</h2>
  <p>${SERVICE_LABELS[p.service]} · ${SIZE_LABELS[p.property_size]} · ${formatGBP(p.estimated_price)}</p>
  <p>${p.preferred_date ?? "Flexible date"} · ${p.preferred_slot ?? "Any slot"}</p>
  <hr/>
  <p><strong>${p.customer_name}</strong></p>
  <p><a href="mailto:${p.customer_email}">${p.customer_email}</a> · <a href="tel:${p.customer_phone}">${p.customer_phone}</a></p>
  <p>Postcode: ${p.postcode ?? "—"}</p>
  ${p.notes ? `<p>Notes: ${p.notes}</p>` : ""}
</body></html>`;
}

export async function sendBookingEmails(p: BookingEmailPayload): Promise<void> {
  // Soft-fail on missing config so dev environment doesn't crash bookings.
  if (!process.env.RESEND_API_KEY) {
    console.warn("[email] RESEND_API_KEY not set — skipping email send.");
    return;
  }

  const r = resend();
  await Promise.all([
    r.emails.send({
      from: FROM,
      to: p.customer_email,
      subject: `EcovaPro booking ${p.ref} — confirmation`,
      html: customerHtml(p),
    }),
    r.emails.send({
      from: FROM,
      to: ADMIN,
      subject: `[Booking] ${p.ref} · ${SERVICE_LABELS[p.service]} · ${formatGBP(p.estimated_price)}`,
      html: adminHtml(p),
      replyTo: p.customer_email,
    }),
  ]);
}
