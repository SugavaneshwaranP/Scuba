import React from "react";
import { motion } from "framer-motion";

export default function OceanBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#FFF7ED]">
      {/* Dynamic Watercolor Splashes */}
      <div className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw]">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute inset-0 watercolor-splash bg-[#BAE6FD]" 
        />
      </div>

      <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw]">
        <motion.div 
          animate={{ scale: [1.1, 1, 1.1], rotate: [0, -15, 0] }}
          transition={{ duration: 20, repeat: Infinity, delay: 2 }}
          className="absolute inset-0 watercolor-splash bg-[#FFEDD5] opacity-60" 
        />
      </div>

      <div className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw]">
        <motion.div 
          animate={{ scale: [1, 1.15, 1], x: [-20, 20, -20] }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute inset-0 watercolor-splash bg-[#BAE6FD] opacity-30" 
        />
      </div>

      {/* Paper Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
    </div>
  );
}
