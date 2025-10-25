import { useState, useEffect } from 'react';
import { Calendar, Award, Briefcase, GraduationCap, Shield, Target } from 'lucide-react';
import CyberGrid from './CyberGrid';

// Types
interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  category: 'education' | 'certification' | 'experience' | 'achievement';
  icon: React.ElementType;
  color: string;
}

// Données de la timeline
const timelineData: TimelineEvent[] = [
  {
    id: '1',
    date: 'June 2023',
    title: 'High School Diploma',
    description: 'Obtained High School Diploma in Science - Starting point of my tech journey',
    category: 'education',
    icon: GraduationCap,
    color: '#3b82f6'
  },
  {
    id: '2',
    date: '2024',
    title: 'Python Certification',
    description: 'Coding Game Python Certification - Validation of programming skills',
    category: 'certification',
    icon: Award,
    color: '#10b981'
  },
  {
    id: '3',
    date: 'July - Nov 2024',
    title: 'Network Assistant',
    description: 'First year internship - Practical experience in network administration',
    category: 'experience',
    icon: Briefcase,
    color: '#f59e0b'
  },
  {
    id: '4',
    date: 'March 2025',
    title: 'AER Epitech',
    description: 'Epitech Regional Assistant - Leadership and mentoring responsibilities',
    category: 'achievement',
    icon: Shield,
    color: '#8b5cf6'
  },
  {
    id: '5',
    date: 'May 2025',
    title: 'Hackerlab 8th/20',
    description: '8th place out of 20 teams - National cybersecurity competition',
    category: 'achievement',
    icon: Target,
    color: '#ef4444'
  },
  {
    id: '6',
    date: 'July 2025',
    title: 'EPIHACK President',
    description: 'President of EPIHACK - Epitech Cybersecurity Association leadership role',
    category: 'achievement',
    icon: Shield,
    color: '#ff6b35'
  }
];

// Simple Timeline Item Component
function TimelineItem({ event, isDark, index }: { 
  event: TimelineEvent, 
  isDark: boolean,
  index: number 
}) {
  const Icon = event.icon;
  const isEven = index % 2 === 0;
  
  return (
    <div className={`relative flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'} mb-12`}>
      {/* Timeline line */}
      <div className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full ${
        isDark ? 'bg-green-400/30' : 'bg-blue-200'
      }`}></div>
      
      {/* Content */}
      <div className={`w-5/12 ${isEven ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
        <div className={`p-6 rounded-xl border-2 transition-all duration-500 hover:scale-105 ${
          isDark
            ? 'bg-gray-900/80 border-green-400/50 text-green-400 shadow-lg shadow-green-400/20'
            : 'bg-white border-blue-200 text-gray-800 shadow-lg'
        }`}>
          <div className={`flex items-center gap-3 mb-3 ${isEven ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-2 rounded-full ${
              isDark ? 'bg-gray-800 border border-green-400/30' : 'bg-gray-100'
            }`}>
              <Icon size={20} style={{ color: event.color }} />
            </div>
            <div>
              <h4 className={`font-bold text-lg ${isDark ? 'font-mono' : 'font-serif'}`}>
                {isDark ? `> ${event.title}` : event.title}
              </h4>
              <p className={`text-sm ${isDark ? 'font-mono text-yellow-400' : 'text-blue-600'}`}>
                {isDark ? `[${event.date}]` : event.date}
              </p>
            </div>
          </div>
          <p className={`text-sm leading-relaxed ${isDark ? 'font-mono text-gray-300' : 'text-gray-600'}`}>
            {isDark ? `// ${event.description}` : event.description}
          </p>
          {isDark && (
            <div className="mt-3 text-xs font-mono text-green-400/70">
              [EVENT_{index + 1}] • [CATEGORY: {event.category.toUpperCase()}]
            </div>
          )}
        </div>
      </div>
      
      {/* Timeline dot */}
      <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 ${
        isDark 
          ? 'bg-gray-900 border-green-400 shadow-lg shadow-green-400/50' 
          : 'bg-white border-blue-500 shadow-lg'
      }`}>
        <div className={`w-full h-full rounded-full animate-pulse`} style={{ backgroundColor: event.color }}></div>
      </div>
    </div>
  );
}

// Composant principal
export default function TimelineSection() {
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

  return (
    <section 
      id="timeline" 
      className="py-20 relative transition-all duration-1000"
      style={isDark 
        ? { background: 'linear-gradient(to bottom, #111827 0%, #0f172a 50%, #020617 100%)' }
        : { background: 'linear-gradient(to bottom, #e0e7ff 0%, #ddd6fe 50%, #f3e8ff 100%)' }
      }
    >
      
      {/* Effet scanline + grille pour mode cyberpunk */}
      {isDark && (
        <>
          <CyberGrid opacity={0.08} />
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div 
              className="absolute w-full h-px bg-gradient-to-r from-transparent via-green-400/30 to-transparent"
              style={{
                animation: 'scanline 3s linear infinite'
              }}
            />
          </div>
        </>
      )}
      
      <div className="container mx-auto px-8 relative z-10">
        
        {/* Titre */}
        <div className="text-center mb-16">
          <h2 className={`text-6xl font-bold mb-6 relative transition-all duration-1000 ${
            isDark 
              ? 'font-mono text-green-400' 
              : 'font-serif text-gray-800'
          }`}>
            {isDark ? (
              <span className="flex items-center justify-center gap-6">
                <Shield className="animate-pulse text-red-400" />
                <span className="relative">
                  // TIMELINE.exe
                  <span className="absolute inset-0 text-red-400 animate-ping opacity-20">
                    // TIMELINE.exe
                  </span>
                </span>
                <Calendar className="text-yellow-400 animate-bounce" />
              </span>
            ) : (
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Evolution Timeline
              </span>
            )}
          </h2>
          
          <p className={`text-xl max-w-3xl mx-auto transition-all duration-1000 ${
            isDark 
              ? 'font-mono text-gray-300' 
              : 'font-serif text-gray-600'
          }`}>
            {isDark ? (
              <>
                <span className="text-green-400 font-bold">[SYSTEM_INITIALIZED]</span> Mapping digital evolution pathway...
                <br />
                <span className="text-yellow-400 font-bold">[DATA_ACCESS]</span> Chronological progression analysis
                <br />
                <span className="text-red-400 font-bold animate-pulse">[STATUS]</span> Professional journey documented
              </>
            ) : (
              "Navigate through my professional journey in this clean timeline. Each milestone represents a step forward in my quest for knowledge and expertise in technology."
            )}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {timelineData.map((event, index) => (
            <TimelineItem 
              key={event.id} 
              event={event} 
              isDark={isDark} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}