"use client";
import { useState } from "react";
import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";
import StickyWhatsapp from "./StickyWhatsapp";
import QuoteModal from "./QuoteModal";
import FAQ from "./FAQ";
import TrustBar from "./TrustBar";
import EcoSection from "./EcoSection";
import Testimonials from "./Testimonials";
import { faqs, BUSINESS } from "@/content/site";
import { startingPrice, formatGBP } from "@/lib/pricing";
import type { ServiceMeta } from "@/content/services";
import { SERVICES } from "@/content/services";

export default function ServicePageTemplate({ service }: { service: ServiceMeta }) {
  const [open, setOpen] = useState(false);
  const others = SERVICES.filter((s) => s.id !== service.id);
  const price = startingPrice(service.id);

  return (
    <>
      <Header onBookClick={() => setOpen(true)} />
      <main>
        {/* HERO */}
        <section
          className="relative -mt-[72px] pt-[72px] min-h-[68vh] md:min-h-[78vh] flex items-center overflow-hidden"
          style={{ background: "linear-gradient(to bottom, #163828 0%, #2a6b50 50%, #1F4D3A 100%)" }}
        >
          <div aria-hidden className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1400&q=80)", backgroundSize: "cover", backgroundPosition: "center" }} />
          <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(105deg, #163828F0 0%, #1F4D3ACC 60%, transparent 100%)" }} />
          <div className="relative max-w-wrap mx-auto px-5 md:px-8 py-16 md:py-24 w-full">
            <nav aria-label="Breadcrumb" className="text-mint/70 text-xs mb-5">
              <Link href="/" className="hover:text-mint">Home</Link> <span className="opacity-50">/</span> <span className="text-mint">{service.title}</span>
            </nav>
            <span className="block text-[11px] font-bold tracking-[4px] text-mint uppercase mb-3.5">
              {service.title} · London
            </span>
            <h1 className="font-serif font-black text-white leading-[1.05] tracking-tight mb-6 text-[clamp(34px,5vw,56px)] max-w-[720px]">
              {service.h1}
            </h1>
            <p className="text-white/80 text-lg leading-[1.7] mb-8 max-w-[600px]">{service.long[0]}</p>
            <div className="flex flex-wrap gap-3.5 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="bg-mint text-green-deep rounded-lg px-8 py-4 text-base font-extrabold hover:bg-mint/90 transition"
              >
                Get {formatGBP(price)}+ Quote
              </button>
              <a href={`tel:${BUSINESS.phoneE164}`} className="inline-flex items-center gap-2 text-white border border-white/35 rounded-lg px-7 py-4 text-base font-semibold hover:bg-white/10 transition">
                {BUSINESS.phoneDisplay}
              </a>
              <span className="text-white/55 text-sm">Reply within the hour · 48-hour guarantee</span>
            </div>
          </div>
        </section>

        <TrustBar />

        {/* BODY: copy + includes */}
        <section className="bg-white">
          <div className="max-w-wrap mx-auto px-5 md:px-8 py-14 md:py-20 grid md:grid-cols-[3fr_2fr] gap-12">
            <div>
              <span className="block text-[11px] font-bold tracking-[3px] text-green uppercase mb-3.5">What we do</span>
              <h2 className="font-serif font-black text-charcoal leading-[1.1] tracking-tight text-[clamp(26px,3.5vw,40px)] mb-6">
                {service.title} cleaning, done to the EcovaPro standard.
              </h2>
              {service.long.slice(1).map((p, i) => (
                <p key={i} className="text-gray-700 leading-[1.85] mb-4">{p}</p>
              ))}
              <div className="mt-8 p-5 bg-mint-bg border border-mint rounded-xl">
                <div className="flex items-baseline gap-4 flex-wrap">
                  <span className="text-[11px] font-bold tracking-widest text-green uppercase">Pricing</span>
                  <span className="font-serif font-black text-green text-3xl">From {formatGBP(price)}</span>
                  <span className="text-gray-600 text-sm">No hidden charges. Final price confirmed in writing before we start.</span>
                </div>
                <button type="button" onClick={() => setOpen(true)} className="mt-4 bg-green text-white rounded-lg px-7 py-3 font-bold hover:bg-green-deep transition">
                  Get your price in 60 seconds
                </button>
              </div>
            </div>

            <aside className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="font-serif font-extrabold text-charcoal text-xl mb-4">What's included</h3>
              <ul className="space-y-3">
                {service.includes.map((i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 leading-[1.6]">
                    <span aria-hidden className="text-green font-bold flex-shrink-0 mt-0.5">✓</span>
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-5 border-t border-gray-200 text-sm text-gray-600 leading-[1.7]">
                Need something not listed? <a href={`mailto:${BUSINESS.email}`} className="text-green font-semibold underline-offset-2 hover:underline">Email us</a> or call <a href={`tel:${BUSINESS.phoneE164}`} className="text-green font-semibold">{BUSINESS.phoneDisplay}</a> — we customise every clean.
              </div>
            </aside>
          </div>
        </section>

        <EcoSection />
        <Testimonials />
        <FAQ items={faqs} idPrefix={`faq-${service.id}`} />

        {/* OTHER SERVICES */}
        <section className="bg-white border-t border-gray-200">
          <div className="max-w-wrap mx-auto px-5 md:px-8 py-14 md:py-20">
            <div className="text-center mb-10">
              <span className="block text-[11px] font-bold tracking-[3px] text-green uppercase mb-3.5">Other services</span>
              <h2 className="font-serif font-black text-charcoal leading-[1.1] tracking-tight text-[clamp(26px,3.5vw,38px)]">Need something else?</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
              {others.map((s) => (
                <Link key={s.id} href={`/${s.slug}`} className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:border-green hover:shadow-md transition">
                  <h3 className="font-serif font-extrabold text-charcoal mb-1.5">{s.title}</h3>
                  <p className="text-gray-700 text-[13px] leading-[1.6] mb-3">{s.cardDesc}</p>
                  <span className="text-green text-sm font-bold">{`From ${formatGBP(startingPrice(s.id))}`} →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-charcoal">
          <div className="max-w-wrap mx-auto px-5 md:px-6 py-16 md:py-24 text-center">
            <span className="block text-[11px] font-bold tracking-[3px] text-mint uppercase mb-3.5">Ready to book</span>
            <h2 className="font-serif font-black text-white leading-[1.1] tracking-tight text-[clamp(28px,4vw,46px)] mb-5">
              {service.h1.replace(" London", "")} — book in 60 seconds.
            </h2>
            <p className="text-white/55 leading-[1.75] mb-10 max-w-[520px] mx-auto text-[17px]">
              See your price before you share any contact details. No commitment. No sales call.
            </p>
            <div className="flex gap-3.5 justify-center flex-wrap">
              <button type="button" onClick={() => setOpen(true)} className="bg-mint text-green-deep rounded-lg px-9 py-4 text-base font-extrabold">
                Get Quote
              </button>
              <a href={BUSINESS.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 bg-[#25D366] text-white rounded-lg px-9 py-4 text-base font-bold">
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <StickyWhatsapp />
      {open && <QuoteModal onClose={() => setOpen(false)} initialService={service.id} />}
    </>
  );
}
