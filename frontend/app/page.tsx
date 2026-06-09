"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, FileText, CheckCircle2, Sparkles, ArrowRight, ShieldAlert, 
  Clock, Ban, LayoutDashboard, History, Settings, Zap, Search, Bell,
  Database, ShieldCheck, Cpu, XCircle
} from "lucide-react";

export default function UltraPremiumDashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null); // 👈 Added error state
  const [dragActive, setDragActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const analyzeDocument = async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);
    setErrorMsg(null); // Reset errors

    const formData = new FormData();
    formData.append("file", file);
    try {
      // ⚠️ DOUBLE CHECK: Swap this URL with your actual live Render endpoint!
      const response = await fetch("https://uae-document-analyzer.onrender.com/analyze", { 
        method: "POST", 
        body: formData 
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server returned ${response.status}: ${errorText || "Internal Error"}`);
      }

      const data = await response.json();
      
      // Validate that the server returned the correct structure
      if (data && (data.summary || data.risks)) {
        setResult(data);
      } else {
        throw new Error("Invalid response format received from processing engine.");
      }
    } catch (error: any) { 
      console.error(error); 
      setErrorMsg(error?.message || "Network transmission failure between services.");
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex overflow-hidden font-sans">
      
      {/* BACKGROUND GLOWS */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 -right-[10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[100px]" />
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
                onClick={() => setActiveTab(item.label)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all border ${
                  isActive 
                    ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' 
                    : 'text-slate-400 border-transparent hover:bg-slate-800/50 hover:text-slate-200'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium hidden lg:block text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* MAIN WORKSPACE */}
      <main className="flex-1 overflow-y-auto relative z-10 px-6 py-8 lg:px-12">
        <header className="flex justify-between items-end mb-12">
          <div className="text-left">
            <div className="flex items-center gap-2 text-cyan-500 text-xs font-bold uppercase tracking-[0.2em] mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Production Engine v2.4</span>
            </div>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl tracking-tighter">
              Legal Intelligence <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Dashboard</span>
            </h1>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === "Dashboard" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-1 xl:grid-cols-12 gap-8">
              
              {/* Left: Input Console */}
              <div className="xl:col-span-4 space-y-6">
                <div className="bg-slate-900/40 backdrop-blur-2xl border border-slate-800 rounded-3xl p-8 shadow-2xl">
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
                    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 mb-4">
                      <FileText className={`w-8 h-8 ${file ? 'text-cyan-400' : 'text-slate-600'}`} />
                    </div>
                    <p className="text-sm font-semibold text-slate-300">{file ? file.name : "Drop Contract PDF"}</p>
                    <p className="text-xs text-slate-500 mt-2">Max Payload: 25.0 MB</p>
                  </div>
                  <button onClick={analyzeDocument} disabled={!file || loading} className="w-full mt-8 py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold text-sm active:scale-95 transition-all">
                    {loading ? "COMMENCING SCAN..." : "INITIATE ANALYSIS"}
                  </button>
                </div>
              </div>
              
              {/* Right: Insights Grid */}
              <div className="xl:col-span-8">
                {loading && (
                  <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-slate-950/20 border border-slate-800 rounded-3xl p-12">
                    <div className="w-12 h-12 border-4 border-slate-800 border-t-cyan-500 rounded-full animate-spin mb-6" />
                    <h3 className="text-lg font-bold text-slate-200">Processing Matrix...</h3>
                  </div>
                )}

                {/* 👈 EXPLICIT ERROR MESSAGE RENDERING */}
                {errorMsg && (
                  <div className="border border-rose-500/20 bg-rose-500/5 rounded-3xl p-8 flex flex-col items-center text-center">
                    <XCircle className="w-12 h-12 text-rose-500 mb-4" />
                    <h4 className="text-rose-400 font-bold text-lg">Analysis Pipeline Halted</h4>
                    <p className="text-slate-400 text-sm mt-2 max-w-md">{errorMsg}</p>
                    <p className="text-slate-600 text-xs mt-4">Tip: If this is a 502/Timeout, your free Render backend might be sleeping. Wait 60 seconds and click analyze again.</p>
                  </div>
                )}
                
                {/* SAFE RESULT CHECKING */}
                {result && !loading && !errorMsg && (
                  <div className="space-y-6">
                    <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-3xl">
                      <p className="text-slate-300 text-lg leading-relaxed italic">"{result?.summary}"</p>
                    </div>
                    <div className="space-y-4">
                      {result?.risks?.length === 0 ? (
                        <div className="p-10 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 flex flex-col items-center text-center">
                          <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-4" />
                          <h4 className="text-emerald-400 font-bold">Compliant Status Verified</h4>
                        </div>
                      ) : (
                        result?.risks?.map((risk: any, i: number) => (
                          <div key={i} className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl flex gap-6 relative overflow-hidden border-l-4 border-l-rose-500">
                            <div className="flex-1">
                              <h4 className="font-bold text-white text-lg mb-2">{risk.risk}</h4>
                              <p className="text-slate-400 text-sm mb-4">{risk.explanation}</p>
                              <div className="bg-slate-950/80 p-4 rounded-xl text-cyan-400 text-[11px] font-mono">"{risk.highlight}"</div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {!loading && !result && !errorMsg && (
                  <div className="h-full min-h-[400px] border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center p-12 text-center">
                    <h3 className="text-xl font-bold text-slate-500">System Ready for Analysis</h3>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* SIMULATED OTHER TABS REMAIN INTERACTIVE */}
          {activeTab === "Analysis History" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4 max-w-4xl">
              <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800"><Database className="w-5 h-5 text-cyan-400" /></div>
                  <div>
                    <h4 className="font-semibold text-slate-200 text-sm">Standard_Labour_Agreement.pdf</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Cached Sandbox Record</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}