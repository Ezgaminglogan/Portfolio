"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import ImageCarousel from "@/components/ImageCarousel";
import { sqliteImages } from "@/app/data";
import AnimatedSectionHeading from "@/components/ui/AnimatedSectionHeading";

export default function SqlitePortableSection() {
  return (
    <motion.section
      id="sqlite-portable"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
      className="py-24 sm:py-32 border-t border-slate-200/80 relative"
    >
      <div className="max-w-4xl mx-auto text-center mb-14">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-16 h-16 mx-auto mb-6 relative p-2 bg-white rounded-2xl border border-slate-200 shadow-sm"
        >
          <Image
            src="/image/sqlite-portables/SQLite-Portable.png"
            alt="SQLite Portable"
            fill
            sizes="64px"
            className="object-contain p-1"
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
          className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_8px_25px_rgba(37,99,235,0.3)] hover:shadow-[0_12px_30px_rgba(37,99,235,0.45)] -mt-8 cursor-pointer"
        >
          Download Desktop App ↗
        </a>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden bg-slate-950 shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate-800 rounded-2xl w-full mx-auto"
      >
        {/* Desktop Application Window Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-black/60 border-b border-white/10 select-none">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors" />
          </div>
          <div className="text-xs font-mono text-blue-300 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span>SQLite Portable v1.0 — Embedded Studio</span>
          </div>
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest hidden sm:block">
            Win32 / Portable
          </div>
        </div>

        {/* Viewport Carousel */}
        <ImageCarousel images={sqliteImages} autoplayInterval={5000} />
      </motion.div>
    </motion.section>
  );
}
