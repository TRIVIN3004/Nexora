import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// ==============================================================================
// 1. Minimalist Architectural Elevation Mesh (Clean, Subtle Slate-Steel Wave)
// ==============================================================================
const SubtleArchitecturalWave = () => {
  const geomRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (geomRef.current) {
      const pos = geomRef.current.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        // Very gentle, calm architectural undulation (low amplitude, slow breathing)
        const z =
          Math.sin(x * 0.22 + t * 0.35) * 0.35 +
          Math.cos(y * 0.2 + t * 0.28) * 0.25 +
          Math.sin((x + y) * 0.12 + t * 0.4) * 0.15;
        pos.setZ(i, z);
      }
      pos.needsUpdate = true;
      geomRef.current.computeVertexNormals();
    }
  });

  return (
    <group position={[0, -1.8, -4.5]} rotation={[-Math.PI / 3.2, 0, 0]}>
      {/* Crisp, fine wireframe grid in understated slate-blue */}
      <mesh>
        <planeGeometry ref={geomRef} args={[32, 22, 48, 38]} />
        <meshStandardMaterial
          color="#64748b"
          wireframe={true}
          transparent
          opacity={0.08}
          roughness={0.4}
          metalness={0.5}
        />
      </mesh>

      {/* Very faint translucent depth plane underneath */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[32, 22, 24, 20]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.02}
        />
      </mesh>
    </group>
  );
};

// ==============================================================================
// 2. Minimalist Floating Kinetics (Clear Frosted Glass & Titanium Orbitals)
// ==============================================================================
const MinimalFloatingElements = () => {
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const octaRef = useRef();
  const glassPillRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Slow, stately orbital rotation
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.08;
      ring1Ref.current.rotation.y = t * 0.1;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -t * 0.06;
      ring2Ref.current.rotation.z = t * 0.09;
    }
    if (octaRef.current) {
      octaRef.current.rotation.y = t * 0.09;
      octaRef.current.rotation.x = Math.sin(t * 0.1) * 0.2;
    }
    if (glassPillRef.current) {
      glassPillRef.current.rotation.y = -t * 0.07;
      glassPillRef.current.rotation.z = t * 0.05;
    }
  });

  return (
    <group>
      {/* Ultra-Fine Dual Titanium Orbital Rings (Top Right) */}
      <Float speed={1.1} rotationIntensity={0.3} floatIntensity={0.5}>
        <group position={[6.5, 2.4, -3]}>
          {/* Outer Ring */}
          <mesh ref={ring1Ref}>
            <torusGeometry args={[1.7, 0.015, 16, 90]} />
            <meshStandardMaterial
              color="#94a3b8"
              roughness={0.15}
              metalness={0.9}
              transparent
              opacity={0.25}
            />
          </mesh>
          {/* Inner Ring */}
          <mesh ref={ring2Ref} scale={0.72}>
            <torusGeometry args={[1.7, 0.012, 16, 90]} />
            <meshStandardMaterial
              color="#cbd5e1"
              roughness={0.1}
              metalness={0.95}
              transparent
              opacity={0.3}
            />
          </mesh>
        </group>
      </Float>

      {/* Clear Frosted Glass Optical Prism (Left Middle) */}
      <Float speed={1.0} rotationIntensity={0.4} floatIntensity={0.6}>
        <group position={[-6.2, 1.2, -3.2]}>
          <mesh ref={glassPillRef} scale={[0.9, 1.3, 0.9]}>
            <cylinderGeometry args={[0.8, 0.8, 1.4, 6]} />
            <meshPhysicalMaterial
              color="#ffffff"
              roughness={0.15}
              metalness={0.05}
              transmission={0.92}
              thickness={1.2}
              ior={1.48}
              transparent
              opacity={0.55}
              reflectivity={0.8}
              clearcoat={1}
            />
          </mesh>
          {/* Subtle Wireframe Inner Cage */}
          <mesh scale={0.92}>
            <cylinderGeometry args={[0.8, 0.8, 1.4, 6]} />
            <meshStandardMaterial
              color="#64748b"
              wireframe
              transparent
              opacity={0.12}
            />
          </mesh>
        </group>
      </Float>

      {/* Subtle Geometric Octahedron (Bottom Left) */}
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.7}>
        <mesh ref={octaRef} position={[-5.6, -2.8, -3.5]} scale={0.85}>
          <octahedronGeometry args={[1.1, 0]} />
          <meshStandardMaterial
            color="#475569"
            roughness={0.25}
            metalness={0.8}
            wireframe={true}
            transparent
            opacity={0.15}
          />
        </mesh>
      </Float>
    </group>
  );
};

// ==============================================================================
// 3. Smooth Camera Mouse Parallax
// ==============================================================================
const SubtleParallaxRig = () => {
  useFrame((state) => {
    const { pointer, camera } = state;
    // Ultra-smooth, gentle mouse parallax
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.35, 0.035);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.25, 0.035);
    camera.lookAt(0, 0, 0);
  });
  return null;
};

// ==============================================================================
// MAIN 3D MINIMALIST BACKGROUND
// ==============================================================================
export default function Background3D() {
  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-none opacity-90 overflow-hidden"
      style={{ willChange: 'transform' }}
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 48 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
      >
        {/* Clean, Natural Studio Lighting (Monochromatic & Pure) */}
        <ambientLight intensity={0.95} />
        
        {/* Soft Key Sunlight for crisp frosted glass highlights */}
        <directionalLight
          position={[10, 12, 8]}
          intensity={1.1}
          color="#ffffff"
        />

        {/* Subtle Slate-White Rim Light */}
        <pointLight
          position={[-8, 6, 4]}
          color="#f1f5f9"
          intensity={0.8}
          distance={20}
        />

        {/* Soft Cool-Gray Fill Light */}
        <pointLight
          position={[8, -6, 4]}
          color="#e2e8f0"
          intensity={0.7}
          distance={20}
        />

        {/* 1. Subtle Architectural Elevation Surface */}
        <SubtleArchitecturalWave />

        {/* 2. Minimalist Floating Kinetics */}
        <MinimalFloatingElements />

        {/* 3. Smooth Parallax Rig */}
        <SubtleParallaxRig />
      </Canvas>
    </div>
  );
}
