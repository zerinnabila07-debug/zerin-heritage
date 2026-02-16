'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Eye } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useCheckout } from '../context/CheckoutContext';
import { 
  staggerContainer, 
  gridItemVariants, 
  headerVariants, 
  headerItemVariants,
  viewportOptions 
} from '../utils/animations';

const collections = [
  {
    id: 1,
    title: 'Bridal Wear',
    price: '৳18,999',
    tag: 'Exclusive',
    image: '/images/collections/c1.jpg'
  },
  {
    id: 2,
    title: 'Heritage Saree',
    price: '৳12,999',
    tag: 'New Arrival',
    image: '/images/collections/c2.jpg'
  },
  {
    id: 3,
    title: 'Modern Chic',
    price: '৳9,999',
    tag: 'Trending',
    image: '/images/collections/c3.jpg'
  },
  {
    id: 4,
    title: 'Festive Collection',
    price: '৳14,999',
    tag: 'Sale',
    image: '/images/collections/c1.jpg'
  }
];

export default function CollectionGrid() {
  const { openCheckout } = useCheckout();
  const [hoveredId, setHoveredId] = useState(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const isHeaderInView = useInView(headerRef, viewportOptions);
  const isGridInView = useInView(gridRef, viewportOptions);

  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          ref={headerRef}
          variants={headerVariants}
          initial="hidden"
          animate={isHeaderInView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <motion.h2 
            variants={headerItemVariants}
            className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-4"
          >
            Featured Collections
          </motion.h2>
          <motion.p 
            variants={headerItemVariants}
            className="text-base text-[#8A8A8A] font-sans"
          >
            Discover our curated selection of timeless pieces
          </motion.p>
        </motion.div>

        <motion.div 
          ref={gridRef}
          variants={staggerContainer}
          initial="hidden"
          animate={isGridInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {collections.map((collection) => (
            <motion.div
              key={collection.id}
              variants={gridItemVariants}
              onMouseEnter={() => setHoveredId(collection.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group"
            >
              <div className="relative aspect-[3/4] mb-3 overflow-hidden bg-gray-50">
                <motion.div
                  animate={{ scale: hoveredId === collection.id ? 1.08 : 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="w-full h-full"
                >
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </motion.div>

                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 bg-white/95 backdrop-blur-sm text-[#1A1A1A] text-[10px] font-sans font-medium uppercase tracking-wider shadow-sm">
                    {collection.tag}
                  </span>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredId === collection.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-black/20"
                />

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: hoveredId === collection.id ? 1 : 0,
                    y: hoveredId === collection.id ? 0 : 10
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <button
                    onClick={() => openCheckout({ title: collection.title, price: collection.price })}
                    className="px-6 py-2.5 bg-white text-[#1A1A1A] font-sans font-medium text-sm uppercase tracking-wider shadow-lg hover:bg-[#1A1A1A] hover:text-white transition-all duration-300 flex items-center gap-2"
                  >
                    <Eye size={16} strokeWidth={2} />
                    Quick View
                  </button>
                </motion.div>
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-sans font-semibold text-[#1A1A1A] leading-tight">
                  {collection.title}
                </h3>
                <p className="text-base font-sans font-medium text-[#D10056]">
                  {collection.price}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
