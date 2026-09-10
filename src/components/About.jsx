import { profile } from "../data/profile.js";

export function About() {
  return (
    <section className="section-band" id="about">
      <div className="section-inner split-section">
        <div>
          <p className="eyebrow">About</p>
          <h2>From electrical signals to learning systems.</h2>
        </div>
        <div className="body-copy">
          <p>
            A circuit, sensor or recording always has a physical story behind its
            data. My electrical engineering background shapes how I approach machine
            learning: understand that story, preserve the useful structure and choose
            the simplest system that can make the right decision.
          </p>
          <p>
            I am currently completing an MPhil in Machine Learning / Embedded AI
            at Western Sydney University, where acoustic classification,
            event-based vision and embedded inference provide the test ground for
            that approach.
          </p>
          <p className="location">{profile.location}</p>
        </div>
      </div>
      <div className="section-inner timeline-grid">
        <section>
          <p className="eyebrow">Experience</p>
          {profile.experience.map((item) => (
            <article className="timeline-item" key={item.role}>
              <h3>{item.role}</h3>
              <p className="timeline-meta">
                {item.organization} | {item.period}
              </p>
              <p>{item.summary}</p>
            </article>
          ))}
        </section>
        <section>
          <p className="eyebrow">Education</p>
          {profile.education.map((item) => (
            <article className="timeline-item" key={item.degree}>
              <h3>{item.degree}</h3>
              <p className="timeline-meta">
                {item.institution} | {item.period}
              </p>
              <p>{item.details}</p>
            </article>
          ))}
        </section>
      </div>
    </section>
  );
}
