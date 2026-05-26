import { useEffect, useState } from 'react'

interface ActiveSection {
  [key: string]: boolean
}

export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const newActive: ActiveSection = {}
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            newActive[id] = true
          }
        })
        setActiveSection((prev) => ({ ...prev, ...newActive }))
      },
      { threshold: 0.4 }
    )

    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
      observer.disconnect()
    }
  }, [])

  return activeSection
}
