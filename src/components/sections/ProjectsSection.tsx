"use client";
import { useState, useEffect, useCallback, memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  XMarkIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { projects } from "@/app/data";
import type { Project } from "~types";
import AnimatedSectionHeading from "@/components/ui/AnimatedSectionHeading";
import { lockScroll, unlockScroll } from "@/components/SmoothScroll";

// Tech stack icon mapping for crisp branded SVG logos (self-hosted in /public/icons)
const TECH_ICON_SLUGS: Record<string, string> = {
  TanStack: "/icons/reactquery.svg",
  "ShadCN UI": "/icons/shadcnui.svg",
  "Better Auth": "/icons/auth0.svg",
  Prisma: "/icons/prisma.svg",
  "Prisma ORM": "/icons/prisma.svg",
  libSQL: "/icons/sqlite.svg",
  SQLite: "/icons/sqlite.svg",
  TailwindCSS: "/icons/tailwindcss.svg",
  MySQL: "/icons/mysql.svg",
  JWT: "/icons/jsonwebtokens.svg",
  "Blazor Framework": "/icons/dot-net.svg",
  "C#": "/icons/csharp.svg",
  ".NET": "/icons/dotnetcore.svg",
  PHP: "/icons/php.svg",
  PHPMailer: "/icons/php.svg",
  "Visual Basic WFA": "/icons/visualbasic.svg",
  "ASP.NET Web MVC": "/icons/dotnetcore.svg",
  SignalR: "/icons/dot-net.svg",
  "Entity Framework": "/icons/dotnetcore.svg",
  "EF Core": "/icons/dotnetcore.svg",
  "Google reCAPTCHA v3": "/icons/google.svg",
  "Google Sign-In": "/icons/google.svg",
  React: "/icons/react.svg",
  "Next.js": "/icons/nextdotjs.svg",
  TypeScript: "/icons/typescript.svg",
  JavaScript: "/icons/javascript.svg",
};

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const openProjectModal = useCallback((index: number) => {
    setSelectedProject(index);
    lockScroll();
  }, []);

  const closeProjectModal = useCallback(() => {
    setSelectedProject(null);
    unlockScroll();
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
        id="projects"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="py-24 sm:py-32 border-t border-slate-200/80 relative"
      >
        <AnimatedSectionHeading
          title="Selected Work."
          label="Featured Architecture"
          subtitle="A curation of my full-stack web, desktop, and enterprise software systems."
        />
        <div className="flex flex-col gap-10">
          {/* Flagship Spotlight Hero Project (First Project) */}
          {projects[0] && (
            <FeaturedFlagshipCard
              project={projects[0]}
              onOpen={() => openProjectModal(0)}
            />
          )}

          {/* Secondary & Campus Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {projects.slice(1).map((project, idx) => {
              const actualIndex = idx + 1;
              return (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={actualIndex}
                  onOpen={() => openProjectModal(actualIndex)}
                />
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Project Details Modal — Maximized Immersive Widescreen Modal */}
      {selectedProject !== null && projects[selectedProject] && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-5 lg:p-7 bg-slate-950/70 backdrop-blur-md animate-fade-in"
          onClick={closeProjectModal}
        >
          <div
            className="relative w-full max-w-[1380px] bg-white border border-slate-200 rounded-3xl sm:rounded-[36px] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.35)] max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Floating Close Button */}
            <button
              onClick={closeProjectModal}
              type="button"
              aria-label="Close project details"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-slate-600 hover:text-slate-950 border border-slate-200 transition-all shadow-md cursor-pointer hover:scale-108 active:scale-95"
            >
              <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6 stroke-2" />
            </button>

            {/* 2-Grid Side-by-Side Layout — Fluid Responsive Proportion */}
            <div className="grid lg:grid-cols-12 min-h-0 flex-1 overflow-y-auto thin-scrollbar">
              {/* Left Column (7 cols): High-Impact Viewport & CAD Chrome */}
              <div className="lg:col-span-7 bg-slate-950 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800 relative">
                {/* Browser Header Bar */}
                <div className="flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 bg-black/60 border-b border-white/10 select-none shrink-0">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/85" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/85" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/85" />
                  <div className="mx-auto text-[11px] sm:text-xs font-mono text-slate-300 tracking-wider truncate max-w-[200px] sm:max-w-sm">
                    {projects[selectedProject].title
                      .toLowerCase()
                      .replace(/\s+/g, "-")}
                    .app
                  </div>
                </div>

                {/* Maximized Screenshot Container */}
                <div className="relative w-full flex-1 aspect-[16/10] sm:aspect-video lg:aspect-auto min-h-[240px] sm:min-h-[320px] lg:min-h-[500px] bg-[#070b16] flex items-center justify-center p-3 sm:p-6 lg:p-8">
                  <Image
                    src={projects[selectedProject].image}
                    alt={projects[selectedProject].title}
                    fill
                    sizes="(min-width: 1400px) 800px, (min-width: 1024px) 60vw, 100vw"
                    className="object-contain p-1 sm:p-2"
                    priority
                  />
                </div>
              </div>

              {/* Right Column (5 cols): Expanded Info, High-Contrast Typography, Tech Badges */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-between bg-white overflow-y-auto">
                <div>
                  <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full mb-4 sm:mb-6 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    {projects[selectedProject].type}
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight mb-4 sm:mb-6 leading-tight">
                    {projects[selectedProject].title}
                  </h3>

                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base lg:text-lg mb-6 sm:mb-8">
                    {projects[selectedProject].description}
                  </p>
                </div>

                <div className="pt-2 sm:pt-4">
                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                    {projects[selectedProject].liveUrl && (
                      <a
                        href={projects[selectedProject].liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 bg-blue-600 text-white rounded-full text-sm sm:text-base font-bold hover:bg-blue-700 transition-all shadow-[0_8px_25px_rgba(37,99,235,0.3)] hover:scale-102 active:scale-98 cursor-pointer"
                      >
                        <span>Visit Live Site</span>
                        <ArrowTopRightOnSquareIcon className="w-4 h-4 sm:w-5 sm:h-5 stroke-2" />
                      </a>
                    )}
                    {projects[selectedProject].githubUrl && (
                      <a
                        href={projects[selectedProject].githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 border border-slate-200 bg-white text-slate-900 rounded-full text-sm sm:text-base font-bold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-xs cursor-pointer hover:scale-102 active:scale-98"
                      >
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-slate-800"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          />
                        </svg>
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>

                  {/* Expanded Tech Badges with Brand Icons */}
                  <div className="flex flex-wrap gap-2 sm:gap-2.5 pt-4 sm:pt-6 border-t border-slate-100">
                    {projects[selectedProject].tech.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 text-slate-800 text-xs sm:text-sm rounded-xl font-semibold shadow-xs transition-colors"
                      >
                        {TECH_ICON_SLUGS[t] && (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={TECH_ICON_SLUGS[t]}
                            alt={t}
                            className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 object-contain shrink-0"
                            loading="lazy"
                          />
                        )}
                        <span>{t}</span>
                      </span>
                    ))}
                  </div>
                </div>
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
  onOpen: () => void;
}

const FeaturedFlagshipCard = memo(function FeaturedFlagshipCard({
  project,
  onOpen,
}: FeaturedFlagshipCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onClick={onOpen}
      className="group cursor-pointer p-6 sm:p-8 lg:p-10 rounded-3xl bg-white border border-slate-200 hover:border-blue-300 transition-all duration-500 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_45px_rgba(37,99,235,0.08)]"
    >
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Browser Mockup Column */}
        <div className="lg:col-span-7 w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col shadow-md group-hover:border-blue-400/40 transition-all duration-300">
          <div className="flex items-center gap-2 px-4 py-3 bg-black/40 border-b border-white/5 select-none">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            <div className="mx-auto text-[10px] font-mono text-slate-400 truncate max-w-50">
              {project.title.toLowerCase().replace(/\s+/g, "-")}.app
            </div>
          </div>
          <div className="relative w-full aspect-video overflow-hidden bg-[#0b1329] p-2">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-contain transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-103 p-1"
            />
          </div>
        </div>

        {/* Narrative & Details Column */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {project.type.includes("Ongoing")
                ? "Active Ongoing Project"
                : "Featured Case Study"}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {project.description}
          </p>

          {/* Tech Badges with Brand Icons */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-medium hover:bg-slate-100 transition-colors"
              >
                {TECH_ICON_SLUGS[t] && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={TECH_ICON_SLUGS[t]}
                    alt={t}
                    className="w-3.5 h-3.5 object-contain shrink-0"
                    loading="lazy"
                  />
                )}
                <span>{t}</span>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-full text-xs font-semibold hover:bg-blue-700 transition-all shadow-[0_4px_15px_rgba(37,99,235,0.25)] cursor-pointer"
              >
                Live Production ↗
              </a>
            )}
            <span className="text-xs text-blue-600 font-mono font-semibold group-hover:text-blue-700 transition-colors">
              View Project Details →
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
  onOpen: () => void;
}

const ProjectCard = memo(function ProjectCard({
  project,
  index,
  onOpen,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={onOpen}
      className="group cursor-pointer flex flex-col gap-5 p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_35px_rgba(37,99,235,0.08)]"
    >
      {/* Browser Window Mockup Card Frame */}
      <div className="w-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col shadow-xs group-hover:border-blue-400/40 transition-all duration-300">
        <div className="flex items-center gap-1.5 px-3 py-2 bg-black/40 border-b border-white/5 select-none">
          <div className="w-2 h-2 rounded-full bg-red-500/80" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
          <div className="w-2 h-2 rounded-full bg-green-500/80" />
          <div className="mx-auto text-[9px] font-mono text-slate-400 truncate max-w-36">
            {project.title.toLowerCase().replace(/\s+/g, "-")}.app
          </div>
        </div>
        <div className="relative w-full aspect-video overflow-hidden bg-[#0b1329] p-1.5">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-contain transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-103 p-1"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-blue-700 font-bold">
            {project.type}
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2.5 group-hover:text-blue-600 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Badges with Brand Icons */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] text-slate-700 bg-slate-50 border border-slate-200/80 rounded-lg font-medium"
            >
              {TECH_ICON_SLUGS[t] && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={TECH_ICON_SLUGS[t]}
                  alt={t}
                  className="w-3 h-3 object-contain shrink-0"
                  loading="lazy"
                />
              )}
              <span>{t}</span>
            </span>
          ))}
        </div>

        <span className="inline-block text-xs font-mono font-semibold text-blue-600 hover:text-blue-700 transition-colors pt-1">
          View Details →
        </span>
      </div>
    </motion.div>
  );
});
