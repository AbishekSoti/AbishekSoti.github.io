import { CheckCircle2 } from "lucide-react";
import { profile } from "../data/profile.js";

export function About() {
  return (
    <section className="section-band" id="about">
      <div className="section-inner split-section">
        <div>
          <p className="eyebrow">About</p>
          <h2>Engineering judgment for models that have to survive reality.</h2>
        </div>
        <div className="body-copy">
          <p>
            My strongest work sits where noisy physical signals become software
            decisions. I bring an electrical engineering background into machine
            learning problems that need more than a model: representation design,
            evaluation discipline, resource awareness and a path toward deployment.
          </p>
          <p>
            I am currently completing an MPhil in Machine Learning / Embedded AI
            at Western Sydney University, using research problems in underwater
            acoustics, event cameras and embedded inference to build practical
            engineering depth.
          </p>
          <p className="location">{profile.location}</p>
        </div>
      </div>
      <div className="section-inner credibility-strip" aria-label="Credibility highlights">
        {profile.credibility.map((item) => (
          <span key={item}>
            <CheckCircle2 size={16} />
            {item}
          </span>
        ))}
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
