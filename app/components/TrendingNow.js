'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Eye, Expand } from 'lucide-react';
import { useCheckout } from '../context/CheckoutContext';
import ImageLightbox from './ImageLightbox';
import { 
  staggerContainer, 
  gridItemVariants, 
  headerVariants, 
  headerItemVariants,
  viewportOptions 
} from '../utils/animations';

const trendingItems = [
  { id: 1, name: 'Embroidered Kurti', price: '৳3,999', tag: 'New Arrival', image: '/images/lookbook/l1.jpg' },
  { id: 2, name: 'Silk Saree', price: '৳8,999', tag: 'Bestseller', image: '/images/lookbook/l2.jpg' },
  { id: 3, name: 'Designer Tunic', price: '৳4,499', tag: 'Sale', image: '/images/lookbook/l3.jpg' },
  { id: 4, name: 'Ethnic Set', price: '৳5,999', tag: 'New Arrival', image: '/images/lookbook/l1.jpg' }
];

export default function TrendingNow() {
  const { openCheckout } = useCheckout();
  const [hoveredId, setHoveredId] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const isHeaderInView = useInView(headerRef, viewportOptions);
  const isGridInView = useInView(gridRef, viewportOptions);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const lightboxImages = trendingItems.map(item => ({
    image: item.image,
    title: item.name
  }));
  
  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-[#FFF9F5] to-white">
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
            WHAT'S HOT
          </motion.p>
          <motion.h2
            variants={headerItemVariants}
            className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-4"
          >
            Trending Now
          </motion.h2>
          <motion.p
            variants={headerItemVariants}
            className="text-base text-[#8A8A8A] font-sans"
          >
            Shop the most popular styles of the season
          </motion.p>
        </motion.div>

          <motion.div 
            ref={gridRef}
            variants={staggerContainer}
            initial="hidden"
            animate={isGridInView ? "visible" : "hidden"}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {trendingItems.map((item) => (
              <motion.div
                key={item.id}
                variants={gridItemVariants}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group flex flex-col h-full"
              >
                <div className="relative aspect-[2/3] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 cursor-pointer flex items-center justify-center">
                  <div 
                    className="w-full h-full"
                    onClick={() => handleImageClick(trendingItems.indexOf(item))}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-2"
                      style={{ objectPosition: 'center' }}
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>

                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 bg-white/95 backdrop-blur-sm text-[#1A1A1A] text-[10px] font-sans font-medium uppercase tracking-wider shadow-sm">
                      {item.tag}
                    </span>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredId === item.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-black/20"
                  />

                  {/* Full View Icon */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: hoveredId === item.id ? 1 : 0,
                      scale: hoveredId === item.id ? 1 : 0.8
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-3 right-3 z-10"
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageClick(trendingItems.indexOf(item));
                      }}
                      className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                    >
                      <Expand size={18} className="text-[#1A1A1A]" />
                    </button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: hoveredId === item.id ? 1 : 0,
                      y: hoveredId === item.id ? 0 : 10
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <button
                      onClick={() => openCheckout({ title: item.name, price: item.price })}
                      className="px-6 py-2.5 bg-white text-[#1A1A1A] font-sans font-medium text-sm uppercase tracking-wider shadow-lg hover:bg-[#1A1A1A] hover:text-white transition-all duration-300 flex items-center gap-2"
                    >
                      <Eye size={16} strokeWidth={2} />
                      Quick View
                    </button>
                  </motion.div>
                </div>

                <div className="space-y-1 mt-3">
                  <h3 className="text-base font-sans font-semibold text-[#1A1A1A] leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-base font-sans font-medium text-[#D10056]">
                    {item.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
            viewport={viewportOptions}
            className="text-center mt-12"
          >
            <Link href="/trending">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-4 border-2 border-[#C5A059] text-[#C5A059] font-sans font-medium text-lg uppercase tracking-wider hover:bg-[#C5A059] hover:text-white transition-all duration-300"
              >
                View All Trending
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Image Lightbox */}
        <ImageLightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          images={lightboxImages}
          currentIndex={currentImageIndex}
          onNavigate={setCurrentImageIndex}
        />
    </section>
  );
}
