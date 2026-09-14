import { profile } from "../data/profile.js";

export function Hero() {
  return (
    <section className="hero section-band" id="top">
      <div className="section-inner hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{profile.role}</p>
          <h1>{profile.headline}</h1>
          <p className="hero-summary">{profile.summary}</p>
        </div>

        <figure className="hero-portrait">
          <img
            src="/assets/me-2026.jpg"
            alt="Portrait of Abishek Soti"
            width="581"
            height="774"
            decoding="async"
            fetchPriority="high"
          />
          <figcaption>
            <span>{profile.name}</span>
            <span>{profile.location}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
