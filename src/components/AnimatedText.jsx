import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * AnimatedText - Ultra-smooth staggered text reveals driven by Framer Motion.
 * Fully GPU-accelerated and uses subpixel spring rendering for fluid performance.
 */
export default function AnimatedText({
  text = '',
  variant = 'stagger',
  className = '',
  as: Tag = 'span',
  delay = 0,
  staggerMs = 30,
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-5%" })
  const [typedText, setTypedText] = useState('')

  // Container variants to orchestrate children stagger timings
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerMs / 1000,
        delayChildren: delay / 1000,
      }
    }
  }

  // Fine-tuned character spring reveal
  const childVariants = {
    hidden: {
      opacity: 0,
      y: 12,
      rotateX: -30,
      filter: 'blur(3px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 16,
        stiffness: 150,
      }
    }
  }

  // Native typewriter typing effect loop with proper wrapping and support for spaces
  useEffect(() => {
    if (variant !== 'typewriter') return
    if (!isInView) return

    let currentIndex = 0
    let timeoutId

    const type = () => {
      if (currentIndex <= text.length) {
        setTypedText(text.slice(0, currentIndex))
        currentIndex++
        timeoutId = setTimeout(type, staggerMs)
      }
    }

    const startDelayId = setTimeout(type, delay)

    return () => {
      clearTimeout(startDelayId)
      clearTimeout(timeoutId)
    }
  }, [variant, isInView, text, staggerMs, delay])

  // Dynamically resolve tag element for framer motion compatibility
  const MotionTag = motion[Tag] || motion.span

  if (variant === 'stagger') {
    return (
      <MotionTag
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={`inline-block ${className}`}
        style={{ perspective: '600px', transformStyle: 'preserve-3d' }}
      >
        {text.split('').map((char, i) => (
          <motion.span
            key={i}
            variants={childVariants}
            className="inline-block"
            style={{ originY: 1 }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </MotionTag>
    )
  }

  if (variant === 'typewriter') {
    return (
      <Tag ref={ref} className={`relative inline ${className}`}>
        <span className="relative z-10">{typedText}</span>
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "steps(2)" }}
          className="inline-block w-[3px] h-[1.1em] bg-brand-brown ml-0.5"
          style={{ 
            verticalAlign: 'middle', 
            display: typedText.length < text.length ? 'inline-block' : 'none' 
          }}
        />
      </Tag>
    )
  }

  if (variant === 'glitch') {
    return (
      <MotionTag
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? {
          opacity: [0, 1, 0.8, 1, 0.9, 1],
          x: [0, -1.5, 1.5, 0, 0.5, 0],
          y: [0, 0.5, -0.5, 0, 0, 0],
        } : { opacity: 0 }}
        transition={{
          delay: delay / 1000,
          duration: 0.5,
          ease: 'easeInOut',
        }}
        className={`inline-block ${className}`}
      >
        {text}
      </MotionTag>
    )
  }

  if (variant === 'rise') {
    return (
      <MotionTag
        ref={ref}
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{
          type: 'spring',
          damping: 18,
          stiffness: 140,
          delay: delay / 1000,
        }}
        className={`inline-block ${className}`}
      >
        {text}
      </MotionTag>
    )
  }

  if (variant === 'glow') {
    return (
      <MotionTag
        ref={ref}
        initial={{ opacity: 0, filter: 'drop-shadow(0px 0px 0px rgba(103,87,70,0))' }}
        animate={isInView ? { 
          opacity: [0, 1],
          filter: [
            'drop-shadow(0px 0px 0px rgba(103,87,70,0))',
            'drop-shadow(0px 0px 4px rgba(103,87,70,0.3))',
            'drop-shadow(0px 0px 0px rgba(103,87,70,0))'
          ]
        } : { opacity: 0 }}
        transition={{
          delay: delay / 1000,
          duration: 1.5,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse'
        }}
        className={`inline-block ${className}`}
      >
        {text}
      </MotionTag>
    )
  }

  return (
    <Tag ref={ref} className={className}>
      {text}
    </Tag>
  )
}
