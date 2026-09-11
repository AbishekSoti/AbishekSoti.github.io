import {
  ArrowUpRight,
  BookOpen,
  Download,
  FileText,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { isRealUrl } from "../data/projects.js";
import { profile } from "../data/profile.js";

const hasPublicEmail = profile.email && !profile.email.includes("example.com");

function ContactLinks({ includeResume = false }) {
  return (
    <div className="contact-links">
      {hasPublicEmail ? (
        <a className="contact-link" href={"mailto:" + profile.email}>
          <Mail size={18} />
          {profile.email}
        </a>
      ) : null}
      {isRealUrl(profile.linkedinUrl) ? (
        <a
          className="contact-link primary-contact"
          href={profile.linkedinUrl}
          target="_blank"
          rel="noreferrer"
        >
          <Linkedin size={18} />
          LinkedIn
          <ArrowUpRight size={16} />
        </a>
      ) : null}
      {isRealUrl(profile.githubUrl) ? (
        <a
          className="contact-link"
          href={profile.githubUrl}
          target="_blank"
          rel="noreferrer"
        >
          <Github size={18} />
          GitHub
          <ArrowUpRight size={16} />
        </a>
      ) : null}
      {includeResume ? (
        <a className="contact-link" href="/contact">
          <FileText size={18} />
          Contact &amp; resume
          <ArrowUpRight size={16} />
        </a>
      ) : null}
      {isRealUrl(profile.scholarUrl) ? (
        <a
          className="contact-link"
          href={profile.scholarUrl}
          target="_blank"
          rel="noreferrer"
        >
          <BookOpen size={18} />
          Google Scholar
          <ArrowUpRight size={16} />
        </a>
      ) : null}
    </div>
  );
}

export function Contact({ page = false }) {
  const Heading = page ? "h1" : "h2";
  const heading = page
    ? "Bring me the problem, the signal and the constraints."
    : "Looking for an engineer who connects model performance to the system around it?";

  const description = page
    ? "For engineering roles, research collaboration or a thoughtful technical conversation, LinkedIn is the most direct way to reach me. My current resume is available alongside it."
    : "I am open to software engineering, machine learning engineering and research engineering conversations across underwater acoustics, computer vision, neuromorphic sensing and embedded inference. LinkedIn is the most direct public contact path.";

  return (
    <section
      className={"section-band muted" + (page ? " contact-page-band" : "")}
      id="contact"
    >
      <div
        className={
          "section-inner contact-section" + (page ? " contact-page-section" : "")
        }
      >
        <div className="contact-copy">
          <p className="eyebrow">{page ? "Start a conversation" : "Contact"}</p>
          <Heading>{heading}</Heading>
          <p>{description}</p>
          {page ? <ContactLinks /> : null}
        </div>
        {page ? (
          <section className="inline-resume" id="resume" aria-labelledby="resume-heading">
            <div className="inline-resume-heading">
              <div>
                <p className="eyebrow">Resume</p>
                <h2 id="resume-heading">Current resume</h2>
              </div>
              <a className="button ghost" href={profile.resumeUrl} download>
                <Download size={18} />
                Download PDF
              </a>
            </div>
            <div className="resume-document">
              <object
                aria-label="Abishek Soti resume"
                data={profile.resumeUrl}
                type="application/pdf"
              >
                <p>
                  This browser cannot display the PDF preview.{" "}
                  <a href={profile.resumeUrl}>Open the resume.</a>
                </p>
              </object>
            </div>
          </section>
        ) : (
          <ContactLinks includeResume />
        )}
      </div>
    </section>
  );
}
