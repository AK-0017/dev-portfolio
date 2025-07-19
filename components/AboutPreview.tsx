"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CertificateModal from "@/components/CertificateModal";
import {
  SiMongodb,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiGit,
  SiVercel,
  SiTailwindcss,
  SiMeta,
} from "react-icons/si";
import { FaGoogle, FaUniversity, FaFreeCodeCamp } from "react-icons/fa";

const techStack = [
  { name: "MongoDB", icon: <SiMongodb size={24} className="text-green-500" /> },
  { name: "React", icon: <SiReact size={24} className="text-sky-400" /> },
  { name: "Next.js", icon: <SiNextdotjs size={24} className="text-white" /> },
  {
    name: "Node.js",
    icon: <SiNodedotjs size={24} className="text-green-400" />,
  },
  { name: "Python", icon: <SiPython size={24} className="text-yellow-400" /> },
  { name: "Vercel", icon: <SiVercel size={24} className="text-white" /> },
  { name: "Git", icon: <SiGit size={24} className="text-orange-400" /> },
  {
    name: "Tailwind",
    icon: <SiTailwindcss size={24} className="text-cyan-400" />,
  },
];

const certifications = [
  {
    title: "Meta Front-End Developer",
    issuer: "Meta",
    icon: <SiMeta className="text-blue-500" size={24} />,
    file: "meta.pdf",
  },
  {
    title: "Google Data Analytics",
    issuer: "Google",
    icon: <FaGoogle className="text-green-500" size={24} />,
    file: "google.pdf",
  },
  {
    title: "Python for Everybody",
    issuer: "University of Michigan",
    icon: <FaUniversity className="text-yellow-400" size={24} />,
    file: "python.pdf",
  },
  {
    title: "JS Algorithms & DS",
    issuer: "freeCodeCamp",
    icon: <FaFreeCodeCamp className="text-white" size={24} />,
    file: "js.pdf",
  },
];

const AboutPreview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState<{
    title: string;
    file: string;
  } | null>(null);

  const handleOpenModal = (cert: { title: string; file: string }) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCert(null);
    setIsModalOpen(false);
  };

  return (
    <section className="px-6 md:px-20 py-14 bg-zinc-950 text-white">
      <h2 className="text-3xl font-bold mb-10 text-center">About</h2>

      <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto">
        {/* Left: Profile */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <Image
            src="/img.png"
            alt="Atharva"
            width={220}
            height={220}
            className="rounded-xl object-cover mb-6"
          />
          <h3 className="text-2xl font-bold">Atharva</h3>
          <p className="text-blue-400 font-semibold">Software Developer</p>
          <p className="text-zinc-400 mt-2 max-w-xs">
            I’m a passionate developer who builds clean, scalable tools and
            automates the boring stuff.
          </p>
          <Link href="/projects" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4 transition duration-300 text-center">
            Discover My Work
          </Link>
        </div>

        {/* Center: Tech Stack */}
        <div className="flex-1 flex flex-col justify-between min-h-[370px]">
          <div>
            <h3 className="text-xl font-semibold mb-4">Tech Stack</h3>
            <div className="grid grid-cols-2 gap-4">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg border border-zinc-700 hover:border-blue-500 transition"
                >
                  {tech.icon}
                  <span className="text-sm">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="italic text-zinc-400 text-sm mt-6">
            “Code is like humor. When you have to explain it, it’s bad.” <br />
            <span className="text-xs">– Cory House</span>
          </p>
        </div>

        {/* Right: Certifications */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-4">Top Certifications</h3>
          <div className="space-y-4">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-zinc-800 p-5 rounded-lg border border-zinc-700 hover:border-blue-500 transition"
              >
                <div className="flex items-center gap-3 mb-1">
                  {cert.icon}
                  <h4 className="text-md font-semibold text-white">
                    {cert.title}
                  </h4>
                </div>
                <p className="text-sm text-zinc-400">{cert.issuer}</p>
                <button
                  onClick={() => handleOpenModal(cert)}
                  className="text-xs text-blue-400 hover:underline mt-1"
                >
                  View Certificate →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {selectedCert && (
        <CertificateModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={selectedCert.title}
          file={selectedCert.file}
        />
      )}
    </section>
  );
};

export default AboutPreview;
