"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ArrowDownTrayIcon,
  ArrowRightIcon,
  SparklesIcon,
  CheckCircleIcon,
  CommandLineIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { useParallax, useChildParallax } from "@/hooks/useParallax";

const ROLES = [
  "Full-Stack Developer",
  "BSIT College Instructor",
  ".NET & Next.js Developer",
  "Software Developer",
];

const HERO_STACKS = [
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/000000" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg" },
  { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { name: "Prisma", icon: "https://cdn.simpleicons.org/prisma/2D3748" },
  { name: "TailwindCSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
];

function RoleRotator() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-10 sm:h-12 overflow-hidden relative inline-flex items-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={roleIndex}
          initial={{ y: 28, opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -28, opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 bg-clip-text text-transparent block tracking-tight"
        >
          {ROLES[roleIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<"code" | "schema">("code");
  const { ref, y, opacity, scale, scrollYProgress } = useParallax({
    speed: 0.25,
    fadeIn: false,
    scale: true,
    scaleRange: [1, 1],
    offset: ["start start", "end start"] as const,
  });

  const textY = useChildParallax(scrollYProgress, 0.1);
  const imageY = useChildParallax(scrollYProgress, -0.12);

  return (
    <motion.section
      ref={ref}
      id="home"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ y, scale, opacity }}
      className="min-h-[94vh] flex flex-col justify-center pt-24 pb-20 sm:pt-28 sm:pb-28 relative"
    >
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16 xl:gap-20">
        {/* Left Column: Editorial Headline, Bio & Interactive Stack Ribbon */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: textY }}
          className="max-w-2xl lg:max-w-3xl xl:max-w-4xl text-center lg:text-left flex flex-col items-center lg:items-start z-10"
        >
          {/* Status & Honor Meta Pills */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-blue-200/90 text-blue-700 font-mono text-xs font-semibold uppercase tracking-wider shadow-[0_2px_12px_rgba(37,99,235,0.08)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-ping opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              </span>
              Available For Developer Roles
            </div>

            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50/80 border border-blue-200/80 text-blue-700 font-mono text-xs font-semibold">
              <SparklesIcon className="w-3.5 h-3.5 text-blue-600" />
              Cum Laude Honor
            </div>
          </div>

          {/* Authoritative Primary Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-950 tracking-tight sm:tracking-tighter leading-[1.06] mb-3">
            Logan M. Panucat
          </h1>

          {/* Dynamic Role Rotator Subtitle */}
          <div className="flex items-center gap-2.5 mb-6 flex-wrap justify-center lg:justify-start">
            <span className="text-xl sm:text-2xl lg:text-3xl font-medium text-slate-500">
              I develop as a
            </span>
            <RoleRotator />
          </div>

          {/* Lead Bio Description */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-7 max-w-2xl font-normal">
            Software developer crafting resilient full-stack web applications, desktop utilities, and high-integrity database systems with PHP, .NET/C#, Next.js, and modern TypeScript.
          </p>

          {/* Interactive Micro Tech-Stack Ribbon */}
          <div className="mb-8 w-full max-w-xl">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-2.5">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-500">
                Core Tech Matrix
              </span>
              <span className="h-px flex-1 bg-slate-200/80 max-w-[120px] hidden sm:block" />
            </div>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              {HERO_STACKS.map((stack) => (
                <div
                  key={stack.name}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:shadow-xs transition-all duration-200"
                >
                  <img
                    src={stack.icon}
                    alt={stack.name}
                    className="w-3.5 h-3.5 object-contain"
                  />
                  <span className="text-xs font-mono font-medium text-slate-700">
                    {stack.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs Cluster */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-7 py-3.5 rounded-full text-sm font-bold hover:bg-blue-700 transition-all duration-300 hover:scale-[1.02] active:scale-98 shadow-[0_8px_25px_rgba(37,99,235,0.3)] hover:shadow-[0_12px_30px_rgba(37,99,235,0.45)] group cursor-pointer"
            >
              <span>Explore Featured Work</span>
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#contact"
              className="px-7 py-3.5 rounded-full text-sm font-semibold text-slate-800 border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 hover:scale-[1.02] active:scale-98 shadow-[0_2px_10px_rgba(0,0,0,0.03)] cursor-pointer"
            >
              Get in Touch
            </a>

            <a
              href="/CV_Portfolio/Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium text-slate-700 border border-slate-200/90 bg-white hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all duration-300 hover:scale-[1.02] active:scale-98 shadow-2xs group cursor-pointer"
            >
              <ArrowDownTrayIcon className="w-4 h-4 text-blue-600 group-hover:-translate-y-0.5 transition-transform" />
              <span>Resume (PDF)</span>
            </a>
          </div>
        </motion.div>

        {/* Right Column: Creative Cyber-Architect Code Matrix Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: imageY }}
          className="relative w-[320px] h-[360px] sm:w-[390px] sm:h-[430px] lg:w-[440px] lg:h-[460px] shrink-0 select-none flex items-center justify-center"
        >
          {/* Ambient Blue Radial Flare */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-sky-400/15 to-indigo-500/20 rounded-full blur-3xl transform scale-110 pointer-events-none" />

          {/* Layer 1: Angled Interactive Coding Terminal Backplate */}
          <div className="absolute -inset-2 sm:-inset-4 bg-slate-950/95 border border-slate-800 rounded-[28px] p-4 sm:p-5 shadow-[0_25px_60px_rgba(0,0,0,0.28)] transform -rotate-3 sm:-rotate-5 transition-transform duration-700 hover:-rotate-1 overflow-hidden">
            {/* Terminal Window Header Bar with Tabs */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                <button
                  type="button"
                  onClick={() => setActiveTab("code")}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${
                    activeTab === "code" ? "text-blue-400 bg-blue-950/60 font-bold" : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <CommandLineIcon className="w-3 h-3" />
                  <span>logan.dev.ts</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("schema")}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${
                    activeTab === "schema" ? "text-blue-400 bg-blue-950/60 font-bold" : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <DocumentTextIcon className="w-3 h-3" />
                  <span>schema.sql</span>
                </button>
              </div>
            </div>

            {/* Code Lines with Syntax Coloring */}
            <div className="font-mono text-[10px] sm:text-[11px] leading-relaxed space-y-1 select-none opacity-85">
              {activeTab === "code" ? (
                <>
                  <p className="text-slate-500">{"// Software & Full-Stack Architecture"}</p>
                  <p>
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-blue-300">developer</span> = &#123;
                  </p>
                  <p className="pl-3">
                    <span className="text-sky-300">name</span>:{" "}
                    <span className="text-emerald-300">&quot;Logan M. Panucat&quot;</span>,
                  </p>
                  <p className="pl-3">
                    <span className="text-sky-300">stack</span>: [
                    <span className="text-amber-300">&quot;Next.js&quot;</span>,{" "}
                    <span className="text-amber-300">&quot;C#&quot;</span>,{" "}
                    <span className="text-amber-300">&quot;PHP&quot;</span>,{" "}
                    <span className="text-amber-300">&quot;MySQL&quot;</span>],
                  </p>
                  <p className="pl-3">
                    <span className="text-sky-300">education</span>:{" "}
                    <span className="text-emerald-300">&quot;BSIT Cum Laude&quot;</span>,
                  </p>
                  <p className="pl-3">
                    <span className="text-blue-400">deploy</span>:{" "}
                    <span className="text-purple-400">async</span> () =&gt; &#123;
                  </p>
                  <p className="pl-6 text-emerald-400">return &quot;Production Ready 🚀&quot;;</p>
                  <p className="pl-3">&#125;</p>
                  <p>&#125;;</p>
                </>
              ) : (
                <>
                  <p className="text-slate-500">{"-- Relational Database Systems"}</p>
                  <p>
                    <span className="text-purple-400">CREATE TABLE</span>{" "}
                    <span className="text-sky-300">project_systems</span> (
                  </p>
                  <p className="pl-3 text-slate-300">id <span className="text-amber-300">UUID PRIMARY KEY</span>,</p>
                  <p className="pl-3 text-slate-300">title <span className="text-amber-300">VARCHAR(255)</span>,</p>
                  <p className="pl-3 text-slate-300">role <span className="text-emerald-300">&apos;FullStack&apos;</span>,</p>
                  <p className="pl-3 text-slate-300">status <span className="text-emerald-400">&apos;DEPLOYED&apos;</span></p>
                  <p>);</p>
                </>
              )}
            </div>

            {/* Dynamic Claw / Scratch Accent Slits Across the Terminal */}
            <div className="absolute -inset-x-10 top-1/4 h-0.5 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent transform -rotate-35 pointer-events-none" />
            <div className="absolute -inset-x-10 top-1/2 h-1 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent transform -rotate-35 pointer-events-none" />
            <div className="absolute -inset-x-10 top-3/4 h-0.5 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent transform -rotate-35 pointer-events-none" />
          </div>

          {/* Layer 2: Main Portrait Card with Tech Notch Framing */}
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-3xl bg-white p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-2 border-white transform rotate-2 sm:rotate-3 transition-transform duration-500 hover:rotate-0 z-10 group">
            {/* Corner Scratch / Blade Tech Accents */}
            <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-blue-600 rounded-tr-xl pointer-events-none" />
            <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-blue-600 rounded-bl-xl pointer-events-none" />

            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-100">
              <Image
                src="/image/profile.jpg"
                alt="Logan Panucat"
                fill
                unoptimized
                sizes="(min-width: 1024px) 16rem, (min-width: 640px) 14rem, 12rem"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              {/* Subtle Tech Overlay Mesh on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          {/* Floating Honors Badge (Top Right) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute -top-3 -right-2 sm:-right-4 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-blue-100 shadow-[0_10px_25px_rgba(0,0,0,0.08)] flex items-center gap-2"
          >
            <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
              ★
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-900 leading-tight">BSIT Instructor &amp; Honors</div>
              <div className="text-[9px] font-mono text-blue-600">CTU Naga Campus</div>
            </div>
          </motion.div>

          {/* Floating Project Systems Badge (Bottom Left) */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="absolute -bottom-3 -left-2 sm:-left-4 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-200/90 shadow-[0_10px_25px_rgba(0,0,0,0.08)] flex items-center gap-2"
          >
            <CheckCircleIcon className="w-5 h-5 text-emerald-500 shrink-0" />
            <div>
              <div className="text-[11px] font-bold text-slate-900 leading-tight">5+ Project Systems</div>
              <div className="text-[9px] font-mono text-slate-500">Web • Desktop • Cloud</div>
            </div>
          </motion.div>

          {/* Floating Mini Live Status Pill (Bottom Right) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute -bottom-6 right-2 sm:right-6 z-20 bg-slate-950 text-white px-3 py-1.5 rounded-full border border-slate-800 shadow-md font-mono text-[10px] flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">&lt;status: active /&gt;</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
