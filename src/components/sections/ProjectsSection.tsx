import { projects } from "@/data";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "./ProjectCard";

const featured = projects.filter((p) => p.featured);
const flagships = featured.filter((p) => p.flagship);

export default function ProjectsSection() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="section">
      <div className="shell">
        <SectionHeading
          id="projects-title"
          eyebrow="Featured projects"
          title="Systems I've built"
          description="An open-source offline IDE, a microfinance system for a lending company, and web and desktop systems for CTU Naga Extension Campus and a hardware store. Open a project for its features, technologies and screenshots."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              flip={project.flagship && flagships.indexOf(project) % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
