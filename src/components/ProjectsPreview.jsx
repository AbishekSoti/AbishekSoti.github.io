import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getFeaturedProjects } from "../data/projects.js";
import { ProjectVisual } from "./ProjectVisual.jsx";

const previewProjects = getFeaturedProjects();

export function ProjectsPreview() {
  return (
    <section className="section-band work-band" id="selected-work">
      <div className="section-inner">
        <div className="showcase-heading">
          <div>
            <p className="eyebrow">Selected completed work</p>
            <h2>Systems built around real constraints.</h2>
          </div>
          <a className="text-link" href="/projects">
            All projects
            <ArrowRight size={18} />
          </a>
        </div>
        <div className="work-index">
          {previewProjects.map((project, index) => (
            <a
              className="work-entry"
              href={"/projects/" + project.slug}
              key={project.slug}
            >
              <div className="work-entry-media">
                <ProjectVisual project={project} />
              </div>
              <div className="work-entry-copy">
                <div className="work-entry-meta">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{project.category}</span>
                </div>
                <h3>{project.title}</h3>
                <p className="work-statement">{project.homepage.statement}</p>
                <p className="work-summary">{project.homepage.summary}</p>
                {project.homepage.proof ? (
                  <div className="work-facts" aria-label="Project highlights">
                    {project.homepage.proof.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                ) : null}
                <span className="work-link" aria-hidden="true">
                  View case study
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
