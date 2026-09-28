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
  const audioPlayedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Single-play Automatic Audio Engine
  const startAudioAuto = useCallback(() => {
    if (audioPlayedRef.current) return;

    if (audioRef.current) {
      audioRef.current.volume = 1.0;
      audioRef.current.loop = false;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            audioPlayedRef.current = true;
          })
          .catch(() => {
            // Browser autoplay policy - will trigger on passive window interaction
          });
      }
    }
  }, []);

  // Automatic Audio Trigger on Mount & Passive Window Events
  useEffect(() => {
    // 1. Attempt immediate play on mount
    startAudioAuto();

    // 2. Passive unblockers (plays automatically on first micro-interaction without clicking logo)
    const handlePassiveTrigger = () => {
      if (!audioPlayedRef.current) {
        startAudioAuto();
      }
    };

    const events = ['pointermove', 'mousemove', 'wheel', 'scroll', 'touchstart', 'pointerdown', 'keydown', 'focus'];
    events.forEach(e => window.addEventListener(e, handlePassiveTrigger, { passive: true }));

    return () => {
      events.forEach(e => window.removeEventListener(e, handlePassiveTrigger));
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [startAudioAuto]);

  // 5-Second Loading Screen Timeline (5,000ms)
  useEffect(() => {
    const startTime = Date.now();
    const duration = 5000; // Exactly 5.0 seconds total

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 35) {
        setStage(0); // 0s - 1.75s: Blueprint Calibration & Shards Convergence
      } else if (pct < 65) {
        setStage(1); // 1.75s - 3.25s: Laser Slash & Shockwave Burst
      } else {
        setStage(2); // 3.25s - 5.0s: Master 3D Logo & GONEXORA TECHS Reveal
      }

      if (pct >= 100) {
        clearInterval(timer);
        // Automatically enter site at 5.0s
        const autoProceedTimer = setTimeout(() => {
          if (onCompleteRef.current) onCompleteRef.current();
        }, 200);
        return () => clearTimeout(autoProceedTimer);
      }
    }, 25);

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
    return Array.from({ length: 20 }).map((_, i) => {
      const angle = (i * 360) / 20;
      const rad = (angle * Math.PI) / 180;
      const dist = 65 + (i % 4) * 20;
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
      {/* Native Auto-Playing Audio Element */}
      <audio 
        ref={audioRef} 
        src={introAudioFile} 
        autoPlay 
        playsInline 
        preload="auto"
        onPlay={() => { audioPlayedRef.current = true; }}
      />

      {/* Top NEXORA Protocol Status */}
      <div className="w-full flex items-center justify-center mb-2 z-50 px-2">
        <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-400/40 text-[10px] font-mono text-cyan-300 tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.35)]">
          <Bot className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>NEXORA AI PROTOCOL ACTIVE</span>
        </div>
      </div>

      {/* 3D LOGO CREATION CANVAS */}
      <div 
        className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center my-2"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${-mousePos.y * 10}deg) rotateY(${mousePos.x * 10}deg)`,
          transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.4s ease-out',
        }}
      >
        {/* Arc Reactor Radial Blue Glow */}
        <div 
          className="absolute inset-0 rounded-full blur-[45px] pointer-events-none transition-all duration-500"
          style={{
            background: stage >= 1 
              ? 'radial-gradient(circle, rgba(56, 189, 248, 0.5) 0%, rgba(99, 102, 241, 0.3) 50%, transparent 75%)'
              : 'radial-gradient(circle, rgba(59, 130, 246, 0.35) 0%, rgba(30, 58, 138, 0.2) 50%, transparent 70%)',
            transform: 'scale(1.25)'
          }}
        />

        {/* Orbiting NEXORA HUD Target Rings */}
        <svg viewBox="0 0 240 240" className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <motion.circle
            cx="120"
            cy="120"
            r="110"
            fill="none"
            stroke="rgba(56, 189, 248, 0.35)"
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
            stroke="rgba(99, 102, 241, 0.4)"
            strokeWidth="1.5"
            strokeDasharray="25 15"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
            style={{ transformOrigin: "120px 120px" }}
          />
        </svg>

        {/* LOGO PIECES CONVERGING */}
        <div className="relative w-44 h-44 sm:w-48 sm:h-48 z-20 flex items-center justify-center">
          
          {/* PIECE 1: Left 'G' Arc */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{ clipPath: 'polygon(0% 0%, 54% 0%, 30% 100%, 0% 100%)' }}
            initial={{ x: -80, opacity: 0, scale: 0.75, rotateY: -30 }}
            animate={{ x: 0, opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <img 
              src={logoImg} 
              alt="Nexora G" 
              className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(56,189,248,0.75)]" 
            />
          </motion.div>

          {/* PIECE 2: Right 'N' Pillars */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{ clipPath: 'polygon(48% 28%, 100% 28%, 100% 100%, 26% 100%)' }}
            initial={{ x: 80, opacity: 0, scale: 0.75, rotateY: 30 }}
            animate={{ x: 0, opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <img 
              src={logoImg} 
              alt="Nexora N" 
              className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(129,140,248,0.75)]" 
            />
          </motion.div>

          {/* PIECE 3: Top 'T' Bar */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{ clipPath: 'polygon(56% 0%, 100% 0%, 100% 28%, 56% 28%)' }}
            initial={{ y: -60, opacity: 0, scaleY: 0.4 }}
            animate={{ y: 0, opacity: 1, scaleY: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <img 
              src={logoImg} 
              alt="Nexora T" 
              className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(56,189,248,0.75)]" 
            />
          </motion.div>

          {/* LASER SLASH EFFECT (Stage 1) */}
          {stage === 1 && (
            <motion.div
              className="absolute z-50 pointer-events-none"
              style={{
                top: '50%',
                left: '50%',
                width: '185px',
                height: '4px',
                transform: 'translate(-50%, -50%) rotate(-45deg)',
                background: 'linear-gradient(90deg, transparent, #ffffff, #38bdf8, transparent)',
                boxShadow: '0 0 20px #ffffff, 0 0 35px #00f2fe'
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: [0, 1.6, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />
          )}

          {/* MASTER 3D SOLIDIFIED LOGO (Stage 2) */}
          {stage >= 2 && (
            <motion.div
              className="absolute inset-0 w-full h-full z-30 flex items-center justify-center"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                y: [0, -4, 0]
              }}
              transition={{ 
                scale: { duration: 0.6, ease: "easeOut" },
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
                className="relative w-full h-full object-contain filter drop-shadow-[0_12px_28px_rgba(56,189,248,0.65)]"
              />

              {/* Specular Chrome Shimmer */}
              <motion.div
                className="absolute inset-0 overflow-hidden pointer-events-none rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.2 }}
              >
                <motion.div
                  className="w-[200%] h-full bg-gradient-to-r from-transparent via-white/80 to-transparent -skew-x-45"
                  initial={{ x: '-150%' }}
                  animate={{ x: '150%' }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </motion.div>
            </motion.div>
          )}

          {/* Shockwave Ring */}
          {stage >= 1 && (
            <motion.div
              className="absolute rounded-full border border-cyan-400/90 pointer-events-none z-10"
              initial={{ width: 30, height: 30, opacity: 1, scale: 0.4 }}
              animate={{ width: 240, height: 240, opacity: 0, scale: 1.25 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
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
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          ))}
        </div>
      </div>

      {/* BRAND TYPOGRAPHY & NEXORA STATUS */}
      <div className="mt-2 flex flex-col items-center text-center space-y-2 z-40 max-w-sm">
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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

        {/* Progress Bar */}
        <div className="w-56 sm:w-64 space-y-1 pt-1">
          <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
            <span className="flex items-center gap-1 text-cyan-300">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              {stage >= 2 ? "NEXORA SYSTEMS ONLINE" : "ASSEMBLING MATRIX"}
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
            if (audioRef.current) audioRef.current.pause();
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
