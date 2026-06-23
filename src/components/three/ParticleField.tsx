"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const ROSE_GOLD = new THREE.Color("#E8C56A");
const CHAMPAGNE = new THREE.Color("#D4AF37");

/** Floating golden dust particles that drift and react to the pointer. */
function Particles({ count = 320 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
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

export default function ParticleField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 55 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.8} />
      <pointLight position={[6, 6, 6]} intensity={1.2} color="#D4AF37" />
      <pointLight position={[-6, -4, 4]} intensity={0.8} color="#E8C56A" />
      <Particles />
    </Canvas>
  );
}
