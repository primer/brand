import {ColorModesEnum} from '../../ThemeProvider'

export const themes = ['ai', 'collaboration', 'enterprise', 'security', 'productivity'] as const

export type Themes = (typeof themes)[number]

type Palette = {
  accent1: string
  accent2: string
}

export type ThemeDetailsMap = {
  [theme in Themes]: {
    [ColorModesEnum.LIGHT]: Palette
    [ColorModesEnum.DARK]: Palette
  }
}

export const themeDetailsMap: ThemeDetailsMap = {
  ai: {
    light: {
      accent1: 'var(--base-color-scale-blue-5)',
      accent2: 'var(--base-color-scale-lime-1)',
    },
    dark: {
      accent1: 'var(--base-color-scale-blue-5)',
      accent2: 'var(--base-color-scale-lime-1)',
    },
  },
  collaboration: {
    light: {
      accent1: 'var(--base-color-scale-purple-5)',
      accent2: 'var(--base-color-scale-coral-4)',
    },
    dark: {
      accent1: 'var(--base-color-scale-purple-5)',
      accent2: 'var(--base-color-scale-coral-4)',
    },
  },
  enterprise: {
    light: {
      accent1: 'var(--base-color-scale-purple-5)',
      accent2: 'var(--base-color-scale-lemon-1)',
    },
    dark: {
      accent1: 'var(--base-color-scale-purple-5)',
      accent2: 'var(--base-color-scale-lemon-1)',
    },
  },
  security: {
    light: {
      accent1: 'var(--base-color-scale-teal-2)',
      accent2: 'var(--base-color-scale-lime-1)',
    },
    dark: {
      accent1: 'var(--base-color-scale-teal-2)',
      accent2: 'var(--base-color-scale-lime-1)',
    },
  },
  productivity: {
    light: {
      accent1: 'var(--base-color-scale-indigo-4)',
      accent2: 'var(--base-color-scale-lemon-1)',
    },
    dark: {
      accent1: 'var(--base-color-scale-indigo-4)',
      accent2: 'var(--base-color-scale-lemon-1)',
    },
  },
}
