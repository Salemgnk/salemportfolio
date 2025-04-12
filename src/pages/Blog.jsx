import Navbar from '../components/Navbar';

function Blog() {
  return (
    <div>
      <Navbar />
      <section className="py-16 bg-dark-900 text-green-400 light:bg-gray-100 light:text-gray-800">
        <div className="max-w-4xl mx-auto px-8">
          <h1 className="text-3xl font-bold mb-6">Blog</h1>
          <p className="text-lg">
            Coming soon: CTF write-ups, tech tutorials, and maybe a poem or two. Stay tuned!
          </p>
        </div>
      </section>
    </div>
  );
}

export default Blog;