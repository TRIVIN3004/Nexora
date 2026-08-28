import React, { useState, useRef, useEffect } from 'react';
import logo from '../assets/logo.png';

export default function Logo3D({ 
  size = "md", // 'xs', 'sm', 'md', 'lg', 'xl' or custom class
  animation = "float", // 'spin', 'swing', 'float', 'none'
  interactive = true, 
  layersCount = 8,
  className = ""
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const [pulseScale, setPulseScale] = useState(1);

  const handleMouseMove = (e) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize coordinates from -1 to 1 (tilt max 25 degrees)
    const rotateX = -((y / rect.height) - 0.5) * 25; 
    const rotateY = ((x / rect.width) - 0.5) * 25; 
    
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  // Pulse effect logic for the shadow when floating
  useEffect(() => {
    if (animation === 'float' && !isHovered) {
      let frameId;
      const animate = () => {
        const time = Date.now() * 0.0025; // Speed multiplier
        const pulse = 1 + Math.sin(time) * 0.08;
        setPulseScale(pulse);
        frameId = requestAnimationFrame(animate);
      };
      animate();
      return () => cancelAnimationFrame(frameId);
    }
  }, [animation, isHovered]);

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
          0% { transform: rotateY(-18deg) rotateX(8deg) rotateZ(-4deg); }
          50% { transform: rotateY(18deg) rotateX(-8deg) rotateZ(4deg); }
          100% { transform: rotateY(-18deg) rotateX(8deg) rotateZ(-4deg); }
        }
        @keyframes logo3d-float {
          0% { transform: translateY(0px) rotateY(-4deg) rotateX(4deg); }
          50% { transform: translateY(-16px) rotateY(4deg) rotateX(-4deg); }
          100% { transform: translateY(0px) rotateY(-4deg) rotateX(4deg); }
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

  const layers = Array.from({ length: layersCount }, (_, i) => i);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative flex items-center justify-center select-none ${sizeClass} ${className}`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Ambient background glow */}
      <div 
        className="absolute rounded-full bg-gradient-to-tr from-indigo-500/20 to-blue-500/20 blur-xl pointer-events-none transition-all duration-500"
        style={{
          width: '130%',
          height: '130%',
          transform: `translateZ(-25px) scale(${isHovered ? 1.2 : 1})`,
          opacity: isHovered ? 0.9 : 0.6,
        }}
      />

      {/* 3D Stack Container */}
      <div
        className={`relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out ${animationClass}`}
        style={{
          transformStyle: 'preserve-3d',
          transform: isHovered 
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.08)` 
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
                // Darken layers as they go back to simulate shadow and thickness
                filter: isMain 
                  ? 'drop-shadow(0 10px 20px rgba(79, 70, 229, 0.2))' 
                  : `brightness(${75 - layer * 7}%) contrast(${115 + layer * 2}%) saturate(${100 + layer * 4}%)`,
                opacity: isMain ? 1 : 0.85 - (layer * 0.08),
                zIndex: layersCount - layer,
              }}
            />
          );
        })}

        {/* Dynamic Specular lighting overlay reflection on hover */}
        {isHovered && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none z-50 mix-blend-overlay"
            style={{
              background: `radial-gradient(circle at ${tilt.y * 2 + 50}% ${-tilt.x * 2 + 50}%, rgba(255, 255, 255, 0.45) 0%, transparent 60%)`,
              transform: 'translateZ(2px)',
            }}
          />
        )}
      </div>

      {/* Bottom Drop Shadow */}
      <div
        className="absolute bottom-[-15%] w-[85%] h-[15%] rounded-full bg-slate-950/15 blur-lg pointer-events-none transition-all duration-300"
        style={{
          transform: `rotateX(90deg) translateZ(-40px) scale(${isHovered ? 1.15 : pulseScale})`,
          opacity: isHovered ? 0.6 : 0.4 / (pulseScale || 1),
        }}
      />
    </div>
  );
}
