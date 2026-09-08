import React from 'react';
import { motion } from 'framer-motion';

const Scroll3DReveal = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        scale: 0.98,
        y: 28 
      }}
      whileInView={{ 
        opacity: 1, 
        scale: 1,
        y: 0 
      }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -40px 0px" }}
      transition={{ 
        duration: 0.5, 
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Scroll3DReveal;
