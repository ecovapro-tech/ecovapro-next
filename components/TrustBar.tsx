import { trustStats } from "@/content/site";

export default function TrustBar() {
  return (
    <div className="bg-charcoal py-4 md:py-5 px-5 md:px-8">
      <div className="max-w-wrap mx-auto flex flex-wrap justify-center items-center gap-x-12 gap-y-4">
        {trustStats.map(([n, l]) => (
          <div key={n} className="text-center">
            <div className="font-serif font-black text-mint text-[22px] leading-none">{n}</div>
            <div className="text-white/40 text-[11px] tracking-wide mt-1">{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
