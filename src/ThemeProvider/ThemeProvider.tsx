import React, {useState, useEffect, createContext, PropsWithChildren} from 'react'

export enum ColorModesEnum {
  LIGHT = 'light',
  DARK = 'dark',
  AUTO = 'auto'
}

export type ColorMode = `${ColorModesEnum}`

export type ThemeContextProps = {
  /*
   * An explicit color mode value
   */
  colorMode?: ColorMode
}

export type ThemeProviderProps = {
  colorMode?: ColorMode
}

const defaultMode = ColorModesEnum.LIGHT

export const ThemeContext = createContext<ThemeContextProps>({colorMode: defaultMode})

/**
 * ThemeProvider is used to provide theme-related context to its child components.
 */
export function ThemeProvider({colorMode = defaultMode, children}: PropsWithChildren<ThemeProviderProps>) {
  const [activeMode, setActiveMode] = useState(colorMode)

  useEffect(() => {
    if (colorMode === ColorModesEnum.AUTO) {
      setActiveMode(getActiveAutoMode())
    } else if (activeMode !== colorMode) {
      setActiveMode(colorMode)
    }

    return handleSystemPreferenceChange(setActiveMode)
  }, [colorMode, activeMode, setActiveMode])

  return (
    <ThemeContext.Provider value={{colorMode: activeMode}}>
      <div data-color-mode={activeMode}>{children}</div>
    </ThemeContext.Provider>
  )
}

const queryBrowserPreference = () => window.matchMedia(`(prefers-color-scheme: ${ColorModesEnum.DARK})`)

const getActiveAutoMode = () => {
  const mediaQueryList: MediaQueryList = queryBrowserPreference()
  return mediaQueryList.matches ? ColorModesEnum.DARK : ColorModesEnum.LIGHT
}

const handleSystemPreferenceChange = callback => {
  const mediaQueryList = queryBrowserPreference()
  const changeHandler = event => callback(event.matches ? ColorModesEnum.DARK : ColorModesEnum.LIGHT)
  mediaQueryList.addEventListener('change', changeHandler)
  return () => mediaQueryList.removeEventListener('change', changeHandler)
}
