import { BookOpen, Github, Linkedin } from "lucide-react";
import { isRealUrl } from "../data/projects.js";
import { profile } from "../data/profile.js";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Focus", href: "/engineering" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

function ExternalIconLink({ href, label, children }) {
  if (!isRealUrl(href)) return null;
  return (
    <a href={href} aria-label={label} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

export function Header({ currentPath = "/" }) {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Go to home page">
        {profile.name}
      </a>
      <nav className="nav-links" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a
            key={item.href}
            className={currentPath === item.href ? "active" : undefined}
            href={item.href}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div className="social-links" aria-label="Social links">
        <ExternalIconLink href={profile.githubUrl} label="GitHub profile">
          <Github size={19} />
        </ExternalIconLink>
        <ExternalIconLink href={profile.linkedinUrl} label="LinkedIn profile">
          <Linkedin size={19} />
        </ExternalIconLink>
        <ExternalIconLink href={profile.scholarUrl} label="Google Scholar profile">
          <BookOpen size={19} />
        </ExternalIconLink>
      </div>
    </header>
  );
}
