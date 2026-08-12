import React from 'react';
import { motion } from 'framer-motion';

const Scroll3DReveal = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        rotateX: 45, 
        scale: 0.9,
        y: 100 
      }}
      whileInView={{ 
        opacity: 1, 
        rotateX: 0, 
        scale: 1,
        y: 0 
      }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -50px 0px" }}
      transition={{ 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1], // Custom easing for smooth fluid pop
        type: "spring",
        damping: 20,
        stiffness: 100
      }}
      className={className}
      style={{ transformStyle: 'preserve-3d', perspective: '1200px' }}
    >
      {children}
    </motion.div>
  );
};

export default Scroll3DReveal;
