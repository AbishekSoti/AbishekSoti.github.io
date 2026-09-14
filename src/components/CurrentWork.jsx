import { ArrowUpRight } from "lucide-react";
import { currentWork } from "../data/projects.js";

export function CurrentWork() {
  return (
    <section
      className="section-band current-work-band"
      id="current-work"
      aria-labelledby="current-work-heading"
    >
      <div className="section-inner current-work-layout">
        <header className="current-work-intro">
          <p className="eyebrow">In progress</p>
          <h2 id="current-work-heading">Work in motion.</h2>
          <p>
            Active research is shown separately from completed results. Claims
            move into case studies only when the evidence is ready.
          </p>
        </header>

        <div className="current-work-list">
          {currentWork.map((project, index) => (
            <article className="current-work-item" key={project.id}>
              <div className="current-work-meta">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{project.status}</span>
              </div>
              <h3>{project.title}</h3>
              <p className="current-work-statement">{project.statement}</p>
              <p className="current-work-update">{project.update}</p>
              <ul className="current-work-areas" aria-label="Areas of work">
                {project.areas.map((area) => (
                  <li key={area}>{area}</li>
                ))}
              </ul>
              {project.href ? (
                <a className="text-link" href={project.href}>
                  {project.linkLabel}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
