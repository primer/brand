/** @jest-environment node */

import React from 'react'
import {renderToString} from 'react-dom/server'
import {ThemeProvider} from './ThemeProvider'
import {useTheme} from './useTheme'

describe('ThemeProvider SSR', () => {
  it('preserves automatic mode and forwarding without a document', () => {
    function ForwardedThemeProvider() {
      const {originalColorMode, colorMode} = useTheme()
      return <ThemeProvider id="forwarded" colorMode={originalColorMode ?? colorMode} />
    }

    expect(typeof document).toBe('undefined')

    const markup = renderToString(
      <ThemeProvider id="automatic" colorMode="auto">
        <ForwardedThemeProvider />
        <ThemeProvider id="explicit-light" colorMode="light" />
      </ThemeProvider>,
    )

    expect(markup).toContain('data-color-mode="auto" id="automatic"')
    expect(markup).toContain('data-color-mode="auto" id="forwarded"')
    expect(markup).toContain('data-color-mode="light" id="explicit-light"')
  })
})
