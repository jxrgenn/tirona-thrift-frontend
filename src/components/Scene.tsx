import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { TorusKnot, Float, Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const CyberKnot = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <TorusKnot args={[1, 0.3, 128, 16]} ref={meshRef} scale={3}>
        <meshStandardMaterial
          color="#1a1a1a"
          emissive="#ccff00"
          emissiveIntensity={0.1}
          wireframe
          transparent
          opacity={0.3}
          roughness={0.1}
          metalness={1}
        />
      </TorusKnot>
    </Float>
  );
};

const Scene: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-10 w-full h-full opacity-60 pointer-events-none mix-blend-screen">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ccff00" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
        <CyberKnot />
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
};

export default Scene;