import { Github, Linkedin } from "lucide-react";
import { isRealUrl } from "../data/projects.js";
import { profile } from "../data/profile.js";
import { ThemeToggle } from "./ThemeToggle.jsx";

const navItems = [
  { label: "Work", href: "/#selected-work", activePath: "/" },
  { label: "About", href: "/about", activePath: "/about" },
  { label: "Contact", href: "/contact", activePath: "/contact" },
];

function ExternalIconLink({ href, label, children }) {
  if (!isRealUrl(href)) return null;
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

export function Header({ currentPath = "/", theme = "dark", onToggleTheme }) {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Go to home page">
        {profile.name}
      </a>
      <nav
        className="nav-links"
        id="primary-navigation"
        aria-label="Primary navigation"
      >
        {navItems.map((item) => {
          const isActive = currentPath === item.activePath;

          return (
            <a
              key={item.href}
              className={isActive ? "active" : undefined}
              href={item.href}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
      <div className="header-actions">
        <div className="social-links" aria-label="Social links">
          <ExternalIconLink href={profile.githubUrl} label="GitHub profile">
            <Github size={19} />
          </ExternalIconLink>
          <ExternalIconLink href={profile.linkedinUrl} label="LinkedIn profile">
            <Linkedin size={19} />
          </ExternalIconLink>
        </div>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  );
}
