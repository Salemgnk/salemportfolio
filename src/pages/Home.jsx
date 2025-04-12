import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { ThemeContext } from '../context/ThemeContext';
import reactLogo from '../assets/logos/react.svg';
import pythonLogo from '../assets/logos/python.svg';
import cppLogo from '../assets/logos/cpp.svg';
import cLogo from '../assets/logos/c.svg';
import viteLogo from '../assets/logos/vite.svg';
import jsLogo from '../assets/logos/javascript.svg';
import htmlLogo from '../assets/logos/html.svg';
import cssLogo from '../assets/logos/css.svg';
import burpLogo from '../assets/logos/burpsuite.svg';
import wiresharkLogo from '../assets/logos/wireshark.svg';

function Home() {
  const { theme } = useContext(ThemeContext);

  const devStacks = [
    { name: 'React', icon: reactLogo },
    { name: 'Python', icon: pythonLogo },
    { name: 'C', icon: cLogo },
    { name: 'C++', icon: cppLogo },
    { name: 'Vite', icon: viteLogo },
    { name: 'JavaScript', icon: jsLogo },
    { name: 'HTML', icon: htmlLogo },
    { name: 'CSS', icon: cssLogo },
  ];

  const cybersecStacks = [
    { name: 'Burp Suite', icon: burpLogo },
    { name: 'Wireshark', icon: wiresharkLogo },
  ];

  const handleScrollToStacks = (e) => {
    e.preventDefault();
    const stacksSection = document.getElementById('stacks');
    if (stacksSection) {
      stacksSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div>
      <Navbar />
      <section
        id="hero"
        className={`relative h-screen flex flex-col justify-center items-center text-center px-4 transition-all duration-300 ${
          theme === 'dark' ? 'bg-dark-900' : 'bg-gray-100'
        }`}
      >
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className={`font-mono text-3xl md:text-5xl mb-4 ${
              theme === 'dark' ? 'text-green-400' : 'text-gray-800'
            }`}
          >
            {theme === 'dark' ? (
              <>
                <span className="block text-4xl">Scorpi777</span>
                <span className="block text-lg">Seeker of exploits, guardian of systems.</span>
              </>
            ) : (
              <>
                <span className="block">Hi, I’m</span>
                <span className="block text-4xl">Salem GNANDI</span>
                <span className="block text-lg">A software developer at Epitech</span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className={`font-mono text-lg max-w-2xl mb-12 ${
              theme === 'dark' ? 'text-green-300' : 'text-gray-700'
            }`}
          >
            {theme === 'dark'
              ? 'I dive into CTFs and system security with a curious, ethical mindset. I learn from the dark to protect the light.'
              : 'I craft efficient, elegant solutions with Python, C++, C and more. Always building, always evolving.'}
          </motion.p>

          <motion.a
            href="#stacks"
            className={`bg-white bg-opacity-20 hover:bg-opacity-30 border border-white border-opacity-40 px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 font-mono ${
              theme === 'dark' ? 'text-green-300 border-green-300' : 'text-gray-700 border-gray-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleScrollToStacks}
          >
            Discover More
          </motion.a>
        </div>
      </section>

      <section
        id="stacks"
        className="pt-24 pb-16 bg-dark-900 text-green-400 light:bg-gray-100 light:text-gray-800 transition-all duration-300 border-t border-opacity-20 border-green-500"
      >
        <div className="max-w-4xl mx-auto px-8">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold mb-6"
          >
            {theme === 'dark' ? 'Cybersecurity Arsenal' : 'Development Toolkit'}
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {(theme === 'dark' ? cybersecStacks : devStacks).map((stack, index) => (
              <motion.div
                key={stack.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-center p-4 bg-dark-800 light:bg-white rounded-md shadow-md hover:shadow-lg transition-shadow space-x-4"
              >
                <img src={stack.icon} alt={stack.name} className="w-8 h-8" />
                <span className="text-lg font-mono">{stack.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="blog"
        className="py-16 bg-dark-800 text-green-300 light:bg-white light:text-gray-700 transition-all duration-300"
      >
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-3xl font-bold mb-6">Blog</h2>
          <p className="text-lg mb-4">
            {theme === 'dark'
              ? 'Dive into my CTF write-ups and cybersecurity insights, where I share my journey through the digital shadows.'
              : 'Explore my tech tutorials and dev projects, where I break down coding challenges and solutions.'}
          </p>
          <Link
            to="/blog"
            className="inline-block bg-white bg-opacity-20 hover:bg-opacity-30 border border-white border-opacity-40 text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 font-mono"
          >
            Read More
          </Link>
        </div>
      </section>

      <section
        id="contact"
        className="py-16 bg-dark-900 text-green-400 light:bg-gray-100 light:text-gray-800 transition-all duration-300"
      >
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-lg mb-4">
            Want to collaborate or chat about {theme === 'dark' ? 'hacking, pentesting,' : 'coding, projects,'} or poetry? Reach me on:
          </p>
          <ul className="list-disc pl-6">
            <li>
              <a
                href="https://github.com/yourusername"
                className="underline hover:text-green-200 light:hover:text-blue-500"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/yourprofile"
                className="underline hover:text-green-200 light:hover:text-blue-500"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Home;