import { Cpu, Eye, Headphones, Server, TerminalSquare } from "lucide-react";
import { profile } from "../data/profile.js";

const icons = [Headphones, Eye, Cpu, Server, TerminalSquare];

export function AreasOfWork() {
  return (
    <section className="section-band areas-band" aria-labelledby="areas-heading">
      <div className="section-inner">
        <div className="section-heading compact">
          <p className="eyebrow">Areas of work</p>
          <h2 id="areas-heading">What the work is really about.</h2>
        </div>
        <div className="areas-grid">
          {profile.areasOfWork.map((area, index) => {
            const Icon = icons[index] || TerminalSquare;
            return (
              <article className="area-card" key={area.title}>
                <Icon size={23} />
                <div>
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
