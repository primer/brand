import {useState, useEffect} from 'react'

type WindowSize = {
  width?: number
  height?: number
  isLarge?: boolean
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined, // undefined to avoid client/server mismatch on initial mount
    height: undefined, // undefined to avoid client/server mismatch on initial mount,
    isLarge: undefined // undefined to avoid client/server mismatch on initial mount,
  })

  useEffect(() => {
    // should only execute all the code below on client
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isLarge: window.innerWidth >= 1012 // maps to large breakpoint
      })
    }

    // eslint-disable-next-line github/prefer-observers
    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}
