"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CircleX as X, Globe, GitBranch as GitHubIcon, Zap, Shield, Target, Cpu, Activity, LayoutGrid, Layers } from "lucide-react";
import { Project } from "@/types/project";

interface ProjectDossierProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDossier({ project, onClose }: ProjectDossierProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
        >
          {/* Backdrop Blur */}
          <motion.div 
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(40px)" }}
            className="absolute inset-0 bg-black/90"
            onClick={onClose}
          />

          {/* Dossier Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full h-full max-h-[90vh] max-w-[95vw] lg:max-w-7xl bg-black border border-white/5 rounded-[3rem] overflow-y-auto scrollbar-hide shadow-[0_0_100px_rgba(0,0,0,1)] flex flex-col"
          >
            {/* Control Bar */}
            <div className="sticky top-0 z-[210] flex items-center justify-between p-8 bg-black/50 backdrop-blur-xl border-b border-white/5">
              <div className="flex items-center gap-6">
                <span className="text-[10px] font-mono text-gold/40 uppercase tracking-[0.5em]">CASE_STUDY_{project.id}</span>
                <span className="px-3 py-1 bg-green-500/10 text-green-500 font-mono text-[9px] uppercase tracking-widest border border-green-500/20 rounded-full">Status: Operational</span>
              </div>
              <button 
                onClick={onClose}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 lg:p-24 space-y-24">
              {/* HERO HEADER */}
              <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
                <div className="max-w-3xl space-y-8">
                  <h2 className="text-6xl md:text-9xl font-display uppercase leading-[0.8] tracking-tighter">
                    {project.title.split(' ')[0]} <br />
                    <span className="text-transparent italic" style={{ WebkitTextStroke: "1px rgba(255,184,0,0.5)" }}>
                      {project.title.split(' ').slice(1).join(' ')}
                    </span>
                  </h2>
                  <div className="flex flex-wrap gap-4 pt-4">
                    {project.techStack?.map(tech => (
                      <span key={tech} className="px-4 py-1.5 border border-gold/30 bg-gold/5 rounded-full text-[10px] font-mono text-gold uppercase tracking-widest">{tech}</span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 text-right self-end lg:self-start">
                  <h4 className="text-[10px] font-mono text-gold/40 uppercase tracking-widest uppercase">Project_Role</h4>
                  <p className="text-sm font-mono text-white/80 uppercase tracking-wider">{project.role} // Lead</p>
                </div>
              </div>

              {/* MAIN PROJECT VISUAL - The highlight */}
              <div className="space-y-12">
                <div className="relative aspect-[16/10] md:aspect-[21/9] bg-white/[0.02] border border-white/5 rounded-[3rem] overflow-hidden group">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white/5 space-y-4">
                      <Layers size={100} className="animate-pulse" />
                      <span className="font-mono text-[10px] uppercase tracking-[1em]">NO_VISUAL_TRANSMISSION</span>
                    </div>
                  )}
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                </div>

                <div className="max-w-4xl">
                  <span className="text-[10px] font-mono text-gold/40 uppercase tracking-[0.5em] mb-6 block">PROJECT_MISSION</span>
                  <p className="text-2xl md:text-4xl font-display text-foreground/80 leading-tight uppercase">
                    {project.mission || project.description}
                  </p>
                </div>
              </div>

              {/* MODULE GRID - Shows only if modules exist */}
              {project.modules && project.modules.length > 0 && (
                <div className="space-y-12">
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-mono text-gold/40 uppercase tracking-[0.5em]">SYSTEM_MODULES</span>
                    <div className="h-[1px] flex-1 bg-white/5" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
                    {project.modules.map((module, i) => (
                      <div 
                        key={i} 
                        className={`${i === 0 ? 'md:col-span-8' : 'md:col-span-4'} bg-white/[0.02] border border-white/5 rounded-3xl p-10 flex flex-col justify-between group overflow-hidden relative min-h-[350px] hover:border-gold/20 transition-colors`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        <div className="relative space-y-6">
                          <span className="text-[10px] font-mono text-gold/40 uppercase tracking-[0.4em]">{module.badge || `MODULE_0${i+1}`}</span>
                          <h3 className={`${i === 0 ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'} font-display uppercase tracking-tight`}>
                            {module.title}
                          </h3>
                          <p className="text-white/40 max-w-md text-sm leading-relaxed">{module.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* OPERATIONAL METRICS - Shows only if metrics exist */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="space-y-16">
                  <div className="flex items-center justify-between">
                    <h3 className="text-4xl md:text-6xl font-display uppercase">Operational <span className="text-gold italic">Stability</span></h3>
                    <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em] hidden md:block">Engineering_Log_012</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {project.metrics.map((metric, i) => (
                      <div key={i} className="space-y-4 p-8 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-gold/30 transition-colors">
                        <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">{metric.label}</span>
                        <div className="flex items-baseline gap-2">
                           <span className="text-6xl font-display group-hover:text-gold transition-colors">{metric.value}</span>
                           <span className="text-sm font-mono text-white/20 uppercase">{metric.unit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}


              {/* FOOTER CALL TO ACTION */}
              <div className="pt-32 pb-16 flex flex-col items-center text-center space-y-12">
                 <h4 className="text-4xl md:text-6xl font-display uppercase max-w-2xl leading-tight text-white/80">
                   The next era of <br className="hidden md:block" /> {project.title} <span className="italic">is here.</span>
                 </h4>
                 <div className="flex items-center gap-6">
                    {project.links?.live && (
                       <a href={project.links.live} className="px-12 py-4 bg-[#B2EBF2] text-black font-mono text-xs uppercase tracking-widest rounded-xl hover:bg-white transition-all shadow-[0_0_50px_rgba(178,235,242,0.2)]">Deploy_OS</a>
                    )}
                    {project.links?.github && (
                       <a href={project.links.github} className="px-12 py-4 bg-white/5 border border-white/10 text-white font-mono text-xs uppercase tracking-widest rounded-xl hover:bg-white hover:text-black transition-all">Documentation</a>
                    )}
                 </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
