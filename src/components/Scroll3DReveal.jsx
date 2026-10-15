import React from 'react';
import { motion } from 'framer-motion';

const Scroll3DReveal = ({
  children,
  className = '',
  variant = 'default', // 'default', 'card', 'scaleUp', 'tilt'
  delay = 0,
}) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const getVariants = () => {
    if (isMobile) {
      return {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
      };
    }

    switch (variant) {
      case 'card':
        return {
          initial: { opacity: 0, scale: 0.94, y: 35, rotateX: 6 },
          whileInView: { opacity: 1, scale: 1, y: 0, rotateX: 0 },
        };
      case 'tilt':
        return {
          initial: { opacity: 0, scale: 0.95, y: 30, rotateX: 10 },
          whileInView: { opacity: 1, scale: 1, y: 0, rotateX: 0 },
        };
      case 'scaleUp':
        return {
          initial: { opacity: 0, scale: 0.9, y: 20 },
          whileInView: { opacity: 1, scale: 1, y: 0 },
        };
      case 'default':
      default:
        return {
          initial: { opacity: 0, scale: 0.98, y: 24 },
          whileInView: { opacity: 1, scale: 1, y: 0 },
        };
    }
  };

  const selectedVariants = getVariants();

  return (
    <motion.div
      initial={selectedVariants.initial}
      whileInView={selectedVariants.whileInView}
      viewport={{ once: true, amount: isMobile ? 0.05 : 0.08, margin: isMobile ? '0px 0px -20px 0px' : '0px 0px -30px 0px' }}
      transition={{
        duration: isMobile ? 0.35 : 0.55,
        delay: isMobile ? Math.min(delay, 0.1) : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      style={{
        perspective: isMobile ? undefined : 1200,
        transformStyle: isMobile ? undefined : 'preserve-3d',
        transform: 'translateZ(0)',
      }}
    >
      {children}
    </motion.div>
  );
};

export default Scroll3DReveal;
