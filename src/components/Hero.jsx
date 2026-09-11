import { FileText, Github } from "lucide-react";
import { isRealUrl } from "../data/projects.js";
import { profile } from "../data/profile.js";

function ExternalButton({ href, className, children }) {
  if (isRealUrl(href) === false) return null;
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

const evidence = [
  {
    value: "≈99.1%",
    label: "ShipsEar classification with a compact two-layer CNN",
  },
  {
    value: "Event-native vision",
    label: "Asynchronous sensing, characterisation and compression workflows",
  },
  {
    value: "Edge validation",
    label: "Raspberry Pi inference with system-resource monitoring",
  },
];

export function Hero() {
  return (
    <section className="hero section-band" id="top">
      <div className="section-inner hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{profile.role}</p>
          <h1>{profile.headline}</h1>
          <p className="hero-summary">{profile.summary}</p>
          <div className="button-row">
            <ExternalButton className="button ghost" href={profile.githubUrl}>
              <Github size={18} />
              GitHub
            </ExternalButton>
            <a className="button ghost" href="/contact">
              <FileText size={18} />
              Contact &amp; resume
            </a>
          </div>
        </div>
        <dl className="hero-evidence" aria-label="Selected engineering evidence">
          {evidence.map((item) => (
            <div key={item.value}>
              <dt>{item.value}</dt>
              <dd>{item.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
