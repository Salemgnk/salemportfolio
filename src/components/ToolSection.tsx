import { useState, useEffect } from "react";
import { Code, Computer, Cpu, Database, Globe, Search, Smartphone, Target, Wifi, Terminal, AlertTriangle, Lock } from "lucide-react";

export default function ToolsSection() {
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

  const professionalSkills: SkillType[] = [
    {
      category: "Frontend Development",
      icon: Code,
      skills: ["React", "TypeScript", "Tailwind CSS", "Vite.js", "WordPress"],
      color: "blue",
      description: "Modern web interfaces with responsive design and optimal UX"
    },
    {
      category: "Backend Development",
      icon: Database,
      skills: ["Node.js", "Python", "PostgreSQL"],
      color: "green",
      description: "Scalable server architectures and robust database solutions"
    },
    {
      category: "Mobile Development",
      icon: Smartphone,
      skills: ["React Native", "Android", "Expo"],
      color: "purple",
      description: "Cross-platform mobile applications with native performance"
    },
    {
      category: "DevOps & Cloud",
      icon: Globe,
      skills: ["Docker", "AWS", "Jenkins", "Linux"],
      color: "orange",
      description: "Infrastructure automation and cloud deployment strategies"
    },
    {
      category: "Software Engineering",
      icon: Computer,
      skills: ["C", "Python", "C++", "Rust"],
      color: "gray",
      description: "Software development principles and best practices"
    }
  ];

  const hackerArsenal: SkillType[] = [
    {
      category: "Web Exploitation",
      icon: Target,
      skills: ["SQL Injection", "XSS", "LFI"],
      color: "red",
      description: "// Web application penetration testing and vulnerability research"
    },
    {
      category: "Network Security",
      icon: Wifi,
      skills: ["Nmap", "Wireshark", "Metasploit", "Burp Suite", "OWASP ZAP"],
      color: "green",
      description: "// Network reconnaissance and traffic analysis techniques"
    },
    {
      category: "Binary Exploitation",
      icon: Cpu,
      skills: ["Buffer Overflow", "Ghidra", "Assembly"],
      color: "purple",
      description: "// Low-level exploitation and reverse engineering methodologies"
    },
    {
      category: "Digital Forensics",
      icon: Search,
      skills: ["Volatility", "Autopsy"],
      color: "yellow",
      description: "// Evidence acquisition and malware analysis procedures"
    }
  ];

  // Fonction pour déterminer les classes de grid selon le nombre d'éléments
  const getGridClasses = (itemCount: number) => {
    if (itemCount === 1) return "grid-cols-1 max-w-lg mx-auto";
    if (itemCount === 2) return "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto";
    if (itemCount === 3) return "grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto";
    if (itemCount === 4) return "grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto";
    if (itemCount === 5) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
    if (itemCount === 6) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
    // Pour 7+ éléments, on utilise 3 colonnes sur desktop
    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
  };


  const getLastRowClasses = (index: number, total: number): string => {
    // Pour 4 éléments en grille 2x2, pas besoin de classes spéciales
    if (total === 4) return "";
    
    const isLastRow = index >= Math.floor(total / 3) * 3;
    const remainingItems = total % 3;
    
    // Si nombre impair et c'est un des derniers éléments
    if (remainingItems !== 0 && isLastRow) {
      if (remainingItems === 1) {
        // 1 seul élément sur la dernière rangée
        return index === total - 1 ? "md:col-span-2 lg:col-span-3" : "";
      } else if (remainingItems === 2) {
        // 2 éléments sur la dernière rangée
        return index >= total - 2 ? "lg:col-span-1" : "";
      }
    }
    return "";
  };

  type SkillColor = 'red' | 'green' | 'purple' | 'yellow' | 'blue' | 'orange' | 'gray';
  type SkillType = {
    category: string;
    icon: React.ElementType;
    skills: string[];
    color: SkillColor;
    description: string;
  };

  const SkillCard = ({
    skill,
    index,
    total,
  }: {
    skill: SkillType;
    index: number;
    total: number;
  }) => {
    const colorClasses: Record<SkillColor, string> = isDark
        ? {
          red: "border-red-400/30 hover:border-red-400/60 bg-gray-800/50",
          green: "border-green-400/30 hover:border-green-400/60 bg-gray-800/50",
          purple: "border-purple-400/30 hover:border-purple-400/60 bg-gray-800/50",
          yellow: "border-yellow-400/30 hover:border-yellow-400/60 bg-gray-800/50",
          blue: "",
          orange: "",
          gray: "",
        }
        : {
          blue: "border-blue-200 hover:border-blue-400 bg-white",
          green: "border-green-200 hover:border-green-400 bg-white",
          purple: "border-purple-200 hover:border-purple-400 bg-white",
          orange: "border-orange-200 hover:border-orange-400 bg-white",
          gray: "border-gray-200 hover:border-gray-400 bg-white",
          red: "",
          yellow: "",
        };

    const iconColorClasses = isDark
        ? {
          red: "text-red-400",
          green: "text-green-400",
          purple: "text-purple-400",
          yellow: "text-yellow-400"
        }
        : {
          blue: "text-blue-600",
          green: "text-green-600",
          purple: "text-purple-600",
          orange: "text-orange-600",
          gray: "text-gray-600"
        };

    const Icon = skill.icon;
    const additionalClasses = getLastRowClasses(index, total);

    return (
      <div 
        className={`p-6 rounded-lg border-2 transition-all duration-500 hover:scale-105 hover:shadow-xl ${
          colorClasses[skill.color]
        } ${isDark ? 'hover:shadow-green-400/10' : 'hover:shadow-gray-200/50'} ${additionalClasses}`}
        style={{ 
          animationDelay: `${index * 150}ms`,
          opacity: 0,
          animation: 'fadeInUp 0.8s ease-out forwards'
        }}
      >
        {/* Icône et titre */}
        <div className="flex items-center gap-4 mb-4">
          <div className={`p-3 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-100'} transition-all duration-300`}>
            <Icon size={32} className={`${iconColorClasses[skill.color]} transition-all duration-300`} />
          </div>
          <h3 className={`text-xl font-bold ${
            isDark 
              ? 'font-mono text-green-400' 
              : 'font-serif text-gray-800'
          }`}>
            {skill.category}
          </h3>
        </div>

        {/* Description */}
        <p className={`text-sm mb-4 ${
          isDark 
            ? 'font-mono text-gray-400' 
            : 'font-serif text-gray-600'
        }`}>
          {skill.description}
        </p>

        {/* Tags des compétences */}
        <div className="flex flex-wrap gap-2">
          {skill.skills.map((skillName, skillIndex) => (
            <span 
              key={skillName}
              className={`px-3 py-1 text-xs rounded-full transition-all duration-300 hover:scale-110 ${
                isDark
                  ? 'bg-green-400/10 text-green-400 border border-green-400/30'
                  : `bg-${skill.color === 'gray' ? 'gray' : skill.color}-100 text-${skill.color === 'gray' ? 'gray' : skill.color}-600 border border-${skill.color === 'gray' ? 'gray' : skill.color}-200`
              }`}
              style={{
                animationDelay: `${(index * 150) + (skillIndex * 50)}ms`,
                opacity: 0,
                animation: 'fadeIn 0.6s ease-out forwards'
              }}
            >
              {skillName}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const currentSkills = isDark ? hackerArsenal : professionalSkills;

  return (
    <>
      {/* Styles CSS pour les animations */}
      <style>{`
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

      <section id="skills" className={`py-20 transition-all duration-1000 ${
        isDark ? 'bg-gray-800' : 'bg-gray-50'
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
                  // Arsenal & Exploits
                  <AlertTriangle className="text-red-400 animate-bounce" />
                </span>
              ) : (
                <span>Skills & Technologies</span>
              )}
            </h2>
            
            <p className={`text-xl max-w-2xl mx-auto transition-all duration-1000 ${
              isDark 
                ? 'font-mono text-gray-300' 
                : 'font-serif text-gray-600'
            }`}>
              {isDark ? (
                <>
                  <span className="text-green-400">[CLASSIFIED]</span> Offensive security toolkit and methodologies
                  <br />
                  <span className="text-red-400 animate-pulse">[WARNING]</span> Use for ethical purposes only
                </>
              ) : (
                "A comprehensive overview of my technical expertise and the tools I use to build amazing digital experiences."
              )}
            </p>
          </div>

          {/* Grille adaptative des compétences */}
          <div className={`grid ${getGridClasses(currentSkills.length)}`}>
            {currentSkills.map((skill, index) => (
              <SkillCard 
                key={skill.category} 
                skill={skill} 
                index={index} 
                total={currentSkills.length}
              />
            ))}
          </div>

          {/* Footer contextuel */}
          <div className="mt-16 text-center">
            <div className={`inline-block px-8 py-4 rounded-lg border transition-all duration-1000 ${
              isDark 
                ? 'bg-gray-800/50 border-green-400/30 text-green-400 font-mono' 
                : 'bg-white border-blue-200 text-blue-600 font-serif'
            }`}>
              {isDark ? (
                <span>
                  <Lock className="inline mr-2" size={16} />
                  [STATUS] Always expanding the arsenal...
                </span>
              ) : (
                <span>
                  💡 Continuously learning and adapting to new technologies
                </span>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}