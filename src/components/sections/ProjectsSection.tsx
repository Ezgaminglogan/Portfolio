import { projects } from "@/data";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "./ProjectCard";

export default function ProjectsSection() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="section">
      <div className="shell">
        <SectionHeading
          id="projects-title"
          eyebrow="Featured projects"
          title="Systems I've built"
          description="Web and desktop systems built for CTU Naga Extension Campus and a hardware store client. Open a project for its features, technologies and screenshots."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {projects
            .filter((p) => p.featured)
            .map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
        </div>
      </div>
    </section>
  );
}
