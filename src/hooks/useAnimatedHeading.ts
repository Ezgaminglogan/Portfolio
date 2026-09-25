import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";

/**
 * Reusable scroll-driven heading animation hook.
 * Returns a ref + motion style values that fade, scale, lift,
 * and shrink a decorative line on scroll. Only compositor-friendly
 * properties (opacity/transform) are animated to avoid per-frame layout.
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

  // Decorative line
  const lineScaleX = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0]);

  return {
    containerRef,
    headingStyle: { opacity, scale, y },
    lineScaleX,
    scrollYProgress,
  };
}
