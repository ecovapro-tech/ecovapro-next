"use client";
import { useState } from "react";
import Header from "./Header";
import Hero from "./Hero";
import TrustBar from "./TrustBar";
import Services from "./Services";
import WhyUs from "./WhyUs";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import EcoSection from "./EcoSection";
import Areas from "./Areas";
import FAQ from "./FAQ";
import FinalCTA from "./FinalCTA";
import Footer from "./Footer";
import StickyWhatsapp from "./StickyWhatsapp";
import QuoteModal from "./QuoteModal";
import { faqs } from "@/content/site";

export default function HomeClient() {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);

  return (
    <>
      <Header onBookClick={openModal} />
      <main>
        <Hero onCtaClick={openModal} />
        <TrustBar />
        <Services onQuoteClick={openModal} />
        <WhyUs />
        <HowItWorks onCtaClick={openModal} />
        <Testimonials />
        <EcoSection />
        <Areas />
        <FAQ items={faqs} />
        <FinalCTA onCtaClick={openModal} />
      </main>
      <Footer />
      <StickyWhatsapp />
      {open && <QuoteModal onClose={() => setOpen(false)} />}
    </>
  );
}
