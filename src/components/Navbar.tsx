"use client";

import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NavbarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  hasStarted: boolean;
}

const SECTIONS = ["Who", "Work", "Stack", "About", "Contact"];

export default function Navbar({ activeSection, onSectionChange, hasStarted }: NavbarProps) {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: hasStarted ? 0 : -100, opacity: hasStarted ? 1 : 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      className="fixed top-8 left-1/2 -translate-x-1/2 z-[90] flex items-center p-1 bg-black/40 backdrop-blur-xl border border-white/5 rounded-full shadow-2xl min-w-[300px] justify-between"
    >
      <div className="flex items-center w-full px-4 justify-between">
        {/* Permanent AK Logo - Target of the Intro Animation */}
        <motion.div 
          layoutId="site-logo-text"
          className="text-xl font-display text-gold tracking-tighter mr-6"
        >
          AK
        </motion.div>

        <div className="flex items-center">
          {SECTIONS.map((section) => (
            <button
              key={section}
              onClick={() => onSectionChange(section.toLowerCase())}
              className={cn(
                "relative px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-mono transition-colors duration-500",
                activeSection.toLowerCase() === section.toLowerCase() ? "text-gold" : "text-foreground/40 hover:text-foreground/80"
              )}
            >
              {activeSection.toLowerCase() === section.toLowerCase() && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 bg-white/5 border border-white/5 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{section}</span>
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
