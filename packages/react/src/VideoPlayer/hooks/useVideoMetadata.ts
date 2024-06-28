import {useState, useEffect, type RefObject} from 'react'

type VideoMetadata = {
  isPlaying: boolean
  currentTime: number
  duration: number
  trackInformation?: TextTrackCueList
  volume: number
}

export const useVideoMetadata = (videoRef: RefObject<HTMLVideoElement>): VideoMetadata => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [trackInformation, setTrackInformation] = useState<TextTrackCueList>()
  const [volume, setVolume] = useState(1)

  useEffect(() => {
    if (!videoRef.current) {
      return
    }

    const video = videoRef.current

    const onPlay = () => {
      setIsPlaying(true)
    }

    const onPause = () => {
      setIsPlaying(false)
    }

    const onEnded = () => {
      setIsPlaying(false)
    }

    const onLoadedMetadata = () => {
      setDuration(video.duration)
    }

    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime)
    }

    const onPlaying = () => {
      if (video.textTracks[0].cues) {
        setTrackInformation(video.textTracks[0].cues)
      }
    }

    const onVolumeChange = () => {
      setVolume(video.volume)
    }

    const eventListeners: [keyof HTMLVideoElementEventMap, () => void][] = [
      ['play', onPlay],
      ['pause', onPause],
      ['ended', onEnded],
      ['loadedmetadata', onLoadedMetadata],
      ['timeupdate', onTimeUpdate],
      ['playing', onPlaying],
      ['volumechange', onVolumeChange],
    ]

    for (const [event, listener] of eventListeners) {
      video.addEventListener(event, listener)
    }

    return () => {
      for (const [event, listener] of eventListeners) {
        video.removeEventListener(event, listener)
      }
    }
  }, [videoRef])

  return {isPlaying, currentTime, duration, trackInformation, volume}
}
