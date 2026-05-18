"use client";
import Link from "next/link";
import { SERVICES } from "@/content/services";
import { startingPrice, formatGBP } from "@/lib/pricing";

export default function Services({ onQuoteClick }: { onQuoteClick: () => void }) {
  const feature = SERVICES.find((s) => s.id === "eot")!;
  const others = SERVICES.filter((s) => s.id !== "eot");

  return (
    <section id="services" className="bg-white">
      <div className="max-w-wrap mx-auto px-5 md:px-8 py-14 md:py-20">
        <div className="grid md:grid-cols-2 gap-4 items-start mb-4">
          <div>
            <span className="block text-[11px] font-bold tracking-[3px] text-green uppercase mb-3.5">Our Services</span>
            <h2 className="font-serif font-black text-charcoal leading-[1.1] tracking-tight text-[clamp(28px,4vw,46px)]">
              Every clean done<br />properly.
            </h2>
          </div>
          <div className="pt-2">
            <p className="text-gray-700 leading-[1.85]">
              We don't offer a dozen tiers or confusing packages. Each service is clearly defined,
              fairly priced, and carried out to the same standard — every time.
            </p>
          </div>
        </div>

        {/* Feature service: End of Tenancy */}
        <article className="bg-green-deep rounded-2xl p-7 md:p-10 mb-4 grid md:grid-cols-2 gap-6 md:gap-10 items-center">
          <div>
            <span className="block text-[11px] font-bold tracking-[3px] text-mint uppercase mb-3.5">Most Requested</span>
            <h3 className="font-serif font-black text-white text-[28px] md:text-[34px] leading-[1.1] tracking-tight mb-4">
              <Link href={`/${feature.slug}`} className="hover:underline underline-offset-4">
                {feature.title} Cleaning
              </Link>
            </h3>
            <p className="text-white/70 leading-[1.8] mb-7">
              Our most thorough clean. Every surface, every corner — meeting every letting agency checklist so
              you get your deposit back in full. Our 48-hour re-clean guarantee is included as standard.
            </p>
            <div className="flex items-center gap-6 flex-wrap">
              <span className="font-serif font-black text-mint text-[28px]">{`From ${formatGBP(startingPrice("eot"))}`}</span>
              <button type="button" onClick={onQuoteClick} className="bg-mint text-green-deep rounded-lg px-6 py-3 text-sm font-extrabold hover:bg-mint/90 transition">
                Get Quote
              </button>
              <Link href={`/${feature.slug}`} className="text-mint text-sm font-semibold underline-offset-4 hover:underline">
                Learn more →
              </Link>
            </div>
          </div>
          <ul className="grid grid-cols-2 gap-3">
            {["Full kitchen deep clean","Oven & appliances","Bathroom descale","Skirting & walls","Carpets & floors","Windows inside","Cupboards inside out","DBS team included"].map((i) => (
              <li key={i} className="flex items-start gap-2 text-white/70 text-sm leading-snug">
                <span aria-hidden className="text-mint font-bold mt-0.5 flex-shrink-0">—</span>
                {i}
              </li>
            ))}
          </ul>
        </article>

        {/* Other services */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          {others.map((s) => (
            <article key={s.id} className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex flex-col">
              <h3 className="font-serif font-extrabold text-charcoal text-[17px] mb-2.5 tracking-tight">
                <Link href={`/${s.slug}`} className="hover:underline underline-offset-4">{s.title}</Link>
              </h3>
              <p className="text-gray-700 text-[13px] leading-[1.7] mb-4 flex-1">{s.cardDesc}</p>
              <div className="flex justify-between items-center">
                <span className="font-serif font-extrabold text-green text-[15px]">{`From ${formatGBP(startingPrice(s.id))}`}</span>
                <button type="button" onClick={onQuoteClick} className="border border-green text-green text-xs font-bold rounded-md px-3 py-1.5 hover:bg-green hover:text-white transition">
                  Quote
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
