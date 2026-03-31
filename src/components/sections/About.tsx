"use client";

import { motion } from "framer-motion";

const CARDS = [
  {
    title: "Developer",
    content: "Full-stack with Next.js, MongoDB, Tailwind. Ships real products. Targeting internship from Semester 4.",
    gridClass: "md:col-span-1",
  },
  {
    title: "Founder",
    content: "CEO of BYKBangles, runs a 3-person web agency. Real clients and real revenue.",
    gridClass: "md:col-span-1",
  },
  {
    title: "Builder",
    content: "Heavy-lift drone targeting 1kg payload, ZD550 frame, Pixhawk 6X, Raspberry Pi 5 + AI Hat. Going to international expo.",
    gridClass: "md:col-span-1",
  },
  {
    title: "Writer",
    content: "Writing a literary novel called 'Almost Alive'. Also writes poetry. A builder with a soul.",
    gridClass: "md:col-span-1",
  },
];

export default function About() {
  return (
    <section className="relative px-6 md:px-24 pb-48 max-w-7xl mx-auto overflow-hidden">
      {/* Background Decorative Text */}
      <div className="absolute top-1/2 left-8 -translate-y-1/2 select-none pointer-events-none opacity-[0.05]">
        <h1 className="text-[20vw] md:text-[30rem] font-display leading-none">STORY</h1>
      </div>

      <motion.h3 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-6xl mb-20 text-foreground/20"
      >
        About <span className="text-foreground">Atharva</span>
      </motion.h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CARDS.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`p-10 bg-white/5 border border-white/5 rounded-3xl flex flex-col justify-between hover:bg-white/10 transition-colors duration-500 ${card.gridClass}`}
          >
            <h4 className="text-3xl font-display text-gold mb-6">{card.title}</h4>
            <p className="text-sm text-foreground/60 leading-relaxed font-sans">
              {card.content}
            </p>
          </motion.div>
        ))}
        
        {/* Full-width card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="md:col-span-2 lg:col-span-4 p-12 md:p-16 bg-gold text-black rounded-3xl"
        >
          <h4 className="text-5xl md:text-7xl font-display mb-6">ALL OF THE ABOVE. AT ONCE.</h4>
          <p className="text-lg md:text-2xl font-sans font-medium leading-relaxed opacity-90 max-w-4xl">
            Not a developer who dabbles. Not a founder who codes a little. All four dimensions are real, simultaneous, and serious. Mumbai. 2026.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
