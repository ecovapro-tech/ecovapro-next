"use client";
import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import StickyWhatsapp from "./StickyWhatsapp";
import QuoteModal from "./QuoteModal";
import type { ServiceKey } from "@/lib/pricing";

export default function PageShell({
  children,
  initialService,
}: {
  children: React.ReactNode;
  initialService?: ServiceKey;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Header onBookClick={() => setOpen(true)} />
      <main>{children}</main>
      <Footer />
      <StickyWhatsapp />
      {open && <QuoteModal onClose={() => setOpen(false)} initialService={initialService} />}
    </>
  );
}
