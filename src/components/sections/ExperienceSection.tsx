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
      className="py-24 sm:py-32 border-t border-slate-200/80 relative"
    >
      <AnimatedSectionHeading
        title="Education & Experience."
        label="Career Milestones"
        subtitle="Academic foundation, honors, and professional software development journey."
      />

      <motion.div
        className="w-full flex flex-col gap-16"
        style={{ y: contentY }}
      >
        {/* Education Subsection */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <AcademicCapIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                Education
              </h3>
              <p className="text-xs text-blue-700 uppercase tracking-widest font-mono font-semibold">
                Academic Degrees & Honors
              </p>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent ml-4" />
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
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <BriefcaseIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                Work & Projects Experience
              </h3>
              <p className="text-xs text-blue-700 uppercase tracking-widest font-mono font-semibold">
                Developer Roles & Systems
              </p>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent ml-4" />
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
      className="group relative bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-6 sm:p-8 transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_35px_rgba(37,99,235,0.08)]"
    >
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div>
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-700">
            {edu.period}
          </span>
          <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 group-hover:text-blue-700 transition-colors">
            {edu.degree}
          </h4>
          <p className="text-sm text-slate-500 font-medium mt-1">
            {edu.institution}
          </p>
        </div>
        {edu.honor && (
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold shadow-xs font-mono">
            <SparklesIcon className="w-3.5 h-3.5" />
            {edu.honor}
          </span>
        )}
      </div>

      <p className="text-slate-600 text-sm leading-relaxed mb-6">
        {edu.description}
      </p>

      {edu.highlights && (
        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
          {edu.highlights.map((h) => (
            <span
              key={h}
              className="px-3 py-1 text-xs rounded-full border border-slate-200 bg-slate-50 text-slate-700 font-mono"
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
      className="group relative bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_35px_rgba(37,99,235,0.08)] hover:-translate-y-1"
    >
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="text-xs font-mono text-blue-700 font-semibold uppercase">
            {exp.period}
          </span>
          {exp.badge && (
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full">
              {exp.badge}
            </span>
          )}
        </div>

        <h4 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-700 transition-colors tracking-tight">
          {exp.role}
        </h4>
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-4 font-mono">
          {exp.organization}
        </p>

        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          {exp.description}
        </p>
      </div>

      {exp.skills && (
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
          {exp.skills.map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 text-[11px] rounded-full border border-slate-200 bg-slate-50 text-slate-700 font-mono"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
});
