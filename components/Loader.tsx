// ✅ Loader.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';

export default function Loader() {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-48 h-16"
          viewBox="0 0 300 80"
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: 1,
            y: [0, -10, 0],
            transition: {
              repeat: Infinity,
              duration: 1.2,
              ease: 'easeInOut',
            },
          }}
        >
          <text
            x="0"
            y="60"
            fill="white"
            fontSize="48"
            fontWeight="700"
            fontFamily="Segoe UI, sans-serif"
          >
            Atharva
          </text>
          <text
            x="180"
            y="60"
            fill="#3b82f6"
            fontSize="48"
            fontWeight="700"
            fontFamily="Segoe UI, sans-serif"
          >
            .Dev
          </text>
        </motion.svg>
      </motion.div>
    </AnimatePresence>
  );
}
