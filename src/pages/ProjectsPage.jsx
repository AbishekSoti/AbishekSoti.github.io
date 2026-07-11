import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { ProjectCard } from "../components/ProjectCard.jsx";
import { projectCategories, projects } from "../data/projects.js";

export function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const visibleProjects = useMemo(() => {
    if (activeCategory === "all") return projects;
    return projects.filter((project) => project.categories.includes(activeCategory));
  }, [activeCategory]);

  return (
    <section className="section-band page-hero">
      <div className="section-inner">
        <a className="back-link" href="/">
          <ArrowLeft size={17} />
          Home
        </a>
        <div className="section-heading projects-page-heading">
          <p className="eyebrow">Projects</p>
          <h1>Engineering breadth across audio, vision, edge AI and software.</h1>
          <p>
            Reusable project cards highlight the problem, what I built, technologies,
            verified outcomes where available, individual contribution and public links.
          </p>
        </div>
        <div className="filter-chips" aria-label="Project categories">
          {projectCategories.map((category) => (
            <button
              className={activeCategory === category.value ? "active" : undefined}
              key={category.value}
              type="button"
              onClick={() => setActiveCategory(category.value)}
            >
              {category.label}
            </button>
          ))}
        </div>
        <div className="project-list">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} variant="wide" />
          ))}
        </div>
      </div>
    </section>
  );
}
