import React from 'react'
import { useTranslation } from 'react-i18next'
import { useCounter } from '../../hooks/useCounter'
import styles from './Stats.module.css'

export const Stats: React.FC = () => {
  const { t } = useTranslation()

  const stats = [
    { key: 'stat1', value: 127 },
    { key: 'stat2', value: 48 },
    { key: 'stat3', value: 12 },
    { key: 'stat4', value: 23 },
  ]

  return (
    <section id="stats" className={styles.stats}>
      <h2 className={styles.title}>{t('stats.title')}</h2>

      <div className={styles.grid}>
        {stats.map((stat) => (
          <StatItem key={stat.key} statKey={stat.key} value={stat.value} />
        ))}
      </div>
    </section>
  )
}

interface StatItemProps {
  statKey: string
  value: number
}

const StatItem: React.FC<StatItemProps> = ({ statKey, value }) => {
  const { t } = useTranslation()
  const { ref, rounded } = useCounter(value, 1800)

  return (
    <div ref={ref as React.Ref<HTMLDivElement>} className={styles.stat}>
      <div className={styles.number}>{rounded}</div>
      <div className={styles.label}>
        {t(`stats.${statKey}.label`)}
      </div>
    </div>
  )
}
