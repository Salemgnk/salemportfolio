import { Mail, Github, Linkedin, Terminal, Download, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import salemImage from '../assets/salem.jpeg';
import cvFr from '../assets/cv_salem_gnandi_fr.pdf';
import cvEn from '../assets/cv_salem_gnandi_en.pdf';
import Iridescence from './Iridescence';
import FaultyTerminal from './FaultyTerminal';

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
            <a
                href="#contact"
                className={`px-5 md:px-7 py-2.5 md:py-3.5 rounded-full font-semibold transition-all duration-500 hover:scale-105 transform text-sm md:text-base relative overflow-hidden group inline-block ${
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
            </a>
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
                    className={`px-5 md:px-7 py-2.5 md:py-3.5 rounded-full font-semibold transition-all duration-500 hover:scale-105 transform flex items-center justify-center gap-2 text-sm md:text-base relative overflow-hidden group ${
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
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                
                @keyframes pulse-ring {
                    0% {
                        transform: scale(0.95);
                        opacity: 1;
                    }
                    50% {
                        transform: scale(1.05);
                        opacity: 0.7;
                    }
                    100% {
                        transform: scale(0.95);
                        opacity: 1;
                    }
                }
                
                @keyframes glitch {
                    0%, 100% { transform: translateX(0); }
                    20% { transform: translateX(-2px); }
                    40% { transform: translateX(2px); }
                    60% { transform: translateX(-1px); }
                    80% { transform: translateX(1px); }
                }
                
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                
                .text-holographic {
                    background: linear-gradient(
                        135deg,
                        oklch(0.85 0.2 200),
                        oklch(0.75 0.25 340),
                        oklch(0.8 0.25 150)
                    );
                    background-size: 200% 200%;
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: holographic-shift 3s ease infinite;
                }
            `}</style>

            <section 
                className="min-h-screen flex items-center justify-center py-20 transition-all duration-1000 relative overflow-hidden"
                style={isDark 
                    ? { background: 'linear-gradient(to bottom, #0a0a0a 0%, #1a1a2e 50%, #111827 100%)' }
                    : { background: 'linear-gradient(to bottom, #ffffff 0%, #eff6ff 60%, #e0e7ff 100%)' }
                }
            >
                
                {/* Animated Background */}
                {isDark ? (
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <FaultyTerminal
                            scale={1.2}
                            gridMul={[2, 1]}
                            digitSize={1.5}
                            timeScale={0.3}
                            scanlineIntensity={0.5}
                            glitchAmount={1.2}
                            flickerAmount={0.8}
                            noiseAmp={1.5}
                            chromaticAberration={2}
                            dither={0.5}
                            curvature={0.15}
                            tint="#00ff00"
                            mouseReact={true}
                            mouseStrength={0.3}
                            brightness={1.2}
                            pageLoadAnimation={true}
                        />
                    </div>
                ) : (
                    <div className="absolute inset-0 opacity-25 pointer-events-none">
                        <Iridescence 
                            color={[0.4, 0.6, 1.0]} 
                            speed={0.5} 
                            amplitude={0.15} 
                            mouseReact={true}
                        />
                    </div>
                )}

                <div className="container mx-auto px-6 md:px-12 flex flex-col items-center text-center gap-4 md:gap-6 relative z-10">
                    
                    {/* Photo de profil avec effets holographiques */}
                    <div className='relative transition-all duration-1000 z-10 animate-float'>
                        <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden transition-all duration-1000 relative z-20 ${
                            isDark ? 
                                "glow-border-cyan shadow-2xl shadow-[oklch(0.85_0.2_200_/_0.3)]" : 
                                "ring-4 ring-blue-300 shadow-2xl shadow-blue-200/50"
                        }`}>
                            <img 
                                src={salemImage} 
                                alt="Salem GNANDI" 
                                className="w-full h-full object-cover transition-all duration-1000"
                            />
                            {isDark && (
                                <div className="absolute inset-0 holographic opacity-20 mix-blend-overlay"></div>
                            )}
                        </div>

                        {/* Effets pulse améliorés */}
                        {isDark && (
                            <>
                                <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-[oklch(0.85_0.2_200_/_0.2)] via-[oklch(0.75_0.25_340_/_0.2)] to-[oklch(0.8_0.25_150_/_0.2)] blur-xl animate-pulse z-10"></div>
                                <div className="absolute -inset-4 rounded-full border-2 border-[oklch(0.85_0.2_200_/_0.3)] animate-ping z-10"></div>
                            </>
                        )}
                    </div>

                    {/* Title avec responsive et effets holographiques */}
                    <div className='space-y-3 md:space-y-4'>
                        <h1 className={`text-3xl md:text-5xl font-bold transition-all duration-1000 ${ isDark
                        ? "font-mono text-holographic tracking-wider"
                        : "font-serif text-gray-800"
                        }`}>
                            { 
                            isDark
                            ? (
                                <span className='flex flex-col md:flex-row items-center gap-2 md:gap-3 justify-center'>
                                    <Terminal className='neon-cyan drop-shadow-[0_0_20px_oklch(0.85_0.2_200)] animate-pulse' size={28} />
                                    <span className='relative'>
                                        <span ref={titleRef}>SCORPI777.exe</span>
                                        <span className='animate-ping absolute -right-2 top-0 w-1 h-6 md:h-10 bg-[oklch(0.85_0.2_200)] shadow-[0_0_15px_oklch(0.85_0.2_200)]'></span>
                                    </span>
                                </span>
                            )
                            : (
                                <span className='bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'>
                                    Hi, I'm Salem GNANDI
                                </span>
                            )}
                        </h1>

                        <p className={`text-base md:text-lg max-w-xl transition-all duration-1000 px-4 md:px-0 ${isDark 
                            ? "font-mono text-gray-300 leading-relaxed"
                            : "font-serif text-gray-600"
                        }`}>
                            {
                                isDark
                                ? (
                                    <span ref={descriptionRef}>
                                        <span className='neon-cyan font-bold'>[INFO]</span> Ethical hacker • Penetration tester • CTF competitor <br />
                                        <span className='neon-green font-bold'>[STATUS]</span> Currently hunting for vulnerabilities... <br />
                                        <span className='neon-pink font-bold animate-pulse'>[ALERT]</span> System compromised successfully 🎯
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
                    
                    {/* Boutons avec effet holographique */}
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center w-full max-w-2xl px-4">
                        <ContactButton />
                        <DownloadButton />
                    </div>

                    {/* Social links avec effets néon améliorés - espacement corrigé */}
                    <div className='flex gap-4 md:gap-6 mt-4 md:mt-6'>
                        { [
                            { Icon: Github, href: "https://github.com/Salemgnk", label: isDark ? 'git_repos' : 'GitHub', color: 'cyan' },
                            { Icon: Linkedin, href: "https://linkedin.com/in/salem-gnandi", label: isDark ? 'network' : 'LinkedIn', color: 'pink' },
                            { Icon: Mail, href: "mailto:gnandisalem@gmail.com", label: isDark ? 'contact' : 'Email', color: 'green' }
                        ].map(({ Icon, href, label, color }) => (
                            <a 
                                key={label}
                                href={href}
                                className={`group p-2.5 md:p-3 rounded-full transition-all duration-300 hover:scale-110 hover:-translate-y-1 relative overflow-hidden ${
                                    isDark 
                                        ? `cyber-gradient glow-border-${color}` 
                                        : 'bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white shadow-lg hover:shadow-xl'
                                }`}
                                target={href.startsWith('http') ? "_blank" : undefined}
                                rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
                                aria-label={label}
                            >
                                {isDark && (
                                    <div className="absolute inset-0 holographic opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-full"></div>
                                )}
                                <Icon size={20} className={`md:w-6 md:h-6 relative z-10 ${isDark ? `neon-${color}` : ''}`} />
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}