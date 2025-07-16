'use client';

export default function About() {
  return (
    <section className="w-full bg-zinc-900 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-blue-400">About Me</h2>

        <p className="text-lg text-zinc-300 leading-relaxed mb-10">
          I'm Atharva — a self-taught developer, automation enthusiast, and an explorer of all things tech. I enjoy turning complex problems into simple, beautiful, and intuitive solutions.
          <br />
          Currently learning full-stack development and building tools that can make life easier.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-zinc-100 text-sm">
          <div className="bg-zinc-800 p-4 rounded-lg">HTML</div>
          <div className="bg-zinc-800 p-4 rounded-lg">CSS</div>
          <div className="bg-zinc-800 p-4 rounded-lg">JavaScript</div>
          <div className="bg-zinc-800 p-4 rounded-lg">Python</div>
          <div className="bg-zinc-800 p-4 rounded-lg">Git & GitHub</div>
          <div className="bg-zinc-800 p-4 rounded-lg">React</div>
          <div className="bg-zinc-800 p-4 rounded-lg">Next.js</div>
          <div className="bg-zinc-800 p-4 rounded-lg">Linux & CLI</div>
        </div>
      </div>
    </section>
  );
}
