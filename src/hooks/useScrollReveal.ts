import { useRef, useEffect } from 'react'

interface ScrollRevealOptions {
  once?: boolean
  threshold?: number
  rootMargin?: string
}

export const useScrollReveal = <T extends HTMLElement>(options?: ScrollRevealOptions) => {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            if (options?.once !== false) {
              observer.unobserve(entry.target)
            }
          } else if (options?.once === false) {
            entry.target.classList.remove('is-visible')
          }
        })
      },
      {
        threshold: options?.threshold ?? 0.15,
        rootMargin: options?.rootMargin ?? '0px 0px -60px 0px',
      }
    )

    observer.observe(ref.current)

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [options?.once, options?.threshold, options?.rootMargin])

  return ref
}
