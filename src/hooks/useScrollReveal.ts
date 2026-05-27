import { useRef, useEffect, useState } from 'react'

interface ScrollRevealOptions {
  once?: boolean
  amount?: number
}

export const useScrollReveal = (delayOffset?: number, options?: ScrollRevealOptions) => {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (options?.once !== false) {
            observer.unobserve(entry.target)
          }
        } else if (options?.once === false) {
          setInView(false)
        }
      },
      {
        threshold: options?.amount ?? 0.2,
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [options?.amount, options?.once])

  return {
    ref,
    isInView: inView,
  }
}
