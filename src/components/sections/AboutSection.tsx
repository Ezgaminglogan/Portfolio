"use client";
import { motion } from "framer-motion";
import { useParallax, useChildParallax } from "@/hooks/useParallax";
import AnimatedSectionHeading from "@/components/ui/AnimatedSectionHeading";

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
      className="pt-32 pb-32 border-t border-white/10"
    >
      {/* Big animated heading */}
      <AnimatedSectionHeading
        title="About Me."
        label="Get to know me"
      />

      {/* Content */}
      <motion.div
        className="max-w-5xl mx-auto flex flex-col gap-10 text-slate-300 text-xl leading-relaxed"
        style={{ y: rightY }}
      >
        <p>
          I&apos;m a Bachelor of Science in Information Technology
          graduate{" "}
          <span className="text-white font-semibold underline decoration-blue-500 underline-offset-4">Cum Laude</span>{" "}
          from Cebu Technological University — Naga Extension
          Campus, passionate about building high-performance, practical software solutions.
        </p>
        <p>
          My core stack spans PHP, MySQL, C#, and ASP.NET MVC alongside modern TypeScript & Next.js. With the
          power of clean architecture and agile workflows, I engineer production systems — from educational platforms
          and digital library ecosystems to industrial supply chain solutions.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10">
          {[
            { value: "BSIT", label: "Cum Laude Honors", subtext: "CTU Naga Campus" },
            { value: "10+", label: "Systems & Deployments", subtext: "Web, Desktop, Cloud" },
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
              className="p-5 rounded-xl bg-[#0f1422]/80 border border-white/10 hover:border-blue-400/30 hover:shadow-[0_0_25px_rgba(59,130,246,0.1)] transition-all flex flex-col justify-between"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight mb-2">
                {stat.value}
              </div>
              <div>
                <div className="text-xs text-blue-300 uppercase tracking-wider font-semibold font-mono">
                  {stat.label}
                </div>
                <div className="text-[11px] text-zinc-400 font-mono mt-0.5">
                  {stat.subtext}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Embedded Google Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 rounded-2xl overflow-hidden border border-white/10 relative group"
        >
          <div className="absolute inset-0 rounded-2xl pointer-events-none z-10 border border-white/10 group-hover:border-blue-400/30 transition-colors duration-300" />
          <iframe
            src="https://www.google.com/maps/embed?pb=!4v1784887476845!6m8!1m7!1s2JuZYgHpcOZ3q2AMfGK7oQ!2m2!1d10.20907328199153!2d123.7569274720599!3f269.3249228032494!4f7.028315723754389!5f0.7820865974627469"
            width="100%"
            height="280"
            style={{ border: 0, filter: "grayscale(0.6) brightness(0.65) contrast(1.2)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Location — Naga, Cebu"
            className="w-full"
          />
          <a
            href="https://maps.app.goo.gl/KZfeHGxGwRAiw9J5A"
            target="_blank"
            rel="noreferrer"
            className="absolute bottom-3 right-3 z-20 text-[10px] font-mono uppercase tracking-wider text-blue-300 hover:text-white bg-[#080b11]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-blue-500/25 hover:border-blue-400 transition-all duration-300"
          >
            Open in Maps ↗
          </a>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
