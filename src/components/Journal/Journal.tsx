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
  image: string
}

export function Journal() {
  const { t } = useTranslation()
  const titleRef = useScrollReveal<HTMLHeadingElement>()
  const [entries, setEntries] = useState<JournalEntry[]>([])

  useEffect(() => {
    try {
      const journalData = t('journal.articles', { returnObjects: true }) as any
      const images = [
        '/images/journal/article-1.jpg',
        '/images/journal/article-2.jpg',
        '/images/journal/article-3.jpg'
      ]
      const articleKeys = ['article1', 'article2', 'article3']
      const articles: JournalEntry[] = articleKeys.map((key, idx) => {
        const article = t(`journal.${key}`, { returnObjects: true }) as any
        return {
          id: idx + 1,
          category: article.category || '',
          date: article.date || '',
          title: article.title || '',
          excerpt: article.excerpt || '',
          image: images[idx]
        }
      })
      setEntries(articles)
    } catch (e) {
      console.error('Failed to load journal entries:', e)
      setEntries([])
    }
  }, [t])

  return (
    <section id="journal" className={styles.journal}>
      <h2 className={`${styles.title} reveal-title`} ref={titleRef}>
        {t('journal.title')}
      </h2>

      <div className={styles.grid}>
        {entries.map((entry, index) => (
          <JournalCard 
            key={entry.id} 
            entry={entry} 
            delayOffset={index * 150}
          />
        ))}
      </div>
    </section>
  )
}

interface JournalCardProps {
  entry: JournalEntry
  delayOffset: number
}

const JournalCard: React.FC<JournalCardProps> = ({ entry, delayOffset }) => {
  const { t } = useTranslation()
  const ref = useScrollReveal()
  const prefersReducedMotion = useReducedMotion()

  const cardStyle = {
    transitionDelay: prefersReducedMotion ? '0ms' : `${delayOffset}ms`,
  }

  return (
    <article
      ref={ref}
      className={`${styles.card} reveal-card`}
      style={cardStyle}
    >
      <div className={styles.thumbnail}>
        <img src={entry.image} alt={entry.title} />
      </div>
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
    </article>
  )
}

