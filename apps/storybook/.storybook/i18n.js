import {default as i18n} from 'i18next'
import Backend from 'i18next-http-backend'

i18n
  .use(Backend) // loads the translations from /static/locales
  .init({
    lng: 'en', // default language
    fallbackLng: false, // disable fallback
    ns: [], // start with empty namespaces
    defaultNS: false, // disable default namespace
    debug: false,
    backend: {
      loadPath: (lngs, namespaces) => {
        // Component-specific translations only
        const namespace = namespaces[0]
        const lng = lngs[0]

        const basePath = window.location.pathname.startsWith('/brand/storybook/')
          ? '/brand/storybook/locales'
          : '/locales'
        return `${basePath}/${lng}/${namespace}.json`
      },
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
