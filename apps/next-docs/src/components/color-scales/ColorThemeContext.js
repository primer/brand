'use client'
import React from 'react'

import {ColorModesEnum} from '@primer/react-brand/lib'

export const availableModes = Object.values(ColorModesEnum).filter(mode => mode !== 'auto')

const ColorThemeContext = React.createContext([availableModes[0], () => {}])

export function ColorThemeProvider({children}) {
  const [colorTheme, setColorTheme] = React.useState(availableModes[0])

  return <ColorThemeContext.Provider value={[colorTheme, setColorTheme]}>{children}</ColorThemeContext.Provider>
}

export function useColorTheme() {
  return React.useContext(ColorThemeContext)
}
