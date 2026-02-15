'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { useState } from 'react';
import FloatingSilk from './FloatingSilk';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    setMousePosition({ x, y });
  };

  return (
    <section 
      className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-white to-[#FFF0F5]"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <spotLight position={[-10, -10, -5]} intensity={0.3} />
          <FloatingSilk mousePosition={mousePosition} />
          <Environment preset="studio" />
        </Canvas>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <h1 className="text-6xl md:text-8xl font-serif mb-6 text-[#2C2C2C] tracking-tight leading-tight">
          Zerin Heritage
        </h1>
        <p className="text-2xl md:text-3xl font-light mb-12 text-[#2C2C2C] opacity-90">
          Timeless Elegance
        </p>
        <button className="group relative px-12 py-4 bg-[#E0115F] text-white font-sans font-medium text-lg tracking-wide overflow-hidden transition-all duration-300 hover:bg-[#C00F54] hover:scale-105">
          <span className="relative z-10">View Collection</span>
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </button>
      </div>
    </section>
  );
}
