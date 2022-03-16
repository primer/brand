import {useState, useEffect, createContext} from 'react'

export type ColorModes = 'light' | 'dark' | 'auto'

export type ThemeContextProps = {
  colorMode?: ColorModes
}

export type ThemeProviderProps = {
  children?: React.ReactNode
  colorMode?: ColorModes
}

const defaultMode = 'light'

export const ThemeContext = createContext<ThemeContextProps>({colorMode: defaultMode})

export function ThemeProvider({colorMode = defaultMode, children}: ThemeProviderProps) {
  const [activeMode, setActiveMode] = useState(colorMode)
  useEffect(() => {
    if (colorMode === 'auto') {
      setActiveMode(getActiveAutoMode())
    } else if (activeMode !== colorMode) {
      setActiveMode(colorMode)
    }
    return onBrowserThemeChanged(setActiveMode)
  }, [colorMode, setActiveMode])

  return (
    <ThemeContext.Provider value={{colorMode: activeMode}}>
      <div data-color-mode={activeMode}>{children}</div>
    </ThemeContext.Provider>
  )
}

const queryBrowserPreference = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')

const getActiveAutoMode = () => {
  const mql: MediaQueryList = queryBrowserPreference()
  return mql && mql.matches ? 'dark' : 'light'
}

const onBrowserThemeChanged = cb => {
  const mql = queryBrowserPreference()
  const changeHandler = e => cb(e.matches ? 'dark' : 'light')
  mql && mql.addEventListener('change', changeHandler)
  return () => mql && mql.removeEventListener('change', changeHandler)
}
