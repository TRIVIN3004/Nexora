import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Sparkles, Zap, ArrowRight, Play, Shield, Cpu } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function LogoCreationAnimation({ onComplete, onSkip }) {
  const [stage, setStage] = useState(0); 
  // 0: Cinematic "INTRODUCING" Prologue (0s - 1.2s)
  // 1: Vector Blueprint & Laser Schematic (1.2s - 2.4s)
  // 2: 3D Shard Convergence & Laser Welding (2.4s - 3.6s)
  // 3: The Signature Diagonal Slash & Shockwave (3.6s - 4.6s)
  // 4: Grand Brand Reveal "GONEXORA TECHS" (4.6s+)

  const [progress, setProgress] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const audioCtxRef = useRef(null);
  const voicePlayedRef = useRef(false);

  // Initialize Web Audio Context on user action
  const getAudioContext = useCallback(() => {
    if (typeof window === 'undefined') return null;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // Cyber Sound FX Engine
  const playSfx = useCallback((type) => {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      if (type === 'whoosh') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.3);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'lock') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(420, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.18);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.18);
      } else if (type === 'slash') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(1600, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.4);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === 'grand') {
        [440, 554.37, 659.25, 880, 1108.73].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + i * 0.05);
          gain.gain.setValueAtTime(0.06, now + i * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2 + i * 0.05);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.05);
          osc.stop(now + 1.3 + i * 0.05);
        });
      }
    } catch (e) {
      console.warn("Audio synth error:", e);
    }
  }, [soundEnabled, getAudioContext]);

  // Voice Greeting
  const speakGreeting = useCallback(() => {
    if (!soundEnabled || voicePlayedRef.current) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance("Introducing GoNexora Techs");
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.lang.startsWith('en'));
      if (voice) utterance.voice = voice;
      utterance.rate = 0.92;
      utterance.pitch = 1.05;
      window.speechSynthesis.speak(utterance);
      voicePlayedRef.current = true;
    } catch (e) {
      console.warn("Speech error:", e);
    }
  }, [soundEnabled]);

  // Cinematic Sequence Timeline (Total ~5.2s before auto-proceed)
  useEffect(() => {
    const startTime = Date.now();
    const duration = 5000;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 18) {
        setStage(0); // "INTRODUCING..." Prologue
      } else if (pct < 42) {
        if (stage < 1) playSfx('whoosh');
        setStage(1); // Blueprint & Laser Tracing
      } else if (pct < 68) {
        if (stage < 2) playSfx('lock');
        setStage(2); // 3D Modules Convergence & Welding
      } else if (pct < 88) {
        if (stage < 3) {
          playSfx('slash');
          speakGreeting();
        }
        setStage(3); // Diagonal Slash & Laser Ignition
      } else {
        if (stage < 4) playSfx('grand');
        setStage(4); // Master Brand Reveal
      }

      if (pct >= 100) {
        clearInterval(timer);
        const autoProceedTimer = setTimeout(() => {
          if (onComplete) onComplete();
        }, 1200);
        return () => clearTimeout(autoProceedTimer);
      }
    }, 35);

    return () => clearInterval(timer);
  }, [stage, playSfx, speakGreeting, onComplete]);

  // Mouse Parallax
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  // Spark Particles
  const sparks = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => {
      const angle = (i * 360) / 20;
      const rad = (angle * Math.PI) / 180;
      const dist = 70 + (i % 4) * 25;
      return {
        id: i,
        x: Math.cos(rad) * dist,
        y: Math.sin(rad) * dist,
        size: 2 + (i % 3),
        delay: (i % 5) * 0.1
      };
    });
  }, []);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-2xl mx-auto flex flex-col items-center justify-center select-none py-6 px-4 text-white"
      style={{ perspective: '1200px' }}
    >
      {/* Top Controls Bar */}
      <div className="absolute top-0 left-4 right-4 flex items-center justify-between z-50">
        {/* Tech Badge */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-cyan-400 tracking-wider">
          <Cpu className="w-3 h-3 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span>GONEXORA CORE MATRIX</span>
        </div>

        {/* Audio Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!soundEnabled) {
              setSoundEnabled(true);
              getAudioContext();
              setTimeout(() => playSfx('grand'), 50);
            } else {
              setSoundEnabled(false);
              if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
              }
            }
          }}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono tracking-wider transition-all duration-300 border ${
            soundEnabled 
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]' 
              : 'bg-white/5 text-slate-400 border-white/10 hover:text-white hover:border-white/20'
          }`}
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="font-semibold text-cyan-300">SOUND ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-slate-400" />
              <span>SOUND OFF</span>
            </>
          )}
        </button>
      </div>

      {/* ACT 0: PROLOGUE "INTRODUCING..." (Fades at Stage 0) */}
      <div className="h-8 flex items-center justify-center mt-6">
        <AnimatePresence mode="wait">
          {stage === 0 ? (
            <motion.div
              key="prologue"
              initial={{ opacity: 0, y: 10, letterSpacing: "0.2em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.45em" }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8 }}
              className="text-xs sm:text-sm font-mono text-cyan-400 font-bold uppercase tracking-[0.45em] drop-shadow-[0_0_12px_rgba(56,189,248,0.7)] flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>INTRODUCING</span>
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            </motion.div>
          ) : (
            <motion.div
              key="creating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[11px] font-mono tracking-[0.25em] text-slate-400 uppercase flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>{stage >= 4 ? "SYSTEM READY • ONLINE" : "CRAFTING BRAND IDENTITY..."}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* MAIN CINEMATIC 3D LOGO CREATION STAGE */}
      <div 
        className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center my-3"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${-mousePos.y * 12}deg) rotateY(${mousePos.x * 12}deg)`,
          transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s ease-out',
        }}
      >
        {/* Volumetric Radial Light Glow */}
        <div 
          className="absolute inset-0 rounded-full blur-[60px] pointer-events-none transition-all duration-700"
          style={{
            background: stage >= 3 
              ? 'radial-gradient(circle, rgba(56, 189, 248, 0.45) 0%, rgba(99, 102, 241, 0.3) 45%, transparent 75%)'
              : 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, rgba(30, 58, 138, 0.15) 50%, transparent 70%)',
            transform: 'scale(1.3)'
          }}
        />

        {/* 1. Orbiting Geometric HUD Blueprint Rings */}
        <svg viewBox="0 0 260 260" className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {/* Outer Calibration Compass Ring */}
          <motion.circle
            cx="130"
            cy="130"
            r="120"
            fill="none"
            stroke="rgba(56, 189, 248, 0.25)"
            strokeWidth="1"
            strokeDasharray="6 12"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
            style={{ transformOrigin: "130px 130px" }}
          />

          {/* Secondary Precision Ring */}
          <motion.circle
            cx="130"
            cy="130"
            r="104"
            fill="none"
            stroke="rgba(99, 102, 241, 0.35)"
            strokeWidth="1.5"
            strokeDasharray="35 15 10 15"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
            style={{ transformOrigin: "130px 130px" }}
          />

          {/* Caliper Crosshairs */}
          <line x1="130" y1="5" x2="130" y2="28" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="1.5" />
          <line x1="130" y1="232" x2="130" y2="255" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="1.5" />
          <line x1="5" y1="130" x2="28" y2="130" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="1.5" />
          <line x1="232" y1="130" x2="255" y2="130" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="1.5" />

          {/* Laser Traced Blueprint Curves (Active in Stage 1 & 2) */}
          <g opacity={stage < 3 ? 0.85 : 0.2} style={{ transition: 'opacity 0.6s ease' }}>
            <motion.circle
              cx="105"
              cy="135"
              r="50"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeDasharray="10 5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: stage >= 1 ? 1 : 0 }}
              transition={{ duration: 1.0, ease: "easeInOut" }}
            />
            <motion.line
              x1="50"
              y1="190"
              x2="150"
              y2="90"
              stroke="#00f2fe"
              strokeWidth="3"
              strokeDasharray="6 6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: stage >= 1 ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
            />
            <motion.path
              d="M 130 95 L 130 175 M 130 95 L 180 175 M 180 95 L 180 175"
              fill="none"
              stroke="#818cf8"
              strokeWidth="2.5"
              strokeDasharray="8 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: stage >= 1 ? 1 : 0 }}
              transition={{ duration: 1.0, delay: 0.4, ease: "easeInOut" }}
            />
            <motion.line
              x1="155"
              y1="80"
              x2="205"
              y2="80"
              stroke="#38bdf8"
              strokeWidth="3.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: stage >= 1 ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeInOut" }}
            />
          </g>
        </svg>

        {/* 2. THE 3D LOGO CREATION CANVAS */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 z-20 flex items-center justify-center">
          
          {/* COMPONENT 1: The 'G' Arc - Flying in from Left (Stage 2+) */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{ clipPath: 'polygon(0% 0%, 54% 0%, 30% 100%, 0% 100%)' }}
            initial={{ x: -160, y: 40, rotateY: -70, opacity: 0, scale: 0.6 }}
            animate={stage >= 2 ? {
              x: 0,
              y: 0,
              rotateY: 0,
              opacity: 1,
              scale: 1
            } : { x: -160, y: 40, rotateY: -70, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 13 }}
          >
            <img 
              src={logoImg} 
              alt="Nexora G Structure" 
              className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(56,189,248,0.7)]" 
            />
          </motion.div>

          {/* COMPONENT 2: The 'N' Pillar - Flying in from Right (Stage 2+) */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{ clipPath: 'polygon(48% 28%, 100% 28%, 100% 100%, 26% 100%)' }}
            initial={{ x: 160, y: 40, rotateY: 70, opacity: 0, scale: 0.6 }}
            animate={stage >= 2 ? {
              x: 0,
              y: 0,
              rotateY: 0,
              opacity: 1,
              scale: 1
            } : { x: 160, y: 40, rotateY: 70, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.8, delay: 0.15, type: "spring", stiffness: 100, damping: 13 }}
          >
            <img 
              src={logoImg} 
              alt="Nexora N Structure" 
              className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(129,140,248,0.7)]" 
            />
          </motion.div>

          {/* COMPONENT 3: The 'T' Overhead Bar - Descending from Top (Stage 2+) */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{ clipPath: 'polygon(56% 0%, 100% 0%, 100% 28%, 56% 28%)' }}
            initial={{ y: -100, scaleY: 0.2, opacity: 0 }}
            animate={stage >= 2 ? {
              y: 0,
              scaleY: 1,
              opacity: 1
            } : { y: -100, scaleY: 0.2, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 120, damping: 14 }}
          >
            <img 
              src={logoImg} 
              alt="Nexora T Structure" 
              className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(56,189,248,0.7)]" 
            />
          </motion.div>

          {/* COMPONENT 4: THE SIGNATURE LASER SLASH (Stage 3) */}
          {stage === 3 && (
            <motion.div
              className="absolute z-50 pointer-events-none"
              style={{
                top: '50%',
                left: '50%',
                width: '210px',
                height: '4px',
                transform: 'translate(-50%, -50%) rotate(-45deg)',
                background: 'linear-gradient(90deg, transparent, #ffffff, #38bdf8, transparent)',
                boxShadow: '0 0 25px #ffffff, 0 0 45px #00f2fe'
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: [0, 1.7, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          )}

          {/* COMPONENT 5: MASTER UNIFIED 3D LOGO (Stage 3 & 4) */}
          {stage >= 3 && (
            <motion.div
              className="absolute inset-0 w-full h-full z-30 flex items-center justify-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                y: [0, -5, 0]
              }}
              transition={{ 
                scale: { duration: 0.5, type: "spring", stiffness: 160 },
                y: { repeat: Infinity, duration: 3.5, ease: "easeInOut" }
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* 3D Multi-Layer Extrusion Depth */}
              {[3, 2, 1].map((depth) => (
                <img
                  key={depth}
                  src={logoImg}
                  alt="3D Extruded Depth"
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none opacity-35"
                  style={{
                    transform: `translateZ(${-depth * 6}px) translateY(${depth * 1.5}px)`,
                    filter: 'brightness(45%) drop-shadow(0 0 12px rgba(59,130,246,0.35))'
                  }}
                />
              ))}

              {/* Master Front Emblem */}
              <img
                src={logoImg}
                alt="GoNexora Techs Logo"
                className="relative w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(56,189,248,0.6)]"
              />

              {/* Chrome Shimmer Light Reflection Sweep */}
              <motion.div
                className="absolute inset-0 overflow-hidden pointer-events-none rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.2, delay: 0.1 }}
              >
                <motion.div
                  className="w-[200%] h-full bg-gradient-to-r from-transparent via-white/80 to-transparent -skew-x-45"
                  initial={{ x: '-150%' }}
                  animate={{ x: '150%' }}
                  transition={{ duration: 1.1, ease: "easeOut" }}
                />
              </motion.div>
            </motion.div>
          )}

          {/* Fusion Energy Ripple Shockwave */}
          {stage >= 3 && (
            <motion.div
              className="absolute rounded-full border-2 border-cyan-400/90 pointer-events-none z-10"
              initial={{ width: 40, height: 40, opacity: 1, scale: 0.4 }}
              animate={{ width: 300, height: 300, opacity: 0, scale: 1.3 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
            />
          )}

          {/* Spark Particles Burst */}
          {stage === 3 && sparks.map((s) => (
            <motion.div
              key={s.id}
              className="absolute rounded-full bg-cyan-300 shadow-[0_0_10px_#38bdf8]"
              style={{
                width: s.size,
                height: s.size,
                left: '50%',
                top: '50%'
              }}
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{ x: s.x, y: s.y, opacity: 0 }}
              transition={{ duration: 0.8, delay: s.delay, ease: "easeOut" }}
            />
          ))}
        </div>
      </div>

      {/* BRAND INTRODUCTION TYPOGRAPHY (Grand Reveal at Stage 3 & 4) */}
      <div className="mt-2 flex flex-col items-center text-center space-y-2.5 z-40 max-w-md">
        
        {/* Main Title "GONEXORA TECHS" */}
        <motion.div
          className="flex items-center gap-2.5"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: stage >= 2 ? 1 : 0.3, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-5xl font-black tracking-[0.2em] font-display bg-gradient-to-r from-white via-cyan-100 to-slate-200 bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(56,189,248,0.4)]">
            GONEXORA
          </h1>
          <motion.span 
            className="px-2.5 py-1 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 border border-cyan-400/50 text-cyan-200 font-mono text-xs sm:text-base font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(6,182,212,0.35)]"
            initial={{ scale: 0 }}
            animate={{ scale: stage >= 3 ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 180 }}
          >
            TECHS
          </motion.span>
        </motion.div>

        {/* Tagline */}
        <motion.p 
          className="text-xs sm:text-sm font-display tracking-[0.25em] text-slate-300 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 3 ? 1 : 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-cyan-400">"</span>BUILDING TOMORROW, TODAY<span className="text-cyan-400">"</span>
        </motion.p>

        {/* Progress Matrix Line */}
        <div className="w-64 sm:w-80 space-y-1 pt-2">
          <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5 text-cyan-300">
              <Zap className="w-3 h-3 text-cyan-400 animate-pulse" />
              {stage >= 4 ? "ASSEMBLY 100% COMPLETE" : "CREATING LOGO IDENTITY"}
            </span>
            <span className="font-bold text-cyan-300">{progress}%</span>
          </div>

          <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden p-[1px] border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
            <motion.div 
              className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 relative"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            >
              <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-white shadow-[0_0_10px_#ffffff] rounded-full" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ENTER SITE / SKIP ACTION CTA */}
      <div className="mt-6 flex items-center gap-3 z-50">
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            if (onSkip) onSkip();
            else if (onComplete) onComplete();
          }}
          className={`group flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer ${
            stage >= 3 
              ? 'bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 text-white font-bold border border-cyan-300/60 shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:shadow-[0_0_35px_rgba(6,182,212,0.8)]' 
              : 'bg-white/5 border border-white/15 text-slate-300 hover:text-white hover:border-white/30 hover:bg-white/10'
          }`}
        >
          <span>{stage >= 3 ? "ENTER EXPERIENCE" : "SKIP INTRO"}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </div>
  );
}
