import { useRef } from 'react'
import ScrollReveal from './ScrollReveal'
import AnimatedText from './AnimatedText'
import MangaCard from './MangaCard'
import boatImg from '../assets/manga_scene_boat.png'

/* ── Video URL ──────────────────────────────────────────────── */

export default function ChapterBoat() {

  const scrollToSection = (id) => {
    const sec = document.getElementById(id)
    if (sec) sec.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="chapter-02-gear-up"
      className="w-full border-b-8 border-brand-brown py-12 lg:py-16 px-4 lg:px-8 relative overflow-hidden"
    >

      {/* ── 1. Video background ────────────────────────────────── */}
     

      {/* ── 2. Manga overlay stack (on top of video) ───────────── */}
      {/* Warm cream tint so manga content reads clearly */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(var(--rgb-brand-cream), 0.95) 0%, rgba(var(--rgb-brand-cream), 0.85) 65%, rgba(var(--rgb-brand-sage), 0.95) 100%)', zIndex: 1 }}
      />
      {/* Paper noise texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          zIndex: 2,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />
      {/* Halftone manga dots */}
      <div className="absolute inset-0 manga-dots pointer-events-none opacity-30" style={{ zIndex: 2 }} />

      {/* ── 3. Chapter header ──────────────────────────────────── */}
      <div className="max-w-6xl mx-auto flex justify-between items-center border-b-4 border-brand-brown pb-3 mb-8 relative" style={{ zIndex: 10 }}>
        <div className="flex items-center gap-3">
          <span className="bg-brand-brown text-brand-cream font-manga-action text-xs px-3 py-1 select-none transform -skew-x-12 shadow-[2px_2px_0_0_var(--color-brand-sand)] animate-tag-slide">
            ⛵ THE HORIZON
          </span>
          <h3 className="font-manga-title text-2xl lg:text-3xl text-brand-brown tracking-wide leading-none">
            <AnimatedText text="BEYOND THE HORIZON" variant="stagger" staggerMs={40} delay={100} />
          </h3>
        </div>

        {/* ── Spec: badge link with arrow micro-animation ── */}
        <a
          href="#chapter-04-booking"
          className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs font-black text-brand-brown/80 hover:text-brand-sage transition-colors duration-200 group select-none"
        >
          ⚓ PADI Certified India
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
        </a>
      </div>

      {/* ── 4. Main content grid ───────────────────────────────── */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative" style={{ zIndex: 10 }}>

        {/* LEFT: Boat manga panel */}
        <div className="lg:col-span-5 flex justify-center order-1">
          <ScrollReveal animation="slide-right" delay="100ms">
            <MangaCard className="relative w-full max-w-[260px] lg:max-w-[320px] manga-border bg-brand-cream p-3 transform lg:rotate-1 hover:rotate-0 transition-transform duration-500 group">

              <div className="absolute -top-2 right-4 bg-brand-sage text-brand-cream border border-brand-brown px-2 py-0.5 font-manga-action text-3xs tracking-wider z-20 shadow-[1px_1px_0_0_var(--color-brand-brown)] transform rotate-3 select-none animate-ink-splash">
                ⛵ BOAT DECK
              </div>

              <div className="absolute -left-1 -bottom-1 bg-brand-cream border border-brand-brown px-2 py-1 z-20 font-manga-bubble font-bold text-3xs uppercase shadow-[2.5px_2.5px_0_0_var(--color-brand-brown)] transform -rotate-3 select-none text-center">
                <span className="block text-4xs text-brand-sand leading-none font-sans">ACTION</span>
                <span className="text-brand-sage text-xs font-manga-title tracking-wider leading-none font-sans">GIANT STRIDE!</span>
              </div>

              <div className="overflow-hidden border border-brand-brown relative aspect-[3/4] bg-brand-cream">
                <div className="absolute inset-0 bg-brand-brown opacity-[0.02] pointer-events-none z-10" />
                <img
                  src={boatImg}
                  alt="Instructor and diver geared up on dive boat"
                  className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-700"
                />
              </div>
            </MangaCard>
          </ScrollReveal>
        </div>

        {/* RIGHT: Content column */}
        <div className="lg:col-span-7 flex flex-col justify-center gap-6 order-2">

          {/* ── Spec: Hero headline style applied to manga card ── */}
          <ScrollReveal animation="slide-up" delay="0ms">
            <MangaCard className="bg-brand-cream border-4 border-brand-brown p-6 relative shadow-[6px_6px_0_0_var(--color-brand-brown)] manga-card manga-card-shimmer liquid-glass-dark transform -rotate-1">
              <div className="absolute inset-0 manga-speedlines opacity-10 pointer-events-none mix-blend-multiply" />

              {/* Spec: badge micro-link inside card */}
              <a
                href="#chapter-04-booking"
                className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-brand-sage hover:text-brand-brown transition-colors duration-200 mb-3 group"
              >
                ⚓ PADI Certified · Kovalam, Chennai
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </a>

              {/* Spec: h1 headline */}
              <h4 className="font-manga-title text-2xl lg:text-3xl text-brand-brown tracking-wide mb-2.5 border-b-2 border-brand-brown pb-1 leading-[1.15]">
                <AnimatedText text="BEYOND THE HORIZON" variant="glow" className="text-brand-brown" delay={150} />
              </h4>

              {/* Spec: subtext */}
              <p className="text-[13px] text-brand-brown/60 font-normal mb-3 font-sans">
                Chennai's premier PADI-certified dive centre.
              </p>

              <div className="space-y-3.5 text-sm lg:text-base font-black text-brand-brown leading-relaxed">
                <p className="font-manga-bubble">
                  Explore the hidden reefs and diverse marine life along Chennai's stunning coastline.
                </p>
                <div className="bg-brand-sand border-2 border-brand-brown pl-4 py-2 pr-2 my-4 shadow-[3px_3px_0_0_var(--color-brand-light-sage)] transform rotate-1">
                  <p className="text-sm lg:text-base font-black text-brand-brown italic animate-text-glitch">
                    Small groups and personal attention ensure every dive is a calm, focused adventure.
                  </p>
                </div>
                <p className="font-manga-bubble">
                  From your first breath underwater to professional certifications, we provide world-class diving experiences in the heart of Chennai.
                </p>
              </div>
            </MangaCard>
          </ScrollReveal>

          {/* Service mini-cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <ScrollReveal animation="slide-up" delay="150ms">
              <MangaCard className="bg-brand-sage hover:bg-[#2c5258] border-4 border-brand-brown p-5 shadow-[6px_6px_0_0_var(--color-brand-brown)] hover:shadow-[8px_8px_0_0_var(--color-brand-brown)] h-full flex flex-col justify-between manga-card manga-card-shimmer transform -rotate-1 hover:-translate-y-1 transition-all duration-300">
                <div className="border-b-2 border-brand-brown pb-1.5 mb-2">
                  <span className="text-brand-cream block font-manga-title text-xl leading-none">
                    <AnimatedText text="DISCOVER SCUBA" variant="rise" delay={200} />
                  </span>
                  <span className="text-2xs uppercase font-black text-brand-cream/85 mt-1.5 block tracking-widest leading-none">BEGINNER EXPERIENCE</span>
                </div>
                <p className="text-sm text-brand-cream font-black leading-relaxed flex-grow">
                  Start your journey with a safe, guided dive in the shallow reefs of Kovalam.
                </p>
              </MangaCard>
            </ScrollReveal>

            <ScrollReveal animation="slide-up" delay="250ms">
              <MangaCard className="bg-brand-light-sage hover:bg-[#b0e2da] border-4 border-brand-brown p-5 shadow-[6px_6px_0_0_var(--color-brand-brown)] hover:shadow-[8px_8px_0_0_var(--color-brand-brown)] h-full flex flex-col justify-between manga-card manga-card-shimmer transform rotate-1 hover:-translate-y-1 transition-all duration-300">
                <div className="border-b-2 border-brand-brown pb-1.5 mb-2">
                  <span className="text-brand-brown block font-manga-title text-xl leading-none">
                    <AnimatedText text="PADI COURSES" variant="rise" delay={300} />
                  </span>
                  <span className="text-2xs uppercase font-black text-brand-brown/85 mt-1.5 block tracking-widest leading-none">GLOBAL CERTIFICATION</span>
                </div>
                <p className="text-sm text-brand-brown font-black leading-relaxed flex-grow">
                  Get certified globally with world-class instruction.
                </p>
              </MangaCard>
            </ScrollReveal>

          </div>

          {/* ── Spec: CTA button with fill + arrow micro-animations ── */}
          <ScrollReveal animation="blur-in" delay="350ms">
            <div className="flex justify-start lg:justify-end mt-2 gap-3 items-center flex-wrap">

              {/* Primary manga CTA — ink-stamp style, hover lift */}
              <button
                onClick={() => scrollToSection('chapter-03-reef-descent')}
                className="group inline-flex items-center gap-2 bg-brand-brown text-brand-cream border-2 border-brand-brown px-8 py-3.5 font-manga-title text-xl tracking-widest shadow-[3px_3px_0_0_var(--color-brand-light-sage)] manga-btn focus:outline-none cursor-pointer hover:bg-brand-sage hover:border-brand-sage transition-colors duration-200"
              >
                DIVE IN
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </button>

              {/* Spec: secondary outline CTA — rounded pill, fill on hover */}
              <a
                href="#chapter-04-booking"
                className="group inline-flex items-center gap-2 text-[13px] font-medium text-brand-brown border-2 border-brand-brown rounded-full px-5 py-2.5 hover:bg-brand-brown hover:text-brand-cream transition-all duration-200 font-sans"
              >
                Book a free session
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </a>

            </div>
          </ScrollReveal>

        </div>
      </div>


    </section>
  )
}
