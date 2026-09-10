import { Fragment } from "react";

function getImages(project) {
  if (project.visual?.images?.length) return project.visual.images;
  if (!project.image) return [];

  return [{ src: project.image, alt: project.imageAlt || project.title + " project visual" }];
}

export function ProjectVisual({ project, loading = "lazy" }) {
  const images = getImages(project);
  const variant = project.visual?.variant || "single";

  if (!images.length) return <span>{project.category}</span>;

  return (
    <div className={"project-visual project-visual-" + variant}>
      {images.map((image) => (
        <div className="project-visual-frame" key={image.src}>
          <img src={image.src} alt={image.alt || ""} loading={loading} />
          {image.label ? <span className="project-visual-label">{image.label}</span> : null}
        </div>
      ))}
    </div>
  );
}

export function ProjectVisualCredits({ project }) {
  const credits = project.visual?.credits;
  if (!credits?.length) return null;

  return (
    <figcaption className="visual-credit">
      <span>Visual source:</span>{" "}
      {credits.map((credit, index) => (
        <Fragment key={credit.href}>
          {index > 0 ? <span aria-hidden="true"> / </span> : null}
          <a href={credit.href} target="_blank" rel="noreferrer">{credit.name}</a>
          {credit.license ? (
            <>
              {" · "}
              <a href={credit.licenseHref} target="_blank" rel="noreferrer">{credit.license}</a>
            </>
          ) : null}
        </Fragment>
      ))}
    </figcaption>
  );
}
