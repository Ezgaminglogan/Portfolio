"use client";
import { motion } from "framer-motion";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { useParallax, useChildParallax } from "@/hooks/useParallax";

export default function AboutSection() {
  const { ref, y, opacity, scrollYProgress } = useParallax({
    speed: 0.15,
    fadeIn: true,
  });

  // Left column moves slower for depth
  const leftY = useChildParallax(scrollYProgress, 0.08);
  // Right column moves a bit faster
  const rightY = useChildParallax(scrollYProgress, -0.05);

  return (
    <motion.section
      ref={ref}
      id="about"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{ y, opacity }}
      className="py-32 border-t border-emerald-500/10"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <motion.div className="md:col-span-4" style={{ y: leftY }}>
          <h2 className="text-4xl font-extrabold text-white tracking-tighter">
            About Me.
          </h2>
        </motion.div>
        <motion.div
          className="md:col-span-8 flex flex-col gap-10 text-zinc-400 text-lg leading-relaxed"
          style={{ y: rightY }}
        >
          <p>
            I&apos;m a Bachelor of Science in Information Technology
            graduate{" "}
            <span className="text-emerald-400 font-semibold">Cum Laude</span>{" "}
            from Cebu Technological University — Naga Extension
            Campus, passionate about building practical software solutions.
          </p>
          <p>
            My expertise spans PHP, MySQL, C#, and ASP.NET MVC. With the
            help of AI assistance, I transform requirements into
            functional, clean implementations — from educational systems
            and library platforms to industrial supply chain solutions.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-emerald-500/10">
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
                <div className="text-3xl font-bold text-emerald-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          <a
            href="/CV_Portfolio/Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 w-fit border-b border-emerald-500/20 pb-1 mt-4 transition-colors group"
          >
            <ArrowDownTrayIcon className="w-4 h-4 group-hover:-translate-y-1 transition-transform" /> Download Resume
          </a>

          {/* Embedded Google Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 rounded-2xl overflow-hidden border border-emerald-500/10 relative group"
          >
            <div className="absolute inset-0 rounded-2xl pointer-events-none z-10 border border-emerald-500/10 group-hover:border-emerald-500/20 transition-colors duration-300" />
            <iframe
              src="https://www.google.com/maps/embed?pb=!4v1784887476845!6m8!1m7!1s2JuZYgHpcOZ3q2AMfGK7oQ!2m2!1d10.20907328199153!2d123.7569274720599!3f269.3249228032494!4f7.028315723754389!5f0.7820865974627469"
              width="100%"
              height="280"
              style={{ border: 0, filter: "grayscale(0.3) brightness(0.7) contrast(1.1)" }}
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
              className="absolute bottom-3 right-3 z-20 text-[10px] uppercase tracking-wider text-zinc-500 hover:text-emerald-400 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/5 hover:border-emerald-500/20 transition-all duration-300"
            >
              Open in Maps ↗
            </a>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
