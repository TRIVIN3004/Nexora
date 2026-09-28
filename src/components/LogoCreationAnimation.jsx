import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, Bot } from 'lucide-react';
import logoImg from '../assets/logo.png';

const introAudioFile = '/nexora_intro.mpeg';

export default function LogoCreationAnimation({ onComplete, onSkip }) {
  const [stage, setStage] = useState(0); 
  const [progress, setProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const audioRef = useRef(null);
  const audioStartedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Play the uploaded WhatsApp Intro Audio at High Volume
  const playIntroAudio = useCallback(() => {
    if (audioStartedRef.current && audioRef.current && !audioRef.current.paused) return;

    try {
      if (!audioRef.current) {
        const audio = new Audio(introAudioFile);
        audio.volume = 1.0;
        audio.preload = 'auto';
        audioRef.current = audio;
      }

      audioRef.current.volume = 1.0;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            audioStartedRef.current = true;
          })
          .catch(() => {
            // Autoplay restricted - will trigger on passive touch/move
          });
      }
    } catch (e) {
      console.warn("Audio playback error:", e);
    }
  }, []);

  // Automatic Audio on Load & Global Interaction Unlock
  useEffect(() => {
    playIntroAudio();

    const unlockAudio = () => {
      playIntroAudio();
    };

    const events = ['pointerdown', 'touchstart', 'click', 'mousemove', 'wheel', 'scroll', 'keydown'];
    events.forEach(e => window.addEventListener(e, unlockAudio, { passive: true }));

    return () => {
      events.forEach(e => window.removeEventListener(e, unlockAudio));
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [playIntroAudio]);

  // 15-Second Cinematic Timeline (15,000ms)
  useEffect(() => {
    const startTime = Date.now();
    const duration = 15000; // 15 seconds total

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 25) {
        setStage(0); // 0s - 3.75s: Blueprint Calibration & Wireframe Tracing
      } else if (pct < 55) {
        setStage(1); // 3.75s - 8.25s: 3D G-N-T Shard Convergence
      } else if (pct < 75) {
        setStage(2); // 8.25s - 11.25s: Laser Slash & Welding Energy Burst
      } else {
        setStage(3); // 11.25s - 15.0s: Master 3D Solidification & Brand Reveal
      }

      if (pct >= 100) {
        clearInterval(timer);
        const autoProceedTimer = setTimeout(() => {
          if (onCompleteRef.current) onCompleteRef.current();
        }, 300);
        return () => clearTimeout(autoProceedTimer);
      }
    }, 40);

    return () => clearInterval(timer);
  }, []);

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

  // Spark Particles Pool
  const sparks = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => {
      const angle = (i * 360) / 24;
      const rad = (angle * Math.PI) / 180;
      const dist = 70 + (i % 4) * 25;
      return {
        id: i,
        x: Math.cos(rad) * dist,
        y: Math.sin(rad) * dist,
        size: 2 + (i % 3),
      };
    });
  }, []);

  // Floating Quantum Grid Nodes
  const gridNodes = useMemo(() => [
    { id: 1, x: '20%', y: '25%', label: 'NODE 01' },
    { id: 2, x: '80%', y: '25%', label: 'NODE 02' },
    { id: 3, x: '85%', y: '75%', label: 'NODE 03' },
    { id: 4, x: '15%', y: '75%', label: 'NODE 04' },
  ], []);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-2xl mx-auto flex flex-col items-center justify-center select-none py-6 px-4 text-white"
      style={{ perspective: '1200px' }}
    >
      {/* Top NEXORA Protocol Status */}
      <div className="w-full flex items-center justify-between mb-3 z-50 px-3">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-400/40 text-[10px] sm:text-xs font-mono text-cyan-300 tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.35)]">
          <Bot className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>NEXORA AI PROTOCOL ACTIVE</span>
        </div>

        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-slate-400">
          <span>SEQUENCE: 15s CINEMATIC</span>
        </div>
      </div>

      {/* 3D LOGO CREATION CANVAS */}
      <div 
        className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center my-3"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${-mousePos.y * 12}deg) rotateY(${mousePos.x * 12}deg)`,
          transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s ease-out',
        }}
      >
        {/* Arc Reactor Radial Blue Glow */}
        <div 
          className="absolute inset-0 rounded-full blur-[55px] pointer-events-none transition-all duration-700"
          style={{
            background: stage >= 2 
              ? 'radial-gradient(circle, rgba(56, 189, 248, 0.5) 0%, rgba(99, 102, 241, 0.3) 50%, transparent 75%)'
              : 'radial-gradient(circle, rgba(59, 130, 246, 0.35) 0%, rgba(30, 58, 138, 0.2) 50%, transparent 70%)',
            transform: 'scale(1.3)'
          }}
        />

        {/* 1. Orbiting NEXORA HUD Target Rings & Wireframe Blueprint (Stage 0+) */}
        <svg viewBox="0 0 280 280" className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {/* Outer Calibration Compass Ring */}
          <motion.circle
            cx="140"
            cy="140"
            r="130"
            fill="none"
            stroke="rgba(56, 189, 248, 0.35)"
            strokeWidth="1"
            strokeDasharray="6 10"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            style={{ transformOrigin: "140px 140px" }}
          />
          {/* Secondary Precision Compass */}
          <motion.circle
            cx="140"
            cy="140"
            r="112"
            fill="none"
            stroke="rgba(99, 102, 241, 0.4)"
            strokeWidth="1.5"
            strokeDasharray="30 15 10 15"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            style={{ transformOrigin: "140px 140px" }}
          />

          {/* Caliper Crosshairs */}
          <line x1="140" y1="5" x2="140" y2="28" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="1.5" />
          <line x1="140" y1="252" x2="140" y2="275" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="1.5" />
          <line x1="5" y1="140" x2="28" y2="140" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="1.5" />
          <line x1="252" y1="140" x2="275" y2="140" stroke="rgba(56, 189, 248, 0.6)" strokeWidth="1.5" />

          {/* Blueprint Wireframe Skeleton (Active during Stage 0 & 1) */}
          <g opacity={stage < 3 ? 0.8 : 0.2} style={{ transition: 'opacity 0.8s ease' }}>
            <motion.circle
              cx="110"
              cy="145"
              r="52"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeDasharray="8 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3.5, ease: "easeInOut" }}
            />
            <motion.line
              x1="55"
              y1="200"
              x2="160"
              y2="95"
              stroke="#00f2fe"
              strokeWidth="3"
              strokeDasharray="6 6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3.0, delay: 0.5, ease: "easeInOut" }}
            />
            <motion.path
              d="M 135 100 L 135 185 M 135 100 L 190 185 M 190 100 L 190 185"
              fill="none"
              stroke="#818cf8"
              strokeWidth="2.5"
              strokeDasharray="8 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3.5, delay: 1.0, ease: "easeInOut" }}
            />
            <motion.line
              x1="165"
              y1="85"
              x2="215"
              y2="85"
              stroke="#38bdf8"
              strokeWidth="3.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.0, delay: 1.5, ease: "easeInOut" }}
            />
          </g>
        </svg>

        {/* 2. LOGO PIECES ASSEMBLY (Stage 1+) */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 z-20 flex items-center justify-center">
          
          {/* PIECE 1: Left 'G' Arc - Flying in Smoothly */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{ clipPath: 'polygon(0% 0%, 54% 0%, 30% 100%, 0% 100%)' }}
            initial={{ x: -140, y: 30, rotateY: -60, opacity: 0, scale: 0.7 }}
            animate={stage >= 1 ? {
              x: 0,
              y: 0,
              rotateY: 0,
              opacity: 1,
              scale: 1,
            } : { x: -140, y: 30, rotateY: -60, opacity: 0, scale: 0.7 }}
            transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
          >
            <img 
              src={logoImg} 
              alt="Nexora G" 
              className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(56,189,248,0.75)]" 
            />
          </motion.div>

          {/* PIECE 2: Right 'N' Pillars - Flying in Smoothly */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{ clipPath: 'polygon(48% 28%, 100% 28%, 100% 100%, 26% 100%)' }}
            initial={{ x: 140, y: 30, rotateY: 60, opacity: 0, scale: 0.7 }}
            animate={stage >= 1 ? {
              x: 0,
              y: 0,
              rotateY: 0,
              opacity: 1,
              scale: 1,
            } : { x: 140, y: 30, rotateY: 60, opacity: 0, scale: 0.7 }}
            transition={{ duration: 2.0, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <img 
              src={logoImg} 
              alt="Nexora N" 
              className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(129,140,248,0.75)]" 
            />
          </motion.div>

          {/* PIECE 3: Top 'T' Bar - Descending */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{ clipPath: 'polygon(56% 0%, 100% 0%, 100% 28%, 56% 28%)' }}
            initial={{ y: -90, scaleY: 0.2, opacity: 0 }}
            animate={stage >= 1 ? {
              y: 0,
              scaleY: 1,
              opacity: 1,
            } : { y: -90, scaleY: 0.2, opacity: 0 }}
            transition={{ duration: 1.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <img 
              src={logoImg} 
              alt="Nexora T" 
              className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(56,189,248,0.75)]" 
            />
          </motion.div>

          {/* 3. LASER SLASH EFFECT (Stage 2) */}
          {stage === 2 && (
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
              animate={{ scaleX: [0, 1.8, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 1.8, ease: "easeOut" }}
            />
          )}

          {/* 4. MASTER 3D SOLIDIFIED LOGO (Stage 3) */}
          {stage >= 3 && (
            <motion.div
              className="absolute inset-0 w-full h-full z-30 flex items-center justify-center"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                y: [0, -6, 0]
              }}
              transition={{ 
                scale: { duration: 1.0, ease: "easeOut" },
                y: { repeat: Infinity, duration: 4.0, ease: "easeInOut" }
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {[3, 2, 1].map((depth) => (
                <img
                  key={depth}
                  src={logoImg}
                  alt="3D Depth"
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none opacity-40"
                  style={{
                    transform: `translateZ(${-depth * 6}px) translateY(${depth * 1.5}px)`,
                    filter: 'brightness(45%) drop-shadow(0 0 12px rgba(59,130,246,0.35))'
                  }}
                />
              ))}

              <img
                src={logoImg}
                alt="GoNexora Master Logo"
                className="relative w-full h-full object-contain filter drop-shadow-[0_15px_32px_rgba(56,189,248,0.7)]"
              />

              {/* Specular Chrome Shimmer */}
              <motion.div
                className="absolute inset-0 overflow-hidden pointer-events-none rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.8 }}
              >
                <motion.div
                  className="w-[200%] h-full bg-gradient-to-r from-transparent via-white/80 to-transparent -skew-x-45"
                  initial={{ x: '-150%' }}
                  animate={{ x: '150%' }}
                  transition={{ duration: 1.8, ease: "easeOut" }}
                />
              </motion.div>
            </motion.div>
          )}

          {/* Shockwave Ring */}
          {stage >= 2 && (
            <motion.div
              className="absolute rounded-full border-2 border-cyan-400/90 pointer-events-none z-10"
              initial={{ width: 40, height: 40, opacity: 1, scale: 0.4 }}
              animate={{ width: 280, height: 280, opacity: 0, scale: 1.3 }}
              transition={{ duration: 1.8, ease: "easeOut" }}
            />
          )}

          {/* Sparks */}
          {stage === 2 && sparks.map((s) => (
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
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          ))}
        </div>
      </div>

      {/* BRAND TYPOGRAPHY & NEXORA STATUS */}
      <div className="mt-3 flex flex-col items-center text-center space-y-2.5 z-40 max-w-md">
        <motion.div
          className="flex items-center gap-2.5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-5xl font-black tracking-[0.2em] font-display bg-gradient-to-r from-white via-cyan-100 to-slate-200 bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(56,189,248,0.45)]">
            GONEXORA
          </h1>
          <span className="px-2.5 py-1 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 border border-cyan-400/50 text-cyan-200 font-mono text-xs sm:text-base font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(6,182,212,0.35)]">
            TECHS
          </span>
        </motion.div>

        <p className="text-xs sm:text-sm font-display tracking-[0.25em] text-slate-300 font-medium">
          <span className="text-cyan-400">"</span>BUILDING TOMORROW, TODAY<span className="text-cyan-400">"</span>
        </p>

        {/* High-Tech Progress Bar */}
        <div className="w-64 sm:w-80 space-y-1.5 pt-2">
          <div className="flex justify-between items-center text-[10px] sm:text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 text-cyan-300">
              <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              {stage >= 3 ? "NEXORA SYSTEMS FULLY OPERATIONAL" : "SYNTHESIZING 3D LOGO MATRIX"}
            </span>
            <span className="font-bold text-cyan-300">{progress}%</span>
          </div>

          <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden p-[1px] border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
            <motion.div 
              className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 relative"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            >
              <div className="absolute right-0 top-0 bottom-0 w-3 bg-white shadow-[0_0_10px_#ffffff] rounded-full" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ENTER SITE / SKIP ACTION BUTTON */}
      <div className="mt-5 flex items-center gap-3 z-50">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            if (audioRef.current) audioRef.current.pause();
            if (onSkip) onSkip();
            else if (onComplete) onComplete();
          }}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer ${
            stage >= 3
              ? 'bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 text-white font-bold border border-cyan-300/60 shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:shadow-[0_0_35px_rgba(6,182,212,0.8)]'
              : 'bg-white/5 border border-white/15 text-slate-300 hover:text-white hover:border-white/30 hover:bg-white/10'
          }`}
        >
          <span>{stage >= 3 ? "ENTER SITE" : "SKIP INTRO"}</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
}
