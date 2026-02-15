'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ScrollReveal({ 
  children, 
  delay = 0,
  duration = 0.8,
  yOffset = 60,
  threshold = 0.1
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-80px",
    amount: threshold 
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.25, 0.1, 0.25, 1.0] // Custom cubic-bezier for smooth premium feel
      }}
    >
      {children}
    </motion.div>
  );
}
