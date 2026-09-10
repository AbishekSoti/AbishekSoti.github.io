import { ArrowUpRight, BookOpen, Download, Mail, Github, Linkedin } from "lucide-react";
import { isRealUrl } from "../data/projects.js";
import { profile } from "../data/profile.js";

const hasPublicEmail = profile.email && !profile.email.includes("example.com");

export function Contact({ page = false }) {
  const heading = page
    ? "Bring me the problem, the signal and the constraints."
    : "Looking for an engineer who connects model performance to the system around it?";

  const description = page
    ? "For engineering roles, research collaboration or a thoughtful technical conversation, LinkedIn is the most direct way to reach me. You can also review my code and current resume below."
    : "I am open to software engineering, machine learning engineering and research engineering conversations across underwater acoustics, computer vision, neuromorphic sensing and embedded inference. LinkedIn is the most direct public contact path.";

  return (
    <section className="section-band muted" id="contact">
      <div className="section-inner contact-section">
        <div>
          <p className="eyebrow">{page ? "Start a conversation" : "Contact"}</p>
          <h2>{heading}</h2>
          <p>{description}</p>
        </div>
        <div className="contact-links">
          {hasPublicEmail ? (
            <a className="contact-link" href={"mailto:" + profile.email}>
              <Mail size={18} />
              {profile.email}
            </a>
          ) : null}
          {isRealUrl(profile.linkedinUrl) ? (
            <a className="contact-link primary-contact" href={profile.linkedinUrl} target="_blank" rel="noreferrer">
              <Linkedin size={18} />
              LinkedIn
              <ArrowUpRight size={16} />
            </a>
          ) : null}
          {isRealUrl(profile.githubUrl) ? (
            <a className="contact-link" href={profile.githubUrl} target="_blank" rel="noreferrer">
              <Github size={18} />
              GitHub
              <ArrowUpRight size={16} />
            </a>
          ) : null}
          <a className="contact-link" href={profile.resumeUrl} download>
            <Download size={18} />
            Resume
          </a>
          {isRealUrl(profile.scholarUrl) ? (
            <a className="contact-link" href={profile.scholarUrl} target="_blank" rel="noreferrer">
              <BookOpen size={18} />
              Google Scholar
              <ArrowUpRight size={16} />
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
