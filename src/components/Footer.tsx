"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const SOCIALS = [
  { label: "Github", href: "https://github.com/atharva-kulkarni" },
  { label: "Linkedin", href: "https://linkedin.com/in/atharva-kulkarni" },
  { label: "Twitter", href: "https://twitter.com/atharva-kulkarni" },
  { label: "Instagram", href: "https://instagram.com/atharva-kulkarni" },
];

export default function Footer() {
  return (
    <footer className="w-full px-6 md:px-24 py-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-end gap-12 bg-black/40 backdrop-blur-md relative z-10">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-2xl md:text-3xl font-display tracking-tighter text-foreground/90">ATHARVA <br /> KULKARNI</span>
          <span className="text-[10px] font-mono text-gold/40 uppercase tracking-[0.4em]">Developer & Founder</span>
        </div>
        
        <div className="flex flex-col gap-1 text-[10px] font-mono text-foreground/20 uppercase tracking-[0.3em]">
          <span>&copy; 2026 All Rights Reserved</span>
          <span>Designed with Intent</span>
        </div>
      </div>
      
      <div className="hidden lg:flex flex-col items-center gap-4 py-4">
        <div className="w-[1px] h-24 bg-gradient-to-t from-gold/50 to-transparent" />
        <span className="text-[10px] font-mono text-foreground/30 uppercase tracking-[0.8em] [writing-mode:vertical-lr]">Mumbai</span>
      </div>

      <div className="flex flex-col gap-8 items-start md:items-end">
        <div className="flex flex-wrap gap-8">
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1 text-[11px] font-mono text-foreground/40 hover:text-gold transition-colors duration-300 uppercase tracking-[0.2em]"
            >
              <span className="relative">
                {social.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-300" />
              </span>
              <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 -translate-y-1 translate-x-1 transition-all" />
            </a>
          ))}
        </div>
        <p className="text-xs font-sans text-foreground/30 max-w-[200px] text-left md:text-right">
          Building the next generation of experiences from Mumbai to the world.
        </p>
      </div>
    </footer>
  );
}
