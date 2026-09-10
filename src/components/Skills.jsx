import { skillGroups } from "../data/skills.js";

export function Skills() {
  return (
    <section className="section-band" id="skills">
      <div className="section-inner">
        <div className="section-heading compact">
          <p className="eyebrow">Skills</p>
          <h2>Technical toolkit</h2>
        </div>
        <div className="skill-grid">
          {skillGroups.map((group) => (
            <section className="skill-group" key={group.title}>
              <h3>{group.title}</h3>
              {group.summary ? <p>{group.summary}</p> : null}
              <div className="tag-list">
                {group.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
