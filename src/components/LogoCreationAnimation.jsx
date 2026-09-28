import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Sparkles, Zap, ChevronRight, RotateCcw } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function LogoCreationAnimation({ onComplete, onSkip }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0); // 0: Calibrate, 1: Trace/Blueprint, 2: 3D Fuse, 3: Complete
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const audioCtxRef = useRef(null);
  const voicePlayedRef = useRef(false);

  // Initialize Web Audio Context on user opt-in or interaction
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

  // Futuristic Sound Synthesizer via Web Audio API
  const playSfx = useCallback((type) => {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      if (type === 'beep') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880 + Math.random() * 400, now);
        osc.frequency.exponentialRampToValueAtTime(1760, now + 0.05);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'laser') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.35);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'fuse') {
        // Sub-bass impact + shimmer
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.5);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.5);

        // Chime
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
          const chimeOsc = ctx.createOscillator();
          const chimeGain = ctx.createGain();
          chimeOsc.type = 'sine';
          chimeOsc.frequency.setValueAtTime(freq, now + i * 0.04);
          chimeGain.gain.setValueAtTime(0.06, now + i * 0.04);
          chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.7 + i * 0.04);
          chimeOsc.connect(chimeGain);
          chimeGain.connect(ctx.destination);
          chimeOsc.start(now + i * 0.04);
          chimeOsc.stop(now + 0.8 + i * 0.04);
        });
      }
    } catch (err) {
      console.warn("Audio synthesis error:", err);
    }
  }, [soundEnabled, getAudioContext]);

  // Voice greeting upon completion
  const speakGreeting = useCallback(() => {
    if (!soundEnabled || voicePlayedRef.current) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance("Welcome to GoNexora Techs");
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => 
        v.name.includes('Google US English') ||
        v.name.includes('Google UK English Female') ||
        v.name.includes('Samantha') ||
        v.name.includes('Microsoft Zira') ||
        v.lang.startsWith('en')
      );
      if (preferredVoice) utterance.voice = preferredVoice;
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
      utterance.volume = 0.9;
      window.speechSynthesis.speak(utterance);
      voicePlayedRef.current = true;
    } catch (e) {
      console.warn("Speech greeting error:", e);
    }
  }, [soundEnabled]);

  // Animation timeline progression
  useEffect(() => {
    const startTime = Date.now();
    const duration = 4000; // 4.0 seconds total creation sequence

    let sfxTick = 0;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentPct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(currentPct);

      if (currentPct < 25) {
        setPhase(0); // Calibration & Holographic Grid
      } else if (currentPct < 60) {
        setPhase(1); // Laser Tracing & Wireframe
        if (sfxTick % 6 === 0) playSfx('beep');
      } else if (currentPct < 85) {
        if (phase < 2) {
          playSfx('laser');
          playSfx('fuse');
        }
        setPhase(2); // 3D Fusion & Core Power-up
      } else {
        if (phase < 3) {
          playSfx('fuse');
          speakGreeting();
        }
        setPhase(3); // Complete & Online
      }

      sfxTick++;

      if (currentPct >= 100) {
        clearInterval(interval);
        // Automatically proceed after holding the completed logo for 800ms
        const finishTimer = setTimeout(() => {
          if (onComplete) onComplete();
        }, 900);
        return () => clearTimeout(finishTimer);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [phase, playSfx, speakGreeting, onComplete]);

  // Handle 3D Mouse Parallax
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  const handleResetParallax = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  // Particles coordinates
  const particles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => {
      const angle = (i * 360) / 24;
      const rad = (angle * Math.PI) / 180;
      const distance = 80 + (i % 5) * 20;
      return {
        id: i,
        angle,
        startX: Math.cos(rad) * distance * 1.6,
        startY: Math.sin(rad) * distance * 1.6,
        endX: Math.cos(rad) * 30,
        endY: Math.sin(rad) * 30,
        size: 1.5 + (i % 3) * 0.8,
        delay: (i % 8) * 0.12,
        duration: 1.8 + (i % 4) * 0.3
      };
    });
  }, []);

  // Energy Laser Nodes coordinates around the logo
  const nodes = useMemo(() => [
    { id: 'n1', x: 25, y: 25, label: '01' },
    { id: 'n2', x: 75, y: 25, label: '02' },
    { id: 'n3', x: 80, y: 55, label: '03' },
    { id: 'n4', x: 60, y: 85, label: '04' },
    { id: 'n5', x: 20, y: 75, label: '05' },
    { id: 'n6', x: 50, y: 50, label: '06' },
  ], []);

  const phaseTexts = [
    "INITIALIZING QUANTUM MATRIX & HUD TELEMETRY...",
    "TRACING VECTOR BLUEPRINTS & GEOMETRIC SCHEMATICS...",
    "CONVERGING 3D NEURAL LAYERS & LASER FUSION...",
    "GONEXORA TECHS CORE ONLINE • SYSTEM READY"
  ];

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleResetParallax}
      className="relative w-full max-w-lg mx-auto flex flex-col items-center justify-center select-none py-4 px-2"
      style={{ perspective: '1200px' }}
    >
      {/* Sound / Mute Toggle Button */}
      <div className="absolute -top-12 right-2 sm:right-4 z-50 flex items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!soundEnabled) {
              setSoundEnabled(true);
              getAudioContext();
              setTimeout(() => playSfx('fuse'), 100);
            } else {
              setSoundEnabled(false);
              if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
              }
            }
          }}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider transition-all duration-300 border ${
            soundEnabled 
              ? 'bg-blue-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.25)]' 
              : 'bg-white/5 text-slate-400 border-white/10 hover:text-white hover:border-white/25'
          }`}
          title={soundEnabled ? "Disable SFX & Voice" : "Enable Cyber SFX & Voice"}
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="font-semibold text-cyan-300">SFX ACTIVE</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-slate-400" />
              <span>SOUND OFF</span>
            </>
          )}
        </button>
      </div>

      {/* Main Holographic Assembly Canvas */}
      <div 
        className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${-mousePos.y * 14}deg) rotateY(${mousePos.x * 14}deg)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        }}
      >
        {/* Background Ambient Radial Glow */}
        <div 
          className="absolute inset-0 rounded-full blur-[45px] pointer-events-none transition-all duration-700"
          style={{
            background: phase >= 2 
              ? 'radial-gradient(circle, rgba(56, 189, 248, 0.35) 0%, rgba(99, 102, 241, 0.25) 45%, transparent 75%)'
              : 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(30, 58, 138, 0.1) 50%, transparent 70%)',
            transform: 'scale(1.2)'
          }}
        />

        {/* 1. HUD Outer Rotating Geometric Rings */}
        <svg viewBox="0 0 300 300" className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {/* Outer Dotted Calibration Circle */}
          <motion.circle
            cx="150"
            cy="150"
            r="140"
            fill="none"
            stroke="rgba(56, 189, 248, 0.2)"
            strokeWidth="1"
            strokeDasharray="4 8"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            style={{ transformOrigin: "150px 150px" }}
          />

          {/* Secondary Precision Compass Ring */}
          <motion.circle
            cx="150"
            cy="150"
            r="126"
            fill="none"
            stroke="rgba(99, 102, 241, 0.35)"
            strokeWidth="1.5"
            strokeDasharray="40 18 10 18"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
            style={{ transformOrigin: "150px 150px" }}
          />

          {/* Inner Fast Energy Orbit */}
          <motion.circle
            cx="150"
            cy="150"
            r="108"
            fill="none"
            stroke="rgba(14, 165, 233, 0.4)"
            strokeWidth="1"
            strokeDasharray="12 24"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 9, ease: "linear" }}
            style={{ transformOrigin: "150px 150px" }}
          />

          {/* Crosshair Coordinate Axes */}
          <line x1="150" y1="6" x2="150" y2="30" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="1.5" />
          <line x1="150" y1="270" x2="150" y2="294" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="1.5" />
          <line x1="6" y1="150" x2="30" y2="150" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="1.5" />
          <line x1="270" y1="150" x2="294" y2="150" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="1.5" />

          {/* Center Targeting Bracket Marks */}
          <path d="M 40 50 L 50 50 L 50 40" fill="none" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" />
          <path d="M 260 50 L 250 50 L 250 40" fill="none" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" />
          <path d="M 40 250 L 50 250 L 50 260" fill="none" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" />
          <path d="M 260 250 L 250 250 L 250 260" fill="none" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" />
        </svg>

        {/* 2. Quantum Particle Inward Convergence Streams */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden">
          {phase < 3 && particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-cyan-400 blur-[0.5px]"
              style={{
                width: p.size,
                height: p.size,
                left: '50%',
                top: '50%',
                boxShadow: '0 0 6px #38bdf8'
              }}
              initial={{
                x: p.startX,
                y: p.startY,
                opacity: 0,
                scale: 0.2
              }}
              animate={{
                x: [p.startX, p.endX, 0],
                y: [p.startY, p.endY, 0],
                opacity: [0, 0.9, 0],
                scale: [0.2, 1.4, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: p.duration,
                delay: p.delay,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* 3. SVG Vector Blueprint & Laser Tracing Animation (Phase 0 & 1) */}
        <svg 
          viewBox="0 0 200 200" 
          className="absolute inset-0 w-full h-full z-20 pointer-events-none"
          style={{
            filter: 'drop-shadow(0 0 10px rgba(56, 189, 248, 0.6))',
            opacity: phase >= 2 ? 0.35 : 1,
            transition: 'opacity 0.6s ease'
          }}
        >
          {/* Logo 'G' Curved Vector Contour */}
          <motion.path
            d="M 90 40 A 50 50 0 1 0 100 135 L 75 135 L 75 105 L 95 105"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: phase >= 1 ? 1 : progress / 35,
              opacity: phase >= 0 ? 1 : 0
            }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />

          {/* Logo 'N' Angular Geometric Pillar */}
          <motion.path
            d="M 95 65 L 95 145 L 140 65 L 140 145"
            fill="none"
            stroke="#818cf8"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: phase >= 1 ? 1 : 0,
              opacity: phase >= 1 ? 1 : 0
            }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
          />

          {/* Logo 'T' Top Bar Roof */}
          <motion.path
            d="M 125 40 L 165 40"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: phase >= 1 ? 1 : 0,
              opacity: phase >= 1 ? 1 : 0
            }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
          />

          {/* Signature Diagonal Laser Slash Line */}
          <motion.line
            x1="35"
            y1="150"
            x2="105"
            y2="70"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: phase >= 1 ? 1 : 0,
              opacity: phase >= 1 ? 1 : 0
            }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeInOut" }}
          />

          {/* Nodes on Wireframe Intersections */}
          {phase >= 1 && nodes.map((node, i) => (
            <motion.g key={node.id} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 + i * 0.1 }}>
              <circle
                cx={node.x * 2}
                cy={node.y * 2}
                r="3"
                fill="#38bdf8"
                className="animate-ping"
                style={{ animationDuration: '2.5s', animationDelay: `${i * 0.3}s` }}
              />
              <circle
                cx={node.x * 2}
                cy={node.y * 2}
                r="2"
                fill="#ffffff"
              />
            </motion.g>
          ))}
        </svg>

        {/* 4. Laser Scanning Sweep Bar (Vertical) */}
        {phase === 1 && (
          <motion.div
            className="absolute left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-30 pointer-events-none"
            style={{
              boxShadow: '0 0 12px #38bdf8, 0 0 20px #06b6d4'
            }}
            initial={{ top: '10%', opacity: 0 }}
            animate={{ 
              top: ['10%', '90%', '10%'],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              repeat: Infinity,
              duration: 1.6,
              ease: "easeInOut"
            }}
          />
        )}

        {/* 5. 3D Assembling Logo Extrusion Layers (Phase 2 & 3) */}
        <AnimatePresence>
          {phase >= 2 && (
            <motion.div
              className="relative w-40 h-40 sm:w-44 sm:h-44 z-30 flex items-center justify-center"
              initial={{ scale: 0.3, opacity: 0, rotateY: 45, z: -100 }}
              animate={{ 
                scale: phase === 3 ? [1, 1.04, 1] : 1, 
                opacity: 1, 
                rotateY: 0, 
                z: 0 
              }}
              transition={{ 
                duration: 0.8, 
                type: "spring", 
                stiffness: 90, 
                damping: 12 
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Back Layer Extrusions for Depth */}
              {[3, 2, 1].map((depth) => (
                <img
                  key={depth}
                  src={logoImg}
                  alt="GoNexora 3D Depth Layer"
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none opacity-40"
                  style={{
                    transform: `translateZ(${-depth * 6}px) translateY(${depth * 1.5}px)`,
                    filter: `brightness(50%) drop-shadow(0 0 15px rgba(59, 130, 246, 0.4))`,
                  }}
                />
              ))}

              {/* Front Primary Logo */}
              <motion.img
                src={logoImg}
                alt="GoNexora Techs Assembled Logo"
                className="relative w-full h-full object-contain z-40 filter drop-shadow-[0_10px_25px_rgba(56,189,248,0.5)]"
                animate={phase === 3 ? {
                  y: [0, -6, 0],
                  filter: [
                    'drop-shadow(0 10px 25px rgba(56,189,248,0.5))',
                    'drop-shadow(0 15px 35px rgba(99,102,241,0.7))',
                    'drop-shadow(0 10px 25px rgba(56,189,248,0.5))'
                  ]
                } : {}}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut"
                }}
              />

              {/* Specular Light Flare Sweep on Fusion */}
              <motion.div
                className="absolute inset-0 z-50 pointer-events-none overflow-hidden rounded-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: phase >= 2 ? [0, 1, 0] : 0 }}
                transition={{ duration: 1.2, delay: 0.1 }}
              >
                <motion.div
                  className="w-[200%] h-full bg-gradient-to-r from-transparent via-white/70 to-transparent -skew-x-45"
                  initial={{ x: '-150%' }}
                  animate={{ x: '150%' }}
                  transition={{ duration: 1.1, ease: "easeOut" }}
                />
              </motion.div>

              {/* Diagonal Slash Laser Spark Beam */}
              {phase === 2 && (
                <motion.div
                  className="absolute w-48 h-[3px] bg-white rounded-full z-50 pointer-events-none"
                  style={{
                    top: '50%',
                    left: '50%',
                    boxShadow: '0 0 18px #ffffff, 0 0 30px #38bdf8',
                    transform: 'translate(-50%, -50%) rotate(-45deg)'
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: [0, 1.4, 0], opacity: [0, 1, 0] }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 6. Shockwave Expansion Ring on Fusion (Phase 2 & 3) */}
        {phase >= 2 && (
          <motion.div
            className="absolute rounded-full border-2 border-cyan-400/80 pointer-events-none z-10"
            initial={{ width: 40, height: 40, opacity: 1, scale: 0.5 }}
            animate={{ width: 280, height: 280, opacity: 0, scale: 1.25 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        )}
      </div>

      {/* Holographic Brand Typography & Reveal Sequence */}
      <div className="mt-4 flex flex-col items-center text-center space-y-2.5 z-40 max-w-sm">
        {/* Company Name with Cyber Glow */}
        <motion.div
          className="flex items-center gap-2 overflow-hidden"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h1 className="text-3xl sm:text-4xl font-black tracking-[0.22em] font-display bg-gradient-to-r from-white via-cyan-100 to-slate-300 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(56,189,248,0.3)]">
            GONEXORA
          </h1>
          <motion.span 
            className="px-2 py-0.5 rounded-md bg-gradient-to-r from-indigo-600/60 to-blue-600/60 border border-cyan-400/40 text-cyan-300 font-mono text-xs sm:text-sm font-bold tracking-widest uppercase shadow-[0_0_10px_rgba(6,182,212,0.3)]"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          >
            TECHS
          </motion.span>
        </motion.div>

        {/* Live HUD Telemetry & Phase Indicator */}
        <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-cyan-400/90 tracking-wider">
          <Zap className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span className="truncate max-w-[280px] sm:max-w-none">
            {phaseTexts[phase]}
          </span>
        </div>

        {/* High-Tech Progress Bar Container */}
        <div className="w-60 sm:w-64 space-y-1.5 pt-1">
          <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
            <span className="flex items-center gap-1 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              SYNTHESIS
            </span>
            <span className="font-bold text-cyan-300">{progress}%</span>
          </div>

          <div className="h-1.5 w-full bg-slate-900/90 rounded-full overflow-hidden p-[1px] border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.15)]">
            <motion.div 
              className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-400 relative"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            >
              {/* Glowing leading edge */}
              <div className="absolute right-0 top-0 bottom-0 w-2 bg-white shadow-[0_0_8px_#ffffff] rounded-full" />
            </motion.div>
          </div>
        </div>

        {/* Brand Tagline */}
        <motion.p
          className="text-xs font-display tracking-widest text-slate-400 font-medium pt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 2 ? 1 : 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-cyan-400/80">"</span>BUILDING TOMORROW, TODAY<span className="text-cyan-400/80">"</span>
        </motion.p>
      </div>

      {/* Action / Skip Controls */}
      <div className="mt-6 flex items-center gap-3 z-50">
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={(e) => {
            e.stopPropagation();
            if (onSkip) onSkip();
            else if (onComplete) onComplete();
          }}
          className="group flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-300 hover:text-white text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
        >
          <span>{phase === 3 ? "ENTER SITE" : "SKIP INTRO"}</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </motion.button>
      </div>
    </div>
  );
}
