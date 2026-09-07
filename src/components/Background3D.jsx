import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// ==============================================================================
// 1. DUAL-LAYER 3D LUXURY SILK RIBBON (Sweeping Glass-Silk Wave)
// ==============================================================================
const LiquidSilkRibbonMesh = ({ isCore = false, position = [0, 0, 0] }) => {
  const geomRef = useRef();
  const meshRef = useRef();

  const segments = 160;
  const ribbonWidth = isCore ? 1.9 : 2.4;

  // Define 3D Catmull-Rom Trajectory (Sweeping S-curve with cresting loop)
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-16, -3.2, -1.8),
      new THREE.Vector3(-10, 1.8, -0.2),
      new THREE.Vector3(-3.5, -1.5, 0.8),
      new THREE.Vector3(2.5, 2.8, 0.4),
      new THREE.Vector3(8.5, -0.8, -0.6),
      new THREE.Vector3(16, 2.2, -2.0)
    ], false, 'catmullrom', 0.5);
  }, []);

  // Construct thick 3D lofted ribbon geometry
  const initialGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array((segments + 1) * 2 * 3);
    const normals = new Float32Array((segments + 1) * 2 * 3);
    const uvs = new Float32Array((segments + 1) * 2 * 2);
    const indices = [];

    for (let i = 0; i <= segments; i++) {
      const u = i / segments;
      const pt = curve.getPointAt(u);
      const tangent = curve.getTangentAt(u);

      // Normal and binormal orientation
      const up = new THREE.Vector3(0, 1, 0);
      const normal = new THREE.Vector3().crossVectors(tangent, up).normalize();
      const binormal = new THREE.Vector3().crossVectors(tangent, normal).normalize();

      // Dynamic twist angle along curve for natural liquid silk flow
      const twist = Math.sin(u * Math.PI * 2.2) * 1.1 + Math.cos(u * Math.PI) * 0.5;
      const w = ribbonWidth * (0.7 + Math.sin(u * Math.PI) * 0.5);

      const offset = normal.clone().multiplyScalar(Math.cos(twist) * (w * 0.5))
        .add(binormal.clone().multiplyScalar(Math.sin(twist) * (w * 0.5)));

      // Upper vertex
      positions[i * 6] = pt.x + offset.x;
      positions[i * 6 + 1] = pt.y + offset.y;
      positions[i * 6 + 2] = pt.z + offset.z + (isCore ? 0.05 : 0);

      // Lower vertex
      positions[i * 6 + 3] = pt.x - offset.x;
      positions[i * 6 + 4] = pt.y - offset.y;
      positions[i * 6 + 5] = pt.z - offset.z + (isCore ? 0.05 : 0);

      // UVs
      uvs[i * 4] = u;
      uvs[i * 4 + 1] = 1;
      uvs[i * 4 + 2] = u;
      uvs[i * 4 + 3] = 0;

      if (i < segments) {
        const a = i * 2;
        const b = (i + 1) * 2;
        indices.push(a, a + 1, b);
        indices.push(a + 1, b + 1, b);
      }
    }

    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
    geom.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    return geom;
  }, [curve, ribbonWidth, segments, isCore]);

  // Real-time undulating fluid wave motion
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.45;
    if (geomRef.current) {
      const pos = geomRef.current.attributes.position;
      const orig = initialGeometry.attributes.position;

      for (let i = 0; i <= segments; i++) {
        const u = i / segments;
        const waveY = Math.sin(u * 5 - t) * 0.32 + Math.cos(u * 3 + t * 0.7) * 0.18;
        const waveZ = Math.sin(u * 4 + t * 0.8) * 0.22;

        pos.setY(i * 2, orig.getY(i * 2) + waveY);
        pos.setZ(i * 2, orig.getZ(i * 2) + waveZ);

        pos.setY(i * 2 + 1, orig.getY(i * 2 + 1) + waveY);
        pos.setZ(i * 2 + 1, orig.getZ(i * 2 + 1) + waveZ);
      }
      pos.needsUpdate = true;
      geomRef.current.computeVertexNormals();
    }

    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(t * 0.2) * 0.02;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <bufferGeometry ref={geomRef} {...initialGeometry} />
        {isCore ? (
          // Inner Glowing Sapphire Liquid Core
          <meshPhysicalMaterial
            color="#2563eb"
            emissive="#1d4ed8"
            emissiveIntensity={0.35}
            roughness={0.08}
            metalness={0.4}
            transmission={0.5}
            thickness={1.8}
            ior={1.45}
            transparent
            opacity={0.85}
            side={THREE.DoubleSide}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
          />
        ) : (
          // Outer Frosted Glass-Silk Shell with Iridescent Pearl Specular
          <meshPhysicalMaterial
            color="#f8fafc"
            emissive="#38bdf8"
            emissiveIntensity={0.08}
            roughness={0.12}
            metalness={0.15}
            transmission={0.82}
            thickness={1.4}
            ior={1.5}
            transparent
            opacity={0.78}
            side={THREE.DoubleSide}
            clearcoat={1.0}
            clearcoatRoughness={0.08}
            reflectivity={0.95}
          />
        )}
      </mesh>
    </group>
  );
};

// ==============================================================================
// 2. SECONDARY HORIZON SILK STREAM (Atmospheric Depth Flow)
// ==============================================================================
const HorizonSilkStream = () => {
  const geomRef = useRef();

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-18, 3.5, -4.5),
      new THREE.Vector3(-9, -1.8, -3.8),
      new THREE.Vector3(0, 2.2, -3.2),
      new THREE.Vector3(9, -1.2, -4.0),
      new THREE.Vector3(18, 1.5, -4.8)
    ], false, 'catmullrom', 0.5);
  }, []);

  const segments = 100;
  const initialGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array((segments + 1) * 2 * 3);
    const indices = [];

    for (let i = 0; i <= segments; i++) {
      const u = i / segments;
      const pt = curve.getPointAt(u);
      const tangent = curve.getTangentAt(u);
      const up = new THREE.Vector3(0, 1, 0);
      const normal = new THREE.Vector3().crossVectors(tangent, up).normalize();
      const w = 2.8 * (0.6 + Math.sin(u * Math.PI) * 0.5);

      positions[i * 6] = pt.x + normal.x * (w * 0.5);
      positions[i * 6 + 1] = pt.y + normal.y * (w * 0.5);
      positions[i * 6 + 2] = pt.z;

      positions[i * 6 + 3] = pt.x - normal.x * (w * 0.5);
      positions[i * 6 + 4] = pt.y - normal.y * (w * 0.5);
      positions[i * 6 + 5] = pt.z;

      if (i < segments) {
        const a = i * 2;
        const b = (i + 1) * 2;
        indices.push(a, a + 1, b);
        indices.push(a + 1, b + 1, b);
      }
    }

    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    return geom;
  }, [curve, segments]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.35;
    if (geomRef.current) {
      const pos = geomRef.current.attributes.position;
      const orig = initialGeometry.attributes.position;
      for (let i = 0; i <= segments; i++) {
        const u = i / segments;
        const wave = Math.sin(u * 4 - t) * 0.25;
        pos.setY(i * 2, orig.getY(i * 2) + wave);
        pos.setY(i * 2 + 1, orig.getY(i * 2 + 1) + wave);
      }
      pos.needsUpdate = true;
      geomRef.current.computeVertexNormals();
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh>
        <bufferGeometry ref={geomRef} {...initialGeometry} />
        <meshPhysicalMaterial
          color="#0ea5e9"
          emissive="#1e40af"
          emissiveIntensity={0.12}
          roughness={0.2}
          metalness={0.2}
          transmission={0.7}
          thickness={1.2}
          transparent
          opacity={0.45}
          side={THREE.DoubleSide}
          clearcoat={0.9}
        />
      </mesh>
    </group>
  );
};

// ==============================================================================
// 3. SOFT AQUATIC CAUSTICS FLOOR (Dynamic Liquid Light Ripples)
// ==============================================================================
const AquaticCausticsFloor = () => {
  const geomRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (geomRef.current) {
      const pos = geomRef.current.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        // Harmonic aquatic caustics interference pattern
        const z =
          Math.sin(x * 0.28 + t * 0.4) * Math.cos(y * 0.22 + t * 0.35) * 0.4 +
          Math.sin((x + y) * 0.2 + t * 0.5) * 0.25 +
          Math.sin(Math.sqrt(x * x + y * y) * 0.45 - t * 0.7) * 0.15;
        pos.setZ(i, z);
      }
      pos.needsUpdate = true;
      geomRef.current.computeVertexNormals();
    }
  });

  return (
    <group position={[0, -2.2, -5.5]} rotation={[-Math.PI / 3.4, 0, 0]}>
      {/* Translucent Deep Liquid Bed */}
      <mesh>
        <planeGeometry ref={geomRef} args={[38, 26, 52, 40]} />
        <meshPhysicalMaterial
          color="#0b1a30"
          emissive="#0284c7"
          emissiveIntensity={0.06}
          roughness={0.15}
          metalness={0.3}
          transmission={0.7}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          clearcoat={1.0}
        />
      </mesh>
    </group>
  );
};

// ==============================================================================
// 4. INTERACTIVE 3D MOUSE LIGHT & PARALLAX RIG
// ==============================================================================
const InteractiveParallaxRig = () => {
  const lightRef = useRef();

  useFrame((state) => {
    const { pointer, camera } = state;
    // Smooth camera parallax
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.55, 0.035);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.4, 0.035);
    camera.lookAt(0, 0, 0);

    // Dynamic mouse point light to cast glints on the silk curves
    if (lightRef.current) {
      lightRef.current.position.x = pointer.x * 12;
      lightRef.current.position.y = pointer.y * 8 + 2;
    }
  });

  return (
    <pointLight
      ref={lightRef}
      position={[0, 3, 4]}
      color="#e0f2fe"
      intensity={1.2}
      distance={20}
    />
  );
};

// ==============================================================================
// MAIN 3D BACKGROUND COMPONENT
// ==============================================================================
export default function Background3D() {
  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none bg-gradient-to-b from-[#0b1329] via-[#0f172a] to-[#080d1a]"
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
        {/* Soft Ambient & Studio Key Lights */}
        <ambientLight intensity={0.9} />

        {/* Primary Sun Light for High-Gloss Specular Ribbons */}
        <directionalLight
          position={[10, 14, 8]}
          intensity={1.8}
          color="#ffffff"
        />

        {/* Soft Aquatic Cyan Rim Light */}
        <pointLight
          position={[-12, 6, 4]}
          color="#38bdf8"
          intensity={1.8}
          distance={28}
        />

        {/* Deep Sapphire Fill Light */}
        <pointLight
          position={[12, -8, 4]}
          color="#1e40af"
          intensity={1.5}
          distance={28}
        />

        {/* 1. Underlying Soft Aquatic Caustics Bed */}
        <AquaticCausticsFloor />

        {/* 2. Secondary Horizon Silk Stream (Deep Layer) */}
        <Float speed={0.9} rotationIntensity={0.2} floatIntensity={0.4}>
          <HorizonSilkStream />
        </Float>

        {/* 3. Primary Liquid Silk Ribbon - Outer Glass Shell */}
        <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.5}>
          <LiquidSilkRibbonMesh isCore={false} position={[0, -0.2, 0]} />
        </Float>

        {/* 4. Primary Liquid Silk Ribbon - Inner Sapphire Core */}
        <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.5}>
          <LiquidSilkRibbonMesh isCore={true} position={[0, -0.2, 0]} />
        </Float>

        {/* 5. Interactive Mouse Light & Camera Parallax */}
        <InteractiveParallaxRig />
      </Canvas>

      {/* Subtle Bottom Vignette for Clean Reading Hierarchy */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a]/70 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
