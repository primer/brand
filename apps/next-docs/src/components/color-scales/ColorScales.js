'use client'
import colors from '@primer/brand-primitives/lib/design-tokens/js/module/tokens/base/colors/light'
import React from 'react'
import {Box as PRCBox, ThemeProvider as PRCThemeProvider} from '@primer/react'
import {Text} from '@primer/react-brand'
import {readableColor} from 'color2k'
import {ColorModesEnum} from '../../../../../packages/react/src/ThemeProvider'
import {useColorTheme} from './ColorThemeContext'

export function ColorScales() {
  const [colorTheme] = useColorTheme()

  const predicateFn = colorEntry => ['black', 'white'].includes(colorEntry[0])

  const rgbScales = Object.entries(colors.base.color.scale)
    .filter(([scaleName]) => {
      return scaleName !== 'transparent'
    })
    .filter(color => !predicateFn(color))

  const blackWhiteScales = Object.entries(colors.base.color.scale).filter(color => predicateFn(color))

  const renderScale = scale => {
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
                bg: value,
                p: 2,
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: 'mono',
                fontSize: 1,
              }}
            >
              <Text font="monospace" size="100" style={{color: readableColor(value)}}>
                {name}.{key}
              </Text>
              <Text font="monospace" size="100" style={{color: readableColor(value)}}>
                {value}
              </Text>
            </PRCBox>
          )
        })}
      </PRCBox>
    )
  }

  return (
    <PRCThemeProvider
      colorMode={
        colorTheme === ColorModesEnum.LIGHT ? 'day' : colorTheme === ColorModesEnum.DARK ? 'night' : ColorModesEnum.AUTO
      }
    >
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
