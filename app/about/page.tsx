// ✅ AboutPage.tsx (Updated)
"use client";

import { useState } from "react";
import Image from "next/image";
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
import Footer from "@/components/Footer";
import CertificateModal from "@/components/CertificateModal";

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

export default function AboutPage() {
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
    setIsModalOpen(false);
    setSelectedCert(null);
  };

  return (
    <>
      <section className="px-6 md:px-20 pt-32 pb-24 bg-zinc-950 text-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
          {/* LEFT COLUMN */}
          <div className="w-full lg:w-1/3 space-y-10 order-1 lg:order-1">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <Image
                src="/img.png"
                alt="Atharva"
                width={180}
                height={180}
                className="rounded-full object-cover mb-4"
              />
              <h2 className="text-2xl font-bold">Atharva</h2>
              <p className="text-blue-400 font-semibold">Software Developer</p>
              <p className="text-zinc-400 text-sm mt-2">
                I love building clean UIs, automating workflows, and exploring
                tech.
              </p>
            </div>

            {/* Tech Stack (Desktop) */}
            <div className="hidden lg:block">
              <h3 className="text-xl font-semibold mb-4">Tech Stack</h3>
              <div className="space-y-3">
                {techStack.map((tech, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 bg-zinc-800 p-3 rounded-lg border border-zinc-700 hover:border-blue-500 transition hover:scale-105"
                  >
                    <div>{tech.icon}</div>
                    <span className="text-sm">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="w-full lg:w-2/3 space-y-10 order-2 lg:order-2">
            <div>
              <h2 className="text-xl font-semibold mb-2">About Me</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                I'm Atharva Kulkarni — a passionate and self-driven Software
                Developer who believes in the power of clean design and smart
                automation. My journey into tech began with a curiosity to not
                just use software, but to build it. Over time, that curiosity
                evolved into a deep commitment to crafting responsive, scalable,
                and visually appealing web applications. I take pride in writing
                clean, efficient code and transforming ideas into smooth digital
                experiences. Whether I’m building a modern UI with React and
                Tailwind or automating tasks with Python and AI tools, I always
                strive for a perfect blend of performance and usability. My
                mindset is growth-oriented, and I enjoy learning new
                technologies that push my limits and help me solve real-world
                problems.
                {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad minima natus recusandae eligendi vitae soluta iste dolor quidem iure incidunt pariatur, nam dolores placeat aut, distinctio saepe ullam qui. Odio ullam repellendus, esse accusamus distinctio excepturi eum laborum eius. Dolore eum mollitia, modi perferendis, tenetur accusantium obcaecati quas sequi quidem, debitis corrupti. Cupiditate necessitatibus delectus quae sequi. Odit, reiciendis repellendus, nihil sapiente eaque, eum sequi at qui a eius suscipit? Error eligendi voluptas nihil at! Ducimus quos aut odit quo! */}
              </p>
              <br />
              <p className="text-zinc-400 text-sm leading-relaxed">
                My tech stack includes tools like React, Next.js, Node.js, and
                MongoDB. I actively explore AI-powered solutions and love
                integrating smart automation into real-world products. Whether
                it's streamlining processes or creating standout digital
                experiences, I aim to deliver both functionality and finesse.
                {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, quaerat sunt voluptas dolores labore ab eligendi numquam fugit at, ad maiores facere voluptate ipsum fugiat, in sed ipsam suscipit repellendus quos animi dolor dolorum id? Rem blanditiis deserunt ex! Qui tempora laborum earum quisquam corporis asperiores temporibus odio. Officiis, nisi! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum maxime vero ullam ex omnis dolore? Voluptates officia perspiciatis similique dolore. */}
              </p>
              <br />
              <p className="text-zinc-400 text-sm leading-relaxed">
                I’m currently focused on building full-stack SaaS tools and
                automation projects that solve real problems — including my
                latest AI-powered Instagram Reel Generator. Let’s build
                something meaningful together!
                {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae similique nam veritatis voluptates hic facilis magnam, sit placeat corporis ullam. */}
              </p>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Top Certifications</h3>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-zinc-800 p-5 rounded-xl border border-zinc-700 hover:border-blue-500 transition"
                  >
                    <div className="mr-4">{cert.icon}</div>
                    <div className="flex-1">
                      <h4 className="text-md font-semibold">{cert.title}</h4>
                      <p className="text-sm text-zinc-400">{cert.issuer}</p>
                      <button
                        onClick={() => handleOpenModal(cert)}
                        className="text-blue-500 text-xs hover:underline mt-1"
                      >
                        View Certificate →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack (Mobile) */}
            <div className="block lg:hidden">
              <h3 className="text-xl font-semibold mb-4">Tech Stack</h3>
              <div className="space-y-3">
                {techStack.map((tech, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 bg-zinc-800 p-3 rounded-lg border border-zinc-700 hover:border-blue-500 transition hover:scale-105"
                  >
                    <div>{tech.icon}</div>
                    <span className="text-sm">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Component */}
        {selectedCert && (
          <CertificateModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title={selectedCert.title}
            file={selectedCert.file}
          />
        )}
      </section>

      <Footer />
    </>
  );
}
