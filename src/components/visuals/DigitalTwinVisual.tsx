import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Box, Edges, OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

function DigitalTwinGeometry() {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.05;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef}>
        <Box args={[2.5, 2.5, 2.5]}>
          <meshBasicMaterial color="#0284c7" transparent opacity={0.1} />
          <Edges color="#38bdf8" />
        </Box>
        <Box ref={innerRef} args={[1, 1, 1]} scale={1.5}>
          <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.5} wireframe />
        </Box>
      </group>
    </Float>
  );
}

export default function DigitalTwinVisual() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#38bdf8" />
        <DigitalTwinGeometry />
        <Environment preset="city" />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
    </div>
  );
}
