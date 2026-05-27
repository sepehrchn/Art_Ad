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
  const contentRef = useScrollReveal<HTMLDivElement>({ once: true, threshold: 0.2 })

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

  return (
    <section id="hero" className={styles.hero} ref={containerRef}>
        <Suspense fallback={<CanvasPlaceholder />}>
          <HeroScene />
        </Suspense>
      <div ref={contentRef} className={styles.content}>
        <div 
          className={`${styles.eyebrow} reveal-label gold-shimmer`}
        >
          {t('hero.eyebrow')}
        </div>

        <h1 
          className={`${styles.title} reveal-title`}
        >
          {t('hero.title').split('Art').map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && <em>{t('hero.titleArt')}</em>}
            </span>
          ))}
        </h1>

        <p 
          className={`${styles.subtitle} reveal-body`}
        >
          {t('hero.subtitle')}
        </p>

        <div 
          className={`${styles.ctas} reveal-body`}
        >
          <button className={styles.ctaPrimary} onClick={handlePrimaryCTA} aria-label={t('hero.cta1')}>{t('hero.cta1')}</button>
          <button className={styles.ctaSecondary} onClick={handleSecondaryCTA} aria-label={t('hero.cta2')}>{t('hero.cta2')}</button>
        </div>

        <button
          className={`${styles.scrollHint} reveal-body`}
          onClick={handleScrollHint}
          aria-label="Scroll to see more"
        >
          <span className={styles.line} aria-hidden="true"></span>
          <span className={styles.text}>{t('hero.scrollHint')}</span>
        </button>
      </div>
    </section>
  )
}

