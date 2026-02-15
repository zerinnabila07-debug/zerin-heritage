'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { useCheckout } from '../context/CheckoutContext';

const trendingItems = [
  { id: 1, name: 'Embroidered Kurti', price: '৳3,999', tag: 'Bestseller', image: '/images/lookbook/l1.jpg' },
  { id: 2, name: 'Silk Saree', price: '৳8,999', tag: 'New Arrival', image: '/images/lookbook/l2.jpg' },
  { id: 3, name: 'Designer Tunic', price: '৳4,499', tag: 'Trending', image: '/images/lookbook/l3.jpg' },
  { id: 4, name: 'Ethnic Set', price: '৳5,999', tag: 'Hot', image: '/images/lookbook/l1.jpg' }
];

export default function TrendingNow() {
  const { openCheckout } = useCheckout();
  
  return (
    <section className="py-12 md:py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-[#FFF0F5] to-white">
      <ScrollReveal>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-sm font-sans tracking-widest text-[#E0115F] mb-2"
            >
              WHAT'S HOT
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif text-[#2C2C2C] mb-3"
            >
              Trending Now
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-base text-[#2C2C2C] opacity-70 font-sans"
            >
              Shop the most popular styles of the season
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] mb-4 overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 25vw"
                    />
                  </motion.div>

                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 bg-[#E0115F] text-white text-xs font-medium shadow-lg">
                      {item.tag}
                    </span>
                  </div>

                  <motion.div
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  ></motion.div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.button
                      onClick={() => openCheckout({ title: item.name, price: item.price })}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 bg-white text-[#E0115F] font-sans font-medium shadow-lg"
                    >
                      Shop Now
                    </motion.button>
                  </div>
                </div>

                <h3 className="text-lg font-serif text-[#2C2C2C] mb-1 group-hover:text-[#E0115F] transition-colors mt-3">
                  {item.name}
                </h3>
                <p className="text-base font-sans font-medium text-[#E0115F]">
                  {item.price}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 border-2 border-[#E0115F] text-[#E0115F] font-sans font-medium text-lg hover:bg-[#E0115F] hover:text-white transition-all duration-300"
            >
              View All Trending
            </motion.button>
          </motion.div>
        </div>
      </ScrollReveal>
    </section>
  );
}
