"use client";

import { Mail, Github, Linkedin, Instagram } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPreview() {
  return (
    <section
      id="contact"
      className="relative py-36 px-6 md:px-20 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-white overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 flex justify-center opacity-10 pointer-events-none">
        <div className="w-[40rem] h-[40rem] bg-blue-500 rounded-full blur-[200px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        {/* Subtle divider */}
        <div className="w-12 h-1 bg-blue-600 rounded-full mx-auto mb-6" />

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Let’s Build Something Great
        </h2>

        {/* Tagline */}
        <p className="text-zinc-400 mb-3 text-sm uppercase tracking-widest">
          Collaborate | Connect | Create
        </p>

        {/* Description */}
        <p className="text-zinc-400 mb-10 text-base md:text-lg leading-relaxed">
          Whether it’s a project, opportunity, or idea — I’d love to hear from you.
          I’m always open to meaningful conversations and new challenges.
        </p>

        {/* Email Button */}
        <a
          href="mailto:your@email.com"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm md:text-base rounded-xl shadow-md hover:shadow-blue-600/40 transition duration-300"
        >
          <Mail className="w-5 h-5" />
          Say Hello
        </a>

        {/* Social Links */}
        <div className="mt-12 flex justify-center gap-5">
          <SocialIcon
            href="https://github.com/ak-0017"
            icon={<Github className="w-5 h-5" />}
          />
          <SocialIcon
            href="https://linkedin.com/in/your-profile"
            icon={<Linkedin className="w-5 h-5" />}
          />
          <SocialIcon
            href="https://instagram.com/your-handle"
            icon={<Instagram className="w-5 h-5" />}
          />
        </div>
      </motion.div>
    </section>
  );
}

function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 rounded-full bg-zinc-800 hover:bg-blue-600 hover:text-white text-zinc-400 transition duration-300"
    >
      {icon}
    </a>
  );
}
