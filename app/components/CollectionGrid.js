'use client';

import { useState } from 'react';
import Image from 'next/image';
import ScrollReveal from './ScrollReveal';
import { motion } from 'framer-motion';
import { useCheckout } from '../context/CheckoutContext';

const collections = [
  {
    id: 1,
    title: 'Bridal Wear',
    description: 'Exquisite designs for your special day',
    image: '/images/collections/c1.jpg'
  },
  {
    id: 2,
    title: 'Heritage Saree',
    description: 'Traditional elegance reimagined',
    image: '/images/collections/c2.jpg'
  },
  {
    id: 3,
    title: 'Modern Chic',
    description: 'Contemporary sophistication',
    image: '/images/collections/c3.jpg'
  }
];

export default function CollectionGrid() {
  const { openCheckout } = useCheckout();
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="py-12 md:py-20 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif text-[#2C2C2C] mb-3">
              Featured Collections
            </h2>
            <p className="text-base text-[#2C2C2C] opacity-70 font-sans">
              Discover our curated selection of timeless pieces
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <ScrollReveal key={collection.id} delay={index * 0.2}>
              <div
                className="group relative overflow-hidden cursor-pointer"
                onMouseEnter={() => setHoveredId(collection.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full"
                  >
                    <Image
                      src={collection.image}
                      alt={collection.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                    />
                  </motion.div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div className={`transform transition-all duration-500 ${
                    hoveredId === collection.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}>
                    <div className="w-12 h-0.5 bg-[#E0115F] mb-4"></div>
                  </div>
                  
                  <h3 className="text-3xl font-serif text-white mb-2">
                    {collection.title}
                  </h3>
                  <p className="text-white opacity-90 font-sans mb-4">
                    {collection.description}
                  </p>
                  
                  <button 
                    onClick={() => openCheckout({ title: collection.title })}
                    className="self-start px-6 py-2 bg-white text-[#2C2C2C] font-sans font-medium hover:bg-[#E0115F] hover:text-white transition-all duration-300"
                  >
                    Shop Now
                  </button>
                </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
