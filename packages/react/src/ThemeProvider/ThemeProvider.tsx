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
    if (colorMode !== ColorModesEnum.AUTO) return

    setAutoMode(getActiveAutoMode())
    return handleSystemPreferenceChange(setAutoMode)
  }, [colorMode])

  return (
    <ThemeContext.Provider value={{colorMode: activeMode, availableColorModes}}>
      <div data-color-mode={activeMode} {...rest}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

const queryBrowserPreference = () => window.matchMedia(`(prefers-color-scheme: ${ColorModesEnum.DARK})`)

const getActiveAutoMode = (): ResolvedColorMode => {
  const mediaQueryList: MediaQueryList = queryBrowserPreference()
  return mediaQueryList.matches ? ColorModesEnum.DARK : ColorModesEnum.LIGHT
}

const handleSystemPreferenceChange = (callback: (mode: ResolvedColorMode) => void) => {
  const mediaQueryList = queryBrowserPreference()
  const changeHandler = (event: MediaQueryListEvent) =>
    callback(event.matches ? ColorModesEnum.DARK : ColorModesEnum.LIGHT)
  mediaQueryList.addEventListener('change', changeHandler)
  return () => mediaQueryList.removeEventListener('change', changeHandler)
}
