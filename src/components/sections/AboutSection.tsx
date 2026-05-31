"use client";
import { motion } from "framer-motion";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { Skeleton } from "@/components/ui/Skeleton";
import { useParallax, useChildParallax } from "@/hooks/useParallax";

export default function AboutSection({ isLoading }: { isLoading?: boolean }) {
  const { ref, y, opacity, scrollYProgress } = useParallax({
    speed: 0.15,
    fadeIn: true,
  });

  // Left column moves slower for depth
  const leftY = useChildParallax(scrollYProgress, 0.08);
  // Right column moves a bit faster
  const rightY = useChildParallax(scrollYProgress, -0.05);

  if (isLoading) {
    return (
      <section ref={ref} className="py-32 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <Skeleton className="h-10 w-48 mb-4 bg-white/10" />
          </div>
          <div className="md:col-span-8">
            <Skeleton className="h-4 w-full mb-3 bg-white/5" />
            <Skeleton className="h-4 w-11/12 mb-3 bg-white/5" />
            <Skeleton className="h-4 w-4/5 mb-8 bg-white/5" />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/5">
              {[...Array(4)].map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-8 w-16 mb-2 bg-white/10" />
                  <Skeleton className="h-3 w-24 bg-white/5" />
                </div>
              ))}
            </div>
            
            <Skeleton className="h-6 w-40 mt-8 bg-white/10" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      ref={ref}
      id="about"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{ y, opacity }}
      className="py-32 border-t border-white/5"
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
            I&apos;m a 4th-year IT student at Cebu Technological University
            — Naga Extension Campus, passionate about building practical
            software solutions.
          </p>
          <p>
            My knowledge spans PHP, MySQL, C#, and ASP.NET MVC. With the
            help of AI assistance, I enjoy transforming requirements
            into functional, clean implementations, whether it&apos;s an
            educational system or an industrial supply platform.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/5">
            {[
              { value: "4th", label: "Year Student" },
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
                <div className="text-3xl font-bold text-white mb-1">
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
            className="inline-flex items-center gap-2 text-sm text-white hover:text-zinc-300 w-fit border-b border-white/20 pb-1 mt-4 transition-colors group"
          >
            <ArrowDownTrayIcon className="w-4 h-4 group-hover:-translate-y-1 transition-transform" /> Download Resume
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}
