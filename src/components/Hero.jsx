import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { getProjectBySlug } from "../data/projects.js";
import { profile } from "../data/profile.js";
import { ProjectVisual } from "./ProjectVisual.jsx";

const samplerItems = [
  {
    id: "acoustics",
    label: "Acoustics",
    project: getProjectBySlug("underwater-acoustic-vessel-classification"),
  },
  {
    id: "event-vision",
    label: "Event vision",
    project: getProjectBySlug("event-based-vision-neuromorphic-sensing"),
  },
  {
    id: "edge-inference",
    label: "Edge inference",
    project: getProjectBySlug("raspberry-pi-inference-deployment"),
  },
];

export function Hero() {
  const [activeId, setActiveId] = useState(samplerItems[0].id);
  const tabRefs = useRef([]);

  const selectTab = (index) => {
    const item = samplerItems[index];
    if (!item) return;
    setActiveId(item.id);
    tabRefs.current[index]?.focus();
  };

  const handleTabKeyDown = (event, index) => {
    let nextIndex;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % samplerItems.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + samplerItems.length) % samplerItems.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = samplerItems.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    selectTab(nextIndex);
  };

  return (
    <section className="hero section-band" id="top">
      <div className="section-inner hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{profile.role}</p>
          <h1>{profile.headline}</h1>
          <p className="hero-summary">{profile.summary}</p>
        </div>

        <div className="hero-sampler">
          <div
            className="hero-sampler-tabs"
            role="tablist"
            aria-label="Engineering project sampler"
          >
            {samplerItems.map((item, index) => {
              const isActive = item.id === activeId;

              return (
                <button
                  key={item.id}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  id={`hero-sampler-tab-${item.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`hero-sampler-panel-${item.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveId(item.id)}
                  onMouseEnter={() => setActiveId(item.id)}
                  onFocus={() => setActiveId(item.id)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="hero-sampler-stage">
            {samplerItems.map((item, index) => {
              const isActive = item.id === activeId;
              const { project } = item;

              return (
                <div
                  key={item.id}
                  id={`hero-sampler-panel-${item.id}`}
                  className={
                    "hero-sampler-panel hero-sampler-panel-" +
                    item.id +
                    (isActive ? " active" : "")
                  }
                  role="tabpanel"
                  aria-labelledby={`hero-sampler-tab-${item.id}`}
                  aria-hidden={!isActive}
                >
                  <a
                    className="hero-sampler-project"
                    href={`/projects/${project.slug}`}
                    tabIndex={isActive ? 0 : -1}
                    aria-label={`View the ${project.title} case study`}
                  >
                    <ProjectVisual
                      project={project}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                    <span className="hero-sampler-caption">
                      <span>
                        <span className="hero-sampler-domain">{item.label}</span>
                        <strong>{project.title}</strong>
                      </span>
                      <ArrowUpRight size={19} aria-hidden="true" />
                    </span>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
