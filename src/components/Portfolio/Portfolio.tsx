import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useMouseTrack } from '../../hooks/useMouseTrack'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import styles from './Portfolio.module.css'

// SVG Components
const AurumSVG = () => (
  <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <radialGradient id="aurum-grad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style={{ stopColor: '#C9A84C', stopOpacity: 0.6 }} />
        <stop offset="100%" style={{ stopColor: '#8B6E2E', stopOpacity: 0.2 }} />
      </radialGradient>
    </defs>
    <circle cx="200" cy="200" r="150" fill="url(#aurum-grad)" />
    <circle cx="200" cy="200" r="120" fill="none" stroke="#C9A84C" strokeWidth="2" opacity="0.4" />
    <circle cx="200" cy="200" r="80" fill="none" stroke="#C9A84C" strokeWidth="1.5" opacity="0.3" />
    <line x1="200" y1="50" x2="200" y2="350" stroke="#C9A84C" strokeWidth="1" opacity="0.2" />
    <line x1="50" y1="200" x2="350" y2="200" stroke="#C9A84C" strokeWidth="1" opacity="0.2" />
  </svg>
)

const NovaTechSVG = () => (
  <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <radialGradient id="nova-grad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style={{ stopColor: '#C9A84C', stopOpacity: 0.5 }} />
        <stop offset="100%" style={{ stopColor: '#8B6E2E', stopOpacity: 0.15 }} />
      </radialGradient>
    </defs>
    <rect x="50" y="50" width="300" height="300" fill="none" stroke="#C9A84C" strokeWidth="2" opacity="0.3" />
    <circle cx="200" cy="200" r="100" fill="none" stroke="#C9A84C" strokeWidth="2" opacity="0.4" />
    <polygon points="200,120 280,240 120,240" fill="none" stroke="#C9A84C" strokeWidth="2" opacity="0.35" />
  </svg>
)

const GeometrySVG = () => (
  <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="0" y1="400" x2="400" y2="0" stroke="#C9A84C" strokeWidth="2" opacity="0.25" />
    <line x1="100" y1="400" x2="400" y2="100" stroke="#C9A84C" strokeWidth="1.5" opacity="0.2" />
    <circle cx="200" cy="100" r="50" fill="none" stroke="#C9A84C" strokeWidth="2" opacity="0.3" />
    <polygon points="200,200 250,280 150,280" fill="none" stroke="#C9A84C" strokeWidth="2" opacity="0.28" />
    <rect x="100" y="280" width="200" height="100" fill="none" stroke="#C9A84C" strokeWidth="1.5" opacity="0.2" />
  </svg>
)

const FormSVG = () => (
  <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C9A84C" strokeWidth="1" opacity="0.2" />
      </pattern>
    </defs>
    <rect x="50" y="50" width="300" height="300" fill="url(#grid)" stroke="#C9A84C" strokeWidth="2" opacity="0.35" />
    <rect x="100" y="100" width="200" height="200" fill="none" stroke="#C9A84C" strokeWidth="1.5" opacity="0.25" />
    <rect x="150" y="150" width="100" height="100" fill="none" stroke="#C9A84C" strokeWidth="1" opacity="0.2" />
  </svg>
)

const OrbitalSVG = () => (
  <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="100" cy="200" r="40" fill="none" stroke="#C9A84C" strokeWidth="2" opacity="0.4" />
    <circle cx="200" cy="200" r="60" fill="none" stroke="#C9A84C" strokeWidth="2" opacity="0.35" />
    <circle cx="300" cy="200" r="40" fill="none" stroke="#C9A84C" strokeWidth="2" opacity="0.4" />
    <polygon points="100,200 200,200 150,150" fill="none" stroke="#C9A84C" strokeWidth="1.5" opacity="0.25" />
    <polygon points="300,200 200,200 250,250" fill="none" stroke="#C9A84C" strokeWidth="1.5" opacity="0.25" />
  </svg>
)

export const Portfolio: React.FC = () => {
  const { t } = useTranslation()
  const titleRef = useScrollReveal<HTMLHeadingElement>()
  const descriptionRef = useScrollReveal<HTMLParagraphElement>()

  const items = [
    { key: 'item1', svg: <AurumSVG />, featured: true },
    { key: 'item2', svg: <NovaTechSVG />, featured: false },
    { key: 'item3', svg: <GeometrySVG />, featured: false },
    { key: 'item4', svg: <FormSVG />, featured: false },
    { key: 'item5', svg: <OrbitalSVG />, featured: true },
  ]

  return (
    <section id="portfolio" className={styles.portfolio}>
      <div className={styles.header}>
        <h2 className={`${styles.title} reveal-title`} ref={titleRef}>{t('portfolio.title')}</h2>
        <p className={`${styles.description} reveal-body`} ref={descriptionRef}>{t('portfolio.description')}</p>
      </div>

      <div className={styles.grid}>
        {items.map((item, index) => (
          <PortfolioItem
            key={item.key}
            itemKey={item.key}
            svg={item.svg}
            isFeatured={item.featured}
            delayOffset={index * 100}
          />
        ))}
      </div>
    </section>
  )
}

interface PortfolioItemProps {
  itemKey: string
  svg: React.ReactNode
  isFeatured: boolean
  delayOffset: number
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({ itemKey, svg, isFeatured, delayOffset }) => {
  const { t } = useTranslation()
  const ref = useScrollReveal<HTMLDivElement>()
  const mouseRef = useMouseTrack()
  const prefersReducedMotion = useReducedMotion()
  const [isHovered, setIsHovered] = useState(false)

  const itemStyle = {
    transitionDelay: prefersReducedMotion ? '0ms' : `${delayOffset}ms`,
  }

  return (
    <div
      ref={ref}
      className={`${styles.item} ${isFeatured ? styles.featured : ''} reveal-card`}
      style={itemStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="article"
      aria-label={t(`portfolio.${itemKey}.name`)}
    >
      <div className={styles.imageWrapper} ref={mouseRef as React.Ref<HTMLDivElement>}>
        <div className={styles.image} aria-hidden="true">{svg}</div>
        <motion.div 
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ ease: 'easeOut', duration: prefersReducedMotion ? 0 : 0.3 }}
        >
          <motion.div 
            className={styles.meta}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: isHovered ? 1 : 0.95, opacity: isHovered ? 1 : 0 }}
            transition={{ ease: 'easeOut', duration: prefersReducedMotion ? 0 : 0.3, delay: isHovered ? 0.1 : 0 }}
          >
            <span className={styles.category}>
              {t(`portfolio.${itemKey}.category`)}
            </span>
            <h3 className={styles.itemTitle}>
              {t(`portfolio.${itemKey}.name`)}
            </h3>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
