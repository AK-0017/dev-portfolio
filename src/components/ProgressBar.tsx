"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  currentSection: number;
  totalSections: number;
}

export default function ProgressBar({
  currentSection,
  totalSections,
}: ProgressBarProps) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
      <div className="flex flex-col items-center gap-2 px-6 py-3 bg-black/60 backdrop-blur-xl border border-white/5 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <div className="flex gap-2">
          {Array.from({ length: totalSections }).map((_, i) => (
            <div key={i} className="relative w-8 h-[1px] bg-white/10 overflow-hidden">
              {i === currentSection && (
                <motion.div
                  layoutId="progress-bar-fill"
                  className="absolute inset-0 bg-gold"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </div>
          ))}
        </div>
        <div className="text-[8px] font-mono tracking-[0.3em] text-gold/60 uppercase">
          0{currentSection + 1} / 0{totalSections}
        </div>
      </div>
    </div>
  );
}
