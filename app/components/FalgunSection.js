'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useCheckout } from '../context/CheckoutContext';
import ImageLightbox from './ImageLightbox';
import { 
  staggerContainer, 
  gridItemVariants, 
  headerVariants, 
  headerItemVariants,
  viewportOptions 
} from '../utils/animations';

const falgunProducts = [
  { id: 1, image: '/images/falgun/f1.jpg', title: 'Spring Blossom Saree', price: '৳8,999' },
  { id: 2, image: '/images/falgun/f2.jpg', title: 'Floral Kurti Set', price: '৳6,499' },
  { id: 3, image: '/images/falgun/f3.jpg', title: 'Valentine Special', price: '৳9,999' }
];

export default function FalgunSection() {
  const { openCheckout } = useCheckout();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const isHeaderInView = useInView(headerRef, viewportOptions);
  const isGridInView = useInView(gridRef, viewportOptions);

  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-white to-[#FFF9F5]">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          ref={headerRef}
          variants={headerVariants}
          initial="hidden"
          animate={isHeaderInView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <motion.p 
            variants={headerItemVariants}
            className="text-sm font-sans tracking-widest text-[#D10056] mb-3 uppercase font-medium"
          >
            SPRING COLLECTION
          </motion.p>
          <motion.h2 
            variants={headerItemVariants}
            className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-4"
          >
            Falgun & Valentine
          </motion.h2>
          <motion.p 
            variants={headerItemVariants}
            className="text-base text-[#8A8A8A] font-sans"
          >
            Embrace the season of love with vibrant colors and romantic designs
          </motion.p>
        </motion.div>

        <motion.div 
          ref={gridRef}
          variants={staggerContainer}
          initial="hidden"
          animate={isGridInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {falgunProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={gridItemVariants}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
                  <div className="relative aspect-[4/5] overflow-hidden mb-4">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="w-full h-full"
                    >
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                      />
                    </motion.div>
                    
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.button
                        onClick={() => {
                          setCurrentImageIndex(index);
                          setLightboxOpen(true);
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-white/90 text-[#2C2C2C] font-sans font-medium shadow-lg"
                      >
                        View Full
                      </motion.button>
                      <motion.button
                        onClick={() => openCheckout({ title: product.title, price: product.price })}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-[#D10056] text-white font-sans font-medium uppercase tracking-wider shadow-lg hover:bg-[#B8004A] transition-colors"
                      >
                        Shop Now
                      </motion.button>
                    </div>
                  </div>

                  <h3 className="text-lg font-serif text-[#1A1A1A] mb-1 group-hover:text-[#D10056] transition-colors mt-3">
                    {product.title}
                  </h3>
                  <p className="text-base font-sans font-medium text-[#D10056]">
                    {product.price}
                  </p>
                </motion.div>
            ))}
          </motion.div>
        </div>

      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={falgunProducts}
        currentIndex={currentImageIndex}
        onNavigate={setCurrentImageIndex}
        title="Falgun & Valentine Collection"
      />
    </section>
  );
}
