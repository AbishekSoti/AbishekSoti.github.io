import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { ProjectVisual, ProjectVisualCredits } from "../components/ProjectVisual.jsx";
import { isRealUrl } from "../data/projects.js";

function Section({ title, children }) {
  if (children == null) return null;
  return (
    <section className="case-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function BulletList({ items }) {
  if (Array.isArray(items) === false || items.length === 0) return null;

  return (
    <ul className="case-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function ExternalButton({ href, icon: Icon, children }) {
  if (isRealUrl(href) === false) return null;
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
        <article className="case-hero">
          {project.image || project.visual?.images?.length ? (
            <figure
              className={
                "case-visual" +
                (project.visual?.variant === "research-figure"
                  ? " case-visual-light"
                  : "")
              }
            >
              <ProjectVisual project={project} loading="eager" />
              <ProjectVisualCredits project={project} />
            </figure>
          ) : null}
          <p className="eyebrow">Case study</p>
          <h1>{project.title}</h1>
          <p>{study?.overview || project.built}</p>
          <div className="case-scope">
            <span>Technical scope</span>
            <p>{project.tags.join(" · ")}</p>
          </div>
          <div className="button-row">
            <ExternalButton href={project.links.demo} icon={ExternalLink}>
              Live demo
            </ExternalButton>
            <ExternalButton href={project.links.code} icon={Github}>
              View code
            </ExternalButton>
          </div>
        </article>
        <div className="case-grid">
          <Section title="Problem">
            <p>{project.problem}</p>
          </Section>
          <Section title="My contribution">
            <p>{project.contribution}</p>
          </Section>
          <Section title="System delivered">
            <p>{project.built}</p>
          </Section>
          <Section title="Approach">
            <BulletList items={study?.approach} />
          </Section>
          <Section title="Architecture / workflow">
            <p>{study?.architecture}</p>
          </Section>
          <Section title="Verified result">
            <p>{study?.results || project.outcome}</p>
          </Section>
          <Section title="Engineering decisions">
            <BulletList items={study?.decisions} />
          </Section>
          <Section title="Limitations">
            <BulletList items={study?.limitations} />
          </Section>
        </div>
      </div>
    </section>
  );
}
