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

const eidProducts = [
  { id: 1, image: '/images/eid/eid1.jpg', title: 'Premium Silk Collection', price: '৳12,999' },
  { id: 2, image: '/images/eid/eid2.jpg', title: 'Designer Embroidery', price: '৳15,999' },
  { id: 3, image: '/images/eid/eid3.jpg', title: 'Luxury Festive Wear', price: '৳18,999' }
];

export default function EidSection() {
  const { openCheckout } = useCheckout();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
          <motion.p 
            variants={headerItemVariants}
            className="text-sm font-sans tracking-widest text-[#C5A059] mb-3 uppercase font-medium"
          >
            SPECIAL COLLECTION
          </motion.p>
          <motion.h2 
            variants={headerItemVariants}
            className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-4"
          >
            EID Collection 2026
          </motion.h2>
          <motion.p 
            variants={headerItemVariants}
            className="text-base text-[#8A8A8A] font-sans"
          >
            Celebrate in elegance with our exclusive EID designs
          </motion.p>
        </motion.div>

        <motion.div 
          ref={gridRef}
          variants={staggerContainer}
          initial="hidden"
          animate={isGridInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {eidProducts.map((product, index) => (
            <motion.div
              key={product.id}
              variants={gridItemVariants}
              whileHover={{ y: -10 }}
              className="group cursor-pointer flex flex-col h-full"
            >
                  <div className="relative aspect-[2/3] overflow-hidden flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-contain p-2"
                      style={{ objectPosition: 'center' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                    />
                    
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    
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
                        className="px-6 py-3 bg-[#C5A059] text-white font-sans font-medium uppercase tracking-wider shadow-lg hover:bg-[#B8935A] transition-colors"
                      >
                        Shop Now
                      </motion.button>
                    </div>
                  </div>

                  <h3 className="text-lg font-serif text-[#1A1A1A] mb-1 group-hover:text-[#C5A059] transition-colors mt-3">
                    {product.title}
                  </h3>
                  <p className="text-base font-sans font-medium text-[#C5A059]">
                    {product.price}
                  </p>
                </motion.div>
            ))}
          </motion.div>
        </div>

      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={eidProducts}
        currentIndex={currentImageIndex}
        onNavigate={setCurrentImageIndex}
        title="EID Collection"
      />
    </section>
  );
}
