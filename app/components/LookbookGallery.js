'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import ImageLightbox from './ImageLightbox';
import { 
  staggerContainer, 
  gridItemVariants, 
  headerVariants, 
  headerItemVariants,
  viewportOptions 
} from '../utils/animations';

const lookbookItems = [
  { id: 1, image: '/images/lookbook/l1.jpg', height: 'h-[400px]', title: 'Spring Collection' },
  { id: 2, image: '/images/lookbook/l2.jpg', height: 'h-[500px]', title: 'Evening Elegance' },
  { id: 3, image: '/images/lookbook/l3.jpg', height: 'h-[450px]', title: 'Bridal Dreams' },
  { id: 4, image: '/images/lookbook/l1.jpg', height: 'h-[550px]', title: 'Heritage Revival' },
  { id: 5, image: '/images/lookbook/l2.jpg', height: 'h-[400px]', title: 'Modern Grace' },
  { id: 6, image: '/images/lookbook/l3.jpg', height: 'h-[480px]', title: 'Timeless Beauty' }
];

export default function LookbookGallery() {
  const [hoveredId, setHoveredId] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const headerRef = useRef(null);
  const galleryRef = useRef(null);
  const isHeaderInView = useInView(headerRef, viewportOptions);
  const isGalleryInView = useInView(galleryRef, viewportOptions);

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
          <motion.h2 
            variants={headerItemVariants}
            className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-4"
          >
            Lookbook
          </motion.h2>
          <motion.p 
            variants={headerItemVariants}
            className="text-base text-[#8A8A8A] font-sans max-w-2xl mx-auto"
          >
            Explore our latest collection through the lens of high fashion
          </motion.p>
        </motion.div>

        <motion.div 
          ref={galleryRef}
          variants={staggerContainer}
          initial="hidden"
          animate={isGalleryInView ? "visible" : "hidden"}
          className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          {lookbookItems.map((item) => (
            <motion.div
              key={item.id}
              variants={gridItemVariants}
              className="break-inside-avoid relative group cursor-pointer"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className={`relative ${item.height} overflow-hidden`}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </motion.div>

                <div className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${
                  hoveredId === item.id ? 'opacity-100' : 'opacity-0'
                }`}></div>

                  <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                    hoveredId === item.id ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}>
                    <div className="text-center bg-white/95 px-8 py-6 backdrop-blur-sm rounded-lg">
                      <h3 className="text-2xl font-serif text-[#1A1A1A] mb-4">
                        {item.title}
                      </h3>
                      <button 
                        onClick={() => {
                          setCurrentImageIndex(index);
                          setLightboxOpen(true);
                        }}
                        className="px-6 py-2 bg-[#C5A059] text-white font-sans font-medium uppercase tracking-wider hover:bg-[#B8935A] transition-colors duration-300"
                      >
                        View Full Gallery
                      </button>
                    </div>
                  </div>

                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C5A059] to-[#D10056] transform origin-bottom transition-transform duration-500 ${
                    hoveredId === item.id ? 'scale-y-100' : 'scale-y-0'
                  }`}></div>
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
          <motion.button
            onClick={() => {
              setCurrentImageIndex(0);
              setLightboxOpen(true);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 border-2 border-[#C5A059] text-[#C5A059] font-sans font-medium text-lg uppercase tracking-wider hover:bg-[#C5A059] hover:text-white transition-all duration-300"
          >
            View Full Lookbook
          </motion.button>
        </motion.div>
      </div>

      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lookbookItems}
        currentIndex={currentImageIndex}
        onNavigate={setCurrentImageIndex}
        title="Lookbook Collection"
      />
    </section>
  );
}
