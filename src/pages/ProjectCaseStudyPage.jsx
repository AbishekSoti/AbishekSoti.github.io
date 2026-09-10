import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { isRealUrl } from "../data/projects.js";
import { ProjectVisual, ProjectVisualCredits } from "../components/ProjectVisual.jsx";

function Section({ title, children }) {
  if (!children) return null;
  return (
    <section className="case-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function BulletList({ items }) {
  if (!items?.length) return null;
  return (
    <ul className="case-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function ExternalButton({ href, icon: Icon, children }) {
  if (!isRealUrl(href)) return null;
  return (
    <a className="button ghost" href={href} target="_blank" rel="noreferrer">
      <Icon size={18} />
      {children}
    </a>
  );
}

export function ProjectCaseStudyPage({ project }) {
  const study = project.caseStudy;

  return (
    <section className="section-band page-hero case-page">
      <div className="section-inner">
        <a className="back-link" href="/projects">
          <ArrowLeft size={17} />
          Projects
        </a>
        <div className="case-hero">
          {project.image || project.visual?.images?.length ? (
            <figure className="case-visual">
              <ProjectVisual project={project} loading="eager" />
              <ProjectVisualCredits project={project} />
            </figure>
          ) : null}
          <p className="eyebrow">Case study</p>
          <h1>{project.title}</h1>
          <p>{study?.overview || project.built}</p>
          <div className="tag-list">
            {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <div className="button-row">
            <ExternalButton href={project.links.demo} icon={ExternalLink}>Live Demo</ExternalButton>
            <ExternalButton href={project.links.code} icon={Github}>View Code</ExternalButton>
          </div>
        </div>
        <div className="case-grid">
          <Section title="Problem"><p>{project.problem}</p></Section>
          <Section title="What I Built"><p>{project.built}</p></Section>
          <Section title="Approach"><BulletList items={study?.approach} /></Section>
          <Section title="Architecture / Workflow"><p>{study?.architecture}</p></Section>
          <Section title="Results"><p>{study?.results || project.outcome}</p></Section>
          <Section title="Engineering Decisions"><BulletList items={study?.decisions} /></Section>
          <Section title="Limitations"><BulletList items={study?.limitations} /></Section>
        </div>
      </div>
    </section>
  );
}
