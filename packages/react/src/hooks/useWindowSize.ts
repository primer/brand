import {useState, useEffect} from 'react'
// eslint-disable-next-line import/extensions -- JSON imports require an explicit extension.
import {breakpoint} from '@primer/brand-primitives/src/tokens/functional/size/breakpoints.json'

export enum BreakpointSize {
  XSMALL = 'xsmall',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  XLARGE = 'xlarge',
  XXLARGE = 'xxlarge',
}

type WindowSize = {
  width?: number
  height?: number
  isXSmall?: boolean
  isSmall?: boolean
  isMedium?: boolean
  isLarge?: boolean
  isXLarge?: boolean
  isXXLarge?: boolean
  currentBreakpointSize?: BreakpointSize
}

export function useWindowSize() {
  // Keep the first client render consistent with the server.
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
    isXSmall: undefined,
    isSmall: undefined,
    isMedium: undefined,
    isLarge: undefined,
    isXLarge: undefined,
    isXXLarge: undefined,
    currentBreakpointSize: undefined,
  })

  useEffect(() => {
    const sizes = Object.values(BreakpointSize)
    const mediaQueries = sizes.map(size => window.matchMedia(`(min-width: ${breakpoint[size].$value})`))

    function handleResize() {
      const matches = mediaQueries.map(query => query.matches)
      const [isXSmall, isSmall, isMedium, isLarge, isXLarge, isXXLarge] = matches

      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isXSmall,
        isSmall,
        isMedium,
        isLarge,
        isXLarge,
        isXXLarge,
        currentBreakpointSize: sizes[matches.lastIndexOf(true)] ?? BreakpointSize.XSMALL,
      })
    }

    for (const query of mediaQueries) query.addEventListener('change', handleResize)

    // eslint-disable-next-line github/prefer-observers
    window.addEventListener('resize', handleResize)

    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
      for (const query of mediaQueries) query.removeEventListener('change', handleResize)
    }
  }, [])

  return windowSize
}
