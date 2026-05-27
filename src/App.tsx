import React, { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslations from './locales/en.json'
import ruTranslations from './locales/ru.json'
import faTranslations from './locales/fa.json'
import { LanguageProvider } from './context/LanguageContext'
import { Loader } from './components/Loader/Loader'
import { Nav } from './components/Nav/Nav'
import { Hero } from './components/Hero/Hero'
import { Services } from './components/Services/Services'
import { Portfolio } from './components/Portfolio/Portfolio'
import { Process } from './components/Process/Process'
import { Stats } from './components/Stats/Stats'
import { Clients } from './components/Clients/Clients'
import { Founder } from './components/Founder/Founder'
import { Journal } from './components/Journal/Journal'
import { Contact } from './components/Contact/Contact'
import { Footer } from './components/Footer/Footer'
import { AgentPanel } from './components/AgentPanel/AgentPanel'
import { MorphingShapes } from './components/MorphingShapes/MorphingShapes'
import './index.css'

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslations },
    ru: { translation: ruTranslations },
    fa: { translation: faTranslations },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export const App: React.FC = () => {
  const { i18n: i18nInstance } = useTranslation()
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    // Set document direction based on language
    const htmlElement = document.documentElement
    htmlElement.dir = i18nInstance.language === 'fa' ? 'rtl' : 'ltr'
    htmlElement.lang = i18nInstance.language
  }, [i18nInstance.language])

  const handleLoaderComplete = () => {
    setShowLoader(false)
  }

  return (
    <LanguageProvider>
      <AnimatePresence mode="wait">
        {showLoader && <Loader key="loader" onComplete={handleLoaderComplete} />}
      </AnimatePresence>

      <Nav />

      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Process />
        <Stats />
        <Clients />
        <Founder />
        <Journal />
        <Contact />
        <Footer />
      </main>

      <AgentPanel />
      <MorphingShapes />
    </LanguageProvider>
  )
}

export default App
