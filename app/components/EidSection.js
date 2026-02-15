'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { useCheckout } from '../context/CheckoutContext';
import ImageLightbox from './ImageLightbox';

const eidProducts = [
  { id: 1, image: '/images/eid/eid1.jpg', title: 'Premium Silk Collection', price: '৳12,999' },
  { id: 2, image: '/images/eid/eid2.jpg', title: 'Designer Embroidery', price: '৳15,999' },
  { id: 3, image: '/images/eid/eid3.jpg', title: 'Luxury Festive Wear', price: '৳18,999' }
];

export default function EidSection() {
  const { openCheckout } = useCheckout();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <section className="py-12 md:py-20 px-6 md:px-12 lg:px-24 bg-white">
      <ScrollReveal>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-sans tracking-widest text-[#E0115F] mb-2">SPECIAL COLLECTION</p>
            <h2 className="text-4xl md:text-5xl font-serif text-[#2C2C2C] mb-3">
              EID Collection 2026
            </h2>
            <p className="text-base text-[#2C2C2C] opacity-70 font-sans">
              Celebrate in elegance with our exclusive EID designs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {eidProducts.map((product, index) => (
              <ScrollReveal key={product.id} delay={index * 0.2}>
                <motion.div
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
                        className="px-6 py-3 bg-[#E0115F] text-white font-sans font-medium shadow-lg"
                      >
                        Shop Now
                      </motion.button>
                    </div>
                  </div>

                  <h3 className="text-lg font-serif text-[#2C2C2C] mb-1 group-hover:text-[#E0115F] transition-colors mt-3">
                    {product.title}
                  </h3>
                  <p className="text-base font-sans font-medium text-[#E0115F]">
                    {product.price}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </ScrollReveal>

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
