"use client";

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

const techStack = [
  { name: "MongoDB", icon: <SiMongodb size={24} className="text-green-500" /> },
  { name: "React", icon: <SiReact size={24} className="text-sky-400" /> },
  { name: "Next.js", icon: <SiNextdotjs size={24} className="text-white" /> },
  { name: "Node.js", icon: <SiNodedotjs size={24} className="text-green-400" /> },
  { name: "Python", icon: <SiPython size={24} className="text-yellow-400" /> },
  { name: "Vercel", icon: <SiVercel size={24} className="text-white" /> },
  { name: "Git", icon: <SiGit size={24} className="text-orange-400" /> },
  { name: "Tailwind", icon: <SiTailwindcss size={24} className="text-cyan-400" /> },
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

export default function AboutPage() {
  return (
    <section className="px-6 md:px-20 py-24 bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Left Column */}
        <div className="w-full lg:w-1/3 space-y-10">
          {/* Profile */}
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
              I love building clean UIs, automating workflows, and exploring tech.
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Tech Stack</h3>
            <div className="space-y-3">
              {techStack.map((tech, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-3 bg-zinc-800 p-3 rounded-lg border border-zinc-700 hover:border-blue-500 transition transform hover:scale-105 duration-200"
                >
                  <div className="text-blue-400">{tech.icon}</div>
                  <span className="text-sm text-white">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-2/3 space-y-10 flex flex-col justify-between">
          {/* Bio */}
          <div>
            <h3 className="text-xl font-semibold mb-2">About Me</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam,
              ullam ratione cumque corrupti, sequi et, inventore modi dolore ad
              blanditiis quaerat distinctio iure eum totam eos repellendus? Illo
              a quibusdam voluptatem tenetur quod, officia exercitationem
              molestias harum voluptatum aliquam eos iste nam nemo similique
              incidunt facere aspernatur fugiat earum velit quos quo ad! Commodi
              eum maiores illum quod est consequuntur. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto ratione culpa pariatur eligendi nostrum laborum soluta nisi ipsa consequuntur odit. Lorem ipsum dolor sit, amet consectetur adipisicing elit. At, recusandae.
            </p>
            <br />
            <p className="text-zinc-400 text-sm leading-relaxed">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Excepturi in ea nulla quas, eligendi ipsa. Alias consequatur
              dolorum ipsum repudiandae minus voluptatem assumenda provident
              quod deserunt. Voluptates dolor ipsa iure? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque quaerat magnam placeat dolor facere voluptates debitis cumque deserunt libero dolore. Lorem ipsum dolor sit amet consectetur.
            </p>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Top Certifications</h3>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-start bg-zinc-800 p-5 h-32 rounded-xl border border-zinc-700 hover:border-blue-500 transition"
                >
                  <div className="mr-4 mt-1">{cert.icon}</div>
                  <div className="flex flex-col justify-center">
                    <h4 className="text-md font-semibold">{cert.title}</h4>
                    <p className="text-sm text-zinc-400 mb-1">{cert.issuer}</p>
                    <a
                      href={cert.link}
                      className="text-blue-500 text-xs hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Certificate →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
