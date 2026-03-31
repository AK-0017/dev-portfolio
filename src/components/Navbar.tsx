"use client";
 
 import { useState } from "react";
 import { motion, AnimatePresence } from "framer-motion";
 import { Menu, X } from "lucide-react";
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
 
 const SECTIONS = ["Who", "Work", "Stack", "About", "Writing", "Contact"];
 
 export default function Navbar({ activeSection, onSectionChange, hasStarted }: NavbarProps) {
   const [isOpen, setIsOpen] = useState(false);
 
   const handleNavClick = (section: string) => {
     onSectionChange(section.toLowerCase());
     setIsOpen(false);
   };
 
   return (
     <>
       <motion.nav 
         initial={{ y: -100, opacity: 0 }}
         animate={{ y: hasStarted ? 0 : -100, opacity: hasStarted ? 1 : 0 }}
         transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
         className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-[100] flex items-center p-1 bg-black/60 backdrop-blur-xl border border-white/5 rounded-full shadow-2xl min-w-[280px] md:min-w-[400px] justify-between"
       >
         <div className="flex items-center w-full px-4 justify-between">
           {/* Permanent AK Logo */}
           <motion.div 
             layoutId="site-logo-text"
             className="text-xl font-display text-gold tracking-tighter mr-4 md:mr-6"
           >
             AK
           </motion.div>
 
           {/* Desktop Nav */}
           <div className="hidden md:flex items-center">
             {SECTIONS.map((section) => (
               <button
                 key={section}
                 onClick={() => handleNavClick(section)}
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
 
           {/* Mobile Menu Trigger */}
           <button 
             onClick={() => setIsOpen(!isOpen)}
             className="md:hidden p-2 text-gold/60 hover:text-gold transition-colors"
           >
             {isOpen ? <X size={20} /> : <Menu size={20} />}
           </button>
         </div>
       </motion.nav>
 
       {/* Mobile Menu Overlay */}
       <AnimatePresence>
         {isOpen && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-[95] bg-black/90 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center gap-8"
           >
             {SECTIONS.map((section, i) => (
               <motion.button
                 key={section}
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: i * 0.05 }}
                 onClick={() => handleNavClick(section)}
                 className={cn(
                   "text-4xl font-display tracking-tight uppercase",
                   activeSection.toLowerCase() === section.toLowerCase() ? "text-gold" : "text-white/40"
                 )}
               >
                 {section}
               </motion.button>
             ))}
           </motion.div>
         )}
       </AnimatePresence>
     </>
   );
 }
