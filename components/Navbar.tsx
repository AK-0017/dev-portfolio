'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTransitioning } from './TransitionProvider';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { startTransition } = useTransitioning();
  const router = useRouter();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Projects', path: '/projects' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleNavClick = (path: string) => {
    setIsOpen(false);
    startTransition(() => router.push(path));
  };

  return (
    <nav className="bg-zinc-900 text-white shadow-md fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => handleNavClick('/')}
          className="text-2xl font-extrabold tracking-tight text-white"
        >
          Atharva<span className="text-blue-500">.Dev</span>
        </button>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none text-3xl"
          >
            {isOpen ? '✖' : '☰'}
          </button>
        </div>

        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } absolute top-16 left-0 w-full bg-zinc-900 md:static md:flex md:items-center md:space-x-8 md:w-auto transition-all duration-300`}
        >
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavClick(item.path)}
              className="block px-4 py-2 text-lg hover:text-blue-400 md:inline-block"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
