import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Box, Grid, OrbitControls, Environment, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

function ARCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5 + 1;
    }
  });

  return (
    <group>
      <Grid position={[0, -1, 0]} args={[10, 10]} cellSize={0.5} cellThickness={0.5} cellColor="#f472b6" sectionSize={2.5} sectionThickness={1} sectionColor="#db2777" fadeDistance={10} fadeStrength={1} />
      <Float speed={2} rotationIntensity={0} floatIntensity={0}>
        <Icosahedron ref={meshRef} args={[1, 0]}>
          <meshStandardMaterial color="#ec4899" emissive="#be185d" emissiveIntensity={0.8} wireframe />
        </Icosahedron>
        <Box args={[0.5, 0.5, 0.5]} position={[1.5, 0, 1.5]}>
          <meshStandardMaterial color="#fbcfe8" transparent opacity={0.6} />
        </Box>
      </Float>
    </group>
  );
}

export default function ARVisual() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [4, 3, 5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ec4899" />
        <ARCore />
        <Environment preset="city" />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
