import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

export default function WelcomeNamaste() {
  const [joined, setJoined] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [voiceMuted, setVoiceMuted] = useState(false);
  const voicePlayedRef = useRef(false);

  // Define SVG path commands for morphing sleeves and hands
  // Left Sleeve: shoulder (68, 75) to wrist
  const leftSleeveOpen = "M 68 75 C 45 95, 30 110, 25 120";
  const leftSleeveClosed = "M 68 75 C 52 100, 78 105, 96 95";

  // Left Hand: wrist to fingertips (closed loop for solid silhouette)
  const leftHandOpen = "M 25 120 C 23 118, 18 108, 14 110 C 11 112, 17 122, 23 124 Z";
  const leftHandClosed = "M 96 95 C 96 95, 96 73, 96 73 C 96 71, 94 71, 94 73 C 94 78, 92 88, 92 95 Z";

  // Right Sleeve: shoulder (132, 75) to wrist
  const rightSleeveOpen = "M 132 75 C 155 95, 170 110, 175 120";
  const rightSleeveClosed = "M 132 75 C 148 100, 122 105, 104 95";

  // Right Hand: wrist to fingertips
  const rightHandOpen = "M 175 120 C 177 118, 182 108, 186 110 C 189 112, 183 122, 177 124 Z";
  const rightHandClosed = "M 104 95 C 104 95, 104 73, 104 73 C 104 71, 106 71, 106 73 C 106 78, 108 88, 108 95 Z";

  const speakGreeting = () => {
    if (voiceMuted || voicePlayedRef.current) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel();
      const text = "Welcome to Nexora Technologies";
      const utterance = new SpeechSynthesisUtterance(text);
      
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Google US English') ||
        voice.name.includes('Google UK English Female') ||
        voice.name.includes('Samantha') ||
        voice.name.includes('Microsoft Zira') ||
        voice.lang.startsWith('en')
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      utterance.rate = 0.92;
      utterance.pitch = 1.05;
      utterance.volume = 1.0;

      window.speechSynthesis.speak(utterance);
      voicePlayedRef.current = true;
    } catch (e) {
      console.warn("Speech Synthesis failed to speak:", e);
    }
  };

  useEffect(() => {
    // 1. Join hands after 500ms
    const joinTimer = setTimeout(() => {
      setJoined(true);
    }, 500);

    // 2. Trigger particles and voice greeting after hands join (approx 1500ms total)
    const particleTimer = setTimeout(() => {
      setShowParticles(true);
      trySpeak();
    }, 1500);

    const trySpeak = () => {
      if (voicePlayedRef.current) return;
      speakGreeting();
    };

    const events = ['click', 'mousedown', 'keydown', 'touchstart', 'pointerdown', 'mousemove'];
    const handleUserInteraction = () => {
      if (!voicePlayedRef.current && joined) {
        trySpeak();
      }
    };

    events.forEach(event => {
      window.addEventListener(event, handleUserInteraction, { passive: true });
    });

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        if (!voicePlayedRef.current && showParticles) {
          trySpeak();
        }
      };
    }

    return () => {
      clearTimeout(joinTimer);
      clearTimeout(particleTimer);
      events.forEach(event => {
        window.removeEventListener(event, handleUserInteraction);
      });
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [joined, showParticles, voiceMuted]);

  const handleReplayVoice = (e) => {
    e.stopPropagation();
    voicePlayedRef.current = false;
    speakGreeting();
  };

  // Particles coordinates
  const particleCount = 18;
  const particles = Array.from({ length: particleCount }).map((_, i) => {
    const angle = (i * 360) / particleCount;
    const rad = (angle * Math.PI) / 180;
    const distance = 45 + Math.random() * 30;
    return {
      id: i,
      x: Math.cos(rad) * distance,
      y: Math.sin(rad) * distance,
      size: 1.5 + Math.random() * 2
    };
  });

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      
      {/* Speaker Control */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (voiceMuted) {
            setVoiceMuted(false);
            voicePlayedRef.current = false;
            setTimeout(() => speakGreeting(), 100);
          } else {
            setVoiceMuted(true);
            if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
              window.speechSynthesis.cancel();
            }
          }
        }}
        className="absolute -top-12 right-0 p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 z-50 flex items-center gap-1.5 text-xs font-mono"
        title={voiceMuted ? "Unmute Welcome Greeting" : "Mute Welcome Greeting"}
      >
        {voiceMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
        <span>{voiceMuted ? "MUTED" : "SOUND ON"}</span>
      </button>

      {/* Main Welcoming SVG */}
      <div className="relative w-48 h-48 bg-slate-900/40 rounded-3xl border border-white/5 shadow-inner p-3 overflow-hidden flex items-center justify-center">
        {/* Backdrop Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-cyan-500/5 opacity-50" />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_15px_rgba(99,102,241,0.25)]">
          <defs>
            <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <radialGradient id="haloGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
              <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.18)" />
              <stop offset="100%" stopColor="rgba(99, 102, 241, 0.05)" />
            </linearGradient>
            <linearGradient id="dhotiGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.22)" />
              <stop offset="100%" stopColor="rgba(6, 182, 212, 0.05)" />
            </linearGradient>
          </defs>

          {/* Halo Backdrop */}
          <motion.circle 
            cx="100" 
            cy="55" 
            r="45" 
            fill="url(#haloGradient)"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          {/* --- TRADITIONAL INDIAN CLOTHING SYSTEM --- */}
          
          {/* 1. Traditional Dhoti (Veshti) Draped Bottom */}
          <motion.path 
            d="M 72 125 L 60 178 C 80 181, 120 181, 140 178 L 128 125 Z" 
            fill="url(#dhotiGrad)" 
            stroke="url(#neonGradient)" 
            strokeWidth="1.5" 
            strokeLinejoin="round"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
          />

          {/* Dhoti Gold Zari Bottom Border */}
          <motion.path 
            d="M 60 177 C 80 180, 120 180, 140 177" 
            fill="none" 
            stroke="#fbbf24" // Gold zari color
            strokeWidth="3.5" 
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.6, duration: 1.2, ease: "easeInOut" }}
          />

          {/* Dhoti Vertical Gold Pleat Border (Kasavu Style) */}
          <motion.path 
            d="M 100 125 L 100 179" 
            fill="none" 
            stroke="#fbbf24" 
            strokeWidth="2.5" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.7, duration: 1.2, ease: "easeInOut" }}
          />

          {/* Dhoti Crease/Fold Lines */}
          <motion.path 
            d="M 82 130 C 86 148, 91 162, 95 176" 
            fill="none" 
            stroke="url(#neonGradient)" 
            strokeWidth="0.8" 
            opacity="0.35"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5, duration: 1.5 }}
          />
          <motion.path 
            d="M 118 130 C 114 148, 109 162, 105 176" 
            fill="none" 
            stroke="url(#neonGradient)" 
            strokeWidth="0.8" 
            opacity="0.35"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5, duration: 1.5 }}
          />

          {/* 2. Traditional Indian Shirt (Kurta / Juba) Torso */}
          <motion.path 
            d="M 68 75 Q 100 80 132 75 L 128 125 H 72 Z" 
            fill="url(#shirtGrad)" 
            stroke="url(#neonGradient)" 
            strokeWidth="1.5" 
            strokeLinejoin="round"
            initial={{ opacity: 0, scaleY: 0.8 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          {/* Kurta Neckline (Mandarin / Nehru Collar V-Neck) */}
          <path 
            d="M 88 62 C 88 74, 112 74, 112 62" 
            fill="none" 
            stroke="url(#neonGradient)" 
            strokeWidth="1.5" 
          />
          <path 
            d="M 100 70 L 100 95" 
            fill="none" 
            stroke="url(#neonGradient)" 
            strokeWidth="1.5" 
            strokeDasharray="2 3" // Simulated button dots
          />

          {/* Neck cylinder */}
          <rect x="96" y="55" width="8" height="8" rx="2" fill="#0b0f19" stroke="url(#neonGradient)" strokeWidth="1.5" />

          {/* Minimalist Indian Man Head with Hair */}
          <motion.g
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
          >
            {/* Hair contour */}
            <path 
              d="M 82 45 C 80 30, 120 30, 118 45 C 122 35, 115 24, 100 24 C 85 24, 78 35, 82 45 Z" 
              fill="url(#neonGradient)" 
              opacity="0.85" 
            />
            {/* Head Face Circle */}
            <circle 
              cx="100" 
              cy="42" 
              r="15" 
              fill="#0b0f19" 
              stroke="url(#neonGradient)" 
              strokeWidth="2.5"
            />
          </motion.g>

          {/* Tilak / Forehead Dot (Traditional Touch) */}
          <motion.circle 
            cx="100" 
            cy="37" 
            r="2" 
            fill="#22d3ee" 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          />

          {/* --- SHIRT SLEEVES AND HANDS ANIMATION --- */}

          {/* Left Sleeve (Kurta sleeve) */}
          <motion.path
            d={joined ? leftSleeveClosed : leftSleeveOpen}
            fill="none"
            stroke="url(#shirtGrad)"
            strokeWidth="7"
            strokeLinecap="round"
            animate={{ d: joined ? leftSleeveClosed : leftSleeveOpen }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          />
          {/* Left Sleeve Outline Accent */}
          <motion.path
            d={joined ? leftSleeveClosed : leftSleeveOpen}
            fill="none"
            stroke="url(#neonGradient)"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.6"
            animate={{ d: joined ? leftSleeveClosed : leftSleeveOpen }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          />

          {/* Left Hand (Cyan glowing palm silhouette) */}
          <motion.path
            d={joined ? leftHandClosed : leftHandOpen}
            fill="rgba(6, 182, 212, 0.15)"
            stroke="#06b6d4"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ d: joined ? leftHandClosed : leftHandOpen }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          />

          {/* Right Sleeve (Kurta sleeve) */}
          <motion.path
            d={joined ? rightSleeveClosed : rightSleeveOpen}
            fill="none"
            stroke="url(#shirtGrad)"
            strokeWidth="7"
            strokeLinecap="round"
            animate={{ d: joined ? rightSleeveClosed : rightSleeveOpen }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          />
          {/* Right Sleeve Outline Accent */}
          <motion.path
            d={joined ? rightSleeveClosed : rightSleeveOpen}
            fill="none"
            stroke="url(#neonGradient)"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.6"
            animate={{ d: joined ? rightSleeveClosed : rightSleeveOpen }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          />

          {/* Right Hand */}
          <motion.path
            d={joined ? rightHandClosed : rightHandOpen}
            fill="rgba(6, 182, 212, 0.15)"
            stroke="#06b6d4"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ d: joined ? rightHandClosed : rightHandOpen }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          />

          {/* Particle Burst when hands meet */}
          {showParticles && particles.map((p) => (
            <motion.circle
              key={p.id}
              cx={100}
              cy={84}
              r={p.size}
              fill="#06b6d4"
              initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }}
              animate={{ opacity: 0, scale: 1.5, x: p.x, y: p.y }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          ))}

          {/* Namaste Energy Glow Orb */}
          {joined && (
            <motion.circle 
              cx="100" 
              cy="84" 
              r="6" 
              fill="#06b6d4" 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0.9, 0.6] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="mix-blend-screen filter blur-[1px]"
            />
          )}
        </svg>

        {/* Hand Join Indicator Tooltip */}
        {!joined && (
          <div className="absolute bottom-2 text-[9px] font-mono text-indigo-400 animate-pulse tracking-wider">
            PREPARING WELCOME...
          </div>
        )}
        {joined && (
          <button 
            onClick={handleReplayVoice}
            className="absolute bottom-2 text-[9px] font-mono text-cyan-400 hover:text-cyan-200 transition-colors duration-200 tracking-widest cursor-pointer underline decoration-cyan-500/30 underline-offset-2"
          >
            REPLAY GREETING
          </button>
        )}
      </div>
    </div>
  );
}
