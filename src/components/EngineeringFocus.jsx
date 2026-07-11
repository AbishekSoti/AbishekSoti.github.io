import { CheckCircle2, ShieldCheck } from "lucide-react";
import { engineeringFocus } from "../data/career.js";
import { profile } from "../data/profile.js";

function ListPanel({ title, items }) {
  return (
    <section className="focus-panel">
      <h3>{title}</h3>
      <ul className="focus-list">
        {items.map((item) => (
          <li key={item}>
            <CheckCircle2 size={17} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

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
          <p>{profile.objective}</p>
        </div>
      </div>
      <div className="section-inner focus-grid">
        <ListPanel title="Current production priorities" items={engineeringFocus.currentPriorities} />
        <ListPanel title="Portfolio proof points" items={engineeringFocus.portfolioProof} />
        <section className="focus-panel security-panel">
          <div className="security-title">
            <ShieldCheck size={22} />
            <h3>Public-safe portfolio</h3>
          </div>
          <ul className="focus-list">
            {engineeringFocus.publicSafety.map((item) => (
              <li key={item}>
                <CheckCircle2 size={17} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className="section-inner role-strip" aria-label="Target roles">
        {profile.targetRoles.map((role) => (
          <span key={role}>{role}</span>
        ))}
      </div>
    </section>
  );
}
