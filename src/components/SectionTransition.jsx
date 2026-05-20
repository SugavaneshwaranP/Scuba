import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function SectionTransition({ type }) {
  const triggeredRef = useRef(false)
  const scrollDirectionRef = useRef('down')
  const lastScrollYRef = useRef(0)

  useEffect(() => {
    lastScrollYRef.current = window.scrollY
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollYRef.current + 2) {
        scrollDirectionRef.current = 'down'
      } else if (currentScrollY < lastScrollYRef.current - 2) {
        scrollDirectionRef.current = 'up'
      }
      lastScrollYRef.current = currentScrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getNextSectionId = () => {
    switch (type) {
      case 'cover-to-classroom': return 'chapter-01-briefing'
      case 'classroom-to-boat': return 'chapter-02-gear-up'
      default: return null
    }
  }

  const getLabel = () => {
    switch (type) {
      case 'cover-to-classroom': return 'THE ORIGIN ARC'
      case 'classroom-to-boat': return 'THE HORIZON ARC'
      default: return 'DIVE DEEPER...'
    }
  }

  const nextSectionId = getNextSectionId()

  const handleTrigger = () => {
    if (scrollDirectionRef.current !== 'down') return // ONLY trigger on top-to-bottom scroll!
    if (triggeredRef.current || !nextSectionId) return
    triggeredRef.current = true

    if (window.triggerMangaTransition) {
      let transitionMode = 'torn-paper'
      let finalLabel = `ENTERING ${getLabel()}...`

      if (type === 'classroom-to-boat') {
        transitionMode = 'vortex'
        finalLabel = 'PREPARING DIVE GEAR...'
      }

      window.triggerMangaTransition(nextSectionId, finalLabel, transitionMode)
    }

    // Cooldown window to prevent double trigger when snapping/scrolling
    setTimeout(() => {
      triggeredRef.current = false
    }, 4000)
  }

  return (
    <motion.div
      onViewportEnter={handleTrigger}
      viewport={{ once: false, amount: 0.1 }}
      className="w-full h-px opacity-0 pointer-events-none z-0 bg-transparent"
    />
  )
}
