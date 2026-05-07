import React from 'react';
import { useOcean } from '../core/OceanEngine';

const Section = ({ children, targetDepth, className = "" }) => {
  const ocean = useOcean();
  const { depth = 0, pressure = 0 } = ocean || {};
  
  // Calculate relative distance to this section's "virtual depth"
  // If targetDepth is -200, and current depth is 200, we are at the section.
  const distance = Math.abs(depth + targetDepth);
  const isActive = distance < 300;
  const opacity = Math.max(0, 1 - distance / 400);
  const translateY = (depth + targetDepth) * 0.5; // Parallax

  const scale = 1 - pressure * 0.1; 
  const blur = Math.min(10, distance / 50); // Blur increases with distance

  return (
    <section 
      className={`min-h-screen flex flex-col items-center justify-center relative px-6 py-24 ${className}`}
      style={{
        opacity: opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        filter: `blur(${blur}px)`,
        pointerEvents: opacity > 0.5 ? 'auto' : 'none',
        transition: 'opacity 0.5s ease-out, transform 0.8s cubic-bezier(0.2, 0, 0.2, 1), filter 0.5s ease-out'
      }}
    >
      <div className="max-w-5xl w-full">
        {children}
      </div>
    </section>
  );
};

export default Section;
