import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DiveGearVortex({ onSnap, onComplete, label }) {
  const [animationStage, setAnimationStage] = useState('idle'); // 'idle' | 'blast' | 'vortex'

  // Automatically trigger the sequence cascade
  useEffect(() => {
    // Stage 1: 'idle' is the compass spinning (starts immediately)
    // Stage 2: 'blast' happens at 1200ms
    const blastTimer = setTimeout(() => {
        setAnimationStage('blast');
        // Snapshot the scroll right at the blast moment so the page underneath snaps while obscured
        if (onSnap) onSnap(); 
    }, 1200);

    // Stage 3: 'vortex' the whirlpool overtakes the screen at 1600ms
    const vortexTimer = setTimeout(() => setAnimationStage('vortex'), 1600);

    // End transition completely at 3400ms to return to the app
    const endTimer = setTimeout(() => {
        if (onComplete) onComplete();
    }, 3400);

    return () => {
      clearTimeout(blastTimer);
      clearTimeout(vortexTimer);
      clearTimeout(endTimer);
    };
  }, [onSnap, onComplete]);

  return (
    <div className="fixed inset-0 z-[999] bg-gradient-to-b from-[#1A2D37] to-[#253D4A] text-brand-cream flex items-center justify-center overflow-hidden font-sans select-none pointer-events-auto">
      
      {/* Background Screentone Dots */}
      <div className="absolute inset-0 manga-dots pointer-events-none opacity-20"></div>

      {/* ---------- STAGE 1 & 2: THE COMPASS GAUGE AND FLANKING BARS ---------- */}
      <AnimatePresence>
        {animationStage !== 'vortex' && (
          <motion.div 
            className="relative flex items-center justify-center"
            exit={{ scale: 5, opacity: 0, rotate: -45 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }} // Heavy cinematic ease-in
          >
            {/* Left Floating Bar - Scuba gauge aesthetic */}
            <motion.div 
              className="absolute -left-32 w-16 h-10 bg-brand-sage rounded-sm origin-right border-2 border-brand-cream shadow-[4px_4px_0_0_var(--color-brand-sand)]"
              animate={animationStage === 'idle' ? {
                skewX: -20,
                y: [0, -6, 0],
                scaleX: [1, 1.05, 1]
              } : { scaleX: 0, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              style={{ transform: 'skewX(-20deg)' }}
            />

            {/* Central 3D Spinning Dive Compass */}
            <motion.div
              className="w-32 h-32 rounded-full border-[6px] border-brand-sage bg-brand-cream flex items-center justify-center relative shadow-[0_0_40px_rgba(143,160,122,0.5)]"
              style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
              animate={animationStage === 'idle' ? {
                rotateY: [0, 180, 360],
                z: [0, 15, 0]
              } : {
                scale: 12,
                borderWidth: "1px",
                boxShadow: "0 0 100px rgba(143,160,122,0.8)",
                backgroundColor: "var(--color-brand-brown)" // Turns deep brown right before blast
              }}
              transition={animationStage === 'idle' ? {
                rotateY: { repeat: Infinity, duration: 2, ease: "linear" },
                z: { repeat: Infinity, duration: 1.25, ease: "easeInOut" }
              } : {
                duration: 0.6,
                ease: [0.87, 0, 0.13, 1]
              }}
            >
              {/* Dive compass anchor */}
              <motion.span 
                className="text-5xl font-manga-title text-brand-brown select-none drop-shadow-md"
                animate={animationStage === 'blast' ? { opacity: 0, scale: 0.2 } : {}}
              >
                ⚓
              </motion.span>

              {/* Liquid Wave Splash Ring Overlay (Triggers right at the blast moment) */}
              {animationStage === 'blast' && (
                <motion.div 
                  initial={{ scale: 0.1, opacity: 1 }}
                  animate={{ scale: 3, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full bg-brand-sand/60 border-4 border-brand-sage"
                />
              )}
            </motion.div>

            {/* Right Floating Bar Stack */}
            <div className="absolute -right-36 flex flex-col gap-2">
              <motion.div 
                className="w-20 h-4 bg-brand-sand rounded-sm border-2 border-brand-cream shadow-[3px_3px_0_0_var(--color-brand-brown)]"
                animate={animationStage === 'idle' ? { x: [0, 8, 0], skewX: -20 } : { x: 100, opacity: 0 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                style={{ transform: 'skewX(-20deg)' }}
              />
              <motion.div 
                className="w-14 h-3 bg-brand-sage rounded-sm self-end"
                animate={animationStage === 'idle' ? { x: [0, -5, 0], skewX: -20 } : { x: 100, opacity: 0 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut", delay: 0.2 }}
                style={{ transform: 'skewX(-20deg)' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- STAGE 3: THE EXTREME SPIRAL / OCEAN VORTEX ---------- */}
      <AnimatePresence>
        {animationStage === 'vortex' && (
          <motion.div 
            className="absolute inset-0 w-full h-full flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Massive Kinetic Ring Alpha (Spinnings Counter-Clockwise) */}
            <motion.div 
              initial={{ scale: 0.2, rotate: 0 }}
              animate={{ scale: [0.5, 1.2, 1.5], rotate: -720 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute w-[900px] h-[900px] rounded-full border-[80px] border-t-brand-sage border-r-brand-sand border-b-transparent border-l-brand-cream opacity-20 filter blur-sm"
            />

            {/* Primary Sharp Swirling Geometry Wave Segment (Ocean Current) */}
            <motion.svg 
              viewBox="0 0 400 400" 
              className="w-[140%] h-[140%] absolute text-brand-sage drop-shadow-[0_0_40px_rgba(143,160,122,0.4)]"
              initial={{ rotate: -90, scale: 0.1 }}
              animate={{ rotate: 280, scale: 1.2 }}
              transition={{ duration: 1.8, ease: [0.25, 1, 0.5, 1] }}
            >
              <motion.path 
                fill="currentColor"
                d="M 200,200 
                   M 200,40 
                   A 160,160 0 0,1 360,200 
                   A 160,160 0 0,1 200,360 
                   A 160,160 0 0,1 80,260 
                   L 120,240 
                   A 100,100 0 0,0 200,300 
                   A 100,100 0 0,0 300,200 
                   A 100,100 0 0,0 200,100 Z"
              />
            </motion.svg>

            {/* Inner Focal Scene elements fading-in post-vortex */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.7, z: -100 }}
              animate={{ opacity: 1, scale: 1, z: 0 }}
              transition={{ delay: 0.3, duration: 0.6, type: 'spring', damping: 20 }}
              className="z-10 flex flex-col items-center gap-6 text-center"
            >
              {/* Futuristic Brand Token badge */}
              <div className="w-24 h-24 bg-brand-cream border-4 border-brand-sage rounded-3xl p-[3px] shadow-[6px_6px_0_0_var(--color-brand-brown)] transform rotate-3 tracking-tighter">
                <div className="w-full h-full bg-brand-brown rounded-[16px] flex items-center justify-center font-black text-2xl text-brand-cream border-2 border-dashed border-brand-sand/50 transform -rotate-3">
                  ⛵
                </div>
              </div>
              <div>
                <h1 className="text-5xl lg:text-6xl font-manga-title tracking-widest text-brand-cream animate-action-shake drop-shadow-[4px_4px_0px_#111A24]">
                  {label}
                </h1>
                <p className="text-xs font-mono text-brand-cream tracking-widest mt-3 uppercase font-bold bg-brand-brown/80 border border-brand-sage/30 px-3 py-1 inline-block">
                  DIVE SEQUENCE INITIATED · DESCENT AUTHORIZED
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 manga-speedlines opacity-10 pointer-events-none mix-blend-overlay"></div>
    </div>
  );
}
