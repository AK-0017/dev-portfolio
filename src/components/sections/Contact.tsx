"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { ArrowUpRight, Terminal, Wifi, ShieldCheck, Mail } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [systemLog, setSystemLog] = useState<string[]>(["SIGNAL_STRENGTH: OPTIMAL", "PROTOCOL: SECURE_END_TO_END"]);

  const [copied, setCopied] = useState(false);
  const [settings, setSettings] = useState({ isAvailable: true, resumeUrl: "" });
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => setSettings({ isAvailable: data.isAvailable, resumeUrl: data.resumeUrl }))
      .catch(err => console.error(err));
  }, []);
  
  // Holographic Glare Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const glareX = useTransform(mouseX, [0, 400], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [0, 600], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("atharvakulkarni211@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setSystemLog(prev => [...prev, "CLIPBOARD_ACCESS: SUCCESS", "PACKET_COPIED"]);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setSystemLog(prev => [...prev, "ERROR: MISSING_REQUIRED_PACKETS"]);
      return;
    }

    setStatus("sending");
    setSystemLog(prev => [...prev, "ENCRYPTING_TRANSMISSION...", "INITIALIZING_HANDSHAKE..."]);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setSystemLog(prev => [...prev, "PACKETS_ACCEPTED", "TRANSMISSION_COMPLETE"]);
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Link failure");
      }
    } catch (e) {
      setStatus("error");
      setSystemLog(prev => [...prev, "CRITICAL_FAILURE: LINK_TIMEOUT"]);
    }
  };

  return (
    <section className="relative px-6 md:px-24 pb-48 max-w-7xl mx-auto flex flex-col overflow-hidden">
      {/* Background Decorative Text */}
      <div className="absolute top-1/2 left-8 -translate-y-1/2 select-none pointer-events-none opacity-[0.05]">
        <h1 className="text-[20vw] md:text-[30rem] font-display leading-none text-white">CONNECT</h1>
      </div>

      <div className="relative z-10">
        <motion.h3 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="text-4xl md:text-6xl font-display mb-24 md:mb-32"
        >
          COMMUNICATION / <span className="text-gold">CORE</span>
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left: Terminal Form Hub (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="md:col-span-7 flex flex-col gap-12"
          >
            <form onSubmit={handleSend} className="space-y-10">
              <div className="group relative">
                <span className="text-[10px] font-mono text-gold/60 uppercase tracking-[0.4em] mb-3 flex items-center gap-2">
                  <Terminal size={10} /> 01 // Identification
                </span>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="EX: ATHARVA KULKARNI" 
                  className="w-full bg-white/[0.02] border border-white/5 p-6 font-display text-2xl uppercase focus:border-gold/50 focus:bg-white/[0.05] outline-none transition-all placeholder:text-white/5 rounded-2xl"
                />
              </div>

              <div className="group relative">
                <span className="text-[10px] font-mono text-gold/60 uppercase tracking-[0.4em] mb-3 flex items-center gap-2">
                  <Mail size={10} /> 02 // Protocol
                </span>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="EX: HELLO@DOMAIN.COM" 
                  className="w-full bg-white/[0.02] border border-white/5 p-6 font-display text-2xl uppercase focus:border-gold/50 focus:bg-white/[0.05] outline-none transition-all placeholder:text-white/5 rounded-2xl"
                />
              </div>

              <div className="group relative">
                <span className="text-[10px] font-mono text-gold/60 uppercase tracking-[0.4em] mb-3 flex items-center gap-2">
                  <Terminal size={10} /> 03 // Transmission_Content
                </span>
                <textarea 
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="ENCRYPT YOUR MESSAGE HERE..." 
                  className="w-full bg-white/[0.02] border border-white/5 p-6 font-display text-2xl uppercase focus:border-gold/50 focus:bg-white/[0.05] outline-none transition-all placeholder:text-white/5 resize-none rounded-2xl"
                />
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={status === "sending"}
                  className="w-full md:w-fit px-16 py-5 bg-gold text-black font-display text-xl uppercase tracking-widest hover:bg-white transition-colors relative overflow-hidden rounded-xl"
                >
                  {status === "sending" && (
                    <motion.div 
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-white/40"
                    />
                  )}
                  <span className="relative z-10">
                    {status === "sending" ? "Transmitting..." : status === "success" ? "Transmission_Complete" : "Initialize Transmission"}
                  </span>
                </motion.button>

                {/* System Log Feed */}
                <div className="flex-grow bg-black/40 border border-white/5 rounded-xl p-4 font-mono text-[9px] uppercase tracking-widest text-foreground/40 min-h-[80px] flex flex-col justify-center gap-1">
                  {systemLog.slice(-3).map((log, i) => (
                    <div key={i} className={`flex items-center gap-2 ${log.includes('CRITICAL') ? 'text-red-500' : log.includes('COMPLETE') ? 'text-gold' : ''}`}>
                      {i === 2 && <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${status === 'error' ? 'bg-red-500' : 'bg-green-500'}`} />}
                      <span>&gt; {log}</span>
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </motion.div>

          {/* Right: Digital Hologram ID (5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-12">
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="p-8 md:p-12 bg-white/5 border border-white/10 rounded-[3rem] relative overflow-hidden group cursor-crosshair"
            >
              {/* Holographic Glare Overlay */}
              <motion.div 
                className="absolute inset-0 pointer-events-none z-20"
                style={{ 
                  background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,184,0,0.15) 0%, transparent 40%)` 
                }}
              />

              <div className="absolute top-0 right-0 p-8">
                <ShieldCheck className="text-gold/20" size={40} />
              </div>

              <div className="relative z-30">
                <h4 className="text-4xl md:text-5xl font-display mb-6 uppercase leading-none">ATHARVA <br /> KULKARNI</h4>
                <div className="flex items-center gap-4 mb-16">
                  <span className="text-[10px] font-mono text-gold uppercase tracking-[0.5em] px-3 py-1 bg-gold/10 rounded-full border border-gold/20">
                    {settings.isAvailable ? "Open To Opportunities" : "Currently Building"}
                  </span>
                  <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${settings.isAvailable ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-red-500 shadow-[0_0_10px_#ef4444]'}`} />
                </div>

                <div className="flex flex-col gap-4">
                  <button 
                    onClick={copyEmail}
                    className="w-full p-6 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-between group hover:border-gold/30 transition-all text-left"
                  >
                    <div className="flex flex-col items-start gap-1">
                      <span className="text-[9px] font-mono text-gold/60 uppercase">Primary Email</span>
                      <span className="text-lg font-display tracking-tight uppercase">atharvakulkarni211@gmail.com</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold group-hover:text-black transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </button>

                  <a 
                    href="https://linkedin.com/in/atharva-kulkarni-1087b4333"
                    target="_blank"
                    className="w-full p-6 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-between group hover:border-gold/30 transition-all text-left"
                  >
                    <div className="flex flex-col items-start gap-1">
                      <span className="text-[9px] font-mono text-gold/60 uppercase">Professional Network</span>
                      <span className="text-lg font-display tracking-tight uppercase">LinkedIn Profile</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold group-hover:text-black transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </a>

                  {settings.resumeUrl && (
                    <motion.a 
                      href={settings.resumeUrl}
                      target="_blank"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="w-full p-6 bg-gold/[0.03] border border-gold/10 rounded-2xl flex items-center justify-between group hover:border-gold/40 transition-all text-left"
                    >
                      <div className="flex flex-col items-start gap-1">
                        <span className="text-[9px] font-mono text-gold uppercase">Credentials_Manifest</span>
                        <span className="text-lg font-display tracking-tight uppercase">Download Dossier</span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center group-hover:bg-gold group-hover:text-black transition-colors border border-gold/20">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </motion.a>
                  )}
                </div>
              </div>

              <AnimatePresence>
                {copied && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 px-6 py-3 bg-gold text-black font-mono text-[10px] font-bold uppercase rounded-full shadow-[0_0_30px_rgba(255,184,0,0.4)] z-50"
                  >
                    Packet Copied
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Social Channels - High Tech Handles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "GitHub", val: "ak-0017", href: "https://github.com/ak-0017" },
                { label: "Instagram", val: "@ak_mere_khwab", href: "https://instagram.com/ak_mere_khwab" },
                { label: "LinkedIn", val: "/atharva-k", href: "#" },
                { label: "Phone_Line", val: "+91 7020616259", href: "tel:+917020616259" },
              ].map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-gold/30 hover:bg-gold/[0.03] transition-all text-left group flex flex-col"
                >
                  <span className="text-[9px] font-mono text-foreground/20 uppercase mb-2 group-hover:text-gold/60 transition-colors">{link.label}</span>
                  <span className="text-xl font-display group-hover:text-foreground transition-colors">{link.val}</span>
                </motion.a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
