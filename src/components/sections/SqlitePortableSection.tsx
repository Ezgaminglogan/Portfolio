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
      {/* Ambient silver glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-125 h-125 bg-white/4 rounded-full blur-[140px] pointer-events-none glow-pulse" />
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
          label="Featured Software"
          subtitle="A lightweight SQLite database management desktop application featuring multiple language integrations and schema design tools."
        />
        <a
          href="https://www.mediafire.com/file/2pu0bqxgr979uam/SQLitePortableSetup.zip/file"
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-white text-black px-8 py-4 rounded-full text-sm font-semibold hover:bg-slate-200 transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] -mt-8"
        >
          Download Now
        </a>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="overflow-hidden bg-[#12151e] shadow-2xl border border-white/10"
      >
        <ImageCarousel images={sqliteImages} autoplayInterval={5000} />
      </motion.div>
    </motion.section>
  );
}
