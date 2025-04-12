import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLightBg, setIsLightBg] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname !== '/') return;

      const about = document.getElementById('about');
      const stacks = document.getElementById('stacks');
      const blog = document.getElementById('blog');
      const contact = document.getElementById('contact');
      const hero = document.getElementById('hero');

      setIsLightBg(
        checkSection(about) ||
        checkSection(stacks) ||
        checkSection(blog) ||
        checkSection(contact) ||
        !isHeroOffScreen(hero)
      );
    };

    const checkSection = (section) => {
      if (!section) return false;
      const rect = section.getBoundingClientRect();
      return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
    };

    const isHeroOffScreen = (hero) => {
      if (!hero) return true;
      const rect = hero.getBoundingClientRect();
      return rect.bottom < 0;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  const textColor = theme === 'dark' ? (isLightBg ? 'text-green-400' : 'text-gray-900') : (isLightBg ? 'text-gray-800' : 'text-white');
  const borderColor = theme === 'dark' ? (isLightBg ? 'border-gray-200/20' : 'border-white/10') : (isLightBg ? 'border-gray-200/20' : 'border-white/10');

  const handleNavClick = (hash) => {
    if (location.pathname === '/') {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/${hash}`;
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 top-4 px-4">
      <div className={`max-w-5xl mx-auto bg-black/20 backdrop-blur-lg rounded-xl border ${borderColor} ${textColor}`}>
        <div className="px-4 py-2">
          <div className="flex justify-between items-center">
            <motion.div whileHover={{ scale: 1.03 }}>
              <Link to="/" className={`text-xl font-mono ${textColor}`}>
                Cyberpoet
              </Link>
            </motion.div>

            <div className="hidden md:flex space-x-4 text-lg font-mono">
              <button onClick={() => handleNavClick('#home')} className={`px-3 py-1 hover:bg-white/10 rounded-lg ${textColor}`}>
                Home
              </button>
              <button onClick={() => handleNavClick('#about')} className={`px-3 py-1 hover:bg-white/10 rounded-lg ${textColor}`}>
                About
              </button>
              <button onClick={() => handleNavClick('#stacks')} className={`px-3 py-1 hover:bg-white/10 rounded-lg ${textColor}`}>
                Stacks
              </button>
              <button onClick={() => handleNavClick('#blog')} className={`px-3 py-1 hover:bg-white/10 rounded-lg ${textColor}`}>
                Blog
              </button>
              <button onClick={() => handleNavClick('#contact')} className={`px-3 py-1 hover:bg-white/10 rounded-lg ${textColor}`}>
                Contact
              </button>
              <button
                onClick={toggleTheme}
                className={`px-3 py-1 rounded-lg ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-blue-500 text-white'} hover:opacity-90 transition-opacity`}
              >
                {theme === 'dark' ? 'Light ☀️' : 'Dark 🌙'}
              </button>
            </div>

            <button className="md:hidden text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              ☰
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-2 pb-2 space-y-2 text-lg font-mono">
              <button onClick={() => handleNavClick('#stacks')} className={`block w-full text-left px-3 py-2 hover:bg-white/10 rounded-lg ${textColor}`}>
                Stacks
              </button>
              <button onClick={() => handleNavClick('#about')} className={`block w-full text-left px-3 py-2 hover:bg-white/10 rounded-lg ${textColor}`}>
                Projects
              </button>
              <button onClick={() => handleNavClick('#blog')} className={`block w-full text-left px-3 py-2 hover:bg-white/10 rounded-lg ${textColor}`}>
                Blog
              </button>
              <button onClick={() => handleNavClick('#contact')} className={`block w-full text-left px-3 py-2 hover:bg-white/10 rounded-lg ${textColor}`}>
                Contact
              </button>
              <button
                onClick={toggleTheme}
                className={`block w-full text-left px-3 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-blue-500 text-white'} hover:opacity-90 transition-opacity`}
              >
                {theme === 'dark' ? 'Light ☀️' : 'Dark 🌙'}
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;