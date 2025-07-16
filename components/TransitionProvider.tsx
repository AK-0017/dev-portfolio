'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const TransitionContext = createContext<{
  isTransitioning: boolean;
  startTransition: (callback: () => void) => void;
}>({
  isTransitioning: false,
  startTransition: () => {},
});

export const useTransitioning = () => useContext(TransitionContext);

export default function TransitionProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname();

  const startTransition = (callback: () => void) => {
    setIsTransitioning(true);
    setTimeout(() => {
      callback(); // run the navigation (router.push)
    }, 100); // small delay to show the loader before routing
  };

  useEffect(() => {
    setIsTransitioning(false); // stop loader when page path updates
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ isTransitioning, startTransition }}>
      {children}
    </TransitionContext.Provider>
  );
}
