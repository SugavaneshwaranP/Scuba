import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MangaReader from './components/MangaReader'
import MangaNavigation from './components/MangaNavigation'
import DiveGearVortex from './components/DiveGearVortex'

function App() {
  const [transitionState, setTransitionState] = useState({
    active: false,
    type: null,
    label: '',
    targetId: null
  })

  // Lock body scroll when ANY transition is active
  useEffect(() => {
    if (transitionState.active) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [transitionState.active])

  // Expose global trigger function
  useEffect(() => {
    window.triggerMangaTransition = (id, label = 'LOADING...', type = 'torn-paper') => {
      if (transitionState.active) return
      setTransitionState({ active: true, type, label, targetId: id })
    }

    return () => {
      delete window.triggerMangaTransition
    }
  }, [transitionState.active])

  // Handle Torn-Paper timing internally (since it's rendered inline)
  useEffect(() => {
    if (transitionState.active && transitionState.type === 'torn-paper') {
      const snapTimer = setTimeout(() => {
        const el = document.getElementById(transitionState.targetId)
        if (el) el.scrollIntoView({ behavior: 'auto' })
      }, 550)

      const endTimer = setTimeout(() => {
        setTransitionState({ active: false, type: null, label: '', targetId: null })
      }, 1450)

      return () => {
        clearTimeout(snapTimer)
        clearTimeout(endTimer)
      }
    }
  }, [transitionState])

  // Vortex Component Callbacks
  const handleVortexSnap = () => {
    if (transitionState.targetId) {
      const el = document.getElementById(transitionState.targetId)
      if (el) el.scrollIntoView({ behavior: 'auto' })
    }
  }

  const handleVortexComplete = () => {
    setTransitionState({ active: false, type: null, label: '', targetId: null })
  }

  return (
    <div className="manga-paper min-h-screen font-sans text-brand-brown flex flex-col selection:bg-brand-sage selection:text-brand-cream relative">
      {/* Background Screentone Dots - Global overlay */}
      <div className="absolute inset-0 manga-dots pointer-events-none z-0 opacity-80"></div>

      {/* ── NFT-spec: Fixed full-screen texture overlay (mix-blend-mode: lighten) ── */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 55,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='t'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23t)'/%3E%3C/svg%3E\")",
          backgroundSize: 'cover',
          mixBlendMode: 'lighten',
          opacity: 0.04,
        }}
      />

      {/* Floating Navigation Bar (fixed position, auto-hides at footer) */}
      <MangaNavigation />

      {/* Main Container - Full Bleed Edge-To-Edge */}
      <main className="relative z-10 w-full flex-grow flex flex-col">
        
        {/* Modular Manga Panel Deck Stack */}
        <MangaReader />

      </main>

      {/* Footer styled as physical book page edge */}
      <footer className="bg-brand-brown text-brand-cream border-t-8 border-brand-brown py-6 px-6 relative z-10 shadow-[0_-4px_0_0_var(--color-brand-brown)]">
        <div className="absolute inset-0 manga-speedlines opacity-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 select-none text-center sm:text-left">
          
          <div className="space-y-1">
            <h4 className="font-manga-title text-lg tracking-wider text-brand-cream leading-none">
              AQUAMARINE DIVE COMICS
            </h4>
            <p className="font-manga-bubble text-4xs text-brand-light-sage">
              "We tell the stories of the deep ocean, one bubble at a time."
            </p>
          </div>

          <div className="text-center sm:text-right space-y-0.5">
            <span className="block text-4xs uppercase tracking-widest text-brand-sand">SHONEN DIVER PUBLISHING LTD.</span>
            <span className="block text-5xs font-mono text-brand-light-sage opacity-75">
              © 2026 Aquamarine Dive Shop. All Manga Chronicles Reserved.
            </span>
          </div>

        </div>
      </footer>

      {/* GLOBAL CINEMATIC TRANSITION RENDERER */}
      
      {/* 1. TORN-PAPER TRANSITION (Chapter 1) */}
      <AnimatePresence>
        {transitionState.active && transitionState.type === 'torn-paper' && (
          <div className="fixed inset-0 z-[999] flex flex-col justify-between pointer-events-none select-none">
            {/* Top Torn-Paper Sheet */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 95 }}
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 88%, 95% 86%, 92% 89%, 85% 83%, 78% 87%, 72% 82%, 65% 88%, 58% 84%, 50% 89%, 43% 83%, 35% 87%, 28% 81%, 20% 88%, 12% 84%, 5% 89%, 0 82%)" }}
              className="w-full h-[55vh] bg-brand-brown text-brand-cream flex flex-col justify-end pb-12 items-center pointer-events-auto shadow-[0_12px_24px_rgba(0,0,0,0.5)] border-b-4 border-brand-sage relative"
            >
              <div className="absolute inset-0 manga-dots opacity-20 pointer-events-none"></div>
              <div className="absolute inset-0 manga-speedlines opacity-10 pointer-events-none"></div>
              
              <motion.div 
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.15 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <span className="bg-brand-cream text-brand-brown px-3.5 py-1.5 font-manga-bubble text-2xs tracking-widest font-extrabold transform -rotate-1 shadow-[3px_3px_0_0_var(--color-brand-sand)]">
                  SHONEN DIVER EXPEDITION
                </span>
                <h2 className="font-manga-title text-5xl lg:text-6xl tracking-widest text-brand-cream mt-4 animate-action-shake drop-shadow-[4px_4px_0px_#111A24]">
                  {transitionState.label}
                </h2>
              </motion.div>
            </motion.div>

            {/* Bottom Torn-Paper Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 95 }}
              style={{ clipPath: "polygon(0 18%, 5% 11%, 12% 16%, 20% 12%, 28% 19%, 35% 13%, 43% 17%, 50% 11%, 58% 16%, 65% 12%, 72% 18%, 78% 13%, 85% 17%, 92% 11%, 95% 14%, 100% 12%, 100% 100%, 0 100%)" }}
              className="w-full h-[55vh] bg-brand-brown text-brand-cream flex flex-col justify-start pt-12 items-center pointer-events-auto shadow-[0_-12px_24px_rgba(0,0,0,0.5)] border-t-4 border-brand-sage relative"
            >
              <div className="absolute inset-0 manga-dots opacity-20 pointer-events-none"></div>
              <div className="absolute inset-0 manga-speedlines opacity-10 pointer-events-none"></div>

              <motion.div 
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
                className="relative z-10 text-center flex flex-col items-center"
              >
                <span className="text-2xs font-mono tracking-[0.25em] text-brand-sand block mb-3 font-extrabold uppercase">
                  COMPILING AIR TENSION PARAMETERS
                </span>
                <div className="w-56 h-1.5 bg-brand-cream/20 overflow-hidden relative rounded-full border border-brand-sage/35">
                  <motion.div
                    initial={{ left: "-100%" }}
                    animate={{ left: "100%" }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                    className="absolute top-0 bottom-0 w-28 bg-brand-light-sage"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. DIVE GEAR VORTEX TRANSITION (Chapter 2) */}
      <AnimatePresence>
        {transitionState.active && transitionState.type === 'vortex' && (
          <DiveGearVortex 
            label={transitionState.label} 
            onSnap={handleVortexSnap} 
            onComplete={handleVortexComplete} 
          />
        )}
      </AnimatePresence>

    </div>
  )
}

export default App
