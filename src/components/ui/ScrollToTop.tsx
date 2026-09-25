"use client";
import { useState, useEffect, useCallback } from "react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { scrollToY } from "@/components/SmoothScroll";

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

  const scrollToTop = useCallback(() => scrollToY(0), []);

  if (!showScrollTop) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-8 right-8 p-3.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-blue-600 hover:text-white hover:bg-blue-600 hover:border-blue-600 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_25px_rgba(37,99,235,0.3)] transition-all duration-300 z-50 hover:scale-105 active:scale-95 cursor-pointer"
    >
      <ChevronUpIcon className="w-5 h-5 stroke-2" />
    </button>
  );
}
