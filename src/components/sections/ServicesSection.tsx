"use client";
import { motion } from "framer-motion";
import {
  CommandLineIcon,
  ServerIcon,
  ShieldCheckIcon,
  CpuChipIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { services } from "@/app/data";
import { useParallax, useChildParallax } from "@/hooks/useParallax";

const ICONS = [CommandLineIcon, ServerIcon, ShieldCheckIcon, CpuChipIcon];

export default function ServicesSection() {
  const { ref, y, opacity, scrollYProgress } = useParallax({
    speed: 0.1,
    fadeIn: true,
  });

  const leftY = useChildParallax(scrollYProgress, 0.05);
  const rightY = useChildParallax(scrollYProgress, -0.05);

  return (
    <motion.section
      ref={ref}
      id="services"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{ y, opacity }}
      className="py-32 border-t border-emerald-500/10 relative animate-fade-in"
    >
      {/* Ambient neon glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/[0.04] rounded-full blur-[130px] pointer-events-none glow-pulse" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <motion.div className="lg:col-span-4" style={{ y: leftY }}>
          <h2 className="text-4xl font-extrabold text-white tracking-tighter mb-4">
            Services &amp; Solutions.
          </h2>
          <p className="text-zinc-500 text-base max-w-md leading-relaxed">
            How I translate engineering capabilities into scalable business value and reliable performance for your projects.
          </p>
        </motion.div>

        <motion.div
          className="lg:col-span-8 grid sm:grid-cols-2 gap-6"
          style={{ y: rightY }}
        >
          {services.map((service, i) => {
            const IconComponent = ICONS[i] || CommandLineIcon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative bg-emerald-950/[0.02] hover:bg-emerald-500/[0.03] border border-emerald-500/10 hover:border-emerald-500/30 rounded-2xl p-6 transition-all duration-500 flex flex-col justify-between overflow-hidden hover:shadow-[0_0_30px_rgba(16,185,129,0.04)]"
              >
                {/* Neon decorative card edge highlight */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/0 to-transparent group-hover:via-emerald-400/40 transition-all duration-700" />
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/0 to-transparent group-hover:via-emerald-400/40 transition-all duration-700" />

                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/5 border border-emerald-500/15 flex items-center justify-center text-emerald-400 group-hover:text-emerald-300 group-hover:border-emerald-400/30 group-hover:bg-emerald-500/10 transition-all duration-300 mb-6">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-emerald-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <ul className="space-y-2.5 border-t border-emerald-500/10 pt-5">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-400">
                      <CheckIcon className="w-4 h-4 text-emerald-400/80 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
