import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleNetwork = () => {
  const pointsRef = useRef();
  const particlesCount = 2200;
  
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    const col = new Float32Array(particlesCount * 3);
    const color = new THREE.Color();
    
    // Palette of vibrant neon tech colors
    const palette = [
      '#6366f1', // Indigo
      '#3b82f6', // Electric Blue
      '#06b6d4', // Cyan
      '#d946ef', // Neon Fuchsia / Magenta
      '#8b5cf6', // Violet
      '#10b981', // Emerald
      '#f59e0b', // Amber Gold
    ];
    
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 28; // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 28; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16 - 4; // z depth

      const hex = palette[Math.floor(Math.random() * palette.length)];
      color.set(hex);
      
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    
    return [pos, col];
  }, [particlesCount]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.035;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.04) * 0.12;
      pointsRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.03) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.075}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-80">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ParticleNetwork />
      </Canvas>
    </div>
  );
}
