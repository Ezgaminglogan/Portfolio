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
          <span className="text-white font-semibold underline decoration-slate-500 underline-offset-4">Cum Laude</span>{" "}
          from Cebu Technological University — Naga Extension
          Campus, passionate about building practical software solutions.
        </p>
        <p>
          My expertise spans PHP, MySQL, C#, and ASP.NET MVC. With the
          help of AI assistance, I transform requirements into
          functional, clean implementations — from educational systems
          and library platforms to industrial supply chain solutions.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/10">
          {[
            { value: "BSIT", label: "Cum Laude" },
            { value: "3+", label: "Major Projects" },
            { value: "Cebu", label: "Based In" },
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
            >
              <div className="text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">
                {stat.label}
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
          <div className="absolute inset-0 rounded-2xl pointer-events-none z-10 border border-white/10 group-hover:border-white/25 transition-colors duration-300" />
          <iframe
            src="https://www.google.com/maps/embed?pb=!4v1784887476845!6m8!1m7!1s2JuZYgHpcOZ3q2AMfGK7oQ!2m2!1d10.20907328199153!2d123.7569274720599!3f269.3249228032494!4f7.028315723754389!5f0.7820865974627469"
            width="100%"
            height="280"
            style={{ border: 0, filter: "grayscale(0.5) brightness(0.7) contrast(1.1)" }}
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
            className="absolute bottom-3 right-3 z-20 text-[10px] uppercase tracking-wider text-slate-300 hover:text-white bg-[#0b0d12]/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10 hover:border-white/25 transition-all duration-300"
          >
            Open in Maps ↗
          </a>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
