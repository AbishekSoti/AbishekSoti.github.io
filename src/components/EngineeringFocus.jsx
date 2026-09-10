import { CheckCircle2 } from "lucide-react";
import { engineeringFocus } from "../data/career.js";

export function EngineeringFocus() {
  return (
    <section className="section-band" id="engineering-focus">
      <div className="section-inner split-section">
        <div>
          <p className="eyebrow">Engineering focus</p>
          <h2>{engineeringFocus.headline}</h2>
        </div>
        <div className="body-copy">
          <p>{engineeringFocus.objective}</p>
        </div>
      </div>
      <div className="section-inner focus-layout">
        <section className="focus-priorities">
          <p className="focus-kicker">What I optimise for</p>
          <ul className="focus-list">
            {engineeringFocus.currentPriorities.map((item) => (
              <li key={item}>
                <CheckCircle2 size={17} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
        <div className="focus-principles">
          {engineeringFocus.principles.map((principle) => (
            <article className="focus-principle" key={principle.number}>
              <span>{principle.number}</span>
              <div>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
