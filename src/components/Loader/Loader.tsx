import React, { useEffect, useState } from 'react'
import styles from './Loader.module.css'

interface LoaderProps {
  onComplete: () => void
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const startTime = performance.now()
    const duration = 1600 // 1.6s

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const currentProgress = Math.min((elapsed / duration) * 100, 100)
      setProgress(currentProgress)

      if (elapsed < duration) {
        requestAnimationFrame(animate)
      } else {
        // 400ms pause
        setTimeout(() => {
          // 800ms fade-out
          setIsVisible(false)
          setTimeout(() => {
            onComplete()
          }, 800)
        }, 400)
      }
    }

    requestAnimationFrame(animate)
  }, [onComplete])

  if (!isVisible) {
    return null
  }

  return (
    <div
      className={styles.loader}
      style={{ opacity: isVisible ? 1 : 0 }}
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
    </div>
  )
}
