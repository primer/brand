import {useState, useEffect, createContext} from 'react'

export enum ColorModesEnum {
  LIGHT = 'light',
  DARK = 'dark',
  AUTO = 'auto'
}

export type ColorModes = `${ColorModesEnum}`

export type ThemeContextProps = {
  /*
   * An explicit color mode value
   */
  colorMode?: ColorModes
}

export type ThemeProviderProps = {
  children?: React.ReactElement
  colorMode?: ColorModes
}

const defaultMode = ColorModesEnum.LIGHT

export const ThemeContext = createContext<ThemeContextProps>({colorMode: defaultMode})

/**
 * ThemeProvider is used to provide theme-related context to its child components.
 */
export function ThemeProvider({colorMode = defaultMode, children}: ThemeProviderProps) {
  const [activeMode, setActiveMode] = useState(colorMode)

  useEffect(() => {
    if (colorMode === ColorModesEnum.AUTO) {
      setActiveMode(getActiveAutoMode())
    } else if (activeMode !== colorMode) {
      setActiveMode(colorMode)
    }

    return handleSystemPreferenceChange(setActiveMode)
  }, [colorMode, setActiveMode])

  return (
    <ThemeContext.Provider value={{colorMode: activeMode}}>
      <div data-color-mode={activeMode}>{children}</div>
    </ThemeContext.Provider>
  )
}

const queryBrowserPreference = () =>
  window.matchMedia && window.matchMedia(`(prefers-color-scheme: ${ColorModesEnum.DARK})`)

const getActiveAutoMode = () => {
  const mql: MediaQueryList = queryBrowserPreference()
  return mql && mql.matches ? ColorModesEnum.DARK : ColorModesEnum.LIGHT
}

const handleSystemPreferenceChange = cb => {
  const mql = queryBrowserPreference()
  const changeHandler = e => cb(e.matches ? ColorModesEnum.DARK : ColorModesEnum.LIGHT)
  mql && mql.addEventListener('change', changeHandler)
  return () => mql && mql.removeEventListener('change', changeHandler)
}
