'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCheckout } from '../context/CheckoutContext';

export default function ImageLightbox({ isOpen, onClose, images, currentIndex, onNavigate, title }) {
  const { openCheckout } = useCheckout();

  if (!isOpen) return null;

  const handlePrevious = () => {
    onNavigate((currentIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    onNavigate((currentIndex + 1) % images.length);
  };

  const handleShopThisLook = () => {
    onClose();
    openCheckout({ title: images[currentIndex]?.title || title });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-md"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 group"
            aria-label="Close"
          >
            <X size={24} className="text-white group-hover:scale-110 transition-transform" />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 group"
                aria-label="Previous"
              >
                <ChevronLeft size={28} className="text-white group-hover:scale-110 transition-transform" strokeWidth={2.5} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 group"
                aria-label="Next"
              >
                <ChevronRight size={28} className="text-white group-hover:scale-110 transition-transform" strokeWidth={2.5} />
              </button>
            </>
          )}

          <motion.div
            key={currentIndex}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative w-full h-full max-w-6xl max-h-[90vh] mx-auto px-20 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={images[currentIndex]?.image}
                alt={images[currentIndex]?.title || 'Gallery image'}
                fill
                className="object-contain"
                style={{ objectPosition: 'center' }}
                sizes="100vw"
                priority
              />
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
            >
              {images[currentIndex]?.title && (
                <h3 className="text-2xl font-serif text-white text-center drop-shadow-lg">
                  {images[currentIndex].title}
                </h3>
              )}
              
              <button
                onClick={handleShopThisLook}
                className="px-10 py-4 bg-gradient-to-r from-[#C5A059] to-[#B8935A] text-white font-sans font-semibold text-lg rounded-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Shop This Look
              </button>

              {images.length > 1 && (
                <div className="flex gap-2 mt-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate(index);
                      }}
                      className={`transition-all duration-300 rounded-full ${
                        index === currentIndex
                          ? 'w-8 h-2 bg-[#C5A059]'
                          : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
