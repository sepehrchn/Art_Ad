import { useRef, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './Journal.module.css'
import { useScrollReveal } from '../../hooks/useScrollReveal'

interface JournalEntry {
  id: number
  category: string
  date: string
  title: string
  excerpt: string
}

export function Journal() {
  const { t } = useTranslation()
  const { ref, isRevealed } = useScrollReveal()
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

  return (
    <section className={styles.journal} ref={ref} id="journal">
      <h2 className={styles.title}>{t('journal.title', 'Journal')}</h2>
      <div className={styles.grid}>
        {entries.map((entry, idx) => (
          <article
            key={entry.id}
            className={`${styles.card} ${isRevealed ? styles.reveal : ''}`}
            style={{
              animationDelay: isRevealed ? `${idx * 0.1}s` : undefined
            }}
          >
            <div className={styles.header}>
              <span className={styles.category}>{entry.category}</span>
              <span className={styles.date}>{entry.date}</span>
            </div>
            <h3 className={styles.cardTitle}>{entry.title}</h3>
            <p className={styles.excerpt}>{entry.excerpt}</p>
            <div className={styles.footer}>
              <a href="#" className={styles.readMore}>
                {t('common.readMore', 'Read More')}
                <span className={styles.arrow}>→</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

