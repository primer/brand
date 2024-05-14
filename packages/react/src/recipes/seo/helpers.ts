import {ColorModesEnum} from '../../ThemeProvider'

export const themes = ['ai', 'collaboration', 'enterprise', 'security', 'productivity'] as const

export type Themes = (typeof themes)[number]

export type ThemeDetailsMap = {
  [theme in Themes]: {
    [ColorModesEnum.LIGHT]: {
      color: string
    }
    [ColorModesEnum.DARK]: {
      color: string
    }
  }
}

export const themeDetailsMap: ThemeDetailsMap = {
  ai: {
    light: {
      color: 'var(--base-color-scale-purple-5)',
    },
    dark: {
      // TODO: Update color with design
      color: 'brown',
    },
  },
  collaboration: {
    light: {
      color: 'var(--base-color-scale-pink-5)',
    },
    dark: {
      // TODO: Update color with design
      color: 'brown',
    },
  },
  enterprise: {
    light: {
      color: 'var(--base-color-scale-indigo-6)',
    },
    dark: {
      color: 'var(--base-color-scale-indigo-4)',
    },
  },
  security: {
    light: {
      color: 'var(--base-color-scale-blue-5)',
    },
    dark: {
      // TODO: Update color with design
      color: 'brown',
    },
  },
  productivity: {
    light: {
      color: 'var(--base-color-scale-green-5)',
    },
    dark: {
      // TODO: Update color with design
      color: 'brown',
    },
  },
}
