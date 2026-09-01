import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line } from '@react-three/drei';
import * as THREE from 'three';

function NeuralNode({ position, color }: { position: [number,number,number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null!);
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);
  useFrame((s) => {
    const pulse = 0.8 + Math.sin(s.clock.elapsedTime * 1.5 + phase) * 0.4;
    (ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse;
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.1, 12, 12]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
    </mesh>
  );
}

function NeuralBrain() {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.15;
  });

  const layers = [
    { y: -1.5, nodes: 3, color: '#fbbf24' },
    { y: -0.75, nodes: 5, color: '#f59e0b' },
    { y: 0, nodes: 6, color: '#fbbf24' },
    { y: 0.75, nodes: 5, color: '#f59e0b' },
    { y: 1.5, nodes: 3, color: '#fde68a' },
  ];

  const allNodes = useMemo(() => {
    return layers.map(({ y, nodes }) =>
      Array.from({ length: nodes }, (_, i) => ({
        x: (i - (nodes - 1) / 2) * 0.5,
        y,
      }))
    );
  }, []);

  // Generate connection lines between adjacent layers
  const connections = useMemo(() => {
    const lines: [[number,number,number], [number,number,number]][] = [];
    for (let l = 0; l < allNodes.length - 1; l++) {
      for (const f of allNodes[l]) {
        for (const t of allNodes[l + 1]) {
          if (Math.random() > 0.3) {
            lines.push([[f.x, f.y, 0], [t.x, t.y, 0]]);
          }
        }
      }
    }
    return lines;
  }, []);

  return (
    <group ref={ref}>
      {connections.map((pts, i) => (
        <Line
          key={i}
          points={pts}
          color="#fbbf24"
          lineWidth={0.3}
          transparent
          opacity={0.15}
        />
      ))}
      {allNodes.map((layer, li) =>
        layer.map((n, ni) => (
          <NeuralNode
            key={`${li}-${ni}`}
            position={[n.x, n.y, 0]}
            color={layers[li].color}
          />
        ))
      )}
      {/* Surrounding aura */}
      <mesh>
        <sphereGeometry args={[2.0, 20, 20]} />
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.02} wireframe transparent opacity={0.1} />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.3, 0.01, 8, 80]} />
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.5} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

export default function AIVisual() {
  return (
    <Canvas camera={{ position: [0, 0, 5.5], fov: 50 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.08} />
      <pointLight position={[3, 2, 3]} intensity={2} color="#fbbf24" />
      <pointLight position={[-2, -2, -1]} intensity={1} color="#f59e0b" />
      <Float speed={1.3} rotationIntensity={0.1} floatIntensity={0.3}>
        <NeuralBrain />
      </Float>
    </Canvas>
  );
}
