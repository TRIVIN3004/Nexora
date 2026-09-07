import React, { useState, useEffect } from 'react';
import luxurySilkBg from '../assets/luxury-silk-bg.jpg';

export default function Background3D() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {/* 1. Base Deep Slate & Navy Gradient Floor */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b1329] via-[#0f172a] to-[#080d1a]" />

      {/* 2. High-Fidelity 3D Luxury Silk & Caustics Hero Layer with Mouse Parallax */}
      <div 
        className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out opacity-90 scale-105"
        style={{
          transform: `translate3d(${mousePos.x * 14}px, ${mousePos.y * 10 - scrollY * 0.05}px, 0) scale(1.04)`,
          willChange: 'transform',
        }}
      >
        <img
          src={luxurySilkBg}
          alt="Luxury 3D Silk Caustics Background"
          className="w-full h-full object-cover object-center filter saturate-[1.1] contrast-[1.05]"
        />
      </div>

      {/* 3. Dynamic Animated Aquatic Caustic Rays & Light Interference */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 40% at ${50 + mousePos.x * 10}% ${35 + mousePos.y * 8}%, rgba(56, 189, 248, 0.25) 0%, rgba(37, 99, 235, 0.1) 45%, transparent 75%)`,
        }}
      />

      {/* 4. Pearlescent Silk Specular Edge Glows */}
      <div 
        className="absolute top-1/4 left-1/4 w-[600px] h-[350px] rounded-full blur-[100px] pointer-events-none mix-blend-overlay opacity-50 transition-transform duration-1000"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(56,189,248,0.2) 50%, transparent 80%)',
          transform: `translate3d(${mousePos.x * -20}px, ${mousePos.y * -15}px, 0)`,
        }}
      />

      {/* 5. Subtle Vignette & Contrast Control for Perfect Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a]/80 via-transparent to-[#0b1329]/60 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0b1329]/20 to-[#080d1a]/70 pointer-events-none" />
    </div>
  );
}
