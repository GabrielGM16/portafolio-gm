import React from 'react';
import { motion } from 'framer-motion';

/**
 * Aparición sobria al entrar en viewport. Sin rebotes ni escalados:
 * un desplazamiento corto y una transición larga leen como editorial, no como plantilla.
 */
const Reveal = ({ children, delay = 0, y = 18, className = '', as = 'div' }) => {
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;
