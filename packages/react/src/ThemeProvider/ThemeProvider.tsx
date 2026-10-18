import React, {useState, useMemo, createContext, HTMLAttributes, PropsWithChildren} from 'react'
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect'

export enum ColorModesEnum {
  LIGHT = 'light',
  DARK = 'dark',
  AUTO = 'auto',
}

export type ColorMode = `${ColorModesEnum}` | (string & {})
export type ResolvedColorMode = ColorModesEnum.LIGHT | ColorModesEnum.DARK

/**
 * Resolves a color mode to the light or dark theme it should use.
 */
function resolveColorMode(mode: string): ResolvedColorMode {
  return mode === ColorModesEnum.DARK || mode.startsWith(`${ColorModesEnum.DARK}_`)
    ? ColorModesEnum.DARK
    : ColorModesEnum.LIGHT
}

export type ThemeContextProps = {
  /*
   * The active color mode of the parent ThemeProvider.
   */
  colorMode: ResolvedColorMode

  /*
   * The colorMode prop before its resolved to a valid theme.
   */
  originalColorMode?: ColorMode

  /*
   * List of available color modes.
   */
  availableColorModes: ColorModesEnum[]
}

export type ThemeProviderProps = {
  colorMode?: ColorMode
} & HTMLAttributes<HTMLDivElement>

const defaultMode = ColorModesEnum.LIGHT
export const ThemeContext = createContext<ThemeContextProps>({
  colorMode: defaultMode,
  originalColorMode: defaultMode,
  availableColorModes: Object.values(ColorModesEnum),
})

/**
 * ThemeProvider is used to provide theme-related context to its child components.
 */
export function ThemeProvider({colorMode = defaultMode, children, ...rest}: PropsWithChildren<ThemeProviderProps>) {
  const [autoMode, setAutoMode] = useState<ResolvedColorMode>(defaultMode)
  const activeMode = colorMode === ColorModesEnum.AUTO ? autoMode : resolveColorMode(colorMode)
  const availableColorModes = useMemo(() => Object.values(ColorModesEnum), [])

  useIsomorphicLayoutEffect(() => {
    if (colorMode !== ColorModesEnum.AUTO || typeof window.matchMedia !== 'function') return

    const preference = window.matchMedia(`(prefers-color-scheme: ${ColorModesEnum.DARK})`)
    const handlePreferenceChange = (event: MediaQueryListEvent) => {
      setAutoMode(event.matches ? ColorModesEnum.DARK : ColorModesEnum.LIGHT)
    }

    preference.addEventListener('change', handlePreferenceChange)
    setAutoMode(preference.matches ? ColorModesEnum.DARK : ColorModesEnum.LIGHT)
    return () => preference.removeEventListener('change', handlePreferenceChange)
  }, [colorMode])

  return (
    <ThemeContext.Provider value={{colorMode: activeMode, originalColorMode: colorMode, availableColorModes}}>
      <div data-color-mode={colorMode === ColorModesEnum.AUTO ? ColorModesEnum.AUTO : activeMode} {...rest}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}
