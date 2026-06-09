"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, FileText, CheckCircle2, Sparkles, ArrowRight, ShieldAlert, 
  Clock, Ban, LayoutDashboard, History, Settings, Zap, Search, Bell,
  Database, ShieldCheck, Cpu
} from "lucide-react";

export default function UltraPremiumDashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [dragActive, setDragActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // 1. ADD STATE TO TRACK ACTIVE TAB
  const [activeTab, setActiveTab] = useState("Dashboard");

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const analyzeDocument = async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("https://uae-document-analyzer.onrender.com", { method: "POST", body: formData });
      const data = await response.json();
      setResult(data);
    } catch (error) { console.error(error); } 
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex overflow-hidden font-sans">
      
      {/* BACKGROUND GLOWS */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-cyan-500/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ x: [0, -80, 0], y: [0, 100, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -right-[10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[100px]" 
        />
      </div>

      {/* SIDEBAR NAVIGATION */}
      <aside className="w-20 lg:w-64 border-r border-slate-800 bg-slate-950/50 backdrop-blur-xl z-30 hidden md:flex flex-col">
        <div className="p-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Zap className="text-slate-950 w-6 h-6 fill-current" />
            </div>
            <span className="text-xl font-bold tracking-tight hidden lg:block">AEGIS<span className="text-cyan-500">.AI</span></span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          {[
            { icon: LayoutDashboard, label: "Dashboard" },
            { icon: History, label: "Analysis History" },
            { icon: Search, label: "Global Search" },
            { icon: Bell, label: "Compliance Alerts" },
            { icon: Settings, label: "System Config" }
          ].map((item, idx) => {
            const isActive = activeTab === item.label;
            return (
              <button 
                key={idx} 
                onClick={() => setActiveTab(item.label)} // 2. SET ACTIVE TAB ON CLICK
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all border ${
                  isActive 
                    ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shadow-[inset_0_0_12px_rgba(6,182,212,0.15)]' 
                    : 'text-slate-400 border-transparent hover:bg-slate-800/50 hover:text-slate-200'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium hidden lg:block text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-6 mt-auto">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 p-4 rounded-2xl hidden lg:block">
                <p className="text-xs text-slate-400 mb-2">Usage Credits</p>
                <div className="w-full bg-slate-700 h-1.5 rounded-full mb-2"><div className="w-3/4 h-full bg-cyan-500 rounded-full shadow-[0_0_8px_#06b6d4]" /></div>
                <p className="text-[10px] text-slate-500">750 / 1000 Analysis</p>
            </div>
        </div>
      </aside>

      {/* MAIN WORKSPACE */}
      <main className="flex-1 overflow-y-auto relative z-10 px-6 py-8 lg:px-12">
        
        {/* Top Header Bar */}
        <header className="flex justify-between items-end mb-12">
          <div className="text-left">
            <div className="flex items-center gap-2 text-cyan-500 text-xs font-bold uppercase tracking-[0.2em] mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Production Engine v2.4</span>
            </div>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl tracking-tighter">
              {activeTab === "Dashboard" && <>Legal Intelligence <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Dashboard</span></>}
              {activeTab === "Analysis History" && <>Analysis <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Archive</span></>}
              {activeTab === "Global Search" && <>Unified <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Lexicon Search</span></>}
              {activeTab === "Compliance Alerts" && <>Regulatory <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-400">Risk Radar</span></>}
              {activeTab === "System Config" && <>Engine <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-200">Parameters</span></>}
            </h1>
          </div>
        </header>

        {/* 3. CONDITIONAL RENDERING PANELS BASED ON ACTIVE TAB */}
        <AnimatePresence mode="wait">
          
          {/* DASHBOARD TAB CONTAINER */}
          {activeTab === "Dashboard" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-1 xl:grid-cols-12 gap-8">
              {/* Left: Input Console */}
              <div className="xl:col-span-4 space-y-6">
                <div className="bg-slate-900/40 backdrop-blur-2xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
                  <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Upload className="w-4 h-4 text-cyan-500" /> Ingestion Module
                  </h2>
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={(e) => { e.preventDefault(); setFile(e.dataTransfer.files[0]); setDragActive(false); }}
                    className={`relative rounded-2xl border-2 border-dashed h-64 flex flex-col items-center justify-center transition-all duration-500 ${dragActive ? 'border-cyan-500 bg-cyan-500/5' : 'border-slate-800 bg-slate-950/40'}`}
                  >
                    <input type="file" accept=".pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 mb-4 group-hover:scale-110 transition-transform">
                      <FileText className={`w-8 h-8 ${file ? 'text-cyan-400' : 'text-slate-600'}`} />
                    </div>
                    <p className="text-sm font-semibold text-slate-300">{file ? file.name : "Drop Contract PDF"}</p>
                    <p className="text-xs text-slate-500 mt-2">Max Payload: 25.0 MB</p>
                  </div>
                  <button onClick={analyzeDocument} disabled={!file || loading} className="w-full mt-8 py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold text-sm shadow-[0_10px_20px_-10px_rgba(6,182,212,0.5)] active:scale-95 transition-all">
                    {loading ? "COMMENCING SCAN..." : "INITIATE ANALYSIS"}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-2xl"><p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Accuracy</p><p className="text-xl font-bold mt-1 text-emerald-400">98.9%</p></div>
                  <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-2xl"><p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Latency</p><p className="text-xl font-bold mt-1 text-cyan-400">2.1s</p></div>
                </div>
              </div>
              
              {/* Right: Insights Grid */}
              <div className="xl:col-span-8">
                {loading ? (
                  <div className="h-full min-h-[500px] flex flex-col items-center justify-center bg-slate-950/20 border border-slate-800/50 rounded-3xl p-12">
                    <div className="w-16 h-16 border-4 border-slate-800 border-t-cyan-500 rounded-full animate-spin mb-6" />
                    <h3 className="text-lg font-bold text-slate-200">Processing Matrix...</h3>
                  </div>
                ) : result ? (
                  <div className="space-y-6">
                    <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-3xl"><p className="text-slate-300 text-lg leading-relaxed italic">"{result.summary}"</p></div>
                    <div className="space-y-4">
                      {result.risks.map((risk: any, i: number) => (
                        <div key={i} className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl flex gap-6 relative overflow-hidden border-l-4 border-l-rose-500">
                          <div className="flex-1">
                            <h4 className="font-bold text-white text-lg mb-2">{risk.risk}</h4>
                            <p className="text-slate-400 text-sm mb-4">{risk.explanation}</p>
                            <div className="bg-slate-950/80 p-4 rounded-xl text-cyan-400 text-[11px] font-mono">"{risk.highlight}"</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="h-full min-h-[500px] border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center p-12 text-center">
                    <h3 className="text-xl font-bold text-slate-500">System Ready for Analysis</h3>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ANALYSIS HISTORY TAB */}
          {activeTab === "Analysis History" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4 max-w-4xl">
              {[
                { name: "Executive_Employment_AlMansoori.pdf", date: "June 08, 2026", risks: 2, status: "Flagged" },
                { name: "Standard_Labour_Agreement_TechCorp.pdf", date: "June 04, 2026", risks: 0, status: "Compliant" },
                { name: "NDA_Dubai_Properties_Final.pdf", date: "May 29, 2026", risks: 1, status: "Flagged" },
              ].map((doc, idx) => (
                <div key={idx} className="bg-slate-900/40 border border-slate-800 p-5 rounded-2xl flex items-center justify-between hover:border-slate-700 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800"><Database className="w-5 h-5 text-cyan-400" /></div>
                    <div>
                      <h4 className="font-semibold text-slate-200 text-sm">{doc.name}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Scanned on {doc.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${doc.risks > 0 ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                      {doc.status} ({doc.risks} Issues)
                    </span>
                    <button className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-medium">View Analysis <ArrowRight className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* GLOBAL SEARCH TAB */}
          {activeTab === "Global Search" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-4 text-slate-500 w-5 h-5" />
                <input type="text" placeholder="Query historical clauses or compliance markers (e.g., Article 10)..." className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors" />
              </div>
              <p className="text-xs text-slate-500 mt-3 px-1 italic">Searches through index data vectors across cached document frameworks.</p>
            </motion.div>
          )}

          {/* COMPLIANCE ALERTS TAB */}
          {activeTab === "Compliance Alerts" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
              <div className="bg-zinc-900/40 border border-rose-500/20 rounded-2xl p-6 border-l-4 border-l-rose-500">
                <div className="flex items-center justify-between mb-3"><h4 className="font-bold text-sm text-slate-200">Decree-Law No. 33 Audit Trigger</h4><span className="text-[10px] bg-rose-500/10 text-rose-400 font-bold px-2 py-0.5 rounded border border-rose-500/20">Critical</span></div>
                <p className="text-xs text-slate-400 leading-relaxed">System flagged 3 legacy repositories containing non-compete clauses exceeding the statutory 2-year cap rule.</p>
              </div>
              <div className="bg-zinc-900/40 border border-amber-500/20 rounded-2xl p-6 border-l-4 border-l-amber-500">
                <div className="flex items-center justify-between mb-3"><h4 className="font-bold text-sm text-slate-200">Probation Notice Shift Threshold</h4><span className="text-[10px] bg-amber-500/10 text-amber-400 font-bold px-2 py-0.5 rounded border border-amber-500/20">Warning</span></div>
                <p className="text-xs text-slate-400 leading-relaxed">Framework identified template agreements missing explicit references to the statutory 14-day probation termination requirement.</p>
              </div>
            </motion.div>
          )}

          {/* SYSTEM CONFIG TAB */}
          {activeTab === "System Config" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 max-w-2xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3"><Cpu className="text-cyan-500 w-5 h-5" /><div><p className="text-sm font-semibold text-slate-200">Analysis Pipeline Model</p><p className="text-xs text-slate-500">Fallback Extractive Matrix Architecture</p></div></div>
                <span className="text-xs bg-slate-950 text-slate-400 px-3 py-1 rounded-md border border-slate-800">Local Algorithmic</span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3"><ShieldCheck className="text-emerald-500 w-5 h-5" /><div><p className="text-sm font-semibold text-slate-200">Data Sovereignty Control</p><p className="text-xs text-slate-500">In-region data processing confinement constraints</p></div></div>
                <span className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-md border border-emerald-500/20">Strict UAE On-Prem</span>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}