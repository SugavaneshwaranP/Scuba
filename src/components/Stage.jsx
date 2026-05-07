import React, { useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import OceanDots from './OceanDots';

// Persistent fixed-position scene that morphs continuously with scroll progress.
// The diver becomes the page's protagonist: it drifts, descends, scales and tints
// as the user scrolls through the activity sections — like a single anime.js timeline
// driven by scrollYProgress.
export default function Stage() {
  const { scrollYProgress } = useScroll();

  // Diver path through the 5 scenes (0..1 across whole page).
  // x: 0 = center, +/- value = right/left in vw units
  const diverX = useTransform(
    scrollYProgress,
    [0, 0.18, 0.4, 0.62, 0.82, 1],
    ['18vw', '0vw', '-12vw', '0vw', '8vw', '0vw']
  );
  const diverY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ['0vh', '4vh', '8vh', '6vh', '-4vh', '-12vh']
  );
  const diverScale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [1.05, 1, 0.85, 0.7, 0.85, 1.05]
  );
  const diverRotate = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0, -3, -8, -2, 4, 0]
  );
  const diverHue = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7, 1],
    [
      'brightness(1) saturate(1) hue-rotate(0deg)',
      'brightness(0.85) saturate(1.1) hue-rotate(-10deg)',
      'brightness(0.6) saturate(1.3) hue-rotate(-25deg)',
      'brightness(0.9) saturate(1.1) hue-rotate(-5deg)',
    ]
  );

  // Vignette deepens with depth
  const vigOpacity = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [0.4, 0.7, 0.85, 0.5]);

  // Mouse parallax on diver
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 35, damping: 18 });
  const sy = useSpring(my, { stiffness: 35, damping: 18 });
  useEffect(() => {
    const onMove = (e) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 18);
      my.set((e.clientY / window.innerHeight - 0.5) * 18);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  // Bubble continuous loop, count grows with depth via key=section
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#02060f]">
      {/* Animated dot field — drives the whole "anime engine" feel */}
      <OceanDots spacing={28} baseSize={1.1} />

      {/* Persistent diver protagonist */}
      <motion.div
        style={{ x: diverX, y: diverY, scale: diverScale, rotate: diverRotate }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <motion.div
          style={{ x: sx, y: sy, filter: diverHue }}
          className="w-[80vmin] h-[80vmin] relative"
        >
          <img
            src="/cinematic-hero.png"
            alt=""
            className="w-full h-full object-contain mix-blend-screen opacity-90"
          />
        </motion.div>
      </motion.div>

      {/* Bubbles trailing from diver area */}
      <div className="absolute inset-0">
        {[...Array(24)].map((_, i) => {
          const size = 1 + Math.random() * 3;
          return (
            <motion.div
              key={i}
              initial={{ x: `${45 + Math.random() * 30}%`, y: '105%', opacity: 0 }}
              animate={{
                y: '-15%',
                opacity: [0, 0.55, 0.55, 0],
                x: `${45 + Math.random() * 30 + Math.sin(i) * 2}%`,
              }}
              transition={{
                duration: 7 + Math.random() * 8,
                repeat: Infinity,
                delay: Math.random() * 6,
                ease: 'linear',
              }}
              style={{ width: size, height: size }}
              className="absolute bg-white rounded-full blur-[1px]"
            />
          );
        })}
      </div>

      {/* Edge vignette that deepens with descent */}
      <motion.div
        style={{ opacity: vigOpacity }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,15,0.6)_55%,#02060f_100%)]"
      />
    </div>
  );
}
