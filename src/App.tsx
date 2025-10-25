import { useEffect, useState } from "react";
import ContactSection from "./components/ContactSection";
import HeroSection from "./components/HeroSection";
import ProjectSection from "./components/ProjectSection";
import Sidebar from "./components/Sidebar";
import TimelineSection from "./components/TimelineSection";
import ToolsSection from "./components/ToolSection";

function App() {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains('dark')
  );
  const [sidebarWidth, setSidebarWidth] = useState(64); // 16 * 4 = 64px (w-16)

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const newIsDark = document.documentElement.classList.contains('dark');
          setIsDark(newIsDark);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      {/* Effet Matrix global en mode sombre */}
      {isDark && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-green-400/30 font-mono text-sm"
              style={{
                left: `${Math.random() * 100}%`,
                animation: `matrix-fall ${3 + Math.random() * 3}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
                top: '-100px'
              }}
            >
              {String.fromCharCode(0x30A0 + Math.random() * 96)}
            </div>
          ))}
        </div>
      )}
      
      <Sidebar onWidthChange={setSidebarWidth} />
      <div 
        className="transition-all duration-300 relative z-10"
        style={{ marginLeft: `${sidebarWidth}px` }}
      >
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
