import { Mail, Github, Linkedin, Shield, Terminal } from 'lucide-react';

export default function HeroSection() {
    const isDark = document.documentElement.classList.contains('dark');

    return (
        <section className={`min-h-screen flex items-center justify-center transition-all duration-1000 ${
            isDark ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" :
            "bg-gradient-to-b from-blue-50 via-white to-gray-50" }`}>
        <div className="container mx-auto px-8 flex flex-col items-center text-center gap-8">

            <div className='relative transition-all duration-1000'>

                <div className={`w-48 h-48 rounded-full overflow-hidden transition-all duration-1000 ${
                    isDark ? 
                        "ring-4 ring-green-400 shadow-2xl shadow-green-400/20" : 
                        "ring-4 ring-blue-300 shadow-2xl shadow-blue-200/50"
                }`}>
                    {/* Image */}
                    <img
                        src="/src/assets/salem.jpeg"
                        alt={isDark ? "Scorpi777" : "Salem GNANDI"}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                            const img = e.target as HTMLImageElement;
                            img.style.display = "none";
                            const nextElem = img.nextElementSibling as HTMLElement | null;
                            if (nextElem) {
                                nextElem.style.display = 'flex';
                            }
                        }}
                    />
                    <div className={`w-full h-full hidden items-center justify-center text-6xl transition-all duration-1000 ${
                        isDark 
                            ? 'bg-gradient-to-b from-gray-800 to-gray-900 text-green-400' 
                            : 'bg-gradient-to-b from-blue-100 to-white text-blue-600'
                        }`}>
                        {isDark ? <Shield className="drop-shadow-lg" /> : '👨‍💻'}
                        </div>
                    </div>

                    {isDark && (
                        <>
                            <div className="absolute -inset-4 rounded-full bg-green-400/5 animate-ping"></div>
                            <div className="absolute -inset-2 rounded-full bg-green-400/10 animate-pulse"></div>
                        </>
                    )}
                    </div>
                    {/* Title */}
                    <div className='space-y-6'>
                        <h1 className={`text-6xl font-bold transition-all duration-1000 ${ isDark
                        ? "font-mono text-green-400 tracker-wider"
                        : "font-serif text-black"
                        }`}>
                            { 
                            isDark
                            ? (
                                <span className='flex items-center gap-4 justify-center'>
                                    <Terminal className='text-green-400 drop-shadow-lg animate-pulse' />
                                    <span className='relative'>
                                        Hi, I'm Scorpi777
                                        <span className='animate-ping absolute -right-2 top-0 w-1 h-12 bg-green-400'></span>
                                    </span>
                                </span>
                            )
                            : (
                                <span className='bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent'>
                                    Hi, I'm Salem GNANDI
                                </span>
                            )}
                        </h1>

                        <p className={`text-xl max-w-2xl transition-all duration-1000 ${isDark 
                            ? "font-mono text-gray-300 leading-relaxed"
                            : "font-serif text-gray-600"
                        }`}>
                            {
                                isDark
                                ? (
                                    <>
                                        <span className='text-green-400 font-bold'>[INFO]</span> Cybersecurity enthusiast and CTF competitor <br />
                                        <span className='text-green-400 font-bold'>[STATUS]</span> Currently hunting for vulnerabilities... <br />
                                        <span className='text-green-400 font-bold'>[ALERT]</span> System compromised successfully 🎯
                                    </>
                                )
                                :   (
                                    <>
                                        I'm a passionate software developer with a focus on building
                                        <br />
                                        innovative solutions and creating meaningful digital experiences.
                                        <br />
                                        <span className="text-blue-600 font-semibold">Always learning, always coding.</span>
                                    </>
                                )
                            }
                        </p>
                    </div>
                    
                    <button className={`px-8 py-4 rounded-full font-semibold transition-all duration-500 hover:scale-105 transform ${
                        isDark
                        ? "bg-green-400/10 text-green-400 border-green-400 hover:bg-green-400 hover:text-gray-900 hover:shadow-lg hover:shadow-green-400/20"
                        : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200/50"
                    }`}>
                        {isDark ? '🔓 Access Terminal' : '📬 Contact me'}
                    </button>

                    <div className='flex gap-6 mt-8'>
                        <a 
                            href="https://github.com/salem" 
                            className={`p-3 rounded-full transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${
                            isDark 
                                ? 'bg-gray-800 text-green-400 hover:bg-green-400 hover:text-gray-900 shadow-lg shadow-green-400/10 hover:shadow-green-400/30' 
                                : 'bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white shadow-lg hover:shadow-xl'
                            }`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub Profile"
                        >
                            <Github size={24} />
                        </a>

                        <a 
                            href="https://linkedin.com/in/salem" 
                            className={`p-3 rounded-full transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${
                            isDark 
                                ? 'bg-gray-800 text-green-400 hover:bg-green-400 hover:text-gray-900 shadow-lg shadow-green-400/10 hover:shadow-green-400/30' 
                                : 'bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white shadow-lg hover:shadow-xl'
                            }`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn Profile"
                        >
                            <Linkedin size={24} />
                        </a>

                        <a 
                            href="mailto:salem@example.com" 
                            className={`p-3 rounded-full transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${
                            isDark 
                                ? 'bg-gray-800 text-green-400 hover:bg-green-400 hover:text-gray-900 shadow-lg shadow-green-400/10 hover:shadow-green-400/30' 
                                : 'bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white shadow-lg hover:shadow-xl'
                            }`}
                            aria-label="Send Email"
                        >
                            <Mail size={24} />
                        </a>
                    </div>
                </div>
        </section>
    );
}
