import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ==============================================================================
// 1. VIBRANT MULTI-COLOR 3D PARTICLE SWARM (Interactive Floating Constellation)
// ==============================================================================
const ColorfulParticleSwarm = () => {
  const pointsRef = useRef();
  const count = 1400;

  // Generate 3D positions, random velocities, and vibrant distinct colors
  const [positions, colors, originalPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    // Curated vibrant color palette: Cyan, Electric Purple, Neon Magenta, Azure Blue, Emerald, Gold
    const palette = [
      new THREE.Color('#38bdf8'), // Cyan
      new THREE.Color('#818cf8'), // Indigo
      new THREE.Color('#c084fc'), // Purple
      new THREE.Color('#f472b6'), // Pink / Magenta
      new THREE.Color('#3b82f6'), // Electric Blue
      new THREE.Color('#34d399'), // Emerald
      new THREE.Color('#fbbf24'), // Warm Amber
    ];

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 34;
      const y = (Math.random() - 0.5) * 24;
      const z = (Math.random() - 0.5) * 14 - 2;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;

      const chosenColor = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    return [pos, col, orig];
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const { pointer } = state;

    if (pointsRef.current) {
      const pos = pointsRef.current.geometry.attributes.position.array;

      for (let i = 0; i < count; i++) {
        const ox = originalPositions[i * 3];
        const oy = originalPositions[i * 3 + 1];
        const oz = originalPositions[i * 3 + 2];

        // Organic swirling oscillation
        const wave = Math.sin(t * 0.45 + ox * 0.25) * 0.35 + Math.cos(t * 0.35 + oy * 0.25) * 0.25;
        
        // Mouse repulsion & interaction
        const dx = ox - pointer.x * 14;
        const dy = oy - pointer.y * 10;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const force = Math.max(0, (5.0 - dist) / 5.0);

        pos[i * 3] = ox + (dx / (dist || 1)) * force * 1.4;
        pos[i * 3 + 1] = oy + wave + (dy / (dist || 1)) * force * 1.4;
        pos[i * 3 + 2] = oz + Math.sin(t * 0.5 + i) * 0.25;
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.rotation.y = Math.sin(t * 0.04) * 0.04;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.NormalBlending}
      />
    </points>
  );
};

// ==============================================================================
// 2. VIBRANT MULTI-COLOR 3D WAVE TERRAIN (Rich Gradient Undulation)
// ==============================================================================
const VibrantWaveMesh = () => {
  const geomRef = useRef();
  const [cols, rows] = [56, 42];
  const width = 36;
  const height = 26;

  // Generate colorful vertex attributes
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array((cols + 1) * (rows + 1) * 3);
    const col = new Float32Array((cols + 1) * (rows + 1) * 3);

    let idx = 0;
    for (let i = 0; i <= rows; i++) {
      const v = i / rows;
      for (let j = 0; j <= cols; j++) {
        const u = j / cols;
        const x = (u - 0.5) * width;
        const y = (v - 0.5) * height;

        pos[idx * 3] = x;
        pos[idx * 3 + 1] = y;
        pos[idx * 3 + 2] = 0;

        // Dynamic Multi-Color Gradient: Cyan -> Royal Blue -> Violet -> Pink
        const r = 0.2 + u * 0.6 + Math.sin(v * Math.PI) * 0.2;
        const g = 0.4 + (1 - u) * 0.4 + v * 0.2;
        const b = 0.95;

        col[idx * 3] = Math.min(1, r);
        col[idx * 3 + 1] = Math.min(1, g);
        col[idx * 3 + 2] = Math.min(1, b);

        idx++;
      }
    }
    return [pos, col];
  }, [cols, rows, width, height]);

  // Generate triangle indices
  const indices = useMemo(() => {
    const ind = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const a = i * (cols + 1) + j;
        const b = (i + 1) * (cols + 1) + j;
        const c = a + 1;
        const d = b + 1;

        ind.push(a, b, d);
        ind.push(a, d, c);
      }
    }
    return ind;
  }, [cols, rows]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (geomRef.current) {
      const pos = geomRef.current.attributes.position.array;
      let idx = 0;

      for (let i = 0; i <= rows; i++) {
        const v = i / rows;
        for (let j = 0; j <= cols; j++) {
          const u = j / cols;
          const x = (u - 0.5) * width;
          const y = (v - 0.5) * height;

          // Multi-frequency wave formula
          const wave1 = Math.sin(x * 0.22 + t * 0.55) * 0.5;
          const wave2 = Math.cos(y * 0.28 + t * 0.45) * 0.4;
          const wave3 = Math.sin((x + y) * 0.18 + t * 0.7) * 0.25;

          pos[idx * 3 + 2] = wave1 + wave2 + wave3;
          idx++;
        }
      }
      geomRef.current.attributes.position.needsUpdate = true;
      geomRef.current.computeVertexNormals();
    }
  });

  return (
    <group position={[0, -2.4, -4.5]} rotation={[-Math.PI / 3.2, 0, 0]}>
      {/* 1. Translucent Gradient Wave Plane */}
      <mesh>
        <bufferGeometry ref={geomRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
          <bufferAttribute
            attach="index"
            args={[new Uint16Array(indices), 1]}
          />
        </bufferGeometry>
        <meshPhysicalMaterial
          vertexColors
          roughness={0.2}
          metalness={0.3}
          transmission={0.5}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          clearcoat={1.0}
        />
      </mesh>

      {/* 2. Glowing Colorful Wireframe Overlay */}
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[width, height, 42, 30]} />
        <meshStandardMaterial
          color="#38bdf8"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>
    </group>
  );
};

// ==============================================================================
// 3. INTERACTIVE PARALLAX & DYNAMIC MULTI-COLOR LIGHTING
// ==============================================================================
const ParallaxAndColorfulLighting = () => {
  const lightRef = useRef();

  useFrame((state) => {
    const { pointer, camera } = state;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.55, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.4, 0.04);
    camera.lookAt(0, 0, 0);

    if (lightRef.current) {
      lightRef.current.position.x = pointer.x * 14;
      lightRef.current.position.y = pointer.y * 10;
    }
  });

  return (
    <>
      {/* Dynamic Cursor Light */}
      <pointLight
        ref={lightRef}
        position={[0, 0, 5]}
        color="#38bdf8"
        intensity={2.2}
        distance={25}
      />

      {/* Vivid Left Cyan Light */}
      <pointLight
        position={[-12, 6, 4]}
        color="#06b6d4"
        intensity={2.0}
        distance={30}
      />

      {/* Vivid Right Purple/Pink Light */}
      <pointLight
        position={[12, -6, 4]}
        color="#d946ef"
        intensity={2.0}
        distance={30}
      />

      {/* Top Electric Blue Light */}
      <pointLight
        position={[0, 10, 4]}
        color="#3b82f6"
        intensity={1.8}
        distance={25}
      />

      {/* Bottom Emerald Light */}
      <pointLight
        position={[-6, -8, 3]}
        color="#10b981"
        intensity={1.5}
        distance={25}
      />
    </>
  );
};

// ==============================================================================
// MAIN 3D BACKGROUND COMPONENT
// ==============================================================================
export default function Background3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {/* 1. Luminous Ambient Gradient Aurora Backing (High Contrast & Legibility) */}
      <div className="absolute inset-0 bg-[#f8fafc]/90" />

      {/* Vibrant Ambient Glow Orbs */}
      <div className="absolute -top-[15%] -left-[10%] w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-cyan-400/20 to-blue-600/20 blur-[130px] pointer-events-none" />
      <div className="absolute top-[35%] -right-[15%] w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-purple-500/20 via-pink-500/20 to-indigo-600/15 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-[15%] left-[20%] w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-emerald-400/15 via-teal-500/15 to-blue-500/20 blur-[150px] pointer-events-none" />

      {/* 2. Interactive Real-time 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 7.5], fov: 48 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={1.1} />
          
          <directionalLight
            position={[8, 12, 6]}
            intensity={1.4}
            color="#ffffff"
          />

          {/* 1. Multi-Color Particle Swarm (1400+ colorful particles reacting to cursor) */}
          <ColorfulParticleSwarm />

          {/* 2. Multi-Color Gradient Wave Terrain */}
          <VibrantWaveMesh />

          {/* 3. Multi-Color Dynamic Lighting & Mouse Parallax */}
          <ParallaxAndColorfulLighting />
        </Canvas>
      </div>

      {/* 3. Subtle Cyber Dot Matrix Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#2563eb 1.5px, transparent 1.5px)',
          backgroundSize: '32px 32px'
        }}
      />
    </div>
  );
}
