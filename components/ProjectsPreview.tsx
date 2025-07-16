"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tech: string[];
  language: string;
  link: string;
}

export default function ProjectsPreview() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLatestRepos() {
      try {
        const res = await fetch("https://api.github.com/users/ak-0017/repos?sort=updated&per_page=4");
        const data = await res.json();

        const cleaned = data
          .filter((repo: any) => !repo.fork)
          .map((repo: any) => ({
            title: repo.name,
            description: repo.description,
            tech: repo.topics || [],
            language: repo.language || "Other",
            link: repo.html_url,
          }));

        setProjects(cleaned);
      } catch (err) {
        console.error("Failed to fetch GitHub repos:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLatestRepos();
  }, []);

  return (
    <section id="projects" className="py-24 px-6 md:px-16 lg:px-32 bg-zinc-950 text-white">
      <h2 className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
        Latest Projects
      </h2>

      {loading ? (
        <p className="text-center text-zinc-400">Loading projects...</p>
      ) : (
        <>
          <div className="grid gap-10 md:grid-cols-2">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-zinc-900 border-zinc-800 hover:scale-[1.02] hover:shadow-xl transition duration-300 rounded-2xl">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                    <p className="text-sm text-zinc-400">
                      {project.description || "No description provided."}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: getLanguageColor(project.language) }}
                      />
                      {project.language}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((item, index) => (
                        <Badge key={index} className="bg-zinc-800 text-white border-zinc-700">
                          {item}
                        </Badge>
                      ))}
                    </div>

                    <a
                      href={project.link}
                      className="inline-flex items-center text-sm text-blue-400 hover:underline mt-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project <ArrowRight className="ml-1 w-4 h-4" />
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* View All Projects button */}
          <div className="mt-16 flex justify-center">
            <a
              href="/projects"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition duration-300"
            >
              View All Projects
            </a>
          </div>
        </>
      )}
    </section>
  );
}

// GitHub-style language color map
function getLanguageColor(language: string) {
  const map: { [key: string]: string } = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Java: "#b07219",
    C: "#555555",
    Cpp: "#f34b7d",
    Shell: "#89e051",
    Go: "#00ADD8",
    Other: "#999999",
  };

  return map[language] || "#888";
}
