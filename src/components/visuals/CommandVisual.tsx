import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Torus, Octahedron, OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

function CommandCore() {
  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = state.clock.elapsedTime * 0.5;
      outerRingRef.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = -state.clock.elapsedTime * 0.8;
      innerRingRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Torus ref={outerRingRef} args={[2, 0.05, 16, 100]}>
        <meshStandardMaterial color="#f43f5e" emissive="#e11d48" emissiveIntensity={0.8} />
      </Torus>
      <Torus ref={innerRingRef} args={[1.5, 0.05, 16, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#fb7185" emissive="#fda4af" emissiveIntensity={0.5} />
      </Torus>
      <Octahedron ref={coreRef} args={[0.8]} rotation={[0, 0, Math.PI / 4]}>
        <meshStandardMaterial color="#f43f5e" emissive="#be123c" emissiveIntensity={1} wireframe />
      </Octahedron>
    </Float>
  );
}

export default function CommandVisual() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 2, 6], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#f43f5e" />
        <CommandCore />
        <Environment preset="city" />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
