"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Code, Zap, Shield, Cpu, Cloud, Database, Layout, Smartphone, Terminal, Globe, Rocket } from "lucide-react";
import { StackCategory } from "@/types/stack";

const ICON_MAP: Record<string, any> = {
  Code, Zap, Shield, Cpu, Cloud, Database, Layout, Smartphone, Terminal, Globe, Rocket
};

export default function Stack() {
  const [categories, setCategories] = useState<StackCategory[]>([]);

  useEffect(() => {
    fetch("/api/stack")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setCategories(data);
      });
  }, []);

  const renderIcon = (iconName: string) => {
    const Icon = ICON_MAP[iconName] || Code;
    return <Icon className="w-12 h-12 text-gold opacity-50" strokeWidth={1.5} />;
  };

  return (
    <section className="relative px-6 md:px-24 pb-48 max-w-7xl mx-auto overflow-hidden">
      {/* Background Decorative Text */}
      <div className="absolute top-1/2 left-8 -translate-y-1/2 select-none pointer-events-none opacity-[0.05]">
        <h1 className="text-[20vw] md:text-[30rem] font-display leading-none text-white">STACK</h1>
      </div>

      <div className="relative z-10">
        <motion.h3 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="text-4xl md:text-6xl font-display mb-20 md:mb-32"
        >
          TECHNICAL / <span className="text-gold">CORE</span>
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative group"
            >
              <div className="flex items-center gap-6 mb-12">
                <motion.div 
                  initial={{ rotate: -10, scale: 0.8 }}
                  whileInView={{ rotate: 0, scale: 1 }}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  className="p-4 bg-gold/5 border border-gold/10 rounded-2xl group-hover:border-gold/30 transition-colors"
                >
                  {renderIcon(cat.icon)}
                </motion.div>
                <h4 className="text-2xl font-display text-foreground/90 uppercase tracking-widest">{cat.title}</h4>
              </div>

              <div className="space-y-10">
                {cat.skills.map((skill) => (
                  <div key={skill.name} className="group/item">
                    <div className="flex justify-between items-end mb-3">
                      <span className="text-lg font-mono text-foreground/80">{skill.name}</span>
                      <span className="text-[10px] font-mono text-gold/60">{skill.level}%</span>
                    </div>
                    <div className="h-[2px] w-full bg-white/5 overflow-hidden rounded-full">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full bg-gradient-to-r from-gold/50 to-gold shadow-[0_0_15px_rgba(255,184,0,0.3)]"
                      />
                    </div>
                    {skill.desc && (
                      <p className="mt-3 text-[11px] font-sans text-foreground/40 leading-relaxed group-hover/item:text-foreground/60 transition-colors">
                        {skill.desc}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
