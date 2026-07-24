"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { education, experiences } from "@/app/data";
import { useParallax, useChildParallax } from "@/hooks/useParallax";
import AnimatedSectionHeading from "@/components/ui/AnimatedSectionHeading";
import { BriefcaseIcon, AcademicCapIcon, SparklesIcon } from "@heroicons/react/24/outline";

export default function ExperienceSection() {
  const { ref, y, opacity, scrollYProgress } = useParallax({
    speed: 0.12,
    fadeIn: true,
  });

  const contentY = useChildParallax(scrollYProgress, -0.04);

  return (
    <motion.section
      ref={ref}
      id="experience"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{ y, opacity }}
      className="py-32 border-t border-emerald-500/10 relative"
    >
      {/* Ambient neon glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-100 h-125 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none glow-pulse" />

      <AnimatedSectionHeading
        title="Education & Experience."
        label="Background"
        subtitle="Academic foundation, honors, and professional engineering journey."
      />

      <motion.div
        className="max-w-5xl mx-auto flex flex-col gap-16"
        style={{ y: contentY }}
      >
        {/* Education Subsection */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <AcademicCapIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Education
              </h3>
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-mono">
                Academic Degrees & Honors
              </p>
            </div>
            <div className="flex-1 h-px bg-linear-to-r from-emerald-500/20 to-transparent ml-4" />
          </div>

          <div className="grid grid-cols-1 gap-6">
            {education.map((edu, idx) => (
              <EducationCard key={idx} edu={edu} index={idx} />
            ))}
          </div>
        </div>

        {/* Experience Subsection */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <BriefcaseIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Work & Projects Experience
              </h3>
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-mono">
                Engineering Roles & Systems
              </p>
            </div>
            <div className="flex-1 h-px bg-linear-to-r from-emerald-500/20 to-transparent ml-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experiences.map((exp, idx) => (
              <ExperienceCard key={idx} exp={exp} index={idx} />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}

function EducationCard({
  edu,
  index,
}: {
  edu: (typeof education)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-emerald-950/2 hover:bg-emerald-500/4 border border-emerald-500/10 hover:border-emerald-500/25 rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:shadow-[0_0_30px_rgba(52,211,153,0.06)]"
    >
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            {edu.period}
          </span>
          <h4 className="text-xl sm:text-2xl font-bold text-white mt-1 group-hover:text-emerald-300 transition-colors">
            {edu.degree}
          </h4>
          <p className="text-sm text-zinc-400 font-medium mt-1">
            {edu.institution}
          </p>
        </div>
        {edu.honor && (
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold shadow-[0_0_15px_rgba(52,211,153,0.15)]">
            <SparklesIcon className="w-3.5 h-3.5" />
            {edu.honor}
          </span>
        )}
      </div>

      <p className="text-zinc-400 text-sm leading-relaxed mb-6">
        {edu.description}
      </p>

      {edu.highlights && (
        <div className="flex flex-wrap gap-2 pt-4 border-t border-emerald-500/10">
          {edu.highlights.map((h) => (
            <span
              key={h}
              className="px-3 py-1 text-xs rounded-full border border-emerald-500/15 bg-black/40 text-zinc-300 font-medium"
            >
              {h}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function ExperienceCard({
  exp,
  index,
}: {
  exp: (typeof experiences)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-emerald-950/2 hover:bg-emerald-500/4 border border-emerald-500/10 hover:border-emerald-500/25 rounded-2xl p-6 sm:p-8 transition-all duration-500 flex flex-col justify-between hover:shadow-[0_0_30px_rgba(52,211,153,0.06)] hover:-translate-y-1"
    >
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="text-xs font-mono text-zinc-500 uppercase">
            {exp.period}
          </span>
          {exp.badge && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
              {exp.badge}
            </span>
          )}
        </div>

        <h4 className="text-xl font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors tracking-tight">
          {exp.role}
        </h4>
        <p className="text-xs font-medium text-emerald-400/80 uppercase tracking-wider mb-4">
          {exp.organization}
        </p>

        <p className="text-zinc-400 text-sm leading-relaxed mb-6">
          {exp.description}
        </p>
      </div>

      {exp.skills && (
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-emerald-500/10">
          {exp.skills.map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 text-[11px] rounded-full border border-emerald-500/15 bg-black/40 text-zinc-400 font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}
