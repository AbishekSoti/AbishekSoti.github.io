import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getFeaturedProjects } from "../data/projects.js";

const previewProjects = getFeaturedProjects();

export function ProjectsPreview() {
  const [leadProject, ...supportingProjects] = previewProjects;

  return (
    <section className="section-band work-band" id="selected-work">
      <div className="section-inner">
        <div className="showcase-heading">
          <div>
            <p className="eyebrow">Selected engineering work</p>
            <h2>Systems built around real constraints.</h2>
          </div>
          <a className="button ghost" href="/projects">
            All projects
            <ArrowRight size={18} />
          </a>
        </div>
        <div className="work-showcase">
          <a className="work-feature" href={"/projects/" + leadProject.slug}>
            <div className="work-feature-media">
              <img src={leadProject.image} alt={leadProject.imageAlt} loading="lazy" />
              <span className="work-number">01</span>
            </div>
            <div className="work-feature-copy">
              <p className="project-category">{leadProject.category}</p>
              <h3>{leadProject.title}</h3>
              <p className="work-statement">{leadProject.homepage.statement}</p>
              <p className="work-summary">{leadProject.homepage.summary}</p>
              <div className="work-facts" aria-label="Project highlights">
                {leadProject.homepage.proof.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <span className="work-link">
                Read case study
                <ArrowUpRight size={18} />
              </span>
            </div>
          </a>
          <div className="work-teasers">
            {supportingProjects.map((project, index) => (
              <a className="work-teaser" href={"/projects/" + project.slug} key={project.slug}>
                <div className="work-teaser-meta">
                  <span>0{index + 2}</span>
                  <span>{project.category}</span>
                </div>
                <h3>{project.title}</h3>
                <p className="work-statement">{project.homepage.statement}</p>
                <p>{project.homepage.summary}</p>
                <span className="work-link" aria-hidden="true">
                  Explore project
                  <ArrowUpRight size={18} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
