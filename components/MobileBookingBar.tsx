"use client";
import { useEffect, useState } from "react";
import { BUSINESS } from "@/content/site";

export default function MobileBookingBar({
  onBookClick,
}: {
  onBookClick: () => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 120);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {/* Safe-area padding for iOS home bar */}
      <div className="bg-white border-t border-gray-200 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <div className="flex gap-2.5">
          <a
            href={`tel:${BUSINESS.phoneE164}`}
            className="flex-none flex items-center gap-2 border-2 border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-charcoal hover:border-gray-300 transition"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 011 2.18 2 2 0 013 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
            </svg>
            Call
          </a>
          <button
            type="button"
            onClick={onBookClick}
            className="flex-1 bg-green text-white font-bold rounded-xl py-3 text-sm hover:bg-green-deep transition"
          >
            Get Instant Price
          </button>
        </div>
      </div>
    </div>
  );
}
