import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useParallax } from '../../hooks/useParallax'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import styles from './Services.module.css'

export const Services: React.FC = () => {
  const { t } = useTranslation()
  const parallaxRef = useParallax(0.3)

  const services = [
    { key: 'service1' },
    { key: 'service2' },
    { key: 'service3' },
    { key: 'service4' },
  ]

  const handleCTA = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="services" className={styles.services} ref={parallaxRef}>
      <h2 className={styles.title}>{t('services.title')}</h2>

      <div className={styles.grid}>
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            serviceKey={service.key}
            delayOffset={index * 150}
          />
        ))}
      </div>

      <div className={styles.ctaWrapper}>
        <button className={styles.cta} onClick={handleCTA} aria-label={t('services.cta')}>
          {t('services.cta')}
        </button>
      </div>
    </section>
  )
}

interface ServiceCardProps {
  serviceKey: string
  delayOffset: number
}

const ServiceCard: React.FC<ServiceCardProps> = ({ serviceKey, delayOffset }) => {
  const { t } = useTranslation()
  const { ref, isInView } = useScrollReveal(delayOffset)
  const prefersReducedMotion = useReducedMotion()
  const [isHovered, setIsHovered] = useState(false)

  // Resolve tags as array
  const tags = (t(`services.${serviceKey}.tags`, { returnObjects: true }) as unknown) as string[]

  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div className={styles.header}>
        <span className={styles.number}>
          {t(`services.${serviceKey}.number`)}
        </span>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <h3 className={styles.name}>
            {t(`services.${serviceKey}.name`)}
          </h3>
          <motion.span
            className={styles.underline}
            initial={{ width: '0%', opacity: 0 }}
            animate={{ width: isHovered ? '100%' : '0%', opacity: isHovered ? 1 : 0 }}
            transition={{ ease: [0.77, 0, 0.175, 1], duration: prefersReducedMotion ? 0 : 0.4 }}
            style={{
              position: 'absolute',
              bottom: '-4px',
              left: 0,
              height: '2px',
              background: 'currentColor',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>

      <div className={styles.tags}>
        {(tags || []).map((tag: string, i: number) => (
          <span key={i} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
