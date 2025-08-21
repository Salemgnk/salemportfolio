import { useState, useEffect } from "react";
import { 
  ExternalLink, 
  Github, 
  Code2, 
  Smartphone, 
  Globe, 
  Database, 
  Shield, 
  Terminal, 
  Zap, 
  Eye, 
  Lock,
  AlertTriangle,
  Skull,
  Target
} from "lucide-react";

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

    return () => {
      observer.disconnect();
    };
  }, []);

  const professionalProjects = [
    {
      title: "E-Commerce Platform",
      category: "Full Stack",
      description: "Modern e-commerce solution with advanced features like real-time inventory, payment processing, and analytics dashboard.",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
      icon: Globe,
      color: "blue",
      status: "Live",
      github: "https://github.com/yourusername/ecommerce",
      live: "https://myecommerce.com",
      image: "/api/placeholder/400/250"
    },
    {
      title: "Mobile Banking App",
      category: "Mobile",
      description: "Secure banking application with biometric authentication, transaction history, and budget tracking.",
      technologies: ["React Native", "Firebase", "Plaid API"],
      icon: Smartphone,
      color: "green",
      status: "In Development",
      github: "https://github.com/yourusername/banking-app",
      image: "/api/placeholder/400/250"
    },
    {
      title: "Analytics Dashboard",
      category: "Frontend",
      description: "Real-time data visualization dashboard for business intelligence with interactive charts and reports.",
      technologies: ["React", "D3.js", "TypeScript", "Tailwind"],
      icon: Code2,
      color: "purple",
      status: "Live",
      github: "https://github.com/yourusername/analytics",
      live: "https://analytics-dash.com",
      image: "/api/placeholder/400/250"
    },
    {
      title: "DevOps Pipeline",
      category: "Infrastructure",
      description: "Automated CI/CD pipeline with Docker containers, monitoring, and deployment strategies.",
      technologies: ["Docker", "Jenkins", "AWS", "Terraform"],
      icon: Database,
      color: "orange",
      status: "Live",
      github: "https://github.com/yourusername/devops-pipeline",
      image: "/api/placeholder/400/250"
    }
  ];

  const hackerProjects = [
    {
      title: "Web Vulnerability Scanner",
      category: "Offensive Security",
      description: "// Automated scanner for detecting common web vulnerabilities including XSS, SQLi, and CSRF",
      technologies: ["Python", "Selenium", "BeautifulSoup", "SQLAlchemy"],
      icon: Target,
      color: "red",
      status: "[CLASSIFIED]",
      github: null,
      live: null,
      image: "/api/placeholder/400/250",
      warning: "Educational purposes only"
    },
    {
      title: "Network Recon Tool",
      category: "Network Analysis",
      description: "// Advanced network reconnaissance and enumeration toolkit with stealth capabilities",
      technologies: ["Python", "Scapy", "Nmap", "Wireshark"],
      icon: Eye,
      color: "green",
      status: "[ACTIVE]",
      github: null,
      live: null,
      image: "/api/placeholder/400/250",
      warning: "Authorized testing only"
    },
    {
      title: "Binary Exploitation Kit",
      category: "Reverse Engineering",
      description: "// Collection of tools for buffer overflow exploitation and binary analysis",
      technologies: ["C", "Assembly", "GDB", "Ghidra"],
      icon: Skull,
      color: "purple",
      status: "[RESEARCH]",
      github: null,
      live: null,
      image: "/api/placeholder/400/250",
      warning: "Research environment only"
    },
    {
      title: "Forensics Framework",
      category: "Digital Forensics",
      description: "// Memory analysis and artifact extraction framework for incident response",
      technologies: ["Python", "Volatility", "Yara", "Autopsy"],
      icon: Shield,
      color: "yellow",
      status: "[DEPLOYED]",
      github: null,
      live: null,
      image: "/api/placeholder/400/250",
      warning: "Law enforcement use"
    }
  ];

  type ProjectColor = 'red' | 'green' | 'purple' | 'yellow' | 'blue' | 'orange';
  type ProjectType = {
    title: string;
    category: string;
    description: string;
    technologies: string[];
    icon: React.ElementType;
    color: ProjectColor;
    status: string;
    github?: string | null;
    live?: string | null;
    image: string;
    warning?: string;
  };

  const ProjectCard = ({ project, index }: { project: ProjectType; index: number }) => {
    const colorClasses: Record<ProjectColor, string> = isDark
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

    const statusColorClasses = isDark
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

    const Icon = project.icon;

    return (
      <div
        className={`group rounded-xl border-2 overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${
          colorClasses[project.color]
        } ${isDark ? 'hover:shadow-green-400/10' : 'hover:shadow-gray-200/50'}`}
        style={{ 
          animationDelay: `${index * 200}ms`,
          opacity: 0,
          animation: 'fadeInUp 0.8s ease-out forwards'
        }}
      >
        {/* Image placeholder */}
        <div className={`h-48 relative overflow-hidden ${
          isDark ? 'bg-gray-700' : 'bg-gray-100'
        }`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon size={48} className={`${iconColorClasses[project.color]} opacity-50`} />
          </div>
          {isDark && project.warning && (
            <div className="absolute top-2 right-2">
              <AlertTriangle className="text-red-400 animate-pulse" size={20} />
            </div>
          )}
        </div>

        {/* Contenu */}
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className={`text-xl font-bold mb-1 ${
                isDark ? 'font-mono text-green-400' : 'font-serif text-gray-800'
              }`}>
                {project.title}
              </h3>
              <span className={`text-sm px-2 py-1 rounded ${
                isDark
                  ? 'bg-gray-700 text-gray-300 font-mono'
                  : 'bg-gray-100 text-gray-600 font-medium'
              }`}>
                {project.category}
              </span>
            </div>
            <span className={`text-sm font-mono ${statusColorClasses[project.status] || 'text-gray-500'}`}>
              {project.status}
            </span>
          </div>

          {/* Warning (mode hacker uniquement) */}
          {isDark && project.warning && (
            <div className="mb-3 p-2 border border-red-400/30 rounded bg-red-400/5">
              <p className="text-xs text-red-400 font-mono">
                ⚠ {project.warning}
              </p>
            </div>
          )}

          {/* Description */}
          <p className={`text-sm mb-4 leading-relaxed ${
            isDark ? 'font-mono text-gray-400' : 'text-gray-600'
          }`}>
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, techIndex) => (
              <span
                key={tech}
                className={`px-2 py-1 text-xs rounded-full transition-all duration-300 hover:scale-105 ${
                  isDark
                    ? 'bg-green-400/10 text-green-400 border border-green-400/30'
                    : `bg-${project.color}-100 text-${project.color}-600 border border-${project.color}-200`
                }`}
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

          {/* Actions */}
          <div className="flex gap-3">
            {project.github && (
              <a
                href={project.github}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-300 hover:scale-105 ${
                  isDark
                    ? 'border-gray-600 text-gray-300 hover:border-green-400 hover:text-green-400'
                    : 'border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-600'
                }`}
              >
                <Github size={16} />
                <span className="text-sm font-medium">Code</span>
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                  isDark
                    ? 'bg-green-400/10 text-green-400 border border-green-400/30 hover:bg-green-400/20'
                    : `bg-${project.color}-100 text-${project.color}-600 border border-${project.color}-200 hover:bg-${project.color}-200`
                }`}
              >
                <ExternalLink size={16} />
                <span className="text-sm font-medium">Live</span>
              </a>
            )}
            {isDark && !project.github && !project.live && (
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border border-red-400/30 text-red-400`}>
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
      {/* Styles CSS pour les animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      <section id="projects" className={`py-20 transition-all duration-1000 ${
        isDark ? 'bg-gray-900' : 'bg-white'
      }`}>
        <div className="container mx-auto px-8">
          
          {/* Titre principal */}
          <div className="text-center mb-16">
            <h2 className={`text-5xl font-bold mb-4 transition-all duration-1000 ${
              isDark 
                ? 'font-mono text-green-400' 
                : 'font-serif text-gray-800'
            }`}>
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
            
            <p className={`text-xl max-w-2xl mx-auto transition-all duration-1000 ${
              isDark 
                ? 'font-mono text-gray-300' 
                : 'font-serif text-gray-600'
            }`}>
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

          {/* Grille des projets */}
          <div className={`grid gap-8 max-w-7xl mx-auto ${
            currentProjects.length === 2 
              ? 'grid-cols-1 md:grid-cols-2 max-w-5xl' 
              : 'grid-cols-1 md:grid-cols-2'
          }`}>
            {currentProjects.map((project, index) => (
              <ProjectCard 
                key={project.title} 
                project={project} 
                index={index}
              />
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className={`inline-block px-8 py-4 rounded-lg border transition-all duration-1000 ${
              isDark 
                ? 'bg-gray-800/50 border-green-400/30 text-green-400 font-mono' 
                : 'bg-gray-50 border-blue-200 text-blue-600 font-serif'
            }`}>
              {isDark ? (
                <span>
                  <AlertTriangle className="inline mr-2" size={16} />
                  [NOTICE] More classified projects available upon clearance
                </span>
              ) : (
                <span>
                  🚀 More exciting projects coming soon - Stay tuned!
                </span>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}