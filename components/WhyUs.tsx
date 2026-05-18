import { whyPoints } from "@/content/site";

export default function WhyUs() {
  return (
    <section className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-wrap mx-auto px-5 md:px-8 py-14 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <span className="block text-[11px] font-bold tracking-[3px] text-green uppercase mb-3.5">Why EcovaPro</span>
            <h2 className="font-serif font-black text-charcoal leading-[1.1] tracking-tight text-[clamp(28px,4vw,46px)] mb-6">
              We're not the cheapest.<br />
              <span className="text-green">We're the standard.</span>
            </h2>
            <p className="text-gray-700 leading-[1.85] mb-4">
              There are hundreds of cleaning companies in London. Most will do a reasonable job. A handful will do an exceptional one.
            </p>
            <p className="text-gray-700 leading-[1.85]">
              We're in the second group. That means consistent teams who know your home, eco products that genuinely work,
              and a guarantee we actually honour. No chasing, no excuses, no disappointment.
            </p>
          </div>
          <div>
            {whyPoints.map(([t, d], i) => (
              <div key={t} className={`flex gap-5 pb-5 ${i < whyPoints.length - 1 ? "border-b border-gray-200 mb-5" : ""}`}>
                <div className="w-0.5 bg-mint flex-shrink-0 self-stretch min-h-[8px] rounded" aria-hidden />
                <div>
                  <div className="font-bold text-charcoal mb-1.5">{t}</div>
                  <div className="text-gray-700 text-sm leading-[1.7]">{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
