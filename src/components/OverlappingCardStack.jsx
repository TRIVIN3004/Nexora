import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Briefcase, FileText, GraduationCap, Award, 
  ArrowUpRight, Sparkles, CheckCircle2, ShieldCheck, Zap,
  ExternalLink, Globe, Lock, ArrowRight, Layers
} from 'lucide-react';

const OVERLAPPING_CARDS = [
  {
    id: 'nexora-connect',
    step: '01',
    category: 'ENTERPRISE COLLABORATION',
    title: 'Nexora Connect Workspace',
    tagline: 'Real-Time Synchronized Engineering Hub',
    description: 'Centralized engineering ecosystem featuring live synchronized masterclasses, team standups, searchable video archives, technical wiki repositories, and dedicated ticket resolution desks.',
    features: [
      'HD Video Masterclasses & Screen Sync',
      'Realtime Markdown Wiki Collaboration',
      'Engineering Standup & Topic Channels',
      'Integrated Ticket Resolution Helpdesk'
    ],
    metrics: [
      { label: 'Latency', val: '< 24ms', desc: 'Ultra-Low' },
      { label: 'Sync State', val: 'Active 100%', desc: 'Realtime' },
      { label: 'Bandwidth', val: 'Edge CDN', desc: 'Global Anycast' }
    ],
    icon: Users,
    gradient: 'from-indigo-600 via-blue-600 to-cyan-500',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    glow: 'rgba(99, 102, 241, 0.22)',
    url: 'https://nexora-connect-seven.vercel.app/',
    highlight: 'Official Production Portal'
  },
  {
    id: 'hiregen-portal',
    step: '02',
    category: 'AI TALENT RECRUITMENT',
    title: 'HireGen Smart Recruiter',
    tagline: 'Intelligent Candidate Parsing & Evaluation',
    description: 'Automated ML resume ingestion pipelines that benchmark technical capabilities, predict candidate success vectors, and execute structured AI-driven interview assessments.',
    features: [
      'Multi-Format ML Resume Ingestion',
      'BERT + LLM Capability Benchmarking',
      'Automated Fit Prediction Scoring',
      'Structured Assessment Generator'
    ],
    metrics: [
      { label: 'Parse Accuracy', val: '98.9%', desc: 'Top Tier' },
      { label: 'Scoring Model', val: 'BERT+LLM', desc: 'Fine-Tuned' },
      { label: 'Time-to-Hire', val: '-65%', desc: 'Acceleration' }
    ],
    icon: Briefcase,
    gradient: 'from-purple-600 via-fuchsia-600 to-pink-500',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    glow: 'rgba(168, 85, 247, 0.22)',
    url: 'https://hiregen-smart-recruiter.vercel.app/',
    highlight: 'AI Intelligence Suite'
  },
  {
    id: 'dpr-portal',
    step: '03',
    category: 'OPERATIONS & SPRINT ANALYTICS',
    title: 'DPR Progress Analytics',
    tagline: 'Automated Daily Project Reporting Engine',
    description: 'Real-time deliverable tracking software generating encrypted client milestone reports, velocity trend forecasting, and instant sprint completion summaries.',
    features: [
      'Automated Daily Milestone Tracker',
      'Burndown & Velocity Forecasting',
      'Encrypted Client PDF Exporters',
      'Audited Deliverable Checkpoints'
    ],
    metrics: [
      { label: 'Sprint Velocity', val: '+42% MoM', desc: 'Consistent' },
      { label: 'Audit Trail', val: '100% Signed', desc: 'Cryptographic' },
      { label: 'Auto Exports', val: 'Daily 18:00', desc: 'Automated' }
    ],
    icon: FileText,
    gradient: 'from-blue-600 via-sky-500 to-teal-400',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    glow: 'rgba(37, 99, 235, 0.22)',
    url: 'https://dpr-nexora.vercel.app/',
    highlight: 'Core Business System'
  },
  {
    id: 'internship-portal',
    step: '04',
    category: 'ACADEMIC & TALENT ACCELERATOR',
    title: 'Nexora Internship Hub',
    tagline: 'Mentorship, Task Workflows & Credentials',
    description: 'Student-to-engineer accelerator providing domain-specific tasks, direct review from senior architects, and verifiable cryptographic completion credentials.',
    features: [
      'Structured Domain-Specific Tasks',
      'Senior Architect Direct Reviews',
      'Realtime Milestone Progress Tracking',
      'Verifiable Cryptographic Credentials'
    ],
    metrics: [
      { label: 'Completion Rate', val: '97.4%', desc: 'High Quality' },
      { label: 'Active Mentors', val: '24 Seniors', desc: 'Specialists' },
      { label: 'Credential Format', val: 'Signed Hash', desc: 'SHA-256' }
    ],
    icon: GraduationCap,
    gradient: 'from-cyan-600 via-teal-500 to-emerald-400',
    badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    glow: 'rgba(6, 182, 212, 0.22)',
    url: 'https://internship-portal-silk.vercel.app/',
    highlight: 'Academic Accelerator'
  },
  {
    id: 'prdams-portal',
    step: '05',
    category: 'CRYPTOGRAPHIC SECURITY',
    title: 'PRDAMS Digital Clearance',
    tagline: 'Verified Project Receipts & Acknowledgements',
    description: 'Tamper-proof digital receipt generator for institutional project verification, financial clearance vouchers, and cryptographically stamped PDF logs.',
    features: [
      'Tamper-Proof Receipt Generation',
      'Institutional Financial Clearance',
      'AES-256 GCM Cryptographic Stamp',
      'Instant Ledger Verification API'
    ],
    metrics: [
      { label: 'Cipher Standard', val: 'AES-256 GCM', desc: 'Military Grade' },
      { label: 'Verification Time', val: '< 100ms', desc: 'Instant SLA' },
      { label: 'Audit Status', val: 'Compliant', desc: 'ISO/IEC 27001' }
    ],
    icon: Award,
    gradient: 'from-emerald-600 via-teal-600 to-indigo-600',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    glow: 'rgba(16, 185, 129, 0.22)',
    url: 'https://acknowledgement-generator-roan.vercel.app/',
    highlight: 'Official Cryptographic Hub'
  }
];

/**
 * OverlappingCardStack: Clean, official, buttery-smooth overlapping card deck on scroll
 */
const OverlappingCardStack = () => {
  return (
    <div className="w-full relative py-4 sm:py-8">
      <div className="w-full max-w-4xl mx-auto space-y-8 sm:space-y-12">
        {OVERLAPPING_CARDS.map((card, idx) => {
          const Icon = card.icon;
          // Offset each card so the top headers stay visible in a stacked deck fashion
          const stickyTop = `calc(75px + ${idx * 24}px)`;

          return (
            <div
              key={card.id}
              className="sticky transition-all duration-300 w-full"
              style={{
                top: stickyTop,
                zIndex: idx + 1,
              }}
            >
              <div 
                className="w-full rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 bg-white/98 backdrop-blur-2xl shadow-2xl transition-all duration-300 relative overflow-hidden group text-left"
                style={{
                  boxShadow: `0 -16px 36px -4px rgba(15, 23, 42, 0.08), 0 24px 48px -12px ${card.glow}`,
                  transform: 'translateZ(0)',
                  willChange: 'transform',
                }}
              >
                {/* Top Gradient Banner Line */}
                <div className={`absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r ${card.gradient}`} />

                {/* Subtle Ambient Background Corner Glow */}
                <div 
                  className={`absolute -right-20 -top-20 w-80 h-80 rounded-full bg-gradient-to-br ${card.gradient} opacity-10 blur-3xl pointer-events-none group-hover:opacity-20 transition-opacity duration-500`} 
                />

                <div className="space-y-6 relative z-10">
                  {/* Top Bar: Icon + Category Badge + Deck Step */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center space-x-3.5">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center bg-slate-100 border border-slate-200 text-blue-600 shadow-xs group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                        <Icon size={24} className="sm:size-7" />
                      </div>
                      <div>
                        <span className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider border ${card.badgeColor}`}>
                          {card.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-xs font-mono font-bold text-slate-400 bg-slate-100 px-3.5 py-1 rounded-full border border-slate-200">
                      <span className="text-blue-600 font-extrabold">DECK {card.step}</span>
                      <span>/ 05</span>
                    </div>
                  </div>

                  {/* Title, Tagline & Description */}
                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-slate-900 group-hover:text-blue-600 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-blue-600 text-xs sm:text-sm font-bold font-mono uppercase tracking-wide">
                      {card.tagline}
                    </p>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-1 max-w-3xl">
                      {card.description}
                    </p>
                  </div>

                  {/* Key Capabilities / Features Pill List */}
                  <div className="space-y-2 pt-1">
                    <div className="text-[11px] font-mono font-bold uppercase text-slate-400 tracking-wider">
                      Core Platform Capabilities
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {card.features.map((feat, fIdx) => (
                        <div 
                          key={fIdx} 
                          className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-slate-50/90 border border-slate-200/80 text-xs text-slate-700 font-medium"
                        >
                          <CheckCircle2 size={15} className="text-blue-600 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Metrics Bar */}
                  <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-100">
                    {card.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 text-left">
                        <div className="text-[10px] font-mono text-slate-400 uppercase truncate">{m.label}</div>
                        <div className="text-base sm:text-lg font-extrabold font-display text-slate-900 mt-0.5">{m.val}</div>
                        <div className="text-[10px] font-mono text-blue-600 font-medium">{m.desc}</div>
                      </div>
                    ))}
                  </div>

                  {/* Action Bar */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100">
                    <a
                      href={card.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-6 sm:px-7 py-3 rounded-2xl bg-blue-600 text-white font-bold text-xs sm:text-sm shadow-md hover:bg-blue-700 hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 group/btn"
                    >
                      <span>Launch Live Portal</span>
                      <ArrowUpRight size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>

                    <div className="flex items-center space-x-2 text-xs font-mono text-slate-500">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-semibold text-slate-700">{card.highlight}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OverlappingCardStack;
