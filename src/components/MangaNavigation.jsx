import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function MangaNavigation() {
  const [activeSection, setActiveSection] = useState('cover')
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') || localStorage.getItem('theme') === 'dark'
    }
    return false
  })

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  // Listen to scroll position to update active section + hide at footer
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250

      const ch1 = document.getElementById('chapter-01-briefing')
      const ch2 = document.getElementById('chapter-02-gear-up')
      const ch3 = document.getElementById('chapter-03-reef-descent')
      const ch4 = document.getElementById('chapter-04-booking')

      // Active section detection
      if (ch4 && scrollPos >= ch4.offsetTop) {
        setActiveSection('ch4')
      } else if (ch3 && scrollPos >= ch3.offsetTop) {
        setActiveSection('ch3')
      } else if (ch2 && scrollPos >= ch2.offsetTop) {
        setActiveSection('ch2')
      } else if (ch1 && scrollPos >= ch1.offsetTop) {
        setActiveSection('ch1')
      } else {
        setActiveSection('cover')
      }

      // Hide navbar when scrolled to footer
      const footer = document.querySelector('footer')
      if (footer) {
        const footerTop = footer.offsetTop
        const windowBottom = window.scrollY + window.innerHeight
        setIsVisible(windowBottom < footerTop + 80)
      }

      lastScrollY.current = window.scrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const currentIndex = tabs.findIndex(t => t.id === activeSection)
    const targetTab = tabs.find(t => t.targetId === id)
    const targetIndex = targetTab ? tabs.indexOf(targetTab) : -1

    const isForward = targetIndex > currentIndex

    if (isForward && window.triggerMangaTransition && id === 'chapter-01-briefing') {
      window.triggerMangaTransition(id, 'ENTERING THE ORIGIN ARC...', 'torn-paper')
    } else if (isForward && window.triggerMangaTransition && id === 'chapter-02-gear-up') {
      window.triggerMangaTransition(id, 'ENTERING THE HORIZON ARC...', 'vortex')
    } else {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsOpen(false)
  }

  const tabs = [
    { id: 'cover', targetId: 'chapter-00-cover', label: 'COVER', icon: '📖' },
    { id: 'ch1', targetId: 'chapter-01-briefing', label: 'ORIGINS', icon: '🏫' },
    { id: 'ch2', targetId: 'chapter-02-gear-up', label: 'BOAT', icon: '⛵' },
    { id: 'ch3', targetId: 'chapter-03-reef-descent', label: 'OCEAN', icon: '🌊' },
    { id: 'ch4', targetId: 'chapter-04-booking', label: 'BOOK', icon: '✉️' },
  ]

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl"
    >
      <div className="relative bg-brand-cream/85 backdrop-blur-2xl rounded-2xl px-4 py-2.5 lg:px-6 lg:py-3 flex items-center justify-between shadow-[0_2px_24px_rgba(0,0,0,0.08),0_1px_0_rgba(var(--rgb-brand-cream),0.9)_inset] border border-brand-brown/15" style={{ WebkitBackdropFilter:'blur(24px)' }}>

        {/* Subtle noise texture inside navbar */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <div className="absolute inset-0 manga-dots opacity-[0.08]"></div>
        </div>

        {/* ─── LOGO ─── */}
        <div className="flex items-center gap-2.5 relative z-10 shrink-0">
          <div className="w-9 h-9 bg-brand-brown rounded-xl flex items-center justify-center shadow-sm">
            <span className="font-manga-title text-brand-cream text-lg leading-none select-none">A</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-manga-title text-base lg:text-lg tracking-wide text-brand-brown leading-none select-none">
              AQUAMARINE
            </h1>
            <p className="text-[9px] uppercase font-semibold text-brand-brown/40 tracking-[0.2em] leading-none mt-0.5">
              Dive & Tour Co.
            </p>
          </div>
        </div>

        {/* ─── DESKTOP NAV PILLS ─── */}
        <nav className="hidden lg:flex items-center gap-1.5 relative z-10">
          {tabs.map((tab) => {
            const isActive = activeSection === tab.id

            return (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.targetId)}
                className={`relative px-4 py-2 rounded-xl font-manga-title text-sm tracking-wider cursor-pointer select-none transition-all duration-200 ease-out hover:scale-105 ${
                  isActive
                    ? 'bg-brand-brown text-brand-cream shadow-sm'
                    : 'text-brand-brown/70 hover:text-brand-brown hover:bg-brand-brown/5'
                }`}
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  <span className="text-xs">{tab.icon}</span>
                  <span>{tab.label}</span>
                </span>
                {isActive && (
                  <motion.div
                    layoutId="nav-active-pill"
                    className="absolute inset-0 bg-brand-brown/5 rounded-xl"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    style={{ zIndex: 0 }}
                  />
                )}
              </button>
            )
          })}
        </nav>

        {/* ─── CTA BUTTON & THEME TOGGLE (Desktop) ─── */}
        <div className="hidden lg:flex items-center gap-3 relative z-10">
          <button
            onClick={() => setIsDark(!isDark)}
            className="w-10 h-10 rounded-xl bg-brand-brown/5 hover:bg-brand-brown/10 text-brand-brown border border-brand-brown/10 flex items-center justify-center cursor-pointer select-none transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="Toggle night view"
            title={isDark ? "Switch to Day View" : "Switch to Night View (Ocean)"}
          >
            <span className="text-base leading-none select-none transition-transform duration-300">
              {isDark ? '🌙' : '☀️'}
            </span>
          </button>
          <button
            onClick={() => scrollToSection('chapter-04-booking')}
            className="bg-brand-brown text-brand-cream px-5 py-2 rounded-xl font-manga-title text-sm tracking-wider cursor-pointer select-none transition-all duration-200 hover:bg-brand-brown/90 hover:scale-105 shadow-sm active:scale-95"
          >
            BOOK NOW →
          </button>
        </div>

        {/* ─── MOBILE THEME TOGGLE & HAMBURGER ─── */}
        <div className="lg:hidden flex items-center gap-2 relative z-10">
          <button
            onClick={() => setIsDark(!isDark)}
            className="w-10 h-10 bg-brand-brown/5 hover:bg-brand-brown/10 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-200 border border-brand-brown/10"
            aria-label="Toggle night view"
            title={isDark ? "Switch to Day View" : "Switch to Night View (Ocean)"}
          >
            <span className="text-base leading-none select-none">
              {isDark ? '🌙' : '☀️'}
            </span>
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 bg-brand-brown/5 hover:bg-brand-brown/10 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-200 border border-brand-brown/10"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {/* Menu icon — fades/rotates out when open */}
            <svg
              className={`w-5 h-5 absolute text-brand-brown transition-all duration-300 ${
                isOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
              }`}
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            {/* X icon — fades/rotates in when open */}
            <svg
              className={`w-5 h-5 absolute text-brand-brown transition-all duration-300 ${
                isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
              }`}
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* ─── MOBILE OVERLAY (spec: opacity transition-opacity duration-300) ─── */}
      <div
        className={`lg:hidden fixed inset-0 z-20 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div className="absolute inset-0 bg-brand-brown/40 backdrop-blur-sm" />
      </div>

      {/* ─── MOBILE DRAWER (spec: translate-x-full → translate-x-0, cubic-bezier(0.22,1,0.36,1)) ─── */}
      <div
        className={`lg:hidden fixed top-0 right-0 bottom-0 z-30 w-[85%] max-w-sm bg-brand-cream/95 backdrop-blur-xl shadow-2xl transition-transform duration-500 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
      >
        <div className="flex flex-col h-full pt-24 px-8 pb-8">

          {/* Staggered nav links (spec: translate-x-8 opacity-0 → translate-x-0 opacity-100) */}
          <div className="flex flex-col gap-1">
            {tabs.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.targetId)}
                className={`text-left font-manga-title text-2xl text-brand-brown py-4 border-b-2 border-brand-brown/10 transition-all duration-500 ${
                  isOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                }`}
                style={{ transitionDelay: isOpen ? `${150 + i * 70}ms` : '0ms' }}
              >
                <span className="mr-2 text-xl">{tab.icon}</span>{tab.label}
              </button>
            ))}
          </div>

          {/* CTA group (spec: translate-x-8 opacity-0 → translate-x-0 opacity-100, delay 400ms) */}
          <div
            className={`mt-8 flex flex-col gap-4 transition-all duration-500 ${
              isOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`}
            style={{ transitionDelay: isOpen ? '400ms' : '0ms' }}
          >
            <button
              onClick={() => { scrollToSection('chapter-04-booking'); setIsOpen(false); }}
              className="w-full bg-brand-brown hover:bg-brand-sage text-brand-cream px-4 py-3 rounded-xl font-manga-title text-sm tracking-wider cursor-pointer select-none text-center transition-colors duration-200 active:scale-95"
            >
              ✉️ BOOK YOUR DIVE →
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
