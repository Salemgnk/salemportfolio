
export default function HeroSection() {
    const isDark = document.documentElement.classList.contains('dark');

    return (
        <section className="hero bg-primary min-h-screen">
        <div className="hero-content flex flex-col items-center text-center gap-6">

            {/* Image */}
            <img
            src="/src/assets/salem.jpeg"
            alt={isDark ? "Salem GNANDI" : "Scorpi777"}
            className="w-40 h-40 rounded-full object-cover shadow-2xl object-top"
            />

            <h1 className={`text-5xl font-bold ${isDark ? "font-mono text-green-400" : "font-serif text-black"}`}>
                {isDark ? "Hi, I'm Scorpi777" : "Hi, I'm Salem GNANDI"}
            </h1>

            <p className={`"text-xl font-serif ${isDark ? "font-mono text-gray-300": "font-serif text-black"}`}>
                {isDark ? "I'm a ctf enthusiast" :
                "I'm a passionate software developer with a focus on building"}
            </p>

            <button className="btn btn-soft btn-primary">Contact me</button>
        </div>
        </section>
    );
}
