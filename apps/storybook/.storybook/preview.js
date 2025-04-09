import React from 'react'
import {ThemeProvider} from '../../../packages/react/src'
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
      icon: 'paintbrush',
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
  showGrid: {
    description: 'Show grid overlay',
    defaultValue: false,
    toolbar: {
      title: 'Grid overlay',
      icon: 'contrast',
      items: [
        {
          value: true,
          title: 'Show',
        },
        {
          value: false,
          title: 'Hide',
        },
      ],
    },
  },
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

export const GridOverlayDecorator = (Story, context) => {
  const showGrid = context.parameters?.showGrid || context.globals.showGrid

  const grid = (
    <div className={styles.grid}>
      <div className={styles.column}></div>
      <div className={styles.column}></div>
      <div className={styles.column}></div>
      <div className={styles.column}></div>
      <div className={styles.column}></div>
      <div className={styles.column}></div>
      <div className={styles.column}></div>
      <div className={styles.column}></div>
      <div className={styles.column}></div>
      <div className={styles.column}></div>
      <div className={styles.column}></div>
      <div className={styles.column}></div>
    </div>
  )

  return (
    <>
      {showGrid && grid}
      <Story {...context} />
    </>
  )
}

export const decorators = [GridOverlayDecorator, ThemeProviderDecorator]

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    grid: {
      // Disable Storybook's built-in grid as it doesn't conform to our grid
      disable: true,
    },
  },
  viewport: {
    defaultViewport: 'reset',
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
