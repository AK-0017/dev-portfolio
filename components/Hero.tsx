'use client';

import Link from 'next/link';
import { Player } from '@lottiefiles/react-lottie-player';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="w-full min-h-screen pt-24 bg-zinc-950 text-white flex items-center justify-center px-4 sm:px-6">
      <div className="max-w-7xl w-full flex flex-col-reverse md:grid md:grid-cols-2 items-center gap-12 md:gap-10">

        {/* Left Side - Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left space-y-4"
        >
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Hey, I’m <span className="text-blue-500">Atharva</span>
          </h1>

          {/* Tagline */}
          <p className="text-zinc-300 text-lg sm:text-xl md:text-2xl font-medium">
            Premium Software @ Affordable Prices.
          </p>

          {/* Typewriter */}
          <div className="text-zinc-400 text-md sm:text-lg md:text-xl mt-2">
            <Typewriter
              words={[
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
          </div>

          {/* Subtitle */}
          <p className="text-sm sm:text-md text-zinc-400 mt-4">
            Developer • Automation Lover • Tech Explorer
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mt-6">
            <Link
              href="/projects"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 w-full sm:w-auto text-center"
            >
              View Projects
            </Link>
            <Link
              href="/contact"
              className="border border-zinc-600 hover:border-blue-400 hover:text-blue-400 text-white py-3 px-6 rounded-lg transition duration-300 w-full sm:w-auto text-center"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>

        {/* Right Side - Lottie Animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center"
        >
          <Player
            autoplay
            loop
            src="/lottie/tech.json"
            className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px]"
          />
        </motion.div>
      </div>
    </section>
  );
}
