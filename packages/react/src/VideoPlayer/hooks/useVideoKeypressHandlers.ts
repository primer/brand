import {type RefObject, useEffect, useMemo} from 'react'
import {useVideo} from './useVideo'

export type KeypressHandler = [KeyboardEvent['key'], (e: KeyboardEvent) => void]

export const useVideoKeypressHandlers = (videoWrapperRef: RefObject<HTMLElement | null>) => {
  const {togglePlaying, toggleMute, setVolume, seek, seekToPercent, toggleCC, toggleFullScreen} = useVideo()

  const keypressHandlers: KeypressHandler[] = useMemo(
    () => [
      // Space key is handled automatically
      ['k', () => togglePlaying()],
      ['f', () => toggleFullScreen()],
      ['c', () => toggleCC()],

      ['ArrowLeft', () => seek(t => t - 5)],
      ['ArrowRight', () => seek(t => t + 5)],
      ['j', () => seek(t => t - 10)],
      ['l', () => seek(t => t + 10)],
      ['0', () => seekToPercent(0)],
      ['1', () => seekToPercent(10)],
      ['2', () => seekToPercent(20)],
      ['3', () => seekToPercent(30)],
      ['4', () => seekToPercent(40)],
      ['5', () => seekToPercent(50)],
      ['6', () => seekToPercent(60)],
      ['7', () => seekToPercent(70)],
      ['8', () => seekToPercent(80)],
      ['9', () => seekToPercent(90)],

      ['m', () => toggleMute()],
      ['ArrowUp', () => setVolume(volume => Math.min(volume + 0.1, 1))],
      ['ArrowDown', () => setVolume(volume => Math.max(volume - 0.1, 0))],
    ],
    [toggleCC, seek, seekToPercent, setVolume, toggleFullScreen, toggleMute, togglePlaying],
  )

  useEffect(() => {
    const refCurrent = videoWrapperRef.current

    if (!refCurrent) return

    const handleKeyPress = (e: KeyboardEvent) => {
      const {key} = e

      for (const [keyName, handler] of keypressHandlers) {
        if (key === keyName) {
          handler(e)
        }
      }
    }

    refCurrent.addEventListener('keydown', handleKeyPress)

    return () => {
      refCurrent.removeEventListener('keydown', handleKeyPress)
    }
  }, [videoWrapperRef, keypressHandlers])
}
