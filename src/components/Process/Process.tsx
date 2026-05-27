import React from 'react'
import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import styles from './Process.module.css'

export const Process: React.FC = () => {
  const { t } = useTranslation()

  const steps = ['step1', 'step2', 'step3', 'step4', 'step5']

  return (
    <section id="process" className={styles.process}>
      <h2 className={styles.title}>{t('process.title')}</h2>

      <div className={styles.container}>
        <div className={styles.line}></div>

        <div className={styles.steps}>
          {steps.map((step, index) => (
            <ProcessStep
              key={index}
              stepKey={step}
              index={index}
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
}

const ProcessStep: React.FC<ProcessStepProps> = ({ stepKey, index }) => {
  const { t } = useTranslation()
  const { ref, isInView } = useScrollReveal(0)

  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      className={styles.step}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
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
