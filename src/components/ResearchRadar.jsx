import { ArrowUpRight } from "lucide-react";
import {
  researchRadar,
  researchRadarUpdatedAt,
} from "../data/radar.js";

const dateFormatter = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function formatDate(value) {
  if (value == null || value === "") return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : dateFormatter.format(date);
}

export function ResearchRadar() {
  const updatedLabel = formatDate(researchRadarUpdatedAt);

  return (
    <section
      className="section-band radar-band"
      id="research-radar"
      aria-labelledby="research-radar-heading"
    >
      <div className="section-inner radar-layout">
        <header className="radar-intro">
          <p className="eyebrow">Reading &amp; ideas</p>
          <h2 id="research-radar-heading">Worth a closer look.</h2>
          <p>
            Recent engineering and research releases from sources I follow across
            software, ML systems, vision and acoustics.
          </p>
          {updatedLabel ? (
            <p className="radar-updated">Updated {updatedLabel}</p>
          ) : null}
        </header>
        <div className="radar-list">
          {researchRadar.map((item, index) => {
            const publishedLabel = formatDate(item.publishedAt);

            return (
              <a href={item.href} target="_blank" rel="noreferrer" key={item.id}>
                <span className="radar-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="radar-item-copy">
                  <span className="radar-topic">{item.topic}</span>
                  <strong>{item.title}</strong>
                  <span>{item.description}</span>
                  <span className="radar-source">
                    {item.source}
                    {publishedLabel ? ` · ${publishedLabel}` : ""}
                  </span>
                </span>
                <ArrowUpRight size={19} aria-hidden="true" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
