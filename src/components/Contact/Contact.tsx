import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import styles from './Contact.module.css'

export const Contact: React.FC = () => {
  const { t } = useTranslation()
  const { ref: refForm } = useScrollReveal(0)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    budget: '',
    timeline: '',
    message: '',
  })

  const [errors, setErrors] = useState<{ [key: string]: boolean }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validateEmail = (email: string): boolean => {
    return email.includes('@') && email.includes('.')
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: { [key: string]: boolean } = {}

    if (!formData.name.trim()) newErrors.name = true
    if (!validateEmail(formData.email)) newErrors.email = true
    if (!formData.service) newErrors.service = true
    if (!formData.message.trim()) newErrors.message = true

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          service: '',
          budget: '',
          timeline: '',
          message: '',
        })
        setIsSuccess(false)
      }, 3000)
    }, 1500)
  }

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.left}>
        <label className={styles.label}>{t('contact.label')}</label>
        <h2 className={styles.heading}>{t('contact.heading')}</h2>

        <div className={styles.divider}></div>

        <p className={styles.intro}>{t('contact.intro')}</p>

        <div className={styles.info}>
          <a href={`mailto:${t('contact.email')}`} className={styles.email}>
            {t('contact.email')}
          </a>
          <p className={styles.offices}>{t('contact.offices')}</p>
        </div>
      </div>

      <div ref={refForm} className={styles.right}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.row}>
            <input
              type="text"
              name="name"
              placeholder={t('contact.form.name')}
              value={formData.name}
              onChange={handleChange}
              className={`${styles.input} ${errors.name ? styles.error : ''}`}
              aria-label={t('contact.form.name')}
              aria-required="true"
            />
            <input
              type="email"
              name="email"
              placeholder={t('contact.form.email')}
              value={formData.email}
              onChange={handleChange}
              className={`${styles.input} ${errors.email ? styles.error : ''}`}
              aria-label={t('contact.form.email')}
              aria-required="true"
              aria-invalid={errors.email}
            />
          </div>

          <div className={styles.fullWidth}>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className={`${styles.input} ${styles.select} ${
                errors.service ? styles.error : ''
              }`}
              aria-label={t('contact.form.service')}
              aria-required="true"
            >
              <option value="">{t('contact.form.service')}</option>
              <option value="brand">{t('contact.serviceOptions.brand')}</option>
              <option value="campaign">
                {t('contact.serviceOptions.campaign')}
              </option>
              <option value="production">
                {t('contact.serviceOptions.production')}
              </option>
              <option value="art">{t('contact.serviceOptions.art')}</option>
              <option value="consulting">
                {t('contact.serviceOptions.consulting')}
              </option>
            </select>
          </div>

          <div className={styles.row}>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className={`${styles.input} ${styles.select}`}
              aria-label={t('contact.form.budget')}
            >
              <option value="">{t('contact.form.budget')}</option>
              <option value="small">{t('contact.budgetOptions.small')}</option>
              <option value="medium">
                {t('contact.budgetOptions.medium')}
              </option>
              <option value="large">{t('contact.budgetOptions.large')}</option>
              <option value="enterprise">
                {t('contact.budgetOptions.enterprise')}
              </option>
            </select>
            <select
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className={`${styles.input} ${styles.select}`}
              aria-label={t('contact.form.timeline')}
            >
              <option value="">{t('contact.form.timeline')}</option>
              <option value="quick">{t('contact.timelineOptions.quick')}</option>
              <option value="medium">
                {t('contact.timelineOptions.medium')}
              </option>
              <option value="flexible">
                {t('contact.timelineOptions.flexible')}
              </option>
            </select>
          </div>

          <div className={styles.fullWidth}>
            <textarea
              name="message"
              placeholder={t('contact.form.message')}
              value={formData.message}
              onChange={handleChange}
              className={`${styles.input} ${styles.textarea} ${
                errors.message ? styles.error : ''
              }`}
              aria-label={t('contact.form.message')}
              aria-required="true"
              rows={5}
            />
          </div>

          <button
            type="submit"
            className={`${styles.submit} ${isLoading ? styles.loading : ''} ${
              isSuccess ? styles.success : ''
            }`}
            disabled={isLoading || isSuccess}
          >
            {isSuccess
              ? t('contact.form.sent')
              : isLoading
                ? t('contact.form.sending')
                : t('contact.form.submit')}
          </button>
        </form>
      </div>
    </section>
  )
}
