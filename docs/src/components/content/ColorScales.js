import colors from '../../../../lib/design-tokens/js/module/tokens/base/colors/color-scales'
import React from 'react'
import {
  Box,
  ActionMenu,
  ActionList,
  Text,
  ThemeProvider as PRCThemeProvider,
} from '@primer/react'
import {readableColor} from 'color2k'
import {ColorModesEnum} from '../../../../src'

export function ColorScales() {
  const availableColorModes = Object.values(ColorModesEnum)
  const [colorTheme, setCurrentMode] = React.useState(ColorModesEnum.LIGHT)
  const predicateFn = (colorEntry) => ['black', 'white'].includes(colorEntry[0])

  const rgbScales = Object.entries(colors.base.color.scale).filter(
    (color) => !predicateFn(color),
  )

  const blackWhiteScales = Object.entries(colors.base.color.scale).filter(
    (color) => predicateFn(color),
  )

  const renderScale = (scale) => {
    const [name, colorScale] = scale
    return (
      <Box key={name}>
        {Object.entries(colorScale).map(([key, obj]) => {
          const value = colorTheme === 'dark' ? obj.darkValue : obj.value
          return (
            <Box
              key={`${key}-${value}`}
              sx={{
                color: readableColor(value),
                bg: value,
                p: 2,
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: 'mono',
                fontSize: 1,
              }}
            >
              <Text>
                {name}.{key}
              </Text>
              <Text>{value}</Text>
            </Box>
          )
        })}
      </Box>
    )
  }

  return (
    <PRCThemeProvider
      colorMode={
        colorTheme === ColorModesEnum.LIGHT
          ? 'day'
          : colorTheme === ColorModesEnum.DARK
          ? 'night'
          : ColorModesEnum.AUTO
      }
    >
      <Box
        sx={{
          paddingTop: 2,
          paddingLeft: 2,
          paddingRight: 2,
          marginBottom: 3,
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <ActionMenu>
          <ActionMenu.Button>{colorTheme}</ActionMenu.Button>

          <ActionMenu.Overlay>
            <ActionList selectionVariant="single">
              {availableColorModes
                .filter((mode) => mode !== 'auto')
                .map((mode) => (
                  <ActionList.Item
                    key={mode}
                    selected={colorTheme === mode}
                    onSelect={() => setCurrentMode(mode)}
                  >
                    {mode}
                  </ActionList.Item>
                ))}
            </ActionList>
          </ActionMenu.Overlay>
        </ActionMenu>
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridGap: 3,
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          p: 3,
          boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)',
          borderRadius: 2,
          backgroundColor: 'canvas.default',
          marginBottom: 2,
        }}
      >
        {rgbScales.map(renderScale)}
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridGap: 3,
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          p: 3,
          boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)',
          borderRadius: 2,
          backgroundColor: 'canvas.default',
        }}
      >
        {blackWhiteScales.map(renderScale)}
      </Box>
    </PRCThemeProvider>
  )
}
