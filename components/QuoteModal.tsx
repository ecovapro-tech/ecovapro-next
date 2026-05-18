"use client";
import { useEffect, useMemo, useReducer, useState } from "react";
import {
  estimatePrice, formatGBP,
  SERVICE_KEYS, SERVICE_LABELS,
  ADDON_KEYS, ADDON_LABELS, ADDON_PRICES,
  FREQUENCY_KEYS, FREQUENCY_LABELS, FREQUENCY_DISCOUNT,
  bedroomsToSize,
  type ServiceKey, type AddonKey, type FrequencyKey,
} from "@/lib/pricing";

// ─── constants ────────────────────────────────────────────────────────────────

const SLOTS = [
  { id: "morning",   label: "Morning",   sub: "8am – 12pm" },
  { id: "afternoon", label: "Afternoon", sub: "12pm – 4pm" },
  { id: "evening",   label: "Evening",   sub: "4pm – 8pm"  },
  { id: "flexible",  label: "Flexible",  sub: "Any time"   },
];

const BEDROOM_OPTS = [
  { value: 0, label: "Studio" },
  { value: 1, label: "1 Bed"  },
  { value: 2, label: "2 Bed"  },
  { value: 3, label: "3 Bed"  },
  { value: 4, label: "4 Bed"  },
  { value: 5, label: "5+ Bed" },
];

const STEP_TITLES = [
  "What needs cleaning?",
  "Your property",
  "When works for you?",
  "Where are you based?",
  "Your contact details",
];

const STEP_SUBS = [
  "We'll show you a price before asking for anything.",
  "Size, add-ons, and how often you need us.",
  "Pick a date and time — we'll confirm within the hour.",
  "So we can check availability in your area.",
  "We'll text and email your confirmation right away.",
];

// ─── types ────────────────────────────────────────────────────────────────────

interface BookingState {
  service:   ServiceKey | "";
  bedrooms:  number;
  bathrooms: number;
  addons:    AddonKey[];
  frequency: FrequencyKey;
  date:      string;
  slot:      string;
  urgent:    boolean;
  postcode:  string;
  address:   string;
  notes:     string;
  name:      string;
  email:     string;
  phone:     string;
}

const INITIAL: BookingState = {
  service:   "",
  bedrooms:  1,
  bathrooms: 1,
  addons:    [],
  frequency: "once",
  date:      "",
  slot:      "flexible",
  urgent:    false,
  postcode:  "",
  address:   "",
  notes:     "",
  name:      "",
  email:     "",
  phone:     "",
};

type Step = 1 | 2 | 3 | 4 | 5;

// ─── helpers ──────────────────────────────────────────────────────────────────

const pill = (active: boolean, extra = "") =>
  `border-2 rounded-xl text-sm font-semibold cursor-pointer transition-all ${extra} ${
    active
      ? "border-green bg-mint-bg text-green-deep"
      : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
  }`;

const inputCls =
  "w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-green transition-colors text-charcoal placeholder:text-gray-400";

// ─── component ────────────────────────────────────────────────────────────────

export default function QuoteModal({
  onClose,
  initialService,
}: {
  onClose: () => void;
  initialService?: ServiceKey;
}) {
  const [step, setStep] = useState<Step>(initialService ? 2 : 1);
  const [form, patch] = useReducer(
    (s: BookingState, u: Partial<BookingState>) => ({ ...s, ...u }),
    { ...INITIAL, service: initialService ?? "" },
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<{ ref: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Lock body scroll + Escape to close
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
  const size  = bedroomsToSize(form.bedrooms);
  const est   = estimatePrice(form.service, size, form.addons, form.frequency, form.urgent);

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const validPhone = form.phone.replace(/\D/g, "").length >= 10;
  const canSubmit  = form.name.trim().length > 1 && validEmail && validPhone && !!form.service && !submitting;

  function toggleAddon(k: AddonKey) {
    patch({
      addons: form.addons.includes(k)
        ? form.addons.filter((a) => a !== k)
        : [...form.addons, k],
    });
  }

  async function handleSubmit() {
    if (!canSubmit) return;
    setError(null);
    setSubmitting(true);
    try {
      const r = await fetch("/api/bookings", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service:        form.service,
          bedrooms:       form.bedrooms,
          addons:         form.addons,
          frequency:      form.frequency,
          urgent:         form.urgent,
          preferred_date: form.date      || null,
          preferred_slot: form.slot      || null,
          customer_name:  form.name.trim(),
          customer_email: form.email.trim(),
          customer_phone: form.phone.trim(),
          postcode:       form.postcode.trim() || null,
          address:        form.address.trim()  || null,
          notes:          form.notes.trim()    || null,
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

  // ─── shared price strip ──────────────────────────────────────────────────

  const PriceStrip = est !== null && !submitted && step > 1 ? (
    <div className="flex items-center gap-2 mt-2.5 pt-2.5 border-t border-gray-100">
      <span className="text-xs text-gray-400">Estimated</span>
      <span className="font-serif font-black text-green text-lg leading-none">{formatGBP(est)}</span>
      {form.frequency !== "once" && (
        <span className="text-[10px] font-bold text-green bg-mint-bg px-2 py-0.5 rounded-full">
          −{Math.round(FREQUENCY_DISCOUNT[form.frequency] * 100)}% recurring
        </span>
      )}
      {form.urgent && (
        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
          Priority +£30
        </span>
      )}
    </div>
  ) : null;

  // ─── back / forward buttons ──────────────────────────────────────────────

  const BackBtn = ({ to }: { to: Step }) => (
    <button
      type="button"
      onClick={() => setStep(to)}
      className="px-5 py-3.5 border-2 border-gray-200 rounded-xl text-charcoal font-bold hover:bg-gray-50 transition text-lg"
    >
      ←
    </button>
  );

  const NextBtn = ({
    to,
    disabled = false,
    label = "Continue →",
  }: {
    to: Step;
    disabled?: boolean;
    label?: string;
  }) => (
    <button
      type="button"
      disabled={disabled}
      onClick={() => !disabled && setStep(to)}
      className={`flex-1 rounded-xl py-3.5 text-base font-bold transition ${
        disabled
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "bg-green text-white hover:bg-green-deep cursor-pointer"
      }`}
    >
      {label}
    </button>
  );

  // ─── render ──────────────────────────────────────────────────────────────

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="qm-title"
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center sm:p-4 bg-black/60 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-[500px] max-h-[92vh] overflow-y-auto animate-fade-up shadow-2xl"
      >
        {/* ── sticky header ── */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 pt-5 pb-4 z-10">
          <div className="flex justify-between items-center mb-3">
            {!submitted ? (
              <div className="flex gap-1.5 items-center">
                {([1, 2, 3, 4, 5] as Step[]).map((n) => (
                  <div
                    key={n}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      n <= step ? "bg-green w-7" : "bg-gray-200 w-3"
                    }`}
                  />
                ))}
                <span className="text-xs text-gray-400 ml-1">
                  {step}/5
                </span>
              </div>
            ) : (
              <div className="text-sm font-bold text-green">✓ Booking confirmed</div>
            )}
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 text-xl leading-none"
            >
              ×
            </button>
          </div>

          {!submitted && (
            <div>
              <h2 id="qm-title" className="font-serif font-black text-charcoal text-xl leading-tight">
                {STEP_TITLES[step - 1]}
              </h2>
              <p className="text-gray-400 text-xs mt-0.5">{STEP_SUBS[step - 1]}</p>
              {PriceStrip}
            </div>
          )}
        </div>

        {/* ── body ── */}
        <div className="px-6 py-5">

          {/* ──────── SUCCESS ──────── */}
          {submitted && (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-mint-bg border-2 border-mint flex items-center justify-center text-3xl text-green mx-auto mb-4">
                ✓
              </div>
              <h2 id="qm-title" className="font-serif font-extrabold text-2xl text-charcoal mb-1">
                Booking received
              </h2>
              <p className="text-gray-600 mb-0.5">
                Reference: <strong className="text-green">{submitted.ref}</strong>
              </p>
              <p className="text-gray-400 text-sm mb-6">
                We'll confirm by text and email within the hour, {form.name.split(" ")[0]}.
              </p>

              {est !== null && (
                <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left text-sm">
                  <div className="flex justify-between text-gray-500 mb-1">
                    <span>{SERVICE_LABELS[form.service as ServiceKey]}</span>
                    <span>{BEDROOM_OPTS.find((o) => o.value === form.bedrooms)?.label}</span>
                  </div>
                  {form.addons.length > 0 && (
                    <p className="text-gray-400 text-xs mb-1">
                      + {form.addons.map((k) => ADDON_LABELS[k]).join(", ")}
                    </p>
                  )}
                  {form.date && (
                    <p className="text-gray-400 text-xs">
                      {form.date} · {SLOTS.find((s) => s.id === form.slot)?.label}
                    </p>
                  )}
                  <div className="flex justify-between border-t border-gray-200 mt-3 pt-3 font-bold">
                    <span className="text-gray-600">Total estimate</span>
                    <span className="text-green font-serif font-black text-lg">{formatGBP(est)}</span>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={onClose}
                className="w-full bg-green text-white font-bold py-3.5 rounded-xl hover:bg-green-deep transition"
              >
                Done
              </button>
            </div>
          )}

          {/* ──────── STEP 1: Service ──────── */}
          {!submitted && step === 1 && (
            <div>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {SERVICE_KEYS.map((k) => (
                  <button
                    type="button"
                    key={k}
                    onClick={() => patch({ service: k })}
                    className={pill(form.service === k, "py-4 px-4 text-left")}
                  >
                    {SERVICE_LABELS[k]}
                  </button>
                ))}
              </div>

              <button
                type="button"
                disabled={!form.service}
                onClick={() => form.service && setStep(2)}
                className={`w-full rounded-xl py-4 text-base font-bold transition ${
                  form.service
                    ? "bg-green text-white hover:bg-green-deep"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                Continue →
              </button>
              <p className="text-center text-xs text-gray-400 mt-3">
                No payment now. Price shown instantly — before we ask for your details.
              </p>
            </div>
          )}

          {/* ──────── STEP 2: Property ──────── */}
          {!submitted && step === 2 && (
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Bedrooms
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {BEDROOM_OPTS.map((o) => (
                  <button
                    type="button"
                    key={o.value}
                    onClick={() => patch({ bedrooms: o.value })}
                    className={pill(form.bedrooms === o.value, "px-4 py-2")}
                  >
                    {o.label}
                  </button>
                ))}
              </div>

              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Bathrooms
              </p>
              <div className="flex gap-2 mb-6">
                {[1, 2, 3].map((n) => (
                  <button
                    type="button"
                    key={n}
                    onClick={() => patch({ bathrooms: n })}
                    className={pill(form.bathrooms === n, "px-5 py-2")}
                  >
                    {n === 3 ? "3+" : n}
                  </button>
                ))}
              </div>

              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Add-ons{" "}
                <span className="font-normal normal-case text-gray-300">(optional)</span>
              </p>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {ADDON_KEYS.map((k) => {
                  const active = form.addons.includes(k);
                  return (
                    <button
                      type="button"
                      key={k}
                      onClick={() => toggleAddon(k)}
                      className={`flex items-center justify-between px-3.5 py-3 rounded-xl border-2 transition ${
                        active
                          ? "border-green bg-mint-bg"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <span className={`text-sm font-semibold ${active ? "text-green-deep" : "text-gray-700"}`}>
                        {ADDON_LABELS[k]}
                      </span>
                      <span className={`text-xs font-bold ml-1 flex-shrink-0 ${active ? "text-green" : "text-gray-300"}`}>
                        +£{ADDON_PRICES[k]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {form.service === "regular" && (
                <>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Frequency
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {FREQUENCY_KEYS.map((k) => (
                      <button
                        type="button"
                        key={k}
                        onClick={() => patch({ frequency: k })}
                        className={pill(form.frequency === k, "px-4 py-2")}
                      >
                        {FREQUENCY_LABELS[k]}
                        {FREQUENCY_DISCOUNT[k] > 0 && (
                          <span className="ml-1.5 text-[10px] font-bold text-green">
                            −{Math.round(FREQUENCY_DISCOUNT[k] * 100)}%
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}

              <div className="flex gap-2.5">
                <BackBtn to={1} />
                <NextBtn to={3} />
              </div>
            </div>
          )}

          {/* ──────── STEP 3: Schedule ──────── */}
          {!submitted && step === 3 && (
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Preferred date
              </label>
              <input
                type="date"
                min={today}
                className={inputCls + " mb-5"}
                value={form.date}
                onChange={(e) => patch({ date: e.target.value })}
              />

              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Time preference
              </p>
              <div className="grid grid-cols-2 gap-2 mb-5">
                {SLOTS.map((s) => (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => patch({ slot: s.id })}
                    className={`py-3 px-4 rounded-xl border-2 text-left transition ${
                      form.slot === s.id
                        ? "border-green bg-mint-bg"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className={`text-sm font-semibold ${form.slot === s.id ? "text-green-deep" : "text-charcoal"}`}>
                      {s.label}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">{s.sub}</div>
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => patch({ urgent: !form.urgent })}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl border-2 transition mb-6 ${
                  form.urgent ? "border-amber-400 bg-amber-50" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="text-left">
                  <div className={`text-sm font-bold ${form.urgent ? "text-amber-700" : "text-charcoal"}`}>
                    Same / next day booking
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">Priority scheduling — +£30</div>
                </div>
                <div
                  className={`w-10 h-6 rounded-full transition-colors flex-shrink-0 flex items-center px-1 ml-3 ${
                    form.urgent ? "bg-amber-400" : "bg-gray-200"
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${
                      form.urgent ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </div>
              </button>

              <div className="flex gap-2.5">
                <BackBtn to={2} />
                <NextBtn to={4} />
              </div>
            </div>
          )}

          {/* ──────── STEP 4: Location ──────── */}
          {!submitted && step === 4 && (
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Postcode
              </label>
              <input
                inputMode="text"
                autoComplete="postal-code"
                className={inputCls + " mb-4"}
                placeholder="e.g. N3 1AB"
                value={form.postcode}
                onChange={(e) => patch({ postcode: e.target.value })}
              />

              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Full address{" "}
                <span className="font-normal normal-case text-gray-300">(optional)</span>
              </label>
              <input
                autoComplete="street-address"
                className={inputCls + " mb-4"}
                placeholder="e.g. 12 Maple Road, Finchley"
                value={form.address}
                onChange={(e) => patch({ address: e.target.value })}
              />

              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Notes{" "}
                <span className="font-normal normal-case text-gray-300">(optional)</span>
              </label>
              <textarea
                rows={3}
                className={inputCls + " resize-none mb-6"}
                placeholder="Entry instructions, pets, anything we should know…"
                value={form.notes}
                onChange={(e) => patch({ notes: e.target.value })}
              />

              <div className="flex gap-2.5">
                <BackBtn to={3} />
                <NextBtn to={5} />
              </div>
            </div>
          )}

          {/* ──────── STEP 5: Contact + Confirm ──────── */}
          {!submitted && step === 5 && (
            <div>
              {/* Summary card */}
              {est !== null && (
                <div className="bg-mint-bg border border-mint rounded-xl p-4 mb-5">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-bold text-green-deep">Your booking</span>
                    <span className="font-serif font-black text-green text-2xl leading-none">
                      {formatGBP(est)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 space-y-0.5">
                    <div className="flex justify-between">
                      <span>{SERVICE_LABELS[form.service as ServiceKey]}</span>
                      <span>{BEDROOM_OPTS.find((o) => o.value === form.bedrooms)?.label}</span>
                    </div>
                    {form.addons.length > 0 && (
                      <p className="text-gray-400">+ {form.addons.map((k) => ADDON_LABELS[k]).join(", ")}</p>
                    )}
                    {form.date && (
                      <p className="text-gray-400">
                        {form.date} · {SLOTS.find((s) => s.id === form.slot)?.label}
                      </p>
                    )}
                    {form.urgent && (
                      <p className="text-amber-600 font-semibold">Priority booking +£30</p>
                    )}
                    {form.frequency !== "once" && (
                      <p className="text-green font-semibold">
                        {FREQUENCY_LABELS[form.frequency]} · −{Math.round(FREQUENCY_DISCOUNT[form.frequency] * 100)}% off
                      </p>
                    )}
                  </div>
                </div>
              )}

              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                Full name
              </label>
              <input
                autoComplete="name"
                className={inputCls + " mb-3"}
                placeholder="Your name"
                value={form.name}
                onChange={(e) => patch({ name: e.target.value })}
              />

              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                Email
              </label>
              <input
                autoComplete="email"
                type="email"
                className={inputCls + " mb-1"}
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => patch({ email: e.target.value })}
              />
              {form.email && !validEmail && (
                <p className="text-xs text-red-600 mb-2">Please enter a valid email address.</p>
              )}
              {(!form.email || validEmail) && <div className="mb-3" />}

              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                Mobile number
              </label>
              <input
                autoComplete="tel"
                type="tel"
                className={inputCls + " mb-1"}
                placeholder="+44 7700 900000"
                value={form.phone}
                onChange={(e) => patch({ phone: e.target.value })}
              />
              {form.phone && !validPhone && (
                <p className="text-xs text-red-600 mb-3">Please enter a valid UK mobile number.</p>
              )}
              {(!form.phone || validPhone) && <div className="mb-4" />}

              {error && (
                <div className="text-sm text-red-700 bg-red-50 rounded-xl px-4 py-3 mb-4">
                  {error}
                </div>
              )}

              <div className="flex gap-2.5">
                <BackBtn to={4} />
                <button
                  type="button"
                  disabled={!canSubmit}
                  onClick={handleSubmit}
                  className={`flex-1 rounded-xl py-3.5 text-base font-bold transition ${
                    canSubmit
                      ? "bg-green text-white hover:bg-green-deep cursor-pointer"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {submitting
                    ? "Confirming…"
                    : est
                    ? `Confirm — ${formatGBP(est)}`
                    : "Confirm Booking"}
                </button>
              </div>

              <div className="flex items-center justify-center gap-5 mt-5 text-xs text-gray-300">
                <span>🔒 Secure</span>
                <span>No payment now</span>
                <span>48-hr guarantee</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
