"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  BriefcaseIcon,
  CodeBracketIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { useParallax, useChildParallax } from "@/hooks/useParallax";

export default function HeroSection() {
  const { ref, y, opacity, scale, scrollYProgress } = useParallax({
    speed: 0.3,
    fadeIn: false,
    scale: true,
    scaleRange: [1, 1],
    offset: ["start start", "end start"] as const,
  });

  // Text drifts up faster than the section
  const textY = useChildParallax(scrollYProgress, 0.15);
  // Image drifts down — opposite direction for depth
  const imageY = useChildParallax(scrollYProgress, -0.2);

  return (
    <motion.section
      ref={ref}
      id="home"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ y, scale, opacity }}
      className="min-h-screen flex flex-col justify-center pt-20 pb-32"
    >
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: textY }}
          className="max-w-2xl text-center lg:text-left flex flex-col items-center lg:items-start z-10"
        >
          <div className="flex items-center gap-3 text-zinc-500 font-semibold tracking-widest text-xs uppercase mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/30 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            Available For Work
          </div>
          <h1 className="text-6xl sm:text-8xl font-extrabold text-white tracking-tighter mb-8 leading-[0.9]">
            Logan M. <br className="hidden sm:block" />
            <span className="text-zinc-600">Panucat</span>
          </h1>
          <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed mb-6 max-w-xl">
            Full-stack developer building reliable web apps for schools and
            growing businesses. Specializing in PHP, .NET, and modern
            React/Next.js experiences.
          </p>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-10">
            <div className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1.5 text-xs text-zinc-400 transition-all hover:-translate-y-0.5 hover:border-white/20 hover:text-white hover:bg-white/[0.05]">
              <MapPinIcon className="w-4 h-4 text-zinc-500 group-hover:text-white/80 transition-colors" />
              Cebu, PH
            </div>
            <div className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1.5 text-xs text-zinc-400 transition-all hover:-translate-y-0.5 hover:border-white/20 hover:text-white hover:bg-white/[0.05]">
              <CodeBracketIcon className="w-4 h-4 text-zinc-500 group-hover:text-white/80 transition-colors" />
              PHP • .NET • React
            </div>
            <div className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1.5 text-xs text-zinc-400 transition-all hover:-translate-y-0.5 hover:border-white/20 hover:text-white hover:bg-white/[0.05]">
              <BriefcaseIcon className="w-4 h-4 text-zinc-500 group-hover:text-white/80 transition-colors" />
              Open to Freelance
            </div>
          </div>
          <div className="flex items-center justify-center lg:justify-start gap-4">
            <a
              href="#projects"
              className="bg-white text-black px-8 py-4 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="px-8 py-4 rounded-full text-sm font-medium text-white border border-white/10 hover:bg-white/5 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Get in Touch
            </a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: imageY }}
          whileHover={{ scale: 1.03 }}
          className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-72 lg:h-72 flex-shrink-0"
        >
          <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full" />
          <Image
            src="/image/profile.jpg"
            alt="Logan Panucat"
            fill
            sizes="(min-width: 1024px) 18rem, (min-width: 640px) 14rem, 12rem"
            className="object-cover rounded-2xl transition-all duration-700 relative z-10"
            priority
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
