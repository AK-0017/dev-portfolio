'use client';

import React from 'react';
import Link from 'next/link';

const projects = [
  {
    name: 'AI Reel Generator',
    description: 'Automated Instagram reels using AI news, TTS, video generation, and Playwright upload.',
    tech: ['Python', 'Playwright', 'gTTS', 'Supabase'],
    repo: 'https://github.com/your-username/ai-reel-generator',
  },
  {
    name: 'Dev Portfolio',
    description: 'Minimal developer portfolio using Next.js, TailwindCSS, and GitHub API.',
    tech: ['Next.js', 'React', 'Tailwind CSS'],
    repo: 'https://github.com/your-username/dev-portfolio',
  },
];

export default function ProjectPage() {
  return (
    <section className="min-h-screen bg-zinc-950 text-white px-6 md:px-20 py-20">
      <h2 className="text-3xl font-bold mb-10 text-center">Projects</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-zinc-900 border border-zinc-800 hover:border-blue-500 p-6 rounded-xl transition-all"
          >
            <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
            <p className="text-zinc-400 text-sm mb-4">{project.description}</p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  className="bg-zinc-800 text-xs text-zinc-300 px-2 py-1 rounded-full border border-zinc-700"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* GitHub Link */}
            <Link
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 text-sm hover:underline"
            >
              View Repository →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
