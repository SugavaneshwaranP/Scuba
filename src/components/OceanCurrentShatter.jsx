import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Vector nodes representing shattering water/glass or manga speed-shards
const OCEAN_SHARDS = [
  { id: 1, path: "M 10 10 L 90 20 L 70 80 Z", xOffset: -80, yOffset: -60, rotate: -25 },
  { id: 2, path: "M 80 10 L 150 40 L 110 90 Z", xOffset: 80, yOffset: -80, rotate: 35 },
  { id: 3, path: "M 20 70 L 90 60 L 60 140 Z", xOffset: -90, yOffset: 50, rotate: -35 },
  { id: 4, path: "M 100 80 L 160 70 L 130 150 Z", xOffset: 90, yOffset: 60, rotate: 25 },
  { id: 5, path: "M 50 120 L 120 110 L 90 180 Z", xOffset: 0, yOffset: 100, rotate: 10 },
  { id: 6, path: "M -20 30 L 40 10 L 20 100 Z", xOffset: -120, yOffset: -30, rotate: -50 },
  { id: 7, path: "M 140 120 L 200 90 L 170 170 Z", xOffset: 120, yOffset: 90, rotate: 45 },
];

export default function OceanCurrentShatter({ onSnap, onComplete, label }) {
  const [animationStage, setAnimationStage] = useState('idle'); // 'idle' | 'shatter'

  useEffect(() => {
    // Blast / Shatter triggers at 1100ms
    const blastTimer = setTimeout(() => {
        setAnimationStage('shatter');
        // Snapshot the scroll right at the shatter moment
        if (onSnap) onSnap(); 
    }, 1100);

    // End transition completely at 3400ms
    const endTimer = setTimeout(() => {
        if (onComplete) onComplete();
    }, 3400);

    return () => {
      clearTimeout(blastTimer);
      clearTimeout(endTimer);
    };
  }, [onSnap, onComplete]);

  const isShattered = animationStage === 'shatter';
  
  // Dynamic theme switching (Blue Palette)
  const bgStyle = isShattered ? 'bg-[#2F92D0]' : 'bg-gradient-to-b from-[#005588] to-[#2F92D0]';
  const vectorStroke = isShattered ? '#D2E9F9' : '#41C5E8'; // ice-blue vs aqua

  return (
    <div className={`fixed inset-0 z-[999] ${bgStyle} transition-colors duration-300 flex items-center justify-center overflow-hidden font-sans select-none pointer-events-auto`}>
      
      {/* Background Screentone Dots */}
      <div className={`absolute inset-0 manga-dots pointer-events-none transition-opacity duration-300 ${isShattered ? 'opacity-10' : 'opacity-30'}`}></div>

      {/* ---------------- LAYER 1: SILENT DIVER BACKGROUND SILHOUETTE ---------------- */}
      <div className={`absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-0 transition-opacity duration-500 ${isShattered ? 'opacity-0' : 'opacity-15'}`}>
        <svg viewBox="0 0 200 200" className="w-80 h-80 text-[#D2E9F9] animate-swim">
          {/* Minimalist, high-quality scuba diver silhouette */}
          <path 
            fill="currentColor" 
            d="M 25 110 
               C 35 105, 45 112, 55 115 
               C 65 118, 75 115, 85 105 
               C 95 95, 105 85, 115 80 
               C 125 75, 135 72, 145 76 
               C 155 80, 165 92, 172 90 
               C 176 89, 180 84, 184 79 
               C 186 76, 189 78, 187 81 
               C 181 90, 172 98, 161 98 
               C 150 98, 141 91, 133 85 
               C 125 79, 118 79, 111 83 
               C 103 88, 93 98, 83 103 
               C 73 108, 53 108, 25 110 Z"
          />
          {/* Tank silhouette */}
          <rect 
            x="108" 
            y="66" 
            width="28" 
            height="12" 
            rx="4" 
            transform="rotate(-15 108 66)" 
            fill="currentColor" 
            opacity="0.85" 
          />
          {/* Mask / Regulator connection */}
          <circle cx="152" cy="74" r="5" fill="currentColor" />
          <path d="M 148 78 Q 142 84 136 80" stroke="currentColor" strokeWidth="2" fill="none" />
          
          {/* Ambient bubbles */}
          <circle cx="160" cy="55" r="4" fill="currentColor" opacity="0.6" className="animate-pulse" />
          <circle cx="172" cy="45" r="2.5" fill="currentColor" opacity="0.4" />
          <circle cx="166" cy="35" r="3" fill="currentColor" opacity="0.5" />
        </svg>
      </div>

      {/* ---------------- LAYER 2: INTERACTIVE SCATTER SHARD SVG VORTEX ---------------- */}
      <div className="relative w-96 h-96 z-10 flex items-center justify-center">
        {/* Shards Cluster */}
        <svg viewBox="-50 -50 300 300" className="w-full h-full overflow-visible absolute inset-0 filter drop-shadow-[4px_4px_0_rgba(0,85,136,0.5)]">
          <g transform="translate(10, 10)">
            {OCEAN_SHARDS.map((shard) => (
              <motion.path
                key={shard.id}
                d={shard.path}
                fill={isShattered ? '#D2E9F9' : 'transparent'}
                stroke={vectorStroke}
                strokeWidth="5"
                strokeLinejoin="round"
                initial={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
                animate={isShattered ? {
                  x: shard.xOffset * 2.5,
                  y: shard.yOffset * 2.5,
                  rotate: shard.rotate * 2,
                  scale: 0.2,
                  opacity: 0
                } : {
                  x: 0,
                  y: 0,
                  rotate: 0,
                  scale: 1,
                  opacity: 1
                }}
                transition={{
                  type: 'spring',
                  stiffness: isShattered ? 60 : 120,
                  damping: isShattered ? 15 : 20,
                  mass: 1.2
                }}
              />
            ))}
          </g>
        </svg>

        {/* Dynamic Connected Micro Label Nodes - appears when shattered */}
        <AnimatePresence>
          {isShattered && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.2, rotate: -25 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ type: 'spring', damping: 14, stiffness: 100 }}
              className="absolute text-center bg-[#005588] border-4 border-[#41C5E8] p-6 shadow-[8px_8px_0_0_#D2E9F9] transform -rotate-2"
            >
              <h3 className="text-5xl lg:text-6xl font-manga-title tracking-widest text-[#D2E9F9] uppercase animate-action-shake leading-none drop-shadow-[3px_3px_0px_#003355]">
                {label}
              </h3>
              <p className="text-xs font-mono tracking-widest uppercase mt-4 text-[#005588] bg-[#D2E9F9] px-3.5 py-1.5 font-extrabold inline-block shadow-[3px_3px_0_0_#2F92D0]">
                WATER SURFACE SHATTERED // DESCENT AUTHORIZED
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 manga-speedlines opacity-10 pointer-events-none mix-blend-overlay"></div>
    </div>
  );
}
