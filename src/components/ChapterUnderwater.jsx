import React, { useRef, useEffect } from 'react';
import AnimatedText from './AnimatedText';
import ToonhubCarousel from './ToonhubCarousel';

// Smooth scroll helper
const scrollToSection = (id) => {
  const sec = document.getElementById(id);
  if (sec) sec.scrollIntoView({ behavior: 'smooth' });
};

export default function ChapterUnderwater() {
  const sectionRef = useRef(null);

  return (
    <section
      id="chapter-03-reef-descent"
      ref={sectionRef}
      className="relative w-full flex flex-col overflow-hidden bg-gradient-to-b from-[#1C363D] via-[#122227] to-[#0A1417] border-b-8 border-brand-brown py-12 px-1"
    >
      {/* ── Chapter header ── */}
      <div className="w-full max-w-6xl mx-auto flex justify-between items-center border-b-4 border-brand-light-sage/30 pb-2 pt-6 px-4 lg:px-8 relative z-10">
        <div className="flex items-center gap-2">
          <span className="bg-brand-sage text-brand-cream font-manga-action text-3xs px-2.5 py-0.5 select-none shadow-[1.5px_1.5px_0_0_var(--color-brand-light-sage)] animate-tag-slide">
            🌊 THE DEEP
          </span>
          <h3 className="font-manga-title text-xl lg:text-3xl text-brand-cream tracking-wide leading-none">
            <AnimatedText text="AQUAMARINE EXPEDITIONS" variant="stagger" staggerMs={35} delay={100} />
          </h3>
        </div>
        <span className="font-mono text-3xs text-brand-light-sage/75 uppercase tracking-wider hidden sm:inline font-bold">
          Click arrows to explore
        </span>
      </div>

      {/* ── TOONHUB Carousel ── */}
      <ToonhubCarousel />

    </section>
  );
}
