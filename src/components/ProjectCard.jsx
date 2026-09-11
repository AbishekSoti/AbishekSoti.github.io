import { BookOpen, ExternalLink, Github } from "lucide-react";
import { isRealUrl } from "../data/projects.js";
import { ProjectVisual } from "./ProjectVisual.jsx";

function ProjectLink({ href, icon: Icon, children }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      <Icon size={17} />
      {children}
    </a>
  );
}

export function ProjectCard({ project, variant = "card" }) {
  const caseStudyHref = "/projects/" + project.slug;
  const mediaClassName = [
    "project-media",
    "project-media-" + project.categories[0],
    project.visual?.variant ? "project-media-" + project.visual.variant : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={"project-card " + (variant === "wide" ? "wide" : "")}>
      <div className={mediaClassName}>
        <ProjectVisual project={project} />
      </div>
      <div className="project-content">
        {project.featured ? (
          <p className="featured-label">Featured project</p>
        ) : null}
        <p className="project-category">{project.category}</p>
        <h3>{project.title}</h3>
        <p>
          <strong>Problem:</strong> {project.problem}
        </p>
        <p>
          <strong>Built:</strong> {project.built}
        </p>
        {project.outcome ? (
          <p className="project-impact">{project.outcome}</p>
        ) : null}
        <div className="tag-list" aria-label={project.title + " technologies"}>
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="card-links">
          {isRealUrl(project.links.demo) ? (
            <ProjectLink href={project.links.demo} icon={ExternalLink}>
              Live demo
            </ProjectLink>
          ) : null}
          {isRealUrl(project.links.code) ? (
            <ProjectLink href={project.links.code} icon={Github}>
              View code
            </ProjectLink>
          ) : null}
          <ProjectLink href={caseStudyHref} icon={BookOpen}>
            Case study
          </ProjectLink>
        </div>
      </div>
    </article>
  );
}
