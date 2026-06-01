"use client";

import { useRef } from "react";
import {
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  MotionValue,
} from "framer-motion";
import { useViewport } from "@/context/ViewportContext";

interface ParallaxOptions {
  /** How far the element moves relative to scroll. Positive = moves down, negative = moves up. Default: 0.2 */
  speed?: number;
  /** Scroll offset range — when the effect starts and ends. Default: ["start end", "end start"] */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  offset?: any;
  /** Whether to apply opacity fading. Default: true */
  fadeIn?: boolean;
  /** Whether to apply scale transform. Default: false */
  scale?: boolean;
  /** Scale range [min, max]. Default: [0.95, 1] */
  scaleRange?: [number, number];
  /** Spring stiffness for smoothing. Default: 100 */
  stiffness?: number;
  /** Spring damping. Default: 30 */
  damping?: number;
}

interface ParallaxReturn {
  ref: React.RefObject<HTMLDivElement | null>;
  y: MotionValue<number>;
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
}

export function useParallax(options: ParallaxOptions = {}): ParallaxReturn {
  const {
    speed = 0.2,
    offset = ["start end", "end start"] as const,
    fadeIn = true,
    scale: enableScale = false,
    scaleRange = [0.95, 1],
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

  // Opacity — fades in from 0.3 to 1 over the first 40% of scroll range
  const rawOpacity = useTransform(
    scrollYProgress,
    fadeIn && !disabled ? [0, 0.3, 0.7, 1] : [0, 0, 1, 1],
    fadeIn && !disabled ? [0.2, 1, 1, 0.2] : [1, 1, 1, 1]
  );
  const opacity = useSpring(rawOpacity, { stiffness: 80, damping: 20 });

  // Scale — subtle zoom
  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    enableScale && !disabled
      ? [scaleRange[0], scaleRange[1], scaleRange[1], scaleRange[0]]
      : [1, 1, 1, 1]
  );
  const scale = useSpring(rawScale, { stiffness: 80, damping: 20 });

  return { ref, y, opacity, scale, scrollYProgress };
}

/**
 * Lightweight parallax for individual child elements within a section.
 * Uses the parent section's scrollYProgress to create offset movement.
 */
export function useChildParallax(
  scrollYProgress: MotionValue<number>,
  speed: number = 0.1
) {
  const prefersReducedMotion = useReducedMotion();
  const { isMobile } = useViewport();

  const disabled = prefersReducedMotion || isMobile;
  const range = disabled ? 0 : speed * 100;

  const rawY = useTransform(scrollYProgress, [0, 1], [range, -range]);
  const y = useSpring(rawY, { stiffness: 100, damping: 30 });

  return y;
}
