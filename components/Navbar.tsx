"use client";

import { useState, useEffect } from "react";
import { useTransitioning } from "./TransitionProvider";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { startTransition } = useTransitioning();
  const router = useRouter();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Projects", path: "/projects" },
    { label: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (path: string) => {
    if (window.location.pathname === path) {
      setIsOpen(false); // Just close the mobile menu if already on the same page
      return;           // Don't trigger transition or router.push
    }
  
    setIsOpen(false);
    startTransition(() => router.push(path));
  };
  

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-zinc-900/80 backdrop-blur shadow" : "bg-zinc-950"
      } text-white`}
    >
      <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavClick("/")}
          className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white transition-colors duration-300 hover:text-blue-500"
        >
          Atharva<span className="text-blue-500">.DEV</span>
        </button>

        {/* Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white text-3xl focus:outline-none transition-transform duration-300"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Desktop nav items */}
        <div className="hidden md:flex items-center space-x-14">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavClick(item.path)}
              className="text-lg hover:text-blue-400 transition-colors duration-300"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Dropdown (only when open) */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-3 bg-zinc-950 px-6 py-4 animate-fade-in-down">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavClick(item.path)}
              className="text-left text-lg hover:text-blue-400 transition-colors duration-200"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
