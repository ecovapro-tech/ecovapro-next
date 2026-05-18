"use client";
import { steps } from "@/content/site";

export default function HowItWorks({ onCtaClick }: { onCtaClick: () => void }) {
  return (
    <section className="bg-green-deep">
      <div className="max-w-wrap mx-auto px-5 md:px-8 py-14 md:py-20">
        <div className="text-center mb-10 md:mb-16">
          <span className="block text-[11px] font-bold tracking-[3px] text-mint uppercase mb-3.5">Simple Process</span>
          <h2 className="font-serif font-black text-white leading-[1.1] tracking-tight text-[clamp(28px,4vw,46px)]">
            Three steps. That's it.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-0">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className={`text-center md:px-8 ${i < 2 ? "md:border-r md:border-white/10" : ""}`}
            >
              <div aria-hidden className="font-serif font-black text-[72px] leading-none mb-5 text-mint/15 tracking-tight">
                {s.n}
              </div>
              <h3 className="font-serif font-extrabold text-white text-xl mb-3.5 tracking-tight">{s.title}</h3>
              <p className="text-white/60 leading-[1.75]">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <button
            type="button"
            onClick={onCtaClick}
            className="bg-mint text-green-deep rounded-lg px-10 py-4 text-base font-extrabold hover:bg-mint/90 transition"
          >
            Get My Price Now
          </button>
        </div>
      </div>
    </section>
  );
}
