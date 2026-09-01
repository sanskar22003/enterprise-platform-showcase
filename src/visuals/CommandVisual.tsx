import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function RadarSweep() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    ref.current.rotation.z = -state.clock.elapsedTime * 0.8;
  });
  return (
    <mesh ref={ref} position={[0, 0, 0.01]}>
      <coneGeometry args={[1.5, 0.01, 32, 1, true, 0, Math.PI * 0.3]} />
      <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.8} transparent opacity={0.25} side={THREE.DoubleSide} />
    </mesh>
  );
}

function PingBlip({ position, phase }: { position: [number,number,number]; phase: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const s = 0.5 + Math.sin(state.clock.elapsedTime * 2 + phase) * 0.5;
    ref.current.scale.setScalar(Math.max(0.1, s));
    (ref.current.material as THREE.MeshStandardMaterial).opacity = s * 0.8;
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.06, 6, 6]} />
      <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={2} transparent opacity={0.8} />
    </mesh>
  );
}

function CommandDashboard() {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.2;
  });

  const pingPoints = useMemo(() => {
    return Array.from({ length: 8 }, () => ({
      x: (Math.random() - 0.5) * 2.5,
      y: (Math.random() - 0.5) * 2.5,
      phase: Math.random() * Math.PI * 2,
    }));
  }, []);

  return (
    <group ref={ref}>
      {/* Radar circles */}
      {[0.6, 1.0, 1.4, 1.8].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[r, 0.008, 8, 60]} />
          <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.4} transparent opacity={0.4 - i * 0.07} />
        </mesh>
      ))}
      {/* Cross hairs */}
      <mesh>
        <boxGeometry args={[3.6, 0.008, 0.008]} />
        <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.5} transparent opacity={0.3} />
      </mesh>
      <mesh>
        <boxGeometry args={[0.008, 3.6, 0.008]} />
        <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.5} transparent opacity={0.3} />
      </mesh>
      <RadarSweep />
      {/* Ping blips */}
      {pingPoints.map((p, i) => (
        <PingBlip key={i} position={[p.x, 0, p.y]} phase={p.phase} />
      ))}
      {/* Floating data panels */}
      {([-2, 2, 0] as number[]).map((x, i) => (
        <mesh key={`panel-${i}`} position={[x, i === 2 ? 1.2 : i === 0 ? 0.5 : -0.3, i === 2 ? 1 : i === 0 ? 0.5 : -0.5]}>
          <planeGeometry args={[0.6, 0.3, 4, 2]} />
          <meshStandardMaterial color="#1e3a5f" emissive="#60a5fa" emissiveIntensity={0.1} wireframe transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

export default function CommandVisual() {
  return (
    <Canvas camera={{ position: [0, 3, 5], fov: 50 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.08} />
      <pointLight position={[3, 3, 2]} intensity={2} color="#60a5fa" />
      <pointLight position={[-3, -2, -2]} intensity={1} color="#3b82f6" />
      <Float speed={0.7} rotationIntensity={0.08} floatIntensity={0.2}>
        <CommandDashboard />
      </Float>
    </Canvas>
  );
}
