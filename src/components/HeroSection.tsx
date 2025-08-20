
export default function HeroSection() {
  return (
    <section className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex flex-col items-center text-center gap-6">

        {/* Image */}
        <img
          src="/src/assets/salem.jpeg"
          alt="Salem GNANDI"
          className="w-40 h-40 rounded-full object-cover shadow-2xl object-top"
        />
        <h1 className="text-5xl font-bold font-mono">Hi, I'm Salem GNANDI</h1>
      </div>
    </section>
  );
}
