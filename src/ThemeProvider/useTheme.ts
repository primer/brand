import React, {useContext} from 'react'
import {ThemeContext} from './ThemeProvider'

export const useTheme = () => useContext(ThemeContext)
