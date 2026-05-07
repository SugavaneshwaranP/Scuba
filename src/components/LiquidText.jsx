import React from 'react';
import { motion } from 'framer-motion';

const LiquidText = ({ text, className = "", delay = 0 }) => {
  const words = text.split(" ");

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.3em] overflow-hidden">
          {word.split("").map((char, charIdx) => (
            <motion.span
              key={charIdx}
              initial={{ opacity: 0, y: "100%", filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              whileHover={{ 
                y: -5,
                scale: 1.1,
                color: "var(--color-primary)",
                transition: { duration: 0.2 }
              }}
              animate={{
                y: [0, -2, 0],
                transition: { 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: (wordIdx * 0.1) + (charIdx * 0.05)
                }
              }}
              transition={{
                duration: 1.2,
                delay: delay + (wordIdx * 0.1) + (charIdx * 0.03),
                ease: [0.2, 0.65, 0.3, 0.9]
              }}
              viewport={{ once: true }}
              className="inline-block cursor-default"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
};

export default LiquidText;
