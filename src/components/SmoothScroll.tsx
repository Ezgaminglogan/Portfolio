"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { MotionConfig } from "framer-motion";

interface SmoothScrollProps {
  children: React.ReactNode;
}

let lenis: Lenis | null = null;

/** Scroll to a page offset through Lenis when active, natively otherwise. */
export function scrollToY(top: number) {
  if (lenis) {
    lenis.scrollTo(top);
    return;
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
}

/** Lock page scroll for modals. Lenis ignores body overflow, so it must be stopped too. */
export function lockScroll() {
  document.body.style.overflow = "hidden";
  lenis?.stop();
}

export function unlockScroll() {
  document.body.style.overflow = "";
  lenis?.start();
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    if (prefersReducedMotion.matches) {
      return;
    }

    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenis = instance;

    let rafId: number;

    function raf(time: number) {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
      lenis = null;
    };
  }, []);

  // reducedMotion="user": Framer skips transform/layout animations for users who prefer reduced motion
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
