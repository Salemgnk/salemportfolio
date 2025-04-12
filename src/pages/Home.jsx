import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { ThemeContext } from '../context/ThemeContext';

function Home() {
  const { theme } = useContext(ThemeContext);

  const devStacks = [
    { name: 'React', icon: '⚛️' },
    { name: 'Python', icon: '🐍' },
    { name: 'C/C++', icon: '🖥️' },
    { name: 'Vite', icon: '🚀' },
    { name: 'JavaScript', icon: '🌐' },
    { name: 'HTML/CSS', icon: '🎨' },
  ];

  const cybersecStacks = [
    { name: 'Burp Suite', icon: '🔍' },
    { name: 'Ghidra', icon: '⚙️' },
    { name: 'Wireshark', icon: '📡' },
    { name: 'Nmap', icon: '🗺️' },
    { name: 'Metasploit', icon: '💥' },
    { name: 'TryHackMe', icon: '🏆' },
  ];

  const handleScrollToAbout = (e) => {
    e.preventDefault();
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({
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
        <div className="relative z-10">
          <h1 className={`font-mono text-3xl md:text-5xl mb-4 ${
            theme === 'dark' ? 'text-green-400' : 'text-gray-800'
          }`}>
            {theme === 'dark' ? 'Hi, I’m Salem' : 'Hi, I’m Salem — a passionate software developer and a student at Epitech'}
          </h1>
          <p className={`font-mono text-lg max-w-2xl mb-8 ${
            theme === 'dark' ? 'text-green-300' : 'text-gray-700'
          }`}>
            {theme === 'dark'
              ? 'When it comes to cybersecurity, I’m driven by curiosity and ethics. I’m an aspiring ethical hacker, diving into CTFs, vulnerabilities, and system security. With a solid base in networking, programming, and Linux, I aim to understand systems deeply — and protect them even better. My code is clean. My intentions, cleaner. But I see everything.'
              : 'I love solving problems through clean, efficient code, and bringing ideas to life through technology. From Python to C++, I navigate different languages with ease, always learning, always building. My long-term vision? To build powerful systems and create tools that matter.'}
          </p>
          <motion.a
            href="#about"
            className={`bg-white bg-opacity-20 hover:bg-opacity-30 border border-white border-opacity-40 px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 font-mono ${
              theme === 'dark' ? 'text-green-300 border-green-300' : 'text-gray-700 border-gray-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleScrollToAbout}
          >
            Discover More
          </motion.a>
        </div>
      </section>
      <section
        id="about"
        className="py-16 bg-dark-800 text-green-300 light:bg-white light:text-gray-700 transition-all duration-300"
      >
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-3xl font-bold mb-6">A Glimpse into My Soul</h2>
          <p className="text-lg mb-4 italic">
            "In the moonlit nights of Mono, whispers of the past dance with the stars..."
          </p>
          <p className="text-lg">
            I draw inspiration from the stories of Benin’s Mono region, where tradition and modernity intertwine. Whether I’m coding, hacking, or writing poetry, I strive to capture the essence of connection—between people, ideas, and worlds.
          </p>
        </div>
      </section>
      <section
        id="stacks"
        className="py-16 bg-dark-900 text-green-400 light:bg-gray-100 light:text-gray-800 transition-all duration-300"
      >
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-3xl font-bold mb-6">
            {theme === 'dark' ? 'Cybersecurity Arsenal' : 'Development Toolkit'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {(theme === 'dark' ? cybersecStacks : devStacks).map((stack) => (
              <div
                key={stack.name}
                className="flex items-center p-4 bg-dark-800 light:bg-white rounded-md shadow-md hover:shadow-lg transition-shadow"
              >
                <span className="text-2xl mr-3">{stack.icon}</span>
                <span className="text-lg">{stack.name}</span>
              </div>
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