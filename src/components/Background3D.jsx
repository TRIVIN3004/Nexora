import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// ==============================================================================
// CONCEPT 4: Smooth Liquid Silk & Soft Aquatic Caustics (macOS / Raycast style)
// ==============================================================================
const LiquidSilkMesh = () => {
  const meshRef = useRef();
  const geomRef = useRef();

  // Grid dimensions
  const [cols, rows] = [54, 42];
  const width = 32;
  const height = 22;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (geomRef.current) {
      const pos = geomRef.current.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const u = pos.getX(i);
        const v = pos.getY(i);

        // Multi-frequency organic silk & fluid caustics equation
        const wave1 = Math.sin(u * 0.22 + t * 0.45) * 0.55;
        const wave2 = Math.cos(v * 0.28 + t * 0.38) * 0.45;
        const wave3 = Math.sin((u + v) * 0.18 + t * 0.6) * 0.3;
        const causticRipple = Math.sin(Math.sqrt(u * u + v * v) * 0.5 - t * 0.9) * 0.15;

        pos.setZ(i, wave1 + wave2 + wave3 + causticRipple);
      }
      pos.needsUpdate = true;
      geomRef.current.computeVertexNormals();
    }

    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(t * 0.08) * 0.04;
    }
  });

  return (
    <group position={[0, -2.2, -4.5]} rotation={[-Math.PI / 3.2, 0, 0]}>
      {/* 1. Translucent Silky Liquid Surface */}
      <mesh ref={meshRef}>
        <planeGeometry ref={geomRef} args={[width, height, cols, rows]} />
        <meshPhysicalMaterial
          color="#1e40af"
          emissive="#0284c7"
          emissiveIntensity={0.08}
          roughness={0.2}
          metalness={0.6}
          transmission={0.4}
          transparent
          opacity={0.16}
          side={THREE.DoubleSide}
          wireframe={false}
        />
      </mesh>

      {/* 2. Soft Caustic Wave Grid Overlay */}
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[width, height, 36, 28]} />
        <meshStandardMaterial
          color="#38bdf8"
          wireframe
          transparent
          opacity={0.07}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
};

// ==============================================================================
// CONCEPT 3: Architectural Topographic Elevation Contours (Arc / Stripe Press style)
// ==============================================================================
const TopographicElevationContours = () => {
  const groupRef = useRef();

  // Generate multi-tiered contour curves
  const contourLayers = useMemo(() => {
    const layers = [];
    const count = 7;
    for (let i = 0; i < count; i++) {
      const yOffset = (i - count / 2) * 1.1;
      const zOffset = -2.5 - i * 0.4;
      const points = [];
      const numPoints = 28;
      
      for (let j = 0; j <= numPoints; j++) {
        const x = ((j / numPoints) - 0.5) * 26;
        // Terrain elevation calculation with harmonic variation
        const elevation =
          Math.sin(x * 0.25 + i * 0.9) * 0.9 +
          Math.cos(x * 0.45 - i * 0.5) * 0.45;
        points.push(new THREE.Vector3(x, yOffset + elevation, zOffset));
      }
      
      const curve = new THREE.CatmullRomCurve3(points);
      layers.push({ curve, basePoints: points, yOffset, zOffset, index: i });
    }
    return layers;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.18) * 0.12;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {contourLayers.map((layer, idx) => (
        <group key={idx}>
          {/* Elevation Ribbon Tube */}
          <mesh>
            <tubeGeometry args={[layer.curve, 70, 0.022, 6, false]} />
            <meshStandardMaterial
              color={idx % 2 === 0 ? "#0ea5e9" : "#3b82f6"}
              emissive={idx % 2 === 0 ? "#0284c7" : "#1d4ed8"}
              emissiveIntensity={0.4}
              transparent
              opacity={0.32 - idx * 0.025}
              roughness={0.2}
            />
          </mesh>

          {/* Stepped Contour Dashes / Nodes */}
          {layer.basePoints.filter((_, pIdx) => pIdx % 4 === 0).map((pt, pIdx) => (
            <mesh key={pIdx} position={[pt.x, pt.y, pt.z]} scale={0.035}>
              <sphereGeometry args={[1, 8, 8]} />
              <meshBasicMaterial
                color="#38bdf8"
                transparent
                opacity={0.5}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
};

// ==============================================================================
// CONCEPT 1: Flowing 3D Streamlines & Bezier Curves (Stripe / Linear style)
// ==============================================================================
const FlowingStreamlines = () => {
  const streamRef1 = useRef();
  const streamRef2 = useRef();
  const streamRef3 = useRef();

  // Create elegant flowing S-curves and Bezier trajectories
  const curves = useMemo(() => {
    // Upper Swooping Streamline (Cyan to Electric Blue)
    const curve1 = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-14, 5, -4),
      new THREE.Vector3(-4, 8, -2),
      new THREE.Vector3(3, 1, -1),
      new THREE.Vector3(14, 4, -4)
    );

    // Cross-Cutting Diagonal Streamline (Cobalt to Sapphire)
    const curve2 = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-12, -4, -3),
      new THREE.Vector3(-3, -1, -1.5),
      new THREE.Vector3(4, 5, -2),
      new THREE.Vector3(13, 0, -3.5)
    );

    // Deep Horizon Ambient Flow (Violet-Blue)
    const curve3 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-15, -1, -5),
      new THREE.Vector3(-7, 2, -3.5),
      new THREE.Vector3(0, -2, -4),
      new THREE.Vector3(8, 2, -3.5),
      new THREE.Vector3(15, -1, -5),
    ]);

    return { curve1, curve2, curve3 };
  }, []);

  // Moving pulses along streamlines
  const pulseSphere1 = useRef();
  const pulseSphere2 = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Wave oscillation
    if (streamRef1.current) {
      streamRef1.current.position.y = Math.sin(t * 0.4) * 0.15;
    }
    if (streamRef2.current) {
      streamRef2.current.position.y = Math.cos(t * 0.35) * 0.18;
    }
    if (streamRef3.current) {
      streamRef3.current.position.y = Math.sin(t * 0.25) * 0.12;
    }

    // Traveling Energy Pulse 1
    if (pulseSphere1.current && curves.curve1) {
      const progress1 = (t * 0.18) % 1;
      const point1 = curves.curve1.getPointAt(progress1);
      pulseSphere1.current.position.copy(point1);
      pulseSphere1.current.position.y += Math.sin(t * 0.4) * 0.15;
    }

    // Traveling Energy Pulse 2
    if (pulseSphere2.current && curves.curve2) {
      const progress2 = (t * 0.14 + 0.4) % 1;
      const point2 = curves.curve2.getPointAt(progress2);
      pulseSphere2.current.position.copy(point2);
      pulseSphere2.current.position.y += Math.cos(t * 0.35) * 0.18;
    }
  });

  return (
    <group>
      {/* Streamline 1 */}
      <mesh ref={streamRef1}>
        <tubeGeometry args={[curves.curve1, 80, 0.038, 8, false]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Streamline 2 */}
      <mesh ref={streamRef2}>
        <tubeGeometry args={[curves.curve2, 80, 0.032, 8, false]} />
        <meshStandardMaterial
          color="#2563eb"
          emissive="#1d4ed8"
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* Streamline 3 */}
      <mesh ref={streamRef3}>
        <tubeGeometry args={[curves.curve3, 90, 0.024, 8, false]} />
        <meshStandardMaterial
          color="#6366f1"
          emissive="#4338ca"
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.7}
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Glowing Linear Energy Pulse 1 */}
      <mesh ref={pulseSphere1} scale={0.12}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#e0f2fe" transparent opacity={0.85} />
      </mesh>

      {/* Glowing Linear Energy Pulse 2 */}
      <mesh ref={pulseSphere2} scale={0.09}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#bae6fd" transparent opacity={0.75} />
      </mesh>
    </group>
  );
};

// ==============================================================================
// CONCEPT 2: Frosted Glass 3D Prisms & Optical Lenses (Apple Keynote / Spatial style)
// ==============================================================================
const FrostedGlassPrismsAndLenses = () => {
  const prismRef = useRef();
  const lensRef = useRef();
  const octaRef = useRef();
  const orbitRingRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Elegant precessing rotation
    if (prismRef.current) {
      prismRef.current.rotation.y = t * 0.14;
      prismRef.current.rotation.x = Math.sin(t * 0.12) * 0.25;
      prismRef.current.rotation.z = Math.cos(t * 0.1) * 0.15;
    }

    if (lensRef.current) {
      lensRef.current.rotation.y = -t * 0.16;
      lensRef.current.rotation.x = Math.PI / 6 + Math.sin(t * 0.15) * 0.2;
    }

    if (octaRef.current) {
      octaRef.current.rotation.y = t * 0.12;
      octaRef.current.rotation.z = -t * 0.1;
    }

    if (orbitRingRef.current) {
      orbitRingRef.current.rotation.x = t * 0.1;
      orbitRingRef.current.rotation.y = t * 0.15;
    }
  });

  return (
    <group>
      {/* 1. Optical Triangular Prism (Top Right) */}
      <Float speed={1.3} rotationIntensity={0.6} floatIntensity={0.8}>
        <group position={[6.5, 2.6, -2.5]}>
          <mesh ref={prismRef} scale={[0.85, 1.2, 0.85]}>
            <cylinderGeometry args={[0.9, 0.9, 1.8, 3, 1]} />
            <meshPhysicalMaterial
              color="#ffffff"
              roughness={0.12}
              metalness={0.05}
              transmission={0.92}
              thickness={1.4}
              ior={1.54}
              transparent
              opacity={0.8}
              reflectivity={0.9}
              clearcoat={1}
              clearcoatRoughness={0.1}
            />
          </mesh>
          {/* Internal Refractive Neon Core */}
          <mesh scale={0.35}>
            <octahedronGeometry args={[1, 0]} />
            <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.35} />
          </mesh>
        </group>
      </Float>

      {/* 2. Apple Keynote / Spatial Optical Biconvex Lens (Top Left) */}
      <Float speed={1.1} rotationIntensity={0.5} floatIntensity={0.7}>
        <group position={[-6.2, 1.8, -2.8]}>
          <mesh ref={lensRef} scale={[1.2, 1.2, 0.32]}>
            <sphereGeometry args={[1, 32, 16]} />
            <meshPhysicalMaterial
              color="#f0f9ff"
              roughness={0.08}
              metalness={0.1}
              transmission={0.96}
              thickness={1.8}
              ior={1.48}
              transparent
              opacity={0.75}
              clearcoat={1}
            />
          </mesh>
          {/* Subtle Chamfered Lens Rim */}
          <mesh scale={[1.25, 1.25, 0.05]}>
            <torusGeometry args={[1.0, 0.03, 16, 64]} />
            <meshStandardMaterial
              color="#0284c7"
              metalness={0.8}
              roughness={0.2}
              transparent
              opacity={0.6}
            />
          </mesh>
        </group>
      </Float>

      {/* 3. Frosted Spatial Chamfered Octahedron (Bottom Left) */}
      <Float speed={1.4} rotationIntensity={0.7} floatIntensity={0.9}>
        <group position={[-5.8, -2.8, -3.2]}>
          <mesh ref={octaRef} scale={0.95}>
            <octahedronGeometry args={[1.2, 0]} />
            <meshPhysicalMaterial
              color="#e0f2fe"
              roughness={0.2}
              metalness={0.1}
              transmission={0.88}
              thickness={1.2}
              ior={1.5}
              transparent
              opacity={0.7}
              wireframe={false}
            />
          </mesh>
          {/* Fine Geometric Skeleton */}
          <mesh scale={0.98}>
            <octahedronGeometry args={[1.2, 0]} />
            <meshStandardMaterial
              color="#2563eb"
              wireframe
              transparent
              opacity={0.3}
            />
          </mesh>
        </group>
      </Float>

      {/* 4. Frosted Glass Orbit Ring (Bottom Right) */}
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
        <group position={[5.8, -2.2, -3]}>
          <mesh ref={orbitRingRef} scale={0.85}>
            <torusGeometry args={[1.6, 0.04, 16, 80]} />
            <meshPhysicalMaterial
              color="#ffffff"
              roughness={0.1}
              metalness={0.2}
              transmission={0.9}
              thickness={0.8}
              ior={1.45}
              transparent
              opacity={0.65}
            />
          </mesh>
        </group>
      </Float>
    </group>
  );
};

// ==============================================================================
// Parallax Camera Controller (Smooth Interactive Depth)
// ==============================================================================
const SceneParallaxRig = () => {
  useFrame((state) => {
    const { pointer, camera } = state;
    // Smooth lerp mouse parallax
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.45, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.35, 0.04);
    camera.lookAt(0, 0, 0);
  });
  return null;
};

// ==============================================================================
// MAIN 3D UNIFIED BACKGROUND CANVAS
// ==============================================================================
export default function Background3D() {
  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-none opacity-85 overflow-hidden transition-opacity duration-700"
      style={{ willChange: 'transform' }}
    >
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 48 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        {/* Modern Studio & Optical Lighting */}
        <ambientLight intensity={0.95} />
        
        {/* Key Directional Sunlight for Refraction & Caustics */}
        <directionalLight
          position={[8, 12, 6]}
          intensity={1.4}
          color="#ffffff"
        />
        
        {/* Soft Aquatic Cyan Rim Light */}
        <pointLight
          position={[-10, 6, 3]}
          color="#38bdf8"
          intensity={1.8}
          distance={25}
        />
        
        {/* Deep Tech Indigo Fill Light */}
        <pointLight
          position={[10, -8, 4]}
          color="#4338ca"
          intensity={1.5}
          distance={25}
        />
        
        {/* Foreground Prism Specular Light */}
        <pointLight
          position={[0, 4, 5]}
          color="#e0f2fe"
          intensity={0.9}
          distance={15}
        />

        {/* 1. CONCEPT 4: Smooth Liquid Silk & Soft Aquatic Caustics */}
        <LiquidSilkMesh />

        {/* 2. CONCEPT 3: Architectural Topographic Elevation Contours */}
        <TopographicElevationContours />

        {/* 3. CONCEPT 1: Flowing 3D Streamlines & Bezier Curves */}
        <FlowingStreamlines />

        {/* 4. CONCEPT 2: Frosted Glass 3D Prisms & Optical Lenses */}
        <FrostedGlassPrismsAndLenses />

        {/* Interactive Mouse Parallax */}
        <SceneParallaxRig />
      </Canvas>
    </div>
  );
}
