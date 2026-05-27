import React from 'react'
import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useParallax } from '../../hooks/useParallax'
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
        <button className={styles.cta} onClick={handleCTA}>
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
  const { ref, isRevealed } = useScrollReveal(delayOffset)

  // Resolve tags as array and log for debugging
  const tags = (t(`services.${serviceKey}.tags`, { returnObjects: true }) as unknown) as string[]
  console.log(`services.${serviceKey}.tags ->`, tags)

  return (
    <div
      ref={ref}
      className={`${styles.card} ${isRevealed ? styles.reveal : ''}`}
    >
      <div className={styles.header}>
        <span className={styles.number}>
          {t(`services.${serviceKey}.number`)}
        </span>
        <h3 className={styles.name}>
          {t(`services.${serviceKey}.name`)}
        </h3>
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
