import Image from "next/image";
import { ArrowDownTrayIcon, ArrowTopRightOnSquareIcon, CheckIcon } from "@heroicons/react/24/outline";
import type { Project } from "@/types";
import Dialog from "@/components/ui/Dialog";
import TechBadge from "@/components/ui/TechBadge";
import { GitHubIcon } from "@/components/ui/icons";

function DownloadLink({ project }: { project: Project }) {
  return (
    <a href={project.downloadUrl} target="_blank" rel="noreferrer" className="btn btn-outline">
      <ArrowDownTrayIcon className="h-4 w-4" aria-hidden="true" />
      Download<span className="sr-only"> {project.title} (latest GitHub release)</span>
    </a>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  if (!project.githubUrl && !project.liveUrl && !project.downloadUrl) {
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
      {project.downloadUrl && <DownloadLink project={project} />}
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
      {(project.description ?? [project.summary]).map((para) => (
        <p key={para.slice(0, 40)} className="leading-relaxed">
          {para}
        </p>
      ))}

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
        <div className="grid gap-6">
          {project.images.map((img) => (
            <figure key={img.src}>
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width ?? 1600}
                height={img.height ?? 900}
                sizes="(min-width: 1024px) 56rem, 100vw"
                className="h-auto max-h-[70vh] w-full rounded-md border-2 border-ink bg-porcelain object-contain"
              />
              {img.caption && <figcaption className="mt-2 text-sm text-muted">{img.caption}</figcaption>}
            </figure>
          ))}
        </div>
      </div>

      <ProjectLinks project={project} />
    </div>
  );
}

export default function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  const cover = project.images[0];
  const flagship = project.flagship;
  const shown = compact ? 3 : flagship ? project.tech.length : 5;
  // overflow-clip, not overflow-hidden: "hidden" makes a scroll container, which
  // would scope the cover's view() timeline to the frame and freeze the parallax.
  // Flagship: spans both grid columns; image beside the text from lg up.
  return (
    <article
      className={`card card-lift reveal flex flex-col overflow-clip ${
        flagship ? "md:col-span-2 lg:grid lg:grid-cols-[3fr_2fr]" : ""
      }`}
    >
      <div
        className={`relative aspect-video overflow-clip border-b-2 border-ink ${
          flagship
            ? // Matte sampled from the cover's own gradient, so the uncropped
              // (object-contain) image blends into its letterbox.
              "bg-[linear-gradient(#0f1424,#192137)] lg:aspect-auto lg:min-h-96 lg:border-r-2 lg:border-b-0"
            : "bg-porcelain"
        }`}
      >
        {/* Featured covers drift inside their frame (scaled 115% so no edge
            shows); the card and its buttons stay still. */}
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          priority={flagship}
          sizes={
            compact
              ? "(min-width: 1024px) 20rem, (min-width: 640px) 50vw, 100vw"
              : flagship
                ? "(min-width: 1440px) 52rem, (min-width: 1024px) 60vw, 100vw"
                : "(min-width: 1440px) 44rem, (min-width: 768px) 50vw, 100vw"
          }
          className={
            compact
              ? "object-cover object-top"
              : flagship
                ? "parallax object-contain" // full cover visible; drifts within its matte
                : "parallax scale-115 object-cover object-top"
          }
          style={compact ? undefined : ({ "--drift": "26px" } as React.CSSProperties)}
        />
      </div>
      <div className={`flex flex-1 flex-col ${compact ? "gap-3 p-5" : flagship ? "gap-5 p-6 lg:p-8" : "gap-4 p-6"}`}>
        <div>
          {project.label && <p className="eyebrow mb-3">{project.label}</p>}
          <p className="font-mono text-xs font-semibold text-muted">
            {project.kind} · {project.context}
          </p>
          <h3 className={`mt-1 font-black tracking-tight ${compact ? "text-lg" : flagship ? "text-3xl sm:text-4xl" : "text-xl"}`}>
            {project.title}
          </h3>
          {project.status && (
            <p className="mt-2 inline-flex items-center gap-1.5 rounded-sm border-2 border-ink bg-mint px-2 py-0.5 font-mono text-xs font-bold text-ink">
              <span className="h-1.5 w-1.5 bg-ink" aria-hidden="true" />
              {project.status}
            </p>
          )}
        </div>
        <p className={`leading-relaxed text-muted ${flagship ? "text-base" : "text-sm"}`}>{project.summary}</p>
        {project.stats && (
          // The 2px gap over an ink background draws the dividers at any column count.
          <dl className="grid grid-cols-2 gap-[2px] overflow-clip rounded-md border-2 border-ink bg-ink sm:grid-cols-4">
            {project.stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse bg-white p-3">
                <dt className="font-mono text-xs text-muted">{s.label}</dt>
                <dd className="text-2xl font-black">{s.value}</dd>
              </div>
            ))}
          </dl>
        )}
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
          {!compact && project.downloadUrl && <DownloadLink project={project} />}
        </div>
      </div>
    </article>
  );
}
