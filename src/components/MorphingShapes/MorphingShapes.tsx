import React from 'react'
import styles from './MorphingShapes.module.css'

export const MorphingShapes: React.FC = () => {
  return (
    <div className={styles.container}>
      <svg className={styles.shape1} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M50,10 L90,40 L70,90 L30,90 L10,40 Z" fill="none" stroke="#C9A84C" strokeWidth="1.5" opacity="0.6" />
      </svg>
      
      <svg className={styles.shape2} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="40" fill="none" stroke="#C9A84C" strokeWidth="1.5" opacity="0.5" />
      </svg>
      
      <svg className={styles.shape3} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="60" height="60" fill="none" stroke="#C9A84C" strokeWidth="1.5" opacity="0.55" />
      </svg>
    </div>
  )
}
