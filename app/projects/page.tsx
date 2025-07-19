'use client';

import { useEffect, useState } from 'react';
import Footer from '@/components/Footer';

type Repo = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
};

export default function ProjectsPage() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [filteredLang, setFilteredLang] = useState('All');

  useEffect(() => {
    const fetchRepos = async () => {
      const res = await fetch('https://api.github.com/users/AK-0017/repos');
      const data = await res.json();
      setRepos(data);
    };
    fetchRepos();
  }, []);

  const languages = ['All', ...new Set(repos.map((repo) => repo.language).filter(Boolean))];

  const filteredRepos =
    filteredLang === 'All'
      ? repos
      : repos.filter((repo) => repo.language === filteredLang);

  return (
   <> 
    <section className="px-6 md:px-20 pt-32 pb-24 bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-2 text-center">My GitHub Projects</h2>
        <p className="text-zinc-400 mb-8 text-center text-sm md:text-base">
          A showcase of my public repositories, filtered by language.
        </p>

        {/* Language Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {languages.map((lang, idx) => (
            <button
              key={idx}
              onClick={() => setFilteredLang(lang)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
                filteredLang === lang
                  ? 'bg-blue-600 text-white'
                  : 'border-zinc-700 hover:border-blue-500 text-zinc-300'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRepos.map((repo) => (
            <div
              key={repo.id}
              className="bg-zinc-900 border border-zinc-800 hover:border-blue-500 rounded-lg overflow-hidden transition"
            >
              {/* Custom Placeholder */}
              <div className="w-full h-44 bg-zinc-800 flex items-center justify-center px-4 text-center">
                <span className="text-blue-400 font-semibold text-base md:text-lg break-words">
                  {repo.name.replace(/[-_]/g, ' ')}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-sm text-zinc-400 leading-relaxed mb-3">
                  {repo.description || 'No description provided.'}
                </p>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-400 hover:underline"
                >
                  View on GitHub →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    <Footer />
    </> 
  );
}
