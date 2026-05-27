import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import styles from './Journal.module.css'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface JournalEntry {
  id: number
  category: string
  date: string
  title: string
  excerpt: string
}

export function Journal() {
  const { t } = useTranslation()
  const { ref, isInView } = useScrollReveal()
  const prefersReducedMotion = useReducedMotion()
  const [entries, setEntries] = useState<JournalEntry[]>([])

  useEffect(() => {
    // Parse entries from i18n
    try {
      const journalData = t('journal', { returnObjects: true })
      const articles: JournalEntry[] = []
      
      let idx = 1
      while (journalData[`article${idx}`]) {
        const article = journalData[`article${idx}`]
        articles.push({
          id: idx,
          category: article.category || '',
          date: article.date || '',
          title: article.title || '',
          excerpt: article.excerpt || ''
        })
        idx++
      }
      
      setEntries(articles)
    } catch (e) {
      console.error('Failed to load journal entries:', e)
      setEntries([])
    }
  }, [t])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: 0,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.7,
      },
    },
  }

  return (
    <section className={styles.journal} ref={ref} id="journal">
      <h2 className={styles.title}>{t('journal.title', 'Journal')}</h2>
      <motion.div 
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {entries.map((entry) => (
          <motion.article
            key={entry.id}
            className={styles.card}
            variants={cardVariants}
          >
            <div className={styles.header}>
              <span className={styles.category}>{entry.category}</span>
              <span className={styles.date}>{entry.date}</span>
            </div>
            <h3 className={styles.cardTitle}>{entry.title}</h3>
            <p className={styles.excerpt}>{entry.excerpt}</p>
            <div className={styles.footer}>
              <a href="#" className={styles.readMore} aria-label={`Read more about: ${entry.title}`}>
                {t('common.readMore', 'Read More')}
                <span className={styles.arrow} aria-hidden="true">→</span>
              </a>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}

