import { useEffect, useRef } from 'react'

export const useParallax = (speed: number = 0.5) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleScroll = () => {
      const rect = element.getBoundingClientRect()
      const scrolled = window.scrollY
      const elementOffset = element.offsetTop
      const distance = scrolled - elementOffset
      const offset = distance * speed

      element.style.transform = `translateY(${offset}px)`
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return ref
}
