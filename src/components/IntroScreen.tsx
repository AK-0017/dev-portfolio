"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

interface IntroScreenProps {
  onEnter: () => void;
}

export default function IntroScreen({ onEnter }: IntroScreenProps) {
  const [mounted, setMounted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setShowButton(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(onEnter, 1200); // Match split animation duration
  };

  if (!mounted) return <div className="fixed inset-0 bg-black z-50" />;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden">
      {/* Curtain Split Effect */}
      <AnimatePresence>
        {isExiting && (
          <>
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: "-100%" }}
              transition={{ duration: 1, ease: [0.7, 0, 0.3, 1] }}
              className="absolute inset-y-0 left-0 w-1/2 bg-black border-r border-gold/30 z-10"
            />
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: "100%" }}
              transition={{ duration: 1, ease: [0.7, 0, 0.3, 1] }}
              className="absolute inset-y-0 right-0 w-1/2 bg-black border-l border-gold/30 z-10"
            />
            {/* Gold Flash Along the Seam */}
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: [0, 1, 0], scaleY: 1 }}
              transition={{ duration: 0.8, times: [0, 0.2, 1] }}
              className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-gold shadow-[0_0_20px_rgba(212,175,55,0.8)] z-20"
            />
          </>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isExiting ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-0 flex flex-col items-center"
      >
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="text-7xl md:text-9xl font-display text-foreground"
          >
            ATHARVA
          </motion.h1>
        </div>

        <div className="overflow-hidden -mt-2 md:-mt-4">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
            className="text-7xl md:text-9xl font-display text-gold"
          >
            KULKARNI
          </motion.h1>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 1.5 }}
          className="w-full h-[1px] bg-gold/50 my-6 origin-center"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="text-sm md:text-base font-mono tracking-[0.2em] text-foreground/60 uppercase"
        >
          Developer &middot; Founder &middot; Builder &middot; Mumbai
        </motion.p>

        <AnimatePresence>
          {showButton && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              onClick={handleEnter}
              className="mt-16 group relative flex items-center justify-center w-20 h-20 border border-gold/30 rounded-full transition-colors duration-500 hover:bg-gold hover:border-gold"
            >
              <motion.div
                animate={{ rotate: 0 }}
                whileHover={{ rotate: 45 }}
                className="text-gold group-hover:text-black transition-colors duration-500"
              >
                <ArrowRight size={32} />
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
