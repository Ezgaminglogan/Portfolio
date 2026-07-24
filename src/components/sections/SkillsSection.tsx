"use client";
import { motion, MotionValue } from "framer-motion";
import { stacks, professionalSkills, type SkillItem } from "@/app/data";
import { useParallax, useChildParallax } from "@/hooks/useParallax";
import { useState } from "react";
import AnimatedSectionHeading from "@/components/ui/AnimatedSectionHeading";

// Devicon CDN slug mapping (data.icon → devicon folder name)
const DEVICON_SLUGS: Record<string, string> = {
  nextdotjs: "nextjs",
  dotnet: "dotnetcore",
  microsoftsqlserver: "microsoftsqlserver",
  reactquery: "", // not on devicon, use Simple Icons CDN fallback
};

// Brand colors for hover glow effects
const ICON_COLORS: Record<string, string> = {
  react: "#61DAFB",
  html5: "#E34F26",
  css3: "#1572B6",
  javascript: "#F7DF1E",
  nextdotjs: "#ffffff",
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
    nextdotjs: "ffffff",
    prisma: "ffffff",
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
      className="py-32 border-t border-white/10 relative"
    >
      {/* Ambient silver glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-125 bg-white/3 rounded-full blur-[150px] pointer-events-none glow-pulse" />

      {/* Big animated heading */}
      <AnimatedSectionHeading
        title="Stacks."
        label="Tech I use"
        subtitle="Languages, frameworks, databases, and tools I build with."
      />

      {/* Flat icon grid — no category labels */}
      <div className="flex flex-wrap gap-3 mb-24">
        {stacks.map((skill, idx) => (
          <SkillIcon
            key={skill.name}
            skill={skill}
            index={idx}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>

      {/* Professional Competencies */}
      <div className="pt-16">
        <AnimatedSectionHeading
          title="Professional Competencies."
          label="Beyond Code"
          subtitle="Core disciplines beyond code — systems, security, and engineering practices."
        />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

function SkillIcon({
  skill,
  index,
  scrollYProgress,
}: {
  skill: SkillItem;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const speed = index % 2 === 0 ? 0.02 : 0.04;
  const itemY = useChildParallax(scrollYProgress, speed);
  const brandColor = ICON_COLORS[skill.icon] || "#ffffff";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ y: itemY }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 bg-[#12151e]/50 hover:bg-white/6 transition-all duration-300 cursor-default"
    >
      {/* Glow effect behind icon on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={{
          boxShadow: isHovered
            ? `0 0 20px ${brandColor}15, inset 0 0 20px ${brandColor}08`
            : "0 0 0px transparent",
          borderColor: isHovered ? `rgba(255,255,255,0.3)` : "transparent",
        }}
        transition={{ duration: 0.3 }}
        style={{ border: "1px solid transparent", borderRadius: "0.75rem" }}
      />

      {/* SVG icon from Devicon CDN */}
      <div className="relative w-7 h-7 shrink-0 flex items-center justify-center">
        <motion.img
          src={getIconUrl(skill.icon)}
          alt={skill.name}
          className="w-5 h-5 object-contain"
          animate={{
            filter: isHovered
              ? `drop-shadow(0 0 8px ${brandColor}60)`
              : "drop-shadow(0 0 0px transparent)",
          }}
          transition={{ duration: 0.3 }}
          loading="lazy"
        />
      </div>

      {/* Skill name */}
      <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors duration-300 whitespace-nowrap">
        {skill.name}
      </span>
    </motion.div>
  );
}

function ProfessionalSkillCard({
  ps,
  index,
  scrollYProgress,
}: {
  ps: (typeof professionalSkills)[number];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const speed = index % 2 === 0 ? 0.04 : 0.07;
  const cardY = useChildParallax(scrollYProgress, speed);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -6, scale: 1.01 }}
      style={{ y: cardY }}
      className="relative overflow-hidden p-6 rounded-2xl border border-white/10 bg-[#12151e]/60 hover:bg-white/4 backdrop-blur-sm transition-all duration-300 cursor-default group hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
    >
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/3 blur-2xl group-hover:bg-white/6 transition-all duration-500" />

      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-[#0b0d12] border border-white/15 flex items-center justify-center shrink-0">
          <ps.icon className="w-5 h-5 text-white" />
        </div>
        <h4 className="text-white font-semibold text-sm leading-tight">
          {ps.title}
        </h4>
      </div>

      <p className="text-slate-400 text-xs leading-relaxed mb-5">
        {ps.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {ps.highlights.map((h) => (
          <span
            key={h}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0b0d12] border border-white/10 text-slate-300 text-xs font-medium"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
            {h}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
