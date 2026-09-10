import { BookOpen, Mail, Github, Linkedin } from "lucide-react";
import { isRealUrl } from "../data/projects.js";
import { profile } from "../data/profile.js";

const hasPublicEmail = profile.email && !profile.email.includes("example.com");

export function Contact() {
  return (
    <section className="section-band muted" id="contact">
      <div className="section-inner contact-section">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Open to software engineering, ML engineering, research engineering and edge AI roles.</h2>
          <p>I am interested in teams building reliable ML systems across audio, computer vision, embedded AI, research tooling and Python backend infrastructure. The best public contact path right now is LinkedIn; GitHub is available for code and project context.</p>
        </div>
        <div className="contact-links">
          {hasPublicEmail ? (
            <a href={`mailto:${profile.email}`}>
              <Mail size={18} />
              {profile.email}
            </a>
          ) : null}
          {isRealUrl(profile.githubUrl) ? (
            <a href={profile.githubUrl} target="_blank" rel="noreferrer">
              <Github size={18} />
              GitHub
            </a>
          ) : null}
          {isRealUrl(profile.linkedinUrl) ? (
            <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">
              <Linkedin size={18} />
              LinkedIn
            </a>
          ) : null}
          {isRealUrl(profile.scholarUrl) ? (
            <a href={profile.scholarUrl} target="_blank" rel="noreferrer">
              <BookOpen size={18} />
              Google Scholar
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
