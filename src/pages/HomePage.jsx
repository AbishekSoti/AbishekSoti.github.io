import { Contact } from "../components/Contact.jsx";
import { Hero } from "../components/Hero.jsx";
import { ProjectsPreview } from "../components/ProjectsPreview.jsx";
import { ResearchRadar } from "../components/ResearchRadar.jsx";

export function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <ProjectsPreview />
      <ResearchRadar />
      <Contact />
    </div>
  );
}
