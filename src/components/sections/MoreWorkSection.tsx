import Image from "next/image";
import { ArrowDownTrayIcon, CheckIcon } from "@heroicons/react/24/outline";
import { projects, sqlitePortable } from "@/data";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "./ProjectCard";
import SqliteGallery from "./SqliteGallery";

export default function MoreWorkSection() {
  return (
    <section id="more-work" aria-labelledby="more-work-title" className="section border-y-2 border-ink bg-white">
      <div className="shell">
        <SectionHeading
          id="more-work-title"
          eyebrow="Other projects and software"
          title="More work"
          description="Academic web and desktop projects, plus a standalone database tool."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {projects
            .filter((p) => !p.featured)
            .map((project) => (
              <ProjectCard key={project.title} project={project} compact />
            ))}
        </div>

        <article aria-labelledby="sqlite-title" className="reveal mt-16 grid gap-8 lg:grid-cols-[2fr_3fr] lg:items-start">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/image/sqlite-portables/SQLite-Portable.png"
                alt=""
                width={48}
                height={48}
                className="rounded-md border-2 border-ink bg-white p-1.5 shadow-hard-sm"
              />
              <div>
                <p className="font-mono text-xs font-semibold text-muted">Desktop application · Windows</p>
                <h3 id="sqlite-title" className="text-2xl font-black tracking-tight">
                  SQLite Portable
                </h3>
              </div>
            </div>
            <p className="mt-4 leading-relaxed text-muted">
              A lightweight SQLite database manager for Windows with schema design tools and
              ready-made connection snippets for several languages.
            </p>
            <ul className="mt-5 grid gap-2 text-sm text-muted">
              {sqlitePortable.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href={sqlitePortable.downloadUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary mt-6"
            >
              <ArrowDownTrayIcon className="h-4 w-4" aria-hidden="true" />
              Download for Windows
            </a>
            <p className="mt-2 text-xs text-muted">.zip installer hosted on MediaFire (external site)</p>
          </div>
          <SqliteGallery images={sqlitePortable.screenshots} />
        </article>
      </div>
    </section>
  );
}
