import React from "react";
import { Terminal, Code } from "lucide-react";

export default function NavBar() {
  const isDark = document.documentElement.classList.contains('dark');

    return (
      <nav className={`fixed top-0 w-full flex justify-between items-center px-8 py-4 z-50 backdrop-blur-sm transition-all duration-500 ${
        isDark
        ? "bg-gray-900/90 border-b border-green-400/20 shadow-lg shadow-green-400/5"
        : "bg-white/90 border-b border-gray-200 shadow-lg shadow-gray-200/50"
      }`}>
      
      <div className={`text-2xl font-bold transition-all duration-500 ${
        isDark
        ? "font-mono text-green-400 tracker-wider flex items-center gap-2"
        : "font-serif text-gray-800 flex items-center gap-2"
      }`}>
        {
          isDark ?
          (
            <>
              <Terminal className="animate-pulse" size={28} />
              <span className="relative">
                Scorpi777
                <span className="absolute -right-1 top-0 w-0.5 h-6 bg-green-400 animate-ping"></span>
              </span>
            </>
          )
          :
          (
            <>
              <Code className="text-blue-600" size={28} />
              Salem GNANDI
            </>
          )
        }
      </div>
          
      
      </nav>
  );
}
