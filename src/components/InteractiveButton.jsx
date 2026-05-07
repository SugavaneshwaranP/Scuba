import React from 'react';
import { motion } from 'framer-motion';

const InteractiveButton = ({ children, className = "" }) => {
  return (
    <motion.button
      className={`relative px-8 py-4 bg-transparent border border-primary/30 rounded-full overflow-hidden group transition-colors duration-500 hover:border-primary ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10 font-bold tracking-widest uppercase text-sm group-hover:text-background transition-colors duration-500">
        {children}
      </span>
      
      {/* Liquid Fill Effect */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-0 bg-primary z-0"
        initial={{ h: 0 }}
        whileHover={{ height: '100%' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
      
      {/* Subtle Glow */}
      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
    </motion.button>
  );
};

export default InteractiveButton;
