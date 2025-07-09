import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(Backend) // loads the translations from the correct path based on environment
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    debug: false,
    backend: {
      loadPath:
        process.env.GITHUB_ACTIONS === 'true'
          ? '/brand/storybook/locales/{{lng}}/{{ns}}.json'
          : '/locales/{{lng}}/{{ns}}.json',
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
