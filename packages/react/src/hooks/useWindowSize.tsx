import {useState, useEffect} from 'react'

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
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined, // undefined to avoid client/server mismatch on initial mount
    height: undefined, // undefined to avoid client/server mismatch on initial mount,
    isXSmall: undefined, // undefined to avoid client/server mismatch on initial mount,
    isSmall: undefined, // undefined to avoid client/server mismatch on initial mount,
    isMedium: undefined, // undefined to avoid client/server mismatch on initial mount,
    isLarge: undefined, // undefined to avoid client/server mismatch on initial mount,
    isXLarge: undefined, // undefined to avoid client/server mismatch on initial mount,
    isXXLarge: undefined, // undefined to avoid client/server mismatch on initial mount,
    currentBreakpointSize: undefined, // undefined to avoid client/server mismatch on initial mount,
  })

  useEffect(() => {
    // should only execute all the code below on client
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        /*
         * Maps to large breakpoint
         * TODO: replace with design token. Requires remToPx util.
         */
        isXSmall: window.innerWidth >= 320,
        isSmall: window.innerWidth >= 544,
        isMedium: window.innerWidth >= 768,
        isLarge: window.innerWidth >= 1012,
        isXLarge: window.innerWidth >= 1280,
        isXXLarge: window.innerWidth >= 1440,
        currentBreakpointSize: breakpointSwitch(window.innerWidth),
      })
    }

    // eslint-disable-next-line github/prefer-observers
    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

const breakpointSwitch = (value: number) => {
  let current = BreakpointSize.XXLARGE
  switch (true) {
    case value >= 320 && value < 544:
      current = BreakpointSize.XSMALL
      break
    case value >= 544 && value < 768:
      current = BreakpointSize.SMALL
      break
    case value >= 768 && value < 1012:
      current = BreakpointSize.MEDIUM
      break
    case value >= 1012 && value < 1280:
      current = BreakpointSize.LARGE
      break
    case value >= 1280 && value < 1440:
      current = BreakpointSize.XLARGE
      break
    default:
      current = BreakpointSize.XXLARGE
  }
  return current
}

export type ReponsiveProp<T> = Record<'narrow' | 'regular' | 'wide', T>
export const useResponsiveProp = <T,>(responsiveProp: ReponsiveProp<T>): T => {
  const {isMedium, isXLarge} = useWindowSize()
  if (isXLarge) return responsiveProp.wide
  if (isMedium) return responsiveProp.regular
  return responsiveProp.narrow
}
