"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Terminal, ShieldAlert, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-[#FFB800] flex flex-col items-center justify-center p-6 font-mono selection:bg-[#FFB800] selection:text-black">
      <div className="max-w-2xl w-full border border-[#FFB800]/20 bg-[#FFB800]/5 p-8 rounded-2xl relative overflow-hidden">
        {/* Scanning Line Effect */}
        <motion.div 
          animate={{ y: ["0%", "1000%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 h-1 bg-[#FFB800]/10 pointer-events-none z-10"
        />

        <div className="flex items-center gap-4 mb-8 border-b border-[#FFB800]/20 pb-6">
          <ShieldAlert size={32} className="animate-pulse" />
          <h1 className="text-2xl md:text-3xl font-display uppercase tracking-tighter">System Error: 404</h1>
        </div>

        <div className="space-y-4 text-sm md:text-base leading-relaxed mb-12 opacity-80">
          <p className="flex items-center gap-2">
            <span className="text-[#FFB800]/40">[TIMESTAMP]:</span> {new Date().toISOString()}
          </p>
          <p className="flex items-center gap-2">
            <span className="text-[#FFB800]/40">[STATUS]:</span> CRITICAL_FAILURE
          </p>
          <p className="flex items-center gap-2">
            <span className="text-[#FFB800]/40">[MESSAGE]:</span> The requested nexus node does not exist in the current mainframe. Unauthorized access to null-space detected.
          </p>
          <p className="pt-4 border-t border-[#FFB800]/10 animate-pulse">
            &gt; INITIALIZING_RECOVERY_PROTOCOL...
          </p>
        </div>

        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 184, 0, 1)", color: "#000" }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-3 border border-[#FFB800] px-8 py-4 rounded-xl transition-all cursor-pointer group"
          >
            <Home size={18} className="group-hover:text-black" />
            <span className="uppercase font-display tracking-widest text-lg">Return to Mainframe</span>
          </motion.div>
        </Link>
      </div>

      <div className="mt-8 text-[10px] opacity-20 uppercase tracking-[0.5em] flex gap-8">
        <span>Atharva Kulkarni // Studio OS</span>
        <span>Build: v1.1.0-Production</span>
      </div>
    </div>
  );
}
