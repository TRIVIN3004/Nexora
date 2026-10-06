import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, Cpu, Server, Zap, ShieldCheck, TrendingUp, 
  BarChart3, RefreshCw, Layers, CheckCircle2, Clock, 
  Globe, Database, ArrowUpRight, Sparkles, Terminal, 
  Sliders, Play, Pause, Flame, Eye, PieChart
} from 'lucide-react';

const COLOR_THEMES = {
  neon: {
    id: 'neon',
    name: 'Cyber Neon',
    primary: 'from-purple-500 via-fuchsia-500 to-pink-500',
    accent: 'text-fuchsia-400',
    bgBadge: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30',
    chartStroke: '#d946ef',
    chartFill: 'url(#neonGradient)',
    glow: 'rgba(217, 70, 239, 0.25)',
    border: 'border-fuchsia-500/30',
    highlight: '#a855f7'
  },
  ocean: {
    id: 'ocean',
    name: 'Electric Ocean',
    primary: 'from-blue-500 via-cyan-500 to-teal-400',
    accent: 'text-cyan-400',
    bgBadge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    chartStroke: '#06b6d4',
    chartFill: 'url(#oceanGradient)',
    glow: 'rgba(6, 182, 212, 0.25)',
    border: 'border-cyan-500/30',
    highlight: '#3b82f6'
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Jade',
    primary: 'from-emerald-500 via-teal-500 to-cyan-400',
    accent: 'text-emerald-400',
    bgBadge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    chartStroke: '#10b981',
    chartFill: 'url(#emeraldGradient)',
    glow: 'rgba(16, 185, 129, 0.25)',
    border: 'border-emerald-500/30',
    highlight: '#059669'
  },
  sunset: {
    id: 'sunset',
    name: 'Sunset Amber',
    primary: 'from-amber-500 via-orange-500 to-rose-500',
    accent: 'text-amber-400',
    bgBadge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    chartStroke: '#f59e0b',
    chartFill: 'url(#sunsetGradient)',
    glow: 'rgba(245, 158, 11, 0.25)',
    border: 'border-amber-500/30',
    highlight: '#f97316'
  }
};

const ColorDashboardsShowcase = () => {
  const [activeTab, setActiveTab] = useState('ai');
  const [activeTheme, setActiveTheme] = useState('neon');
  const [isLiveSimulating, setIsLiveSimulating] = useState(true);
  const [liveTick, setLiveTick] = useState(0);

  // Simulated live fluctuating telemetry
  useEffect(() => {
    if (!isLiveSimulating) return;
    const interval = setInterval(() => {
      setLiveTick(prev => prev + 1);
    }, 2200);
    return () => clearInterval(interval);
  }, [isLiveSimulating]);

  const currentTheme = COLOR_THEMES[activeTheme];

  // Dynamic live metric calculations
  const tps = 1420 + Math.round(Math.sin(liveTick * 1.2) * 85);
  const latency = (16.4 + Math.cos(liveTick * 0.9) * 1.8).toFixed(1);
  const cpuLoad = Math.min(94, Math.max(32, 58 + Math.round(Math.sin(liveTick * 0.7) * 14)));
  const ramLoad = Math.min(88, Math.max(40, 64 + Math.round(Math.cos(liveTick * 0.5) * 8)));
  const txSpeed = (4820 + Math.round(Math.sin(liveTick) * 240));

  return (
    <div className="w-full relative py-6">
      {/* Container with Modern Enterprise Glass & Dark Contrast */}
      <div className="w-full rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl p-5 sm:p-8 md:p-10 relative overflow-hidden text-left text-white">
        
        {/* Background Subtle Gradient Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:28px_28px] opacity-40 pointer-events-none" />
        <div 
          className={`absolute -right-24 -top-24 w-96 h-96 rounded-full bg-gradient-to-br ${currentTheme.primary} opacity-20 blur-3xl pointer-events-none transition-all duration-700`}
        />
        <div 
          className="absolute -left-24 -bottom-24 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none"
        />

        {/* Top Control Bar: Title + Theme Selector + Live Toggle */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div className="space-y-1">
            <div className="flex items-center space-x-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-mono font-bold tracking-widest text-slate-300 uppercase">
                Enterprise Command Suite
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${currentTheme.bgBadge}`}>
                Real-Time v4.8
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
              Live Interactive Dashboards
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              High-throughput data telemetry, real-time neural inference, and cloud infrastructure visualizers.
            </p>
          </div>

          {/* Controls: Color Palette Switcher & Live Simulation Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Theme Picker */}
            <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
              {Object.values(COLOR_THEMES).map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTheme(t.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all duration-200 cursor-pointer flex items-center space-x-1.5 ${
                    activeTheme === t.id
                      ? `bg-slate-800 text-white shadow-xs border ${t.border}`
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title={t.name}
                >
                  <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${t.primary}`} />
                  <span className="hidden sm:inline">{t.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Live Play/Pause Simulator */}
            <button
              onClick={() => setIsLiveSimulating(!isLiveSimulating)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center space-x-2 border transition-all cursor-pointer ${
                isLiveSimulating
                  ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800 hover:bg-emerald-900/60'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {isLiveSimulating ? (
                <>
                  <Activity size={13} className="animate-pulse" />
                  <span>LIVE FEED</span>
                </>
              ) : (
                <>
                  <Pause size={13} />
                  <span>PAUSED</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Middle Navigation Tabs: 4 Major Dashboards */}
        <div className="relative z-10 flex overflow-x-auto no-scrollbar gap-2 py-4 border-b border-slate-800/80">
          {[
            { id: 'ai', label: 'AI Neural Engine', icon: Cpu, badge: `${tps} tok/s` },
            { id: 'infra', label: 'Cloud Infra & Nodes', icon: Server, badge: `${latency}ms` },
            { id: 'analytics', label: 'Sprint & DevSecOps', icon: TrendingUp, badge: '99.4% Pass' },
            { id: 'fintech', label: 'Cryptographic Ledger', icon: ShieldCheck, badge: `${txSpeed} ops/s` }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2.5 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? `bg-slate-800 text-white font-bold ${currentTheme.border} shadow-lg shadow-black/40`
                    : 'bg-slate-900/60 text-slate-400 border-slate-800/80 hover:bg-slate-800/50 hover:text-slate-200'
                }`}
              >
                <Icon size={16} className={isActive ? currentTheme.accent : 'text-slate-400'} />
                <span>{tab.label}</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                  isActive 
                    ? currentTheme.bgBadge 
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dashboard Content Panes */}
        <div className="relative z-10 pt-6">
          <AnimatePresence mode="wait">
            {activeTab === 'ai' && (
              <motion.div
                key="ai-dashboard"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* 4 Multi-Color Metric KPI Tiles */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800/90 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-purple-500 to-pink-500" />
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Token Throughput</div>
                    <div className="text-2xl sm:text-3xl font-black font-display text-white mt-1 flex items-baseline gap-1">
                      {tps} <span className="text-xs font-mono text-purple-400">tps</span>
                    </div>
                    <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-mono">
                      <TrendingUp size={12} /> +18.4% Peak Capacity
                    </div>
                  </div>

                  <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800/90 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 to-cyan-400" />
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Inference Latency</div>
                    <div className="text-2xl sm:text-3xl font-black font-display text-cyan-400 mt-1 flex items-baseline gap-1">
                      {latency} <span className="text-xs font-mono text-slate-400">ms</span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-1 font-mono">
                      <span>P99: 22.1ms • TTFT: 12ms</span>
                    </div>
                  </div>

                  <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800/90 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-emerald-500 to-teal-400" />
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Model Accuracy</div>
                    <div className="text-2xl sm:text-3xl font-black font-display text-emerald-400 mt-1 flex items-baseline gap-1">
                      99.2% <span className="text-xs font-mono text-slate-400">F1</span>
                    </div>
                    <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-mono">
                      <CheckCircle2 size={12} /> 0 Hallucination Drift
                    </div>
                  </div>

                  <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800/90 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-amber-500 to-orange-500" />
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Active GPU Nodes</div>
                    <div className="text-2xl sm:text-3xl font-black font-display text-amber-400 mt-1 flex items-baseline gap-1">
                      32/32 <span className="text-xs font-mono text-slate-400">H100</span>
                    </div>
                    <div className="text-[11px] text-amber-300/80 flex items-center gap-1 mt-1 font-mono">
                      <span>Tensor Parallelism 8x</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Chart + Live Inference Stream */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  
                  {/* Left: SVG Gradient Curved Area Chart */}
                  <div className="lg:col-span-7 bg-slate-900/90 p-5 rounded-2xl border border-slate-800/90 flex flex-col justify-between space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-mono font-bold text-slate-200">REAL-TIME INFERENCE VELOCITY</span>
                        <div className="text-[11px] text-slate-400">Rolling 60-second throughput histogram</div>
                      </div>
                      <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-purple-950 text-purple-300 border border-purple-800/80">
                        {liveTick % 2 === 0 ? 'Batch Size: 64' : 'Batch Size: 128'}
                      </span>
                    </div>

                    {/* SVG Curve Chart */}
                    <div className="w-full h-44 relative">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 500 160" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="neonGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#d946ef" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#d946ef" stopOpacity="0.0" />
                          </linearGradient>
                          <linearGradient id="oceanGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                          </linearGradient>
                          <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                          </linearGradient>
                          <linearGradient id="sunsetGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>

                        {/* Grid lines */}
                        <line x1="0" y1="40" x2="500" y2="40" stroke="#334155" strokeDasharray="3 3" opacity="0.4" />
                        <line x1="0" y1="80" x2="500" y2="80" stroke="#334155" strokeDasharray="3 3" opacity="0.4" />
                        <line x1="0" y1="120" x2="500" y2="120" stroke="#334155" strokeDasharray="3 3" opacity="0.4" />

                        {/* Animated Area and Line */}
                        <motion.path
                          d={`M 0 130 
                             Q 60 ${80 + Math.sin(liveTick) * 15}, 120 ${100 + Math.cos(liveTick) * 20} 
                             T 240 ${50 + Math.sin(liveTick * 1.5) * 25} 
                             T 360 ${70 + Math.cos(liveTick * 1.2) * 18} 
                             T 500 ${40 + Math.sin(liveTick) * 15} 
                             L 500 160 L 0 160 Z`}
                          fill={currentTheme.chartFill}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                        <motion.path
                          d={`M 0 130 
                             Q 60 ${80 + Math.sin(liveTick) * 15}, 120 ${100 + Math.cos(liveTick) * 20} 
                             T 240 ${50 + Math.sin(liveTick * 1.5) * 25} 
                             T 360 ${70 + Math.cos(liveTick * 1.2) * 18} 
                             T 500 ${40 + Math.sin(liveTick) * 15}`}
                          fill="none"
                          stroke={currentTheme.chartStroke}
                          strokeWidth="3"
                          strokeLinecap="round"
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                        />

                        {/* Glowing point on current position */}
                        <circle cx="500" cy={40 + Math.sin(liveTick) * 15} r="5" fill={currentTheme.chartStroke} className="animate-ping opacity-75" />
                        <circle cx="500" cy={40 + Math.sin(liveTick) * 15} r="4" fill="#ffffff" />
                      </svg>
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-800">
                      <span>-60s</span>
                      <span>-45s</span>
                      <span>-30s</span>
                      <span>-15s</span>
                      <span className="text-emerald-400 font-bold">LIVE (NOW)</span>
                    </div>
                  </div>

                  {/* Right: Multi-Model Benchmark Bars & Live Output */}
                  <div className="lg:col-span-5 bg-slate-900/90 p-5 rounded-2xl border border-slate-800/90 flex flex-col justify-between space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-200">MODEL BENCHMARK MATRIX</span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                        Zero Latency Spike
                      </span>
                    </div>

                    <div className="space-y-3 font-sans">
                      {[
                        { name: 'Nexora AI-DeepV4 (Custom)', score: '99.4%', color: 'from-fuchsia-500 to-pink-500', width: '99%' },
                        { name: 'Llama 3.3 70B Distributed', score: '95.8%', color: 'from-blue-500 to-cyan-400', width: '95%' },
                        { name: 'Claude 3.5 Sonnet Integration', score: '97.2%', color: 'from-emerald-500 to-teal-400', width: '97%' },
                        { name: 'Mistral Large Fine-tuned', score: '93.6%', color: 'from-amber-500 to-orange-400', width: '93%' }
                      ].map((m, i) => (
                        <div key={i} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="font-semibold text-slate-300">{m.name}</span>
                            <span className="font-mono font-bold text-white">{m.score}</span>
                          </div>
                          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div className={`h-full bg-gradient-to-r ${m.color} rounded-full`} style={{ width: m.width }} />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Live Stream Terminal Pill */}
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 flex items-center space-x-2">
                      <Terminal size={14} className="text-purple-400 shrink-0" />
                      <span className="truncate text-slate-400">
                        {`> Inference stream: prompt_eval_tokens=${tps} loss=0.012 pass=100%`}
                      </span>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {activeTab === 'infra' && (
              <motion.div
                key="infra-dashboard"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* 4 Multi-Color Infrastructure KPI Tiles */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800/90 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 to-cyan-400" />
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Global Edge Uptime</div>
                    <div className="text-2xl sm:text-3xl font-black font-display text-cyan-400 mt-1">99.998%</div>
                    <div className="text-[11px] text-emerald-400 font-mono mt-1">0 P1 Outages in 365d</div>
                  </div>

                  <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800/90 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-emerald-500 to-teal-400" />
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Average CPU Load</div>
                    <div className="text-2xl sm:text-3xl font-black font-display text-white mt-1">{cpuLoad}%</div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-emerald-400 h-full transition-all duration-700" style={{ width: `${cpuLoad}%` }} />
                    </div>
                  </div>

                  <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800/90 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-purple-500 to-indigo-500" />
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Memory Allocation</div>
                    <div className="text-2xl sm:text-3xl font-black font-display text-purple-400 mt-1">{ramLoad}%</div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-purple-400 h-full transition-all duration-700" style={{ width: `${ramLoad}%` }} />
                    </div>
                  </div>

                  <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800/90 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-teal-400 to-emerald-400" />
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Total Bandwidth</div>
                    <div className="text-2xl sm:text-3xl font-black font-display text-teal-300 mt-1">4.2 TB/d</div>
                    <div className="text-[11px] text-teal-400 font-mono mt-1">Global Anycast CDN</div>
                  </div>
                </div>

                {/* Edge Regions & Latency Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { city: 'Tokyo (NRT-01)', latency: '12ms', status: 'HEALTHY', ping: '100% OK', color: 'text-emerald-400', border: 'border-emerald-800/60' },
                    { city: 'Frankfurt (FRA-02)', latency: '16ms', status: 'HEALTHY', ping: '100% OK', color: 'text-cyan-400', border: 'border-cyan-800/60' },
                    { city: 'San Francisco (SFO-01)', latency: '8ms', status: 'PRIMARY', ping: '100% OK', color: 'text-blue-400', border: 'border-blue-800/60' },
                    { city: 'Mumbai (BOM-03)', latency: '14ms', status: 'HEALTHY', ping: '100% OK', color: 'text-emerald-400', border: 'border-emerald-800/60' }
                  ].map((node, i) => (
                    <div key={i} className={`bg-slate-900/90 p-4 rounded-2xl border ${node.border} space-y-2`}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-200">{node.city}</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      </div>
                      <div className="text-xl font-mono font-black text-white">{node.latency}</div>
                      <div className="flex justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-800">
                        <span>Cluster: K8s v1.31</span>
                        <span className={node.color}>{node.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'analytics' && (
              <motion.div
                key="analytics-dashboard"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* 4 Multi-Color Sprint Velocity Tiles */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800/90 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 to-cyan-400" />
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Current Sprint (28)</div>
                    <div className="text-2xl sm:text-3xl font-black font-display text-white mt-1">42/45</div>
                    <div className="text-[11px] text-emerald-400 font-mono mt-1">93.3% Complete</div>
                  </div>

                  <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800/90 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-emerald-500 to-teal-400" />
                    <div className="text-[10px] font-mono text-slate-400 uppercase">CI/CD Pass Rate</div>
                    <div className="text-2xl sm:text-3xl font-black font-display text-emerald-400 mt-1">99.8%</div>
                    <div className="text-[11px] text-slate-400 font-mono mt-1">480 Builds Passing</div>
                  </div>

                  <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800/90 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-purple-500 to-pink-500" />
                    <div className="text-[10px] font-mono text-slate-400 uppercase">PR Turnaround</div>
                    <div className="text-2xl sm:text-3xl font-black font-display text-purple-400 mt-1">2.4 hrs</div>
                    <div className="text-[11px] text-purple-300 font-mono mt-1">AI Code Review</div>
                  </div>

                  <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800/90 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-amber-500 to-orange-400" />
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Test Coverage</div>
                    <div className="text-2xl sm:text-3xl font-black font-display text-amber-400 mt-1">94.6%</div>
                    <div className="text-[11px] text-amber-300 font-mono mt-1">Unit + E2E Vitest</div>
                  </div>
                </div>

                {/* Sprint Burndown Bar Columns */}
                <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800/90 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono font-bold text-slate-200">SPRINT VELOCITY HISTOGRAM</span>
                      <div className="text-[11px] text-slate-400">Story points completed over the last 7 sprints</div>
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-blue-950 text-blue-300 border border-blue-800/80">
                      Average: 54 Pts/Sprint
                    </span>
                  </div>

                  <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-40 pt-4">
                    {[
                      { sprint: 'SP 22', pts: 44, height: '65%', color: 'bg-slate-700' },
                      { sprint: 'SP 23', pts: 48, height: '72%', color: 'bg-blue-600' },
                      { sprint: 'SP 24', pts: 52, height: '80%', color: 'bg-indigo-600' },
                      { sprint: 'SP 25', pts: 56, height: '88%', color: 'bg-purple-600' },
                      { sprint: 'SP 26', pts: 54, height: '84%', color: 'bg-cyan-600' },
                      { sprint: 'SP 27', pts: 60, height: '94%', color: 'bg-emerald-500' },
                      { sprint: 'SP 28 (Now)', pts: 64, height: '100%', color: 'bg-gradient-to-t from-blue-600 to-cyan-400' }
                    ].map((col, i) => (
                      <div key={i} className="flex flex-col items-center h-full justify-end group">
                        <div className="text-[10px] font-mono text-slate-400 mb-1 group-hover:text-white transition-colors">{col.pts}pts</div>
                        <div className="w-full bg-slate-800/80 h-full rounded-xl p-1 flex items-end">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: col.height }}
                            transition={{ duration: 0.8, delay: i * 0.05 }}
                            className={`w-full ${col.color} rounded-lg shadow-md transition-all duration-300 group-hover:brightness-125`}
                          />
                        </div>
                        <div className="text-[9px] sm:text-[10px] font-mono text-slate-400 mt-2 truncate max-w-full">{col.sprint}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'fintech' && (
              <motion.div
                key="fintech-dashboard"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* 4 Multi-Color FinTech Tiles */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800/90 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-emerald-500 to-teal-400" />
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Clearance Speed</div>
                    <div className="text-2xl sm:text-3xl font-black font-display text-emerald-400 mt-1">{txSpeed} ops/s</div>
                    <div className="text-[11px] text-emerald-400 font-mono mt-1">AES-256 GCM Instant</div>
                  </div>

                  <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800/90 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 to-indigo-500" />
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Audit Compliance</div>
                    <div className="text-2xl sm:text-3xl font-black font-display text-white mt-1">100% PASS</div>
                    <div className="text-[11px] text-blue-400 font-mono mt-1">ISO 27001 Stamped</div>
                  </div>

                  <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800/90 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-purple-500 to-pink-500" />
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Tamper Protection</div>
                    <div className="text-2xl sm:text-3xl font-black font-display text-purple-400 mt-1">0 Collisions</div>
                    <div className="text-[11px] text-purple-300 font-mono mt-1">SHA-256 Merkle Root</div>
                  </div>

                  <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800/90 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-amber-500 to-orange-400" />
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Voucher Settlement</div>
                    <div className="text-2xl sm:text-3xl font-black font-display text-amber-400 mt-1">&lt; 45ms</div>
                    <div className="text-[11px] text-amber-300 font-mono mt-1">Zero Lock Contention</div>
                  </div>
                </div>

                {/* Cryptographic Ledger Stream */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                    <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                      <ShieldCheck size={14} /> LIVE CRYPTOGRAPHIC LEDGER PROOF
                    </span>
                    <span>Consensus: BFT-PoA</span>
                  </div>

                  <div className="space-y-2 text-[11px]">
                    {[
                      { hash: '0x9fa1...88c2', time: '18:02:14 UTC', type: 'CLIENT_PAYMENT_CLEARANCE', status: 'VERIFIED', amt: '$24,500.00' },
                      { hash: '0x43bc...120f', time: '18:02:11 UTC', type: 'INSTITUTIONAL_VOUCHER_SIGN', status: 'SEALED', amt: '$11,200.00' },
                      { hash: '0x77ee...d99a', time: '18:02:08 UTC', type: 'ACADEMIC_CREDENTIAL_HASH', status: 'STAMPED', amt: 'CERT_HASH' }
                    ].map((tx, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                        <span className="text-blue-400 font-bold">{tx.hash}</span>
                        <span className="text-slate-400">{tx.type}</span>
                        <span className="text-amber-400 font-bold">{tx.amt}</span>
                        <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 font-bold">
                          {tx.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Banner with Live Metrics Summary */}
        <div className="relative z-10 mt-8 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
            <span className="font-mono text-slate-300">Nexora Unified Telemetry Grid</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">SOC2 Type II Certified</span>
          </div>

          <div className="flex items-center space-x-3 font-mono">
            <span className="text-emerald-400 font-bold">Latency &lt; 20ms</span>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-400 font-bold">100% Edge Sync</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ColorDashboardsShowcase;
