import Navbar from '../components/Navbar';

function Projects() {
  return (
    <div>
      <Navbar />
      <section className="py-16 bg-dark-900 text-green-400 light:bg-gray-100 light:text-gray-800">
        <div className="max-w-4xl mx-auto px-8">
          <h1 className="text-3xl font-bold mb-6">Projects</h1>
          <ul className="space-y-6">
            <li>
              <h2 className="text-xl font-semibold">File Manager CLI (Python, ncurses)</h2>
              <p className="text-lg">
                A terminal-based file explorer with a text interface, built to navigate and analyze files. Work in progress with plans for security features like permission checks.
              </p>
            </li>
            <li>
              <h2 className="text-xl font-semibold">Quelques Instants avant l’Aube (React)</h2>
              <p className="text-lg">
                A personal site to share my poetry, coded with React and Vite for a smooth, responsive experience.
              </p>
            </li>
            <li>
              <h2 className="text-xl font-semibold">Benin Community Site (WordPress)</h2>
              <p className="text-lg">
                A site showcasing the culture and communities of Benin’s Mono region, built with WordPress and optimized for accessibility.
              </p>
            </li>
            <li>
              <h2 className="text-xl font-semibold">Minishell (C)</h2>
              <p className="text-lg">
                A custom Unix shell written in C, handling commands, pipes, and redirections with robust parsing.
              </p>
            </li>
            <li>
              <h2 className="text-xl font-semibold">HaveIBeenPwned App (Python)</h2>
              <p className="text-lg">
                A CLI tool to check password leaks using the HaveIBeenPwned API, built with security in mind.
              </p>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Projects;