"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import ProgressBar from "@/components/ProgressBar";
import CustomCursor from "@/components/CustomCursor";
import Who from "@/components/sections/Who";
import Work from "@/components/sections/Work";
import Stack from "@/components/sections/Stack";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import Intro from "@/components/Intro";
import Writing from "@/components/sections/Writing";

const SECTIONS = ["Who", "Work", "Stack", "About", "Writing", "Contact"];

export default function Home() {
  const [activeSection, setActiveSection] = useState("who");
  const [hasStarted, setHasStarted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      const sections = SECTIONS.map(s => s.toLowerCase());
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  const handleSectionChange = (section: string) => {
    const element = document.getElementById(section.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="bg-background text-foreground selection:bg-gold/30">
      <AnimatePresence mode="wait">
        {!hasStarted ? (
          <Intro key="intro" onEnter={() => setHasStarted(true)} />
        ) : (
          <motion.div
            key="main-site"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col"
          >
            <Navbar 
              activeSection={activeSection} 
              onSectionChange={handleSectionChange} 
              hasStarted={hasStarted}
            />
            
            <div className="relative flex flex-col pt-20">
              {/* Vertical Storyline */}
              <div className="absolute left-6 md:left-24 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-gold/10 to-transparent pointer-events-none" />

              <section id="who"><Who /></section>
              <section id="work"><Work /></section>
              <section id="stack"><Stack /></section>
              <section id="about"><About /></section>
              <section id="writing"><Writing /></section>
              <section id="contact"><Contact /></section>
            </div>

            <Footer />

            <ProgressBar currentSection={SECTIONS.indexOf(activeSection.charAt(0).toUpperCase() + activeSection.slice(1))} totalSections={SECTIONS.length} />
          </motion.div>
        )}
      </AnimatePresence>
      <CustomCursor />
    </main>
  );
}
