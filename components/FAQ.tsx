"use client";
import { useState } from "react";

export interface FaqRow { q: string; a: string; }

function FAQItem({ q, a, id }: FaqRow & { id: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        type="button"
        id={id}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left bg-transparent border-0 py-5 flex justify-between items-center gap-4"
      >
        <span className="font-semibold text-charcoal leading-[1.4]">{q}</span>
        <span
          aria-hidden
          className={`text-green text-xl flex-shrink-0 transition-transform ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      {open && (
        <p id={`${id}-panel`} role="region" aria-labelledby={id} className="mb-5 text-gray-700 leading-[1.8]">
          {a}
        </p>
      )}
    </div>
  );
}

export default function FAQ({ items, idPrefix = "faq" }: { items: FaqRow[]; idPrefix?: string }) {
  return (
    <section className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-wrap mx-auto px-5 md:px-8 py-14 md:py-20">
        <div className="max-w-[720px] mx-auto">
          <div className="text-center mb-8 md:mb-13">
            <span className="block text-[11px] font-bold tracking-[3px] text-green uppercase mb-3.5">Questions</span>
            <h2 className="font-serif font-black text-charcoal leading-[1.1] tracking-tight text-[clamp(28px,4vw,46px)]">
              Straight answers.
            </h2>
          </div>
          {items.map((f, i) => (
            <FAQItem key={i} id={`${idPrefix}-${i}`} q={f.q} a={f.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
