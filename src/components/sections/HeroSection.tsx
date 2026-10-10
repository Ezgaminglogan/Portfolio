import Image from "next/image";
import { ArrowDownTrayIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { PROFILE_PHOTO, RESUME_PATH } from "@/constants/seo";

const STACK = ["Next.js", "React", "C# / .NET", "PHP", "MySQL", "Prisma", "TailwindCSS"];

// Staggers the .anim-stamp entrance (see globals.css).
const delay = (d: string) => ({ "--delay": d }) as React.CSSProperties;

export default function HeroSection() {
  return (
    <section id="top" aria-labelledby="hero-title" className="on-forest relative overflow-hidden border-b-2 border-ink bg-forest text-white">
      <div className="tech-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="shell relative grid items-center gap-10 pt-28 pb-16 sm:pt-32 md:grid-cols-[1fr_auto] md:gap-12 lg:pb-24">
        <div>
          <p className="anim-stamp inline-flex items-center gap-2 rounded-sm border-2 border-white bg-mint px-2.5 py-1 font-mono text-xs font-bold tracking-wider text-ink uppercase">
            <span className="h-2 w-2 bg-ink" aria-hidden="true" />
            Available for developer roles
          </p>

          <h1 id="hero-title" className="mt-6 text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
            Logan M. Panucat
          </h1>
          <p className="mt-4 font-mono text-base font-bold text-mint sm:text-lg">
            Full-Stack Developer · BSIT College Instructor
          </p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            I build web applications, desktop tools and database-backed systems, and I teach IT
            students at Cebu Technological University – Naga Extension Campus.
          </p>

          <div className="anim-stamp mt-8 flex flex-wrap gap-3" style={delay("0.1s")}>
            <a href="#projects" className="btn btn-mint">
              View projects
            </a>
            <a href="#contact" className="btn btn-on-forest">
              Contact me
            </a>
            <a href={RESUME_PATH} target="_blank" rel="noreferrer" className="btn btn-on-forest">
              <ArrowDownTrayIcon className="h-4 w-4" aria-hidden="true" />
              Resume (PDF)
            </a>
          </div>

          <ul aria-label="Core stack" className="mt-8 flex flex-wrap gap-2">
            {STACK.map((name) => (
              <li key={name} className="rounded-sm border-2 border-white/70 px-2 py-0.5 font-mono text-xs font-semibold text-white">
                {name}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-56 sm:w-64 md:w-72 lg:w-80">
          <Image
            src={PROFILE_PHOTO}
            alt="Portrait of Logan M. Panucat in graduation attire"
            width={900}
            height={1350}
            priority
            sizes="(min-width: 1024px) 20rem, (min-width: 768px) 18rem, (min-width: 640px) 16rem, 14rem"
            className="anim-stamp relative aspect-[4/5] w-full rounded-lg border-[3px] border-white object-cover object-top shadow-hard-mint"
            style={delay("0.15s")}
          />
          <dl style={delay("0.3s")} className="anim-stamp relative -mt-8 mr-6 -ml-3 grid grid-cols-2 divide-x-2 divide-ink overflow-hidden rounded-md border-2 border-ink bg-white text-xs text-ink shadow-[4px_4px_0_0_var(--color-mint)]">
            <div className="px-3 py-2">
              <dt className="font-mono text-muted">Education</dt>
              <dd className="font-bold">BSIT, Cum Laude</dd>
            </div>
            <div className="px-3 py-2">
              <dt className="font-mono text-muted">Based in</dt>
              <dd className="flex items-center gap-1 font-bold">
                <MapPinIcon className="h-3.5 w-3.5 text-emerald" aria-hidden="true" />
                Cebu, PH
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
