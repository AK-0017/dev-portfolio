"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, ArrowUpRight, PenTool } from "lucide-react";

import { WritingEntry } from "@/types/writing";

export default function Writing() {
  const [writings, setWritings] = useState<WritingEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/writing")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setWritings(data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);
  return (
    <section id="writing" className="relative px-6 md:px-24 py-32 max-w-7xl mx-auto">
      <div className="flex flex-col gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex items-center gap-6"
        >
          <div className="w-12 h-12 bg-gold/10 border border-gold/20 flex items-center justify-center rounded-xl text-gold">
            <PenTool size={20} />
          </div>
          <h3 className="text-4xl md:text-6xl font-display uppercase tracking-tighter">
            LITERARY / <span className="text-gold">ARCHIVES</span>
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            [1, 2, 3].map((n) => (
              <div key={n} className="bg-white/5 border border-white/10 p-8 rounded-3xl h-[400px] relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
                <div className="h-4 bg-white/10 w-24 rounded-full mb-4" />
                <div className="h-8 bg-white/10 w-full rounded mb-6" />
                <div className="space-y-2">
                  <div className="h-4 bg-white/10 w-full rounded" />
                  <div className="h-4 bg-white/10 w-full rounded" />
                  <div className="h-4 bg-white/10 w-3/4 rounded" />
                </div>
              </div>
            ))
          ) : writings.length === 0 ? (
            <div className="col-span-full py-20 text-center border border-dashed border-white/5 rounded-3xl">
              <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">No transmissions archived in this sector</p>
            </div>
          ) : (
            writings.map((item, idx) => (
              <motion.div
                key={item._id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group p-8 bg-white/[0.02] border border-white/5 rounded-3xl hover:border-gold/30 hover:bg-gold/[0.02] transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gold/5 group-hover:bg-gold/20 transition-colors" />
                
                <div className="flex justify-between items-start mb-8">
                  <span className="text-[10px] font-mono text-gold/40 uppercase tracking-[0.3em] font-bold">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-mono text-white/10 uppercase">
                    [{item.date}]
                  </span>
                </div>

                <h4 className="text-2xl font-display uppercase tracking-widest mb-6 leading-tight group-hover:text-gold transition-colors">
                  {item.title}
                </h4>

                <p className="text-sm text-white/40 font-sans leading-relaxed mb-12 italic">
                   "{item.excerpt}"
                </p>

                {item.link && item.link !== "#" && (
                  <motion.a 
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-white/20 group-hover:text-gold transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    READ_TRANSMISSION <ArrowUpRight size={12} />
                  </motion.a>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
