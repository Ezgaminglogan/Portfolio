"use client";
import { useRef } from "react";
import { useScroll, useTransform, useMotionTemplate, MotionValue } from "framer-motion";

/**
 * Reusable scroll-driven heading animation hook.
 * Returns a ref + motion style values that fade, scale, blur,
 * spread letters, and shrink a decorative line on scroll.
 */
export function useAnimatedHeading() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end -0.2"],
  });

  // Hold fully visible for the first 60%, then animate out
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0, -80]);
  const blur = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0, 14]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  // Letter spread — only starts after 50%
  const letterSpacingVal = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, 10]);
  const letterSpacing = useMotionTemplate`${letterSpacingVal}px`;

  // Decorative line
  const lineWidthVal = useTransform(scrollYProgress, [0, 0.6, 1], [100, 100, 0]);
  const lineWidth = useMotionTemplate`${lineWidthVal}%`;

  return {
    containerRef,
    headingStyle: { opacity, scale, y, filter, letterSpacing },
    lineWidth,
    scrollYProgress,
  };
}
