"use client";
import { BUSINESS } from "@/content/site";

export default function Hero({ onCtaClick }: { onCtaClick: () => void }) {
  return (
    <section
      id="top"
      className="relative -mt-[72px] pt-[72px] min-h-[88vh] md:min-h-[90vh] flex items-center overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #163828 0%, #1F4D3A 55%, #1A3D2F 100%)",
      }}
    >
      {/* Background image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center opacity-[0.15]"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80)",
        }}
      />
      {/* Directional vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, #163828F5 0%, #1F4D3AE0 55%, #1F4D3A88 100%)",
        }}
      />

      <div className="relative max-w-wrap mx-auto px-5 md:px-8 py-20 md:py-28 w-full">
        <div className="max-w-[600px]">
          {/* Available badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3.5 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-mint animate-pulse flex-shrink-0" aria-hidden="true" />
            <span className="text-white/90 text-xs font-semibold tracking-wide">
              Taking bookings this week
            </span>
          </div>

          <h1 className="font-serif font-black text-white leading-[1.05] tracking-tight mb-5 text-[clamp(34px,5.5vw,64px)]">
            London's Cleanest<br />Homes Start Here
          </h1>

          <p className="text-white/75 text-lg leading-[1.8] mb-8 max-w-[460px]">
            Eco-certified products. DBS-checked professionals. A standard you'll notice the moment you walk in.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              type="button"
              onClick={onCtaClick}
              className="bg-mint text-green-deep rounded-xl px-8 py-4 text-base font-extrabold hover:bg-mint/90 transition shadow-lg shadow-black/20"
            >
              Get Instant Price
            </button>
            <a
              href={`tel:${BUSINESS.phoneE164}`}
              className="inline-flex items-center gap-2.5 bg-white/10 text-white border border-white/30 rounded-xl px-6 py-4 text-base font-semibold hover:bg-white/15 transition"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 011 2.18 2 2 0 013 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
              </svg>
              {BUSINESS.phoneDisplay}
            </a>
          </div>

          {/* Social proof row */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <div className="flex items-center gap-1.5">
              <span className="text-amber-400 text-sm tracking-widest" aria-hidden="true">★★★★★</span>
              <span className="text-white/60 text-sm">4.9 from 200+ reviews</span>
            </div>
            <span className="text-white/20 hidden sm:inline">·</span>
            <span className="text-white/60 text-sm">500+ London homes</span>
            <span className="text-white/20 hidden sm:inline">·</span>
            <span className="text-white/60 text-sm">48-hour guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
}
