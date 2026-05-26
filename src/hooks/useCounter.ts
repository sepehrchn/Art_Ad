import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export const useCounter = (target: number, duration: number = 1800) => {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!inView || hasAnimated.current) return

    hasAnimated.current = true
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Cubic ease-out
      const easeProgress = 1 - Math.pow(1 - progress, 3)
      const currentCount = Math.floor(easeProgress * target)

      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [inView, target, duration])

  return { ref, count }
}
