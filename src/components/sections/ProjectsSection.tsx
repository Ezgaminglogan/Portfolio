"use client";
import { useState, useEffect } from "react";
import { motion, MotionValue } from "framer-motion";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { projects } from "@/app/data";
import { useParallax, useChildParallax } from "@/hooks/useParallax";

interface Project {
  title: string;
  description: string;
  tech: string[];
  gradient: string;
  image: string;
  type: string;
  liveUrl?: string;
  githubUrl?: string;
  codeHighlight?: {
    filename: string;
    language: string;
    code: string;
    explanation: string;
  };
}

const typedProjects = projects as unknown as Project[];

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const { ref, y, opacity, scrollYProgress } = useParallax({
    speed: 0.1,
    fadeIn: true,
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openProjectModal = (index: number) => {
    setSelectedProject(index);
    setShowCode(false);
    setCopied(false);
    document.body.style.overflow = "hidden";
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    setShowCode(false);
    setCopied(false);
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
        className="py-32 border-t border-emerald-500/10 relative"
      >
        {/* Ambient neon glow */}
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-emerald-500/[0.06] rounded-full blur-[150px] pointer-events-none glow-pulse" />
        <div className="mb-20">
          <h2 className="text-4xl font-extrabold text-white tracking-tighter mb-4">
            Selected Work.
          </h2>
          <p className="text-zinc-500">
            A curation of my recent development projects.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          {typedProjects.map((project, index) => (
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
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in"
          onClick={closeProjectModal}
        >
          <div
            className="relative w-full max-w-3xl bg-black border border-emerald-500/15 rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto thin-scrollbar animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeProjectModal}
              type="button"
              aria-label="Close project details"
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-zinc-400 hover:text-emerald-400 border border-emerald-500/15 transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
            <div className="relative w-full aspect-[16/9] bg-emerald-500/[0.02]">
              <Image
                src={typedProjects[selectedProject].image}
                alt={typedProjects[selectedProject].title}
                fill
                sizes="(min-width: 1024px) 768px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-8">
              <div className="text-xs uppercase tracking-widest text-zinc-500 mb-2">
                {typedProjects[selectedProject].type}
              </div>
              <h3 className="text-3xl font-bold text-white tracking-tight mb-4">
                {typedProjects[selectedProject].title}
              </h3>
              <p className="text-zinc-400 leading-relaxed mb-8">
                {typedProjects[selectedProject].description}
              </p>

              {/* Action Buttons Wrapper */}
              <div className="flex flex-wrap items-center gap-3.5 mb-8">
                {typedProjects[selectedProject].liveUrl && (
                  <a
                    href={typedProjects[selectedProject].liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 bg-emerald-500 text-black rounded-full text-sm font-semibold hover:bg-emerald-400 transition-colors hover:shadow-[0_0_20px_rgba(52,211,153,0.25)]"
                  >
                    Visit Live Site
                  </a>
                )}
                {typedProjects[selectedProject].githubUrl && (
                  <a
                    href={typedProjects[selectedProject].githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-emerald-500/20 text-emerald-400 rounded-full text-sm font-semibold hover:bg-emerald-500/5 transition-colors hover:shadow-[0_0_20px_rgba(52,211,153,0.1)]"
                  >
                    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                    Source Code
                  </a>
                )}
                {typedProjects[selectedProject].codeHighlight && (
                  <button
                    onClick={() => setShowCode(!showCode)}
                    className="inline-flex items-center gap-2 px-6 py-3 border border-emerald-500/20 text-emerald-400 rounded-full text-sm font-semibold hover:bg-emerald-500/5 transition-colors focus:outline-none"
                  >
                    {showCode ? "Hide Blueprint" : "Code Blueprint"}
                  </button>
                )}
              </div>

              {/* Code Highlight Drawer */}
              {typedProjects[selectedProject].codeHighlight && showCode && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="mb-8 overflow-hidden"
                >
                  <div className="bg-zinc-950 border border-emerald-500/15 rounded-xl">
                    {/* Terminal Header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-emerald-500/10 rounded-t-xl">
                      <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 rounded-full bg-red-500/80" />
                        <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/80" />
                        <div className="w-3.5 h-3.5 rounded-full bg-green-500/80" />
                        <span className="text-xs font-mono text-zinc-500 ml-2">
                          {typedProjects[selectedProject].codeHighlight.filename}
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopy(typedProjects[selectedProject].codeHighlight!.code)}
                        className="text-xs text-zinc-500 hover:text-emerald-400 font-mono transition-colors focus:outline-none"
                      >
                        {copied ? "[copied]" : "[copy]"}
                      </button>
                    </div>
                    {/* Terminal Code Body */}
                    <div className="overflow-x-auto max-h-[350px] thin-scrollbar bg-black/60 p-4 rounded-b-xl">
                      <pre className="text-xs font-mono text-emerald-400/90 whitespace-pre leading-relaxed select-all">
                        <code>{typedProjects[selectedProject].codeHighlight.code}</code>
                      </pre>
                    </div>
                  </div>
                  {/* Code Explanation Details */}
                  <div className="mt-3 p-4 bg-emerald-500/[0.02] border border-emerald-500/10 rounded-xl text-sm leading-relaxed text-zinc-400">
                    <strong className="text-emerald-400">Architectural Note: </strong>
                    {typedProjects[selectedProject].codeHighlight.explanation}
                  </div>
                </motion.div>
              )}

              <div className="flex flex-wrap gap-2 pt-6 border-t border-emerald-500/10">
                {typedProjects[selectedProject].tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 bg-emerald-500/[0.05] border border-emerald-500/15 text-zinc-300 text-xs rounded-full"
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
  project: Project;
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
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-emerald-500/[0.02] border border-emerald-500/10">
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
        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-emerald-300 transition-colors">
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
            className="inline-block mt-4 text-sm text-emerald-400 border-b border-emerald-500/20 hover:border-emerald-400 transition-colors"
          >
            Live Site
          </a>
        )}
      </div>
    </motion.div>
  );
}
