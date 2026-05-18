import { testimonials } from "@/content/site";
import JsonLd from "./JsonLd";

export default function Testimonials() {
  // Review JSON-LD per testimonial (aggregated count is in LocalBusiness).
  const reviewLd = testimonials.map((t) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    author: { "@type": "Person", name: t.name },
    reviewRating: { "@type": "Rating", ratingValue: t.stars, bestRating: 5 },
    reviewBody: t.text,
    itemReviewed: { "@type": "LocalBusiness", name: "EcovaPro" },
  }));

  return (
    <section id="reviews" className="bg-white">
      <div className="max-w-wrap mx-auto px-5 md:px-8 py-14 md:py-20">
        <div className="grid md:grid-cols-[1fr_2fr] gap-10 md:gap-16 items-start">
          <div className="md:sticky md:top-24">
            <span className="block text-[11px] font-bold tracking-[3px] text-green uppercase mb-3.5">Client Reviews</span>
            <h2 className="font-serif font-black text-charcoal leading-[1.1] tracking-tight text-[clamp(28px,4vw,46px)] mb-5">
              What London says.
            </h2>
            <p className="text-gray-700 leading-[1.85]">
              We don't ask clients to leave reviews. When they do, unprompted, it means more.
            </p>
            <div className="flex items-baseline gap-2 mt-7">
              <span className="font-serif font-black text-green text-5xl leading-none">4.9</span>
              <div>
                <div aria-hidden className="text-amber-500 text-lg tracking-widest">★★★★★</div>
                <div className="text-xs text-gray-500">Average rating</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            {testimonials.map((t, i) => (
              <article
                key={i}
                className={`py-7 ${i < testimonials.length - 1 ? "border-b border-gray-200" : ""}`}
              >
                <div className="flex justify-between items-start mb-3.5">
                  <div>
                    <div className="font-bold text-charcoal">{t.name}</div>
                    <div className="text-sm text-gray-500">{t.area}, London</div>
                  </div>
                  <span aria-label={`${t.stars} out of 5 stars`} className="text-amber-500 text-sm tracking-widest">
                    {"★".repeat(t.stars)}
                  </span>
                </div>
                <p className="text-gray-700 leading-[1.8] italic">&ldquo;{t.text}&rdquo;</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      {reviewLd.map((r, i) => <JsonLd key={i} data={r} />)}
    </section>
  );
}
