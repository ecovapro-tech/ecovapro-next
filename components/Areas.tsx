import { areas } from "@/content/site";

export default function Areas() {
  return (
    <section id="areas" className="bg-white">
      <div className="max-w-wrap mx-auto px-5 md:px-8 py-14 md:py-20">
        <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16 items-start">
          <div>
            <span className="block text-[11px] font-bold tracking-[3px] text-green uppercase mb-3.5">Coverage</span>
            <h2 className="font-serif font-black text-charcoal leading-[1.1] tracking-tight text-[clamp(28px,4vw,46px)] mb-5">
              Cleaning services across London.
            </h2>
            <p className="text-gray-700 leading-[1.85]">
              Based in Finchley, we cover all of Greater London — from Hackney to Chelsea, Clapham to Canary Wharf.
            </p>
          </div>
          <ul className="flex flex-wrap gap-2.5">
            {areas.map((a) => (
              <li key={a} className="px-4 py-2.5 border border-gray-200 rounded-md text-sm text-gray-700 bg-gray-50">
                {a}
              </li>
            ))}
            <li className="px-4 py-2.5 border border-green rounded-md text-sm text-green bg-mint-bg font-semibold">
              + All of Greater London
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
