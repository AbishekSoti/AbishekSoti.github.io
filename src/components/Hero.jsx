import { ArrowRight, Download, Linkedin } from "lucide-react";
import { isRealUrl } from "../data/projects.js";
import { profile } from "../data/profile.js";
import { ThreeBackdrop } from "./ThreeBackdrop.jsx";

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
      <ThreeBackdrop />
      <div className="section-inner hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{profile.role}</p>
          <h1>{profile.headline}</h1>
          <p className="hero-summary">{profile.summary}</p>
          <div className="button-row">
            <a className="button primary" href="#selected-work">
              Selected work
              <ArrowRight size={18} />
            </a>
            <a className="button ghost" href={profile.resumeUrl} download>
              <Download size={18} />
              Resume
            </a>
            <ExternalButton className="button ghost" href={profile.linkedinUrl}>
              <Linkedin size={18} />
              LinkedIn
            </ExternalButton>
          </div>
        </div>
      </div>
    </section>
  );
}
