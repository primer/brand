import {cleanup, renderHook} from '@testing-library/react'

import {useTheme} from './useTheme'

describe('ThemeProvider', () => {
  afterEach(() => {
    cleanup()
  })

  it('returns light mode as the default color mode', () => {
    const {result} = renderHook(() => useTheme())

    const expectedResult = 'light'

    expect(result.current.colorMode).toBe(expectedResult)
  })

  it('returns all available modes via context', () => {
    const {result} = renderHook(() => useTheme())

    const expectedResult = ['light', 'dark', 'auto']

    expect(result.current.availableColorModes).toStrictEqual(expectedResult)
  })
})
