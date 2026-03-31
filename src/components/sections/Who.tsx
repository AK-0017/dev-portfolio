import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const DEFAULT_TAGS = ["Next.js", "MongoDB", "Python", "Founder", "Mumbai India"];

export default function Who() {
  const [time, setTime] = useState("");

  const [settings, setSettings] = useState({ isAvailable: true, resumeUrl: "" });

  useEffect(() => {
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(err => console.error(err));

    const update = () => {
      setTime(new Date().toLocaleTimeString("en-US", { 
        hour12: false, 
        hour: "2-digit", 
        minute: "2-digit", 
        second: "2-digit" 
      }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-between items-center px-4 md:px-24 pt-16 md:pt-8 pb-32 md:pb-48 max-w-7xl mx-auto overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-gold/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

      {/* Live Data Ticker - Top Anchored */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="relative z-10 w-full flex justify-center gap-8 md:gap-16 text-[10px] font-mono text-gold/40 uppercase tracking-[0.5em] pointer-events-none"
      >
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 bg-gold rounded-full animate-pulse" />
          <span>Mumbai {time}</span>
        </div>
        <span className="hidden md:block">19.0760&deg; N / 72.8777&deg; E</span>
      </motion.div>

      {/* Centerpiece Headline */}
      <div className="relative z-10 w-full flex flex-col items-center text-center py-12">
        <motion.span
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          whileInView={{ opacity: 0.6, letterSpacing: "0.5em" }}
          className="text-[10px] font-mono uppercase text-gold mb-6"
        >
          Perspective / 01
        </motion.span>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(3.5rem,15vw,9rem)] font-display leading-[0.8] tracking-tighter"
        >
          I <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}>BUILD</span> THINGS <br />
          THAT <span className="text-gold italic">SHIP.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-8 md:mt-12 max-w-2xl text-base md:text-2xl text-foreground/50 leading-tight font-sans px-4 md:px-0"
        >
          Full-stack developer and founder based in Mumbai. <br className="hidden sm:block" />
          I don&apos;t have side projects. I have <span className="text-foreground">parallel ambitions.</span>
        </motion.p>
      </div>

      {/* Ambitions & Tags - Bottom Anchored */}
      <div className="relative z-10 w-full flex flex-col items-center gap-12 md:gap-16">
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-y-8 md:gap-0">
          {[
            { label: "Founder", val: "AuthVerse" },
            { label: "Developer", val: "BYKBangles" },
            { label: "Builder", val: "Drone" },
            { label: "Writer", val: "Almost Alive" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className={`flex flex-col items-center md:items-start md:px-12 ${i !== 0 && i % 2 !== 0 ? "sm:border-l border-white/5" : ""} ${i >= 2 ? "lg:border-l border-white/5" : ""}`}
            >
              <span className="text-[10px] font-mono text-gold/60 uppercase tracking-widest mb-2">{item.label}</span>
              <span className="text-xl font-display text-foreground/90">{item.val}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {DEFAULT_TAGS.map((tag) => (
            <span key={tag} className="text-[10px] font-mono text-gold border border-gold/20 bg-gold/5 px-5 py-2 rounded-full uppercase tracking-widest hover:bg-gold hover:text-black transition-all cursor-default">
              {tag}
            </span>
          ))}
          <span className={`text-[10px] font-mono border px-5 py-2 rounded-full uppercase tracking-widest flex items-center gap-2 ${settings.isAvailable ? 'text-green-500 border-green-500/20 bg-green-500/5' : 'text-gold/40 border-gold/10 bg-white/5'}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${settings.isAvailable ? 'bg-green-500 animate-pulse' : 'bg-gold/20'}`} />
            {settings.isAvailable ? "Open to Opportunities" : "Currently Building"}
          </span>
          {settings.resumeUrl && (
            <a 
              href={settings.resumeUrl} 
              target="_blank" 
              className="text-[10px] font-mono text-black bg-gold px-5 py-2 rounded-full uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(255,184,0,0.2)]"
            >
              Download Dossier
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
