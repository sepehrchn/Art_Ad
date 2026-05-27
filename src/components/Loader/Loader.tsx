import React, { useEffect } from 'react'
import { motion, useAnimationControls, Variants } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import styles from './Loader.module.css'

interface LoaderProps {
  onComplete: () => void
}

const svgVariant: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const pathVariant: Variants = {
  hidden: {
    pathLength: 0,
    fill: 'rgba(240, 235, 224, 0)',
  },
  visible: {
    pathLength: 1,
    fill: 'rgba(240, 235, 224, 0)',
    transition: {
      pathLength: {
        delay: 0.2,
        duration: 1.4,
                ease: 'circOut',
      },
    },
  },
  fill: {
    fill: 'rgba(240, 235, 224, 1)',
    transition: {
      fill: {
        delay: 0,
        duration: 0.4,
      },
    },
  },
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const controls = useAnimationControls()
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const sequence = async () => {
      if (prefersReducedMotion) {
        onComplete()
      } else {
        await controls.start('visible')
        await controls.start('fill')
        setTimeout(() => {
          onComplete()
        }, 300)
      }
    }
    sequence()
  }, [controls, onComplete, prefersReducedMotion])

  return (
    <motion.div
      className={styles.loader}
      exit={{ 
        opacity: 0,
        scale: 1.1,
        transition: { 
          duration: 0.4, 
                    ease: 'easeOut' 
        }
      }}
      onAnimationComplete={definition => {
        if (definition === 'exit') {
          onComplete()
        }
      }}
    >
      <motion.svg
        className={styles.svgContainer}
        viewBox="0 0 800 200"
        variants={svgVariant}
        initial="hidden"
        animate={controls}
      >
        <motion.text
          x="50%"
          y="50%"
          dy="30px"
          className={styles.svgText}
          variants={pathVariant}
        >
          FORMA
        </motion.text>
      </motion.svg>
    </motion.div>
  )
}
