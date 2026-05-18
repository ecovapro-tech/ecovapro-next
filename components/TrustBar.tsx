const ITEMS = [
  { icon: "★", stat: "4.9/5",   label: "Average rating"         },
  { icon: "✓", stat: "500+",    label: "Properties cleaned"     },
  { icon: "↺", stat: "48 hr",   label: "Re-clean guarantee"     },
  { icon: "⊘", stat: "100%",   label: "Plant-based products"   },
  { icon: "✦", stat: "DBS",     label: "Checked & insured team" },
] as const;

export default function TrustBar() {
  return (
    <div className="bg-charcoal border-b border-white/5">
      <div className="max-w-wrap mx-auto px-5 md:px-8 py-4 md:py-5">
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 md:gap-x-12">
          {ITEMS.map(({ icon, stat, label }) => (
            <div key={stat} className="flex items-center gap-2.5">
              <span className="text-mint text-sm leading-none" aria-hidden="true">{icon}</span>
              <div>
                <span className="font-serif font-black text-white text-[15px] leading-none">{stat}</span>
                <span className="text-white/35 text-[11px] ml-1.5 tracking-wide">{label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
