import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Global Queue for Touch/Click Shockwaves (no React state updates in frame loops)
const shockwaveQueue = [];

// ==============================================================================
// 1. HIGH-PERFORMANCE SHOCKWAVE POOL (Zero React State in useFrame)
// ==============================================================================
const MAX_RINGS = 4;

const TouchShockwaveRings = () => {
  const ringsRef = useRef([]);
  const ringDataRef = useRef(
    Array.from({ length: MAX_RINGS }, () => ({
      active: false,
      radius: 0.1,
      maxRadius: 5.5,
      speed: 4.2,
      opacity: 0,
      fadeSpeed: 1.0,
      x: 0,
      y: 0,
      z: -1.5,
    }))
  );

  const { size } = useThree();
  const isMobile = size.width < 768;

  useFrame((_, delta) => {
    // Process new shockwaves into ring pool
    while (shockwaveQueue.length > 0) {
      const newWave = shockwaveQueue.shift();
      const freeIdx = ringDataRef.current.findIndex((r) => !r.active);
      const targetIdx = freeIdx !== -1 ? freeIdx : 0;
      
      ringDataRef.current[targetIdx] = {
        active: true,
        radius: 0.2,
        maxRadius: isMobile ? 4.5 : 6.0,
        speed: isMobile ? 3.8 : 4.6,
        opacity: 0.9,
        fadeSpeed: isMobile ? 1.2 : 0.9,
        x: newWave.x,
        y: newWave.y,
        z: -1.5,
      };
    }

    // Mutate refs directly without React re-renders
    ringDataRef.current.forEach((data, idx) => {
      const group = ringsRef.current[idx];
      if (!group) return;

      if (data.active) {
        data.radius += delta * data.speed;
        data.opacity -= delta * data.fadeSpeed;

        if (data.opacity <= 0.02 || data.radius >= data.maxRadius) {
          data.active = false;
          group.visible = false;
        } else {
          group.visible = true;
          group.position.set(data.x, data.y, data.z);
          group.scale.set(data.radius, data.radius, data.radius);
          
          if (group.children[0]?.material) {
            group.children[0].material.opacity = data.opacity * 0.7;
          }
          if (group.children[1]?.material) {
            group.children[1].material.opacity = data.opacity * 0.3;
          }
        }
      } else {
        group.visible = false;
      }
    });
  });

  return (
    <group>
      {Array.from({ length: MAX_RINGS }).map((_, i) => (
        <group
          key={i}
          ref={(el) => (ringsRef.current[i] = el)}
          visible={false}
          position={[0, 0, -1.5]}
        >
          <mesh rotation={[-Math.PI / 3.2, 0, 0]}>
            <ringGeometry args={[0.93, 1.0, isMobile ? 24 : 36]} />
            <meshBasicMaterial
              color="#38bdf8"
              transparent
              opacity={0.7}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh rotation={[-Math.PI / 3.2, 0, 0]} scale={1.06}>
            <ringGeometry args={[0.88, 1.0, isMobile ? 18 : 28]} />
            <meshBasicMaterial
              color="#818cf8"
              transparent
              opacity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// ==============================================================================
// 2. MOBILE-OPTIMIZED TOUCH-REACTIVE PARTICLE SWARM
// ==============================================================================
const TouchReactiveParticleSwarm = () => {
  const pointsRef = useRef();
  const { size } = useThree();
  const isMobile = size.width < 768;
  const count = isMobile ? 200 : 650;

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
    ];

    const spreadX = isMobile ? 16 : 32;
    const spreadY = isMobile ? 28 : 22;
    const spreadZ = isMobile ? 10 : 12;

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * spreadX;
      const y = (Math.random() - 0.5) * spreadY;
      const z = (Math.random() - 0.5) * spreadZ - 2;

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
  }, [count, isMobile]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    const { pointer } = state;
    const posArray = pointsRef.current.geometry.attributes.position.array;

    const targetPointerX = pointer.x * (isMobile ? 6 : 12);
    const targetPointerY = pointer.y * (isMobile ? 10 : 8);
    const repulsionRadiusSq = isMobile ? 12 : 24;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const bx = basePositions[i3];
      const by = basePositions[i3 + 1];
      const bz = basePositions[i3 + 2];

      const waveY = Math.sin(t * 0.4 + bx * 0.25) * 0.25;
      const waveZ = Math.sin(t * 0.45 + i) * 0.15;

      const dx = posArray[i3] - targetPointerX;
      const dy = posArray[i3 + 1] - targetPointerY;
      const distSq = dx * dx + dy * dy;

      let forceX = 0;
      let forceY = 0;

      if (distSq < repulsionRadiusSq && distSq > 0.05) {
        const dist = Math.sqrt(distSq);
        const power = (1 - dist / (isMobile ? 3.5 : 5.0)) * 0.8;
        forceX = (dx / dist) * power;
        forceY = (dy / dist) * power;
      }

      velocities[i3] = (velocities[i3] + forceX) * 0.86;
      velocities[i3 + 1] = (velocities[i3 + 1] + forceY) * 0.86;

      posArray[i3] = bx + velocities[i3];
      posArray[i3 + 1] = by + waveY + velocities[i3 + 1];
      posArray[i3 + 2] = bz + waveZ;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.24 : 0.16}
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
// 3. RESPONSIVE MULTI-COLOR GRADIENT WAVE TERRAIN (CPU Optimized)
// ==============================================================================
const VibrantWaveMesh = () => {
  const geomRef = useRef();
  const { size } = useThree();
  const isMobile = size.width < 768;

  const [cols, rows] = isMobile ? [20, 14] : [36, 24];
  const width = isMobile ? 20 : 34;
  const height = isMobile ? 28 : 24;

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
    if (!geomRef.current) return;
    const t = state.clock.getElapsedTime();
    const pos = geomRef.current.attributes.position.array;
    let idx = 0;

    for (let i = 0; i <= rows; i++) {
      for (let j = 0; j <= cols; j++) {
        const x = pos[idx * 3];
        const y = pos[idx * 3 + 1];

        const wave1 = Math.sin(x * 0.28 + t * 0.5) * 0.4;
        const wave2 = Math.cos(y * 0.28 + t * 0.4) * 0.3;

        pos[idx * 3 + 2] = wave1 + wave2;
        idx++;
      }
    }
    geomRef.current.attributes.position.needsUpdate = true;
  });

  return (
    <group 
      position={isMobile ? [0, -3.0, -4.5] : [0, -2.4, -4.5]} 
      rotation={[-Math.PI / 3.2, 0, 0]}
    >
      <mesh>
        <bufferGeometry ref={geomRef}>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
          <bufferAttribute attach="index" args={[new Uint16Array(indices), 1]} />
        </bufferGeometry>
        <meshStandardMaterial
          vertexColors
          roughness={0.25}
          metalness={0.35}
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[width, height, isMobile ? 18 : 28, isMobile ? 12 : 20]} />
        <meshBasicMaterial
          color="#38bdf8"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>
    </group>
  );
};

// ==============================================================================
// 4. FLOWING 3D ENERGY STREAMLINES
// ==============================================================================
const FlowingEnergyStreamlines = () => {
  const stream1 = useRef();
  const stream2 = useRef();
  const { size } = useThree();
  const isMobile = size.width < 768;

  const curves = useMemo(() => {
    const c1 = isMobile
      ? new THREE.CubicBezierCurve3(
          new THREE.Vector3(-8, 7, -4),
          new THREE.Vector3(-2, 8, -2),
          new THREE.Vector3(2, 2, -1.5),
          new THREE.Vector3(8, 6, -4)
        )
      : new THREE.CubicBezierCurve3(
          new THREE.Vector3(-15, 4.5, -4),
          new THREE.Vector3(-5, 7, -2),
          new THREE.Vector3(4, 1.5, -1.5),
          new THREE.Vector3(15, 4, -4)
        );

    const c2 = isMobile
      ? new THREE.CubicBezierCurve3(
          new THREE.Vector3(-7, -5, -3.5),
          new THREE.Vector3(-1, -1, -1.5),
          new THREE.Vector3(2, 6, -2),
          new THREE.Vector3(7, 1, -4)
        )
      : new THREE.CubicBezierCurve3(
          new THREE.Vector3(-14, -4, -3.5),
          new THREE.Vector3(-4, -1, -1.5),
          new THREE.Vector3(5, 5.5, -2),
          new THREE.Vector3(14, 0.5, -4)
        );

    return { c1, c2 };
  }, [isMobile]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (stream1.current) stream1.current.position.y = Math.sin(t * 0.35) * 0.12;
    if (stream2.current) stream2.current.position.y = Math.cos(t * 0.3) * 0.15;
  });

  return (
    <group>
      <mesh ref={stream1}>
        <tubeGeometry args={[curves.c1, isMobile ? 28 : 50, isMobile ? 0.04 : 0.035, 6, false]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.45}
        />
      </mesh>

      <mesh ref={stream2}>
        <tubeGeometry args={[curves.c2, isMobile ? 28 : 50, isMobile ? 0.035 : 0.03, 6, false]} />
        <meshBasicMaterial
          color="#c084fc"
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
};

// ==============================================================================
// 5. RESPONSIVE CAMERA & LIGHTING
// ==============================================================================
const ResponsiveSceneController = () => {
  const lightRef = useRef();
  const { size, camera } = useThree();
  const isMobile = size.width < 768;

  useEffect(() => {
    if (isMobile) {
      camera.fov = 60;
      camera.position.z = 8.5;
    } else {
      camera.fov = 48;
      camera.position.z = 7.5;
    }
    camera.updateProjectionMatrix();
  }, [isMobile, camera]);

  useFrame((state) => {
    const { pointer } = state;
    const factorX = isMobile ? 0.2 : 0.45;
    const factorY = isMobile ? 0.15 : 0.35;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * factorX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * factorY, 0.05);
    camera.lookAt(0, 0, 0);

    if (lightRef.current && !isMobile) {
      lightRef.current.position.x = pointer.x * 12;
      lightRef.current.position.y = pointer.y * 10;
    }
  });

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[8, 12, 6]} intensity={1.5} color="#ffffff" />

      {!isMobile && (
        <>
          <pointLight
            ref={lightRef}
            position={[0, 0, 5]}
            color="#38bdf8"
            intensity={2.0}
            distance={22}
          />
          <pointLight position={[-8, 6, 4]} color="#06b6d4" intensity={1.5} distance={24} />
          <pointLight position={[8, -6, 4]} color="#d946ef" intensity={1.5} distance={24} />
        </>
      )}
    </>
  );
};

// ==============================================================================
// MAIN 3D BACKGROUND COMPONENT
// ==============================================================================
export default function Background3D() {
  const [touchEffect, setTouchEffect] = useState(null);

  useEffect(() => {
    const triggerShockwave = (clientX, clientY) => {
      const isMobile = window.innerWidth < 768;
      const normX = (clientX / window.innerWidth - 0.5) * (isMobile ? 14 : 26);
      const normY = -(clientY / window.innerHeight - 0.5) * (isMobile ? 22 : 16);

      shockwaveQueue.push({
        x: normX,
        y: normY,
      });

      if (!isMobile) {
        setTouchEffect({ x: clientX, y: clientY, id: Date.now() });
        setTimeout(() => setTouchEffect(null), 500);
      }
    };

    let lastTime = 0;
    const handlePointerDown = (e) => {
      if (e.target.closest('button, a, input, textarea, select')) return;
      const now = Date.now();
      if (now - lastTime < 120) return; // Debounce rapid multi-touch
      lastTime = now;
      triggerShockwave(e.clientX, e.clientY);
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {/* 1. Ambient Gradient Auroras */}
      <div className="absolute inset-0 bg-[#f8fafc]/90" />

      <div className="absolute -top-[15%] -left-[15%] w-[320px] sm:w-[600px] h-[320px] sm:h-[600px] rounded-full bg-gradient-to-tr from-cyan-400/15 to-blue-600/15 blur-[60px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute top-[35%] -right-[20%] w-[280px] sm:w-[550px] h-[280px] sm:h-[550px] rounded-full bg-gradient-to-bl from-purple-500/15 via-pink-500/15 to-indigo-600/10 blur-[60px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-[15%] left-[10%] w-[340px] sm:w-[650px] h-[340px] sm:h-[650px] rounded-full bg-gradient-to-tr from-emerald-400/12 via-teal-500/12 to-blue-500/15 blur-[70px] sm:blur-[130px] pointer-events-none" />

      {/* 2. Interactive 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 8.0], fov: 52 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          dpr={[1, typeof window !== 'undefined' ? (window.innerWidth < 768 ? 1.25 : 1.75) : 1.25]}
        >
          {/* Touch & Click Expanding Shockwaves */}
          <TouchShockwaveRings />

          {/* Multi-Color Particle Swarm */}
          <TouchReactiveParticleSwarm />

          {/* Multi-Color Wave Terrain */}
          <VibrantWaveMesh />

          {/* Flowing Energy Streamlines */}
          <FlowingEnergyStreamlines />

          {/* Responsive Camera & Lighting */}
          <ResponsiveSceneController />
        </Canvas>
      </div>

      {/* 3. Dot Matrix Texture */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#2563eb 1.5px, transparent 1.5px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* 4. Touch Feedback Ripple (Desktop) */}
      {touchEffect && (
        <div
          key={touchEffect.id}
          className="absolute w-12 h-12 -ml-6 -mt-6 rounded-full border border-cyan-400/60 bg-cyan-400/10 animate-ping pointer-events-none"
          style={{
            left: touchEffect.x,
            top: touchEffect.y,
            animationDuration: '450ms',
          }}
        />
      )}
    </div>
  );
}
