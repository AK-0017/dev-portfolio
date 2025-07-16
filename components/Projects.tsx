'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  homepage?: string;
  fork: boolean;
}

export default function Projects() {
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    fetch('https://api.github.com/users/ak-0017/repos')
      .then(res => res.json())
      .then(data => {
        const filtered = data
          .filter((repo: Repo) => !repo.fork)
          .slice(0, 6); // show only top 6

        setRepos(filtered);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="bg-zinc-900 text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-500 mb-10">
          Projects
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {repos.map((repo) => (
            <div
              key={repo.id}
              className="bg-zinc-800 p-6 rounded-lg shadow hover:shadow-blue-500/20 transition"
            >
              <h3 className="text-xl font-semibold mb-2 capitalize">
                {repo.name.replace(/-/g, ' ')}
              </h3>

              <p className="text-zinc-400 text-sm mb-4">
                {repo.description || 'No description provided.'}
              </p>

              {repo.language && (
                <span className="bg-zinc-700 text-sm px-3 py-1 rounded-full">
                  {repo.language}
                </span>
              )}

              <div className="flex gap-4 justify-center mt-4">
                <Link
                  href={repo.html_url}
                  target="_blank"
                  className="text-sm text-blue-400 hover:underline"
                >
                  GitHub
                </Link>

                {repo.homepage && (
                  <Link
                    href={repo.homepage}
                    target="_blank"
                    className="text-sm text-blue-400 hover:underline"
                  >
                    Live Demo
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
