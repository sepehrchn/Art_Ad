import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import styles from './Loader.module.css'

interface LoaderProps {
  onComplete: () => void
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const startTime = performance.now()
    const duration = prefersReducedMotion ? 0 : 1600 // Skip animation if reduced motion

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const currentProgress = Math.min((elapsed / (duration || 1)) * 100, 100)
      setProgress(currentProgress)

      if (elapsed < (duration || 1)) {
        requestAnimationFrame(animate)
      } else {
        // 400ms pause then trigger exit animation
        setTimeout(() => {
          onComplete()
        }, prefersReducedMotion ? 0 : 400)
      }
    }

    requestAnimationFrame(animate)
  }, [onComplete, prefersReducedMotion])

  return (
    <motion.div
      className={styles.loader}
      initial={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ ease: [0.77, 0, 0.175, 1], duration: prefersReducedMotion ? 0 : 0.6 }}
    >
      <div className={styles.container}>
        <div className={styles.progressBar}>
          <div
            className={styles.progress}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className={styles.counter}>
          {String(Math.floor(progress)).padStart(2, '0')}
        </div>
      </div>
    </motion.div>
  )
}
