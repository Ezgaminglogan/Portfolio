"use client";
import { useState, memo } from "react";
import { motion, type MotionValue } from "framer-motion";
import { stackCategories, professionalSkills } from "@/app/data";
import type { SkillItem, ProfessionalSkill } from "~types";
import { useParallax, useChildParallax } from "@/hooks/useParallax";
import AnimatedSectionHeading from "@/components/ui/AnimatedSectionHeading";

// Devicon CDN slug mapping
const DEVICON_SLUGS: Record<string, string> = {
  nextdotjs: "nextjs",
  dotnet: "dotnetcore",
  microsoftsqlserver: "microsoftsqlserver",
  reactquery: "",
};

const ICON_COLORS: Record<string, string> = {
  react: "#61DAFB",
  html5: "#E34F26",
  css3: "#1572B6",
  javascript: "#F7DF1E",
  nextdotjs: "#000000",
  dotnet: "#512BD4",
  php: "#777BB4",
  csharp: "#512BD4",
  mysql: "#4479A1",
  microsoftsqlserver: "#CC2927",
  typescript: "#3178C6",
  tailwindcss: "#06B6D4",
  reactquery: "#FF4154",
  prisma: "#2D3748",
  git: "#F05032",
};

function getIconUrl(slug: string): string {
  const simpleIconsFallbacks: Record<string, string> = {
    reactquery: "FF4154",
    nextdotjs: "000000",
    prisma: "2D3748",
  };
  if (slug in simpleIconsFallbacks) {
    return `https://cdn.simpleicons.org/${slug}/${simpleIconsFallbacks[slug]}`;
  }
  const deviconSlug = DEVICON_SLUGS[slug] ?? slug;
  return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${deviconSlug}/${deviconSlug}-original.svg`;
}

export default function SkillsSection() {
  const { ref, y, opacity, scrollYProgress } = useParallax({
    speed: 0.12,
    fadeIn: true,
  });

  return (
    <motion.section
      ref={ref}
      id="skills"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{ y, opacity }}
      className="py-24 sm:py-32 border-t border-slate-200/80 relative"
    >
      {/* Big animated heading */}
      <AnimatedSectionHeading
        title="Stacks."
        label="Development Stacks"
        subtitle="Core languages, full-stack frameworks, databases, and version control systems aligned by architectural discipline."
      />

      {/* Cardless, Open Architectural Stack Rows with Scroll Kinetic Animations */}
      <div className="space-y-14 mb-24 w-full">
        {stackCategories.map((category, catIdx) => (
          <CategoryRow
            key={category.title}
            category={category}
            index={catIdx}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>

      {/* Professional Competencies */}
      <div className="pt-6">
        <AnimatedSectionHeading
          title="Professional Competencies."
          label="Core Disciplines"
          subtitle="Core architectural principles beyond code — database schema modeling, authentication security, and full-stack systems design."
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {professionalSkills.map((ps, index) => (
          <ProfessionalSkillCard
            key={index}
            ps={ps}
            index={index}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </motion.section>
  );
}

interface CategoryRowProps {
  category: {
    title: string;
    badge: string;
    description: string;
    items: SkillItem[];
  };
  index: number;
  scrollYProgress: MotionValue<number>;
}

const CategoryRow = memo(function CategoryRow({
  category,
  index,
  scrollYProgress,
}: CategoryRowProps) {
  const speed = index % 2 === 0 ? 0.03 : -0.03;
  const rowY = useChildParallax(scrollYProgress, speed);

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ y: rowY }}
      className="border-b border-slate-200/80 pb-12 last:border-b-0"
    >
      {/* Row Header without box card */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-7">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full mb-2.5 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            {category.badge}
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
            {category.title}
          </h3>
        </motion.div>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md md:text-right font-normal">
          {category.description}
        </p>
      </div>

      {/* Grid of Animated Interactive Framework Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {category.items.map((skill, itemIdx) => (
          <SkillPill
            key={skill.name}
            skill={skill}
            index={itemIdx}
            categoryIndex={index}
          />
        ))}
      </div>
    </motion.div>
  );
});

interface SkillPillProps {
  skill: SkillItem;
  index: number;
  categoryIndex: number;
}

const SkillPill = memo(function SkillPill({ skill, index, categoryIndex }: SkillPillProps) {
  const [isHovered, setIsHovered] = useState(false);
  const brandColor = ICON_COLORS[skill.icon] || "#2563eb";

  return (
    <motion.div
      initial={{ opacity: 0, y: 25, scale: 0.92, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.55,
        delay: index * 0.08 + categoryIndex * 0.04,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -6,
        scale: 1.025,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex items-center gap-3.5 p-4 rounded-2xl border border-slate-200/90 bg-white hover:border-blue-300 hover:shadow-[0_12px_30px_rgba(37,99,235,0.1)] transition-all duration-300 cursor-pointer shadow-xs overflow-hidden"
    >
      {/* Dynamic Ambient Color Accent Glow on Hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 10% 50%, ${brandColor}12 0%, transparent 70%)`,
        }}
      />

      {/* Left Active Glow Indicator Line */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full"
        style={{ backgroundColor: brandColor }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isHovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      />

      {/* Icon Container with Parallax Elevation */}
      <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0 shadow-xs group-hover:bg-white group-hover:border-blue-200 transition-all duration-300 relative z-10">
        <motion.img
          src={getIconUrl(skill.icon)}
          alt={skill.name}
          className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
          animate={{
            scale: isHovered ? 1.18 : 1,
            rotate: isHovered ? [0, -4, 4, 0] : 0,
          }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          loading="lazy"
        />
      </div>

      {/* Text Info */}
      <div className="min-w-0 flex-1 relative z-10">
        <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors truncate">
          {skill.name}
        </h4>
        {skill.role && (
          <p className="text-xs font-mono text-slate-500 group-hover:text-slate-700 transition-colors truncate">
            {skill.role}
          </p>
        )}
      </div>
    </motion.div>
  );
});

interface ProfessionalSkillCardProps {
  ps: ProfessionalSkill;
  index: number;
  scrollYProgress: MotionValue<number>;
}

const ProfessionalSkillCard = memo(function ProfessionalSkillCard({
  ps,
  index,
  scrollYProgress,
}: ProfessionalSkillCardProps) {
  const speed = index % 2 === 0 ? 0.04 : 0.07;
  const cardY = useChildParallax(scrollYProgress, speed);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -6 }}
      style={{ y: cardY }}
      className="relative overflow-hidden p-6 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 transition-all duration-300 cursor-default group shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_35px_rgba(37,99,235,0.08)]"
    >
      <div className="flex items-center gap-3.5 mb-4">
        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
          <ps.icon className="w-5 h-5" />
        </div>
        <h4 className="text-slate-900 font-bold text-base leading-tight group-hover:text-blue-700 transition-colors">
          {ps.title}
        </h4>
      </div>

      <p className="text-slate-600 text-xs leading-relaxed mb-5">
        {ps.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {ps.highlights.map((h) => (
          <span
            key={h}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200/80 text-slate-700 text-xs font-mono"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
            {h}
          </span>
        ))}
      </div>
    </motion.div>
  );
});
