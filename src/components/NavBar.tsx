export default function NavBar() {
    return (
        <nav className="fixed top-0 w-full flex justify-between items-center px-8 py-4
                    bg-white/80 dark:bg-gray-900/80 backdrop-blur z-50">
            {/* Logo / Nom */}
      <div className="text-2xl font-bold font-serif dark:text-green-400">
        Salem GNANDI
      </div>

      {/* Liens */}
      <div className="flex items-center gap-6">
        <a href="#about" className="hover:text-primary dark:hover:text-green-400">About</a>
        <a href="#tools" className="hover:text-primary dark:hover:text-green-400">Tools</a>
        <a href="#projects" className="hover:text-primary dark:hover:text-green-400">Projects</a>
        <a href="#contact" className="hover:text-primary dark:hover:text-green-400">Contact</a>

        {/* Toggle dark/light mode */}
        <button
          className="btn btn-sm btn-outline"
          onClick={() => {
            document.documentElement.classList.toggle("dark");
          }}
        >
          Toggle
        </button>
      </div>
    </nav>
  );
}
