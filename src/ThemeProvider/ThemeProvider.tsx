import React, {useState, useMemo, useEffect, createContext, Dispatch, HTMLAttributes, PropsWithChildren} from 'react'

export enum ColorModesEnum {
  LIGHT = 'light',
  DARK = 'dark',
  AUTO = 'auto'
}

export type ColorMode = `${ColorModesEnum}`

export type ThemeContextProps = {
  /*
   * The active color mode of the parent ThemeProvider.
   */
  colorMode: ColorMode

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
  availableColorModes: Object.values(ColorModesEnum)
})

/**
 * ThemeProvider is used to provide theme-related context to its child components.
 */
export function ThemeProvider({colorMode = defaultMode, children, ...rest}: PropsWithChildren<ThemeProviderProps>) {
  const [activeMode, setActiveMode] = useState(colorMode)
  const availableColorModes = useMemo(() => Object.values(ColorModesEnum), [])

  useEffect(() => {
    if (colorMode === ColorModesEnum.AUTO) {
      setActiveMode(getActiveAutoMode())
    } else if (activeMode !== colorMode) {
      setActiveMode(colorMode)
    }

    return handleSystemPreferenceChange(setActiveMode)
  }, [colorMode, activeMode, setActiveMode])

  return (
    <ThemeContext.Provider value={{colorMode: activeMode, availableColorModes}}>
      <div data-color-mode={activeMode} {...rest}>
        {children}
      </div>
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
