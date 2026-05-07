import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';

const OceanContext = createContext();

export const OceanProvider = ({ children }) => {
  const [state, setState] = useState({
    depth: 0,
    velocity: 0,
    pressure: 0,
    cursor: { x: 0, y: 0, targetX: 0, targetY: 0 },
    isHovering: false,
    ripples: [],
    lightIntensity: 1
  });

  const lenisRef = useRef(null);
  const rafRef = useRef(null);
  const cursorRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    // Initialize Lenis
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    const update = (time) => {
      // Lenis RAF (time is already in ms)
      lenisRef.current.raf(time);

      // Lerp cursor (Using refs to avoid re-renders in RAF)
      cursorRef.current.x += (cursorRef.current.targetX - cursorRef.current.x) * 0.1;
      cursorRef.current.y += (cursorRef.current.targetY - cursorRef.current.y) * 0.1;

      // Update CSS variables for high-performance cursor tracking
      document.documentElement.style.setProperty('--mouse-x', `${cursorRef.current.x}px`);
      document.documentElement.style.setProperty('--mouse-y', `${cursorRef.current.y}px`);

      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);

    // Scroll listener
    lenisRef.current.on('scroll', ({ scroll, limit, velocity }) => {
      const progress = scroll / limit;
      const depth = progress * 1000;
      const pressure = progress;
      const lightIntensity = Math.max(0.1, 1 - progress * 0.9);

      // We only update depth-related state on scroll
      setState(prev => ({
        ...prev,
        depth,
        velocity: Math.abs(velocity),
        pressure,
        lightIntensity
      }));
    });

    // Mouse move listener
    const handleMouseMove = (e) => {
      cursorRef.current.targetX = e.clientX;
      cursorRef.current.targetY = e.clientY;
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.closest('button, a, .interactive')) {
        setState(prev => ({ ...prev, isHovering: true }));
      } else {
        setState(prev => ({ ...prev, isHovering: false }));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      if (lenisRef.current) lenisRef.current.destroy();
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <OceanContext.Provider value={state}>
      {children}
    </OceanContext.Provider>
  );
};

export const useOcean = () => useContext(OceanContext);
