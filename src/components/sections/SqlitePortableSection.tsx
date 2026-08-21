"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import ImageCarousel from "@/components/ImageCarousel";
import { sqliteImages } from "@/app/data";
import { useParallax, useChildParallax } from "@/hooks/useParallax";
import AnimatedSectionHeading from "@/components/ui/AnimatedSectionHeading";

export default function SqlitePortableSection() {
  const { ref, y, opacity, scale, scrollYProgress } = useParallax({
    speed: 0.1,
    fadeIn: true,
    scale: true,
    scaleRange: [0.95, 1],
  });

  const iconY = useChildParallax(scrollYProgress, 0.12);

  return (
    <motion.section
      ref={ref}
      id="sqlite-portable"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{ y, opacity, scale }}
      className="py-32 border-t border-white/10 relative"
    >
      <div className="max-w-4xl mx-auto text-center mb-16">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{ y: iconY }}
          className="w-16 h-16 mx-auto mb-6 relative"
        >
          <Image
            src="/image/sqlite-portables/SQLite-Portable.png"
            alt="SQLite Portable"
            fill
            sizes="64px"
            className="object-contain"
          />
        </motion.div>
        <AnimatedSectionHeading
          title="SQLite Portable."
          label="Standalone Software"
          subtitle="A lightweight SQLite database management desktop application featuring multiple language integrations and schema design tools."
        />
        <a
          href="https://www.mediafire.com/file/2pu0bqxgr979uam/SQLitePortableSetup.zip/file"
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-full text-sm font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(59,130,246,0.35)] hover:shadow-[0_0_35px_rgba(59,130,246,0.55)] -mt-8"
        >
          Download Desktop App ↗
        </a>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden bg-[#0f1422] shadow-[0_15px_50px_rgba(0,0,0,0.9)] border border-white/15 rounded-xl max-w-5xl mx-auto"
      >
        {/* Desktop Application Window Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-black/60 border-b border-white/10 select-none">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/70 hover:bg-red-500 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70 hover:bg-yellow-500 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-green-500/70 hover:bg-green-500 transition-colors" />
          </div>
          <div className="text-xs font-mono text-blue-300 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span>SQLite Portable v1.0 — Embedded Studio</span>
          </div>
          <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest hidden sm:block">
            Win32 / Portable
          </div>
        </div>

        {/* Viewport Carousel */}
        <ImageCarousel images={sqliteImages} autoplayInterval={5000} />
      </motion.div>
    </motion.section>
  );
}
