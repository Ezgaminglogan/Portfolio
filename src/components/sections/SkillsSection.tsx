import { skillGroups } from "@/data";
import SectionHeading from "@/components/ui/SectionHeading";
import TechBadge from "@/components/ui/TechBadge";

export default function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section border-y-2 border-ink bg-white">
      <div className="shell">
        <SectionHeading
          id="skills-title"
          eyebrow="Technical skills"
          title="Tools I use"
          description="Technologies used in the projects above, grouped by area."
        />
        <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.title} className="card reveal p-5">
              <dt className="text-lg font-black text-ink">{group.title}</dt>
              <dd className="mt-3">
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item}>
                      <TechBadge name={item} />
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
