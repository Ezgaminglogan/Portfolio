"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import ImageCarousel from "@/components/ImageCarousel";
import { sqliteImages } from "@/app/data";
import { useParallax, useChildParallax } from "@/hooks/useParallax";

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
      className="py-32 border-t border-emerald-500/10 relative"
    >
      {/* Ambient neon glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/[0.06] rounded-full blur-[140px] pointer-events-none glow-pulse" />
      <div className="max-w-3xl mx-auto text-center mb-16">
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
        <h2 className="text-4xl font-extrabold text-white tracking-tighter mb-4">
          SQLite Portable.
        </h2>
        <p className="text-zinc-400 text-lg mb-8">
          A lightweight SQLite database management desktop application
          featuring multiple language integrations and schema design tools.
        </p>
        <a
          href="https://www.mediafire.com/file/2pu0bqxgr979uam/SQLitePortableSetup.zip/file"
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-emerald-500 text-black px-8 py-4 rounded-full text-sm font-semibold hover:bg-emerald-400 transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_0_24px_rgba(52,211,153,0.3)]"
        >
          Download Now
        </a>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="overflow-hidden bg-zinc-950 shadow-2xl"
      >
        <ImageCarousel images={sqliteImages} autoplayInterval={5000} />
      </motion.div>
    </motion.section>
  );
}
