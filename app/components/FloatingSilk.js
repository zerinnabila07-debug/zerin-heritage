'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function FloatingSilk({ mousePosition }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      const targetRotationX = mousePosition.y * 0.3;
      const targetRotationY = mousePosition.x * 0.3;
      
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotationX,
        0.05
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotationY + state.clock.elapsedTime * 0.2,
        0.05
      );
      
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} scale={2.5}>
      <planeGeometry args={[2, 3, 32, 32]} />
      <MeshDistortMaterial
        color="#E0115F"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
