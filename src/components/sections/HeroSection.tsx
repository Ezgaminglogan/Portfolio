"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  BriefcaseIcon,
  CodeBracketIcon,
  MapPinIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { useParallax, useChildParallax } from "@/hooks/useParallax";

function TypewriterName() {
  const line1 = "Logan M.";
  const line2 = "Panucat";
  const [typedIndex, setTypedIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const totalLength = line1.length + line2.length;

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isDeleting && typedIndex === totalLength) {
      // Pause at full text before deleting back
      timeout = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && typedIndex === 0) {
      // Pause at empty before typing forward again
      timeout = setTimeout(() => setIsDeleting(false), 500);
    } else {
      const speed = isDeleting
        ? 45 // Deleting speed
        : typedIndex === line1.length
          ? 300 // Slight pause when switching lines
          : 85; // Typing speed

      timeout = setTimeout(() => {
        setTypedIndex((prev) => (isDeleting ? prev - 1 : prev + 1));
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [typedIndex, isDeleting, totalLength, line1.length]);

  const typedLine1 = line1.slice(0, Math.min(typedIndex, line1.length));
  const typedLine2 = line2.slice(0, Math.max(0, typedIndex - line1.length));

  const isLine1Cursor = typedIndex <= line1.length;
  const isLine2Cursor = typedIndex > line1.length;

  return (
    <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold text-white tracking-tight sm:tracking-tighter mb-8 leading-[1.05] sm:leading-[0.95] min-h-[2.2em]">
      <span className="inline-block">
        {typedLine1}
        {isLine1Cursor && (
          <span className="inline-block text-blue-400 font-light animate-blink ml-1">
            |
          </span>
        )}
      </span>
      <br />
      <span className="bg-gradient-to-r from-white via-blue-100 to-blue-300 text-transparent bg-clip-text inline-block">
        {typedLine2}
        {isLine2Cursor && (
          <span className="inline-block text-blue-400 font-light animate-blink ml-1">
            |
          </span>
        )}
      </span>
    </h1>
  );
}

export default function HeroSection() {
  const { ref, y, opacity, scale, scrollYProgress } = useParallax({
    speed: 0.3,
    fadeIn: false,
    scale: true,
    scaleRange: [1, 1],
    offset: ["start start", "end start"] as const,
  });

  const textY = useChildParallax(scrollYProgress, 0.15);
  const imageY = useChildParallax(scrollYProgress, -0.2);

  return (
    <motion.section
      ref={ref}
      id="home"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ y, scale, opacity }}
      className="min-h-screen flex flex-col justify-center pt-20 pb-32 relative"
    >
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: textY }}
          className="max-w-2xl text-center lg:text-left flex flex-col items-center lg:items-start z-10"
        >
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-300 font-mono text-xs uppercase tracking-wider mb-6">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.9)]" />
            </span>
            Available For Engineering Roles
          </div>

          <TypewriterName />

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed mb-6 max-w-xl">
            Full-stack software developer engineering robust systems for education, logistics, and growing enterprises. Specializing in PHP, .NET, and modern React/Next.js architectures.
          </p>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-10">
            <div className="group flex items-center gap-2 rounded-full border border-white/10 bg-[#0f1422]/80 px-3.5 py-1.5 text-xs text-zinc-300 transition-all hover:-translate-y-0.5 hover:border-blue-400/40 hover:text-white hover:bg-blue-500/10">
              <MapPinIcon className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
              Cebu, Philippines
            </div>
            <div className="group flex items-center gap-2 rounded-full border border-white/10 bg-[#0f1422]/80 px-3.5 py-1.5 text-xs text-zinc-300 transition-all hover:-translate-y-0.5 hover:border-blue-400/40 hover:text-white hover:bg-blue-500/10">
              <CodeBracketIcon className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
              PHP • .NET • React • Next.js
            </div>
            <div className="group flex items-center gap-2 rounded-full border border-white/10 bg-[#0f1422]/80 px-3.5 py-1.5 text-xs text-zinc-300 transition-all hover:-translate-y-0.5 hover:border-blue-400/40 hover:text-white hover:bg-blue-500/10">
              <BriefcaseIcon className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
              Cum Laude BSIT Graduate
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <a
              href="#projects"
              className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:shadow-[0_0_35px_rgba(59,130,246,0.6)]"
            >
              View Case Studies
            </a>
            <a
              href="#contact"
              className="px-7 py-3.5 rounded-full text-sm font-medium text-white border border-white/15 bg-[#0f1422]/80 hover:bg-white/10 hover:border-blue-400/30 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Get in Touch
            </a>
            <a
              href="/CV_Portfolio/Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium text-zinc-300 border border-white/15 bg-[#0f1422]/80 hover:bg-blue-500/10 hover:text-white hover:border-blue-400/30 transition-all duration-300 hover:scale-105 active:scale-95 group"
            >
              <ArrowDownTrayIcon className="w-4 h-4 text-blue-400 group-hover:text-white group-hover:-translate-y-0.5 transition-all" />
              Download Resume
            </a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: imageY }}
          whileHover={{ scale: 1.03 }}
          className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-72 lg:h-72 shrink-0"
        >
          <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
          <Image
            src="/image/profile.jpg"
            alt="Logan Panucat"
            fill
            sizes="(min-width: 1024px) 18rem, (min-width: 640px) 14rem, 12rem"
            className="object-cover rounded-2xl border border-white/15 transition-all duration-700 relative z-10 shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
            priority
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
