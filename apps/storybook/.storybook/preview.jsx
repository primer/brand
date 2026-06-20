import React, {Suspense} from 'react'
import {I18nextProvider} from 'react-i18next'
import {INITIAL_VIEWPORTS} from 'storybook/viewport'
import {ThemeProvider} from '../../../packages/react/src'
import i18n from './i18n'
import styles from './preview.module.css'
import '../../../packages/react/src/css/stylesheets'
import '../../../packages/react/src/css/utilities.css'

import '@primer/brand-fonts/fonts.css'

export const globalTypes = {
  colorMode: {
    name: 'Color mode',
    description: 'Color mode (light, dark, auto, all)',
    defaultValue: 'light',
    toolbar: {
      icon: 'globe',
      // array of colorMode items
      items: [
        {
          value: 'light',
          title: 'Light',
        },
        {
          value: 'dark',
          title: 'Dark',
        },
        {
          value: 'auto',
          title: 'Auto',
        },
        {
          value: 'all',
          title: 'All',
        },
      ],
      title: 'Color mode',
    },
  },
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: [
        {value: 'en', title: 'English'},
        {value: 'de', title: 'Deutsch'},
        {value: 'es', title: 'Español'},
        {value: 'fr', title: 'Français'},
        {value: 'ja', title: '日本語'},
        {value: 'pt-BR', title: 'Português (Brasil)'},
      ],
      showName: true,
      title: 'Language selector',
    },
  },
}

const withI18next = (Story, context) => {
  const {locale} = context.globals

  i18n.changeLanguage(locale)

  return (
    <Suspense fallback={<div>loading translations...</div>}>
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    </Suspense>
  )
}

const ThemeProviderDecorator = (Story, context) => {
  const colorMode = context.parameters?.colorMode || context.globals.colorMode
  // from Storybook v7, this can't be applied as a side effect
  if (colorMode === 'auto') {
    document.body.removeAttribute('data-color-mode')
  }

  if (['light', 'dark'].includes(colorMode)) {
    document.body.setAttribute('data-color-mode', colorMode)
  }

  if (context && colorMode === 'all') {
    return (
      <div className={styles['color-mode-all']}>
        <style
          dangerouslySetInnerHTML={{
            __html: `body { padding: 0 !important; }`,
          }}
        />
        <ThemeProvider colorMode="light">
          <Story {...context} />
        </ThemeProvider>
        <ThemeProvider colorMode="dark">
          <Story {...context} />
        </ThemeProvider>
      </div>
    )
  }

  return (
    <ThemeProvider colorMode={colorMode}>
      <Story {...context} />
    </ThemeProvider>
  )
}

export const decorators = [ThemeProviderDecorator, withI18next]

export const parameters = {
  viewport: {
    options: INITIAL_VIEWPORTS,
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: (a, b) => {
      const titleCompare = a.title.localeCompare(b.title)

      // Sort top level alphabetically, with nested folders below nested stories
      if (titleCompare !== 0) {
        return titleCompare
      }

      // Put default story above playground in the component folder
      if (a.name === 'Default') {
        return -1
      }

      // Sort features and examples in the order they're written
      return 0
    },
  },
}
