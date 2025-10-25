import { useState, useEffect } from "react";
import { 
  FileText, 
  Mail, 
  Code, 
  Briefcase, 
  Clock, 
  Wrench, 
  Home,
  Terminal,
  Folder,
  ChevronRight,
  ChevronDown,
  Sun,
  Moon
} from "lucide-react";

interface SidebarFile {
  id: string;
  name: string;
  icon: React.ReactNode;
  type: 'file' | 'folder';
  children?: SidebarFile[];
  href?: string;
  isOpen?: boolean;
}

export default function Sidebar() {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['portfolio']));

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const files: SidebarFile[] = [
    {
      id: 'home',
      name: isDark ? 'home.exe' : 'home',
      icon: <Home size={16} />,
      type: 'file',
      href: '#home'
    },
    {
      id: 'portfolio',
      name: isDark ? 'portfolio/' : 'portfolio',
      icon: <Folder size={16} />,
      type: 'folder',
      isOpen: true,
      children: [
        {
          id: 'skills',
          name: isDark ? 'skills.dll' : 'skills',
          icon: <Wrench size={16} />,
          type: 'file',
          href: '#skills'
        },
        {
          id: 'projects',
          name: isDark ? 'projects.exe' : 'projects',
          icon: <Briefcase size={16} />,
          type: 'file',
          href: '#projects'
        },
        {
          id: 'timeline',
          name: isDark ? 'timeline.log' : 'timeline',
          icon: <Clock size={16} />,
          type: 'file',
          href: '#timeline'
        }
      ]
    },
    {
      id: 'contact',
      name: isDark ? 'contact.exe' : 'contact',
      icon: <Mail size={16} />,
      type: 'file',
      href: '#contact'
    }
  ];

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const handleFileClick = (file: SidebarFile) => {
    if (file.type === 'folder') {
      toggleFolder(file.id);
    } else if (file.href) {
      // Smooth scroll to section
      const element = document.querySelector(file.href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const renderFile = (file: SidebarFile, depth = 0) => {
    const isExpanded = expandedFolders.has(file.id);
    const isFolder = file.type === 'folder';
    
    return (
      <div key={file.id}>
        <div
          className={`
            flex items-center gap-2 px-3 py-2 cursor-pointer transition-all duration-200
            hover:bg-opacity-20 hover:scale-[1.02]
            ${isDark 
              ? 'retro-file text-gray-300 hover:text-green-400' 
              : 'hover:bg-blue-50 text-gray-700 hover:text-blue-600'
            }
            ${depth > 0 ? 'ml-4' : ''}
          `}
          onClick={() => handleFileClick(file)}
          style={{ paddingLeft: `${depth * 16 + 12}px` }}
        >
          {isFolder && (
            <div className="flex-shrink-0">
              {isExpanded ? (
                <ChevronDown size={12} className={isDark ? "text-green-400" : "text-blue-500"} />
              ) : (
                <ChevronRight size={12} className={isDark ? "text-gray-500" : "text-gray-400"} />
              )}
            </div>
          )}
          <div className={`flex-shrink-0 ${isDark ? 'text-green-400' : 'text-blue-600'}`}>
            {file.icon}
          </div>
          <span className={`text-sm truncate ${isDark ? 'font-mono' : 'font-sans'}`}>
            {file.name}
          </span>
          {file.type === 'file' && (
            <div className={`ml-auto w-2 h-2 rounded-full ${isDark ? 'bg-green-400' : 'bg-blue-600'} opacity-60`}></div>
          )}
        </div>
        
        {isFolder && isExpanded && file.children && (
          <div>
            {file.children.map(child => renderFile(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}
      
      <div className={`
        fixed left-0 top-0 h-full z-30 transition-all duration-300
        ${isCollapsed ? 'w-16' : 'w-64'}
        ${isDark 
          ? 'retro-sidebar' 
          : 'bg-white border-r-2 border-blue-200 shadow-xl'
        }
      `}>
        {/* Header */}
        <div className={`
          flex items-center justify-between p-4 border-b
          ${isDark ? 'border-green-400/20' : 'border-blue-200'}
        `}>
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              {isDark ? (
                <>
                  <Terminal size={20} className="text-green-400 animate-pulse" />
                  <span className="text-green-400 font-mono text-sm font-bold">
                    explorer.exe
                  </span>
                </>
              ) : (
                <>
                  <Code size={20} className="text-blue-600" />
                  <span className="text-blue-600 font-semibold text-sm">
                    Navigation
                  </span>
                </>
              )}
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`
              p-1 rounded transition-colors
              ${isDark 
                ? 'hover:bg-green-400/20 text-green-400' 
                : 'hover:bg-blue-100 text-blue-600'
              }
            `}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {/* File Tree */}
        <div className="p-2 space-y-1 overflow-y-auto h-[calc(100vh-140px)]">
          {!isCollapsed && (
            <div className="mb-4">
              <div className={`text-xs mb-2 px-2 ${isDark ? 'text-gray-500 font-mono' : 'text-gray-400 font-sans'}`}>
                {isDark ? 'C:\\Users\\Scorpi777\\Desktop\\' : 'Portfolio'}
              </div>
              {files.map(file => renderFile(file))}
            </div>
          )}
          
          {isCollapsed && (
            <div className="flex flex-col items-center space-y-4 py-4">
              {files.map(file => (
                <div
                  key={file.id}
                  className={`
                    p-2 rounded cursor-pointer transition-all duration-200
                    hover:scale-110
                    ${isDark 
                      ? 'hover:bg-green-400/20 text-green-400' 
                      : 'hover:bg-blue-100 text-blue-600'
                    }
                  `}
                  onClick={() => handleFileClick(file)}
                  title={file.name}
                >
                  {file.icon}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer avec toggle theme */}
        <div className={`
          absolute bottom-0 left-0 right-0 p-3 border-t
          ${isDark ? 'border-green-400/20 bg-gray-900/50' : 'border-blue-200 bg-gray-50'}
        `}>
          {!isCollapsed ? (
            <div className="flex items-center justify-between">
              <div className={`text-xs ${isDark ? 'text-gray-500 font-mono' : 'text-gray-400'}`}>
                {isDark ? (
                  <>
                    <span className="terminal-cursor">&gt;_{' '}</span>
                  </>
                ) : (
                  'Theme'
                )}
              </div>
              <button
                className={`relative p-2 rounded-full transition-all duration-500 hover:scale-110 group overflow-hidden ${
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
                    <Sun size={16} className="neon-cyan animate-pulse" />
                  ) : (
                    <Moon size={16} />
                  )}
                </div>
              </button>
            </div>
          ) : (
            <button
              className={`w-full p-2 rounded-full transition-all duration-500 hover:scale-110 ${
                isDark
                  ? "cyber-gradient glow-border-cyan"
                  : "bg-blue-100 text-blue-600 hover:bg-blue-200"
              }`}
              onClick={() => setIsDark(!isDark)}
            >
              {isDark ? (
                <Sun size={16} className="neon-cyan animate-pulse mx-auto" />
              ) : (
                <Moon size={16} className="mx-auto" />
              )}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
