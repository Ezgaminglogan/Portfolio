"use client";
import { useState, useEffect, useCallback, memo } from "react";
import { motion, type MotionValue } from "framer-motion";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { projects } from "@/app/data";
import type { Project } from "~types";
import { useParallax, useChildParallax } from "@/hooks/useParallax";
import AnimatedSectionHeading from "@/components/ui/AnimatedSectionHeading";

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const { ref, y, opacity, scrollYProgress } = useParallax({
    speed: 0.1,
    fadeIn: true,
  });

  const handleCopy = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const openProjectModal = useCallback((index: number) => {
    setSelectedProject(index);
    setShowCode(false);
    setCopied(false);
    document.body.style.overflow = "hidden";
  }, []);

  const closeProjectModal = useCallback(() => {
    setSelectedProject(null);
    setShowCode(false);
    setCopied(false);
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeProjectModal();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [closeProjectModal]);

  return (
    <>
      <motion.section
        ref={ref}
        id="projects"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ y, opacity }}
        className="py-32 border-t border-white/10 relative"
      >
        <AnimatedSectionHeading
          title="Selected Work."
          label="Featured Architecture"
          subtitle="A curation of my full-stack web, desktop, and enterprise software systems."
        />
        <div className="flex flex-col gap-12">
          {/* Flagship Spotlight Hero Project (First Project) */}
          {projects[0] && (
            <FeaturedFlagshipCard
              project={projects[0]}
              scrollYProgress={scrollYProgress}
              onOpen={() => openProjectModal(0)}
            />
          )}

          {/* Secondary & Campus Projects Grid */}
          <div className="grid md:grid-cols-2 gap-12">
            {projects.slice(1).map((project, idx) => {
              const actualIndex = idx + 1;
              return (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={actualIndex}
                  scrollYProgress={scrollYProgress}
                  onOpen={() => openProjectModal(actualIndex)}
                />
              );
            })}
          </div>
        </div>
      </motion.section>

      {selectedProject !== null && projects[selectedProject] && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-[#06080e]/95 backdrop-blur-xl animate-fade-in"
          onClick={closeProjectModal}
        >
          <div
            className="relative w-full max-w-3xl bg-[#06080e] border border-white/15 rounded-xl overflow-hidden max-h-[90vh] overflow-y-auto thin-scrollbar animate-scale-up shadow-[0_15px_50px_rgba(0,0,0,0.9)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeProjectModal}
              type="button"
              aria-label="Close project details"
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-zinc-400 hover:text-white border border-white/15 transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
            {/* Browser Window Mockup Frame */}
            <div className="w-full bg-[#0f1422] border-b border-white/10 overflow-hidden flex flex-col">
              {/* Browser Header Top Bar */}
              <div className="flex items-center gap-1.5 px-4 py-2.5 bg-black/50 border-b border-white/5 select-none">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <div className="mx-auto text-[10px] font-mono text-zinc-400 truncate max-w-50">
                  {projects[selectedProject].title.toLowerCase().replace(/\s+/g, "-")}.app
                </div>
              </div>
              {/* Screenshot Viewport */}
              <div className="relative w-full aspect-video bg-white/2">
                <Image
                  src={projects[selectedProject].image}
                  alt={projects[selectedProject].title}
                  fill
                  sizes="(min-width: 1024px) 768px, 100vw"
                  className="object-contain"
                />
              </div>
            </div>
            <div className="p-8">
              <div className="inline-block text-[11px] font-mono font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full mb-3">
                {projects[selectedProject].type}
              </div>
              <h3 className="text-3xl font-bold text-white tracking-tight mb-4">
                {projects[selectedProject].title}
              </h3>
              <p className="text-slate-300 leading-relaxed mb-8">
                {projects[selectedProject].description}
              </p>

              {/* Action Buttons Wrapper */}
              <div className="flex flex-wrap items-center gap-3.5 mb-8">
                {projects[selectedProject].liveUrl && (
                  <a
                    href={projects[selectedProject].liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full text-sm font-semibold hover:from-blue-500 hover:to-blue-400 transition-all shadow-[0_0_20px_rgba(59,130,246,0.35)]"
                  >
                    Visit Live Site ↗
                  </a>
                )}
                {projects[selectedProject].githubUrl && (
                  <a
                    href={projects[selectedProject].githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 bg-[#0f1422] text-white rounded-full text-sm font-semibold hover:bg-white/10 hover:border-blue-400/30 transition-colors"
                  >
                    <svg className="w-4 h-4 shrink-0 text-zinc-400" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                    Source Code
                  </a>
                )}
                {projects[selectedProject].codeHighlight && (
                  <button
                    onClick={() => setShowCode(!showCode)}
                    className="inline-flex items-center gap-2 px-6 py-3 border border-blue-400/30 bg-blue-500/10 text-blue-300 rounded-full text-sm font-semibold hover:bg-blue-500/20 transition-colors focus:outline-none"
                  >
                    {showCode ? "Hide Blueprint" : "Code Blueprint"}
                  </button>
                )}
              </div>

              {/* Code Highlight Drawer */}
              {projects[selectedProject].codeHighlight && showCode && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="mb-8 overflow-hidden"
                >
                  <div className="bg-[#0f1422] border border-white/15 rounded-lg overflow-hidden">
                    {/* Terminal Header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-black/50 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/70" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                        <div className="w-3 h-3 rounded-full bg-green-500/70" />
                        <span className="text-xs font-mono text-blue-300 ml-2">
                          {projects[selectedProject].codeHighlight!.filename}
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopy(projects[selectedProject].codeHighlight!.code)}
                        className="text-xs text-blue-400 hover:text-blue-300 font-mono transition-colors focus:outline-none"
                      >
                        {copied ? "[copied!]" : "[copy]"}
                      </button>
                    </div>
                    {/* Terminal Code Body */}
                    <div className="overflow-x-auto max-h-87.5 thin-scrollbar bg-[#080b11] p-4">
                      <pre className="text-xs font-mono text-slate-200 whitespace-pre leading-relaxed select-all">
                        <code>{projects[selectedProject].codeHighlight!.code}</code>
                      </pre>
                    </div>
                  </div>
                  {/* Code Explanation Details */}
                  <div className="mt-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-sm leading-relaxed text-slate-300">
                    <strong className="text-blue-300 font-semibold">Architectural Note: </strong>
                    {projects[selectedProject].codeHighlight!.explanation}
                  </div>
                </motion.div>
              )}

              <div className="flex flex-wrap gap-2 pt-6 border-t border-white/10">
                {projects[selectedProject].tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 bg-[#0f1422] border border-white/15 text-slate-300 text-xs rounded-full font-medium"
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

interface FeaturedFlagshipCardProps {
  project: Project;
  scrollYProgress: MotionValue<number>;
  onOpen: () => void;
}

const FeaturedFlagshipCard = memo(function FeaturedFlagshipCard({
  project,
  scrollYProgress,
  onOpen,
}: FeaturedFlagshipCardProps) {
  const cardY = useChildParallax(scrollYProgress, 0.03);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onClick={onOpen}
      style={{ y: cardY }}
      className="group cursor-pointer p-6 sm:p-8 rounded-2xl bg-[#0f1422]/90 hover:bg-white/4 border border-white/15 hover:border-blue-400/40 transition-all duration-500 shadow-[0_10px_40px_rgba(0,0,0,0.8)] hover:shadow-[0_0_35px_rgba(59,130,246,0.15)]"
    >
      <div className="grid lg:grid-cols-12 gap-8 items-center">
        {/* Browser Mockup Column */}
        <div className="lg:col-span-7 w-full bg-[#080b11] border border-white/10 rounded-sm overflow-hidden flex flex-col shadow-2xl group-hover:border-blue-400/30 transition-all duration-300">
          <div className="flex items-center gap-1.5 px-3 py-2 bg-black/50 border-b border-white/5 select-none">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            <div className="mx-auto text-[10px] font-mono text-zinc-400 truncate max-w-50">
              {project.title.toLowerCase().replace(/\s+/g, "-")}.app
            </div>
          </div>
          <div className="relative w-full aspect-video overflow-hidden bg-white/2">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-contain transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-103"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
          </div>
        </div>

        {/* Narrative & Details Column */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-blue-300 bg-blue-500/10 border border-blue-500/25 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Featured Case Study
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-blue-200 transition-colors">
            {project.title}
          </h3>

          <p className="text-slate-300 text-sm leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-xs rounded-full border border-white/10 bg-[#080b11] text-slate-300 font-medium"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-white/10">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full text-xs font-semibold hover:from-blue-500 hover:to-blue-400 transition-all shadow-[0_0_20px_rgba(59,130,246,0.35)]"
              >
                Live Production ↗
              </a>
            )}
            <span className="text-xs text-blue-400 font-mono group-hover:text-blue-300 transition-colors">
              Click to view blueprint →
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

interface ProjectCardProps {
  project: Project;
  index: number;
  scrollYProgress: MotionValue<number>;
  onOpen: () => void;
}

const ProjectCard = memo(function ProjectCard({
  project,
  index,
  scrollYProgress,
  onOpen,
}: ProjectCardProps) {
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
      {/* Browser Window Mockup Card Frame */}
      <div className="w-full bg-[#0f1422] border border-white/10 rounded-sm overflow-hidden flex flex-col shadow-[0_4px_25px_rgba(0,0,0,0.6)] group-hover:border-blue-400/30 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300">
        {/* Browser Header Top Bar */}
        <div className="flex items-center gap-1.5 px-3 py-2 bg-black/50 border-b border-white/5 select-none">
          <div className="w-2 h-2 rounded-full bg-red-500/60" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
          <div className="w-2 h-2 rounded-full bg-green-500/60" />
          <div className="mx-auto text-[9px] font-mono text-zinc-400 truncate max-w-37.5">
            {project.title.toLowerCase().replace(/\s+/g, "-")}.app
          </div>
        </div>
        {/* Screenshot Viewport */}
        <div className="relative w-full aspect-video overflow-hidden bg-white/2">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-contain transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-103"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
        </div>
      </div>
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-blue-400 font-semibold">
            {project.type}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-200 transition-colors">
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="text-xs text-slate-400">
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
            className="inline-block mt-4 text-xs font-mono text-blue-400 border-b border-blue-500/30 hover:text-blue-300 hover:border-blue-400 transition-colors"
          >
            Live Site ↗
          </a>
        )}
      </div>
    </motion.div>
  );
});
