import { ArrowUpRight } from "lucide-react";
import { skillGroups } from "../data/skills.js";

export function Skills() {
  return (
    <section className="section-band" id="skills">
      <div className="section-inner">
        <div className="section-heading">
          <p className="eyebrow">Capabilities</p>
          <h2>Demonstrated in the work.</h2>
          <p className="section-intro">
            The tools matter when they support a decision: extracting a stronger
            signal, testing a claim, reducing a model or making inference work on
            the target system.
          </p>
        </div>
        <div className="skill-grid">
          {skillGroups.map((group) => (
            <section className="skill-group" key={group.title}>
              <h3>{group.title}</h3>
              <p>{group.summary}</p>
              <ul className="capability-list">
                {group.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
              <div className="capability-evidence" aria-label={group.title + " evidence"}>
                <span>Evidence</span>
                {group.evidence.map((item) => (
                  <a href={item.href} key={item.href}>
                    {item.label}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
