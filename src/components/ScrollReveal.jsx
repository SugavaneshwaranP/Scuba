import { useState, useEffect, useRef } from 'react'

/**
 * ScrollReveal - Premium scroll-triggered reveal component
 * Supports multiple animation types for varied, engaging visual flow
 * 
 * animation types:
 *   'slide-up'     - Smooth upward slide with fade
 *   'slide-left'   - Slide in from the right
 *   'slide-right'  - Slide in from the left
 *   'fade-scale'   - Scale up with fade
 *   'blur-in'      - Blur-to-clear reveal
 *   'manga-pop'    - Classic manga bounce pop (uses CSS keyframe)
 *   'stamp-press'  - Stamp slam effect (uses CSS keyframe)
 */
export default function ScrollReveal({ 
  children, 
  animation = 'slide-up', 
  delay = '0ms', 
  threshold = 0.05,
  duration = '600ms',
  className = ''
}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { 
        rootMargin: '0px 0px -50px 0px',
        threshold 
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  // CSS keyframe-based animations (manga-pop, stamp-press) use class toggle
  const isKeyframeAnimation = ['manga-pop', 'stamp-press'].includes(animation)

  // For keyframe animations, apply the animate class directly
  if (isKeyframeAnimation) {
    const animClass = animation === 'manga-pop' ? 'animate-manga-pop' : 'animate-stamp-press'
    return (
      <div
        ref={ref}
        style={{ animationDelay: delay }}
        className={`${isVisible ? `${animClass} opacity-100` : 'opacity-0 scale-90 translate-y-4'} ${className}`}
      >
        {children}
      </div>
    )
  }

  // Transition-based animations with smooth CSS transitions
  // Transform uses a custom spring ease-out curve (overshoot) while opacity/filter use standard smooth easing.
  const baseTransition = `opacity ${duration} cubic-bezier(0.25, 1, 0.5, 1), transform ${duration} cubic-bezier(0.34, 1.25, 0.64, 1), filter ${duration} cubic-bezier(0.25, 1, 0.5, 1)`

  const getInitialStyle = () => {
    switch (animation) {
      case 'slide-up':
        return { opacity: 0, transform: 'translateY(30px)' }
      case 'slide-left':
        return { opacity: 0, transform: 'translateX(35px)' }
      case 'slide-right':
        return { opacity: 0, transform: 'translateX(-35px)' }
      case 'fade-scale':
        return { opacity: 0, transform: 'scale(0.92)' }
      case 'blur-in':
        return { opacity: 0, filter: 'blur(8px)', transform: 'translateY(15px)' }
      default:
        return { opacity: 0, transform: 'translateY(20px)' }
    }
  }

  const getVisibleStyle = () => {
    switch (animation) {
      case 'blur-in':
        return { opacity: 1, filter: 'blur(0px)', transform: 'translateY(0)' }
      default:
        return { opacity: 1, transform: 'translateX(0) translateY(0) scale(1)' }
    }
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: baseTransition,
        transitionDelay: delay,
        willChange: 'opacity, transform, filter',
        ...(isVisible ? getVisibleStyle() : getInitialStyle()),
      }}
    >
      {children}
    </div>
  )
}
