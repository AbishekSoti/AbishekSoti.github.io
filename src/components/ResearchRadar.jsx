import { ArrowUpRight } from "lucide-react";
import { researchRadar } from "../data/radar.js";

export function ResearchRadar() {
  return (
    <section className="section-band radar-band" id="research-radar" aria-labelledby="research-radar-heading">
      <div className="section-inner radar-layout">
        <header className="radar-intro">
          <p className="eyebrow">Research radar</p>
          <h2 id="research-radar-heading">The tabs I keep open.</h2>
          <p>
            Primary sources I use to follow useful software, practical ML systems
            and new work in audio research.
          </p>
        </header>
        <div className="radar-list">
          {researchRadar.map((item, index) => (
            <a href={item.href} target="_blank" rel="noreferrer" key={item.source}>
              <span className="radar-index">0{index + 1}</span>
              <span className="radar-item-copy">
                <span className="radar-topic">{item.topic}</span>
                <strong>{item.source}</strong>
                <span>{item.description}</span>
              </span>
              <ArrowUpRight size={19} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
