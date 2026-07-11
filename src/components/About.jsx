import { CheckCircle2 } from "lucide-react";
import { profile } from "../data/profile.js";

export function About() {
  return (
    <section className="section-band" id="about">
      <div className="section-inner split-section">
        <div>
          <p className="eyebrow">About</p>
          <h2>Software engineering depth with research-grade ML problems.</h2>
        </div>
        <div className="body-copy">
          <p>
            I am a software and machine learning engineer with an electrical
            engineering background, currently completing an MPhil in Machine
            Learning / Embedded AI at Western Sydney University. My work spans
            Python systems, PyTorch, acoustic ML, computer vision, event cameras,
            neuromorphic sensing and embedded inference.
          </p>
          <p>
            Research gives me harder problems to engineer around: careful
            evaluation, reproducible experiments, resource constraints, privacy
            boundaries and clear technical communication.
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
