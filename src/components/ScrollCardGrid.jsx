import React from 'react';
import { motion } from 'framer-motion';

/**
 * ScrollCardGrid wraps card grids and applies staggered entrance animation
 * when the grid enters the viewport.
 */
const ScrollCardGrid = ({
  children,
  className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
  staggerDelay = 0.08,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1, margin: '0px 0px -40px 0px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollCardGrid;
