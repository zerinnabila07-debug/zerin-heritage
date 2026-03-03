'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Expand, Tag } from 'lucide-react';
import { useCheckout } from '../context/CheckoutContext';
import ImageLightbox from '../components/ImageLightbox';
import { 
  staggerContainer, 
  gridItemVariants, 
  headerVariants, 
  headerItemVariants,
  viewportOptions 
} from '../utils/animations';

const clearanceProducts = [
  {
    id: 1,
    name: 'Designer Silk Saree',
    originalPrice: '৳ 15,999',
    salePrice: '৳ 6,399',
    discount: '60% OFF',
    image: '/images/eid/eid1.jpg',
    category: 'Sarees'
  },
  {
    id: 2,
    name: 'Embroidered Kurti Set',
    originalPrice: '৳ 8,999',
    salePrice: '৳ 3,599',
    discount: '60% OFF',
    image: '/images/eid/eid2.jpg',
    category: 'Kurtis'
  },
  {
    id: 3,
    name: 'Festive Lehenga',
    originalPrice: '৳ 18,999',
    salePrice: '৳ 7,599',
    discount: '60% OFF',
    image: '/images/eid/eid3.jpg',
    category: 'Lehengas'
  },
  {
    id: 4,
    name: 'Premium Cotton Saree',
    originalPrice: '৳ 12,999',
    salePrice: '৳ 5,199',
    discount: '60% OFF',
    image: '/images/falgun/f1.jpg',
    category: 'Sarees'
  },
  {
    id: 5,
    name: 'Floral Anarkali',
    originalPrice: '৳ 9,999',
    salePrice: '৳ 3,999',
    discount: '60% OFF',
    image: '/images/falgun/f2.jpg',
    category: 'Anarkalis'
  },
  {
    id: 6,
    name: 'Palazzo Set',
    originalPrice: '৳ 6,999',
    salePrice: '৳ 2,799',
    discount: '60% OFF',
    image: '/images/falgun/f3.jpg',
    category: 'Sets'
  },
  {
    id: 7,
    name: 'Party Wear Saree',
    originalPrice: '৳ 11,999',
    salePrice: '৳ 4,799',
    discount: '60% OFF',
    image: '/images/lookbook/l1.jpg',
    category: 'Sarees'
  },
  {
    id: 8,
    name: 'Evening Gown',
    originalPrice: '৳ 14,999',
    salePrice: '৳ 5,999',
    discount: '60% OFF',
    image: '/images/lookbook/l2.jpg',
    category: 'Gowns'
  }
];

export default function ClearancePage() {
  const { openCheckout } = useCheckout();
  const [hoveredId, setHoveredId] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const isHeaderInView = useInView(headerRef, viewportOptions);
  const isGridInView = useInView(gridRef, viewportOptions);

  const handleShopNow = (product) => {
    openCheckout({
      id: product.id,
      name: product.name,
      price: product.salePrice,
      image: product.image,
      title: product.name
    });
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const lightboxImages = clearanceProducts.map(product => ({
    image: product.image,
    title: product.name
  }));

  return (
    <main className="min-h-screen bg-white">
      <section className="pt-32 pb-8 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-[#D10056]/10 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link href="/">
              <motion.button
                whileHover={{ x: -5 }}
                className="flex items-center gap-2 text-[#1A1A1A] hover:text-[#D10056] transition-colors font-sans font-medium"
              >
                <ArrowLeft size={20} />
                Back to Home
              </motion.button>
            </Link>
          </motion.div>

          <motion.div 
            ref={headerRef}
            variants={headerVariants}
            initial="hidden"
            animate={isHeaderInView ? "visible" : "hidden"}
            className="text-center mb-12"
          >
            <motion.div
              variants={headerItemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#D10056] text-white rounded-full mb-4"
            >
              <Tag size={20} />
              <span className="text-sm font-sans font-semibold uppercase tracking-wider">
                Up to 60% Off
              </span>
            </motion.div>
            <motion.h1
              variants={headerItemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1A1A1A] mb-4"
            >
              Clearance Craze
            </motion.h1>
            <motion.p
              variants={headerItemVariants}
              className="text-base md:text-lg text-[#8A8A8A] font-sans max-w-2xl mx-auto"
            >
              Limited time offer! Grab your favorite designer pieces at unbeatable prices. Stock is limited, shop now before it's gone!
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            ref={gridRef}
            variants={staggerContainer}
            initial="hidden"
            animate={isGridInView ? "visible" : "hidden"}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {clearanceProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={gridItemVariants}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group flex flex-col h-full"
              >
                <div className="relative aspect-[2/3] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 cursor-pointer flex items-center justify-center">
                  <div 
                    className="w-full h-full"
                    onClick={() => handleImageClick(clearanceProducts.indexOf(product))}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-2"
                      style={{ objectPosition: 'center' }}
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>

                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-3 py-1 bg-[#D10056] text-white text-[10px] font-sans font-bold uppercase tracking-wider shadow-lg">
                      {product.discount}
                    </span>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredId === product.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-black/20 pointer-events-none"
                  />

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: hoveredId === product.id ? 1 : 0,
                      scale: hoveredId === product.id ? 1 : 0.8
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-3 right-3 z-10"
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageClick(clearanceProducts.indexOf(product));
                      }}
                      className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                    >
                      <Expand size={18} className="text-[#1A1A1A]" />
                    </button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: hoveredId === product.id ? 1 : 0,
                      y: hoveredId === product.id ? 0 : 10
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center z-10"
                  >
                    <motion.button
                      onClick={() => handleShopNow(product)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-6 py-2.5 bg-white text-[#1A1A1A] font-sans font-medium text-sm uppercase tracking-wider shadow-lg hover:bg-[#D10056] hover:text-white transition-all duration-300"
                    >
                      <ShoppingBag size={16} />
                      Shop Now
                    </motion.button>
                  </motion.div>
                </div>

                <div className="pt-4 pb-2">
                  <p className="text-xs font-sans text-[#8A8A8A] mb-1 uppercase tracking-wide">
                    {product.category}
                  </p>
                  <h3 className="text-base font-sans font-semibold text-[#1A1A1A] mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <p className="text-base font-sans font-bold text-[#D10056]">
                      {product.salePrice}
                    </p>
                    <p className="text-sm font-sans text-gray-400 line-through">
                      {product.originalPrice}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
            viewport={viewportOptions}
            className="text-center mt-16"
          >
            <p className="text-[#8A8A8A] font-sans mb-6">
              Limited stock available. Prices valid while supplies last.
            </p>
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-4 bg-[#D10056] text-white font-sans font-medium text-lg uppercase tracking-wider hover:bg-[#B8004A] transition-all duration-300 shadow-lg"
              >
                Explore All Collections
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={lightboxImages}
        currentIndex={currentImageIndex}
        onNavigate={setCurrentImageIndex}
      />
    </main>
  );
}
