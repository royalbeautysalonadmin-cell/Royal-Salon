"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

const ROSE_GOLD = new THREE.Color("#E8C56A");
const CHAMPAGNE = new THREE.Color("#D4AF37");

/** Floating golden dust particles that drift and react to the pointer. */
function GoldDust({ count = 380 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 7;
      const c = Math.random() > 0.5 ? ROSE_GOLD : CHAMPAGNE;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.04;
    pointsRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    // subtle parallax toward the pointer
    const px = (state.pointer.x * viewport.width) / 14;
    const py = (state.pointer.y * viewport.height) / 14;
    pointsRef.current.position.x += (px - pointsRef.current.position.x) * 0.03;
    pointsRef.current.position.y += (py - pointsRef.current.position.y) * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Polished-gold material shared by the floating jewellery shapes. */
function GoldMaterial() {
  return (
    <meshStandardMaterial
      color="#D9AF3F"
      metalness={0.92}
      roughness={0.22}
      emissive="#6b4f12"
      emissiveIntensity={0.22}
    />
  );
}

/**
 * Slowly tumbling jewellery-like shapes — a ring, a faceted gem and a thin
 * band — placed toward the edges so they never sit behind the headline.
 */
function FloatingJewels() {
  return (
    <>
      <Float speed={1.4} rotationIntensity={0.9} floatIntensity={1.6}>
        <mesh position={[5.2, 1.6, -2.5]} rotation={[0.7, 0.4, 0.2]}>
          <torusGeometry args={[1.05, 0.16, 32, 96]} />
          <GoldMaterial />
        </mesh>
      </Float>

      <Float speed={1.1} rotationIntensity={1.4} floatIntensity={1.2}>
        <mesh position={[-5.4, -2.1, -1.6]}>
          <icosahedronGeometry args={[0.65, 0]} />
          <meshStandardMaterial
            color="#E8C56A"
            metalness={0.85}
            roughness={0.15}
            emissive="#7a5b16"
            emissiveIntensity={0.3}
            flatShading
          />
        </mesh>
      </Float>

      <Float speed={1.7} rotationIntensity={0.7} floatIntensity={2}>
        <mesh position={[-4.6, 2.7, -3.2]} rotation={[1.1, 0.2, 0.5]}>
          <torusGeometry args={[0.55, 0.07, 24, 72]} />
          <GoldMaterial />
        </mesh>
      </Float>

      <Float speed={0.9} rotationIntensity={1.1} floatIntensity={1.4}>
        <mesh position={[4.6, -2.4, -3.4]}>
          <octahedronGeometry args={[0.42, 0]} />
          <meshStandardMaterial
            color="#F0D488"
            metalness={0.8}
            roughness={0.18}
            emissive="#8a6a1c"
            emissiveIntensity={0.35}
            flatShading
          />
        </mesh>
      </Float>
    </>
  );
}

/**
 * Wraps the scene and eases it against pointer position and page scroll,
 * so the whole 3D layer parallaxes as the visitor scrolls out of the hero.
 */
function ScrollRig({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const g = groupRef.current;
    if (!g) return;
    const ease = Math.min(delta * 3, 1);
    const scroll =
      typeof window === "undefined"
        ? 0
        : Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1.2);

    g.position.y += (scroll * 2.4 - g.position.y) * ease;
    g.rotation.x += (scroll * 0.3 - g.rotation.x) * ease;
    g.rotation.y += (state.pointer.x * 0.18 - g.rotation.y) * ease * 0.6;
  });

  return <group ref={groupRef}>{children}</group>;
}

export default function ParticleField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 55 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.75} />
      <directionalLight position={[3, 5, 6]} intensity={1.1} color="#fff3d6" />
      <pointLight position={[6, 6, 6]} intensity={1.4} color="#D4AF37" />
      <pointLight position={[-6, -4, 4]} intensity={0.9} color="#E8C56A" />
      <ScrollRig>
        <GoldDust />
        <Sparkles
          count={120}
          scale={[15, 9, 6]}
          size={3.2}
          speed={0.35}
          color="#E8C56A"
          opacity={0.65}
        />
        <FloatingJewels />
      </ScrollRig>
    </Canvas>
  );
}
