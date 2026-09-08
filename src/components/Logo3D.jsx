import React, { useState, useRef, useEffect, useMemo } from 'react';
import logo from '../assets/logo.png';

export default function Logo3D({ 
  size = "md", // 'xs', 'sm', 'md', 'lg', 'xl' or custom class
  animation = "float", // 'spin', 'swing', 'float', 'none'
  interactive = true, 
  layersCount = 6,
  className = ""
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  // Check if touch/mobile environment
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const handleMouseMove = (e) => {
    if (!interactive || isMobile || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const rotateX = -((y / rect.height) - 0.5) * 20; 
    const rotateY = ((x / rect.width) - 0.5) * 20; 
    
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  // Size map conversions
  const sizeMap = {
    xs: "w-8 h-8",
    sm: "w-10 h-10",
    md: "w-20 h-20",
    lg: "w-48 h-48 sm:w-56 sm:h-56",
    xl: "w-64 h-64 sm:w-72 sm:h-72",
  };
  
  const sizeClass = sizeMap[size] || size;

  // Inject keyframes stylesheet once globally
  useEffect(() => {
    const styleId = "logo-3d-keyframes";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        @keyframes logo3d-spin {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        @keyframes logo3d-swing {
          0% { transform: rotateY(-16deg) rotateX(6deg); }
          50% { transform: rotateY(16deg) rotateX(-6deg); }
          100% { transform: rotateY(-16deg) rotateX(6deg); }
        }
        @keyframes logo3d-float {
          0% { transform: translateY(0px) rotateY(-3deg) rotateX(3deg); }
          50% { transform: translateY(-12px) rotateY(3deg) rotateX(-3deg); }
          100% { transform: translateY(0px) rotateY(-3deg) rotateX(3deg); }
        }
        @keyframes logo3d-shadow-pulse {
          0%, 100% { transform: rotateX(90deg) translateZ(-40px) scale(0.92); opacity: 0.35; }
          50% { transform: rotateX(90deg) translateZ(-40px) scale(1.08); opacity: 0.55; }
        }
        .animate-logo3d-spin {
          animation: logo3d-spin 8s linear infinite;
        }
        .animate-logo3d-swing {
          animation: logo3d-swing 5s ease-in-out infinite;
        }
        .animate-logo3d-float {
          animation: logo3d-float 4.5s ease-in-out infinite;
        }
        .animate-logo3d-shadow-pulse {
          animation: logo3d-shadow-pulse 4.5s ease-in-out infinite;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Determine active animation class when not hovered
  let animationClass = "";
  if (!isHovered) {
    if (animation === "spin") animationClass = "animate-logo3d-spin";
    else if (animation === "swing") animationClass = "animate-logo3d-swing";
    else if (animation === "float") animationClass = "animate-logo3d-float";
  }

  // Optimize layer count: 2-3 layers on mobile, 4-6 on desktop
  const effectiveLayersCount = useMemo(() => {
    if (isMobile) return Math.min(layersCount, 3);
    return Math.min(layersCount, 6);
  }, [isMobile, layersCount]);

  const layers = useMemo(() => {
    return Array.from({ length: effectiveLayersCount }, (_, i) => i);
  }, [effectiveLayersCount]);

  return (
    <div 
      ref={containerRef}
      onMouseMove={interactive && !isMobile ? handleMouseMove : undefined}
      onMouseEnter={interactive && !isMobile ? () => setIsHovered(true) : undefined}
      onMouseLeave={interactive && !isMobile ? handleMouseLeave : undefined}
      className={`relative flex items-center justify-center select-none ${sizeClass} ${className}`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Ambient background glow */}
      <div 
        className="absolute rounded-full bg-gradient-to-tr from-indigo-500/20 to-blue-500/20 blur-lg pointer-events-none transition-all duration-300"
        style={{
          width: '120%',
          height: '120%',
          transform: `translateZ(-20px) scale(${isHovered ? 1.15 : 1})`,
          opacity: isHovered ? 0.9 : 0.6,
        }}
      />

      {/* 3D Stack Container */}
      <div
        className={`relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out ${animationClass}`}
        style={{
          transformStyle: 'preserve-3d',
          transform: isHovered 
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.06)` 
            : 'rotateX(0deg) rotateY(0deg) scale(1)',
        }}
      >
        {/* Layer stack for 3D extrusion */}
        {layers.map((layer) => {
          const zTranslation = -layer * 1.5;
          const isMain = layer === 0;
          
          return (
            <img
              key={layer}
              src={logo}
              alt="Nexora Logo 3D Layer"
              className="absolute w-full h-full object-contain pointer-events-none select-none"
              style={{
                transform: `translateZ(${zTranslation}px)`,
                filter: isMain 
                  ? 'drop-shadow(0 8px 16px rgba(79, 70, 229, 0.2))' 
                  : `brightness(${75 - layer * 7}%)`,
                opacity: isMain ? 1 : 0.85 - (layer * 0.12),
                zIndex: effectiveLayersCount - layer,
              }}
            />
          );
        })}

        {/* Dynamic Specular reflection on hover (desktop only) */}
        {isHovered && !isMobile && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none z-50 mix-blend-overlay"
            style={{
              background: `radial-gradient(circle at ${tilt.y * 2 + 50}% ${-tilt.x * 2 + 50}%, rgba(255, 255, 255, 0.45) 0%, transparent 60%)`,
              transform: 'translateZ(2px)',
            }}
          />
        )}
      </div>

      {/* Bottom Drop Shadow (Pure CSS Animation) */}
      <div
        className={`absolute bottom-[-15%] w-[85%] h-[15%] rounded-full bg-slate-950/15 blur-md pointer-events-none ${
          animation === 'float' && !isHovered ? 'animate-logo3d-shadow-pulse' : ''
        }`}
        style={{
          transform: isHovered ? 'rotateX(90deg) translateZ(-40px) scale(1.1)' : undefined,
        }}
      />
    </div>
  );
}
