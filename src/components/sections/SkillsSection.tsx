"use client";
import { motion, MotionValue } from "framer-motion";
import { skills, professionalSkills } from "@/app/data";
import { useParallax, useChildParallax } from "@/hooks/useParallax";

export default function SkillsSection() {
  const { ref, y, opacity, scrollYProgress } = useParallax({
    speed: 0.12,
    fadeIn: true,
  });

  const headingY = useChildParallax(scrollYProgress, 0.1);

  return (
    <motion.section
      ref={ref}
      id="skills"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{ y, opacity }}
      className="py-32 border-t border-white/5"
    >
      <motion.div className="mb-12" style={{ y: headingY }}>
        <h2 className="text-4xl font-extrabold text-white tracking-tighter mb-4">
          Skills.
        </h2>
        <p className="text-zinc-500">
          Frontend, Frameworks, Backend, and Libraries / Tools knowledge.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-6 mb-20">
        {skills.map((skill, index) => (
          <SkillCard
            key={index}
            skill={skill}
            index={index}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white tracking-tight mb-2">
          Professional Competencies
        </h3>
        <p className="text-zinc-500 text-sm">
          Core disciplines beyond code — systems, security, and engineering practices.
        </p>
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

function SkillCard({
  skill,
  index,
  scrollYProgress,
}: {
  skill: (typeof skills)[number];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  // Alternating drift: odd cards drift slightly faster
  const speed = index % 2 === 0 ? 0.03 : 0.06;
  const cardY = useChildParallax(scrollYProgress, speed);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5 }}
      style={{ y: cardY }}
      className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 cursor-default"
    >
      <skill.icon className="w-6 h-6 text-white mb-4" />
      <h3 className="text-white font-medium mb-1">{skill.name}</h3>
      <p className="text-sm text-zinc-500 mb-6">{skill.subtitle}</p>
      <div className="flex flex-wrap gap-2">
        {skill.technologies.map((tech) => (
          <span
            key={tech}
            className="px-2.5 py-1 text-xs rounded-full border border-white/10 bg-black font-medium text-zinc-400"
          >
            {tech}
          </span>
        ))}
      </div>
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
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, scale: 1.01 }}
      style={{ y: cardY }}
      className="relative overflow-hidden p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] backdrop-blur-sm transition-all duration-300 cursor-default group"
    >
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/5 blur-2xl group-hover:bg-white/10 transition-all duration-500" />

      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-black border border-white/10 flex items-center justify-center flex-shrink-0">
          <ps.icon className="w-5 h-5 text-white" />
        </div>
        <h4 className="text-white font-semibold text-sm leading-tight">
          {ps.title}
        </h4>
      </div>

      <p className="text-zinc-400 text-xs leading-relaxed mb-5">
        {ps.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {ps.highlights.map((h) => (
          <span
            key={h}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black border border-white/10 text-zinc-400 text-xs font-medium"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${ps.dot} flex-shrink-0`} />
            {h}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
