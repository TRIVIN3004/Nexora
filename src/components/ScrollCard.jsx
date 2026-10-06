import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * ScrollCard provides a 3D perspective entrance animation when scrolled into view,
 * along with a dynamic mouse-following spotlight glow effect.
 */
const ScrollCard = ({
  children,
  className = '',
  index = 0,
  delay = null,
  direction = 'up', // 'up', 'down', 'left', 'right'
  spotlight = true,
  glowColor = 'rgba(37, 99, 235, 0.12)',
  ...props
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.15, margin: "0px 0px -50px 0px" });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!spotlight || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    if (!spotlight) return;
    setMousePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const calculatedDelay = delay !== null ? delay : (index % 4) * 0.1;

  const initialVariants = {
    up: { opacity: 0, y: 36, scale: 0.96, rotateX: 8 },
    down: { opacity: 0, y: -36, scale: 0.96, rotateX: -8 },
    left: { opacity: 0, x: 36, scale: 0.96, rotateY: -8 },
    right: { opacity: 0, x: -36, scale: 0.96, rotateY: 8 },
  };

  return (
    <motion.div
      ref={cardRef}
      initial={initialVariants[direction] || initialVariants.up}
      animate={isInView ? { opacity: 1, y: 0, x: 0, scale: 1, rotateX: 0, rotateY: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: calculatedDelay,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      {...props}
    >
      {spotlight && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
          style={{
            opacity: mousePos.opacity,
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 70%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  );
};

export default ScrollCard;
