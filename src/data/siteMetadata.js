export const siteUrl = "https://abisheksoti.github.io";

export const defaultMetadata = {
  title: "Abishek Soti | Software Engineer & ML Engineer",
  description:
    "Software and machine-learning engineering across acoustic ML, computer vision, neuromorphic sensing and embedded inference.",
};

export const routeMetadata = {
  "/": defaultMetadata,
  "/projects": {
    title: "Projects | Abishek Soti",
    description:
      "Case studies across underwater acoustic classification, computer vision, neuromorphic sensing, embedded AI and software engineering.",
  },
  "/contact": {
    title: "Contact & Resume | Abishek Soti",
    description:
      "Contact Abishek Soti and view or download his current software and machine-learning engineering resume.",
  },
};

export function getProjectMetadata(project) {
  return {
    title: `${project.title} | Abishek Soti`,
    description: project.outcome || project.built,
  };
}
