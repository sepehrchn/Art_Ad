import React, { createContext, useContext, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

interface LanguageContextType {
  currentLanguage: string
  changeLanguage: (lang: string) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { i18n } = useTranslation()

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang

    document.body.classList.remove('lang-fa', 'lang-hy')
    if (lang === 'fa') {
      document.body.classList.add('lang-fa')
    } else if (lang === 'hy') {
      document.body.classList.add('lang-hy')
    }
  }

  const value: LanguageContextType = {
    currentLanguage: i18n.language,
    changeLanguage,
  }

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  )
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
