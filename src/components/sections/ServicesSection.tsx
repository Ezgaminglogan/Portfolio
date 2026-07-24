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
import AnimatedSectionHeading from "@/components/ui/AnimatedSectionHeading";

const ICONS = [CommandLineIcon, ServerIcon, ShieldCheckIcon, CpuChipIcon];

export default function ServicesSection() {
  const { ref, y, opacity, scrollYProgress } = useParallax({
    speed: 0.1,
    fadeIn: true,
  });

  const contentY = useChildParallax(scrollYProgress, -0.05);

  return (
    <motion.section
      ref={ref}
      id="services"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{ y, opacity }}
      className="py-32 border-t border-white/10 relative"
    >
      {/* Ambient silver glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 w-125 h-125 bg-white/3 rounded-full blur-[130px] pointer-events-none glow-pulse" />

      {/* Big animated heading */}
      <AnimatedSectionHeading
        title="Services & Solutions."
        label="What I offer"
        subtitle="How I translate engineering capabilities into scalable business value and reliable performance for your projects."
      />

      {/* Service cards */}
      <motion.div
        className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto"
        style={{ y: contentY }}
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
              className="group relative bg-[#12151e]/60 hover:bg-white/4 border border-white/10 hover:border-white/25 rounded-2xl p-6 transition-all duration-500 flex flex-col justify-between overflow-hidden hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
            >
              {/* Decorative card edge highlight */}
              <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/0 to-transparent group-hover:via-white/30 transition-all duration-700" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/0 to-transparent group-hover:via-white/30 transition-all duration-700" />

              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:border-white/25 group-hover:bg-white/10 transition-all duration-300 shrink-0">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-slate-200 transition-colors">
                    {service.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <ul className="space-y-2.5 border-t border-white/10 pt-5">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckIcon className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
