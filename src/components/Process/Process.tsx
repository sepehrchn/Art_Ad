import React from 'react'
import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import styles from './Process.module.css'

export const Process: React.FC = () => {
  const { t } = useTranslation()
  const titleRef = useScrollReveal<HTMLHeadingElement>()

  const steps = ['step1', 'step2', 'step3', 'step4', 'step5']

  return (
    <section id="process" className={styles.process}>
      <h2 className={`${styles.title} reveal-title`} ref={titleRef}>{t('process.title')}</h2>

      <div className={styles.container}>
        <div className={styles.line}></div>

        <div className={styles.steps}>
          {steps.map((step, index) => (
            <ProcessStep
              key={index}
              stepKey={step}
              index={index}
              delayOffset={index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

interface ProcessStepProps {
  stepKey: string
  index: number
  delayOffset: number
}

const ProcessStep: React.FC<ProcessStepProps> = ({ stepKey, index, delayOffset }) => {
  const { t } = useTranslation()
  const ref = useScrollReveal<HTMLDivElement>()

  const stepStyle = {
    transitionDelay: `${delayOffset}ms`,
  }

  return (
    <div
      ref={ref}
      className={`${styles.step} reveal-card`}
      style={stepStyle}
    >
      <div className={styles.badge}>
        {index + 1}
      </div>

      <div className={styles.content}>
        <h3 className={styles.stepName}>
          {t(`process.${stepKey}.name`)}
        </h3>
        <p className={styles.description}>
          {t(`process.${stepKey}.description`)}
        </p>
      </div>
    </div>
  )
}
