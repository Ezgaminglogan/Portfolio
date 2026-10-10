import Image from "next/image";
import { ArrowTopRightOnSquareIcon, CheckIcon } from "@heroicons/react/24/outline";
import type { Project } from "@/types";
import Dialog from "@/components/ui/Dialog";
import TechBadge from "@/components/ui/TechBadge";
import { GitHubIcon } from "@/components/ui/icons";

function ProjectLinks({ project }: { project: Project }) {
  if (!project.githubUrl && !project.liveUrl) {
    return <p className="text-xs text-muted">Source and demo not publicly linked</p>;
  }
  return (
    <div className="flex flex-wrap gap-2">
      {project.githubUrl && (
        <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn btn-outline">
          <GitHubIcon className="h-4 w-4" />
          Source code<span className="sr-only"> for {project.title} (GitHub)</span>
        </a>
      )}
      {project.liveUrl && (
        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-outline">
          <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
          Live demo<span className="sr-only"> of {project.title}</span>
        </a>
      )}
    </div>
  );
}

function ProjectDetails({ project }: { project: Project }) {
  return (
    <div className="grid gap-6">
      <p className="font-mono text-sm text-muted">
        {project.kind} · {project.context}
        {project.status && ` · ${project.status}`}
      </p>
      <p className="leading-relaxed">{project.summary}</p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold">Key features</h3>
          <ul className="mt-2 grid gap-2 text-sm text-muted">
            {project.features.map((f) => (
              <li key={f} className="flex gap-2">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid content-start gap-5">
          {project.role && (
            <div>
              <h3 className="text-sm font-semibold">My role</h3>
              <p className="mt-1 text-sm text-muted">{project.role}</p>
            </div>
          )}
          {project.outcome && (
            <div>
              <h3 className="text-sm font-semibold">Outcome</h3>
              <p className="mt-1 text-sm text-muted">{project.outcome}</p>
            </div>
          )}
          <div>
            <h3 className="text-sm font-semibold">Technologies</h3>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <li key={t}>
                  <TechBadge name={t} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold">Screenshots</h3>
        <div className="grid gap-4">
          {project.images.map((img) => (
            <Image
              key={img.src}
              src={img.src}
              alt={img.alt}
              width={1600}
              height={900}
              sizes="(min-width: 1024px) 56rem, 100vw"
              className="h-auto max-h-[70vh] w-full rounded-md border-2 border-ink bg-porcelain object-contain"
            />
          ))}
        </div>
      </div>

      <ProjectLinks project={project} />
    </div>
  );
}

export default function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  const cover = project.images[0];
  const shown = compact ? 3 : 5;
  return (
    <article className="card card-lift reveal flex flex-col overflow-hidden">
      <div className="relative aspect-video border-b-2 border-ink bg-porcelain">
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes={compact ? "(min-width: 1024px) 18rem, (min-width: 640px) 50vw, 100vw" : "(min-width: 768px) 36rem, 100vw"}
          className="object-cover object-top"
        />
      </div>
      <div className={`flex flex-1 flex-col ${compact ? "gap-3 p-5" : "gap-4 p-6"}`}>
        <div>
          <p className="font-mono text-xs font-semibold text-muted">
            {project.kind} · {project.context}
          </p>
          <h3 className={`mt-1 font-black tracking-tight ${compact ? "text-lg" : "text-xl"}`}>{project.title}</h3>
          {project.status && (
            <p className="mt-2 inline-flex items-center gap-1.5 rounded-sm border-2 border-ink bg-mint px-2 py-0.5 font-mono text-xs font-bold text-ink">
              <span className="h-1.5 w-1.5 bg-ink" aria-hidden="true" />
              {project.status}
            </p>
          )}
        </div>
        <p className="text-sm leading-relaxed text-muted">{project.summary}</p>
        <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.tech.slice(0, shown).map((t) => (
            <li key={t}>
              <TechBadge name={t} />
            </li>
          ))}
          {project.tech.length > shown && (
            <li className="badge text-muted">+{project.tech.length - shown} more</li>
          )}
        </ul>
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
          <Dialog
            title={project.title}
            triggerClassName="btn btn-primary"
            trigger={
              <>
                View details<span className="sr-only"> about {project.title}</span>
              </>
            }
          >
            <ProjectDetails project={project} />
          </Dialog>
          {!compact && project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn btn-outline">
              <GitHubIcon className="h-4 w-4" />
              GitHub<span className="sr-only"> repository for {project.title}</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
