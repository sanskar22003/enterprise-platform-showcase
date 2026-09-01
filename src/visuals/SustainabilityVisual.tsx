import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function LeafParticle({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null!);
  const speed = useMemo(() => 0.3 + Math.random() * 0.5, []);
  useFrame((state) => {
    ref.current.rotation.x = state.clock.elapsedTime * speed;
    ref.current.rotation.z = state.clock.elapsedTime * speed * 0.7;
  });
  return (
    <mesh ref={ref} position={position}>
      <tetrahedronGeometry args={[0.08]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} />
    </mesh>
  );
}

function EcoSphere() {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.12;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
  });

  const nodes = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const phi = Math.acos(-1 + (2 * i) / 12);
      const theta = Math.sqrt(12 * Math.PI) * phi;
      return {
        x: 2 * Math.sin(phi) * Math.cos(theta),
        y: 2 * Math.cos(phi),
        z: 2 * Math.sin(phi) * Math.sin(theta),
      };
    });
  }, []);

  return (
    <group ref={ref}>
      {/* Central sphere with wireframe */}
      <mesh>
        <sphereGeometry args={[1.2, 16, 16]} />
        <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={0.05} wireframe transparent opacity={0.3} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.18, 32, 32]} />
        <meshStandardMaterial color="#052e16" transparent opacity={0.7} />
      </mesh>
      {/* Orbital rings */}
      {[0, Math.PI / 3, (2 * Math.PI) / 3].map((angle, i) => (
        <mesh key={i} rotation={[angle, angle * 0.5, 0]}>
          <torusGeometry args={[2.2 + i * 0.15, 0.012, 8, 80]} />
          <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={0.8} transparent opacity={0.5 - i * 0.1} />
        </mesh>
      ))}
      {/* Distributed nodes */}
      {nodes.map((n, i) => (
        <LeafParticle
          key={i}
          position={[n.x, n.y, n.z]}
          color={i % 3 === 0 ? '#34d399' : i % 3 === 1 ? '#6ee7b7' : '#10b981'}
        />
      ))}
      {/* CO2 reduction arc */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.6, 0.008, 8, 60, Math.PI * 1.5]} />
        <meshStandardMaterial color="#6ee7b7" emissive="#6ee7b7" emissiveIntensity={1} />
      </mesh>
    </group>
  );
}

function GreenParticles() {
  const ref = useRef<THREE.Points>(null!);
  const geometry = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((state) => {
    ref.current.rotation.y = -state.clock.elapsedTime * 0.03;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial color="#34d399" size={0.025} transparent opacity={0.5} />
    </points>
  );
}

export default function SustainabilityVisual() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.1} />
      <pointLight position={[3, 3, 3]} intensity={2} color="#34d399" />
      <pointLight position={[-3, -2, 2]} intensity={1} color="#10b981" />
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
        <EcoSphere />
      </Float>
      <GreenParticles />
    </Canvas>
  );
}
