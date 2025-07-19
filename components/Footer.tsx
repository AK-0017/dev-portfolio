import { Github, Linkedin, Instagram, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 px-6 py-10 md:px-16 text-zinc-500 text-sm">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">

        {/* Left: Stack Credit + Contact Info */}
        <div className="text-center md:text-left space-y-2">
          <p>
            Built with <span className="text-white">Next.js</span> + <span className="text-white">Tailwind CSS</span> | Deployed on <span className="text-white">Vercel</span>
          </p>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-zinc-400 text-sm">
            <a href="mailto:atharvakulkarni211@gmail.com" className="flex items-center gap-2 hover:text-white transition">
              <Mail size={16} /> atharvakulkarni211@gmail.com
            </a>
            <a href="tel:7020616259" className="flex items-center gap-2 hover:text-white transition">
              <Phone size={16} /> +91 7020616259
            </a>
          </div>
        </div>

        {/* Right: Social Icons */}
        <div className="flex gap-4">
          <SocialIcon href="https://github.com/ak-0017" icon={<Github className="w-4 h-4" />} />
          <SocialIcon href="https://www.linkedin.com/in/atharva-kulkarni-5321b2328/" icon={<Linkedin className="w-4 h-4" />} />
          <SocialIcon href="https://instagram.com/ak_mere_khwab" icon={<Instagram className="w-4 h-4" />} />
        </div>
      </div>

      {/* Bottom: Copyright */}
      <div className="text-center mt-6 text-xs text-zinc-600">
        © {new Date().getFullYear()} Atharva Kulkarni. All rights reserved.
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
