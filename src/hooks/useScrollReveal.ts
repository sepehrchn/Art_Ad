import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export const useScrollReveal = (delayOffset: number = 0) => {
  const { ref, inView } = useInView({
    threshold: 0.12,
    triggerOnce: true,
  })

  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setIsRevealed(true)
      }, delayOffset)
      return () => clearTimeout(timer)
    }
  }, [inView, delayOffset])

  return { ref, isRevealed }
}
