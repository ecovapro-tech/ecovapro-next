"use client";
import { useEffect, useMemo, useState } from "react";
import {
  estimatePrice,
  formatGBP,
  SERVICE_LABELS,
  SIZE_LABELS,
  SERVICE_KEYS,
  SIZE_KEYS,
  type ServiceKey,
  type SizeKey,
} from "@/lib/pricing";

const SLOTS: { id: string; label: string }[] = [
  { id: "morning",   label: "Morning (8–12)" },
  { id: "afternoon", label: "Afternoon (12–4)" },
  { id: "evening",   label: "Evening (4–8)" },
  { id: "flexible",  label: "Flexible" },
];

export default function QuoteModal({
  onClose,
  initialService,
}: {
  onClose: () => void;
  initialService?: ServiceKey;
}) {
  const [step, setStep] = useState<1 | 2 | 3>(initialService ? 2 : 1);
  const [svc, setSvc] = useState<ServiceKey | "">(initialService ?? "");
  const [sz, setSz] = useState<SizeKey | "">("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState<string>("flexible");
  const [postcode, setPostcode] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<{ ref: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Body scroll lock + Escape close
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);
  const est = estimatePrice(svc, sz);

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validPhone = phone.replace(/\D/g, "").length >= 10;
  const canSubmit = name.trim().length > 1 && validEmail && validPhone && !!svc && !!sz && !submitting;

  async function handleSubmit() {
    if (!canSubmit) return;
    setError(null);
    setSubmitting(true);
    try {
      const r = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: svc,
          property_size: sz,
          preferred_date: date || null,
          preferred_slot: slot || null,
          customer_name: name.trim(),
          customer_email: email.trim(),
          customer_phone: phone.trim(),
          postcode: postcode.trim() || null,
          notes: notes.trim() || null,
        }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.error || "Booking failed. Please try again.");
      setSubmitted({ ref: data.ref });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please call us instead.");
    } finally {
      setSubmitting(false);
    }
  }

  const pillCls = (active: boolean) =>
    `px-4 py-2.5 rounded-lg text-sm font-${active ? "bold" : "normal"} cursor-pointer transition-all border ${
      active
        ? "border-green bg-mint-bg text-green"
        : "border-gray-200 bg-white text-gray-700 hover:border-green/40"
    }`;

  const inputCls = "w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-green transition-colors mb-2 text-charcoal";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl p-6 md:p-9 w-full max-w-[480px] max-h-[90vh] overflow-y-auto animate-fade-up"
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-7">
          <div>
            <div className="text-[11px] font-bold tracking-[3px] text-gray-500 uppercase mb-2">
              Step {submitted ? "✓" : step} of 3
            </div>
            <div className="w-[140px] md:w-[200px] h-[3px] bg-gray-200 rounded">
              <div
                className="h-full bg-green rounded transition-all duration-300"
                style={{ width: submitted ? "100%" : `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
          <button
            type="button"
            aria-label="Close quote dialog"
            onClick={onClose}
            className="text-gray-500 text-2xl leading-none hover:text-charcoal"
          >
            ×
          </button>
        </div>

        {/* SUCCESS */}
        {submitted ? (
          <div className="text-center py-2">
            <div aria-hidden className="w-16 h-16 rounded-full bg-mint-bg border-2 border-mint flex items-center justify-center text-3xl text-green mx-auto mb-5">✓</div>
            <h2 id="quote-modal-title" className="font-serif font-extrabold text-2xl text-charcoal mb-2">Booking received</h2>
            <p className="text-gray-700 mb-1">Your reference is <strong className="text-green">{submitted.ref}</strong>.</p>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              We'll confirm by text and email within the hour. Thanks, {name.split(" ")[0]}.
            </p>
            <button type="button" onClick={onClose} className="bg-green text-white font-bold py-3 px-7 rounded-lg hover:bg-green-deep transition">
              Close
            </button>
          </div>
        ) : (
          <>
            {/* STEP 1: Service */}
            {step === 1 && (
              <>
                <h2 id="quote-modal-title" className="font-serif font-extrabold text-2xl text-charcoal mb-1.5">What needs cleaning?</h2>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  We'll show you a price on the next step — before you share any contact details.
                </p>
                <div className="grid sm:grid-cols-2 gap-2.5 mb-6">
                  {SERVICE_KEYS.map((k) => (
                    <button type="button" key={k} className={pillCls(svc === k)} onClick={() => setSvc(k)}>
                      {SERVICE_LABELS[k]}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  disabled={!svc}
                  onClick={() => svc && setStep(2)}
                  className={`w-full rounded-lg py-3.5 text-base font-bold ${
                    svc ? "bg-green text-white hover:bg-green-deep cursor-pointer" : "bg-gray-300 text-white/70 cursor-not-allowed"
                  } transition`}
                >
                  Continue
                </button>
              </>
            )}

            {/* STEP 2: Size + Date + Postcode */}
            {step === 2 && (
              <>
                <h2 id="quote-modal-title" className="font-serif font-extrabold text-2xl text-charcoal mb-1.5">Property size and date</h2>
                <p className="text-gray-500 text-sm mb-5">Select your property size to see your price.</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {SIZE_KEYS.map((k) => (
                    <button type="button" key={k} className={pillCls(sz === k)} onClick={() => setSz(k)}>
                      {SIZE_LABELS[k]}
                    </button>
                  ))}
                </div>

                {est !== null && (
                  <div className="bg-mint-bg border border-mint rounded-xl p-5 mb-5 text-center">
                    <div className="text-[11px] font-bold tracking-widest text-green uppercase mb-1.5">Your estimated price</div>
                    <div className="font-serif font-black text-green text-5xl leading-none">{formatGBP(est)}</div>
                    <div className="text-xs text-gray-500 mt-1.5">No hidden charges. Final price confirmed at booking.</div>
                  </div>
                )}

                <label htmlFor="q-date" className="block text-sm font-medium text-gray-700 mb-1">Preferred date</label>
                <input id="q-date" type="date" min={today} className={inputCls} value={date} onChange={(e) => setDate(e.target.value)} />

                <label htmlFor="q-slot" className="block text-sm font-medium text-gray-700 mb-1 mt-2">Preferred slot</label>
                <select id="q-slot" className={inputCls} value={slot} onChange={(e) => setSlot(e.target.value)}>
                  {SLOTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>

                <label htmlFor="q-postcode" className="block text-sm font-medium text-gray-700 mb-1 mt-2">Postcode <span className="text-gray-400">(optional)</span></label>
                <input id="q-postcode" inputMode="text" autoComplete="postal-code" className={inputCls} placeholder="e.g. N3 1AB" value={postcode} onChange={(e) => setPostcode(e.target.value)} />

                <div className="flex gap-2.5 mt-3">
                  <button type="button" onClick={() => setStep(1)} className="px-6 py-3 border border-gray-200 rounded-lg text-charcoal font-bold hover:bg-gray-50">
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={!sz}
                    onClick={() => sz && setStep(3)}
                    className={`flex-1 rounded-lg py-3 text-base font-bold ${
                      sz ? "bg-green text-white hover:bg-green-deep cursor-pointer" : "bg-gray-300 text-white/70 cursor-not-allowed"
                    } transition`}
                  >
                    Continue
                  </button>
                </div>
              </>
            )}

            {/* STEP 3: Contact details */}
            {step === 3 && (
              <>
                <h2 id="quote-modal-title" className="font-serif font-extrabold text-2xl text-charcoal mb-1.5">Almost done</h2>
                <p className="text-gray-500 text-sm mb-4">We'll confirm your booking by text and email within the hour.</p>

                {est !== null && (
                  <div className="flex justify-between items-center bg-gray-50 rounded-lg px-4 py-3 mb-5">
                    <span className="text-sm text-gray-500">Your price</span>
                    <span className="font-serif font-black text-green text-2xl">{formatGBP(est)}</span>
                  </div>
                )}

                <input autoComplete="name" placeholder="Full name" className={inputCls} value={name} onChange={(e) => setName(e.target.value)} />
                <input autoComplete="email" type="email" placeholder="Email address" className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} />
                {email && !validEmail && <div className="text-xs text-red-700 -mt-1 mb-2">Please enter a valid email.</div>}
                <input autoComplete="tel" type="tel" placeholder="Mobile number" className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)} />
                {phone && !validPhone && <div className="text-xs text-red-700 -mt-1 mb-2">Please enter a valid UK mobile number.</div>}
                <textarea placeholder="Anything we should know? (optional)" rows={3} className={inputCls + " resize-none"} value={notes} onChange={(e) => setNotes(e.target.value)} />

                {error && <div className="text-sm text-red-700 mb-2">{error}</div>}

                <div className="flex gap-2.5 mt-3">
                  <button type="button" onClick={() => setStep(2)} className="px-6 py-3 border border-gray-200 rounded-lg text-charcoal font-bold hover:bg-gray-50">
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={!canSubmit}
                    onClick={handleSubmit}
                    className={`flex-1 rounded-lg py-3 text-base font-bold ${
                      canSubmit ? "bg-green text-white hover:bg-green-deep cursor-pointer" : "bg-gray-300 text-white/70 cursor-not-allowed"
                    } transition`}
                  >
                    {submitting ? "Sending…" : "Confirm Booking"}
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
