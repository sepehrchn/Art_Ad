import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useMouseTrack } from '../../hooks/useMouseTrack'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import styles from './Portfolio.module.css'

export const Portfolio: React.FC = () => {
  const { t } = useTranslation()
  const titleRef = useScrollReveal<HTMLHeadingElement>()
  const descriptionRef = useScrollReveal<HTMLParagraphElement>()

  const items = [
    { key: 'item1', image: '/images/portfolio/portfolio-1.jpg', featured: true },
    { key: 'item2', image: '/images/portfolio/portfolio-2.jpg', featured: false },
    { key: 'item3', image: '/images/portfolio/portfolio-3.jpg', featured: false },
    { key: 'item4', image: '/images/portfolio/portfolio-4.jpg', featured: false },
    { key: 'item5', image: '/images/portfolio/portfolio-5.jpg', featured: false },
    { key: 'item6', image: '/images/portfolio/portfolio-6.jpg', featured: false },
    { key: 'item7', image: '/images/portfolio/portfolio-7.jpg', featured: true },
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
            image={item.image}
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
  image: string
  isFeatured: boolean
  delayOffset: number
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({ itemKey, image, isFeatured, delayOffset }) => {
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
        <img src={image} alt={t(`portfolio.${itemKey}.name`)} className={styles.image} />
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
