import {ThemeProvider} from '../src'
import styles from './preview.module.css'
import {SunIcon, MoonIcon} from '@primer/octicons-react'

export const globalTypes = {
  colorMode: {
    name: 'Color mode',
    description: 'Color mode (day, night, auto, all)',
    defaultValue: 'day',
    toolbar: {
      icon: 'globe',
      // array of colorMode items
      items: [
        {
          value: 'light',
          title: 'Light'
        },
        {
          value: 'dark',
          title: 'Dark'
        },
        {
          value: 'auto',
          title: 'Auto'
        },
        {
          value: 'all',
          title: 'All'
        }
      ],
      showName: true
    }
  }
}

const withThemeProvider = (Story, context) => {
  if (context.globals.colorMode === 'all') {
    return (
      <div className={styles.colorModeAll}>
        <style
          dangerouslySetInnerHTML={{
            __html: `body { padding: 0 !important; }`
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
    <ThemeProvider colorMode={context.globals.colorMode}>
      <Story {...context} />
    </ThemeProvider>
  )
}

export const decorators = [withThemeProvider]

export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}
