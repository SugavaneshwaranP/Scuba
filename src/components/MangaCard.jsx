import React from 'react'
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion'

/**
 * MangaCard - Premium hardware-accelerated 3D spring-physics tilt component.
 * Tracks mouse cursor precisely and applies organic, fluid tilt effects.
 * Supports React.forwardRef to allow hooks like auto-animate to bind correctly.
 */
const MangaCard = React.forwardRef(({ children, className = '', tilt = true, ...props }, ref) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Calibrated spring parameters for tactile, rapid, lag-free responsiveness
  const springConfig = { damping: 22, stiffness: 220, mass: 0.5 }
  
  // Transform normalized mouse coordinate into actual angles
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig)
  
  // Floating elevation and scale springs
  const z = useSpring(0, springConfig)
  const scale = useSpring(1, springConfig)

  // Detect shadow scale from manga border utility classes
  const isSm = className.includes('manga-border-sm')
  const isThick = className.includes('manga-border-thick')
  const hasBorder = className.includes('manga-border')

  const baseOffset = isSm ? 3 : (isThick ? 10 : 6)
  const rangeMin = baseOffset - 2
  const rangeMax = baseOffset + 2

  // Opposite shifting solid block shadow for physical depth
  const shadowX = useSpring(useTransform(x, [-0.5, 0.5], [rangeMax, rangeMin]), springConfig)
  const shadowY = useSpring(useTransform(y, [-0.5, 0.5], [rangeMax, rangeMin]), springConfig)

  // Motion template for box-shadow override (only applied if card has a manga border style)
  const dynamicBoxShadow = useMotionTemplate`${shadowX}px ${shadowY}px 0px 0px var(--color-brand-brown)`

  // Mouse-following cursor highlight glow coordinates
  const glowX = useSpring(useTransform(x, [-0.5, 0.5], ['0%', '100%']), springConfig)
  const glowY = useSpring(useTransform(y, [-0.5, 0.5], ['0%', '100%']), springConfig)
  const glowOpacity = useSpring(useTransform(scale, [1, 1.02], [0, 0.3]), springConfig)

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    
    // Normalized position from -0.5 to +0.5 relative to card center
    const relativeX = (e.clientX - rect.left) / width - 0.5
    const relativeY = (e.clientY - rect.top) / height - 0.5
    
    x.set(relativeX)
    y.set(relativeY)
    z.set(30)
    scale.set(1.02)
  }

  const handleMouseLeave = () => {
    // Return smoothly to center resting state
    x.set(0)
    y.set(0)
    z.set(0)
    scale.set(1)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={tilt ? handleMouseMove : undefined}
      onMouseLeave={tilt ? handleMouseLeave : undefined}
      style={{
        rotateX: tilt ? rotateX : 0,
        rotateY: tilt ? rotateY : 0,
        z: tilt ? z : 0,
        scale: tilt ? scale : 1,
        boxShadow: hasBorder ? (tilt ? dynamicBoxShadow : undefined) : undefined,
        transformStyle: tilt ? 'preserve-3d' : 'flat',
        perspective: tilt ? '1000px' : undefined,
      }}
      className={`relative will-change-transform ${className}`}
      {...props}
    >
      {/* Dynamic Seafoam Glass Glow Overlay */}
      {tilt && (
        <motion.div 
          className="absolute inset-0 pointer-events-none rounded-inherit z-30"
          style={{
            background: useMotionTemplate`radial-gradient(circle 180px at ${glowX} ${glowY}, rgba(var(--rgb-brand-light-sage), 0.35), transparent 75%)`,
            opacity: glowOpacity,
            mixBlendMode: 'color-dodge',
          }}
        />
      )}
      {children}
    </motion.div>
  )
})

MangaCard.displayName = 'MangaCard'

export default MangaCard
