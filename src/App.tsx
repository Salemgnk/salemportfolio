import ContactSection from "./components/ContactSection";
import HeroSection from "./components/HeroSection";
import NavBar from "./components/NavBar";
import ProjectSection from "./components/ProjectSection";
// import TimelineSection from "./components/TimelineSection";
import ToolsSection from "./components/ToolSection";

function App() {

  return (
    <div>
      <NavBar />
      <HeroSection />
      <ToolsSection />
      {/* <TimelineSection /> */}
      <ProjectSection />
      <ContactSection />
    </div>
  );
}

export default App
