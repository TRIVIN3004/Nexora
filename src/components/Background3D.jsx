import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// ==============================================================================
// 1. PRIMARY LUXURY LIQUID SILK RIBBON (macOS Sonoma / Raycast Fluid Curves)
// ==============================================================================
const LiquidSilkRibbon = ({ 
  curvePoints, 
  width = 1.8, 
  segments = 120, 
  primaryColor = "#2563eb",
  rimColor = "#ffffff",
  speed = 0.4,
  amplitude = 0.35,
  opacity = 0.75,
  transmission = 0.45,
  position = [0, 0, 0]
}) => {
  const meshRef = useRef();
  const geomRef = useRef();

  // Create baseline Catmull-Rom 3D Curve
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(curvePoints, false, 'catmullrom', 0.5);
  }, [curvePoints]);

  // Generate ribbon quad-strip geometry with variable twist and thickness
  const baseGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array((segments + 1) * 2 * 3);
    const uvs = new Float32Array((segments + 1) * 2 * 2);
    const indices = [];

    for (let i = 0; i <= segments; i++) {
      const u = i / segments;
      const pt = curve.getPointAt(u);
      const tangent = curve.getTangentAt(u);
      
      // Calculate normal and binormal for silk twisting
      const up = new THREE.Vector3(0, 1, 0);
      const normal = new THREE.Vector3().crossVectors(tangent, up).normalize();
      const binormal = new THREE.Vector3().crossVectors(tangent, normal).normalize();

      // Dynamic silk twist angle along curve
      const twistAngle = Math.sin(u * Math.PI * 2) * 0.85 + Math.cos(u * Math.PI) * 0.4;
      const offset = normal.clone().multiplyScalar(Math.cos(twistAngle) * (width * 0.5))
        .add(binormal.clone().multiplyScalar(Math.sin(twistAngle) * (width * 0.5)));

      // Top vertex
      positions[i * 6] = pt.x + offset.x;
      positions[i * 6 + 1] = pt.y + offset.y;
      positions[i * 6 + 2] = pt.z + offset.z;

      // Bottom vertex
      positions[i * 6 + 3] = pt.x - offset.x;
      positions[i * 6 + 4] = pt.y - offset.y;
      positions[i * 6 + 5] = pt.z - offset.z;

      // UV coordinates
      uvs[i * 4] = u;
      uvs[i * 4 + 1] = 1;
      uvs[i * 4 + 2] = u;
      uvs[i * 4 + 3] = 0;

      // Triangle indices
      if (i < segments) {
        const row1 = i * 2;
        const row2 = (i + 1) * 2;
        indices.push(row1, row1 + 1, row2);
        indices.push(row1 + 1, row2 + 1, row2);
      }
    }

    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    return geom;
  }, [curve, width, segments]);

  // Animate dynamic silk wave undulation
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    if (geomRef.current) {
      const pos = geomRef.current.attributes.position;
      const origPos = baseGeometry.attributes.position;
      
      for (let i = 0; i <= segments; i++) {
        const u = i / segments;
        const wave = Math.sin(u * 6 - t) * amplitude + Math.cos(u * 4 + t * 0.8) * (amplitude * 0.5);
        
        // Displace top and bottom vertices along wave
        pos.setY(i * 2, origPos.getY(i * 2) + wave);
        pos.setZ(i * 2, origPos.getZ(i * 2) + Math.sin(u * 5 + t * 0.7) * 0.2);

        pos.setY(i * 2 + 1, origPos.getY(i * 2 + 1) + wave);
        pos.setZ(i * 2 + 1, origPos.getZ(i * 2 + 1) + Math.sin(u * 5 + t * 0.7) * 0.2);
      }
      pos.needsUpdate = true;
      geomRef.current.computeVertexNormals();
    }

    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(t * 0.15) * 0.03;
    }
  });

  return (
    <group position={position}>
      {/* 1. Main Silk Body with Pearlescent Specular Sheen */}
      <mesh ref={meshRef}>
        <bufferGeometry ref={geomRef} {...baseGeometry} />
        <meshPhysicalMaterial
          color={primaryColor}
          emissive="#1e3a8a"
          emissiveIntensity={0.15}
          roughness={0.12}
          metalness={0.25}
          transmission={transmission}
          thickness={1.5}
          ior={1.46}
          transparent
          opacity={opacity}
          side={THREE.DoubleSide}
          clearcoat={1.0}
          clearcoatRoughness={0.08}
          reflectivity={0.9}
        />
      </mesh>

      {/* 2. Pearlescent Silk Ridge Edge (White / Silver Highlights) */}
      <mesh position={[0, 0.01, 0.01]}>
        <bufferGeometry {...baseGeometry} />
        <meshStandardMaterial
          color={rimColor}
          wireframe={true}
          transparent
          opacity={0.12}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
};

// ==============================================================================
// 2. SOFT AQUATIC CAUSTICS & LIGHT REFLECTIONS (Subtle Background Ripple)
// ==============================================================================
const AquaticCausticsMesh = () => {
  const geomRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (geomRef.current) {
      const pos = geomRef.current.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        
        // Multi-layered fluid caustic light equations
        const wave1 = Math.sin(x * 0.3 + t * 0.4) * Math.cos(y * 0.25 + t * 0.35) * 0.4;
        const wave2 = Math.sin((x + y) * 0.2 + t * 0.5) * 0.25;
        const causticRipples = Math.sin(Math.sqrt(x * x + y * y) * 0.45 - t * 0.7) * 0.15;
        
        pos.setZ(i, wave1 + wave2 + causticRipples);
      }
      pos.needsUpdate = true;
      geomRef.current.computeVertexNormals();
    }
  });

  return (
    <group position={[0, -1.8, -5]} rotation={[-Math.PI / 3.4, 0, 0]}>
      {/* Translucent Soft Aquatic Pool Surface */}
      <mesh>
        <planeGeometry ref={geomRef} args={[36, 24, 48, 36]} />
        <meshPhysicalMaterial
          color="#0f2744"
          emissive="#0284c7"
          emissiveIntensity={0.06}
          roughness={0.18}
          metalness={0.4}
          transmission={0.6}
          transparent
          opacity={0.18}
          side={THREE.DoubleSide}
          clearcoat={0.8}
        />
      </mesh>

      {/* Caustic Shimmer Light Wireframe */}
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[36, 24, 32, 24]} />
        <meshStandardMaterial
          color="#38bdf8"
          wireframe
          transparent
          opacity={0.06}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
};

// ==============================================================================
// 3. FLOATING AMBIENT CAUSTIC PARTICLES & LIGHT SPHERES
// ==============================================================================
const AmbientCausticGlows = () => {
  const orb1Ref = useRef();
  const orb2Ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (orb1Ref.current) {
      orb1Ref.current.position.x = -4 + Math.sin(t * 0.3) * 1.5;
      orb1Ref.current.position.y = 1.5 + Math.cos(t * 0.25) * 0.8;
    }
    if (orb2Ref.current) {
      orb2Ref.current.position.x = 5 + Math.cos(t * 0.28) * 1.8;
      orb2Ref.current.position.y = -1.2 + Math.sin(t * 0.32) * 0.9;
    }
  });

  return (
    <group>
      {/* Soft Cyan Ambient Light Orb */}
      <mesh ref={orb1Ref} position={[-4, 1.5, -3.5]} scale={1.2}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.06} />
      </mesh>

      {/* Soft Sapphire Ambient Light Orb */}
      <mesh ref={orb2Ref} position={[5, -1.2, -3.5]} scale={1.4}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#2563eb" transparent opacity={0.05} />
      </mesh>
    </group>
  );
};

// ==============================================================================
// 4. SMOOTH INTERACTIVE MOUSE PARALLAX RIG
// ==============================================================================
const ParallaxRig = () => {
  useFrame((state) => {
    const { pointer, camera } = state;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.4, 0.035);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.3, 0.035);
    camera.lookAt(0, 0, 0);
  });
  return null;
};

// ==============================================================================
// MAIN 3D LIQUID SILK & CAUSTICS BACKGROUND COMPONENT
// ==============================================================================
export default function Background3D() {
  // Primary Sweeping Foreground Silk Ribbon Points (S-Curve)
  const foregroundRibbonPoints = useMemo(() => [
    new THREE.Vector3(-15, -2.5, -2.5),
    new THREE.Vector3(-9, 1.2, -1.5),
    new THREE.Vector3(-3, -0.8, -1.0),
    new THREE.Vector3(3, 2.2, -1.5),
    new THREE.Vector3(9, -0.5, -2.0),
    new THREE.Vector3(15, 1.8, -3.0),
  ], []);

  // Secondary Background Silk Ribbon Points (Deep Horizon Flow)
  const backgroundRibbonPoints = useMemo(() => [
    new THREE.Vector3(-16, 2.5, -4.5),
    new THREE.Vector3(-8, -1.5, -3.8),
    new THREE.Vector3(0, 1.8, -3.5),
    new THREE.Vector3(8, -1.2, -4.0),
    new THREE.Vector3(16, 0.5, -4.8),
  ], []);

  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-none opacity-85 overflow-hidden transition-opacity duration-700"
      style={{ willChange: 'transform' }}
    >
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 46 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.75]}
      >
        {/* Soft Modern Studio Lighting */}
        <ambientLight intensity={0.9} />

        {/* Directional Key Sun Light for Pearlescent Sheen */}
        <directionalLight
          position={[10, 12, 8]}
          intensity={1.5}
          color="#ffffff"
        />

        {/* Soft Aquatic Cyan Rim Light */}
        <pointLight
          position={[-10, 6, 4]}
          color="#38bdf8"
          intensity={1.6}
          distance={25}
        />

        {/* Deep Sapphire Fill Light */}
        <pointLight
          position={[10, -8, 4]}
          color="#1e40af"
          intensity={1.4}
          distance={25}
        />

        {/* Foreground Pearl Specular Highlight */}
        <pointLight
          position={[0, 4, 5]}
          color="#f8fafc"
          intensity={0.8}
          distance={16}
        />

        {/* 1. Underlying Soft Aquatic Caustics Mesh */}
        <AquaticCausticsMesh />

        {/* 2. Secondary Background Silk Ribbon (Deep Horizon) */}
        <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.4}>
          <LiquidSilkRibbon
            curvePoints={backgroundRibbonPoints}
            width={2.4}
            segments={100}
            primaryColor="#1d4ed8"
            rimColor="#bae6fd"
            speed={0.28}
            amplitude={0.25}
            opacity={0.45}
            transmission={0.55}
            position={[0, 0.5, -1.0]}
          />
        </Float>

        {/* 3. Primary Foreground Liquid Silk Ribbon (Signature macOS / Raycast Style) */}
        <Float speed={1.0} rotationIntensity={0.25} floatIntensity={0.5}>
          <LiquidSilkRibbon
            curvePoints={foregroundRibbonPoints}
            width={2.8}
            segments={130}
            primaryColor="#2563eb"
            rimColor="#ffffff"
            speed={0.35}
            amplitude={0.38}
            opacity={0.78}
            transmission={0.38}
            position={[0, -0.2, 0]}
          />
        </Float>

        {/* 4. Ambient Caustic Glows */}
        <AmbientCausticGlows />

        {/* 5. Smooth Camera Parallax Interaction */}
        <ParallaxRig />
      </Canvas>
    </div>
  );
}
