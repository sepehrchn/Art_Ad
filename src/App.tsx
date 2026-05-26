import React, { useState } from 'react'
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
  const [showLoader, setShowLoader] = useState(false)

  const handleLoaderComplete = () => {
    setShowLoader(false)
  }

  return (
    <LanguageProvider>
      {showLoader && <Loader onComplete={handleLoaderComplete} />}

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
