import React from 'react';
import { motion } from 'framer-motion';

const Scroll3DReveal = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        scale: 0.96,
        y: 40 
      }}
      whileInView={{ 
        opacity: 1, 
        scale: 1,
        y: 0 
      }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -50px 0px" }}
      transition={{ 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1], // Custom easing for smooth fluid pop
        type: "spring",
        damping: 25,
        stiffness: 120
      }}
      className={className}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
};

export default Scroll3DReveal;

