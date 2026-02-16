'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCheckout } from '../context/CheckoutContext';
import { 
  staggerContainer, 
  gridItemVariants, 
  headerVariants, 
  headerItemVariants,
  viewportOptions 
} from '../utils/animations';

const trendingProducts = [
  {
    id: 1,
    name: 'Embroidered Silk Saree',
    price: '৳ 8,500',
    image: '/images/eid/eid-1.jpg',
    tag: 'Bestseller',
    category: 'Sarees'
  },
  {
    id: 2,
    name: 'Designer Kurti Set',
    price: '৳ 4,200',
    image: '/images/eid/eid-2.jpg',
    tag: 'New Arrival',
    category: 'Kurtis'
  },
  {
    id: 3,
    name: 'Festive Lehenga',
    price: '৳ 12,000',
    image: '/images/eid/eid-3.jpg',
    tag: 'Trending',
    category: 'Lehengas'
  },
  {
    id: 4,
    name: 'Banarasi Silk Saree',
    price: '৳ 9,800',
    image: '/images/falgun/falgun-1.jpg',
    tag: 'Hot',
    category: 'Sarees'
  },
  {
    id: 5,
    name: 'Georgette Anarkali',
    price: '৳ 5,500',
    image: '/images/falgun/falgun-2.jpg',
    tag: 'Popular',
    category: 'Anarkalis'
  },
  {
    id: 6,
    name: 'Printed Palazzo Set',
    price: '৳ 3,800',
    image: '/images/falgun/falgun-3.jpg',
    tag: 'New',
    category: 'Sets'
  },
  {
    id: 7,
    name: 'Chiffon Party Saree',
    price: '৳ 7,200',
    image: '/images/lookbook/look-1.jpg',
    tag: 'Trending',
    category: 'Sarees'
  },
  {
    id: 8,
    name: 'Velvet Gown',
    price: '৳ 6,500',
    image: '/images/lookbook/look-2.jpg',
    tag: 'Exclusive',
    category: 'Gowns'
  },
  {
    id: 9,
    name: 'Cotton Silk Kurti',
    price: '৳ 3,200',
    image: '/images/lookbook/look-3.jpg',
    tag: 'Bestseller',
    category: 'Kurtis'
  },
  {
    id: 10,
    name: 'Organza Saree',
    price: '৳ 8,900',
    image: '/images/lookbook/look-4.jpg',
    tag: 'Premium',
    category: 'Sarees'
  },
  {
    id: 11,
    name: 'Sharara Suit',
    price: '৳ 7,800',
    image: '/images/lookbook/look-5.jpg',
    tag: 'Hot',
    category: 'Suits'
  },
  {
    id: 12,
    name: 'Embellished Lehenga',
    price: '৳ 14,500',
    image: '/images/lookbook/look-6.jpg',
    tag: 'Luxury',
    category: 'Lehengas'
  }
];

export default function TrendingPage() {
  const { openCheckout } = useCheckout();
  const [hoveredId, setHoveredId] = useState(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const isHeaderInView = useInView(headerRef, viewportOptions);
  const isGridInView = useInView(gridRef, viewportOptions);

  const handleShopNow = (product) => {
    openCheckout({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="pt-32 pb-12 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-[#FFF9F5] to-white">
        <div className="max-w-7xl mx-auto">
          {/* Back to Home Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link href="/">
              <motion.button
                whileHover={{ x: -5 }}
                className="flex items-center gap-2 text-[#1A1A1A] hover:text-[#C5A059] transition-colors font-sans font-medium"
              >
                <ArrowLeft size={20} />
                Back to Home
              </motion.button>
            </Link>
          </motion.div>

          {/* Page Header */}
          <motion.div 
            ref={headerRef}
            variants={headerVariants}
            initial="hidden"
            animate={isHeaderInView ? "visible" : "hidden"}
            className="text-center mb-16"
          >
            <motion.p
              variants={headerItemVariants}
              className="text-sm font-sans tracking-widest text-[#C5A059] mb-3 uppercase font-medium"
            >
              TRENDING COLLECTION
            </motion.p>
            <motion.h1
              variants={headerItemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1A1A1A] mb-4"
            >
              What's Hot Right Now
            </motion.h1>
            <motion.p
              variants={headerItemVariants}
              className="text-base md:text-lg text-[#8A8A8A] font-sans max-w-2xl mx-auto"
            >
              Discover the most popular styles loved by our customers. From elegant sarees to contemporary kurtis, find your perfect look.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="py-12 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            ref={gridRef}
            variants={staggerContainer}
            initial="hidden"
            animate={isGridInView ? "visible" : "hidden"}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {trendingProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={gridItemVariants}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group"
              >
                {/* Product Card */}
                <div className="relative bg-white overflow-hidden">
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F5F5]">
                    <motion.div
                      animate={{ scale: hoveredId === product.id ? 1.08 : 1 }}
                      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                      className="w-full h-full"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </motion.div>

                    {/* Tag */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-[#1A1A1A] text-[10px] font-sans font-medium uppercase tracking-wider shadow-sm">
                        {product.tag}
                      </span>
                    </div>

                    {/* Hover Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredId === product.id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-black/20 z-[5]"
                    />

                    {/* Shop Now Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ 
                        opacity: hoveredId === product.id ? 1 : 0,
                        y: hoveredId === product.id ? 0 : 10
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="absolute inset-0 flex items-center justify-center z-10"
                    >
                      <motion.button
                        onClick={() => handleShopNow(product)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-6 py-2.5 bg-white text-[#1A1A1A] font-sans font-medium text-sm uppercase tracking-wider shadow-lg hover:bg-[#1A1A1A] hover:text-white transition-all duration-300"
                      >
                        <ShoppingBag size={16} />
                        Shop Now
                      </motion.button>
                    </motion.div>
                  </div>

                  {/* Product Info */}
                  <div className="pt-4 pb-2">
                    <p className="text-xs font-sans text-[#8A8A8A] mb-1 uppercase tracking-wide">
                      {product.category}
                    </p>
                    <h3 className="text-base font-sans font-semibold text-[#1A1A1A] mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-base font-sans font-medium text-[#D10056]">
                      {product.price}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
            viewport={viewportOptions}
            className="text-center mt-16"
          >
            <p className="text-[#8A8A8A] font-sans mb-6">
              Can't find what you're looking for?
            </p>
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-4 bg-[#C5A059] text-white font-sans font-medium text-lg uppercase tracking-wider hover:bg-[#B8935A] transition-all duration-300 shadow-lg"
              >
                Explore All Collections
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
