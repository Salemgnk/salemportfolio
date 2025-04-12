import Navbar from '../components/Navbar';

function Home() {
  return (
    <div>
      <Navbar />
      <section id="home" className="min-h-screen flex flex-col justify-center items-center bg-dark-900 text-green-400 light:bg-gray-100 light:text-gray-800 p-8">
        <h1 className="text-5xl font-bold mb-4">Welcome to My Portfolio</h1>
        <p className="text-xl max-w-2xl text-center">
          I'm a cybersecurity enthusiast and developer, blending code with creativity. Explore my work in pentesting, programming, and poetry.
        </p>
      </section>
      <section id="about" className="py-16 bg-dark-800 text-green-300 light:bg-white light:text-gray-700">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-3xl font-bold mb-6">About Me</h2>
          <p className="text-lg mb-4">
            I'm ranked 8 on TryHackMe, diving deep into pentesting and reverse engineering with tools like Burp Suite and Ghidra. I code in C/C++ for performance, Python for automation, and React for sleek web apps.
          </p>
          <p className="text-lg">
            Beyond tech, I write poetry and champion community stories from Benin’s Mono region. My work is a fusion of security, code, and soul.
          </p>
        </div>
      </section>
      <section id="contact" className="py-16 bg-dark-900 text-green-400 light:bg-gray-100 light:text-gray-800">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-lg mb-4">
            Want to collaborate or chat about cybersecurity, code, or poetry? Reach me on:
          </p>
          <ul className="list-disc pl-6">
            <li>
              <a href="https://github.com/yourusername" className="underline hover:text-green-200 light:hover:text-blue-500">
                GitHub
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/in/yourprofile" className="underline hover:text-green-200 light:hover:text-blue-500">
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