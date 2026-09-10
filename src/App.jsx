import { useEffect, useState } from "react";
import { Footer } from "./components/Footer.jsx";
import { Header } from "./components/Header.jsx";
import { getProjectBySlug } from "./data/projects.js";
import { AboutPage } from "./pages/AboutPage.jsx";
import { ContactPage } from "./pages/ContactPage.jsx";
import { EngineeringPage } from "./pages/EngineeringPage.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { ProjectCaseStudyPage } from "./pages/ProjectCaseStudyPage.jsx";
import { ProjectsPage } from "./pages/ProjectsPage.jsx";
import { ResumePage } from "./pages/ResumePage.jsx";
import { SkillsPage } from "./pages/SkillsPage.jsx";

const routes = {
  "/": HomePage,
  "/about": AboutPage,
  "/projects": ProjectsPage,
  "/skills": SkillsPage,
  "/engineering": EngineeringPage,
  "/resume": ResumePage,
  "/contact": ContactPage,
};

function resolveRoute(pathname) {
  if (Object.hasOwn(routes, pathname)) {
    return { Page: routes[pathname], props: {} };
  }

  const projectMatch = pathname.match(/^\/projects\/([^/]+)$/);
  if (projectMatch) {
    const project = getProjectBySlug(projectMatch[1]);
    if (project) return { Page: ProjectCaseStudyPage, props: { project } };
  }

  return { Page: HomePage, props: {} };
}

function isInternalRoute(url) {
  if (url.origin !== window.location.origin) return false;
  if (url.pathname === "/") return true;
  return resolveRoute(url.pathname).Page !== HomePage;
}

function getInitialTheme() {
  try {
    return window.localStorage.getItem("portfolio-theme") === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [theme, setTheme] = useState(getInitialTheme);
  const { Page, props } = resolveRoute(currentPath);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem("portfolio-theme", theme);
    } catch {
      // Ignore storage failures; the theme still applies for this session.
    }
  }, [theme]);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);

    const handleLinkClick = (event) => {
      const link = event.target.closest("a");
      if (!link || event.defaultPrevented) return;
      if (link.target || link.hasAttribute("download")) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const url = new URL(link.href, window.location.origin);
      const isHashOnly = url.pathname === window.location.pathname && url.hash;
      if (isHashOnly || !isInternalRoute(url)) return;

      event.preventDefault();
      if (url.pathname !== window.location.pathname) {
        window.history.pushState({}, "", url.pathname);
        setCurrentPath(url.pathname);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    window.addEventListener("popstate", handlePopState);
    document.addEventListener("click", handleLinkClick);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("click", handleLinkClick);
    };
  }, []);

  return (
    <>
      <Header currentPath={currentPath} theme={theme} onToggleTheme={() => setTheme((value) => (value === "dark" ? "light" : "dark"))} />
      <main>
        <Page {...props} />
      </main>
      <Footer />
    </>
  );
}
