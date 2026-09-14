import { Contact } from "../components/Contact.jsx";
import { CurrentWork } from "../components/CurrentWork.jsx";
import { Hero } from "../components/Hero.jsx";
import { ProjectsPreview } from "../components/ProjectsPreview.jsx";
import { ReadingShelf } from "../components/ReadingShelf.jsx";
import { ResearchRadar } from "../components/ResearchRadar.jsx";

export function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <CurrentWork />
      <ProjectsPreview />
      <ReadingShelf />
      <ResearchRadar />
      <Contact />
    </div>
  );
}
