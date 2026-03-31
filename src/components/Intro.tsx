"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface IntroProps {
  onEnter: () => void;
}

export default function Intro({ onEnter }: IntroProps) {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center pointer-events-auto"
    >
      <div className="flex flex-col items-center gap-12">
        <div className="overflow-hidden">
          <motion.h1 
            layoutId="site-logo-text"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-4xl md:text-8xl font-display uppercase tracking-tight text-white flex flex-col md:flex-row items-center gap-4 md:gap-8"
          >
            <span>Atharva</span>
            <span className="text-gold">Kulkarni</span>
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-[10px] md:text-sm font-mono text-gold uppercase tracking-[0.6em] text-center"
        >
          Founder / Developer / Author
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="relative"
        >
          <motion.button
            onClick={onEnter}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="group relative w-20 h-20 md:w-24 md:h-24 bg-gold rounded-full flex items-center justify-center text-black z-10"
          >
            <ArrowRight className="w-8 h-8 md:w-10 md:h-10 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          
          {/* Pulsing Ring */}
          <motion.div 
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 bg-gold rounded-full -z-10"
          />
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 font-mono text-[10px] uppercase tracking-[0.5em] text-white/20"
      >
        Initialize System / Click to Enter
      </motion.div>
    </motion.div>
  );
}
