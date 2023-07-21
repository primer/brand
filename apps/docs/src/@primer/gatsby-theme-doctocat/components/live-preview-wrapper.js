import React, {useState} from 'react'
import {
  Box as PRCBox,
  ActionMenu,
  ActionList,
  ThemeProvider as PRCThemeProvider,
} from '@primer/react'
import {
  ColorModesEnum,
  ThemeProvider,
} from '../../../../../../packages/react/src'

import './live-preview-wrapper.css'

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
      <PRCBox width="100%">
        <ThemeProvider colorMode={colorMode}>
          <PRCBox
            bg="canvas.default"
            sx={{
              borderTopLeftRadius: 2,
              borderTopRightRadius: 2,
            }}
          >
            <PRCBox pt={2} px={2} display="flex" justifyContent="flex-end">
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
            </PRCBox>
            <PRCBox px={5} py={3}>
              {children}
            </PRCBox>
          </PRCBox>
        </ThemeProvider>
      </PRCBox>
    </PRCThemeProvider>
  )
}
