import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { profile } from "../data/profile.js";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-identity">
        <strong>{profile.name}</strong>
        <span>{profile.location}</span>
      </div>
      <div className="footer-links">
        <a href={profile.githubUrl} target="_blank" rel="noreferrer">
          <Github size={16} />
          GitHub
          <ArrowUpRight size={14} />
        </a>
        <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">
          <Linkedin size={16} />
          LinkedIn
          <ArrowUpRight size={14} />
        </a>
        <a href="/contact">
          Contact &amp; resume
        </a>
      </div>
    </footer>
  );
}
