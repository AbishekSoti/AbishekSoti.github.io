import { ArrowDown, BookOpen, Download, Github, Linkedin } from "lucide-react";
import { isRealUrl } from "../data/projects.js";
import { profile } from "../data/profile.js";

function ExternalButton({ href, className, children }) {
  if (!isRealUrl(href)) return null;
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

export function Hero() {
  return (
    <section className="hero section-band" id="top">
      <div className="section-inner hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{profile.role}</p>
          <h1>{profile.headline}</h1>
          <p className="hero-summary">{profile.summary}</p>
          <div className="button-row">
            <ExternalButton className="button primary" href={profile.githubUrl}>
              <Github size={18} />
              GitHub
            </ExternalButton>
            <ExternalButton className="button secondary" href={profile.linkedinUrl}>
              <Linkedin size={18} />
              LinkedIn
            </ExternalButton>
            <a className="button ghost" href={profile.resumeUrl} download>
              <Download size={18} />
              Resume
            </a>
            <ExternalButton className="button ghost" href={profile.scholarUrl}>
              <BookOpen size={18} />
              Scholar
            </ExternalButton>
          </div>
        </div>
        <div className="hero-panel" aria-label="Portfolio highlights">
          <div>
            <span className="metric">Audio</span>
            <span className="metric-label">Signal intelligence</span>
          </div>
          <div>
            <span className="metric">Vision</span>
            <span className="metric-label">PyTorch models</span>
          </div>
          <div>
            <span className="metric">Edge</span>
            <span className="metric-label">Embedded AI</span>
          </div>
        </div>
      </div>
      <a className="scroll-cue" href="/about" aria-label="Go to about page">
        <ArrowDown size={18} />
      </a>
    </section>
  );
}
