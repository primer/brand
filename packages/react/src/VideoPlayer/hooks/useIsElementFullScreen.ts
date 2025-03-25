import {useCallback, useEffect, useState, type Dispatch, type SetStateAction} from 'react'
import styles from '../VideoPlayer.module.css'

export const useIsElementFullScreen = (element?: HTMLElement | null): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [isFullScreen, _setIsFullScreen] = useState(false)

  useEffect(() => {
    if (!element) return

    const handleFullScreenChange = () => {
      const isCurrentlyFullScreen = document.fullscreenElement === element

      const fullscreenClass = styles['VideoPlayer__container--fullscreen']

      if (isCurrentlyFullScreen) {
        element.classList.add(fullscreenClass)
      } else {
        element.classList.remove(fullscreenClass)
      }

      _setIsFullScreen(isCurrentlyFullScreen)
    }

    document.addEventListener('fullscreenchange', handleFullScreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange)
    }
  }, [element])

  const setIsFullScreen = useCallback(
    (shouldFullScreenValOrFn: SetStateAction<boolean>) => {
      const shouldFullScreen =
        typeof shouldFullScreenValOrFn === 'function' ? shouldFullScreenValOrFn(isFullScreen) : shouldFullScreenValOrFn

      if (!element || isFullScreen === shouldFullScreen) return

      if (shouldFullScreen) {
        element.requestFullscreen()
      } else {
        document.exitFullscreen()
      }
    },
    [element, isFullScreen],
  )

  return [isFullScreen, setIsFullScreen]
}
