import { Cpu, Eye, Headphones, Server, TerminalSquare } from "lucide-react";
import { profile } from "../data/profile.js";

const icons = [Headphones, Eye, Cpu, Server, TerminalSquare];

export function AreasOfWork() {
  return (
    <section className="section-band areas-band" aria-labelledby="areas-heading">
      <div className="section-inner">
        <div className="section-heading compact">
          <p className="eyebrow">Areas of work</p>
          <h2 id="areas-heading">Applied engineering across ML systems.</h2>
        </div>
        <div className="areas-grid">
          {profile.areasOfWork.map((area, index) => {
            const Icon = icons[index] || TerminalSquare;
            return (
              <article className="area-card" key={area}>
                <Icon size={23} />
                <h3>{area}</h3>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
