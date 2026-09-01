import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line } from '@react-three/drei';
import * as THREE from 'three';

function NetworkNode({ position, color, size = 0.08 }: { position: [number,number,number]; color: string; size?: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);
  useFrame((s) => {
    const pulse = 1 + Math.sin(s.clock.elapsedTime * 2 + phase) * 0.3;
    ref.current.scale.setScalar(pulse);
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
    </mesh>
  );
}

function IoTMesh() {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.1;
  });

  const nodes: [number,number,number][] = [
    [0, 0, 0],
    [1.5, 0.8, 0.5],
    [-1.5, 0.8, -0.5],
    [0.8, -1.2, 0.8],
    [-0.8, -1.2, -0.8],
    [1.2, 0.2, -1.2],
    [-1.2, 0.2, 1.2],
    [0, 1.8, 0],
    [0, -1.8, 0],
  ];

  const connections: [number, number][] = [
    [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],
    [1,5],[1,7],[2,6],[2,7],[3,4],[5,6],
  ];

  return (
    <group ref={ref}>
      {connections.map(([a, b], i) => (
        <Line
          key={i}
          points={[nodes[a], nodes[b]]}
          color="#4ade80"
          lineWidth={0.5}
          transparent
          opacity={0.3}
        />
      ))}
      {nodes.map((pos, i) => (
        <NetworkNode
          key={i}
          position={pos}
          color={i === 0 ? '#4ade80' : i % 2 === 0 ? '#86efac' : '#22c55e'}
          size={i === 0 ? 0.18 : 0.08}
        />
      ))}
      {/* Surrounding hex grid */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <mesh key={`hex-${i}`} position={[Math.cos(i * Math.PI / 3) * 2.5, Math.sin(i * Math.PI / 3) * 0.5, Math.sin(i * Math.PI / 3) * 1.5]}>
          <cylinderGeometry args={[0.2, 0.2, 0.04, 6]} />
          <meshStandardMaterial color="#4ade80" emissive="#4ade80" emissiveIntensity={0.3} wireframe />
        </mesh>
      ))}
    </group>
  );
}

export default function IoTVisual() {
  return (
    <Canvas camera={{ position: [0, 0, 6.5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.08} />
      <pointLight position={[3, 2, 3]} intensity={2} color="#4ade80" />
      <pointLight position={[-2, -2, -2]} intensity={1} color="#22c55e" />
      <Float speed={0.8} rotationIntensity={0.12} floatIntensity={0.2}>
        <IoTMesh />
      </Float>
    </Canvas>
  );
}
