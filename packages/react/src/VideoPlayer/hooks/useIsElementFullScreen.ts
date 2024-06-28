import {useEffect, useState, type RefObject} from 'react'

export const useIsElementFullScreen = (ref: RefObject<HTMLElement>): boolean => {
  const [isFullScreen, setIsFullScreen] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const handleFullScreenChange = () => {
      const isCurrentlyFullScreen = document.fullscreenElement === ref.current

      setIsFullScreen(isCurrentlyFullScreen)
    }

    document.addEventListener('fullscreenchange', handleFullScreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange)
    }
  }, [ref])

  return isFullScreen
}
