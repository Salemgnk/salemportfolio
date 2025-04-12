import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    document.body.className = theme === 'dark' ? 'light' : 'dark';
  };

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center p-4 bg-dark-900 text-green-400 light:bg-white light:text-gray-800 shadow-md">
      <div className="text-xl font-bold">Cyberpoet</div>
      <ul className="flex space-x-6">
        <li>
          <a href="#home" className="hover:underline">
            Home
          </a>
        </li>
        <li>
          <a href="#about" className="hover:underline">
            About
          </a>
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
          <a href="#contact" className="hover:underline">
            Contact
          </a>
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