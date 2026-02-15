'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCheckout } from '../context/CheckoutContext';

const slides = [
  {
    id: 1,
    image: '/hero/slide-eid.jpg',
    title: 'EID COLLECTION 26',
    subtitle: 'ঈদ সংগ্রহ ২৬ - ঐতিহ্য ও আভিজাত্য',
    link: '/eid-2026'
  },
  {
    id: 2,
    image: '/hero/slide-falgun.jpg',
    title: 'SPRING HERITAGE',
    subtitle: 'বসন্ত বরণ ২৬ - রঙিন উৎসব',
    link: '/falgun-valentine'
  },
  {
    id: 3,
    image: '/hero/slide-pink.jpg',
    title: 'MIRROR WORK LUXURY',
    subtitle: 'আভিজাত্যের ছোঁয়ায় নতুন সাজ',
    link: '/women'
  },
  {
    id: 4,
    image: '/hero/slide-sale.jpg',
    title: 'SEASONAL CLEARANCE',
    subtitle: 'পছন্দের পোশাকে বিশাল ছাড়',
    link: '/clearance'
  }
];

export default function HeroSlider() {
  const { openCheckout } = useCheckout();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section className="relative w-full min-h-[500px] h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden bg-black">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 }
          }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            fill
            className="object-cover object-[center_30%]"
            priority
            quality={100}
          />
          
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/50 to-black/60"></div>
          <div className="absolute inset-0 bg-black/20"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6 max-w-4xl transform -translate-y-[5%]">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-3 md:mb-4 tracking-widest leading-tight drop-shadow-2xl"
                style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.6)' }}
              >
                {slides[currentSlide].title}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-lg md:text-xl lg:text-2xl text-white mb-6 md:mb-8 font-light drop-shadow-xl tracking-wide"
                style={{ textShadow: '0 2px 12px rgba(0,0,0,0.7)' }}
              >
                {slides[currentSlide].subtitle}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <button
                  onClick={() => openCheckout({ title: slides[currentSlide].title })}
                  className="inline-block px-10 md:px-12 py-3 md:py-4 bg-[#FF7F24] text-white font-sans font-semibold text-base md:text-lg tracking-wider hover:bg-[#FF6A00] transition-all duration-300 hover:scale-105 shadow-2xl"
                  style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.5), 0 4px 12px rgba(255,127,36,0.4)' }}
                >
                  Shop Now
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={goToPrevious}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} strokeWidth={2.5} />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight size={28} strokeWidth={2.5} />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-12 h-3 bg-[#FF7F24]'
                : 'w-3 h-3 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
