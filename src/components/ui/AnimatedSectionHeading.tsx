"use client";
import { motion } from "framer-motion";
import { useAnimatedHeading } from "@/hooks/useAnimatedHeading";

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
  const { containerRef, headingStyle, lineScaleX } = useAnimatedHeading();

  // Split title into text + trailing period
  const hasPeriod = title.endsWith(".");
  const displayTitle = hasPeriod ? title.slice(0, -1) : title;

  return (
    <div ref={containerRef} className="relative mb-16 sm:mb-20">
      <motion.div
        className="flex flex-col items-center justify-center text-center"
        style={{
          opacity: headingStyle.opacity,
          scale: headingStyle.scale,
          y: headingStyle.y,
        }}
      >
        {/* Subtle label */}
        {label && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-blue-700 mb-4 bg-blue-50 border border-blue-200/80 px-3.5 py-1 rounded-full shadow-[0_2px_8px_rgba(37,99,235,0.06)]"
          >
            {label}
          </motion.span>
        )}

        {/* Main heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-slate-950 tracking-tight sm:tracking-tighter leading-[1.15] sm:leading-none break-words max-w-full px-2"
        >
          {displayTitle}
          {hasPeriod && <span className="text-blue-600">.</span>}
        </motion.h2>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-600 text-base mt-4 max-w-xl leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Animated decorative line */}
        <motion.div
          className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/35 to-transparent mt-6"
          style={{ scaleX: lineScaleX }}
        />
      </motion.div>
    </div>
  );
}
