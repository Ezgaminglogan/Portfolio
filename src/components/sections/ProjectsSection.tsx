"use client";
import { useState, useEffect } from "react";
import { motion, MotionValue } from "framer-motion";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { projects } from "@/app/data";
import { useParallax, useChildParallax } from "@/hooks/useParallax";

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const { ref, y, opacity, scrollYProgress } = useParallax({
    speed: 0.1,
    fadeIn: true,
  });

  const openProjectModal = (index: number) => {
    setSelectedProject(index);
    document.body.style.overflow = "hidden";
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeProjectModal();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      <motion.section
        ref={ref}
        id="projects"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ y, opacity }}
        className="py-32 border-t border-white/5"
      >
        <div className="mb-20">
          <h2 className="text-4xl font-extrabold text-white tracking-tighter mb-4">
            Selected Work.
          </h2>
          <p className="text-zinc-500">
            A curation of my recent development projects.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              scrollYProgress={scrollYProgress}
              onOpen={() => openProjectModal(index)}
            />
          ))}
        </div>
      </motion.section>

      {selectedProject !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
          onClick={closeProjectModal}
        >
          <div
            className="relative w-full max-w-3xl bg-black border border-white/10 rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeProjectModal}
              type="button"
              aria-label="Close project details"
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-zinc-400 hover:text-white border border-white/10 transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
            <div className="relative w-full aspect-[16/9] bg-white/[0.02]">
              <Image
                src={projects[selectedProject].image}
                alt={projects[selectedProject].title}
                fill
                sizes="(min-width: 1024px) 768px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-8">
              <div className="text-xs uppercase tracking-widest text-zinc-500 mb-2">
                {projects[selectedProject].type}
              </div>
              <h3 className="text-3xl font-bold text-white tracking-tight mb-4">
                {projects[selectedProject].title}
              </h3>
              <p className="text-zinc-400 leading-relaxed mb-8">
                {projects[selectedProject].description}
              </p>
              {projects[selectedProject].liveUrl && (
                <a
                  href={projects[selectedProject].liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mb-8 px-6 py-3 bg-white text-black rounded-full text-sm font-semibold hover:bg-zinc-200 transition-colors"
                >
                  Visit Live Site
                </a>
              )}
              <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                {projects[selectedProject].tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 bg-white/[0.05] border border-white/10 text-zinc-300 text-xs rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ProjectCard({
  project,
  index,
  scrollYProgress,
  onOpen,
}: {
  project: (typeof projects)[number];
  index: number;
  scrollYProgress: MotionValue<number>;
  onOpen: () => void;
}) {
  // Left column drifts up, right column drifts down
  const isLeft = index % 2 === 0;
  const speed = isLeft ? 0.05 : -0.05;
  const cardY = useChildParallax(scrollYProgress, speed);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onClick={onOpen}
      style={{ y: cardY }}
      className="group cursor-pointer flex flex-col gap-6"
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-white/[0.02] border border-white/5">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
      </div>
      <div>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs uppercase tracking-widest text-zinc-500">
            {project.type}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-zinc-300 transition-colors">
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="text-xs text-zinc-500">
              {t}
            </span>
          ))}
        </div>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-block mt-4 text-sm text-white border-b border-white/20 hover:border-white transition-colors"
          >
            Live Site
          </a>
        )}
      </div>
    </motion.div>
  );
}
