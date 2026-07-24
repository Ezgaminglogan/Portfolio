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
    <h1 className="text-6xl sm:text-8xl font-extrabold text-white tracking-tighter mb-8 leading-[0.9] min-h-[1.9em]">
      <span className="inline-block">
        {typedLine1}
        {isLine1Cursor && (
          <span className="inline-block text-slate-400 font-light animate-blink ml-1">
            |
          </span>
        )}
      </span>
      <br className="hidden sm:block" />
      <span className="bg-linear-to-r from-white via-slate-200 to-slate-400 text-transparent bg-clip-text inline-block">
        {typedLine2}
        {isLine2Cursor && (
          <span className="inline-block text-white font-light animate-blink ml-1">
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
      {/* Ambient silver/white glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-200 h-150 bg-white/5 rounded-full blur-[150px] pointer-events-none glow-pulse" />
      <div className="absolute bottom-1/4 right-0 w-100 h-100 bg-slate-300/4 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: textY }}
          className="max-w-2xl text-center lg:text-left flex flex-col items-center lg:items-start z-10"
        >
          <div className="flex items-center gap-3 text-zinc-400 font-semibold tracking-widest text-xs uppercase mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-white/40 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
            </span>
            Available For Work
          </div>

          <TypewriterName />

          <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed mb-6 max-w-xl">
            Full-stack developer building reliable web apps for schools and
            growing businesses. Specializing in PHP, .NET, and modern
            React/Next.js experiences.
          </p>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-10">
            <div className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-zinc-300 transition-all hover:-translate-y-0.5 hover:border-white/25 hover:text-white hover:bg-white/10">
              <MapPinIcon className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
              Cebu, PH
            </div>
            <div className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-zinc-300 transition-all hover:-translate-y-0.5 hover:border-white/25 hover:text-white hover:bg-white/10">
              <CodeBracketIcon className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
              PHP • .NET • React
            </div>
            <div className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-zinc-300 transition-all hover:-translate-y-0.5 hover:border-white/25 hover:text-white hover:bg-white/10">
              <BriefcaseIcon className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
              Open to Freelance
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <a
              href="#projects"
              className="bg-white text-black px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-slate-200 transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="px-7 py-3.5 rounded-full text-sm font-medium text-white border border-white/20 hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Get in Touch
            </a>
            <a
              href="/CV_Portfolio/Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium text-slate-300 border border-white/15 bg-white/5 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all duration-300 hover:scale-105 active:scale-95 group"
            >
              <ArrowDownTrayIcon className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:-translate-y-0.5 transition-all" />
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
          <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full" />
          <Image
            src="/image/profile.jpg"
            alt="Logan Panucat"
            fill
            sizes="(min-width: 1024px) 18rem, (min-width: 640px) 14rem, 12rem"
            className="object-cover rounded-2xl border border-white/15 transition-all duration-700 relative z-10 shadow-2xl"
            priority
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
