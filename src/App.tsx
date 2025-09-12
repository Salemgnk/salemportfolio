import ContactSection from "./components/ContactSection";
import HeroSection from "./components/HeroSection";
import NavBar from "./components/NavBar";
import ProjectSection from "./components/ProjectSection";
import Sidebar from "./components/Sidebar";
import TimelineSection from "./components/TimelineSection";
import ToolsSection from "./components/ToolSection";

function App() {

  return (
    <div className="relative">
      <Sidebar />
      <div className="transition-all duration-300">
        <NavBar />
        <HeroSection />
        <ToolsSection />
        <TimelineSection />
        <ProjectSection />
        <ContactSection />
      </div>
    </div>
  );
}

export default App
