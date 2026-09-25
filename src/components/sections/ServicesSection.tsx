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
import AnimatedSectionHeading from "@/components/ui/AnimatedSectionHeading";

const ICONS = [CommandLineIcon, ServerIcon, ShieldCheckIcon, CpuChipIcon];

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
}

const ServiceCard = memo(function ServiceCard({
  service,
  index,
}: ServiceCardProps) {
  const IconComponent = ICONS[index] || CommandLineIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-white hover:bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-7 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_35px_rgba(37,99,235,0.08)]"
    >
      <div>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shrink-0 shadow-xs">
            <IconComponent className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-blue-700 transition-colors">
            {service.title}
          </h3>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          {service.description}
        </p>
      </div>

      <ul className="space-y-2.5 border-t border-slate-100 pt-5">
        {service.features.map((feature, idx) => (
          <li
            key={idx}
            className="flex items-start gap-2.5 text-xs text-slate-700"
          >
            <CheckIcon className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
});

export default function ServicesSection() {
  return (
    <motion.section
      id="services"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
      className="py-24 sm:py-32 border-t border-slate-200/80 relative"
    >
      {/* Big animated heading */}
      <AnimatedSectionHeading
        title="Services & Solutions."
        label="Development Solutions"
        subtitle="How I translate full-stack development capabilities into scalable business value and reliable performance for your platform."
      />

      {/* Service cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {services.map((service, i) => (
          <ServiceCard key={service.title} service={service} index={i} />
        ))}
      </div>
    </motion.section>
  );
}
