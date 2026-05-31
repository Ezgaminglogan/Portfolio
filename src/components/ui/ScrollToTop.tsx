"use client";
import { useState, useEffect } from "react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

export default function ScrollToTop() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!showScrollTop) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-8 right-8 p-3 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors z-50"
    >
      <ChevronUpIcon className="w-5 h-5" />
    </button>
  );
}
