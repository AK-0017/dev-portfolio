"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Plus, Trash2, Terminal, ShieldAlert, Lock, Unlock, Zap, Target, Image as ImageIcon, Upload, Code, Edit3, X, MessageSquare, AlertTriangle, Layers, BarChart3, BookOpen, PenTool } from "lucide-react";
import { Project } from "@/types/project";
import { StackCategory, Skill } from "@/types/stack";
import { Communication } from "@/types/communication";
import Script from "next/script";

export default function AdminPage() {
  const [authorized, setAuthorized] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"projects" | "stack" | "communication" | "system" | "library">("projects");

  // Project States
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [savingProject, setSavingProject] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  
  const resetProject = (): Partial<Project> => ({
    id: String(projects.length + 1).padStart(2, '0'),
    title: "",
    image: "",
    description: "",
    role: "Developer",
    mission: "",
    strategy: "",
    impact: "",
    techStack: [],
    links: { live: "", github: "" },
    metrics: [],
    modules: [],
  });

  const [newProject, setNewProject] = useState<Partial<Project>>(resetProject());

  // Stack States
  const [stack, setStack] = useState<StackCategory[]>([]);
  const [loadingStack, setLoadingStack] = useState(true);
  const [savingStack, setSavingStack] = useState(false);
  const [editingStackId, setEditingStackId] = useState<string | null>(null);
  
  const resetStack = (): Partial<StackCategory> => ({
    id: String(stack.length + 1).padStart(2, '0'),
    title: "",
    icon: "Code",
    skills: [{ name: "", level: 80 }],
  });

  const [newStack, setNewStack] = useState<Partial<StackCategory>>(resetStack());

  // Communication States
  const [comms, setComms] = useState<Communication[]>([]);
  const [loadingComms, setLoadingComms] = useState(true);

  // System States
  const [settings, setSettings] = useState({ isAvailable: true, resumeUrl: "" });
  const [savingSettings, setSavingSettings] = useState(false);

  // Writing States
  const [writings, setWritings] = useState<any[]>([]);
  const [loadingWritings, setLoadingWritings] = useState(true);
  const [savingWriting, setSavingWriting] = useState(false);
  const [editingWritingId, setEditingWritingId] = useState<string | null>(null);

  const resetWriting = () => ({
    id: String(writings.length + 1).padStart(2, '0'),
    title: "",
    category: "Philosophy / Narrative",
    excerpt: "",
    date: new Date().getFullYear().toString(),
    link: ""
  });

  const [newWriting, setNewWriting] = useState<any>(resetWriting());

  useEffect(() => {
    if (authorized) {
      if (activeTab === "projects") fetchProjects();
      if (activeTab === "stack") fetchStack();
      if (activeTab === "communication") fetchComms();
      if (activeTab === "system") fetchSettings();
      if (activeTab === "library") fetchWritings();
    }
  }, [authorized, activeTab]);

  useEffect(() => {
    if (!editingProjectId) {
      setNewProject(prev => ({ ...prev, id: String(projects.length + 1).padStart(2, '0') }));
    }
  }, [projects.length, editingProjectId]);

  const handleUpload = () => {
    // @ts-ignore
    if (typeof window !== "undefined" && window.cloudinary) {
      // @ts-ignore
      const widget = window.cloudinary.createUploadWidget(
        {
          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dlczt2fhf", 
          uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "portfolio_preset",
          theme: "dark",
        },
        (error: any, result: any) => {
          if (!error && result && result.event === "success") {
            setNewProject(prev => ({ ...prev, image: result.info.secure_url }));
          }
        }
      );
      widget.open();
    }
  };

  const handleAuthorize = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "ATHARVA-01") {
      setAuthorized(true);
      setError("");
    } else {
      setError("AUTHORIZATION_REJECTED: INVALID_CREDENTIALS");
      setPasscode("");
    }
  };

  // --- PROJECT HANDLING ---
  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (Array.isArray(data)) setProjects(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingProjects(false);
    }
  };

  const handleEditProject = (project: Project) => {
    setNewProject(project);
    setEditingProjectId(project._id || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Confirm Permanent Deletion?")) return;
    try {
      await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
      fetchProjects();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveProject = async () => {
    setSavingProject(true);
    try {
      const method = editingProjectId ? "PUT" : "POST";
      const res = await fetch("/api/projects", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProjectId ? { ...newProject, _id: editingProjectId } : newProject),
      });
      if (res.ok) {
        setEditingProjectId(null);
        setNewProject(resetProject());
        fetchProjects();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSavingProject(false);
    }
  };

  // --- STACK HANDLING ---
  const fetchStack = async () => {
    try {
      const res = await fetch("/api/stack");
      const data = await res.json();
      if (Array.isArray(data)) setStack(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingStack(false);
    }
  };

  const handleEditStack = (category: StackCategory) => {
    setNewStack(category);
    setEditingStackId(category._id || null);
  };

  const handleDeleteStack = async (id: string) => {
    if (!confirm("Delete Skill Category?")) return;
    try {
      await fetch(`/api/stack?id=${id}`, { method: "DELETE" });
      fetchStack();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveStack = async () => {
    setSavingStack(true);
    try {
      const method = editingStackId ? "PUT" : "POST";
      const res = await fetch("/api/stack", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingStackId ? { ...newStack, _id: editingStackId } : newStack),
      });
      if (res.ok) {
        setEditingStackId(null);
        setNewStack(resetStack());
        fetchStack();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSavingStack(false);
    }
  };

  // --- COMMUNICATION HANDLING ---
  const fetchComms = async () => {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      if (Array.isArray(data)) setComms(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingComms(false);
    }
  };

  const handleDeleteComm = async (id: string) => {
    if (!confirm("Delete this transmission?")) return;
    try {
      await fetch(`/api/contact?id=${id}`, { method: "DELETE" });
      fetchComms();
    } catch (e) {
      console.error(e);
    }
  };

  // --- SYSTEM HANDLING ---
  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      setSettings({ isAvailable: data.isAvailable, resumeUrl: data.resumeUrl });
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveSettings = async () => {
    setSavingSettings(true);
    try {
      await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
    } catch (e) {
      console.error(e);
    } finally {
      setSavingSettings(false);
    }
  };

  // --- WRITING HANDLING ---
  const fetchWritings = async () => {
    try {
      const res = await fetch("/api/writing");
      const data = await res.json();
      if (Array.isArray(data)) setWritings(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingWritings(false);
    }
  };

  const handleEditWriting = (entry: any) => {
    setNewWriting(entry);
    setEditingWritingId(entry._id || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteWriting = async (id: string) => {
    if (!confirm("Delete this literary entry?")) return;
    try {
      await fetch(`/api/writing/${id}`, { method: "DELETE" });
      fetchWritings();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveWriting = async () => {
    setSavingWriting(true);
    try {
      const method = editingWritingId ? "PUT" : "POST";
      const url = editingWritingId ? `/api/writing/${editingWritingId}` : "/api/writing";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newWriting),
      });
      if (res.ok) {
        setEditingWritingId(null);
        setNewWriting(resetWriting());
        fetchWritings();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSavingWriting(false);
    }
  };

  const handleSecurityPurge = async () => {
    if (!confirm("CRITICAL: THIS WILL DELETE ALL PROJECTS AND STACK DATA. PROCEED?")) return;
    const passcode = prompt("Enter ADMIN_PASSCODE to confirm purge:");
    if (passcode !== "ATHARVA-01") return alert("ACCESS_DENIED");
    
    try {
      // We'll use our seed script logic but to empty it
      setSavingSettings(true);
      // This is a manual way to clear via individual deletes if we don't have a bulk API
      for (const p of projects) await fetch(`/api/projects?id=${p._id}`, { method: "DELETE" });
      for (const s of stack) await fetch(`/api/stack?id=${s._id}`, { method: "DELETE" });
      fetchProjects();
      fetchStack();
      alert("SYSTEM_PURGE_COMPLETE");
    } catch (e) {
      console.error(e);
    } finally {
      setSavingSettings(false);
    }
  };

  if (!authorized) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 bg-[radial-gradient(circle_at_center,rgba(255,184,0,0.05)_0%,transparent_70%)]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white/[0.02] border border-white/10 rounded-3xl p-12 backdrop-blur-xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gold/20" />
          <div className="flex flex-col items-center gap-8">
            <div className="w-16 h-16 bg-gold/10 border border-gold/30 rounded-2xl flex items-center justify-center text-gold">
              <ShieldAlert size={32} />
            </div>
            <div className="text-center space-y-2">
              <h1 className="text-xl font-display uppercase tracking-widest text-white">System Authorization</h1>
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">Restricted Access / Level 01</p>
            </div>
            
            <form onSubmit={handleAuthorize} className="w-full space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase text-white/20 tracking-widest block ml-2">Access_Token</label>
                <div className="relative">
                  <input 
                    type="password" 
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-black border border-white/10 rounded-xl px-6 py-4 font-mono text-center tracking-[0.5em] focus:border-gold outline-none transition-all placeholder:text-white/5"
                  />
                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-white/10" size={16} />
                </div>
              </div>
              {error && <p className="text-red-500 font-mono text-[9px] uppercase text-center animate-pulse">{error}</p>}
              <button type="submit" className="w-full h-14 bg-gold text-black rounded-xl font-mono text-xs uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2">
                Initialize Login
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-gold/30">
      <Script src="https://upload-widget.cloudinary.com/global/all.js" strategy="afterInteractive" />
      
      {/* Cinematic Header */}
      <div className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gold/10 border border-gold/20 flex items-center justify-center rounded">
              <Terminal size={16} className="text-gold" />
            </div>
            <h1 className="text-xl font-display uppercase tracking-widest">Control <span className="text-gold">Center</span></h1>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
              <button 
                onClick={() => setActiveTab("projects")}
                className={`px-4 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-widest transition-all ${activeTab === "projects" ? "bg-gold text-black" : "text-white/40 hover:text-white"}`}
              >
                Projects
              </button>
              <button 
                onClick={() => setActiveTab("stack")}
                className={`px-4 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-widest transition-all ${activeTab === "stack" ? "bg-gold text-black" : "text-white/40 hover:text-white"}`}
              >
                Stack
              </button>
              <button 
                onClick={() => setActiveTab("communication")}
                className={`px-4 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-widest transition-all ${activeTab === "communication" ? "bg-gold text-black" : "text-white/40 hover:text-white"}`}
              >
                Comms
              </button>
              <button 
                onClick={() => setActiveTab("library")}
                className={`px-4 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-widest transition-all ${activeTab === "library" ? "bg-gold text-black" : "text-white/40 hover:text-white"}`}
              >
                Writing
              </button>
              <button 
                onClick={() => setActiveTab("system")}
                className={`px-4 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-widest transition-all ${activeTab === "system" ? "bg-gold text-black" : "text-white/40 hover:text-white"}`}
              >
                System
              </button>
            </div>
            <button onClick={() => setAuthorized(false)} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg font-mono text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
              <Unlock size={12} /> Logout
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {activeTab === "projects" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <section className="space-y-8 h-fit lg:sticky lg:top-32">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-gold/60 flex items-center gap-2">
                  <Zap size={14} /> {editingProjectId ? "Modify_Dossier" : "Initialize_Dossier"}
                </h2>
                {editingProjectId && (
                  <button onClick={() => { setEditingProjectId(null); setNewProject(resetProject()); }} className="text-[10px] font-mono text-white/30 hover:text-white flex items-center gap-1">
                    <X size={12} /> Cancel_Edit
                  </button>
                )}
              </div>

              <div className="bg-white/5 border border-white/5 p-8 rounded-2xl space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar pr-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono uppercase text-white/20 tracking-wider">ID_Key (Numeric)</label>
                    <input type="text" value={newProject.id || ""} onChange={(e) => setNewProject({ ...newProject, id: e.target.value })} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-xs focus:border-gold outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono uppercase text-white/20 tracking-wider">Designation / Role</label>
                    <input type="text" value={newProject.role || ""} onChange={(e) => setNewProject({ ...newProject, role: e.target.value })} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-xs focus:border-gold outline-none" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-white/20 tracking-wider">Official_Title</label>
                  <input type="text" value={newProject.title || ""} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm font-display uppercase tracking-widest focus:border-gold outline-none" />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-white/20 tracking-wider">Project_Visual_Transmission</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="https://cloudinary.com/..." 
                      value={newProject.image || ""} 
                      onChange={(e) => setNewProject({ ...newProject, image: e.target.value })} 
                      className="flex-1 bg-black border border-white/10 rounded-lg px-4 py-3 text-xs focus:border-gold outline-none" 
                    />
                    <button onClick={handleUpload} className="px-4 bg-white/5 border border-white/10 rounded-lg hover:bg-gold hover:text-black transition-all flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest whitespace-nowrap">
                      <Upload size={14} /> Transmit
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-white/20 tracking-wider">Mission_Statement (Short)</label>
                  <textarea value={newProject.mission || ""} onChange={(e) => setNewProject({ ...newProject, mission: e.target.value })} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-xs focus:border-gold outline-none min-h-[60px] resize-none" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono uppercase text-white/20 tracking-wider">Strategy_Brief</label>
                    <textarea value={newProject.strategy || ""} onChange={(e) => setNewProject({ ...newProject, strategy: e.target.value })} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-xs focus:border-gold outline-none min-h-[80px] resize-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono uppercase text-white/20 tracking-wider">Impact_Metric</label>
                    <textarea value={newProject.impact || ""} onChange={(e) => setNewProject({ ...newProject, impact: e.target.value })} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-xs focus:border-gold outline-none min-h-[80px] resize-none" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-white/20 tracking-wider">Full_Description</label>
                  <textarea value={newProject.description || ""} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-xs focus:border-gold outline-none min-h-[80px] resize-none" />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-white/20 tracking-wider">Tech_Stack (Comma Separated)</label>
                  <input type="text" value={newProject.techStack?.join(', ') || ""} onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value.split(',').map(s => s.trim()) })} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-xs focus:border-gold outline-none" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono uppercase text-white/20 tracking-wider">Live_URL</label>
                    <input type="text" value={newProject.links?.live || ""} onChange={(e) => setNewProject({ ...newProject, links: { ...newProject.links!, live: e.target.value } })} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-xs focus:border-gold outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono uppercase text-white/20 tracking-wider">Source_URL</label>
                    <input type="text" value={newProject.links?.github || ""} onChange={(e) => setNewProject({ ...newProject, links: { ...newProject.links!, github: e.target.value } })} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-xs focus:border-gold outline-none" />
                  </div>
                </div>

                {/* Metrics Section */}
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <div className="flex items-center justify-between">
                    <label className="text-[9px] font-mono uppercase text-gold/40 tracking-wider">Dynamic_Metrics</label>
                    <button onClick={() => setNewProject({...newProject, metrics: [...(newProject.metrics || []), {label: "", value: "", unit: ""}]})} className="text-[9px] font-mono text-gold hover:underline">Add_Metric</button>
                  </div>
                  {newProject.metrics?.map((m, i) => (
                    <div key={i} className="flex gap-2">
                      <input placeholder="Label" value={m.label} onChange={(e) => {
                        const next = [...(newProject.metrics || [])];
                        next[i].label = e.target.value;
                        setNewProject({...newProject, metrics: next});
                      }} className="flex-1 bg-black border border-white/5 rounded p-2 text-[10px]" />
                      <input placeholder="Value" value={m.value} onChange={(e) => {
                        const next = [...(newProject.metrics || [])];
                        next[i].value = e.target.value;
                        setNewProject({...newProject, metrics: next});
                      }} className="w-20 bg-black border border-white/5 rounded p-2 text-[10px]" />
                      <input placeholder="Unit" value={m.unit} onChange={(e) => {
                        const next = [...(newProject.metrics || [])];
                        next[i].unit = e.target.value;
                        setNewProject({...newProject, metrics: next});
                      }} className="w-16 bg-black border border-white/5 rounded p-2 text-[10px]" />
                      <button onClick={() => {
                        const next = newProject.metrics?.filter((_, idx) => idx !== i);
                        setNewProject({...newProject, metrics: next});
                      }} className="text-white/10 hover:text-red-500"><Trash2 size={14}/></button>
                    </div>
                  ))}
                </div>

                <button onClick={handleSaveProject} disabled={savingProject} className="w-full h-14 bg-gold text-black rounded-xl font-mono text-xs uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2 mt-4">
                  <Save size={16} /> {savingProject ? "Processing..." : editingProjectId ? "Update_Dossier" : "Execute_Update"}
                </button>
              </div>
            </section>

            <section className="space-y-8">
              <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-gold/60 flex items-center gap-2">
                <Target size={14} /> Project_Repository
              </h2>
              <div className="space-y-4">
                {loadingProjects ? (
                  <div className="animate-pulse space-y-4">
                    {[1, 2, 3].map(i => <div key={i} className="h-28 bg-white/5 rounded-2xl" />)}
                  </div>
                ) : projects.map((project) => (
                  <div key={project._id} className="bg-white/5 border border-white/10 p-6 rounded-2xl group flex items-center justify-between hover:border-white/20 transition-all">
                    <div>
                      <span className="text-[10px] font-mono text-gold mb-1 block uppercase tracking-[0.3em]">{project.id}</span>
                      <h3 className="text-xl font-display uppercase tracking-widest">{project.title}</h3>
                      <p className="text-[10px] font-mono text-white/30 truncate max-w-sm mt-1">{project.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEditProject(project)} className="p-2 text-white/20 hover:text-gold transition-all">
                        <Edit3 size={18} />
                      </button>
                      <button onClick={() => handleDeleteProject(project._id!)} className="p-2 text-white/20 hover:text-red-500 transition-all">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === "stack" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <section className="space-y-8 h-fit lg:sticky lg:top-32">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-gold/60 flex items-center gap-2">
                  <Layers size={14} /> {editingStackId ? "Modify_Skill_Category" : "New_Skill_Category"}
                </h2>
                {editingStackId && (
                  <button onClick={() => { setEditingStackId(null); setNewStack(resetStack()); }} className="text-[10px] font-mono text-white/30 hover:text-white flex items-center gap-1">
                    <X size={12} /> Cancel_Edit
                  </button>
                )}
              </div>

              <div className="bg-white/5 border border-white/5 p-8 rounded-2xl space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono uppercase text-white/20 tracking-wider">Index_ID</label>
                    <input type="text" value={newStack.id || ""} onChange={(e) => setNewStack({ ...newStack, id: e.target.value })} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-xs focus:border-gold outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono uppercase text-white/20 tracking-wider">Category_Icon</label>
                    <input type="text" value={newStack.icon || ""} placeholder="Code, Zap, Shield, etc." onChange={(e) => setNewStack({ ...newStack, icon: e.target.value })} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-xs focus:border-gold outline-none" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-white/20 tracking-wider">Category_Title</label>
                  <input type="text" value={newStack.title || ""} placeholder="Frontend Engineering" onChange={(e) => setNewStack({ ...newStack, title: e.target.value })} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm font-display uppercase tracking-widest focus:border-gold outline-none" />
                </div>

                <div className="space-y-4 pt-4 border-t border-white/5">
                  <div className="flex items-center justify-between">
                    <label className="text-[9px] font-mono uppercase text-gold/40 tracking-wider font-bold">Skills_Matrix</label>
                    <button onClick={() => setNewStack({...newStack, skills: [...(newStack.skills || []), {name: "", level: 80}]})} className="text-[9px] font-mono text-gold hover:underline">Add_Skill</button>
                  </div>
                  {newStack.skills?.map((skill, i) => (
                    <div key={i} className="space-y-2 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                      <div className="flex gap-2 items-center">
                        <input placeholder="Skill Name" value={skill.name} onChange={(e) => {
                          const s = [...(newStack.skills || [])];
                          s[i] = { ...s[i], name: e.target.value };
                          setNewStack({...newStack, skills: s});
                        }} className="flex-1 bg-black border border-white/5 rounded p-2 text-[10px]" />
                        <input type="number" placeholder="%" value={skill.level} onChange={(e) => {
                          const s = [...(newStack.skills || [])];
                          s[i] = { ...s[i], level: Number(e.target.value) };
                          setNewStack({...newStack, skills: s});
                        }} className="w-16 bg-black border border-white/5 rounded p-2 text-[10px]" />
                        <button onClick={() => {
                          const s = newStack.skills?.filter((_, index) => index !== i);
                          setNewStack({...newStack, skills: s});
                        }} className="text-white/10 hover:text-red-500"><Trash2 size={14}/></button>
                      </div>
                      <input 
                        placeholder="Mission/Description (e.g. React framework for production)" 
                        value={skill.desc || ""} 
                        onChange={(e) => {
                          const s = [...(newStack.skills || [])];
                          s[i] = { ...s[i], desc: e.target.value };
                          setNewStack({...newStack, skills: s});
                        }} 
                        className="w-full bg-black border border-white/5 rounded p-2 text-[9px] text-white/40" 
                      />
                    </div>
                  ))}
                </div>

                <button onClick={handleSaveStack} disabled={savingStack} className="w-full h-14 bg-gold text-black rounded-xl font-mono text-xs uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2">
                  <Save size={16} /> {savingStack ? "Syncing..." : editingStackId ? "Update_Category" : "Store_Category"}
                </button>
              </div>
            </section>

            <section className="space-y-8">
              <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-gold/60 flex items-center gap-2">
                <Code size={14} /> Technical_Matrix
              </h2>
              <div className="space-y-4">
                {loadingStack ? (
                   <div className="animate-pulse space-y-4">
                     {[1, 2].map(i => <div key={i} className="h-32 bg-white/5 rounded-2xl" />)}
                   </div>
                ) : stack.map((item) => (
                  <div key={item._id} className="bg-white/5 border border-white/10 p-6 rounded-2xl group flex items-center justify-between hover:border-white/20 transition-all">
                    <div>
                      <span className="text-[10px] font-mono text-gold mb-1 block uppercase tracking-[0.3em]">{item.id}</span>
                      <h3 className="text-xl font-display uppercase tracking-widest">{item.title}</h3>
                      <div className="flex gap-2 mt-2">
                        {item.skills.map(s => <span key={s.name} className="text-[8px] font-mono text-white/30 uppercase border border-white/5 px-2 py-0.5 rounded">{s.name}</span>)}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEditStack(item)} className="p-2 text-white/20 hover:text-gold transition-all">
                        <Edit3 size={18} />
                      </button>
                      <button onClick={() => handleDeleteStack(item._id!)} className="p-2 text-white/20 hover:text-red-500 transition-all">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === "communication" && (
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-gold/60 flex items-center gap-2">
                <MessageSquare size={14} /> Communication_Repository
              </h2>
              <button onClick={fetchComms} className="text-[10px] font-mono text-white/20 hover:text-gold transition-colors underline">Refresh_Feed</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loadingComms ? (
                <div className="animate-pulse col-span-2 space-y-4">
                  {[1, 2, 3].map(i => <div key={i} className="h-32 bg-white/5 rounded-2xl" />)}
                </div>
              ) : comms.length === 0 ? (
                <div className="col-span-2 p-20 text-center border border-dashed border-white/5 rounded-3xl">
                  <p className="text-[10px] font-mono text-white/10 uppercase tracking-widest">No intercepted transmissions detected</p>
                </div>
              ) : (
                comms.map((msg) => (
                  <motion.div 
                    key={msg._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 border border-white/10 p-8 rounded-3xl group relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gold/10" />
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex-1 pr-4">
                        <span className="text-[9px] font-mono text-gold uppercase tracking-[0.2em] mb-1 block">Transmission_Identity: {msg._id?.slice(-6).toUpperCase()}</span>
                        <h3 className="text-2xl font-display uppercase tracking-tight">{msg.name}</h3>
                        <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest italic">{msg.email}</p>
                      </div>
                      <button onClick={() => msg._id && handleDeleteComm(msg._id)} className="p-3 bg-red-500/10 text-red-500 rounded-xl border border-red-500/20 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="bg-black/40 border border-white/5 p-4 rounded-xl mt-4">
                      <p className="text-sm text-white/70 font-sans leading-relaxed">
                        "{msg.message}"
                      </p>
                    </div>
                    <div className="mt-6 flex justify-between items-center text-[8px] font-mono text-white/20 uppercase tracking-widest">
                      <span>STATUS: RECOVERED_SUCCESS</span>
                      <span>TIMESTAMP: {new Date(msg.timestamp).toLocaleString()}</span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </section>
        )}

        {activeTab === "system" && (
          <section className="max-w-2xl mx-auto space-y-12">
            <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-gold/60 flex items-center gap-2">
              <Zap size={14} /> Global_System_Protocols
            </h2>

            <div className="bg-white/5 border border-white/10 p-12 rounded-[2.5rem] space-y-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gold/30" />
              
              <div className="flex items-center justify-between p-8 bg-black/40 border border-white/5 rounded-3xl group hover:border-gold/20 transition-all">
                <div>
                  <h3 className="text-xl font-display uppercase tracking-widest">Availability_Protocol</h3>
                  <p className="text-[10px] font-mono text-white/30 uppercase mt-1 tracking-widest">Control real-time recruiter visibility</p>
                </div>
                <button 
                  onClick={() => setSettings({...settings, isAvailable: !settings.isAvailable})}
                  className={`w-20 h-10 rounded-full relative transition-all duration-500 p-1 ${settings.isAvailable ? 'bg-green-500' : 'bg-red-500/20 border border-red-500/30'}`}
                >
                  <motion.div 
                    animate={{ x: settings.isAvailable ? 40 : 2 }}
                    className="w-8 h-8 bg-white rounded-full shadow-2xl flex items-center justify-center text-[10px] font-bold text-black"
                  >
                    {settings.isAvailable ? 'ON' : 'OFF'}
                  </motion.div>
                </button>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] block ml-4 flex items-center gap-2">
                  <Target size={12} className="text-gold/60" /> Resume_Transmission_Nexus
                </label>
                <div className="relative group">
                  <input 
                    type="text" 
                    value={settings.resumeUrl || ""}
                    onChange={(e) => setSettings({...settings, resumeUrl: e.target.value})}
                    placeholder="ENTER CLOUDINARY_VAULT_URL..."
                    className="w-full bg-black/60 border border-white/10 rounded-2xl px-8 py-6 font-mono text-xs focus:border-gold outline-none transition-all placeholder:text-white/5"
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20">
                    <ShieldAlert size={20} />
                  </div>
                </div>
              </div>

              <div className="pt-12 border-t border-white/5 flex flex-col gap-6">
                <div className="flex items-center gap-4 text-red-500/40 p-4 border border-red-500/10 rounded-2xl bg-red-500/[0.02]">
                  <AlertTriangle size={24} />
                  <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-widest font-bold">Security_Warning</h4>
                    <p className="text-[9px] font-mono uppercase tracking-widest">Permanent data purge will destroy all dossiers</p>
                  </div>
                  <button 
                    onClick={handleSecurityPurge}
                    className="ml-auto px-4 py-2 border border-red-500/20 rounded-lg text-[9px] font-mono uppercase text-red-500 hover:bg-red-500 hover:text-white transition-all"
                  >
                    INITIALIZE_PURGE
                  </button>
                </div>

                <button 
                  onClick={handleSaveSettings}
                  disabled={savingSettings}
                  className="w-full h-20 bg-gold text-black rounded-3xl font-mono text-xs uppercase tracking-[0.6em] font-bold hover:bg-white transition-all shadow-[0_20px_50px_rgba(255,184,0,0.1)] group flex items-center justify-center gap-4"
                >
                  <Save size={18} />
                  <span>{savingSettings ? "UPDATING_PROTOCOLS..." : "EXECUTE_SYSTEM_SYNC"}</span>
                </button>
              </div>
            </div>
          </section>
        )}
        {activeTab === "library" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <section className="space-y-8 h-fit lg:sticky lg:top-32">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-gold/60 flex items-center gap-2">
                  <BookOpen size={14} /> {editingWritingId ? "Modify_Transmission" : "Enter_Literary_Dossier"}
                </h2>
                {editingWritingId && (
                  <button onClick={() => { setEditingWritingId(null); setNewWriting(resetWriting()); }} className="text-[10px] font-mono text-white/30 hover:text-white flex items-center gap-1">
                    <X size={12} /> Cancel_Edit
                  </button>
                )}
              </div>

              <div className="bg-white/5 border border-white/5 p-8 rounded-2xl space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono uppercase text-white/20 tracking-wider">Index_ID</label>
                    <input type="text" value={newWriting.id} onChange={(e) => setNewWriting({...newWriting, id: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-xs focus:border-gold outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono uppercase text-white/20 tracking-wider">Date_Stamp</label>
                    <input type="text" value={newWriting.date} onChange={(e) => setNewWriting({...newWriting, date: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-xs focus:border-gold outline-none" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-white/20 tracking-wider">Official_Title</label>
                  <input type="text" value={newWriting.title} onChange={(e) => setNewWriting({...newWriting, title: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm font-display uppercase tracking-widest focus:border-gold outline-none" />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-white/20 tracking-wider">Classification / Category</label>
                  <input type="text" value={newWriting.category} onChange={(e) => setNewWriting({...newWriting, category: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-xs focus:border-gold outline-none" />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-white/20 tracking-wider">Excerpt (Cinematic Snippet)</label>
                  <textarea value={newWriting.excerpt} onChange={(e) => setNewWriting({...newWriting, excerpt: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-xs focus:border-gold outline-none min-h-[100px] resize-none" />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-white/20 tracking-wider">External_Link</label>
                  <input type="text" value={newWriting.link} onChange={(e) => setNewWriting({...newWriting, link: e.target.value})} placeholder="https://..." className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-xs focus:border-gold outline-none" />
                </div>

                <button onClick={handleSaveWriting} disabled={savingWriting} className="w-full h-14 bg-gold text-black rounded-xl font-mono text-xs uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2">
                  <Save size={16} /> {savingWriting ? "Archiving..." : editingWritingId ? "Update_Archive" : "Store_In_Archives"}
                </button>
              </div>
            </section>

            <section className="space-y-8">
              <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-gold/60 flex items-center gap-2">
                <PenTool size={14} /> Literary_Archives
              </h2>
              <div className="space-y-4">
                {loadingWritings ? (
                   <div className="animate-pulse space-y-4">
                     {[1, 2].map(i => <div key={i} className="h-28 bg-white/5 rounded-2xl" />)}
                   </div>
                ) : writings.length === 0 ? (
                  <p className="text-[10px] font-mono text-white/20 p-20 text-center border border-dashed border-white/5 rounded-3xl">Library_Empty: No_Transmissions_Logged</p>
                ) : writings.map((entry) => (
                  <div key={entry._id} className="bg-white/5 border border-white/10 p-6 rounded-2xl group flex items-center justify-between hover:border-white/20 transition-all">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono text-gold uppercase tracking-[0.3em]">{entry.id}</span>
                        <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">/ {entry.category}</span>
                      </div>
                      <h3 className="text-lg font-display uppercase tracking-widest">{entry.title}</h3>
                      <p className="text-[10px] font-mono text-white/30 truncate max-w-sm mt-1">"{entry.excerpt}"</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEditWriting(entry)} className="p-2 text-white/20 hover:text-gold transition-all">
                        <Edit3 size={18} />
                      </button>
                      <button onClick={() => handleDeleteWriting(entry._id!)} className="p-2 text-white/20 hover:text-red-500 transition-all">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
