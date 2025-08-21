import { useState, useEffect } from "react";
import { Terminal, Code, Sun, Moon } from "lucide-react";

export default function NavBar() {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  // Synchronise quand on toggle
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <nav
      className={`fixed top-0 w-full flex justify-between items-center px-8 py-4 z-50 backdrop-blur-sm transition-all duration-500 ${
        isDark
          ? "bg-gray-900/90 border-b border-green-400/20 shadow-lg shadow-green-400/5"
          : "bg-white/90 border-b border-gray-200 shadow-lg shadow-gray-200/50"
      }`}
    >
      {/* === Left : Logo === */}
      <div
        className={`text-2xl font-bold transition-all duration-500 flex items-center gap-2 ${
          isDark
            ? "font-mono text-green-400 tracking-wider"
            : "font-serif text-gray-800"
        }`}
      >
        {isDark ? (
          <>
            <Terminal className="animate-pulse" size={28} />
            <span className="relative">
              Scorpi777
              <span className="absolute -right-1 top-0 w-0.5 h-6 bg-green-400 animate-ping"></span>
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
          href="#about"
          className={`relative transition-all duration-300 hover:scale-105 group ${
            isDark ? "text-gray-300 hover:text-green-400" : "text-gray-700 hover:text-blue-600"
          }`}
        >
          {isDark ? "Profile" : "About"}
          <span
            className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
              isDark ? "bg-green-400" : "bg-blue-600"
            }`}
          ></span>
        </a>

        <a
          href="#skills"
          className={`relative transition-all duration-300 hover:scale-105 group ${
            isDark ? "text-gray-300 hover:text-green-400" : "text-gray-700 hover:text-blue-600"
          }`}
        >
          {isDark ? "Arsenal" : "Skills"}
          <span
            className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
              isDark ? "bg-green-400" : "bg-blue-600"
            }`}
          ></span>
        </a>

        <a
          href="#projects"
          className={`relative transition-all duration-300 hover:scale-105 group ${
            isDark ? "text-gray-300 hover:text-green-400" : "text-gray-700 hover:text-blue-600"
          }`}
        >
          {isDark ? "Exploits" : "Projects"}
          <span
            className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
              isDark ? "bg-green-400" : "bg-blue-600"
            }`}
          ></span>
        </a>

        <a
          href="#contact"
          className={`relative transition-all duration-300 hover:scale-105 group ${
            isDark ? "text-gray-300 hover:text-green-400" : "text-gray-700 hover:text-blue-600"
          }`}
        >
          Contact
          <span
            className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
              isDark ? "bg-green-400" : "bg-blue-600"
            }`}
          ></span>
        </a>
      </div>

      {/* === Right : Actions === */}
      <div className="flex items-center gap-4">
        {/* Menu mobile */}
        <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <div className={`w-6 h-0.5 mb-1 ${isDark ? "bg-green-400" : "bg-gray-600"}`}></div>
          <div className={`w-6 h-0.5 mb-1 ${isDark ? "bg-green-400" : "bg-gray-600"}`}></div>
          <div className={`w-6 h-0.5 ${isDark ? "bg-green-400" : "bg-gray-600"}`}></div>
        </button>

        {/* Toggle Theme */}
        <button
          className={`p-3 rounded-full transition-all duration-500 hover:scale-110 hover:rotate-12 ${
            isDark
              ? "bg-green-400/10 text-green-400 hover:bg-green-400/20 border border-green-400/30"
              : "bg-blue-100 text-blue-600 hover:bg-blue-200 border border-blue-200"
          }`}
          onClick={() => setIsDark(!isDark)}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav>
  );
}
