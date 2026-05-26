import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { initScene } from './HeroScene'
import styles from './Hero.module.css'

export const Hero: React.FC = () => {
  const { t } = useTranslation()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Use single scroll reveal for content
  const { ref: revealRef, isRevealed } = useScrollReveal(0)
  const [showContent, setShowContent] = React.useState(true)

  useEffect(() => {
    if (!canvasRef.current) return

    try {
      const isMobile = window.innerWidth < 768
      const cleanup = initScene(canvasRef.current, isMobile)
      return cleanup
    } catch (error) {
      console.error('Error initializing Three.js scene:', error)
    }
  }, [])

  const handleScrollHint = () => {
    const servicesSection = document.getElementById('services')
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const shouldReveal = isRevealed || showContent

  return (
    <section id="hero" className={styles.hero} ref={containerRef}>
      <canvas ref={canvasRef} className={styles.canvas} />

      <div ref={revealRef} className={styles.content}>
        <div 
          className={`${styles.eyebrow} ${shouldReveal ? styles.reveal : ''}`} 
          style={{ 
            animationDelay: '0s',
            ...(shouldReveal ? { opacity: 1, transform: 'translateY(0)' } : {})
          }}
        >
          {t('hero.eyebrow')}
        </div>

        <h1 
          className={`${styles.title} ${shouldReveal ? styles.reveal : ''}`} 
          style={{ 
            animationDelay: '0.1s',
            ...(shouldReveal ? { opacity: 1, transform: 'translateY(0)' } : {})
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
          className={`${styles.subtitle} ${shouldReveal ? styles.reveal : ''}`} 
          style={{ 
            animationDelay: '0.2s',
            ...(shouldReveal ? { opacity: 1, transform: 'translateY(0)' } : {})
          }}
        >
          {t('hero.subtitle')}
        </p>

        <div 
          className={`${styles.ctas} ${shouldReveal ? styles.reveal : ''}`} 
          style={{ 
            animationDelay: '0.3s',
            ...(shouldReveal ? { opacity: 1, transform: 'translateY(0)' } : {})
          }}
        >
          <button className={styles.ctaPrimary}>{t('hero.cta1')}</button>
          <button className={styles.ctaSecondary}>{t('hero.cta2')}</button>
        </div>

        <button
          className={`${styles.scrollHint} ${shouldReveal ? styles.reveal : ''}`}
          onClick={handleScrollHint}
          style={{ 
            animationDelay: '0.4s',
            ...(shouldReveal ? { opacity: 1, transform: 'translateY(0)' } : {})
          }}
        >
          <span className={styles.line}></span>
          <span className={styles.text}>{t('hero.scrollHint')}</span>
        </button>
      </div>
    </section>
  )
}

