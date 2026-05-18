import { testimonials } from "@/content/site";
import JsonLd from "./JsonLd";

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// Cycle through a few brand-adjacent hues for avatars
const AVATAR_STYLES = [
  "bg-[#1F4D3A] text-mint",
  "bg-[#2D5F49] text-mint",
  "bg-[#163828] text-mint",
  "bg-[#224438] text-mint",
  "bg-[#1A4232] text-mint",
  "bg-[#305848] text-mint",
];

export default function Testimonials() {
  const reviewLd = testimonials.map((t) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    author:      { "@type": "Person", name: t.name },
    reviewRating: { "@type": "Rating", ratingValue: t.stars, bestRating: 5 },
    reviewBody:  t.text,
    itemReviewed: { "@type": "LocalBusiness", name: "EcovaPro" },
  }));

  return (
    <section id="reviews" className="bg-[#F9F9F7]">
      <div className="max-w-wrap mx-auto px-5 md:px-8 py-14 md:py-20">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10 md:mb-12">
          <div>
            <span className="block text-[11px] font-bold tracking-[3px] text-green uppercase mb-3">
              Client Reviews
            </span>
            <h2 className="font-serif font-black text-charcoal leading-[1.1] tracking-tight text-[clamp(26px,4vw,44px)]">
              What London says.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-serif font-black text-green text-5xl leading-none">4.9</span>
            <div>
              <div aria-hidden className="text-amber-400 text-xl tracking-widest leading-none">★★★★★</div>
              <div className="text-xs text-gray-400 mt-1">from 200+ reviews</div>
            </div>
          </div>
        </div>

        {/* 3-col grid */}
        <div className="grid md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <article
              key={i}
              className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col"
            >
              {/* Top: avatar + name + service badge */}
              <div className="flex items-start gap-3 mb-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    AVATAR_STYLES[i % AVATAR_STYLES.length]
                  }`}
                  aria-hidden="true"
                >
                  {initials(t.name)}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-charcoal text-sm leading-tight truncate">
                    {t.name}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">{t.area}, London</div>
                </div>
              </div>

              {/* Stars */}
              <div
                aria-label={`${t.stars} out of 5 stars`}
                className="text-amber-400 text-sm tracking-widest mb-3"
              >
                {"★".repeat(t.stars)}
              </div>

              {/* Quote */}
              <p className="text-gray-600 text-sm leading-[1.8] flex-1 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Service badge */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="inline-block text-[10px] font-bold tracking-[2px] text-green uppercase bg-mint-bg px-2.5 py-1 rounded-full">
                  {t.service}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-sm text-gray-400 mt-8">
          We don't ask clients to leave reviews. When they do, unprompted, it means more.
        </p>
      </div>

      {reviewLd.map((r, i) => (
        <JsonLd key={i} data={r} />
      ))}
    </section>
  );
}
