import {useCallback, useEffect, useState, type Dispatch, type RefObject, type SetStateAction} from 'react'

export const useIsElementFullScreen = (ref: RefObject<HTMLElement>): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [isFullScreen, _setIsFullScreen] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const handleFullScreenChange = () => {
      const isCurrentlyFullScreen = document.fullscreenElement === ref.current

      _setIsFullScreen(isCurrentlyFullScreen)
    }

    document.addEventListener('fullscreenchange', handleFullScreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange)
    }
  }, [ref])

  const setIsFullScreen = useCallback(
    (shouldFullScreenValOrFn: SetStateAction<boolean>) => {
      const shouldFullScreen =
        typeof shouldFullScreenValOrFn === 'function' ? shouldFullScreenValOrFn(isFullScreen) : shouldFullScreenValOrFn

      if (!ref.current || isFullScreen === shouldFullScreen) return

      if (shouldFullScreen) {
        ref.current.requestFullscreen()
      } else {
        document.exitFullscreen()
      }
    },
    [ref, isFullScreen],
  )

  return [isFullScreen, setIsFullScreen]
}
