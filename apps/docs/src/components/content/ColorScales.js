import colors from '@primer/brand-primitives/lib/design-tokens/js/module/tokens/base/colors/light'
import React from 'react'
import {
  Box as PRCBox,
  ActionMenu,
  ActionList,
  Text,
  ThemeProvider as PRCThemeProvider,
} from '@primer/react'
import {readableColor} from 'color2k'
// eslint-disable-next-line import/no-unresolved
import {ColorModesEnum} from '@primer/react-brand'
import {useColorTheme} from './ColorThemeContext'

const availableColorModes = Object.values(ColorModesEnum)

export function ColorScales() {
  const [colorTheme, setCurrentMode] = useColorTheme()

  const predicateFn = (colorEntry) => ['black', 'white'].includes(colorEntry[0])

  const rgbScales = Object.entries(colors.base.color.scale)
    .filter(([scaleName]) => {
      return scaleName !== 'transparent'
    })
    .filter((color) => !predicateFn(color))

  const blackWhiteScales = Object.entries(colors.base.color.scale).filter(
    (color) => predicateFn(color),
  )

  const renderScale = (scale) => {
    const [name, colorScale] = scale
    return (
      <PRCBox key={name}>
        {Object.entries(colorScale).map(([key, obj]) => {
          const value = colorTheme === 'dark' ? obj.dark : obj.value

          if (!value) return null

          return (
            <PRCBox
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
            </PRCBox>
          )
        })}
      </PRCBox>
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
      <PRCThemeProvider colorMode="day">
        <PRCBox
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
            <ActionMenu.Button>Change color mode</ActionMenu.Button>

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
        </PRCBox>
      </PRCThemeProvider>
      <PRCBox
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
      </PRCBox>
      <PRCBox
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
      </PRCBox>
    </PRCThemeProvider>
  )
}
