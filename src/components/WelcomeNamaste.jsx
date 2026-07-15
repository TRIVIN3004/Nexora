import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import namasteCharacter from '../assets/namaste_character.png';

export default function WelcomeNamaste() {
  const [joined, setJoined] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [voiceMuted, setVoiceMuted] = useState(false);
  const voicePlayedRef = useRef(false);

  const speakGreeting = useCallback(() => {
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
  }, [voiceMuted]);

  useEffect(() => {
    // 1. Trigger hand join / welcome states
    const joinTimer = setTimeout(() => {
      setJoined(true);
    }, 500);

    // 2. Trigger particles and voice greeting
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
  }, [joined, showParticles, voiceMuted, speakGreeting]);

  const handleReplayVoice = (e) => {
    e.stopPropagation();
    voicePlayedRef.current = false;
    speakGreeting();
  };

  // Particles coordinates for the welcome burst
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

  // Continuous floating background sparkles configs
  const floatingSparkles = [
    { id: 1, x: "20%", startY: 150, delay: 0, duration: 4, scale: 0.8 },
    { id: 2, x: "75%", startY: 160, delay: 1, duration: 5, scale: 1.1 },
    { id: 3, x: "45%", startY: 140, delay: 0.5, duration: 3.5, scale: 0.7 },
    { id: 4, x: "85%", startY: 150, delay: 1.8, duration: 4.5, scale: 1.0 },
    { id: 5, x: "15%", startY: 130, delay: 2.2, duration: 4.2, scale: 0.9 },
    { id: 6, x: "60%", startY: 165, delay: 0.8, duration: 4.8, scale: 1.2 }
  ];

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

      {/* Main Welcoming Card */}
      <div className="relative w-48 h-48 bg-[#fdfbf7] rounded-3xl border-2 border-[#ebdcb9] shadow-lg p-3 overflow-hidden flex items-center justify-center">
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,26,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,26,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

        {/* Ambient background glow */}
        <div className="absolute w-[80%] h-[80%] rounded-full bg-gradient-to-b from-[#fffbeb] to-[#fef3c7] opacity-80 blur-xl pointer-events-none" />

        {/* Continuous Floating Ghibli Sparkles (Leaves/Glow) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
          {floatingSparkles.map((sparkle) => (
            <motion.div
              key={sparkle.id}
              className="absolute w-2 h-2 rounded-full bg-amber-400/60 blur-[0.5px]"
              style={{ left: sparkle.x }}
              initial={{ y: sparkle.startY, scale: 0, opacity: 0 }}
              animate={{
                y: [sparkle.startY, -10],
                scale: [0, sparkle.scale, 0],
                opacity: [0, 0.7, 0],
                x: [0, Math.sin(sparkle.id) * 15, -Math.sin(sparkle.id) * 10]
              }}
              transition={{
                repeat: Infinity,
                duration: sparkle.duration,
                delay: sparkle.delay,
                ease: "easeOut"
              }}
            />
          ))}
        </div>

        {/* Ghibli character image with custom cartoon breathing animation */}
        <motion.div
          className="absolute w-36 h-36 flex items-center justify-center z-10 bottom-4"
          initial={{ scale: 0.3, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1.2, type: "spring", stiffness: 60 }}
        >
          <motion.img
            src={namasteCharacter}
            alt="Traditional Indian Welcome Namaste"
            className="w-full h-full object-contain"
            animate={{ 
              y: [0, -3.5, 0],
              rotate: [0, 0.5, -0.5, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 3.6,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Welcome Sparkle Burst overlay */}
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full pointer-events-none z-20">
          {showParticles && particles.map((p) => (
            <motion.circle
              key={p.id}
              cx={100}
              cy={90}
              r={p.size * 1.2}
              fill="#fbbf24"
              initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }}
              animate={{ opacity: 0, scale: 1.8, x: p.x, y: p.y }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          ))}

          {/* Centered magic glow when greeting triggers */}
          {joined && (
            <motion.circle 
              cx="100" 
              cy="90" 
              r="8" 
              fill="#fbbf24" 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="mix-blend-screen filter blur-[2px]"
            />
          )}
        </svg>

        {/* Status indicator and replay controls */}
        {!joined && (
          <div className="absolute bottom-2 text-[9px] font-mono text-amber-700/70 font-semibold animate-pulse tracking-wider z-30">
            PREPARING WELCOME...
          </div>
        )}
        {joined && (
          <button 
            onClick={handleReplayVoice}
            className="absolute bottom-2 text-[9px] font-mono text-amber-800 hover:text-amber-950 font-semibold transition-colors duration-200 tracking-widest cursor-pointer underline decoration-amber-800/30 underline-offset-2 z-30"
          >
            REPLAY GREETING
          </button>
        )}
      </div>
    </div>
  );
}
