import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Sparkles, Zap, ArrowRight, Cpu } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function LogoCreationAnimation({ onComplete, onSkip }) {
  // Snappy 3-stage sequence starting IMMEDIATELY:
  // Stage 0 (0.0s - 0.6s): Instant module convergence (G, N, T snap together + blueprint sparks)
  // Stage 1 (0.6s - 1.2s): Razor diagonal laser slash + shockwave burst
  // Stage 2 (1.2s - 2.2s): 3D master logo solidified + GONEXORA TECHS brand reveal
  const [stage, setStage] = useState(0); 
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

  // Cyber Sound FX Engine (Snappy & Responsive)
  const playSfx = useCallback((type) => {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      if (type === 'snap') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.12);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'slash') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(1500, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.25);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'grand') {
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + i * 0.03);
          gain.gain.setValueAtTime(0.06, now + i * 0.03);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7 + i * 0.03);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.03);
          osc.stop(now + 0.8 + i * 0.03);
        });
      }
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }, [soundEnabled, getAudioContext]);

  // Fast & Snappy Timeline (Total ~2.2s)
  useEffect(() => {
    const startTime = Date.now();
    const duration = 2200; // Fast 2.2 seconds total

    playSfx('snap');

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 30) {
        setStage(0); // Instant Module Convergence
      } else if (pct < 60) {
        if (stage < 1) playSfx('slash');
        setStage(1); // Laser Slash
      } else {
        if (stage < 2) playSfx('grand');
        setStage(2); // Solidified Master Logo & Brand
      }

      if (pct >= 100) {
        clearInterval(timer);
        const autoProceedTimer = setTimeout(() => {
          if (onComplete) onComplete();
        }, 600);
        return () => clearTimeout(autoProceedTimer);
      }
    }, 25);

    return () => clearInterval(timer);
  }, [stage, playSfx, onComplete]);

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
    return Array.from({ length: 16 }).map((_, i) => {
      const angle = (i * 360) / 16;
      const rad = (angle * Math.PI) / 180;
      const dist = 60 + (i % 3) * 20;
      return {
        id: i,
        x: Math.cos(rad) * dist,
        y: Math.sin(rad) * dist,
        size: 2 + (i % 2),
      };
    });
  }, []);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-xl mx-auto flex flex-col items-center justify-center select-none py-4 px-4 text-white"
      style={{ perspective: '1200px' }}
    >
      {/* Top Header Bar */}
      <div className="w-full flex items-center justify-between mb-2 z-50 px-2">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 tracking-wider">
          <Zap className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span>INITIALIZING GONEXORA TECHS</span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!soundEnabled) {
              setSoundEnabled(true);
              getAudioContext();
              setTimeout(() => playSfx('grand'), 50);
            } else {
              setSoundEnabled(false);
            }
          }}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider transition-all duration-200 border ${
            soundEnabled 
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-[0_0_12px_rgba(6,182,212,0.3)]' 
              : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
          }`}
        >
          {soundEnabled ? <Volume2 className="w-3 h-3 text-cyan-400" /> : <VolumeX className="w-3 h-3 text-slate-400" />}
          <span>{soundEnabled ? "SFX ON" : "SFX OFF"}</span>
        </button>
      </div>

      {/* FAST & VISIBLE LOGO CREATION CANVAS */}
      <div 
        className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center my-2"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${-mousePos.y * 10}deg) rotateY(${mousePos.x * 10}deg)`,
          transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.4s ease-out',
        }}
      >
        {/* Dynamic Glow Aura */}
        <div 
          className="absolute inset-0 rounded-full blur-[45px] pointer-events-none transition-all duration-500"
          style={{
            background: stage >= 1 
              ? 'radial-gradient(circle, rgba(56, 189, 248, 0.45) 0%, rgba(99, 102, 241, 0.25) 50%, transparent 75%)'
              : 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(30, 58, 138, 0.15) 50%, transparent 70%)',
            transform: 'scale(1.2)'
          }}
        />

        {/* Orbiting HUD Rings */}
        <svg viewBox="0 0 240 240" className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <motion.circle
            cx="120"
            cy="120"
            r="110"
            fill="none"
            stroke="rgba(56, 189, 248, 0.3)"
            strokeWidth="1"
            strokeDasharray="6 8"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
            style={{ transformOrigin: "120px 120px" }}
          />
          <motion.circle
            cx="120"
            cy="120"
            r="94"
            fill="none"
            stroke="rgba(99, 102, 241, 0.35)"
            strokeWidth="1.5"
            strokeDasharray="25 15"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
            style={{ transformOrigin: "120px 120px" }}
          />
        </svg>

        {/* LOGO PIECES CONVERGING IMMEDIATELY */}
        <div className="relative w-44 h-44 sm:w-48 sm:h-48 z-20 flex items-center justify-center">
          
          {/* PIECE 1: Left 'G' Arc - Snaps from Left */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{ clipPath: 'polygon(0% 0%, 54% 0%, 30% 100%, 0% 100%)' }}
            initial={{ x: -70, opacity: 0, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <img 
              src={logoImg} 
              alt="Nexora G" 
              className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(56,189,248,0.7)]" 
            />
          </motion.div>

          {/* PIECE 2: Right 'N' Pillars - Snaps from Right */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{ clipPath: 'polygon(48% 28%, 100% 28%, 100% 100%, 26% 100%)' }}
            initial={{ x: 70, opacity: 0, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: 0.05, ease: "easeOut" }}
          >
            <img 
              src={logoImg} 
              alt="Nexora N" 
              className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(129,140,248,0.7)]" 
            />
          </motion.div>

          {/* PIECE 3: Top 'T' Bar - Snaps from Top */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{ clipPath: 'polygon(56% 0%, 100% 0%, 100% 28%, 56% 28%)' }}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
          >
            <img 
              src={logoImg} 
              alt="Nexora T" 
              className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(56,189,248,0.7)]" 
            />
          </motion.div>

          {/* LASER SLASH EFFECT (Stage 1) */}
          {stage === 1 && (
            <motion.div
              className="absolute z-50 pointer-events-none"
              style={{
                top: '50%',
                left: '50%',
                width: '180px',
                height: '4px',
                transform: 'translate(-50%, -50%) rotate(-45deg)',
                background: 'linear-gradient(90deg, transparent, #ffffff, #38bdf8, transparent)',
                boxShadow: '0 0 20px #ffffff, 0 0 35px #00f2fe'
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: [0, 1.6, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          )}

          {/* FULL SOLIDIFIED 3D LOGO (Stage 2) */}
          {stage >= 2 && (
            <motion.div
              className="absolute inset-0 w-full h-full z-30 flex items-center justify-center"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                y: [0, -4, 0]
              }}
              transition={{ 
                scale: { duration: 0.3, ease: "easeOut" },
                y: { repeat: Infinity, duration: 3.5, ease: "easeInOut" }
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {[2, 1].map((depth) => (
                <img
                  key={depth}
                  src={logoImg}
                  alt="3D Depth"
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none opacity-40"
                  style={{
                    transform: `translateZ(${-depth * 5}px) translateY(${depth * 1.5}px)`,
                    filter: 'brightness(45%) drop-shadow(0 0 10px rgba(59,130,246,0.35))'
                  }}
                />
              ))}

              <img
                src={logoImg}
                alt="GoNexora Master Logo"
                className="relative w-full h-full object-contain filter drop-shadow-[0_12px_28px_rgba(56,189,248,0.6)]"
              />

              {/* Specular Gleam */}
              <motion.div
                className="absolute inset-0 overflow-hidden pointer-events-none rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  className="w-[200%] h-full bg-gradient-to-r from-transparent via-white/80 to-transparent -skew-x-45"
                  initial={{ x: '-150%' }}
                  animate={{ x: '150%' }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </motion.div>
            </motion.div>
          )}

          {/* Shockwave */}
          {stage >= 1 && (
            <motion.div
              className="absolute rounded-full border border-cyan-400/90 pointer-events-none z-10"
              initial={{ width: 30, height: 30, opacity: 1, scale: 0.4 }}
              animate={{ width: 240, height: 240, opacity: 0, scale: 1.25 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          )}

          {/* Sparks */}
          {stage === 1 && sparks.map((s) => (
            <motion.div
              key={s.id}
              className="absolute rounded-full bg-cyan-300 shadow-[0_0_8px_#38bdf8]"
              style={{
                width: s.size,
                height: s.size,
                left: '50%',
                top: '50%'
              }}
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{ x: s.x, y: s.y, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          ))}
        </div>
      </div>

      {/* BRAND TYPOGRAPHY & FAST PROGRESS */}
      <div className="mt-2 flex flex-col items-center text-center space-y-2 z-40 max-w-sm">
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl sm:text-4xl font-black tracking-[0.2em] font-display bg-gradient-to-r from-white via-cyan-100 to-slate-200 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(56,189,248,0.4)]">
            GONEXORA
          </h1>
          <span className="px-2 py-0.5 rounded bg-gradient-to-r from-blue-600 to-indigo-600 border border-cyan-400/40 text-cyan-200 font-mono text-xs font-bold tracking-widest uppercase shadow-[0_0_10px_rgba(6,182,212,0.3)]">
            TECHS
          </span>
        </motion.div>

        <p className="text-xs font-display tracking-widest text-slate-300 font-medium">
          <span className="text-cyan-400">"</span>BUILDING TOMORROW, TODAY<span className="text-cyan-400">"</span>
        </p>

        {/* Fast Progress Bar */}
        <div className="w-56 sm:w-64 space-y-1 pt-1">
          <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
            <span className="flex items-center gap-1 text-cyan-300">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              {stage >= 2 ? "SYSTEM READY" : "ASSEMBLING LOGO"}
            </span>
            <span className="font-bold text-cyan-300">{progress}%</span>
          </div>

          <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden p-[1px] border border-cyan-500/30">
            <motion.div 
              className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        </div>
      </div>

      {/* QUICK ENTER / SKIP BUTTON */}
      <div className="mt-4 flex items-center gap-2 z-50">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            if (onSkip) onSkip();
            else if (onComplete) onComplete();
          }}
          className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer ${
            stage >= 2
              ? 'bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 text-white font-bold border border-cyan-300/50 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
              : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white'
          }`}
        >
          <span>{stage >= 2 ? "ENTER SITE" : "SKIP"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
      </div>
    </div>
  );
}
