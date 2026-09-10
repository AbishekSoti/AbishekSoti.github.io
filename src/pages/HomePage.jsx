import { Contact } from "../components/Contact.jsx";
import { Hero } from "../components/Hero.jsx";
import { ProjectsPreview } from "../components/ProjectsPreview.jsx";
import { SignalPlayground } from "../components/SignalPlayground.jsx";

export function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <ProjectsPreview />
      <SignalPlayground />
      <Contact />
    </div>
  );
}
