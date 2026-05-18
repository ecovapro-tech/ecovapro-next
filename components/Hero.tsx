"use client";
import { BUSINESS } from "@/content/site";

export default function Hero({ onCtaClick }: { onCtaClick: () => void }) {
  return (
    <section
      id="top"
      className="relative -mt-[72px] pt-[72px] min-h-[88vh] md:min-h-[92vh] flex items-center overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #163828 0%, #2a6b50 50%, #1F4D3A 100%)",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center opacity-[0.18]"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80)" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "linear-gradient(105deg, #163828F0 0%, #1F4D3ACC 60%, transparent 100%)" }}
      />

      <div className="relative max-w-wrap mx-auto px-5 md:px-8 py-20 md:py-28 w-full">
        <div className="max-w-[620px]">
          <span className="block text-[11px] font-bold tracking-[4px] text-mint uppercase mb-3">
            Eco-Certified · London-Based
          </span>
          <h1 className="font-serif font-black text-white leading-[1.05] tracking-tight mb-6 text-[clamp(36px,6vw,68px)]">
            London's Cleanest<br />Homes Start Here
          </h1>
          <p className="text-white/80 text-lg leading-[1.75] mb-10 max-w-[480px]">
            Eco-certified products. Trusted professionals. A standard you'll notice immediately.
          </p>
          <div className="flex flex-wrap gap-3.5 mb-10">
            <button
              type="button"
              onClick={onCtaClick}
              className="bg-mint text-green-deep rounded-lg px-8 py-4 text-base font-extrabold hover:bg-mint/90 transition"
            >
              Get Instant Price
            </button>
            <a
              href={`tel:${BUSINESS.phoneE164}`}
              className="inline-flex items-center gap-2 bg-transparent text-white border border-white/35 rounded-lg px-7 py-4 text-base font-semibold hover:bg-white/10 transition"
            >
              Call Now
            </a>
          </div>
          <p className="text-white/50 text-sm tracking-wide">
            4.9 rated &nbsp;·&nbsp; 500+ London homes &nbsp;·&nbsp; 48-hour guarantee
          </p>
        </div>
      </div>
    </section>
  );
}
