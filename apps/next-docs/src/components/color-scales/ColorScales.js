'use client'
import colors from '@primer/brand-primitives/lib/design-tokens/js/module/tokens/base/colors/light'
import React from 'react'
import {ThemeProvider as PRCThemeProvider} from '@primer/react'
import {Text} from '@primer/react-brand'
import {readableColor} from 'color2k'
import {ColorModesEnum} from '../../../../../packages/react/src/ThemeProvider'
import {useColorTheme} from './ColorThemeContext'
import styles from './ColorScales.module.css'

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
      <div key={name}>
        {Object.entries(colorScale).map(([key, obj]) => {
          const value = colorTheme === 'dark' ? obj.dark : obj.value

          if (!value) return null

          return (
            <div key={`${key}-${value}`} className={styles.colorSwatch} style={{backgroundColor: value}}>
              <Text font="monospace" size="100" style={{color: readableColor(value)}}>
                {name}.{key}
              </Text>
              <Text font="monospace" size="100" style={{color: readableColor(value)}}>
                {value}
              </Text>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <PRCThemeProvider
      colorMode={
        colorTheme === ColorModesEnum.LIGHT ? 'day' : colorTheme === ColorModesEnum.DARK ? 'night' : ColorModesEnum.AUTO
      }
    >
      <div className={styles.scalesGrid}>{rgbScales.map(renderScale)}</div>
      <div className={styles.scalesGridLast}>{blackWhiteScales.map(renderScale)}</div>
    </PRCThemeProvider>
  )
}
