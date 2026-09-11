import { useEffect, useState } from "react";
import { Footer } from "./components/Footer.jsx";
import { Header } from "./components/Header.jsx";
import { getProjectBySlug } from "./data/projects.js";
import {
  defaultMetadata,
  getProjectMetadata,
  routeMetadata,
  siteUrl,
} from "./data/siteMetadata.js";
import { ContactPage } from "./pages/ContactPage.jsx";
import { AboutPage } from "./pages/AboutPage.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { ProjectCaseStudyPage } from "./pages/ProjectCaseStudyPage.jsx";
import { ProjectsPage } from "./pages/ProjectsPage.jsx";

const routes = {
  "/": HomePage,
  "/about": AboutPage,
  "/projects": ProjectsPage,
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

function setMetaContent(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.setAttribute("content", value);
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [theme, setTheme] = useState(getInitialTheme);
  const { Page, props } = resolveRoute(currentPath);
  const metadata = props.project
    ? getProjectMetadata(props.project)
    : routeMetadata[currentPath] ?? defaultMetadata;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem("portfolio-theme", theme);
    } catch {
      // Ignore storage failures; the theme still applies for this session.
    }
  }, [theme]);

  useEffect(() => {
    const url = new URL(currentPath, siteUrl).href;
    document.title = metadata.title;
    setMetaContent('meta[name="description"]', metadata.description);
    setMetaContent('meta[property="og:title"]', metadata.title);
    setMetaContent('meta[property="og:description"]', metadata.description);
    setMetaContent('meta[property="og:url"]', url);
    setMetaContent('meta[name="twitter:title"]', metadata.title);
    setMetaContent('meta[name="twitter:description"]', metadata.description);

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", url);
  }, [currentPath, metadata.description, metadata.title]);

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
        const destination = url.pathname + url.search + url.hash;
        const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth";

        window.history.pushState({}, "", destination);
        setCurrentPath(url.pathname);

        if (url.hash) {
          window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
              document.querySelector(url.hash)?.scrollIntoView({ behavior });
            });
          });
        } else {
          window.scrollTo({ top: 0, behavior });
        }
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
      <Header
        currentPath={currentPath}
        theme={theme}
        onToggleTheme={() =>
          setTheme((value) => (value === "dark" ? "light" : "dark"))
        }
      />
      <main>
        <Page {...props} />
      </main>
      <Footer />
    </>
  );
}
