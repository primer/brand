'use client'
import {ColorThemeProvider} from '../../src/components/color-scales/ColorThemeContext'
import {ColorThemePicker} from '../../src/components/color-scales/ColorThemePicker'
import {ColorScales} from '../../src/components/color-scales/ColorScales'
import {Box, Heading, Stack} from '@primer/react-brand'

export function ColorScalesPlayground() {
  return (
    <ColorThemeProvider>
      <Stack padding="none" direction="vertical">
        <Heading as="h2">Themes</Heading>
        <ColorThemePicker />
        <Heading as="h2">Scales</Heading>
        <ColorScales />
      </Stack>
    </ColorThemeProvider>
  )
}
