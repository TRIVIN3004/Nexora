import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Global Event Bridge for Touch/Click Shockwaves
const shockwaveQueue = [];

// ==============================================================================
// 1. TOUCH & CLICK EXPANDING ENERGY SHOCKWAVE RINGS
// ==============================================================================
const TouchShockwaveRings = () => {
  const [activeRings, setActiveRings] = useState([]);

  useFrame((state, delta) => {
    // Process new shockwaves queued from DOM pointer events
    while (shockwaveQueue.length > 0) {
      const newWave = shockwaveQueue.shift();
      setActiveRings((prev) => [...prev.slice(-6), newWave]);
    }

    // Expand and fade active rings
    if (activeRings.length > 0) {
      setActiveRings((prev) =>
        prev
          .map((ring) => ({
            ...ring,
            radius: ring.radius + delta * ring.speed,
            opacity: ring.opacity - delta * ring.fadeSpeed,
          }))
          .filter((ring) => ring.opacity > 0.01 && ring.radius < ring.maxRadius)
      );
    }
  });

  return (
    <group>
      {activeRings.map((ring) => (
        <group key={ring.id} position={[ring.x, ring.y, ring.z]}>
          {/* Main Glowing Shockwave Ring */}
          <mesh rotation={[-Math.PI / 3.2, 0, 0]} scale={ring.radius}>
            <ringGeometry args={[0.95, 1.0, 48]} />
            <meshBasicMaterial
              color={ring.color}
              transparent
              opacity={ring.opacity * 0.7}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Outer Soft Light Halo */}
          <mesh rotation={[-Math.PI / 3.2, 0, 0]} scale={ring.radius * 1.08}>
            <ringGeometry args={[0.88, 1.0, 36]} />
            <meshBasicMaterial
              color={ring.secondaryColor}
              transparent
              opacity={ring.opacity * 0.35}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// ==============================================================================
// 2. TOUCH-REACTIVE MULTI-COLOR PARTICLE SWARM WITH IMPULSE PHYSICS
// ==============================================================================
const TouchReactiveParticleSwarm = () => {
  const pointsRef = useRef();
  const count = 1500;

  // 3D Positions, baseline anchors, velocities, and curated vibrant colors
  const [positions, colors, basePositions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const base = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    const palette = [
      new THREE.Color('#38bdf8'), // Cyan
      new THREE.Color('#818cf8'), // Electric Indigo
      new THREE.Color('#c084fc'), // Vivid Purple
      new THREE.Color('#f472b6'), // Neon Pink
      new THREE.Color('#3b82f6'), // Royal Blue
      new THREE.Color('#34d399'), // Emerald Green
      new THREE.Color('#fbbf24'), // Warm Amber
    ];

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 36;
      const y = (Math.random() - 0.5) * 24;
      const z = (Math.random() - 0.5) * 14 - 2;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      base[i * 3] = x;
      base[i * 3 + 1] = y;
      base[i * 3 + 2] = z;

      vel[i * 3] = 0;
      vel[i * 3 + 1] = 0;
      vel[i * 3 + 2] = 0;

      const chosenColor = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    return [pos, col, base, vel];
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const { pointer } = state;

    if (pointsRef.current) {
      const posArray = pointsRef.current.geometry.attributes.position.array;

      const targetPointerX = pointer.x * 14;
      const targetPointerY = pointer.y * 10;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const bx = basePositions[i3];
        const by = basePositions[i3 + 1];
        const bz = basePositions[i3 + 2];

        // 1. Natural Organic Fluid Oscillations
        const waveY = Math.sin(t * 0.45 + bx * 0.22) * 0.35 + Math.cos(t * 0.35 + by * 0.22) * 0.25;
        const waveZ = Math.sin(t * 0.5 + i) * 0.2;

        // 2. Interactive Touch / Cursor Repulsion & Magnetic Vortex
        const dx = posArray[i3] - targetPointerX;
        const dy = posArray[i3 + 1] - targetPointerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 5.5;

        let forceX = 0;
        let forceY = 0;

        if (dist < radius && dist > 0.01) {
          const power = Math.pow((radius - dist) / radius, 1.8) * 1.8;
          // Outward repulsion
          forceX = (dx / dist) * power;
          forceY = (dy / dist) * power;

          // Subtle tangential swirl force
          forceX += (-dy / dist) * power * 0.4;
          forceY += (dx / dist) * power * 0.4;
        }

        // Apply velocity with damping / spring back to base position
        velocities[i3] = (velocities[i3] + forceX) * 0.88;
        velocities[i3 + 1] = (velocities[i3 + 1] + forceY) * 0.88;

        posArray[i3] = bx + velocities[i3];
        posArray[i3 + 1] = by + waveY + velocities[i3 + 1];
        posArray[i3 + 2] = bz + waveZ;
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.rotation.y = Math.sin(t * 0.03) * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        vertexColors
        transparent
        opacity={0.82}
        sizeAttenuation
        blending={THREE.NormalBlending}
      />
    </points>
  );
};

// ==============================================================================
// 3. VIBRANT MULTI-COLOR GRADIENT WAVE TERRAIN
// ==============================================================================
const VibrantWaveMesh = () => {
  const geomRef = useRef();
  const [cols, rows] = [58, 42];
  const width = 36;
  const height = 26;

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

        // Gradient: Cyan -> Blue -> Purple -> Pink -> Amber
        const r = 0.2 + u * 0.65 + Math.sin(v * Math.PI) * 0.2;
        const g = 0.45 + (1 - u) * 0.35 + v * 0.2;
        const b = 0.95;

        col[idx * 3] = Math.min(1, r);
        col[idx * 3 + 1] = Math.min(1, g);
        col[idx * 3 + 2] = Math.min(1, b);

        idx++;
      }
    }
    return [pos, col];
  }, [cols, rows, width, height]);

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

          const wave1 = Math.sin(x * 0.22 + t * 0.55) * 0.48;
          const wave2 = Math.cos(y * 0.26 + t * 0.45) * 0.38;
          const wave3 = Math.sin((x + y) * 0.18 + t * 0.7) * 0.22;

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
      {/* 1. Translucent Physical Surface */}
      <mesh>
        <bufferGeometry ref={geomRef}>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
          <bufferAttribute attach="index" args={[new Uint16Array(indices), 1]} />
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

      {/* 2. Soft Glowing Cyan Wireframe Grid */}
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[width, height, 42, 30]} />
        <meshStandardMaterial
          color="#38bdf8"
          wireframe
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  );
};

// ==============================================================================
// 4. FLOWING 3D BEZIER ENERGY STREAMLINES (Stripe / Linear Vector Trails)
// ==============================================================================
const FlowingEnergyStreamlines = () => {
  const stream1 = useRef();
  const stream2 = useRef();

  const curves = useMemo(() => {
    const c1 = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-16, 4.5, -4),
      new THREE.Vector3(-5, 7, -2),
      new THREE.Vector3(4, 1.5, -1.5),
      new THREE.Vector3(16, 4, -4)
    );

    const c2 = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-15, -4, -3.5),
      new THREE.Vector3(-4, -1, -1.5),
      new THREE.Vector3(5, 5.5, -2),
      new THREE.Vector3(15, 0.5, -4)
    );

    return { c1, c2 };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (stream1.current) stream1.current.position.y = Math.sin(t * 0.4) * 0.15;
    if (stream2.current) stream2.current.position.y = Math.cos(t * 0.35) * 0.18;
  });

  return (
    <group>
      {/* Streamline 1 (Cyan to Blue) */}
      <mesh ref={stream1}>
        <tubeGeometry args={[curves.c1, 80, 0.035, 8, false]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Streamline 2 (Purple to Pink) */}
      <mesh ref={stream2}>
        <tubeGeometry args={[curves.c2, 80, 0.03, 8, false]} />
        <meshStandardMaterial
          color="#c084fc"
          emissive="#a855f7"
          emissiveIntensity={0.55}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.45}
        />
      </mesh>
    </group>
  );
};

// ==============================================================================
// 5. INTERACTIVE PARALLAX & DYNAMIC MULTI-COLOR TOUCH LIGHTING
// ==============================================================================
const ParallaxAndColorfulLighting = () => {
  const lightRef = useRef();

  useFrame((state) => {
    const { pointer, camera } = state;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.5, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.38, 0.04);
    camera.lookAt(0, 0, 0);

    if (lightRef.current) {
      lightRef.current.position.x = pointer.x * 14;
      lightRef.current.position.y = pointer.y * 10;
    }
  });

  return (
    <>
      {/* Interactive Cursor Point Light */}
      <pointLight
        ref={lightRef}
        position={[0, 0, 5]}
        color="#38bdf8"
        intensity={2.4}
        distance={25}
      />

      {/* Ambient Multi-Color Studio Fill Lights */}
      <pointLight position={[-12, 6, 4]} color="#06b6d4" intensity={2.0} distance={30} />
      <pointLight position={[12, -6, 4]} color="#d946ef" intensity={2.0} distance={30} />
      <pointLight position={[0, 10, 4]} color="#3b82f6" intensity={1.8} distance={25} />
      <pointLight position={[-6, -8, 3]} color="#10b981" intensity={1.5} distance={25} />
    </>
  );
};

// ==============================================================================
// MAIN 3D BACKGROUND COMPONENT WITH TOUCH & CLICK CAPTURE
// ==============================================================================
export default function Background3D() {
  const [touchEffect, setTouchEffect] = useState(null);

  // Handle Touch / Click on the window to spawn shockwaves & interactive pulses
  useEffect(() => {
    const shockwaveColors = [
      { main: '#38bdf8', sec: '#818cf8' },
      { main: '#c084fc', sec: '#f472b6' },
      { main: '#34d399', sec: '#38bdf8' },
      { main: '#fbbf24', sec: '#f472b6' },
    ];

    const triggerShockwave = (clientX, clientY) => {
      const normX = (clientX / window.innerWidth - 0.5) * 28;
      const normY = -(clientY / window.innerHeight - 0.5) * 18;

      const randomColor = shockwaveColors[Math.floor(Math.random() * shockwaveColors.length)];

      shockwaveQueue.push({
        id: `wave-${Date.now()}-${Math.random()}`,
        x: normX,
        y: normY,
        z: -1.5,
        radius: 0.2,
        maxRadius: 6.5,
        speed: 4.8,
        opacity: 0.95,
        fadeSpeed: 0.8,
        color: randomColor.main,
        secondaryColor: randomColor.sec,
      });

      // Show temporary touch click feedback ripple on the DOM
      setTouchEffect({ x: clientX, y: clientY, id: Date.now() });
      setTimeout(() => setTouchEffect(null), 700);
    };

    const handlePointerDown = (e) => {
      // Don't interfere with interactive buttons or links
      if (e.target.closest('button, a, input, textarea, select')) return;
      triggerShockwave(e.clientX, e.clientY);
    };

    const handleTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        if (e.target.closest('button, a, input, textarea, select')) return;
        triggerShockwave(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {/* 1. Luminous Ambient Gradient Aurora Backing (High Contrast & Legibility) */}
      <div className="absolute inset-0 bg-[#f8fafc]/90" />

      {/* Multi-Color Ambient Auroras */}
      <div className="absolute -top-[15%] -left-[10%] w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-cyan-400/20 to-blue-600/20 blur-[130px] pointer-events-none" />
      <div className="absolute top-[35%] -right-[15%] w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-purple-500/20 via-pink-500/20 to-indigo-600/15 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-[15%] left-[20%] w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-emerald-400/15 via-teal-500/15 to-blue-500/20 blur-[150px] pointer-events-none" />

      {/* 2. Interactive Real-Time 3D Canvas */}
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
          <directionalLight position={[8, 12, 6]} intensity={1.4} color="#ffffff" />

          {/* Touch & Click Expanding 3D Shockwave Rings */}
          <TouchShockwaveRings />

          {/* 1,500+ Touch & Physics Reactive Colorful Particles */}
          <TouchReactiveParticleSwarm />

          {/* Multi-Color 3D Gradient Wave Terrain */}
          <VibrantWaveMesh />

          {/* Flowing 3D Energy Streamlines */}
          <FlowingEnergyStreamlines />

          {/* Multi-Color Dynamic Lighting & Cursor Parallax */}
          <ParallaxAndColorfulLighting />
        </Canvas>
      </div>

      {/* 3. Subtle Cyber Dot Matrix Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#2563eb 1.5px, transparent 1.5px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* 4. Interactive Touch Ripple Ring Visual Feedback */}
      {touchEffect && (
        <div
          key={touchEffect.id}
          className="absolute w-20 h-20 -ml-10 -mt-10 rounded-full border-2 border-cyan-400/60 bg-cyan-400/10 animate-ping pointer-events-none"
          style={{
            left: touchEffect.x,
            top: touchEffect.y,
            animationDuration: '600ms',
          }}
        />
      )}
    </div>
  );
}
