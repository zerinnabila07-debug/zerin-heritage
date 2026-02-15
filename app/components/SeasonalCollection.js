'use client';

import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { useCheckout } from '../context/CheckoutContext';

const collections = [
  {
    id: 'eid',
    title: 'EID Collection 2026',
    subtitle: 'Celebrate in Style',
    description: 'Discover our exclusive EID collection featuring elegant designs perfect for your special celebrations',
    gradient: 'from-[#E0115F] via-[#C00F54] to-[#A00E48]',
    textColor: 'text-white',
    buttonStyle: 'bg-white text-[#E0115F] hover:bg-gray-100'
  },
  {
    id: 'valentine',
    title: 'Bosonto & Valentine\'s Collection',
    subtitle: 'Romance in Every Thread',
    description: 'Embrace the season of love with our curated collection of romantic and vibrant pieces',
    gradient: 'from-[#FFF0F5] via-[#FFE4E1] to-[#FFB6C1]',
    textColor: 'text-[#2C2C2C]',
    buttonStyle: 'bg-[#E0115F] text-white hover:bg-[#C00F54]'
  }
];

export default function SeasonalCollection() {
  const { openCheckout } = useCheckout();
  
  return (
    <section className="bg-white">
      {collections.map((collection, index) => (
        <ScrollReveal key={collection.id} delay={index * 0.2}>
          <div className={`relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br ${collection.gradient}`}>
            <div className="absolute inset-0">
              <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-4 gap-4 h-full p-8">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="bg-white/20 rounded-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                  ></motion.div>
                ))}
              </div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <p className={`text-sm font-sans tracking-widest mb-4 ${collection.textColor} opacity-80`}>
                  {collection.subtitle}
                </p>
                <h2 className={`text-6xl md:text-7xl font-serif mb-6 ${collection.textColor}`}>
                  {collection.title}
                </h2>
                <p className={`text-lg md:text-xl mb-12 max-w-2xl mx-auto ${collection.textColor} opacity-90`}>
                  {collection.description}
                </p>
                <motion.button
                  onClick={() => openCheckout({ title: collection.title })}
                  className={`px-12 py-4 font-sans font-medium text-lg transition-all duration-300 ${collection.buttonStyle}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Shop Now
                </motion.button>
              </motion.div>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </section>
  );
}
