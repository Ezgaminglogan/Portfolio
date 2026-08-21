"use client";
import { useRef, memo } from "react";
import { motion } from "framer-motion";
import { education, experiences } from "@/app/data";
import type { EducationItem, ExperienceItem } from "~types";
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
      className="py-32 border-t border-white/10 relative"
    >
      <AnimatedSectionHeading
        title="Education & Experience."
        label="Career Milestones"
        subtitle="Academic foundation, honors, and professional software engineering journey."
      />

      <motion.div
        className="max-w-5xl mx-auto flex flex-col gap-16"
        style={{ y: contentY }}
      >
        {/* Education Subsection */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-300 shrink-0">
              <AcademicCapIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Education
              </h3>
              <p className="text-xs text-blue-300 uppercase tracking-widest font-mono">
                Academic Degrees & Honors
              </p>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-500/20 to-transparent ml-4" />
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
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-300 shrink-0">
              <BriefcaseIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Work & Projects Experience
              </h3>
              <p className="text-xs text-blue-300 uppercase tracking-widest font-mono">
                Engineering Roles & Systems
              </p>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-500/20 to-transparent ml-4" />
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

interface EducationCardProps {
  edu: EducationItem;
  index: number;
}

const EducationCard = memo(function EducationCard({
  edu,
  index,
}: EducationCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-[#0f1422]/90 hover:bg-white/4 border border-white/10 hover:border-blue-400/30 rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.12)]"
    >
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div>
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-300">
            {edu.period}
          </span>
          <h4 className="text-xl sm:text-2xl font-bold text-white mt-1 group-hover:text-blue-200 transition-colors">
            {edu.degree}
          </h4>
          <p className="text-sm text-slate-400 font-medium mt-1">
            {edu.institution}
          </p>
        </div>
        {edu.honor && (
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-bold shadow-[0_0_15px_rgba(59,130,246,0.25)] font-mono">
            <SparklesIcon className="w-3.5 h-3.5" />
            {edu.honor}
          </span>
        )}
      </div>

      <p className="text-slate-300 text-sm leading-relaxed mb-6">
        {edu.description}
      </p>

      {edu.highlights && (
        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
          {edu.highlights.map((h) => (
            <span
              key={h}
              className="px-3 py-1 text-xs rounded-full border border-white/10 bg-[#080b11] text-slate-300 font-mono"
            >
              {h}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
});

interface ExperienceCardProps {
  exp: ExperienceItem;
  index: number;
}

const ExperienceCard = memo(function ExperienceCard({
  exp,
  index,
}: ExperienceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-[#0f1422]/90 hover:bg-white/4 border border-white/10 hover:border-blue-400/30 rounded-2xl p-6 sm:p-8 transition-all duration-500 flex flex-col justify-between hover:shadow-[0_0_30px_rgba(59,130,246,0.12)] hover:-translate-y-1"
    >
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="text-xs font-mono text-blue-300 uppercase">
            {exp.period}
          </span>
          {exp.badge && (
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-300 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full">
              {exp.badge}
            </span>
          )}
        </div>

        <h4 className="text-xl font-bold text-white mb-1 group-hover:text-blue-200 transition-colors tracking-tight">
          {exp.role}
        </h4>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-4 font-mono">
          {exp.organization}
        </p>

        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          {exp.description}
        </p>
      </div>

      {exp.skills && (
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
          {exp.skills.map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 text-[11px] rounded-full border border-white/10 bg-[#080b11] text-slate-300 font-mono"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
});
