import { ArrowRight } from "lucide-react";
import { getFeaturedProjects } from "../data/projects.js";
import { ProjectCard } from "./ProjectCard.jsx";

const previewProjects = getFeaturedProjects();

export function ProjectsPreview() {
  return (
    <section className="section-band muted" id="projects">
      <div className="section-inner">
        <div className="section-heading with-action">
          <div>
            <p className="eyebrow">Featured work</p>
            <h2>Three projects showing audio ML, neuromorphic sensing and deployed vision.</h2>
          </div>
          <a className="button ghost" href="/projects">
            All projects
            <ArrowRight size={18} />
          </a>
        </div>
        <div className="project-grid featured-project-grid">
          {previewProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
