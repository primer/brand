import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(Backend) // loads the translations from /static/locales
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    debug: false,
    backend: {
      loadPath: window.location.pathname.startsWith('/brand/storybook/')
        ? '/brand/storybook/locales/{{lng}}/{{ns}}.json'
        : '/locales/{{lng}}/{{ns}}.json',
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
