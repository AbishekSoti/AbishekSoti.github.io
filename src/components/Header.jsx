import { useEffect, useState } from "react";
import { BookOpen, Github, Linkedin, Menu, X } from "lucide-react";
import { isRealUrl } from "../data/projects.js";
import { profile } from "../data/profile.js";
import { ThemeToggle } from "./ThemeToggle.jsx";

const navItems = [
  { label: "Work", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Approach", href: "/engineering" },
  { label: "Capabilities", href: "/skills" },
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

export function Header({ currentPath = "/", theme = "dark", onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [currentPath]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Go to home page">
        {profile.name}
      </a>
      <nav
        className={"nav-links" + (menuOpen ? " open" : "")}
        id="primary-navigation"
        aria-label="Primary navigation"
      >
        {navItems.map((item) => {
          const isActive =
            currentPath === item.href ||
            (item.href === "/projects" && currentPath.startsWith("/projects/"));

          return (
            <a
              key={item.href}
              className={isActive ? "active" : undefined}
              href={item.href}
              onClick={() => setMenuOpen(false)}
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
          <ExternalIconLink href={profile.scholarUrl} label="Google Scholar profile">
            <BookOpen size={19} />
          </ExternalIconLink>
        </div>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        <button
          className="mobile-menu-toggle"
          type="button"
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}
