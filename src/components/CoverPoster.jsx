import { useState } from 'react'
import { motion } from 'framer-motion'
import AnimatedText from './AnimatedText'
import MangaCard from './MangaCard'
import BoomerangVideoBg from './BoomerangVideoBg'
import coverImg from '../assets/manga_cover_art.png'

const BG_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_131941_d136af49-e243-493a-be14-6ff3f24e09e6.mp4'

export default function CoverPoster() {
  const [copiedText, setCopiedText] = useState(false)

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopiedText(true)
    setTimeout(() => setCopiedText(false), 2000)
  }

  // Smooth scroll helper
  const scrollToNextSection = () => {
    if (window.triggerMangaTransition) {
      window.triggerMangaTransition('chapter-01-briefing', 'LOADING THE ORIGINS...')
    } else {
      const nextSec = document.getElementById('chapter-01-briefing')
      if (nextSec) {
        nextSec.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  // Orchestrated motion configuration for breathtaking entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.1,
      }
    }
  }

  const bannerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 22, stiffness: 150 }
    }
  }

  const titleBlockVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', damping: 18, stiffness: 100 }
    }
  }

  const leftCardVariants = {
    hidden: { opacity: 0, x: -50, rotate: -4 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: -1,
      transition: { type: 'spring', damping: 18, stiffness: 85 }
    }
  }

  const middleCardVariants = {
    hidden: { opacity: 0, y: 60, rotate: -3, scale: 0.92 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 1,
      scale: 1,
      transition: { type: 'spring', damping: 15, stiffness: 75 }
    }
  }

  const rightCardVariants = {
    hidden: { opacity: 0, x: 50, rotate: 3 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 1,
      transition: { type: 'spring', damping: 18, stiffness: 85 }
    }
  }

  const textItemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 20, stiffness: 100 }
    }
  }

  const promptVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', damping: 15, stiffness: 100, delay: 0.4 }
    }
  }

  return (
    <section id="chapter-00-cover" className="w-full bg-gradient-cream border-b-8 border-brand-brown pt-24 pb-12 px-4 lg:px-8 relative overflow-hidden">

      {/* ── Boomerang video background (spec: forward→backward canvas loop) ── */}
      <BoomerangVideoBg
        src={BG_VIDEO}
        className="absolute inset-0 w-full h-full"
      />
      {/* Warm manga cream overlay so poster content stays readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(var(--rgb-brand-cream),0.78)', zIndex: 1 }}
      />

      {/* Background Screentone Dots */}
      <div className="absolute inset-0 manga-dots pointer-events-none opacity-30" style={{ zIndex: 2 }} />


      {/* Top Banner Meta */}
      <motion.div 
        variants={bannerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto flex justify-between items-center border-b-4 border-brand-brown pb-2 mb-8 relative z-10"
      >
        <span className="font-bold text-xs uppercase tracking-widest text-brand-sand animate-pulse">WEEKLY SHONEN DIVER</span>
        <span className="bg-brand-brown text-brand-cream text-xs font-bold px-2.5 py-0.5 transform -skew-x-12 select-none">
          SPECIAL CHRONICLES
        </span>
      </motion.div>

      {/* Main Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10"
      >
        
        {/* LEFT COLUMN: Title & Core Stamp Briefing (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-center gap-6 relative z-20">
          <motion.div variants={titleBlockVariants} className="relative select-none">
            {/* Ink-outlined layered background shadows for maximum legibility */}
            <div 
              className="absolute top-1.5 left-1.5 font-manga-title text-7xl lg:text-8xl tracking-tighter text-transparent pointer-events-none select-none opacity-80"
              style={{ WebkitTextStroke: '3px var(--color-brand-brown)' }}
            >
              AQUAMARINE
            </div>
            <div 
              className="absolute -top-1 -left-1 font-manga-title text-7xl lg:text-8xl tracking-tighter text-transparent pointer-events-none select-none opacity-60"
              style={{ WebkitTextStroke: '1.5px var(--color-brand-light-sage)' }}
            >
              AQUAMARINE
            </div>
            <h2 className="relative font-manga-title text-7xl lg:text-8xl tracking-tighter text-brand-brown leading-none filter drop-shadow-[4px_4px_0px_var(--color-brand-cream)] text-shimmer">
              <AnimatedText text="AQUAMARINE" variant="stagger" staggerMs={60} delay={200} />
            </h2>
            <span className="absolute -right-2 -bottom-2 bg-brand-sage text-brand-cream border-2 border-brand-brown px-3 py-1 font-manga-action text-xs rounded-full shadow-[2.5px_2.5px_0_0_var(--color-brand-brown)] transform rotate-6 animate-heartbeat">
              DIVE CHRONICLES!
            </span>
          </motion.div>

          <motion.div variants={textItemVariants} className="border-l-4 border-brand-brown pl-4 py-1.5 bg-brand-light-sage/20 pr-2">
            <p className="font-manga-bubble text-base lg:text-lg font-extrabold italic leading-relaxed text-brand-brown">
              <AnimatedText text={`"When you submerge, the noise of the world fades. In the silent blue, your epic journey begins..."`} variant="typewriter" staggerMs={25} />
            </p>
          </motion.div>

          {/* Contact details stamp - Styled in Sand (B3AA8B) */}
          <motion.div variants={leftCardVariants}>
            <MangaCard className="bg-brand-sand border-4 border-brand-brown p-5 relative shadow-[6px_6px_0_0_var(--color-brand-brown)] manga-card manga-card-shimmer">
              <div className="absolute inset-0 manga-speedlines opacity-30 pointer-events-none"></div>
              
              <h3 className="font-manga-title text-2xl border-b-2 border-brand-brown pb-1.5 mb-3 flex items-center justify-between">
                <AnimatedText text="BASE OF OPERATIONS" variant="glow" className="text-brand-brown" />
                <span className="text-2xs font-mono text-brand-brown/70">EST: 2024</span>
              </h3>

              <div className="space-y-3 font-extrabold text-sm text-brand-brown">
                <div className="flex items-start gap-2.5">
                  <span className="text-lg leading-none">📍</span>
                  <div>
                    <span className="text-2xs uppercase text-brand-brown/70 block leading-none mb-0.5 font-extrabold">HQ LOCATION</span>
                    <a 
                      href="https://maps.google.com/?q=Kovalam,+Chennai,+TN" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:underline hover:text-brand-cream text-brand-brown font-black text-sm"
                    >
                      Premiere Dive Center<br/>Kovalam, Chennai, TN
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="text-lg leading-none">📞</span>
                  <div className="w-full">
                    <span className="text-2xs uppercase text-brand-brown/70 block leading-none mb-0.5 font-extrabold">DIRECT LINE</span>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => copyToClipboard('+91 97911 96774')}
                        className="font-black text-base hover:text-brand-cream flex items-center gap-1 focus:outline-none transition-colors"
                        title="Click to copy number"
                      >
                        +91 97911 96774
                        <span className="text-xs text-brand-brown/70">📋</span>
                      </button>
                      {copiedText && (
                        <span className="bg-brand-sage text-brand-cream text-2xs px-1.5 py-0.5 rounded font-mono animate-pulse">
                          COPIED!
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="text-lg leading-none">⚓</span>
                  <div>
                    <span className="text-2xs uppercase text-brand-brown/70 block leading-none mb-0.5 font-extrabold">AQUA MARINE DIVE & TOUR CO.</span>
                    <span className="font-extrabold">Established 2024</span>
                  </div>
                </div>
              </div>
            </MangaCard>
          </motion.div>
        </div>

        {/* MIDDLE COLUMN: Giant Manga Cover Art (4 Cols) */}
        <div className="lg:col-span-4 flex items-center justify-center relative z-10">
          <motion.div variants={middleCardVariants} className="w-full">
            <MangaCard className="relative w-full max-w-[280px] lg:max-w-none manga-border bg-brand-cream p-3 group">
              
              <div className="absolute top-4 left-4 bg-brand-brown text-brand-cream font-manga-action text-3xs px-2.5 py-0.5 z-20 shadow-[1px_1px_0_0_#FFFDD0] border border-brand-brown transform -rotate-6 animate-ink-splash">
                NEW RELEASE
              </div>

              <div className="absolute bottom-6 right-6 bg-brand-light-sage text-brand-brown font-manga-title text-base px-3 py-1 z-20 border-2 border-brand-brown shadow-[2.5px_2.5px_0_0_var(--color-brand-brown)] transform rotate-3 flex items-center gap-0.5 select-none">
                <span>¥480</span>
                <span className="text-3xs font-mono">TAX IN</span>
              </div>

              {/* Image Container */}
              <div className="overflow-hidden border-2 border-brand-brown relative aspect-[3/4]">
                <div className="absolute inset-0 bg-brand-brown opacity-[0.02] pointer-events-none z-10"></div>
                <img 
                  src={coverImg} 
                  alt="Aquamarine Dive Shop Cover Poster" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                />
              </div>

              {/* Barcode */}
              <div className="mt-3 flex justify-between items-center border-t border-brand-brown pt-2 text-3xs font-mono text-brand-sand">
                <span>INDEX: 4 901234 567890</span>
                <div className="flex gap-0.5 items-stretch h-4 opacity-80">
                  <div className="w-0.5 bg-brand-brown"></div>
                  <div className="w-1 bg-brand-brown"></div>
                  <div className="w-0.5"></div>
                  <div className="w-0.5 bg-brand-brown"></div>
                  <div className="w-1.5 bg-brand-brown"></div>
                </div>
              </div>
            </MangaCard>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Courses Index & Scroll Prompt (3 Cols) - Styled with Light Sage (D4D9B2) */}
        <div className="lg:col-span-3 flex flex-col justify-center gap-6">
          <motion.div variants={rightCardVariants}>
            <MangaCard className="bg-brand-light-sage border-4 border-brand-brown p-5 relative shadow-[6px_6px_0_0_var(--color-brand-brown)] flex flex-col justify-between manga-card manga-card-shimmer animate-neon-pulse">
              <div className="absolute inset-0 manga-dots opacity-20 pointer-events-none"></div>
              
              <div>
                <div className="border-b-2 border-brand-brown pb-2 mb-4 text-center">
                  <h3 className="font-manga-title text-2xl tracking-wider text-brand-brown">
                    <AnimatedText text="EXPEDITIONS" variant="stagger" staggerMs={50} delay={400} />
                  </h3>
                  <span className="text-2xs uppercase tracking-widest font-black text-brand-brown/75 block">PADI CERTIFIED · EXPERT GUIDES</span>
                </div>

                <div className="space-y-4">
                  <div className="block w-full text-left group">
                    <div className="flex items-center gap-2 font-manga-title text-lg text-brand-brown">
                      <span className="text-xl leading-none">🌊</span>
                      <span className="leading-none mt-1">DISCOVER SCUBA DIVING</span>
                    </div>
                    <p className="text-2xs font-extrabold uppercase text-brand-brown/80 tracking-wider leading-none mt-1 ml-7">Introductory dive experience</p>
                  </div>

                  <div className="block w-full text-left group">
                    <div className="flex items-center gap-2 font-manga-title text-lg text-brand-brown">
                      <span className="text-xl leading-none">🤿</span>
                      <span className="leading-none mt-1">PADI CERTIFICATION</span>
                    </div>
                    <p className="text-2xs font-extrabold uppercase text-brand-brown/80 tracking-wider leading-none mt-1 ml-7">Open water & advanced</p>
                  </div>

                  <div className="block w-full text-left group">
                    <div className="flex items-center gap-2 font-manga-title text-lg text-brand-brown">
                      <span className="text-xl leading-none">🐠</span>
                      <span className="leading-none mt-1">FUN DIVES</span>
                    </div>
                    <p className="text-2xs font-extrabold uppercase text-brand-brown/80 tracking-wider leading-none mt-1 ml-7">Guided reef exploration</p>
                  </div>

                  <div className="block w-full text-left group">
                    <div className="flex items-center gap-2 font-manga-title text-lg text-brand-brown">
                      <span className="text-xl leading-none">🫧</span>
                      <span className="leading-none mt-1">PRO SNORKELLING</span>
                    </div>
                    <p className="text-2xs font-extrabold uppercase text-brand-brown/80 tracking-wider leading-none mt-1 ml-7">Surface marine encounters</p>
                  </div>
                </div>
              </div>

              {/* Eco Conservation stamp */}
              <div className="bg-brand-sage text-brand-cream border border-dashed border-brand-brown p-3 mt-5 text-center transform -rotate-2 relative shadow-[2px_2px_0_0_var(--color-brand-brown)]">
                <div className="font-manga-action text-brand-brown text-xs uppercase leading-none">COMMITMENT</div>
                <div className="font-manga-title text-xl text-brand-cream leading-none mt-1">ECO CONSERVATION</div>
              </div>
            </MangaCard>
          </motion.div>

          {/* Interactive Scroll prompt */}
          <motion.div variants={promptVariants}>
            <div className="relative flex flex-col items-center select-none cursor-pointer animate-gentle-float" onClick={scrollToNextSection}>
              <div className="bg-brand-cream border-2 border-brand-brown rounded-2xl py-2.5 px-4 text-xs font-bold text-center leading-normal shadow-[3px_3px_0_0_var(--color-brand-brown)] max-w-[210px] manga-btn animate-pulse-glow">
                <span className="font-manga-bubble text-brand-brown text-base font-extrabold tracking-widest">
                  START JOURNEY →
                </span>
              </div>
              <div className="w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-brand-brown mt-1"></div>
            </div>
          </motion.div>
        </div>

      </motion.div>

    </section>
  )
}
