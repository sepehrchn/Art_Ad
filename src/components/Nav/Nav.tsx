import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useLanguage } from '../../context/LanguageContext'
import styles from './Nav.module.css'

export const Nav: React.FC = () => {
  const { t, i18n } = useTranslation()
  const { changeLanguage } = useLanguage()
  const activeSection = useActiveSection()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { key: 'work', id: 'portfolio' },
    { key: 'services', id: 'services' },
    { key: 'studio', id: 'stats' },
    { key: 'founder', id: 'founder' },
    { key: 'journal', id: 'journal' },
    { key: 'contact', id: 'contact' },
  ]

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLanguageChange = (lang: string) => {
    changeLanguage(lang)
  }

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          <button className={styles.logo} onClick={handleLogoClick}>
            FORMA
          </button>

          <div className={styles.links}>
            {navItems.map((item) => (
              <button
                key={item.key}
                className={`${styles.link} ${
                  activeSection[item.id] ? styles.active : ''
                }`}
                onClick={() => handleNavClick(item.id)}
              >
                {t(`nav.${item.key}`)}
              </button>
            ))}
          </div>

          <div className={styles.languageToggle}>
            {['en', 'ru', 'fa'].map((lang) => (
              <button
                key={lang}
                className={`${styles.langButton} ${
                  i18n.language === lang ? styles.activeLanguage : ''
                }`}
                onClick={() => handleLanguageChange(lang)}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            className={`${styles.hamburger} ${mobileMenuOpen ? styles.open : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileLinks}>
            {navItems.map((item) => (
              <button
                key={item.key}
                className={styles.mobileLink}
                onClick={() => handleNavClick(item.id)}
              >
                {t(`nav.${item.key}`)}
              </button>
            ))}
          </div>

          <div className={styles.mobileLanguageToggle}>
            {['en', 'ru', 'fa'].map((lang) => (
              <button
                key={lang}
                className={`${styles.mobileLangButton} ${
                  i18n.language === lang ? styles.activeLanguage : ''
                }`}
                onClick={() => handleLanguageChange(lang)}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
