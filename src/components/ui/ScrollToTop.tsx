"use client";
import { useState, useEffect, useCallback } from "react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

export default function ScrollToTop() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowScrollTop(window.scrollY > 300);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!showScrollTop) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-8 right-8 p-3 rounded-full bg-[#0f1422]/90 backdrop-blur-md border border-white/15 text-blue-300 hover:text-white hover:border-blue-400/40 hover:bg-blue-500/15 hover:shadow-[0_0_25px_rgba(59,130,246,0.35)] transition-all duration-300 z-50 hover:scale-105 active:scale-95"
    >
      <ChevronUpIcon className="w-5 h-5" />
    </button>
  );
}
