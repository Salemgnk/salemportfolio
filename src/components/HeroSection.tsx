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

                    </div>

                </div>
                
            

        </section>
    );
}
