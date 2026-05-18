"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BUSINESS } from "@/content/site";

export default function Header({ onBookClick }: { onBookClick: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navItems: [string, string][] = [
    ["Services", "/#services"],
    ["Areas", "/#areas"],
    ["Reviews", "/#reviews"],
    ["Blog", "/blog"],
    ["Contact", "/#contact"],
  ];

  return (
    <header
      className={`sticky top-0 z-40 h-[72px] flex items-center px-5 md:px-8 transition-colors ${
        scrolled ? "bg-white/95 backdrop-blur border-b border-gray-200" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-wrap mx-auto w-full flex items-center justify-between">
        <Link href="/" className={`text-lg font-black tracking-widest ${scrolled ? "text-green" : "text-white"}`}>
          ECOVAPRO
        </Link>

        <nav className="hidden md:flex gap-8 text-sm font-medium" aria-label="Primary">
          {navItems.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className={`${scrolled ? "text-gray-700 hover:text-green" : "text-white/85 hover:text-white"} transition-colors`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-5">
          <a
            href={`tel:${BUSINESS.phoneE164}`}
            className={`hidden md:inline text-sm font-semibold ${scrolled ? "text-green" : "text-mint"}`}
          >
            {BUSINESS.phoneDisplay}
          </a>
          <button
            type="button"
            onClick={onBookClick}
            className={`rounded-lg px-4 md:px-6 py-2 md:py-2.5 text-sm font-bold transition-all ${
              scrolled ? "bg-green text-white hover:bg-green-deep" : "bg-white/15 border border-white/50 text-white backdrop-blur"
            }`}
          >
            Book Now
          </button>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className={`md:hidden text-2xl ${scrolled ? "text-charcoal" : "text-white"}`}
          >
            {menuOpen ? "×" : "≡"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-[72px] left-0 right-0 bg-white border-b border-gray-200 shadow-lg md:hidden">
          <nav className="flex flex-col py-2" aria-label="Mobile">
            {navItems.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="px-6 py-3 text-gray-800 hover:bg-gray-50 border-b border-gray-100"
              >
                {label}
              </Link>
            ))}
            <a href={`tel:${BUSINESS.phoneE164}`} className="px-6 py-3 text-green font-semibold">
              {BUSINESS.phoneDisplay}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
