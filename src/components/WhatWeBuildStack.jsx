import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Cpu, Code, Smartphone, Palette, Cloud, Database, 
  ArrowRight, Sparkles, CheckCircle2, Zap, Server, 
  Layers, Terminal, Globe, ShieldCheck, Activity, BarChart3
} from 'lucide-react';

const CAPABILITIES = [
  {
    id: 'ai-ml',
    step: '01',
    category: 'AI & MACHINE LEARNING',
    title: 'Intelligence That Creates Possibilities',
    description: 'We build intelligent solutions using artificial intelligence and machine learning to automate processes, analyze information and solve real-world problems.',
    tags: ['AI Models', 'Machine Learning', 'Automation', 'Neural NLP'],
    accentColor: '#0ea5e9',
    gradient: 'from-blue-600 via-cyan-500 to-indigo-600',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: Cpu,
    ctaText: 'Explore AI Solutions',
    visualType: 'ai'
  },
  {
    id: 'software-dev',
    step: '02',
    category: 'SOFTWARE DEVELOPMENT',
    title: 'Ideas Into Working Products',
    description: 'We design and develop modern web applications, enterprise platforms and scalable software products built around real business requirements.',
    tags: ['Web Apps', 'Backend APIs', 'Microservices', 'Enterprise'],
    accentColor: '#2563eb',
    gradient: 'from-blue-600 via-indigo-600 to-purple-600',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    icon: Code,
    ctaText: 'Explore Software',
    visualType: 'software'
  },
  {
    id: 'mobile-apps',
    step: '03',
    category: 'MOBILE APPLICATIONS',
    title: 'Technology In Your Pocket',
    description: 'We create modern mobile experiences designed for usability, performance and seamless interaction across iOS, Android and cross-platform ecosystems.',
    tags: ['Mobile OS', 'Android', 'iOS', 'Cross-Platform'],
    accentColor: '#7c3aed',
    gradient: 'from-purple-600 via-fuchsia-600 to-pink-500',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    icon: Smartphone,
    ctaText: 'Explore Mobile Apps',
    visualType: 'mobile'
  },
  {
    id: 'ui-ux',
    step: '04',
    category: 'UI/UX DESIGN',
    title: 'Designed Around People',
    description: 'We create user-centered interfaces that combine visual design, usability and intuitive human-first experiences tailored for business scale.',
    tags: ['UI Design', 'UX Research', 'Design Systems', 'Prototyping'],
    accentColor: '#e11d48',
    gradient: 'from-rose-600 via-pink-600 to-purple-600',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    icon: Palette,
    ctaText: 'Explore UI/UX Design',
    visualType: 'design'
  },
  {
    id: 'cloud-infra',
    step: '05',
    category: 'CLOUD & DIGITAL INFRASTRUCTURE',
    title: 'Built To Scale',
    description: 'We help applications move from development to reliable production environments using modern cloud, Kubernetes and continuous deployment practices.',
    tags: ['Cloud Native', 'Kubernetes', 'DevOps CI/CD', 'Security'],
    accentColor: '#059669',
    gradient: 'from-emerald-600 via-teal-600 to-cyan-600',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: Cloud,
    ctaText: 'Explore Cloud & DevOps',
    visualType: 'cloud'
  },
  {
    id: 'data-solutions',
    step: '06',
    category: 'DATA & DIGITAL SOLUTIONS',
    title: 'Turn Data Into Decisions',
    description: 'We create data-driven solutions that transform raw information into useful business insights, telemetry analytics and automated decision intelligence.',
    tags: ['Data Pipelines', 'Analytics', 'BI Insights', 'Automation'],
    accentColor: '#d97706',
    gradient: 'from-amber-600 via-orange-600 to-rose-600',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    icon: Database,
    ctaText: 'Explore Data Solutions',
    visualType: 'data'
  }
];

/**
 * Isolated Dashboard Visuals (Crisp dark UI inside light cards)
 */
const DashboardVisual = ({ type }) => {
  switch (type) {
    case 'ai':
      return (
        <div className="dashboard-visual relative w-full h-full min-h-[260px] sm:min-h-[290px] lg:min-h-[320px] bg-slate-950 rounded-2xl border border-slate-800 p-4 sm:p-5 flex flex-col justify-between overflow-hidden font-mono text-left shadow-inner">
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf815_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 relative z-10">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-bold text-slate-200">NEURAL INFERENCE ENGINE</span>
            </div>
            <span className="text-[10px] text-cyan-300 bg-cyan-950/80 px-2.5 py-0.5 rounded-full border border-cyan-800">
              v4.2 LLM Active
            </span>
          </div>

          <div className="py-3 relative z-10 flex items-center justify-between px-2 sm:px-4">
            <div className="space-y-2.5">
              <div className="text-[9px] text-slate-400 font-semibold">INPUT TOKENS</div>
              {[1, 2, 3].map((n) => (
                <div key={n} className="w-8 h-8 rounded-lg bg-slate-900 border border-cyan-500/40 flex items-center justify-center text-[11px] text-cyan-300 shadow-xs font-bold">
                  T{n}
                </div>
              ))}
            </div>

            <div className="flex-1 px-3 sm:px-6 relative h-28 flex items-center justify-center">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 60">
                <line x1="0" y1="12" x2="50" y2="30" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
                <line x1="0" y1="30" x2="50" y2="30" stroke="#38bdf8" strokeWidth="1.5" opacity="0.8" />
                <line x1="0" y1="48" x2="50" y2="30" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
                <line x1="50" y1="30" x2="100" y2="18" stroke="#38bdf8" strokeWidth="1.5" opacity="0.8" />
                <line x1="50" y1="30" x2="100" y2="42" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
                <circle cx="50" cy="30" r="9" fill="#0369a1" stroke="#38bdf8" strokeWidth="2" className="animate-pulse" />
              </svg>
            </div>

            <div className="space-y-2.5">
              <div className="text-[9px] text-slate-400 font-semibold">EMBEDDINGS</div>
              {[1, 2].map((n) => (
                <div key={n} className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-400 flex items-center justify-center text-[11px] text-white font-bold shadow-xs">
                  E{n}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 text-[11px] text-slate-300 flex items-center justify-between relative z-10">
            <span className="text-slate-400">Latency: <strong className="text-cyan-400">14ms</strong></span>
            <span className="text-slate-400">Throughput: <strong className="text-emerald-400">1,420 tok/s</strong></span>
            <span className="text-cyan-300 font-bold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60">100% Match</span>
          </div>
        </div>
      );

    case 'software':
      return (
        <div className="dashboard-visual relative w-full h-full min-h-[260px] sm:min-h-[290px] lg:min-h-[320px] bg-slate-950 rounded-2xl border border-slate-800 p-4 sm:p-5 flex flex-col justify-between overflow-hidden font-mono text-left shadow-inner">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="text-xs text-slate-400 ml-2">app/api/enterprise.ts</span>
            </div>
            <span className="text-[10px] text-blue-400 font-bold bg-blue-950 px-2.5 py-0.5 rounded-full border border-blue-800">
              TypeScript v5.6
            </span>
          </div>

          <div className="py-2.5 space-y-1 text-xs text-slate-300 font-mono leading-relaxed">
            <div className="text-purple-400">export async function <span className="text-blue-400">deployPipeline</span>(config) &#123;</div>
            <div className="pl-4 text-slate-400">const cluster = await <span className="text-cyan-300">NexoraMesh</span>.connect(&#123;</div>
            <div className="pl-8 text-emerald-400">highAvailability: <span className="text-amber-300">true</span>,</div>
            <div className="pl-8 text-emerald-400">edgeReplication: <span className="text-amber-300">"global-anycast"</span></div>
            <div className="pl-4 text-slate-400">&#125;);</div>
            <div className="pl-4 text-cyan-400">return cluster.status; <span className="text-slate-500">// 200 OK</span></div>
            <div className="text-purple-400">&#125;</div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
            <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 text-blue-400 font-bold">GraphQL API</div>
            <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 text-emerald-400 font-bold">PostgreSQL</div>
            <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 text-purple-400 font-bold">Microservices</div>
          </div>
        </div>
      );

    case 'mobile':
      return (
        <div className="dashboard-visual relative w-full h-full min-h-[260px] sm:min-h-[290px] lg:min-h-[320px] bg-slate-950 rounded-2xl border border-slate-800 p-4 sm:p-5 flex items-center justify-center overflow-hidden shadow-inner">
          <div className="w-52 sm:w-60 h-full bg-slate-900 rounded-3xl border-2 border-slate-700/80 p-3 shadow-2xl flex flex-col justify-between relative text-left">
            <div className="w-20 h-3.5 bg-black rounded-full mx-auto mb-2" />
            
            <div className="space-y-2.5">
              <div className="bg-purple-950/70 p-3 rounded-2xl border border-purple-800/60">
                <div className="text-[9px] font-mono text-purple-300 uppercase tracking-wider">GONEXORA OS</div>
                <div className="text-xs font-bold text-white font-display mt-0.5">Real-Time Mobile Hub</div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                  <div className="text-[8px] font-mono text-slate-400 uppercase">FPS RATE</div>
                  <div className="text-xs font-bold text-emerald-400 font-mono">120Hz Pro</div>
                </div>
                <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                  <div className="text-[8px] font-mono text-slate-400 uppercase">SYNC MODE</div>
                  <div className="text-xs font-bold text-purple-400 font-mono">Offline-First</div>
                </div>
              </div>
            </div>

            <div className="h-1.5 w-24 bg-slate-700 rounded-full mx-auto mt-2" />
          </div>
        </div>
      );

    case 'design':
      return (
        <div className="dashboard-visual relative w-full h-full min-h-[260px] sm:min-h-[290px] lg:min-h-[320px] bg-slate-950 rounded-2xl border border-slate-800 p-4 sm:p-5 flex flex-col justify-between overflow-hidden shadow-inner text-left font-sans">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-mono font-bold text-slate-200">DESIGN SYSTEM TOKENS</span>
            <span className="text-[10px] font-mono text-rose-400 bg-rose-950/80 px-2.5 py-0.5 rounded-full border border-rose-800">
              Figma 8pt Grid
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2.5 py-2">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-rose-500/20 to-slate-900 border border-rose-500/40">
              <div className="text-[9px] font-mono text-rose-300">PRIMARY</div>
              <div className="w-full h-3.5 rounded-md bg-rose-500 mt-1.5" />
            </div>
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-slate-900 border border-cyan-500/40">
              <div className="text-[9px] font-mono text-cyan-300">ELECTRIC</div>
              <div className="w-full h-3.5 rounded-md bg-cyan-400 mt-1.5" />
            </div>
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-slate-900 border border-purple-500/40">
              <div className="text-[9px] font-mono text-purple-300">DEEP VIOLET</div>
              <div className="w-full h-3.5 rounded-md bg-purple-600 mt-1.5" />
            </div>
          </div>

          <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-mono text-[11px]">Typography: Outfit & Inter</span>
            <span className="text-emerald-400 font-bold font-mono text-[11px] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">WCAG AAA Contrast</span>
          </div>
        </div>
      );

    case 'cloud':
      return (
        <div className="dashboard-visual relative w-full h-full min-h-[260px] sm:min-h-[290px] lg:min-h-[320px] bg-slate-950 rounded-2xl border border-slate-800 p-4 sm:p-5 flex flex-col justify-between overflow-hidden font-mono text-left shadow-inner">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center space-x-2">
              <Server size={14} className="text-emerald-400" />
              <span className="text-xs font-bold text-slate-200">KUBERNETES CLUSTER CLOUD</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800">
              99.999% UPTIME
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 py-2">
            {[
              { region: 'Tokyo (NRT-01)', latency: '12ms' },
              { region: 'Frankfurt (FRA-02)', latency: '16ms' },
              { region: 'San Francisco (SFO-01)', latency: '8ms' },
              { region: 'Mumbai (BOM-03)', latency: '14ms' }
            ].map((node, i) => (
              <div key={i} className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-300">{node.region.split(' ')[0]}</span>
                <span className="text-emerald-400 font-bold">{node.latency}</span>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>DevSecOps CI/CD</span>
            <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">Auto-Healing Active</span>
          </div>
        </div>
      );

    case 'data':
    default:
      return (
        <div className="dashboard-visual relative w-full h-full min-h-[260px] sm:min-h-[290px] lg:min-h-[320px] bg-slate-950 rounded-2xl border border-slate-800 p-4 sm:p-5 flex flex-col justify-between overflow-hidden font-mono text-left shadow-inner">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center space-x-2">
              <BarChart3 size={14} className="text-amber-400" />
              <span className="text-xs font-bold text-slate-200">EXECUTIVE ANALYTICS METRICS</span>
            </div>
            <span className="text-[10px] text-amber-300 font-bold bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-800">
              +42% MoM
            </span>
          </div>

          <div className="h-20 sm:h-24 w-full relative py-1">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60" preserveAspectRatio="none">
              <defs>
                <linearGradient id="amberGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path d="M 0 50 Q 50 30, 100 35 T 200 10 L 200 60 L 0 60 Z" fill="url(#amberGrad)" />
              <path d="M 0 50 Q 50 30, 100 35 T 200 10" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
            </svg>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
            <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
              <div className="text-slate-400">DATA PTS</div>
              <div className="text-sm font-bold text-white mt-0.5">4.2M</div>
            </div>
            <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
              <div className="text-slate-400">ACCURACY</div>
              <div className="text-sm font-bold text-amber-400 mt-0.5">99.8%</div>
            </div>
            <div className="bg-slate-900 p-2 rounded-xl border border-slate-800">
              <div className="text-slate-400">DECISIONS</div>
              <div className="text-sm font-bold text-emerald-400 mt-0.5">Realtime</div>
            </div>
          </div>
        </div>
      );
  }
};

/**
 * Premium Light Card Component with Strict One-Active-Card Vertical Animation System
 */
const StorytellingCard = ({ card, index, total, scrollProgress, isReducedMotion, onSelectService }) => {
  const Icon = card.icon;

  // Exact 5 segments for 6 cards (progress 0.0 -> 1.0)
  // Card 0: active at 0.0 -> exits to -70px at 0.16
  // Card 1: preview at 0.0 -> active at 0.20 -> exits at 0.36
  // Card 2: preview at 0.20 -> active at 0.40 -> exits at 0.56
  // Card 3: preview at 0.40 -> active at 0.60 -> exits at 0.76
  // Card 4: preview at 0.60 -> active at 0.80 -> exits at 0.96
  // Card 5: preview at 0.80 -> active at 1.00 (stays active)

  let points, opacities, scales, yValues, zIndices;

  if (index === 0) {
    points = [0.0, 0.05, 0.16, 1.0];
    opacities = [1.0, 1.0, 0.0, 0.0];
    scales = [1.0, 1.0, 0.94, 0.94];
    yValues = [0, 0, -70, -70];
    zIndices = [20, 20, 10, 10];
  } else if (index === total - 1) {
    const prevCenter = (index - 1) * 0.20;
    points = [0.0, Math.max(0, prevCenter - 0.04), prevCenter, prevCenter + 0.15, 1.0];
    opacities = [0.0, 0.0, 0.35, 1.0, 1.0];
    scales = [0.92, 0.92, 0.96, 1.0, 1.0];
    yValues = [45, 45, 25, 0, 0];
    zIndices = [10, 10, 18, 20, 20];
  } else {
    const prevCenter = (index - 1) * 0.20;
    const center = index * 0.20;
    const hold = center + 0.04;
    const exit = center + 0.16;
    points = [0.0, Math.max(0, prevCenter - 0.04), prevCenter, center, hold, exit, 1.0];
    opacities = [0.0, 0.0, 0.35, 1.0, 1.0, 0.0, 0.0];
    scales = [0.92, 0.92, 0.96, 1.0, 1.0, 0.94, 0.94];
    yValues = [45, 45, 25, 0, 0, -70, -70];
    zIndices = [10, 10, 18, 20, 20, 10, 10];
  }

  // Sanitize points to ensure strictly ascending order for useTransform
  const sPoints = [];
  const sOpacities = [];
  const sScales = [];
  const sY = [];
  const sZ = [];

  for (let i = 0; i < points.length; i++) {
    const p = Math.max(0, Math.min(1, points[i]));
    if (i === 0 || p > sPoints[sPoints.length - 1] + 0.0001) {
      sPoints.push(p);
      sOpacities.push(opacities[i]);
      sScales.push(scales[i]);
      sY.push(yValues[i]);
      sZ.push(zIndices[i]);
    }
  }

  const opacity = useTransform(scrollProgress, sPoints, sOpacities, { clamp: true });
  const scale = useTransform(scrollProgress, sPoints, sScales, { clamp: true });
  const y = useTransform(scrollProgress, sPoints, sY, { clamp: true });
  const zIndex = useTransform(scrollProgress, sPoints, sZ, { clamp: true });

  // Dynamic pointer-events: Only the active card is clickable
  const pointerEvents = useTransform(scrollProgress, (p) => {
    if (index === 0 && p < 0.16) return 'auto';
    if (index === total - 1 && p >= 0.80) return 'auto';
    const center = index * 0.20;
    return (p >= center - 0.05 && p < center + 0.16) ? 'auto' : 'none';
  });

  return (
    <motion.div
      className="absolute inset-0 w-full h-full flex items-center justify-center"
      style={
        isReducedMotion
          ? { zIndex: index + 1, opacity: 1, position: 'relative', marginBottom: '2rem' }
          : {
              y,
              scale,
              opacity,
              zIndex,
              pointerEvents,
              willChange: 'transform, opacity'
            }
      }
    >
      {/* Premium Light Card Container */}
      <div 
        className="w-full h-full rounded-[28px] bg-white border border-slate-200/90 text-slate-900 p-6 sm:p-8 md:p-10 flex flex-col justify-between shadow-[0_25px_70px_rgba(15,23,42,0.10)] relative overflow-hidden text-left"
      >
        {/* Subtle Top Gradient Accent Bar */}
        <div className={`absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r ${card.gradient}`} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center h-full relative z-10">
          
          {/* Left Column: Category, Title, Description, Tags, CTA (45%) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-3 sm:space-y-4">
            
            {/* Category Header + Step Pill */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-xs shrink-0">
                  <Icon size={20} />
                </div>
                <span className={`text-[11px] font-mono font-bold tracking-wider uppercase px-3 py-1 rounded-full border ${card.badgeColor}`}>
                  {card.category}
                </span>
              </div>
              
              <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                <span className="text-blue-600 font-extrabold">{card.step}</span> / 06
              </span>
            </div>

            {/* Title & Description */}
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-[#0B1220] tracking-tight leading-tight">
                {card.title}
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {card.description}
              </p>
            </div>

            {/* Technology Tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {card.tags.map((tag, tIdx) => (
                <span 
                  key={tIdx}
                  className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-slate-100/90 text-slate-700 border border-slate-200 flex items-center space-x-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>{tag}</span>
                </span>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                onClick={() => onSelectService(card.category)}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group/btn"
              >
                <span>{card.ctaText}</span>
                <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

          {/* Right Column: Large High-Contrast Dashboard Visual (55%) */}
          <div className="lg:col-span-7 w-full h-full flex flex-col justify-center overflow-hidden">
            <DashboardVisual type={card.visualType} />
          </div>

        </div>
      </div>
    </motion.div>
  );
};

/**
 * WhatWeBuildStack: True Vertical Scroll-Driven Card Stack
 */
const WhatWeBuildStack = ({ onStartProject }) => {
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Check user preference for reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handleChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Single smooth scroll progress for the whole section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001
  });

  // Track active step based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      let step = 0;
      if (latest < 0.16) step = 0;
      else if (latest < 0.36) step = 1;
      else if (latest < 0.56) step = 2;
      else if (latest < 0.76) step = 3;
      else if (latest < 0.92) step = 4;
      else step = 5;
      setActiveStep(step);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section 
      ref={containerRef} 
      id="what-we-build" 
      className="relative w-full bg-[#F8FAFC] text-slate-900 border-y border-slate-200/80"
      style={{
        height: isReducedMotion ? 'auto' : '520vh'
      }}
    >
      {/* Subtle Light Ambient Background Gradients & Micro Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(59,130,246,0.08),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a08_1px,transparent_1px),linear-gradient(to_bottom,#0f172a08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Sticky Viewport: Remains fixed in visible viewport during vertical scroll */}
      <div className={`${isReducedMotion ? 'relative py-16' : 'sticky top-0 min-h-screen sm:h-screen'} w-full flex flex-col justify-between items-center py-4 sm:py-6 px-4 sm:px-6 max-w-7xl mx-auto z-10`}>
        
        {/* Section Header: Bold, Large & Connected to Cards */}
        <div className="text-center space-y-1.5 max-w-3xl mx-auto mb-2 sm:mb-4 shrink-0">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50/80 text-blue-700 text-xs font-semibold uppercase tracking-wider shadow-xs">
            <Sparkles size={13} className="text-blue-600" />
            <span>GONEXORA TECHS • TECHNOLOGY • INNOVATION</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[60px] font-extrabold font-display text-[#0B1220] tracking-tight leading-none mt-1">
            WHAT WE BUILD
          </h2>

          <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed mt-1">
            From intelligent AI systems to scalable digital products, we turn ideas into technology that creates real-world impact.
          </p>
        </div>

        {/* Large Vertically Stacked Card Viewport */}
        <div className="relative w-full max-w-[1180px] h-[520px] sm:h-[550px] lg:h-[580px] mx-auto flex items-center justify-center">
          {CAPABILITIES.map((card, idx) => (
            <StorytellingCard
              key={card.id}
              card={card}
              index={idx}
              total={CAPABILITIES.length}
              scrollProgress={smoothProgress}
              isReducedMotion={isReducedMotion}
              onSelectService={onStartProject}
            />
          ))}
        </div>

        {/* Bottom Bar: Progress Indicator & Project CTA */}
        <div className="w-full max-w-[1180px] flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 mt-2 border-t border-slate-200/80 text-xs text-slate-500 shrink-0">
          
          {/* Active Story Step Indicator */}
          <div className="flex items-center space-x-3">
            <span className="font-mono text-blue-600 font-extrabold text-sm">
              {CAPABILITIES[activeStep].step} / 06
            </span>
            <span className="text-slate-300">•</span>
            <span className="font-bold text-slate-800 truncate max-w-[200px] sm:max-w-none">
              {CAPABILITIES[activeStep].category}
            </span>
          </div>

          {/* Stepper Dots */}
          <div className="flex items-center space-x-2">
            {CAPABILITIES.map((_, i) => (
              <div 
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeStep === i 
                    ? 'w-7 bg-blue-600 shadow-xs' 
                    : 'w-2.5 bg-slate-300'
                }`} 
              />
            ))}
          </div>

          {/* Bottom Project Inquiry Prompt */}
          <div className="flex items-center space-x-3">
            <span className="text-slate-600 hidden md:inline">Want to build something with us?</span>
            <button
              onClick={() => onStartProject('Enterprise Solution')}
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowRight size={13} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default WhatWeBuildStack;
