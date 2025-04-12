import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    document.body.className = theme === 'dark' ? 'light' : 'dark';
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center p-4 bg-dark-900 text-green-400 light:bg-white light:text-gray-800 shadow-md">
      <div className="text-xl font-bold">Cyberpoet</div>
      <ul className="flex space-x-6">
        <li>
          <button onClick={() => scrollToSection('home')} className="hover:underline">
            Home
          </button>
        </li>
        <li>
          <button onClick={() => scrollToSection('about')} className="hover:underline">
            About
          </button>
        </li>
        <li>
          <NavLink to="/projects" className="hover:underline">
            Projects
          </NavLink>
        </li>
        <li>
          <NavLink to="/blog" className="hover:underline">
            Blog
          </NavLink>
        </li>
        <li>
          <button onClick={() => scrollToSection('contact')} className="hover:underline">
            Contact
          </button>
        </li>
      </ul>
      <button
        onClick={toggleTheme}
        className="bg-gray-700 text-white light:bg-blue-500 px-3 py-1 rounded-md hover:opacity-90"
      >
        {theme === 'dark' ? 'Light ☀️' : 'Dark 🌙'}
      </button>
    </nav>
  );
}

export default Navbar;