import { ecoPoints } from "@/content/site";

export default function EcoSection() {
  return (
    <section className="bg-mint-bg border-y border-mint">
      <div className="max-w-wrap mx-auto px-5 md:px-8 py-14 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <span className="block text-[11px] font-bold tracking-[3px] text-green uppercase mb-3.5">Our Commitment</span>
            <h2 className="font-serif font-black text-charcoal leading-[1.1] tracking-tight text-[clamp(28px,4vw,46px)] mb-6">
              Eco doesn't mean<br /><span className="text-green">a compromise.</span>
            </h2>
            <p className="text-gray-700 leading-[1.85] mb-4">
              People assume plant-based products are less effective. They're not — not when you use the right ones.
              Ours are independently certified, biodegradable, and free from the chemicals that linger on surfaces.
            </p>
            <p className="text-gray-700 leading-[1.85]">
              Better for your family. Better for the environment. The same result you'd expect from anything else on the market — usually better.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {ecoPoints.map(([t, d]) => (
              <div key={t} className="bg-white rounded-xl p-5 border border-green/15">
                <div className="text-green text-[13px] font-extrabold mb-2 tracking-tight">{t}</div>
                <div className="text-gray-700 text-[13px] leading-[1.65]">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
