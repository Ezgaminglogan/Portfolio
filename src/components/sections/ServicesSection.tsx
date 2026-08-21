"use client";
import { memo } from "react";
import { motion } from "framer-motion";
import {
  CommandLineIcon,
  ServerIcon,
  ShieldCheckIcon,
  CpuChipIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { services } from "@/app/data";
import type { ServiceItem } from "~types";
import { useParallax, useChildParallax } from "@/hooks/useParallax";
import AnimatedSectionHeading from "@/components/ui/AnimatedSectionHeading";

const ICONS = [CommandLineIcon, ServerIcon, ShieldCheckIcon, CpuChipIcon];

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
}

const ServiceCard = memo(function ServiceCard({ service, index }: ServiceCardProps) {
  const IconComponent = ICONS[index] || CommandLineIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-[#0f1422]/90 hover:bg-white/4 border border-white/10 hover:border-blue-400/30 rounded-2xl p-6 transition-all duration-500 flex flex-col justify-between overflow-hidden hover:shadow-[0_0_30px_rgba(59,130,246,0.12)]"
    >
      {/* Decorative card edge highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/0 to-transparent group-hover:via-blue-400/40 transition-all duration-700" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/0 to-transparent group-hover:via-blue-400/40 transition-all duration-700" />

      <div>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-300 group-hover:border-blue-400/40 group-hover:bg-blue-500/20 transition-all duration-300 shrink-0">
            <IconComponent className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-200 transition-colors">
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
            <CheckIcon className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
});

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
      {/* Big animated heading */}
      <AnimatedSectionHeading
        title="Services & Solutions."
        label="Engineering Services"
        subtitle="How I translate engineering capabilities into scalable business value and reliable performance for your enterprise."
      />

      {/* Service cards */}
      <motion.div
        className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto"
        style={{ y: contentY }}
      >
        {services.map((service, i) => (
          <ServiceCard key={service.title} service={service} index={i} />
        ))}
      </motion.div>
    </motion.section>
  );
}
