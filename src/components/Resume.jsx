import { Download } from "lucide-react";
import { profile } from "../data/profile.js";

export function Resume() {
  return (
    <section className="section-band resume-band" id="resume">
      <div className="section-inner resume-section">
        <div>
          <p className="eyebrow">Resume</p>
          <h2>Resume and research background.</h2>
          <p>
            Download the current resume for a concise view of research
            experience, education, machine learning projects, and technical
            skills.
          </p>
        </div>
        <a className="button primary" href={profile.resumeUrl} download>
          <Download size={18} />
          Download CV
        </a>
      </div>
    </section>
  );
}
