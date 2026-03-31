"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import ProjectDossier from "@/components/ProjectDossier";
import { Project } from "@/types/project";

export default function Work() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("/api/projects")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProjects(data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="relative px-6 md:px-24 pb-48 max-w-7xl mx-auto overflow-hidden">
      {/* Background Decorative Text */}
      <div className="absolute top-1/2 left-8 -translate-y-1/2 select-none pointer-events-none opacity-[0.05]">
        <h1 className="text-[20vw] md:text-[30rem] font-display leading-none">WORK</h1>
      </div>

      <motion.h3 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-6xl mb-20 text-foreground/20"
      >
        Selected <span className="text-gold">Work</span>
      </motion.h3>

      <div className="flex flex-col">
        {loading ? (
          [1, 2, 3].map(i => (
            <div key={i} className="py-12 md:py-20 border-b border-white/5 flex flex-col md:flex-row gap-8 md:gap-16">
              <div className="w-12 md:w-24 h-12 md:h-24 bg-white/10 rounded-xl animate-pulse relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
              </div>
              <div className="w-full md:w-64 h-40 md:h-36 bg-white/10 rounded-xl animate-pulse relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
              </div>
              <div className="flex-1 space-y-6">
                <div className="h-12 w-2/5 bg-white/10 rounded-lg animate-pulse relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                </div>
                <div className="h-24 w-full bg-white/5 rounded-lg animate-pulse relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                </div>
                <div className="flex gap-4">
                   <div className="h-4 w-16 bg-white/5 rounded animate-pulse" />
                   <div className="h-4 w-16 bg-white/5 rounded animate-pulse" />
                   <div className="h-4 w-16 bg-white/5 rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))
        ) : projects.map((project, index) => (
          <motion.div
            key={project._id || project.id}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setSelectedProject(project)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative py-12 md:py-20 border-b border-white/5 cursor-pointer overflow-hidden"
          >
            <motion.div 
              className="absolute inset-0 bg-gold/[0.02] blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              initial={false}
            />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
              <span className="text-4xl md:text-7xl font-display text-white/5 group-hover:text-gold/20 transition-all duration-700">
                {project.id}
              </span>
              
              <div className="relative w-full md:w-64 h-40 md:h-36 overflow-hidden rounded-xl border border-white/5 group-hover:border-gold/30 transition-all duration-700">
                {project.image ? (
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-110 transition-all duration-1000" />
                ) : (
                  <div className="w-full h-full bg-white/5 flex items-center justify-center text-[10px] font-mono text-white/20 uppercase tracking-widest">NO_VISUAL_FEED</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <h4 className="text-3xl md:text-5xl font-display group-hover:text-gold transition-colors duration-700 uppercase tracking-tight">{project.title}</h4>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-mono uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-all">{project.role}</span>
                </div>
                <p className="text-sm md:text-lg text-white/30 group-hover:text-white/70 transition-colors duration-700 font-sans max-w-2xl leading-relaxed">{project.description || project.mission}</p>
                <div className="flex gap-4 mt-6 opacity-40 group-hover:opacity-80 transition-opacity">
                  {project.techStack?.slice(0, 3).map(tech => <span key={tech} className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/60">// {tech}</span>)}
                </div>
              </div>

              <div className="hidden md:block overflow-hidden">
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: hoveredIndex === index ? 0 : -20, opacity: hoveredIndex === index ? 1 : 0 }} transition={{ duration: 0.5, ease: "circOut" }} className="text-gold">
                  <ArrowUpRight size={56} strokeWidth={1} />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <ProjectDossier 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
}
