"use client";
import { motion } from "framer-motion";
import { useAnimatedHeading } from "@/hooks/useAnimatedHeading";
import { ReactNode } from "react";

interface AnimatedSectionHeadingProps {
  title: string;
  subtitle?: string;
  label?: string;
  /** ref callback so the parent can access the container ref */
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

/**
 * Big centered scroll-animated heading.
 * Fades, scales, blurs, and spreads letters on scroll.
 */
export default function AnimatedSectionHeading({
  title,
  subtitle,
  label,
}: AnimatedSectionHeadingProps) {
  const { containerRef, headingStyle, lineWidth } = useAnimatedHeading();

  // Split title into text + trailing period
  const hasPeriod = title.endsWith(".");
  const displayTitle = hasPeriod ? title.slice(0, -1) : title;

  return (
    <div ref={containerRef} className="relative mb-20">
      <motion.div
        className="flex flex-col items-center justify-center text-center"
        style={{
          opacity: headingStyle.opacity,
          scale: headingStyle.scale,
          y: headingStyle.y,
          filter: headingStyle.filter,
        }}
      >
        {/* Subtle label */}
        {label && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400/50 mb-4"
          >
            {label}
          </motion.span>
        )}

        {/* Main heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ letterSpacing: headingStyle.letterSpacing }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-none"
        >
          {displayTitle}
          {hasPeriod && <span className="text-emerald-400">.</span>}
        </motion.h2>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-500 text-base mt-4 max-w-lg"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Animated decorative line */}
        <motion.div
          className="h-px bg-linear-to-r from-transparent via-emerald-500/40 to-transparent mt-6"
          style={{ width: lineWidth }}
        />
      </motion.div>
    </div>
  );
}
