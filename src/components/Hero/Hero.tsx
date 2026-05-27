import React, { Suspense, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { HeroScene } from './HeroScene'
import styles from './Hero.module.css'

const CanvasPlaceholder = () => (
  <div
    className={styles.canvasPlaceholder}
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #0B0B0B 0%, #1a1a1a 100%)',
    }}
  />
)

export const Hero: React.FC = () => {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleScrollHint = () => {
    const servicesSection = document.getElementById('services')
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handlePrimaryCTA = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleSecondaryCTA = () => {
    const portfolioSection = document.getElementById('portfolio')
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Content reveal animation
  const { ref: contentRef, isInView } = useScrollReveal(0.2)
  const shouldReveal = isInView

  return (
    <section id="hero" className={styles.hero} ref={containerRef}>
      <Suspense fallback={<div className={styles.canvas} />}>
        <HeroScene isMobile={isMobile} />
      </Suspense>

      <div ref={contentRef as React.Ref<HTMLDivElement>} className={styles.content}>
        <div 
          className={styles.eyebrow}
          style={{ 
            opacity: shouldReveal ? 1 : 0,
            transform: shouldReveal ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0s'
          }}
        >
          {t('hero.eyebrow')}
        </div>

        <h1 
          className={styles.title}
          style={{ 
            opacity: shouldReveal ? 1 : 0,
            transform: shouldReveal ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.12s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.12s'
          }}
        >
          {t('hero.title').split('Art').map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && <em>{t('hero.titleArt')}</em>}
            </span>
          ))}
        </h1>

        <p 
          className={styles.subtitle}
          style={{ 
            opacity: shouldReveal ? 1 : 0,
            transform: shouldReveal ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.24s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.24s'
          }}
        >
          {t('hero.subtitle')}
        </p>

        <div 
          className={styles.ctas}
          style={{ 
            opacity: shouldReveal ? 1 : 0,
            transform: shouldReveal ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.36s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.36s'
          }}
        >
          <button className={styles.ctaPrimary} onClick={handlePrimaryCTA} aria-label={t('hero.cta1')}>{t('hero.cta1')}</button>
          <button className={styles.ctaSecondary} onClick={handleSecondaryCTA} aria-label={t('hero.cta2')}>{t('hero.cta2')}</button>
        </div>

        <button
          className={styles.scrollHint}
          onClick={handleScrollHint}
          aria-label="Scroll to see more"
          style={{ 
            opacity: shouldReveal ? 1 : 0,
            transform: shouldReveal ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.48s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.48s'
          }}
        >
          <span className={styles.line} aria-hidden="true"></span>
          <span className={styles.text}>{t('hero.scrollHint')}</span>
        </button>
      </div>
    </section>
  )
}

