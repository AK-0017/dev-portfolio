"use client";

import React from "react";
import {
  SiMongodb,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiGit,
  SiVercel,
  SiTailwindcss,
  SiMeta, // ✅ Meta icon from Simple Icons
} from "react-icons/si";
import { FaGoogle, FaUniversity, FaFreeCodeCamp } from "react-icons/fa";
import Image from "next/image";

const techStack = [
  { name: "MongoDB", icon: <SiMongodb size={28} /> },
  { name: "React", icon: <SiReact size={28} /> },
  { name: "Next.js", icon: <SiNextdotjs size={28} /> },
  { name: "Node.js", icon: <SiNodedotjs size={28} /> },
  { name: "Python", icon: <SiPython size={28} /> },
  { name: "Vercel", icon: <SiVercel size={28} /> },
  { name: "Git", icon: <SiGit size={28} /> },
  { name: "Tailwind", icon: <SiTailwindcss size={28} /> },
];

const certifications = [
  {
    title: "Meta Front-End Developer",
    issuer: "Meta",
    icon: <SiMeta className="text-blue-500" size={24} />,
    link: "#",
  },
  {
    title: "Google Data Analytics",
    issuer: "Google",
    icon: <FaGoogle className="text-green-500" size={24} />,
    link: "#",
  },
  {
    title: "Python for Everybody",
    issuer: "University of Michigan",
    icon: <FaUniversity className="text-yellow-400" size={24} />,
    link: "#",
  },
  {
    title: "JS Algorithms & DS",
    issuer: "freeCodeCamp",
    icon: <FaFreeCodeCamp className="text-white" size={24} />,
    link: "#",
  },
];

const AboutPreview = () => {
  return (
    <section className="px-6 md:px-20 py-10">
      <h2 className="text-3xl font-bold mb-10 text-center">About</h2>
      <div className="flex flex-col lg:flex-row lg:items-stretch gap-12">
        {/* Left Side */}
        <div className="flex flex-col items-center lg:items-start">
          <Image
            src="/img.png"
            alt="Atharva"
            width={250}
            height={250}
            className="rounded-xl object-cover mb-6"
          />
          <div className="text-center lg:text-left">
            <h3 className="text-2xl font-bold">Atharva</h3>
            <p className="text-blue-400 font-semibold">Software Developer</p>
            <p className="text-gray-400 mt-2 max-w-xs">
              I’m a passionate developer who builds clean, scalable tools and
              automates the boring stuff.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4">
              Discover My Work
            </button>
          </div>
        </div>

        {/* Center - Tech Stack */}
        <div className="flex-1 flex flex-col justify-between min-h-[370px]">
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-semibold">Tech Stack</h3>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-x-6 gap-y-6">
              {techStack.map((tech, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <span className="text-blue-400">
                    {React.cloneElement(tech.icon, { size: 40 })}
                  </span>
                  <span className="text-base font-semibold">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="italic text-gray-400 text-sm mt-6">
            “Code is like humor. When you have to explain it, it’s bad.” <br />
            <span className="text-xs">– Cory House</span>
          </p>
        </div>

        {/* Right Side - Certifications */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-4">Top Certifications</h3>
          <div className="space-y-4">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-[#1c1c1c] p-4 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <div className="flex items-center space-x-3 mb-1">
                  {cert.icon}
                  <h4 className="text-white font-semibold text-sm">
                    {cert.title}
                  </h4>
                </div>
                <p className="text-gray-400 text-xs mb-1">{cert.issuer}</p>
                <a
                  href={cert.link}
                  className="text-sm text-blue-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Certificate →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
