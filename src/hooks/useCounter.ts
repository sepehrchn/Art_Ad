import { useRef, useEffect, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

export const useCounter = (target: number, duration: number = 1800) => {
  const ref = useRef<HTMLElement>(null)
  const [rounded, setRounded] = useState(0)
  const [inView, setInView] = useState(false)
  const hasAnimated = useRef(false)
  const prefersReducedMotion = useReducedMotion()

  // Detect when element enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  // Animate counter
  useEffect(() => {
    if (!inView || hasAnimated.current) return

    hasAnimated.current = true

    if (prefersReducedMotion) {
      // Instantly set to target if reduced motion is preferred
      setRounded(target)
      return
    }

    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Cubic ease: [0.16, 1, 0.3, 1]
      const easeProgress = 1 - Math.pow(1 - progress, 3)
      const currentCount = Math.floor(easeProgress * target)

      setRounded(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [inView, target, duration, prefersReducedMotion])

  return { ref, rounded }
}
