import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './Footer.module.css'

export const Footer: React.FC = () => {
  const { t } = useTranslation()

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.logo}>FORMA</div>

        <div className={styles.links}>
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>
              {t('footer.work.label')}
            </h4>
            <ul>
              <li>
                <a href="#">{t('footer.work.link1')}</a>
              </li>
              <li>
                <a href="#">{t('footer.work.link2')}</a>
              </li>
              <li>
                <a href="#">{t('footer.work.link3')}</a>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>
              {t('footer.studio.label')}
            </h4>
            <ul>
              <li>
                <a href="#">{t('footer.studio.link1')}</a>
              </li>
              <li>
                <a href="#">{t('footer.studio.link2')}</a>
              </li>
              <li>
                <a href="#">{t('footer.studio.link3')}</a>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>
              {t('footer.connect.label')}
            </h4>
            <ul>
              <li>
                <a href="#">{t('footer.connect.link1')}</a>
              </li>
              <li>
                <a href="#">{t('footer.connect.link2')}</a>
              </li>
              <li>
                <a href="#">{t('footer.connect.link3')}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span className={styles.copyright}>
          {t('footer.copyright')}
        </span>
        <span className={styles.tagline}>{t('footer.tagline')}</span>
      </div>
    </footer>
  )
}
