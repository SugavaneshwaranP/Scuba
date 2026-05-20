import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DiverShieldScene({ onSnap, onComplete, label }) {
  const [animationStage, setAnimationStage] = useState('paper-fold'); // 'paper-fold' | 'screen-cover' | 'reveal'

  // Timeline manager syncing step sequences to transition between chapters
  useEffect(() => {
    // 1. Snap to the target section right when the paper covers the screen
    const coverTimer = setTimeout(() => {
      setAnimationStage('screen-cover');
      if (onSnap) onSnap(); 
    }, 1500);

    // 2. Reveal the new section (Chapter 4)
    const revealTimer = setTimeout(() => {
      setAnimationStage('reveal');
    }, 2800);

    // 3. Complete and unmount the transition component
    const endTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3600);

    return () => {
      clearTimeout(coverTimer);
      clearTimeout(revealTimer);
      clearTimeout(endTimer);
    };
  }, [onSnap, onComplete]);

  return (
    <div className="fixed inset-0 z-[999] pointer-events-auto flex items-center justify-center overflow-hidden font-sans select-none">
      
      {/* BACKGROUND LAYER - Darkens the current page during unfold */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-[#005588]/60 backdrop-blur-sm z-0" 
      />

      {/* ---------------- SCENE LAYER 1 & 2: THE CRUMPLED PAPER SHEETS ---------------- */}
      <AnimatePresence>
        {animationStage !== 'reveal' && (
          <div className="absolute inset-0 w-full h-full flex items-center justify-center z-20 pointer-events-none">
            
            {/* OUTER ICE-BLUE WRAPPING PAPER SHEET */}
            <motion.div
              initial={{ scale: 0.2, rotate: -15, opacity: 0 }}
              animate={animationStage === 'paper-fold' ? {
                scale: [0.2, 0.75, 0.7],
                rotate: [-15, 5, 0],
                opacity: 1
              } : {
                scale: 4,
                rotate: 45,
                opacity: [1, 1, 0]
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: animationStage === 'paper-fold' ? 1.2 : 0.9,
                ease: [0.76, 0, 0.24, 1]
              }}
              className="absolute w-[600px] h-[600px] bg-[#D2E9F9] shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex items-center justify-center border-4 border-[#005588]"
              style={{
                // High fidelity procedural vector clip-paths generating the asymmetrical torn paper edges
                clipPath: 'polygon(20% 5%, 85% 10%, 95% 55%, 75% 95%, 40% 90%, 5% 50%)',
                // Embedded SVG micro displacement matrix overlay mimicking organic crumpled highlights
                backgroundImage: `radial-gradient(circle at 30% 20%, rgba(255,255,255,0.9) 0%, transparent 60%), 
                                  repeating-linear-gradient(45deg, rgba(0,85,136,0.06) 0px, rgba(0,85,136,0.06) 2px, transparent 2px, transparent 10px)`
              }}
            >
              
              {/* INNER DEEP-BLUE CORE CRUMPLED PAPER PATCH */}
              <motion.div
                animate={animationStage === 'paper-fold' ? {
                  scale: [0.9, 1.05, 1],
                  rotate: [0, -5, 0]
                } : {
                  scale: 1.2,
                  rotate: -20
                }}
                className="w-[85%] h-[85%] bg-[#005588] shadow-[inset_0_0_40px_rgba(0,0,0,0.7)] relative flex items-center justify-center border-2 border-[#41C5E8]"
                style={{
                  clipPath: 'polygon(15% 12%, 80% 8%, 90% 65%, 65% 88%, 30% 80%, 8% 45%)',
                  // Dense crumpled contrast simulation texture
                  backgroundImage: `radial-gradient(circle at 70% 80%, rgba(0,0,0,0.4) 0%, transparent 50%),
                                    repeating-linear-gradient(-45deg, rgba(65,197,232,0.06) 0px, rgba(65,197,232,0.06) 1px, transparent 1px, transparent 6px)`
                }}
              >
                {/* Micro Realistic Crease Lines */}
                <div className="absolute inset-0 opacity-20 border-2 border-[#41C5E8] transform scale-90 rotate-12 pointer-events-none" style={{ clipPath: 'polygon(10% 40%, 90% 20%, 50% 80%)' }} />
                <div className="absolute inset-0 opacity-30 border-2 border-[#2F92D0] transform scale-75 -rotate-45 pointer-events-none" style={{ clipPath: 'polygon(30% 10%, 80% 90%, 20% 70%)' }} />
 
                {/* Transition Label Text inside the paper */}
                <div className="absolute z-10 flex flex-col items-center transform -rotate-12">
                   <span className="font-manga-title text-[#D2E9F9] text-4xl lg:text-5xl tracking-widest drop-shadow-[3px_3px_0px_#003355] text-center px-4 leading-none">
                     {label || "DESTINATION AHEAD"}
                   </span>
                   <div className="w-20 h-1.5 bg-[#41C5E8] mt-3 shadow-[1.5px_1.5px_0_0_#2F92D0]"></div>
                </div>
 
              </motion.div>
 
            </motion.div>
 
            {/* FULL SCREEN COVER INTERMEDIATE FLASH BACKGROUND SHEET */}
            {animationStage === 'screen-cover' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 w-full h-full bg-[#005588] z-10 flex items-center justify-center border-y-8 border-[#41C5E8]"
                style={{
                  backgroundImage: `repeating-linear-gradient(22.5deg, rgba(65,197,232,0.03) 0px, rgba(65,197,232,0.03) 4px, transparent 4px, transparent 8px)`
                }}
              >
                <div className="absolute inset-0 manga-speedlines opacity-40"></div>
                <div className="absolute inset-0 manga-dots opacity-20"></div>
                
                {/* Loading indicator during cover */}
                <span className="font-mono text-[#D2E9F9] text-xs font-bold tracking-[0.3em] uppercase bg-[#005588]/80 border border-[#41C5E8]/35 px-5 py-3 shadow-[3px_3px_0_0_#2F92D0]">
                  Synchronizing Views...
                </span>
              </motion.div>
            )}
 
          </div>
        )}
      </AnimatePresence>
 
      {/* Screen flash on reveal (Ice blue reveal transition!) */}
      <AnimatePresence>
        {animationStage === 'reveal' && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 bg-[#D2E9F9] z-50 pointer-events-none"
          >
             <div className="absolute inset-0 manga-speedlines opacity-50 scale-150 animate-spin-slow"></div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
