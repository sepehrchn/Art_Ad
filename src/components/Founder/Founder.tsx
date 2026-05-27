import React from 'react'
import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import styles from './Founder.module.css'

const PortraitSVG = () => (
  <svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
        <feColorMatrix in="noise" type="saturate" values="0.3" />
        <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
      </filter>
      <radialGradient id="portrait-grad" cx="50%" cy="40%" r="60%">
        <stop offset="0%" style={{ stopColor: '#C9A84C', stopOpacity: 0.15 }} />
        <stop offset="100%" style={{ stopColor: '#0B0B0B', stopOpacity: 0.05 }} />
      </radialGradient>
    </defs>
    <ellipse cx="150" cy="120" rx="45" ry="55" fill="url(#portrait-grad)" filter="url(#grain)" />
    <ellipse cx="150" cy="240" rx="55" ry="60" fill="url(#portrait-grad)" filter="url(#grain)" opacity="0.6" />
    <path d="M 130 80 Q 150 60 170 80" fill="none" stroke="#C9A84C" strokeWidth="2" opacity="0.3" />
    <circle cx="135" cy="110" r="4" fill="#C9A84C" opacity="0.3" />
    <circle cx="165" cy="110" r="4" fill="#C9A84C" opacity="0.3" />
    <path d="M 140 140 Q 150 150 160 140" fill="none" stroke="#C9A84C" strokeWidth="1.5" opacity="0.2" />
    <line x1="110" y1="180" x2="190" y2="180" stroke="#C9A84C" strokeWidth="1" opacity="0.15" />
  </svg>
)

export const Founder: React.FC = () => {
  const { t } = useTranslation()

  const { ref: refLabel, isInView: revealLabel } = useScrollReveal(0)
  const { ref: refQuote, isInView: revealQuote } = useScrollReveal(150)
  const { ref: refBio, isInView: revealBio } = useScrollReveal(300)
  const { ref: refFooter, isInView: revealFooter } = useScrollReveal(450)

  return (
    <section id="founder" className={styles.founder}>
      <div className={styles.portraitPanel}>
        <div className={styles.portrait}>
          <PortraitSVG />
        </div>
        <p className={styles.caption}>
          {t('founder.portraitCaption')}
        </p>
      </div>

      <div className={styles.contentPanel}>
        <label
          ref={refLabel as React.Ref<HTMLLabelElement>}
          className={styles.label}
          style={{
            opacity: revealLabel ? 1 : 0,
            transform: revealLabel ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {t('founder.label')}
        </label>

        <blockquote
          ref={refQuote as React.Ref<HTMLQuoteElement>}
          className={styles.quote}
          style={{
            opacity: revealQuote ? 1 : 0,
            transform: revealQuote ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <span className={styles.quoteChar}>"</span>
          {t('founder.quote')}
        </blockquote>

        <p
          ref={refBio as React.Ref<HTMLParagraphElement>}
          className={styles.bio}
          style={{
            opacity: revealBio ? 1 : 0,
            transform: revealBio ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {t('founder.bio')}
        </p>

        <div
          ref={refFooter as React.Ref<HTMLDivElement>}
          className={styles.footer}
          style={{
            opacity: revealFooter ? 1 : 0,
            transform: revealFooter ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
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
