import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

// Smooth, organic 3D wave plane (Clean blue, silky undulating surface)
const SubtleWaveMesh = () => {
  const geomRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (geomRef.current) {
      const pos = geomRef.current.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        // Gentle, natural water/cloth wave equation
        const z =
          Math.sin(x * 0.3 + time * 0.5) * 0.45 +
          Math.cos(y * 0.25 + time * 0.4) * 0.35;
        pos.setZ(i, z);
      }
      pos.needsUpdate = true;
      geomRef.current.computeVertexNormals();
    }
  });

  return (
    <mesh position={[0, -1.5, -4]} rotation={[-Math.PI / 3.4, 0, 0]}>
      <planeGeometry ref={geomRef} args={[28, 20, 44, 44]} />
      <meshStandardMaterial
        color="#3b82f6"
        wireframe={true}
        transparent
        opacity={0.12}
        roughness={0.3}
        metalness={0.7}
      />
    </mesh>
  );
};

// Sleek, minimal floating geometric objects (Apple / Stripe style)
const FloatingGeometry = () => {
  const torusRef = useRef();
  const ringRef = useRef();
  const icosaRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (torusRef.current) {
      torusRef.current.rotation.y = t * 0.12;
      torusRef.current.rotation.x = Math.sin(t * 0.15) * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.15;
      ringRef.current.rotation.y = t * 0.18;
    }
    if (icosaRef.current) {
      icosaRef.current.rotation.y = -t * 0.14;
      icosaRef.current.rotation.z = t * 0.1;
    }
  });

  return (
    <>
      {/* Sleek Torus on top-right */}
      <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh ref={torusRef} position={[6.2, 2.5, -3]} scale={0.75}>
          <torusGeometry args={[1.3, 0.22, 20, 60]} />
          <meshStandardMaterial
            color="#2563eb"
            roughness={0.1}
            metalness={0.8}
            wireframe={true}
            transparent
            opacity={0.22}
          />
        </mesh>
      </Float>

      {/* Floating Fine Ring on left */}
      <Float speed={1} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh ref={ringRef} position={[-6, 1, -3.5]}>
          <torusGeometry args={[1.8, 0.03, 16, 70]} />
          <meshStandardMaterial
            color="#0ea5e9"
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={0.35}
          />
        </mesh>
      </Float>

      {/* Minimal Icosahedron on bottom-left */}
      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={0.9}>
        <mesh ref={icosaRef} position={[-5.5, -3, -3]} scale={0.9}>
          <icosahedronGeometry args={[1.1, 0]} />
          <meshStandardMaterial
            color="#1d4ed8"
            roughness={0.2}
            metalness={0.8}
            wireframe={true}
            transparent
            opacity={0.2}
          />
        </mesh>
      </Float>
    </>
  );
};

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-80 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
        {/* Soft, clean tech lighting */}
        <ambientLight intensity={0.9} />
        <directionalLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-8, 6, 4]} color="#38bdf8" intensity={1.2} />
        <pointLight position={[8, -6, 4]} color="#3b82f6" intensity={1} />

        {/* 1. Organic 3D Wave */}
        <SubtleWaveMesh />

        {/* 2. Sleek Floating Geometry */}
        <FloatingGeometry />
      </Canvas>
    </div>
  );
}
