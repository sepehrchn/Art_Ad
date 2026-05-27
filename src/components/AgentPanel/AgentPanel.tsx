import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './AgentPanel.module.css'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const DEMO_RESPONSES = [
  "We specialize in brand identity, campaign experiences, creative production, and strategic consulting. What interests you most?",
  "Our process involves five key stages: Discovery, Concept, Creation, Launch, and Refine. Each phase ensures your vision comes to life with precision.",
  "We have studios in Yerevan, Dubai, and London, serving clients across luxury, fashion, hospitality, technology, culture, and architecture.",
  "Ariana founded FORMA to create work at the intersection of art and commerce. Our philosophy: art without strategy is decoration; strategy without art is noise.",
  "Budget depends on project scope. We typically work with ranges from $10K for small projects to $200K+ for comprehensive campaigns.",
  "Tell us about your project vision, timeline, and desired outcome. We will discuss how our services can bring your ideas to reality.",
]

export const AgentPanel: React.FC = () => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: t('agent.greeting') },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = { role: 'user', content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate API delay and random response
    setTimeout(() => {
      const randomResponse =
        DEMO_RESPONSES[Math.floor(Math.random() * DEMO_RESPONSES.length)]
      const assistantMessage: Message = {
        role: 'assistant',
        content: randomResponse,
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      <button
        className={styles.fab}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close assistant' : 'Open assistant'}
        aria-expanded={isOpen}
      >
        {isOpen ? '×' : '✦'}
      </button>

      {isOpen && (
        <div className={styles.panel}>
          <div className={styles.header}>
            <div className={styles.avatar}>✦</div>
            <div className={styles.headerInfo}>
              <h3 className={styles.title}>{t('agent.title')}</h3>
              <p className={styles.status}>{t('agent.status')}</p>
            </div>
            <button
              className={styles.close}
              onClick={() => setIsOpen(false)}
              title="Close"
            >
              ×
            </button>
          </div>

          <div className={styles.messages}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${styles.message} ${styles[msg.role]}`}
              >
                <div className={styles.messageDot}></div>
                <div className={styles.messageContent}>{msg.content}</div>
              </div>
            ))}

            {isLoading && (
              <div className={`${styles.message} ${styles.assistant}`}>
                <div className={styles.messageDot}></div>
                <div className={styles.typingIndicator}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputArea}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('agent.placeholder')}
              className={styles.input}
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className={styles.sendButton}
              title="Send"
            >
              ↑
            </button>
          </div>
        </div>
      )}
    </>
  )
}
