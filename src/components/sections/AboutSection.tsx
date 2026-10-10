import { AcademicCapIcon } from "@heroicons/react/24/outline";
import { education, experiences, focusAreas } from "@/data";
import SectionHeading from "@/components/ui/SectionHeading";

export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="shell">
        <SectionHeading id="about-title" eyebrow="About" title="Developer and educator" />

        <div className="grid gap-12 lg:grid-cols-[3fr_2fr]">
          <div className="space-y-4 text-lg leading-relaxed text-muted">
            <p>
              I&apos;m a BSIT graduate (Cum Laude) and a college instructor at Cebu Technological
              University – Naga Extension Campus, where I teach software development, web and
              database technologies.
            </p>
            <p>
              Outside the classroom I build full-stack systems with PHP, MySQL, C# and ASP.NET MVC
              alongside TypeScript and Next.js, from campus tools like a faculty grade sheet app and a library
              system to Supplify, a supply management system deployed for a local hardware store.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-black tracking-tight text-ink">What I work on</h3>
            <dl className="mt-4 grid gap-4">
              {focusAreas.map((area) => (
                <div key={area.title} className="border-l-4 border-mint pl-4">
                  <dt className="font-semibold text-ink">{area.title}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted">{area.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[3fr_2fr]">
          <div>
            <h3 className="text-2xl font-black tracking-tight">Experience</h3>
            <ol className="mt-6 grid gap-6 border-l-2 border-ink pl-6">
              {experiences.map((exp) => (
                <li key={exp.role} className="reveal relative">
                  <span className="absolute top-1 -left-[2.05rem] h-4 w-4 border-2 border-ink bg-mint" aria-hidden="true" />
                  <p className="font-mono text-sm font-bold text-emerald">{exp.period}</p>
                  <h4 className="mt-1 text-lg font-semibold">{exp.role}</h4>
                  <p className="text-sm text-muted">{exp.organization}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{exp.description}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Skills">
                    {exp.skills.map((s) => (
                      <li key={s} className="badge">
                        {s}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="text-2xl font-black tracking-tight">Education</h3>
            {education.map((edu) => (
              <div key={edu.degree} className="card reveal mt-6 p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-ink bg-mint text-ink">
                    <AcademicCapIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="font-mono text-sm font-bold text-emerald">{edu.period}</p>
                </div>
                <h4 className="mt-4 text-lg font-semibold">{edu.degree}</h4>
                <p className="text-sm text-muted">{edu.institution}</p>
                {edu.honor && (
                  <p className="mt-3 inline-flex rounded-sm border-2 border-ink bg-mint px-2 py-0.5 font-mono text-xs font-bold text-ink">
                    {edu.honor}
                  </p>
                )}
                <p className="mt-3 text-sm leading-relaxed text-muted">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
