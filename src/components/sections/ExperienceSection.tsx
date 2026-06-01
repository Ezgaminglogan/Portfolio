"use client";
import { useRef } from "react";
import { motion, useInView, useTransform } from "framer-motion";
import { experiences } from "@/app/data";
import { useParallax, useChildParallax } from "@/hooks/useParallax";

export default function ExperienceSection() {
  const { ref, y, opacity, scrollYProgress } = useParallax({
    speed: 0.12,
    fadeIn: true,
  });

  const leftY = useChildParallax(scrollYProgress, 0.08);
  const rightY = useChildParallax(scrollYProgress, -0.04);
  const lineProgress = useTransform(scrollYProgress, [0.12, 0.9], [0, 1]);

  return (
    <motion.section
      ref={ref}
      id="experience"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{ y, opacity }}
      className="py-32 border-t border-white/5"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <motion.div className="md:col-span-4" style={{ y: leftY }}>
          <h2 className="text-4xl font-extrabold text-white tracking-tighter">
            Timeline.
          </h2>
        </motion.div>
        <motion.div
          className="md:col-span-8"
          style={{ y: rightY }}
        >
          <div className="relative pl-10">
            <span className="absolute left-2 top-2 bottom-2 w-px bg-white/10" />
            <motion.span
              className="absolute left-2 top-2 bottom-2 w-px origin-top bg-gradient-to-b from-white via-white to-white/30 shadow-[0_0_12px_rgba(255,255,255,0.35)]"
              style={{ scaleY: lineProgress }}
            />
            <div className="flex flex-col gap-12">
              {experiences.map((exp, i) => (
                <TimelineItem key={i} exp={exp} index={i} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function TimelineItem({
  exp,
  index,
}: {
  exp: (typeof experiences)[number];
  index: number;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const inView = useInView(itemRef, { amount: 0.4, once: false });

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-6 flex flex-col sm:flex-row gap-4 sm:gap-12 group"
    >
      <div
        className={`sm:w-32 flex-shrink-0 text-sm pt-1 transition-colors ${
          inView ? "text-zinc-300" : "text-zinc-500"
        }`}
      >
        {exp.period}
      </div>
      <div>
        <h3 className="text-lg font-medium text-white mb-1 group-hover:text-zinc-300 transition-colors">
          {exp.title}
        </h3>
        <p
          className={`text-sm mb-4 transition-colors ${
            inView ? "text-zinc-300" : "text-zinc-400"
          }`}
        >
          {exp.company}
        </p>
        <p className="text-zinc-500 leading-relaxed">{exp.description}</p>
      </div>
    </motion.div>
  );
}
