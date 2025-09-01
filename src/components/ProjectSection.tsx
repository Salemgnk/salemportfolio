import { useState, useEffect } from "react";
import { 
  ExternalLink, Github, Code2, Globe, Database, Shield, Terminal, Zap, Eye, Lock,
  AlertTriangle, Skull, Target, AppWindow
} from "lucide-react";

type ProjectColor = 'red' | 'green' | 'purple' | 'yellow' | 'blue' | 'orange';
type ProjectStatus = 'Live' | 'In Development' | '[CLASSIFIED]' | '[ACTIVE]' | '[RESEARCH]' | '[DEPLOYED]';
type ProjectType = {
  title: string;
  category: string;
  description: string;
  technologies: string[];
  icon: React.ElementType;
  color: ProjectColor;
  status: ProjectStatus | null;
  github?: string | null;
  live?: string | null;
  image: string;
  warning?: string;
};

export default function ProjectsSection() {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains('dark')
  );

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

  // ---------------- MAPPING POUR TAILWIND ----------------
  const bgColorClasses: Record<ProjectColor, string> = {
    blue: 'bg-blue-100 text-blue-600 border border-blue-200',
    green: 'bg-green-100 text-green-600 border border-green-200',
    purple: 'bg-purple-100 text-purple-600 border border-purple-200',
    orange: 'bg-orange-100 text-orange-600 border border-orange-200',
    red: 'bg-red-100 text-red-600 border border-red-200',
    yellow: 'bg-yellow-100 text-yellow-600 border border-yellow-200',
  };

  const professionalProjects: ProjectType[] = [
    {
      title: "Community Website",
      category: "WordPress",
      description: "Modern community website to promote tourism.",
      technologies: ["WordPress", "Elementor", "Duplicator"],
      icon: Globe,
      color: "blue",
      status: "Live",
      live: "https://gimono.bj",
      image: "/api/placeholder/400/250"
    },
    {
      title: "Quelques instants avant l'aube",
      category: "Frontend",
      description: "A website to share my poems.",
      technologies: ["React", "Tailwind", "Vercel"],
      icon: Globe,
      color: "green",
      status: "Live",
      live: "https://poems-zeta.vercel.app",
      image: "/api/placeholder/400/250"
    },
    {
      title: "42sh",
      category: "Shell Development",
      description: "Implementation of a linux shell based on TCSH",
      technologies: ["C", "Makefile"],
      icon: Code2,
      color: "purple",
      status: "Live",
      github: "https://github.com/yourusername/analytics",
      live: null,
      image: "/api/placeholder/400/250"
    },
    {
      title: "myMarvin",
      category: "DevOps",
      description: "Automated CI/CD pipeline with Docker containers, monitoring, and deployment strategies.",
      technologies: ["Docker", "Jenkins"],
      icon: Database,
      color: "orange",
      status: "Live",
      image: "/api/placeholder/400/250"
    },
    {
      title: "Cloud Forest",
      category: "Software Engineering",
      description: "Implementation of a text editor for code",
      technologies: ["C++", "Cmake", "Makefile", "C", "Python", "GTK"],
      icon: AppWindow,
      color: "orange",
      status: "Live",
      image: "/api/placeholder/400/250"
    }
  ];

  const hackerProjects: ProjectType[] = [
    {
      title: "Intro to CyberSecurity",
      category: "Certification",
      description: "// Cisco certification preparation course",
      technologies: ["Network Fundamentals"],
      icon: Target,
      color: "red",
      status: null,
      github: null,
      live: null,
      image: "/api/placeholder/400/250"
    },
    {
      title: "Hackerlab",
      category: "CTF",
      description: "// 8e place out of 20 at Hackerlab, Benin national cybersecurity competition",
      technologies: ["Python", "Hydra", "Wireshark", "Ghidra"],
      icon: Eye,
      color: "green",
      status: null,
      github: null,
      live: null,
      image: "/api/placeholder/400/250",
    },

  ];

  // ---------------- COLORS ----------------
  const ProjectCard = ({ project, index }: { project: ProjectType; index: number }) => {
    const Icon = project.icon;

    const statusColorClasses: Record<ProjectStatus, string> = isDark
      ? {
        "Live": "text-green-400",
        "In Development": "text-yellow-400",
        "[CLASSIFIED]": "text-red-400 animate-pulse",
        "[ACTIVE]": "text-green-400 animate-pulse",
        "[RESEARCH]": "text-purple-400",
        "[DEPLOYED]": "text-blue-400",
      }
      : {
        "Live": "text-green-600",
        "In Development": "text-yellow-600",
        "[CLASSIFIED]": "text-red-600",
        "[ACTIVE]": "text-green-600",
        "[RESEARCH]": "text-purple-600",
        "[DEPLOYED]": "text-blue-600",
      };

    const colorClasses = isDark
      ? {
        red: "border-red-400/30 hover:border-red-400/60 bg-gray-800/50",
        green: "border-green-400/30 hover:border-green-400/60 bg-gray-800/50",
        purple: "border-purple-400/30 hover:border-purple-400/60 bg-gray-800/50",
        yellow: "border-yellow-400/30 hover:border-yellow-400/60 bg-gray-800/50",
        blue: "border-blue-400/30 hover:border-blue-400/60 bg-gray-800/50",
        orange: "border-orange-400/30 hover:border-orange-400/60 bg-gray-800/50",
      }
      : {
        blue: "border-blue-200 hover:border-blue-400 bg-white",
        green: "border-green-200 hover:border-green-400 bg-white",
        purple: "border-purple-200 hover:border-purple-400 bg-white",
        orange: "border-orange-200 hover:border-orange-400 bg-white",
        red: "border-red-200 hover:border-red-400 bg-white",
        yellow: "border-yellow-200 hover:border-yellow-400 bg-white",
      };

    const iconColorClasses = isDark
      ? {
        red: "text-red-400",
        green: "text-green-400",
        purple: "text-purple-400",
        yellow: "text-yellow-400",
        blue: "text-blue-400",
        orange: "text-orange-400",
      }
      : {
        blue: "text-blue-600",
        green: "text-green-600",
        purple: "text-purple-600",
        orange: "text-orange-600",
        red: "text-red-600",
        yellow: "text-yellow-600",
      };

    return (
      <div
        className={`group rounded-xl border-2 overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl
          ${colorClasses[project.color]} ${isDark ? 'hover:shadow-green-400/10' : 'hover:shadow-gray-200/50'}`}
        style={{ 
          animationDelay: `${index * 200}ms`,
          opacity: 0,
          animation: 'fadeInUp 0.8s ease-out forwards'
        }}
      >
        <div className={`h-48 relative overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon size={48} className={`${iconColorClasses[project.color]} opacity-50`} />
          </div>
          {isDark && project.warning && (
            <div className="absolute top-2 right-2">
              <AlertTriangle className="text-red-400 animate-pulse" size={20} />
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className={`text-xl font-bold mb-1 ${isDark ? 'font-mono text-green-400' : 'font-serif text-gray-800'}`}>
                {project.title}
              </h3>
              <span className={`text-sm px-2 py-1 rounded ${isDark ? 'bg-gray-700 text-gray-300 font-mono' : 'bg-gray-100 text-gray-600 font-medium'}`}>
                {project.category}
              </span>
              <span className={`text-sm font-mono ${statusColorClasses[project.status] ?? 'text-gray-500'}`}>
                {project.status}
              </span>
            </div>
          </div>

          {isDark && project.warning && (
            <div className="mb-3 p-2 border border-red-400/30 rounded bg-red-400/5">
              <p className="text-xs text-red-400 font-mono">
                ⚠ {project.warning}
              </p>
            </div>
          )}

          <p className={`text-sm mb-4 leading-relaxed ${isDark ? 'font-mono text-gray-400' : 'text-gray-600'}`}>
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech: string, techIndex: number) => (
              <span
                key={tech}
                className={`px-2 py-1 text-xs rounded-full transition-all duration-300 hover:scale-105 ${bgColorClasses[project.color]}`}
                style={{
                  animationDelay: `${(index * 200) + (techIndex * 100)}ms`,
                  opacity: 0,
                  animation: 'fadeIn 0.6s ease-out forwards'
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-3">
            {project.github && (
              <a
                href={project.github}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-300 hover:scale-105 ${isDark ? 'border-gray-600 text-gray-300 hover:border-green-400 hover:text-green-400' : 'border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-600'}`}
              >
                <Github size={16} />
                <span className="text-sm font-medium">Code</span>
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${isDark ? 'bg-green-400/10 text-green-400 border border-green-400/30 hover:bg-green-400/20' : bgColorClasses[project.color]}`}
              >
                <ExternalLink size={16} />
                <span className="text-sm font-medium">Live</span>
              </a>
            )}
            {isDark && !project.github && !project.live && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-red-400/30 text-red-400">
                <Lock size={16} />
                <span className="text-sm font-mono">Restricted</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const currentProjects = isDark ? hackerProjects : professionalProjects;

  return (
    <>
      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      <section id="projects" className={`py-20 transition-all duration-1000 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className={`text-5xl font-bold mb-4 transition-all duration-1000 ${isDark ? 'font-mono text-green-400' : 'font-serif text-gray-800'}`}>
              {isDark ? (
                <span className="flex items-center justify-center gap-4">
                  <Terminal className="animate-pulse" />
                  // Active Operations
                  <Zap className="text-yellow-400 animate-bounce" />
                </span>
              ) : (
                <span>Featured Projects</span>
              )}
            </h2>
            
            <p className={`text-xl max-w-2xl mx-auto transition-all duration-1000 ${isDark ? 'font-mono text-gray-300' : 'font-serif text-gray-600'}`}>
              {isDark ? (
                <>
                  <span className="text-green-400">[ACCESS_LEVEL: RESTRICTED]</span>
                  <br />
                  Current offensive security projects and research initiatives
                </>
              ) : (
                "A showcase of my latest work, featuring innovative solutions and cutting-edge technologies."
              )}
            </p>
          </div>

          <div className={`grid gap-8 max-w-7xl mx-auto ${currentProjects.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-5xl' : 'grid-cols-1 md:grid-cols-2'}`}>
            {currentProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className={`inline-block px-8 py-4 rounded-lg border transition-all duration-1000 ${isDark ? 'bg-gray-800/50 border-green-400/30 text-green-400 font-mono' : 'bg-gray-50 border-blue-200 text-blue-600 font-serif'}`}>
              {isDark ? (
                <span>
                  <AlertTriangle className="inline mr-2" size={16} />
                  [NOTICE] More classified projects available upon clearance
                </span>
              ) : (
                <span>🚀 More exciting projects coming soon - Stay tuned!</span>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
