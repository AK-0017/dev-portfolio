'use client';

import Link from 'next/link';
import { Player } from '@lottiefiles/react-lottie-player';
import { Typewriter } from 'react-simple-typewriter';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="w-full min-h-screen pt-24 bg-zinc-950 text-white flex items-center justify-center px-4 sm:px-6">
      <div className="max-w-7xl w-full flex flex-col-reverse md:grid md:grid-cols-2 items-center gap-12 md:gap-10">
        
        {/* Left Side - Text */}
        <div className="text-center md:text-left space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Hey, I’m <span className="text-blue-500">Atharva</span>
            <br />
            <span className="text-zinc-300 text-xl sm:text-2xl md:text-3xl">
              <Typewriter
                words={[
                  'I build smart tools.',
                  'I automate boring stuff.',
                  'I design clean experiences.',
                  'Crafting code, building futures.',
                ]}
                loop
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={40}
                delaySpeed={2000}
              />
            </span>
          </h1>

          <p className="text-md sm:text-lg text-zinc-400">
            Developer • Automation Lover • Tech Explorer
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <Link
              href="/projects"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 w-full sm:w-auto text-center"
            >
              View Projects
            </Link>
            <Link
              href="/contact"
              className="border border-zinc-400 hover:border-blue-400 hover:text-blue-400 text-white py-3 px-6 rounded-lg transition duration-300 w-full sm:w-auto text-center"
            >
              Contact Me
            </Link>
          </div>
        </div>

        {/* Right Side - Animation */}
        <div className="flex justify-center">
          <Player
            autoplay
            loop
            src="/lottie/tech.json"
            className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px]"
          />
        </div>
      </div>
    </section>
  );
}
