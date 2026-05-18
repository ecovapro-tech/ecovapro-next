"use client";
import { BUSINESS } from "@/content/site";

export default function FinalCTA({ onCtaClick }: { onCtaClick: () => void }) {
  return (
    <section id="contact" className="bg-charcoal">
      <div className="max-w-wrap mx-auto px-5 md:px-6 py-16 md:py-24 text-center">
        <span className="block text-[11px] font-bold tracking-[3px] text-mint uppercase mb-3.5">Take the first step</span>
        <h2 className="font-serif font-black text-white leading-[1.1] tracking-tight text-[clamp(28px,4vw,46px)] mb-5">
          Ready for a cleaner home?
        </h2>
        <p className="text-white/55 leading-[1.75] mb-10 max-w-[480px] mx-auto text-[17px]">
          Get a price in under 60 seconds. No commitment. No sales call. Just a clear, honest quote.
        </p>
        <div className="flex gap-3.5 justify-center flex-wrap">
          <button
            type="button"
            onClick={onCtaClick}
            className="bg-mint text-green-deep rounded-lg px-9 py-4 text-base font-extrabold hover:bg-mint/90 transition"
          >
            Get Quote
          </button>
          <a
            href={BUSINESS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#25D366] text-white rounded-lg px-9 py-4 text-base font-bold hover:opacity-90 transition"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
