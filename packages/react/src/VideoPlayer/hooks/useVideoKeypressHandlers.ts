import {type RefObject, type SetStateAction, useCallback, useMemo} from 'react'
import {useKeypressHandlers, type KeypressHandler} from './useKeypressHandlers'

type Mutators = {
  toggleFullScreen: () => void
  toggleClosedCaptions: () => void
}

export const useVideoKeypressHandlers = (
  videoRef: RefObject<HTMLVideoElement>,
  videoWrapperRef: RefObject<HTMLElement>,
  {toggleFullScreen, toggleClosedCaptions}: Mutators,
) => {
  const seekToPercent = useCallback(
    (percent: number) => {
      const video = videoRef.current
      if (!video) return

      video.currentTime = (percent / 100) * videoRef.current.duration
    },
    [videoRef],
  )

  const seekRelative = useCallback(
    (seconds: number) => {
      const video = videoRef.current
      if (!video) return

      video.currentTime += seconds
    },
    [videoRef],
  )

  const togglePlaying = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    video.paused ? video.play() : video.pause()
  }, [videoRef])

  const toggleMute = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    video.dispatchEvent(new Event(video.volume === 0 ? 'unmute' : 'mute'))
  }, [videoRef])

  const setVolume = useCallback(
    (volumeValOrFn: SetStateAction<number>) => {
      const video = videoRef.current
      if (!video) return

      video.volume = typeof volumeValOrFn === 'function' ? volumeValOrFn(video.volume) : volumeValOrFn
    },
    [videoRef],
  )

  const keyPressHandlers: KeypressHandler[] = useMemo(
    () => [
      // Space key is handled automatically
      ['k', () => togglePlaying()],

      ['ArrowLeft', () => seekRelative(-5)],
      ['ArrowRight', () => seekRelative(5)],
      ['j', () => seekRelative(-10)],
      ['l', () => seekRelative(10)],
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

      ['f', () => toggleFullScreen()],
      ['c', () => toggleClosedCaptions()],
    ],
    [togglePlaying, seekRelative, seekToPercent, toggleMute, setVolume, toggleFullScreen, toggleClosedCaptions],
  )

  useKeypressHandlers(videoWrapperRef, keyPressHandlers)
}
