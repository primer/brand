import {type RefObject, useState, useEffect} from 'react'

export const useVideo = (videoRef: RefObject<HTMLVideoElement>) => {
  const [volumeBeforeMute, setVolumeBeforeMute] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onMute = () => {
      setVolumeBeforeMute(video.volume)
      video.volume = 0
    }

    const onUnmute = () => {
      video.volume = volumeBeforeMute ?? 1
      setVolumeBeforeMute(null)
    }

    video.addEventListener('mute', onMute)
    video.addEventListener('unmute', onUnmute)

    return () => {
      video.removeEventListener('mute', onMute)
      video.removeEventListener('unmute', onUnmute)
    }
  }, [videoRef, volumeBeforeMute])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onEnded = () => {
      video.currentTime = 0
    }

    const onPlay = () => {
      setIsPlaying(true)
    }

    const onPause = () => {
      setIsPlaying(false)
    }

    const onPlaying = () => {
      video.textTracks[0].mode = 'hidden'
    }

    video.addEventListener('ended', onEnded)
    video.addEventListener('playing', onPlaying)
    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)

    return () => {
      video.removeEventListener('ended', onEnded)
      video.removeEventListener('playing', onPlaying)
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
    }
  }, [videoRef])

  return {isPlaying}
}
