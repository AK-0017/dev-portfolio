'use client';

import { useTransitioning } from './TransitionProvider';
import Navbar from './Navbar';
import Loader from './Loader';
import { motion, AnimatePresence } from 'framer-motion';

export default function TransitionWrapper({ children }: { children: React.ReactNode }) {
  const { isTransitioning } = useTransitioning();

  return (
    <>
      <Navbar />
      {isTransitioning && <Loader />}

      <AnimatePresence mode="wait">
        {!isTransitioning && (
          <motion.main
            key="page-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            {children}
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
