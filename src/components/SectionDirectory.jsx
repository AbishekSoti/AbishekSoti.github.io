import { ArrowRight, FileText, FolderKanban, Mail, Rocket, UserRound, Wrench } from "lucide-react";

const sections = [
  {
    title: "About",
    href: "/about",
    icon: UserRound,
    description: "Research background, education, and current MPhil work.",
  },
  {
    title: "Projects",
    href: "/projects",
    icon: FolderKanban,
    description: "Featured acoustic ML, neuromorphic vision, and engineering projects.",
  },
  {
    title: "Skills",
    href: "/skills",
    icon: Wrench,
    description: "ML, Python, data, embedded AI, and production engineering skills.",
  },
  {
    title: "Engineering Focus",
    href: "/engineering",
    icon: Rocket,
    description: "Current production ML priorities, roadmap, and public-safe portfolio posture.",
  },
  {
    title: "Resume",
    href: "/resume",
    icon: FileText,
    description: "Downloadable CV and research-facing summary.",
  },
  {
    title: "Contact",
    href: "/contact",
    icon: Mail,
    description: "GitHub, LinkedIn, Scholar, and email links.",
  },
];

export function SectionDirectory() {
  return (
    <section className="section-band" id="site-sections">
      <div className="section-inner">
        <div className="section-heading compact">
          <p className="eyebrow">Explore</p>
          <h2>Portfolio sections</h2>
        </div>
        <div className="directory-grid">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <a className="directory-card" href={section.href} key={section.title}>
                <span className="directory-icon">
                  <Icon size={22} />
                </span>
                <span>
                  <strong>{section.title}</strong>
                  <small>{section.description}</small>
                </span>
                <ArrowRight className="directory-arrow" size={18} />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
