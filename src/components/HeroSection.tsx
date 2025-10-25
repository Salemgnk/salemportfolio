import { Mail, Github, Linkedin, Shield, Terminal, Download, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import salemImage from '../assets/salem.jpeg';
import cvFr from '../assets/cv_salem_gnandi_fr.pdf';
import cvEn from '../assets/cv_salem_gnandi_en.pdf';

export default function HeroSection() {
    const [isDark, setIsDark] = useState(
        document.documentElement.classList.contains('dark')
    );
    
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);

    // Observer les changements de thème
    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    const newIsDark = document.documentElement.classList.contains('dark');
                    if (newIsDark !== isDark) {
                        setIsDark(newIsDark);
                    }
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => observer.disconnect();
    }, [isDark]);

    // Effet scramble pour les boutons
    const useScrambleText = (originalText: string) => {
        const [scrambledText, setScrambledText] = useState(originalText);
        const scrambleChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
        
        const scramble = () => {
            let iterations = 0;
            const maxIterations = originalText.length;
            
            const interval = setInterval(() => {
                setScrambledText(() => 
                    originalText.split('')
                        .map((_, index) => {
                            if (index < iterations) {
                                return originalText[index];
                            }
                            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                        })
                        .join('')
                );
                
                if (iterations >= maxIterations) {
                    clearInterval(interval);
                    setScrambledText(originalText);
                }
                
                iterations++;
            }, 50);
        };

        return { scrambledText, scramble };
    };

    const ContactButton = () => {
        const { scrambledText, scramble } = useScrambleText(isDark ? '🔓 ACCESS TERMINAL' : '📬 Contact me');
        
        return (
            <button 
                className={`px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold transition-all duration-500 hover:scale-105 transform text-sm md:text-base relative overflow-hidden group ${
                    isDark
                    ? "bg-green-400/10 text-green-400 border-2 border-green-400 hover:bg-green-400 hover:text-gray-900 hover:shadow-lg hover:shadow-green-400/20 font-mono tracking-wider"
                    : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl hover:shadow-blue-200/50"
                }`}
                onMouseEnter={isDark ? scramble : undefined}
            >
                {isDark && (
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/20 to-green-400/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                )}
                <span className="relative z-10">{scrambledText}</span>
            </button>
        );
    };

    const DownloadButton = () => {
        const [isOpen, setIsOpen] = useState(false);
        const dropdownRef = useRef<HTMLDivElement>(null);
        const { scrambledText, scramble } = useScrambleText(isDark ? '📥 DOWNLOAD EXPLOITS' : '📥 Download CV');
        
        // Fermer le menu quand on clique à l'extérieur
        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                    setIsOpen(false);
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }, []);

        const handleDownload = (lang: 'fr' | 'en') => {
            const link = document.createElement('a');
            link.href = lang === 'fr' ? cvFr : cvEn;
            link.download = lang === 'fr' ? 'CV_Salem_GNANDI_FR.pdf' : 'CV_Salem_GNANDI_EN.pdf';
            link.click();
            setIsOpen(false);
        };

        return (
            <div className="relative" ref={dropdownRef}>
                <button 
                    className={`px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold transition-all duration-500 hover:scale-105 transform flex items-center justify-center gap-2 text-sm md:text-base relative overflow-hidden group ${
                        isDark
                        ? "bg-red-500/10 text-red-400 border-2 border-red-400 hover:bg-red-400 hover:text-gray-900 hover:shadow-lg hover:shadow-red-400/20 font-mono tracking-wider"
                        : "bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl hover:shadow-green-200/50"
                    }`}
                    onMouseEnter={isDark ? scramble : undefined}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isDark && (
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" style={{
                            background: 'linear-gradient(to right, rgba(255, 68, 68, 0), rgba(255, 68, 68, 0.2), rgba(255, 68, 68, 0))'
                        }}></div>
                    )}
                    <Download size={16} className="md:w-5 md:h-5 relative z-10" />
                    <span className="relative z-10">{scrambledText}</span>
                    <ChevronDown size={16} className={`md:w-5 md:h-5 relative z-10 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Menu déroulant */}
                {isOpen && (
                    <div className={`absolute top-full mt-2 w-full min-w-[200px] rounded-lg border-2 overflow-hidden z-50 ${
                        isDark
                            ? 'bg-gray-800 border-red-400/30 shadow-lg shadow-red-400/10'
                            : 'bg-white border-green-200 shadow-xl'
                    }`}>
                        <button
                            onClick={() => handleDownload('fr')}
                            className={`w-full px-4 py-3 text-left transition-all duration-200 flex items-center gap-2 ${
                                isDark
                                    ? 'text-red-400 hover:bg-red-400/10 font-mono'
                                    : 'text-green-700 hover:bg-green-50'
                            }`}
                        >
                            <Download size={16} />
                            <span>{isDark ? '// CV Français' : 'CV Français'}</span>
                        </button>
                        <div className={`h-px ${isDark ? 'bg-red-400/20' : 'bg-green-200'}`}></div>
                        <button
                            onClick={() => handleDownload('en')}
                            className={`w-full px-4 py-3 text-left transition-all duration-200 flex items-center gap-2 ${
                                isDark
                                    ? 'text-red-400 hover:bg-red-400/10 font-mono'
                                    : 'text-green-700 hover:bg-green-50'
                            }`}
                        >
                            <Download size={16} />
                            <span>{isDark ? '// CV English' : 'CV English'}</span>
                        </button>
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            {/* CSS personnalisé pour les effets */}
            <style>{`
                @keyframes matrix-fall {
                    0% { transform: translateY(-100vh); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(100vh); opacity: 0; }
                }
                
                .matrix-char {
                    position: absolute;
                    color: #00ff41;
                    font-family: 'Courier New', monospace;
                    animation: matrix-fall linear infinite;
                    text-shadow: 0 0 5px #00ff41;
                }
                
                @keyframes glitch {
                    0%, 100% { transform: translateX(0); }
                    20% { transform: translateX(-2px); }
                    40% { transform: translateX(2px); }
                    60% { transform: translateX(-1px); }
                    80% { transform: translateX(1px); }
                }
                
                .animate-glitch:hover {
                    animation: glitch 0.3s ease-in-out infinite;
                }
                
                .text-glow {
                    text-shadow: 0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 30px #00ff41;
                }
            `}</style>

            <section className={`min-h-screen flex items-center justify-center pt-20 md:pt-24 transition-all duration-1000 relative overflow-hidden ${
                isDark ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" :
                "bg-gradient-to-b from-blue-50 via-white to-gray-50" 
            }`}>
                
                {/* Effet Matrix Rain pour le mode sombre */}
                {isDark && (
                    <div className="absolute inset-0 pointer-events-none">
                        {Array.from({ length: 30 }).map((_, i) => (
                            <div
                                key={i}
                                className="matrix-char text-xs opacity-30"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 3}s`,
                                    animationDuration: `${3 + Math.random() * 2}s`
                                }}
                            >
                                {String.fromCharCode(0x30A0 + Math.random() * 96)}
                            </div>
                        ))}
                    </div>
                )}

                <div className="container mx-auto px-8 flex flex-col items-center text-center gap-6 md:gap-8 relative z-10">
                    

                    {/* Photo de profil avec effets */}
                    <div className='relative transition-all duration-1000 z-10'>
                        <div className={`w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden transition-all duration-1000 relative z-20 ${
                            isDark ? 
                                "ring-4 ring-green-400 shadow-2xl shadow-green-400/20" : 
                                "ring-4 ring-blue-300 shadow-2xl shadow-blue-200/50"
                        }`}>
                            <img 
                                src={salemImage} 
                                alt="Salem GNANDI" 
                                className="w-full h-full object-cover transition-all duration-1000"
                            />
                            {/* Overlay effect for dark mode */}
                            {isDark && (
                                <div className="absolute inset-0 bg-green-400/10 mix-blend-overlay"></div>
                            )}
                        </div>

                        {/* Effets pulse */}
                        {isDark && (
                            <>
                                <div className="absolute -inset-4 rounded-full bg-green-400/5 animate-ping z-10"></div>
                                <div className="absolute -inset-2 rounded-full bg-green-400/10 animate-pulse z-10"></div>
                            </>
                        )}
                    </div>

                    {/* Title avec responsive */}
                    <div className='space-y-4 md:space-y-6'>
                        <h1 className={`text-4xl md:text-6xl font-bold transition-all duration-1000 ${ isDark
                        ? "font-mono text-green-400 tracking-wider text-glow"
                        : "font-serif text-gray-800"
                        }`}>
                            { 
                            isDark
                            ? (
                                <span className='flex flex-col md:flex-row items-center gap-2 md:gap-4 justify-center'>
                                    <Terminal className='text-green-400 drop-shadow-lg animate-pulse' />
                                    <span className='relative'>
                                        <span ref={titleRef}>SCORPI777.exe</span>
                                        <span className='animate-ping absolute -right-2 top-0 w-1 h-8 md:h-12 bg-green-400'></span>
                                    </span>
                                </span>
                            )
                            : (
                                <span className='bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'>
                                    Hi, I'm Salem GNANDI
                                </span>
                            )}
                        </h1>

                        <p className={`text-lg md:text-xl max-w-2xl transition-all duration-1000 px-4 md:px-0 ${isDark 
                            ? "font-mono text-gray-300 leading-relaxed"
                            : "font-serif text-gray-600"
                        }`}>
                            {
                                isDark
                                ? (
                                    <span ref={descriptionRef}>
                                        <span className='text-green-400 font-bold'>[INFO]</span> Ethical hacker • Penetration tester • CTF competitor <br />
                                        <span className='text-green-400 font-bold'>[STATUS]</span> Currently hunting for vulnerabilities... <br />
                                        <span className='text-red-400 font-bold animate-pulse'>[ALERT]</span> System compromised successfully 🎯
                                    </span>
                                )
                                :   (
                                    <>
                                        I'm a passionate software developer with a focus on building
                                        <br className="hidden md:block" />
                                        innovative solutions and creating meaningful digital experiences.
                                        <br className="hidden md:block" />
                                        <span className="text-blue-600 font-semibold">Always learning, always coding.</span>
                                    </>
                                )
                            }
                        </p>
                    </div>
                    
                    {/* Boutons avec effet scramble */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 md:px-0 w-full max-w-md md:max-w-none">
                        <ContactButton />
                        <DownloadButton />
                    </div>

                    {/* Social links avec effets améliorés */}
                    <div className='flex gap-4 md:gap-6 mt-6 md:mt-8'>
                        {[
                            { Icon: Github, href: "https://github.com/Salemgnk", label: isDark ? 'git_repos' : 'GitHub' },
                            { Icon: Linkedin, href: "https://linkedin.com/in/salem-gnandi", label: isDark ? 'network' : 'LinkedIn' },
                            { Icon: Mail, href: "mailto:gnandisalem@gmail.com", label: isDark ? 'contact' : 'Email' }
                        ].map(({ Icon, href, label }) => (
                            <a 
                                key={label}
                                href={href}
                                className={`group p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 hover:-translate-y-1 relative overflow-hidden ${
                                    isDark 
                                        ? 'bg-gray-800 text-green-400 hover:bg-green-400 hover:text-gray-900 shadow-lg shadow-green-400/10 hover:shadow-green-400/30' 
                                        : 'bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white shadow-lg hover:shadow-xl'
                                }`}
                                target={href.startsWith('http') ? "_blank" : undefined}
                                rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
                                aria-label={label}
                            >
                                {isDark && (
                                    <div className="absolute inset-0 bg-green-400/20 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></div>
                                )}
                                <Icon size={20} className="md:w-6 md:h-6 relative z-10" />
                                {isDark && (
                                    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                        {label}
                                    </span>
                                )}
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}