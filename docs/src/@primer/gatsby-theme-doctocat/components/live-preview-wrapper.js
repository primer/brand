import React, {useState} from 'react'
import {
  Box,
  ActionMenu,
  ActionList,
  ThemeProvider as PRCThemeProvider,
} from '@primer/react'
import {ColorModesEnum, ThemeProvider} from '../../../../../src'
// eslint-disable-next-line import/no-webpack-loader-syntax
import styles from '!raw-loader!../../../../../lib/css/gh-variables.color.css'

export default function LivePreviewWrapper({children}) {
  const availableColorModes = Object.values(ColorModesEnum)
  const [colorMode, setCurrentMode] = useState(ColorModesEnum.LIGHT)
  return (
    <PRCThemeProvider
      colorMode={
        colorMode === ColorModesEnum.LIGHT
          ? 'day'
          : colorMode === ColorModesEnum.DARK
          ? 'night'
          : ColorModesEnum.AUTO
      }
    >
      <Box width="100%">
        <ThemeProvider colorMode={colorMode}>
          <Box
            bg="canvas.default"
            sx={{
              borderTopLeftRadius: 2,
              borderTopRightRadius: 2,
            }}
          >
            <Box pt={2} px={2} display="flex" justifyContent="flex-end">
              <ActionMenu>
                <ActionMenu.Button>{colorMode}</ActionMenu.Button>

                <ActionMenu.Overlay>
                  <ActionList selectionVariant="single">
                    {availableColorModes.map((mode) => (
                      <ActionList.Item
                        key={mode}
                        selected={colorMode === mode}
                        onSelect={() => setCurrentMode(mode)}
                      >
                        {mode}
                      </ActionList.Item>
                    ))}
                  </ActionList>
                </ActionMenu.Overlay>
              </ActionMenu>
            </Box>
            <style>{styles}</style>
            {children}
          </Box>
        </ThemeProvider>
      </Box>
    </PRCThemeProvider>
  )
}
