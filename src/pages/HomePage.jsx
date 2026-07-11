import { AreasOfWork } from "../components/AreasOfWork.jsx";
import { Hero } from "../components/Hero.jsx";
import { ProjectsPreview } from "../components/ProjectsPreview.jsx";
import { SectionDirectory } from "../components/SectionDirectory.jsx";

export function HomePage() {
  return (
    <>
      <Hero />
      <AreasOfWork />
      <ProjectsPreview />
      <SectionDirectory />
    </>
  );
}
