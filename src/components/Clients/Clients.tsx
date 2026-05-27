import React from 'react'
import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import styles from './Clients.module.css'

export const Clients: React.FC = () => {
  const { t } = useTranslation()
  const titleRef = useScrollReveal<HTMLHeadingElement>()
  const gridRef = useScrollReveal<HTMLDivElement>()

  const industries = [
    'industry1',
    'industry2',
    'industry3',
    'industry4',
    'industry5',
    'industry6',
  ]

  return (
    <section id="clients" className={styles.clients}>
      <h2 className={`${styles.title} reveal-title`} ref={titleRef}>{t('clients.title')}</h2>

      <div className={`${styles.grid} reveal-body`} ref={gridRef}>
        {industries.map((industry, index) => (
          <div key={index} className={styles.tile}>
            {t(`clients.${industry}`)}
          </div>
        ))}
      </div>
    </section>
  )
}
