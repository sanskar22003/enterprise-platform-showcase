import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, OrbitControls, Environment, Line } from '@react-three/drei';
import * as THREE from 'three';

function IoTCore() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  const nodes = [
    [2, 0, 0], [-2, 0, 0], [0, 2, 0], [0, -2, 0], [0, 0, 2], [0, 0, -2],
    [1.5, 1.5, 0], [-1.5, -1.5, 0], [0, 1.5, 1.5]
  ];

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <Sphere args={[0.8, 32, 32]}>
        <meshStandardMaterial color="#8b5cf6" emissive="#7c3aed" emissiveIntensity={0.8} />
      </Sphere>
      
      <group ref={groupRef}>
        {nodes.map((pos, i) => (
          <group key={i}>
            <Line points={[[0, 0, 0], pos as [number, number, number]]} color="#c4b5fd" opacity={0.2} transparent />
            <Sphere position={pos as [number, number, number]} args={[0.15, 16, 16]}>
              <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={1} />
            </Sphere>
          </group>
        ))}
      </group>
    </Float>
  );
}

export default function IoTVisual() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
        <IoTCore />
        <Environment preset="city" />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
      </Canvas>
    </div>
  );
}
