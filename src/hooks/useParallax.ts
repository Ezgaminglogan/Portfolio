"use client";

import { useRef } from "react";
import {
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  type MotionValue,
  type UseScrollOptions,
} from "framer-motion";
import { useViewport } from "@/context/ViewportContext";

interface ParallaxOptions {
  /** How far the element moves relative to scroll. Positive = moves down, negative = moves up. Default: 0.2 */
  speed?: number;
  /** Scroll offset range — when the effect starts and ends. Default: ["start end", "end start"] */
  offset?: UseScrollOptions["offset"];
  /** Spring stiffness for smoothing. Default: 100 */
  stiffness?: number;
  /** Spring damping. Default: 30 */
  damping?: number;
}

interface ParallaxReturn {
  ref: React.RefObject<HTMLDivElement | null>;
  y: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
}

export function useParallax(options: ParallaxOptions = {}): ParallaxReturn {
  const {
    speed = 0.2,
    offset = ["start end", "end start"] as const,
    stiffness = 100,
    damping = 30,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isMobile } = useViewport();

  const disabled = prefersReducedMotion || isMobile;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset,
  });

  // Y transform — speed controls intensity (pixels of movement)
  const yRange = disabled ? 0 : speed * 100;
  const rawY = useTransform(scrollYProgress, [0, 1], [yRange, -yRange]);
  const y = useSpring(rawY, { stiffness, damping });

  return { ref, y, scrollYProgress };
}

/**
 * Lightweight parallax for individual child elements within a section.
 * Uses the parent section's scrollYProgress to create offset movement.
 */
export function useChildParallax(
  scrollYProgress: MotionValue<number>,
  speed: number = 0.1,
) {
  const prefersReducedMotion = useReducedMotion();
  const { isMobile } = useViewport();

  const disabled = prefersReducedMotion || isMobile;
  const range = disabled ? 0 : speed * 100;

  const rawY = useTransform(scrollYProgress, [0, 1], [range, -range]);
  const y = useSpring(rawY, { stiffness: 100, damping: 30 });

  return y;
}
