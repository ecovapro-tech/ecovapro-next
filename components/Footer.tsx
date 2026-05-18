import Link from "next/link";
import { BUSINESS, areas as siteAreas } from "@/content/site";
import { SERVICES } from "@/content/services";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#080808] text-white/45 px-5 md:px-8 pt-12 md:pt-14 pb-7">
      <div className="max-w-wrap mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-7 md:gap-10 mb-12 pb-10 border-b border-white/10">
          <div className="col-span-2 md:col-span-1">
            <div className="text-mint font-black text-lg tracking-widest mb-4">ECOVAPRO</div>
            <p className="text-white/40 text-sm leading-[1.85] max-w-[240px] mb-5">
              Eco-friendly cleaning for homes, offices and short-let properties across London.
            </p>
            <a href={`tel:${BUSINESS.phoneE164}`} className="block text-mint font-semibold text-sm">
              {BUSINESS.phoneDisplay}
            </a>
            <a href={`mailto:${BUSINESS.email}`} className="block text-white/55 text-sm mt-1 hover:text-white">
              {BUSINESS.email}
            </a>
            <div className="text-white/25 text-xs mt-1.5">{BUSINESS.addressLine}</div>
          </div>

          <div>
            <div className="text-white/30 text-[11px] font-bold tracking-[2px] uppercase mb-4">Services</div>
            {SERVICES.map((s) => (
              <Link key={s.id} href={`/${s.slug}`} className="block text-white/45 text-sm mb-3 hover:text-mint transition-colors">
                {s.title}
              </Link>
            ))}
          </div>

          <div>
            <div className="text-white/30 text-[11px] font-bold tracking-[2px] uppercase mb-4">Areas</div>
            {siteAreas.slice(0, 6).map((a) => (
              <div key={a} className="text-white/45 text-sm mb-3">{a}</div>
            ))}
          </div>

          <div>
            <div className="text-white/30 text-[11px] font-bold tracking-[2px] uppercase mb-4">Company</div>
            <Link href="/blog" className="block text-white/45 text-sm mb-3 hover:text-mint">Blog</Link>
            <Link href="/#reviews" className="block text-white/45 text-sm mb-3 hover:text-mint">Reviews</Link>
            <Link href="/#contact" className="block text-white/45 text-sm mb-3 hover:text-mint">Contact</Link>
            <Link href="/privacy-policy" className="block text-white/45 text-sm mb-3 hover:text-mint">Privacy</Link>
            <Link href="/terms" className="block text-white/45 text-sm mb-3 hover:text-mint">Terms</Link>
          </div>
        </div>

        <div className="flex justify-between flex-wrap gap-3 text-white/25 text-xs">
          <span>© {year} EcovaPro Ltd. All rights reserved.</span>
          <div className="flex gap-7">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms &amp; Conditions</Link>
            <Link href="/refund-policy">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
