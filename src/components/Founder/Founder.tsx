import React from 'react'
import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import styles from './Founder.module.css'

export const Founder: React.FC = () => {
  const { t } = useTranslation()
  const portraitRef = useScrollReveal<HTMLDivElement>()
  const labelRef = useScrollReveal<HTMLLabelElement>()
  const quoteRef = useScrollReveal<HTMLQuoteElement>()
  const bioRef = useScrollReveal<HTMLParagraphElement>()
  const footerRef = useScrollReveal<HTMLDivElement>()

  return (
    <section id="founder" className={styles.founder}>
      <div className={`${styles.portraitPanel} reveal-card`} ref={portraitRef}>
        <div className={styles.portrait}>
          <img src="/images/founder/portrait.jpg" alt={t('founder.name')} />
        </div>
        <p className={styles.caption}>
          {t('founder.portraitCaption')}
        </p>
      </div>

      <div className={styles.contentPanel}>
        <label
          ref={labelRef}
          className={`${styles.label} reveal-label`}
        >
          {t('founder.label')}
        </label>

        <blockquote
          ref={quoteRef}
          className={`${styles.quote} reveal-title`}
        >
          <span className={styles.quoteChar}>"</span>
          {t('founder.quote')}
        </blockquote>

        <p
          ref={bioRef}
          className={`${styles.bio} reveal-body`}
        >
          {t('founder.bio')}
        </p>

        <div
          ref={footerRef}
          className={`${styles.footer} reveal-body`}
        >
          <div className={styles.divider}></div>
          <h3 className={styles.name}>{t('founder.name')}</h3>
          <p className={styles.title}>{t('founder.title')}</p>
          <p className={styles.signature}>{t('founder.signature')}</p>
        </div>
      </div>
    </section>
  )
}
