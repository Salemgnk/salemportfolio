import { useState, useEffect } from "react";
import { Terminal, Code, Sun, Moon } from "lucide-react";


export default function NavBar() {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <nav
      className={`fixed top-0 w-full flex justify-between items-center px-8 py-4 z-50 backdrop-blur-md transition-all duration-500 ${
        isDark
          ? "cyber-gradient border-b glow-border-cyan shadow-2xl"
          : "bg-white/90 border-b border-gray-200 shadow-lg shadow-gray-200/50"
      }`}
    >
      {/* === Left : Logo === */}
      <div
        className={`text-2xl font-bold transition-all duration-500 flex items-center gap-2 ${
          isDark
            ? "font-mono neon-cyan tracking-wider"
            : "font-serif text-gray-800"
        }`}
      >
        {isDark ? (
          <>
            <Terminal className="animate-pulse drop-shadow-[0_0_10px_oklch(0.85_0.2_200)]" size={28} />
            <span className="relative">
              Scorpi777
              <span className="absolute -right-1 top-0 w-1 h-6 bg-[oklch(0.85_0.2_200)] animate-ping shadow-[0_0_10px_oklch(0.85_0.2_200)]"></span>
            </span>
          </>
        ) : (
          <>
            <Code className="text-blue-600" size={28} />
            Salem GNANDI
          </>
        )}
      </div>

      {/* === Middle : Menu === */}
      <div className="hidden md:flex items-center gap-6">
        <a
          href="#skills"
          className={`relative transition-all duration-300 hover:scale-105 group ${
            isDark ? "neon-cyan" : "text-gray-700 hover:text-blue-600"
          }`}
        >
          {isDark ? "Arsenal" : "Skills"}
          <span
            className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
              isDark ? "bg-[oklch(0.85_0.2_200)] shadow-[0_0_5px_oklch(0.85_0.2_200)]" : "bg-blue-600"
            }`}
          ></span>
        </a>

        <a
          href="#projects"
          className={`relative transition-all duration-300 hover:scale-105 group ${
            isDark ? "neon-pink" : "text-gray-700 hover:text-blue-600"
          }`}
        >
          {isDark ? "Exploits" : "Projects"}
          <span
            className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
              isDark ? "bg-[oklch(0.75_0.25_340)] shadow-[0_0_5px_oklch(0.75_0.25_340)]" : "bg-blue-600"
            }`}
          ></span>
        </a>

        <a
          href="#contact"
          className={`relative transition-all duration-300 hover:scale-105 group ${
            isDark ? "neon-green" : "text-gray-700 hover:text-blue-600"
          }`}
        >
          Contact
          <span
            className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
              isDark ? "bg-[oklch(0.8_0.25_150)] shadow-[0_0_5px_oklch(0.8_0.25_150)]" : "bg-blue-600"
            }`}
          ></span>
        </a>
      </div>

      {/* === Right : Actions === */}
      <div className="flex items-center gap-4">
        {/* Menu mobile */}
        <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <div className={`w-6 h-0.5 mb-1 ${isDark ? "bg-[oklch(0.85_0.2_200)] shadow-[0_0_5px_oklch(0.85_0.2_200)]" : "bg-gray-600"}`}></div>
          <div className={`w-6 h-0.5 mb-1 ${isDark ? "bg-[oklch(0.75_0.25_340)] shadow-[0_0_5px_oklch(0.75_0.25_340)]" : "bg-gray-600"}`}></div>
          <div className={`w-6 h-0.5 ${isDark ? "bg-[oklch(0.8_0.25_150)] shadow-[0_0_5px_oklch(0.8_0.25_150)]" : "bg-gray-600"}`}></div>
        </button>

        {/* Toggle Theme - Enhanced */}
        <button
          className={`relative p-3 rounded-full transition-all duration-500 hover:scale-110 group overflow-hidden ${
            isDark
              ? "cyber-gradient glow-border-cyan"
              : "bg-blue-100 text-blue-600 hover:bg-blue-200 border border-blue-200"
          }`}
          onClick={() => setIsDark(!isDark)}
        >
          {isDark && (
            <div className="absolute inset-0 holographic opacity-20"></div>
          )}
          <div className="relative z-10">
            {isDark ? (
              <Sun size={20} className="neon-cyan animate-pulse" />
            ) : (
              <Moon size={20} />
            )}
          </div>
        </button>
      </div>
    </nav>
  );
}
