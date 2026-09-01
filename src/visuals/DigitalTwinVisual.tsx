import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function DataNode({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    ref.current.rotation.x = state.clock.elapsedTime * 0.5;
    ref.current.rotation.y = state.clock.elapsedTime * 0.3;
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <octahedronGeometry args={[0.12]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} wireframe />
    </mesh>
  );
}

function RigFrame() {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.1;
  });

  return (
    <group ref={ref}>
      {/* Main rig tower */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.15, 4, 8]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.3} wireframe />
      </mesh>
      {/* Platform base */}
      <mesh position={[0, -1.8, 0]}>
        <boxGeometry args={[2.5, 0.15, 2.5]} />
        <meshStandardMaterial color="#1e3a5f" emissive="#38bdf8" emissiveIntensity={0.1} wireframe />
      </mesh>
      {/* Support legs */}
      {([-1, 1] as number[]).flatMap(x =>
        ([-1, 1] as number[]).map(z => ({ x, z }))
      ).map(({ x, z }, i) => (
        <mesh key={i} position={[x, -1.1, z]}>
          <cylinderGeometry args={[0.04, 0.04, 1.4, 6]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.4} />
        </mesh>
      ))}
      {/* Data nodes */}
      <DataNode position={[0.8, 0.5, 0]} color="#38bdf8" />
      <DataNode position={[-0.6, -0.2, 0.8]} color="#7dd3fc" scale={0.7} />
      <DataNode position={[0.2, 1.2, -0.5]} color="#0ea5e9" scale={1.2} />
      <DataNode position={[-1, 0.3, -0.3]} color="#38bdf8" scale={0.5} />
      {/* Orbital ring */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.8, 0.015, 8, 80]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.6} transparent opacity={0.6} />
      </mesh>
      <mesh rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
        <torusGeometry args={[2.2, 0.01, 8, 80]} />
        <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.4} transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null!);
  const geometry = useMemo(() => {
    const count = 120;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.04;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial color="#38bdf8" size={0.03} transparent opacity={0.6} />
    </points>
  );
}

export default function DigitalTwinVisual() {
  return (
    <Canvas camera={{ position: [0, 1, 6], fov: 45 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.1} />
      <pointLight position={[3, 3, 3]} intensity={2} color="#38bdf8" />
      <pointLight position={[-3, -2, -2]} intensity={1} color="#0ea5e9" />
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        <RigFrame />
      </Float>
      <ParticleField />
    </Canvas>
  );
}
