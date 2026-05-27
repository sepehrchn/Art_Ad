import React from 'react'
import { useTranslation } from 'react-i18next'
import { useCounter } from '../../hooks/useCounter'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import styles from './Stats.module.css'

export const Stats: React.FC = () => {
  const { t } = useTranslation()
  const titleRef = useScrollReveal<HTMLHeadingElement>()

  const stats = [
    { key: 'stat1', value: 127 },
    { key: 'stat2', value: 48 },
    { key: 'stat3', value: 12 },
    { key: 'stat4', value: 23 },
  ]

  return (
    <section id="stats" className={styles.stats}>
      <h2 className={`${styles.title} reveal-title`} ref={titleRef}>{t('stats.title')}</h2>

      <div className={styles.grid}>
        {stats.map((stat, index) => (
          <StatItem key={stat.key} statKey={stat.key} value={stat.value} delayOffset={index * 150} />
        ))}
      </div>
    </section>
  )
}

interface StatItemProps {
  statKey: string
  value: number
  delayOffset: number
}

const StatItem: React.FC<StatItemProps> = ({ statKey, value, delayOffset }) => {
  const { t } = useTranslation()
  const { rounded, ref: counterRef } = useCounter(value, 1800)
  const revealRef = useScrollReveal<HTMLDivElement>()

  const itemStyle = {
    transitionDelay: `${delayOffset}ms`,
  }

  // Combine refs
  const combinedRef = (node: HTMLDivElement) => {
    counterRef.current = node
    revealRef.current = node
  }

  return (
    <div ref={combinedRef} className={`${styles.stat} reveal-card`} style={itemStyle}>
      <div className={styles.number}>{rounded}</div>
      <div className={styles.label}>
        {t(`stats.${statKey}.label`)}
      </div>
    </div>
  )
}
