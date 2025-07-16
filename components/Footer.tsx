"use client";

import { Github, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 px-6 py-10 md:px-16 text-zinc-500 text-sm">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Left: Stack Credit */}
        <p>
          Built with <span className="text-white">Next.js</span> + <span className="text-white">Tailwind CSS</span> | Deployed on <span className="text-white">Vercel</span>
        </p>

        {/* Right: Social Icons */}
        <div className="flex gap-4">
          <SocialIcon href="https://github.com/ak-0017" icon={<Github className="w-4 h-4" />} />
          <SocialIcon href="https://linkedin.com/in/your-profile" icon={<Linkedin className="w-4 h-4" />} />
          <SocialIcon href="https://instagram.com/your-handle" icon={<Instagram className="w-4 h-4" />} />
        </div>
      </div>

      {/* Bottom: Copyright */}
      <div className="text-center mt-6 text-xs text-zinc-600">
        © {new Date().getFullYear()} Atharva Kale. All rights reserved.
      </div>
    </footer>
  );
}

function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-white transition duration-300"
    >
      {icon}
    </a>
  );
}
