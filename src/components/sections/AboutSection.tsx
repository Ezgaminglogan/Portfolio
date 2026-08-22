"use client";
import { motion } from "framer-motion";
import { useParallax, useChildParallax } from "@/hooks/useParallax";
import AnimatedSectionHeading from "@/components/ui/AnimatedSectionHeading";
import GeoTelemetryCard from "@/components/ui/GeoTelemetryCard";

export default function AboutSection() {
  const { ref, y, opacity, scrollYProgress } = useParallax({
    speed: 0.15,
    fadeIn: true,
  });

  const rightY = useChildParallax(scrollYProgress, -0.05);

  return (
    <motion.section
      ref={ref}
      id="about"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{ y, opacity }}
      className="py-24 sm:py-32 border-t border-slate-200/80"
    >
      {/* Big animated heading */}
      <AnimatedSectionHeading
        title="About Me."
        label="Get to know me"
      />

      {/* Content */}
      <motion.div
        className="w-full flex flex-col gap-10 text-slate-600 text-lg sm:text-xl leading-relaxed"
        style={{ y: rightY }}
      >
        <p>
          I&apos;m a Bachelor of Science in Information Technology graduate{" "}
          <span className="text-slate-950 font-bold underline decoration-blue-600 underline-offset-4">Cum Laude</span>{" "}
          and currently a <span className="text-blue-700 font-bold">BSIT College Instructor</span> at Cebu Technological University — Naga Extension Campus, combining academic mentorship in computing with practical, production-ready software development.
        </p>
        <p>
          My core stack spans PHP, MySQL, C#, and ASP.NET MVC alongside modern TypeScript & Next.js. With the
          power of clean architecture and agile workflows, I develop production systems — from educational platforms
          and digital library ecosystems to industrial supply chain solutions.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-slate-200/80">
          {[
            { value: "BSIT", label: "Instructor & Cum Laude", subtext: "CTU Naga Campus" },
            { value: "5+", label: "Project Systems", subtext: "Web, Desktop, Cloud" },
            { value: "Cebu", label: "Location / Timezone", subtext: "Philippines (GMT+8)" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-[0_10px_30px_rgba(37,99,235,0.08)] transition-all duration-300 flex flex-col justify-between shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-mono tracking-tight mb-3">
                {stat.value}
              </div>
              <div>
                <div className="text-xs text-blue-700 uppercase tracking-wider font-bold font-mono">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-500 font-mono mt-1">
                  {stat.subtext}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* High-Craft Geo-Telemetry & Live Timezone Station */}
        <GeoTelemetryCard />
      </motion.div>
    </motion.section>
  );
}
