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
  File,
  ChevronRight,
  ChevronDown,
  Settings,
  Database,
  Image,
  Archive
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
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['portfolio', 'system']));

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
      name: 'home.exe',
      icon: <Home size={16} />,
      type: 'file',
      href: '#home'
    },
    {
      id: 'portfolio',
      name: 'portfolio/',
      icon: <Folder size={16} />,
      type: 'folder',
      isOpen: true,
      children: [
        {
          id: 'about',
          name: 'about.json',
          icon: <FileText size={16} />,
          type: 'file',
          href: '#about'
        },
        {
          id: 'projects',
          name: 'projects.exe',
          icon: <Briefcase size={16} />,
          type: 'file',
          href: '#projects'
        },
        {
          id: 'timeline',
          name: 'timeline.log',
          icon: <Clock size={16} />,
          type: 'file',
          href: '#timeline'
        },
        {
          id: 'resume',
          name: 'resume.pdf',
          icon: <FileText size={16} />,
          type: 'file',
          href: '#resume'
        }
      ]
    },
    {
      id: 'system',
      name: 'system/',
      icon: <Terminal size={16} />,
      type: 'folder',
      isOpen: true,
      children: [
        {
          id: 'skills',
          name: 'skills.dll',
          icon: <Wrench size={16} />,
          type: 'file',
          href: '#skills'
        },
        {
          id: 'tools',
          name: 'tools.config',
          icon: <Code size={16} />,
          type: 'file',
          href: '#tools'
        },
        {
          id: 'database',
          name: 'database.sql',
          icon: <Database size={16} />,
          type: 'file',
          href: '#database'
        }
      ]
    },
    {
      id: 'assets',
      name: 'assets/',
      icon: <Folder size={16} />,
      type: 'folder',
      isOpen: false,
      children: [
        {
          id: 'images',
          name: 'images/',
          icon: <Folder size={16} />,
          type: 'folder',
          children: [
            {
              id: 'avatar',
              name: 'avatar.png',
              icon: <Image size={16} />,
              type: 'file',
              href: '#avatar'
            }
          ]
        },
        {
          id: 'downloads',
          name: 'downloads.zip',
          icon: <Archive size={16} />,
          type: 'file',
          href: '#downloads'
        }
      ]
    },
    {
      id: 'contact',
      name: 'contact.exe',
      icon: <Mail size={16} />,
      type: 'file',
      href: '#contact'
    },
    {
      id: 'config',
      name: 'config.ini',
      icon: <Settings size={16} />,
      type: 'file',
      href: '#config'
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
              : 'hover:bg-blue-100 text-gray-700 hover:text-blue-600'
            }
            ${depth > 0 ? 'ml-4' : ''}
          `}
          onClick={() => handleFileClick(file)}
          style={{ paddingLeft: `${depth * 16 + 12}px` }}
        >
          {isFolder && (
            <div className="flex-shrink-0">
              {isExpanded ? (
                <ChevronDown size={12} className="text-gray-500" />
              ) : (
                <ChevronRight size={12} className="text-gray-500" />
              )}
            </div>
          )}
          <div className={`flex-shrink-0 ${isDark ? 'text-green-400' : 'text-blue-600'}`}>
            {file.icon}
          </div>
          <span className="text-sm font-mono truncate">
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

  if (!isDark) {
    return null; // Only show sidebar in dark mode
  }

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
        ${isCollapsed ? 'w-12' : 'w-48 md:w-64'}
        ${isDark 
          ? 'retro-sidebar' 
          : 'bg-white border-r border-gray-200 shadow-lg'
        }
        ${!isCollapsed ? 'md:shadow-2xl' : ''}
      `}>
      {/* Header */}
      <div className={`
        flex items-center justify-between p-4 border-b
        ${isDark ? 'border-green-400/20' : 'border-gray-200'}
      `}>
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Terminal size={20} className="text-green-400 animate-pulse" />
            <span className="text-green-400 font-mono text-sm font-bold">
              explorer.exe
            </span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`
            p-1 rounded transition-colors
            ${isDark 
              ? 'hover:bg-green-400/20 text-green-400' 
              : 'hover:bg-gray-100 text-gray-600'
            }
          `}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* File Tree */}
      <div className="p-2 space-y-1 overflow-y-auto h-full">
        {!isCollapsed && (
          <div className="mb-4">
            <div className="text-xs text-gray-500 font-mono mb-2 px-2">
              C:\Users\Scorpi777\Desktop\
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
                  hover:bg-green-400/20 hover:scale-110
                  ${isDark ? 'text-green-400' : 'text-blue-600'}
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

      {/* Footer */}
      {!isCollapsed && (
        <div className={`
          absolute bottom-0 left-0 right-0 p-2 border-t
          ${isDark ? 'border-green-400/20 bg-gray-900/50' : 'border-gray-200 bg-gray-50'}
        `}>
        <div className="text-xs text-gray-500 font-mono text-center">
          {isDark ? (
            <>
              <span className="terminal-cursor">&gt;_{' '}</span>
            </>
          ) : (
            'Ready'
          )}
        </div>
        </div>
      )}
      </div>
    </>
  );
}
