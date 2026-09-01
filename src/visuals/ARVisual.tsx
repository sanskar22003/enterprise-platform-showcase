import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function HoloGrid() {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.08;
  });

  const scanLines = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      y: -1.5 + i * 0.45,
      opacity: 0.2 + (i % 3) * 0.2,
    }));
  }, []);

  return (
    <group ref={ref}>
      {/* Holographic display panel */}
      <mesh rotation={[0, 0, 0]}>
        <planeGeometry args={[3, 2, 20, 12]} />
        <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={0.05} wireframe transparent opacity={0.4} />
      </mesh>
      {/* Scan lines */}
      {scanLines.map((line, i) => (
        <mesh key={i} position={[0, line.y, 0.02]}>
          <planeGeometry args={[3, 0.02]} />
          <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={2} transparent opacity={line.opacity} />
        </mesh>
      ))}
      {/* AR target reticle */}
      <mesh position={[0, 0, 0.1]}>
        <ringGeometry args={[0.5, 0.55, 32]} />
        <meshStandardMaterial color="#c4b5fd" emissive="#c4b5fd" emissiveIntensity={1.5} transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, 0, 0.1]} rotation={[0, 0, Math.PI / 4]}>
        <ringGeometry args={[0.7, 0.72, 4]} />
        <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={1} transparent opacity={0.5} />
      </mesh>
      {/* Corner brackets */}
      {[[-1.3, 0.9], [1.3, 0.9], [-1.3, -0.9], [1.3, -0.9]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.05]}>
          <boxGeometry args={[0.3, 0.04, 0.02]} />
          <meshStandardMaterial color="#c4b5fd" emissive="#c4b5fd" emissiveIntensity={2} />
        </mesh>
      ))}
    </group>
  );
}

function FloatingDataChip({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null!);
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);
  useFrame((state) => {
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + phase) * 0.2;
    ref.current.rotation.z = state.clock.elapsedTime * 0.5;
  });
  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[0.12, 0.05, 0.02]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} />
    </mesh>
  );
}

export default function ARVisual() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.05} />
      <pointLight position={[2, 2, 3]} intensity={2} color="#a78bfa" />
      <pointLight position={[-2, -1, 2]} intensity={1} color="#7c3aed" />
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
        <HoloGrid />
      </Float>
      {[
        { pos: [-1.8, 0.5, 0.5] as [number,number,number], color: '#a78bfa' },
        { pos: [1.8, -0.3, 0.3] as [number,number,number], color: '#c4b5fd' },
        { pos: [0.5, 1.5, 0.2] as [number,number,number], color: '#7c3aed' },
        { pos: [-0.8, -1.4, 0.4] as [number,number,number], color: '#a78bfa' },
      ].map((d, i) => (
        <FloatingDataChip key={i} position={d.pos} color={d.color} />
      ))}
    </Canvas>
  );
}
