"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Skeleton } from "@/components/ui/Skeleton";

export default function HeroSection({ isLoading }: { isLoading?: boolean }) {
  if (isLoading) {
    return (
      <section className="min-h-screen flex flex-col justify-center pt-20 pb-32">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">
          <div className="max-w-2xl w-full text-center lg:text-left flex flex-col items-center lg:items-start z-10">
            <Skeleton className="h-4 w-32 mb-6 bg-white/5" />
            <Skeleton className="h-16 sm:h-24 w-full max-w-md mb-4 bg-white/10" />
            <Skeleton className="h-16 sm:h-24 w-3/4 max-w-sm mb-8 bg-white/10" />
            <Skeleton className="h-5 w-full mb-3 bg-white/5" />
            <Skeleton className="h-5 w-11/12 mb-3 bg-white/5" />
            <Skeleton className="h-5 w-4/5 mb-10 bg-white/5" />
            <div className="flex gap-4">
              <Skeleton className="h-14 w-36 rounded-full bg-white/10" />
              <Skeleton className="h-14 w-36 rounded-full bg-white/5" />
            </div>
          </div>
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-72 lg:h-72 flex-shrink-0">
            <Skeleton className="absolute inset-0 rounded-2xl bg-white/10" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      id="home"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen flex flex-col justify-center pt-20 pb-32"
    >
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl text-center lg:text-left flex flex-col items-center lg:items-start z-10"
        >
          <span className="text-zinc-500 font-semibold tracking-widest text-xs uppercase mb-6 block">
            Available For Work
          </span>
          <h1 className="text-6xl sm:text-8xl font-extrabold text-white tracking-tighter mb-8 leading-[0.9]">
            Logan M. <br className="hidden sm:block" />
            <span className="text-zinc-600">Panucat</span>
          </h1>
          <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed mb-10 max-w-xl">
            A Full Stack Developer specializing in PHP, MySQL, C#, ASP.NET
            MVC, and .NET. Building clean, intuitive digital experiences.
          </p>
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
          className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-72 lg:h-72 flex-shrink-0"
        >
          <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full" />
          <Image
            src="/image/profile.jpg"
            alt="Logan Panucat"
            fill
            className="object-cover rounded-2xl transition-all duration-700 relative z-10"
            priority
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
