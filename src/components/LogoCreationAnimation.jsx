import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, Bot } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function LogoCreationAnimation({ onComplete, onSkip }) {
  const [stage, setStage] = useState(0); 
  const [progress, setProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);
  const voicePlayedRef = useRef(false);
  const sfxPlayedRef = useRef({ boot: false, slash: false, complete: false });
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Master Studio Audio Engine with Dynamics Limiter & Gain Boost
  const getAudioContext = useCallback(() => {
    if (typeof window === 'undefined') return null;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    
    if (!audioCtxRef.current) {
      const ctx = new AudioCtx();
      
      // Master Compressor for loud, punchy, cinematic sound without distortion
      const compressor = ctx.createDynamicsCompressor();
      compressor.threshold.setValueAtTime(-18, ctx.currentTime);
      compressor.knee.setValueAtTime(15, ctx.currentTime);
      compressor.ratio.setValueAtTime(6, ctx.currentTime);
      compressor.attack.setValueAtTime(0.003, ctx.currentTime);
      compressor.release.setValueAtTime(0.25, ctx.currentTime);

      // High-Volume Master Gain (Increased by user request)
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.85, ctx.currentTime); // High volume boost

      masterGain.connect(compressor);
      compressor.connect(ctx.destination);

      masterGainRef.current = masterGain;
      audioCtxRef.current = ctx;
    }

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {});
    }

    return audioCtxRef.current;
  }, []);

  // J.A.R.V.I.S. High-Voltage Sound FX Engine
  const playNexoraSfx = useCallback((type) => {
    const ctx = getAudioContext();
    if (!ctx || !masterGainRef.current) return;

    try {
      const now = ctx.currentTime;
      const destination = masterGainRef.current;

      // 1. ARC REACTOR POWER COIL SURGE (Loud sub-bass + telemetry)
      if (type === 'boot') {
        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        subOsc.type = 'sine';
        subOsc.frequency.setValueAtTime(55, now);
        subOsc.frequency.exponentialRampToValueAtTime(280, now + 0.45);
        subGain.gain.setValueAtTime(0.45, now);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        subOsc.connect(subGain);
        subGain.connect(destination);
        subOsc.start(now);
        subOsc.stop(now + 0.5);

        // Holographic High-Tech HUD telemetry chirps
        [980, 1318.5, 1760, 2093, 2637].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + 0.08 + i * 0.06);
          gain.gain.setValueAtTime(0.12, now + 0.08 + i * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18 + i * 0.06);
          osc.connect(gain);
          gain.connect(destination);
          osc.start(now + 0.08 + i * 0.06);
          osc.stop(now + 0.19 + i * 0.06);
        });
      } 
      // 2. REPULSOR / LASER DIAGONAL SLASH (Loud saw & resonance)
      else if (type === 'slash') {
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(1800, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.38);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(3800, now);
        filter.frequency.exponentialRampToValueAtTime(450, now + 0.38);

        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(destination);

        osc.start(now);
        osc.stop(now + 0.4);
      } 
      // 3. J.A.R.V.I.S. CONFIRMATION CHORD (Loud sub-thump + futuristic harmonics)
      else if (type === 'complete') {
        const thump = ctx.createOscillator();
        const thumpGain = ctx.createGain();
        thump.type = 'triangle';
        thump.frequency.setValueAtTime(140, now);
        thump.frequency.exponentialRampToValueAtTime(40, now + 0.45);
        thumpGain.gain.setValueAtTime(0.4, now);
        thumpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        thump.connect(thumpGain);
        thumpGain.connect(destination);
        thump.start(now);
        thump.stop(now + 0.5);

        [587.33, 739.99, 880, 1174.66, 1479.98, 1760].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + i * 0.04);
          gain.gain.setValueAtTime(0.14, now + i * 0.04);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85 + i * 0.04);
          osc.connect(gain);
          gain.connect(destination);
          osc.start(now + i * 0.04);
          osc.stop(now + 0.95 + i * 0.04);
        });
      }
    } catch (e) {
      console.warn("Nexora Audio error:", e);
    }
  }, [getAudioContext]);

  // J.A.R.V.I.S. Authentic British AI Assistant Voice Engine
  const speakJarvisVoice = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel();
      // Authentic J.A.R.V.I.S. line
      const utterance = new SpeechSynthesisUtterance("Good day. Nexora online, systems fully operational.");
      const voices = window.speechSynthesis.getVoices();
      
      // Strict Priority for Sophisticated British Male Voices (Paul Bettany JARVIS signature tone)
      const jarvisVoice = voices.find(v => 
        v.name.includes('Google UK English Male') ||
        v.name.toLowerCase().includes('daniel') ||
        v.name.includes('George') ||
        v.name.includes('Oliver') ||
        v.name.includes('Arthur') ||
        v.name.includes('Ryan') ||
        (v.lang === 'en-GB' && v.name.toLowerCase().includes('male')) ||
        v.lang === 'en-GB' ||
        v.lang === 'en_GB' ||
        v.name.includes('Google US English') ||
        v.lang.startsWith('en')
      );

      if (jarvisVoice) utterance.voice = jarvisVoice;
      
      // J.A.R.V.I.S. Acoustic Tuning: Deep, composed, authoritative & articulate
      utterance.pitch = 0.92;
      utterance.rate = 0.94;
      utterance.volume = 1.0; // Maximum output volume

      window.speechSynthesis.speak(utterance);
      voicePlayedRef.current = true;
    } catch (e) {
      console.warn("JARVIS Speech error:", e);
    }
  }, []);

  // Automatic Sound Activation on Page Load & Any Initial Movement
  useEffect(() => {
    // 1. Immediately attempt audio startup on mount
    getAudioContext();
    if (!sfxPlayedRef.current.boot) {
      playNexoraSfx('boot');
      sfxPlayedRef.current.boot = true;
    }

    // 2. Global Passive Unblockers (instant audio without needing to click the logo)
    const triggerAudioAuto = () => {
      getAudioContext();
      if (!sfxPlayedRef.current.boot) {
        playNexoraSfx('boot');
        sfxPlayedRef.current.boot = true;
      }
      if (!voicePlayedRef.current && stage >= 2) {
        speakJarvisVoice();
      }
    };

    const listeners = ['pointermove', 'mousemove', 'wheel', 'scroll', 'touchstart', 'pointerdown', 'mousedown', 'keydown', 'focus'];
    listeners.forEach(event => window.addEventListener(event, triggerAudioAuto, { passive: true }));

    // Pre-cache voices when speech synthesis is ready
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        if (stage >= 2 && !voicePlayedRef.current) {
          speakJarvisVoice();
        }
      };
    }

    return () => {
      listeners.forEach(event => window.removeEventListener(event, triggerAudioAuto));
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [getAudioContext, playNexoraSfx, speakJarvisVoice, stage]);

  // Balanced 2.8s Timeline
  useEffect(() => {
    const startTime = Date.now();
    const duration = 2800;

    if (!sfxPlayedRef.current.boot) {
      playNexoraSfx('boot');
      sfxPlayedRef.current.boot = true;
    }

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 35) {
        setStage(0);
      } else if (pct < 65) {
        if (!sfxPlayedRef.current.slash) {
          playNexoraSfx('slash');
          sfxPlayedRef.current.slash = true;
        }
        setStage(1);
      } else {
        if (!sfxPlayedRef.current.complete) {
          playNexoraSfx('complete');
          speakJarvisVoice();
          sfxPlayedRef.current.complete = true;
        }
        setStage(2);
      }

      if (pct >= 100) {
        clearInterval(timer);
        const autoProceedTimer = setTimeout(() => {
          if (onCompleteRef.current) onCompleteRef.current();
        }, 250);
        return () => clearTimeout(autoProceedTimer);
      }
    }, 25);

    return () => clearInterval(timer);
  }, [playNexoraSfx, speakJarvisVoice]);

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
    return Array.from({ length: 18 }).map((_, i) => {
      const angle = (i * 360) / 18;
      const rad = (angle * Math.PI) / 180;
      const dist = 65 + (i % 3) * 20;
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
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
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
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
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
            transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <img 
              src={logoImg} 
              alt="Nexora T" 
              className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(56,189,248,0.75)]" 
            />
          </motion.div>

          {/* LASER SLASH EFFECT */}
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
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          )}

          {/* MASTER 3D SOLIDIFIED LOGO */}
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
                scale: { duration: 0.45, ease: "easeOut" },
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
                transition={{ duration: 0.9 }}
              >
                <motion.div
                  className="w-[200%] h-full bg-gradient-to-r from-transparent via-white/80 to-transparent -skew-x-45"
                  initial={{ x: '-150%' }}
                  animate={{ x: '150%' }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
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
              transition={{ duration: 0.7, ease: "easeOut" }}
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
              transition={{ duration: 0.55, ease: "easeOut" }}
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
