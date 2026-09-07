import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// ==============================================================================
// 1. VIBRANT MULTI-COLOR 3D PARTICLE SWARM (Interactive Floating Constellation)
// ==============================================================================
const ColorfulParticleSwarm = () => {
  const pointsRef = useRef();
  const count = 1200;

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
      const x = (Math.random() - 0.5) * 32;
      const y = (Math.random() - 0.5) * 22;
      const z = (Math.random() - 0.5) * 12 - 2;

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
        const wave = Math.sin(t * 0.5 + ox * 0.3) * 0.35 + Math.cos(t * 0.4 + oy * 0.3) * 0.25;
        
        // Mouse repulsion & interaction
        const dx = ox - pointer.x * 12;
        const dy = oy - pointer.y * 8;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const force = Math.max(0, (4.5 - dist) / 4.5);

        pos[i * 3] = ox + (dx / (dist || 1)) * force * 1.2;
        pos[i * 3 + 1] = oy + wave + (dy / (dist || 1)) * force * 1.2;
        pos[i * 3 + 2] = oz + Math.sin(t * 0.6 + i) * 0.3;
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.rotation.y = Math.sin(t * 0.05) * 0.05;
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
        size={0.16}
        vertexColors
        transparent
        opacity={0.85}
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
  const [cols, rows] = [54, 40];
  const width = 34;
  const height = 24;

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
          const wave1 = Math.sin(x * 0.25 + t * 0.6) * 0.55;
          const wave2 = Math.cos(y * 0.3 + t * 0.5) * 0.45;
          const wave3 = Math.sin((x + y) * 0.2 + t * 0.8) * 0.3;

          pos[idx * 3 + 2] = wave1 + wave2 + wave3;
          idx++;
        }
      }
      geomRef.current.attributes.position.needsUpdate = true;
      geomRef.current.computeVertexNormals();
    }
  });

  return (
    <group position={[0, -2.5, -4.5]} rotation={[-Math.PI / 3.2, 0, 0]}>
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
          opacity={0.35}
          side={THREE.DoubleSide}
          clearcoat={1.0}
        />
      </mesh>

      {/* 2. Glowing Colorful Wireframe Overlay */}
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[width, height, 40, 28]} />
        <meshStandardMaterial
          color="#38bdf8"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
};

// ==============================================================================
// 3. FLOATING VIBRANT 3D SHAPES (Torus Knot, Prismatic Octahedron & Rings)
// ==============================================================================
const VibrantFloatingShapes = () => {
  const torusKnotRef = useRef();
  const octaRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const sphereRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (torusKnotRef.current) {
      torusKnotRef.current.rotation.x = t * 0.2;
      torusKnotRef.current.rotation.y = t * 0.3;
    }
    if (octaRef.current) {
      octaRef.current.rotation.y = -t * 0.25;
      octaRef.current.rotation.z = t * 0.15;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.18;
      ring1Ref.current.rotation.y = t * 0.22;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -t * 0.15;
      ring2Ref.current.rotation.z = t * 0.2;
    }
    if (sphereRef.current) {
      sphereRef.current.position.y = 1.2 + Math.sin(t * 0.8) * 0.3;
    }
  });

  return (
    <group>
      {/* 1. Vivid Neon Purple/Pink Torus Knot (Top Right) */}
      <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.8}>
        <group position={[7.2, 2.5, -2.8]} scale={0.75}>
          <mesh ref={torusKnotRef}>
            <torusKnotGeometry args={[1.2, 0.3, 100, 16]} />
            <meshPhysicalMaterial
              color="#c084fc"
              emissive="#7c3aed"
              emissiveIntensity={0.4}
              roughness={0.1}
              metalness={0.5}
              clearcoat={1.0}
              transparent
              opacity={0.75}
            />
          </mesh>
          {/* Wireframe Glow Shell */}
          <mesh scale={1.08}>
            <torusKnotGeometry args={[1.2, 0.3, 50, 8]} />
            <meshBasicMaterial color="#f472b6" wireframe transparent opacity={0.25} />
          </mesh>
        </group>
      </Float>

      {/* 2. Prismatic Cyan / Emerald Octahedron (Left Center) */}
      <Float speed={1.3} rotationIntensity={0.5} floatIntensity={0.7}>
        <group position={[-7.5, 1.0, -2.5]} scale={0.9}>
          <mesh ref={octaRef}>
            <octahedronGeometry args={[1.3, 0]} />
            <meshPhysicalMaterial
              color="#06b6d4"
              emissive="#0284c7"
              emissiveIntensity={0.35}
              roughness={0.12}
              metalness={0.4}
              transmission={0.7}
              thickness={1.5}
              clearcoat={1.0}
              transparent
              opacity={0.8}
            />
          </mesh>
          {/* Neon Edge Frame */}
          <mesh scale={1.02}>
            <octahedronGeometry args={[1.3, 0]} />
            <meshBasicMaterial color="#34d399" wireframe transparent opacity={0.35} />
          </mesh>
        </group>
      </Float>

      {/* 3. Dual Electric Blue & Magenta Orbital Rings (Bottom Left) */}
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
        <group position={[-6.5, -3.2, -3]}>
          <mesh ref={ring1Ref}>
            <torusGeometry args={[1.8, 0.05, 16, 80]} />
            <meshStandardMaterial
              color="#3b82f6"
              emissive="#1d4ed8"
              emissiveIntensity={0.6}
              roughness={0.1}
              metalness={0.8}
              transparent
              opacity={0.7}
            />
          </mesh>
          <mesh ref={ring2Ref} scale={0.75}>
            <torusGeometry args={[1.8, 0.04, 16, 80]} />
            <meshStandardMaterial
              color="#ec4899"
              emissive="#be185d"
              emissiveIntensity={0.6}
              roughness={0.1}
              metalness={0.8}
              transparent
              opacity={0.7}
            />
          </mesh>
        </group>
      </Float>

      {/* 4. Glowing Warm Amber Glass Sphere (Bottom Right) */}
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.7}>
        <mesh ref={sphereRef} position={[6.8, -2.8, -3.2]} scale={0.8}>
          <sphereGeometry args={[1.1, 32, 32]} />
          <meshPhysicalMaterial
            color="#fbbf24"
            emissive="#f59e0b"
            emissiveIntensity={0.3}
            roughness={0.15}
            metalness={0.2}
            transmission={0.8}
            clearcoat={1.0}
            transparent
            opacity={0.75}
          />
        </mesh>
      </Float>
    </group>
  );
};

// ==============================================================================
// 4. INTERACTIVE PARALLAX & DYNAMIC MULTI-COLOR LIGHTING
// ==============================================================================
const ParallaxAndColorfulLighting = () => {
  const lightRef = useRef();

  useFrame((state) => {
    const { pointer, camera } = state;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.6, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.45, 0.04);
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

          {/* 1. Multi-Color Particle Swarm (1200+ particles reacting to cursor) */}
          <ColorfulParticleSwarm />

          {/* 2. Multi-Color Gradient Wave Terrain */}
          <VibrantWaveMesh />

          {/* 3. Floating 3D Shapes (Torus Knot, Octahedron, Neon Rings, Amber Sphere) */}
          <VibrantFloatingShapes />

          {/* 4. Multi-Color Dynamic Lighting & Mouse Parallax */}
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
