import {useCallback, useEffect, useRef, useState, type Ref} from 'react'

import {useProvidedRefOrCreate} from '../hooks/useRef'

type UseMinimalVideoPlaybackOptions = {
  autoPlay: boolean
  forwardedRef: Ref<HTMLVideoElement>
  prefersReducedMotion: boolean
}

export function useMinimalVideoPlayback({
  autoPlay,
  forwardedRef,
  prefersReducedMotion,
}: UseMinimalVideoPlaybackOptions) {
  const videoRef = useProvidedRefOrCreate<HTMLVideoElement | null>(forwardedRef)
  const pausedByViewportRef = useRef(false)
  const initialAutoPlayHandledRef = useRef(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const requestPlayback = useCallback(async () => {
    const video = videoRef.current

    if (!video) return

    try {
      await video.play()
    } catch {
      if (video.paused) {
        setIsPlaying(false)
      }
    }
  }, [videoRef])

  const handlePlaybackStarted = useCallback(() => setIsPlaying(true), [])
  const handlePlaybackPaused = useCallback(() => setIsPlaying(false), [])
  const handlePlaybackEnded = useCallback(() => {
    pausedByViewportRef.current = false
    setIsPlaying(false)
  }, [])

  useEffect(() => {
    const video = videoRef.current

    if (!video) return

    const handleVisibilityChange = (isVisible: boolean) => {
      if (isVisible) {
        if (pausedByViewportRef.current) {
          pausedByViewportRef.current = false
          if (autoPlay && !prefersReducedMotion) {
            requestPlayback()
          }
          return
        }

        if (!initialAutoPlayHandledRef.current && prefersReducedMotion) {
          initialAutoPlayHandledRef.current = true
          return
        }

        if (!initialAutoPlayHandledRef.current && autoPlay) {
          initialAutoPlayHandledRef.current = true
          requestPlayback()
        }
        return
      }

      if (isPlaying) {
        pausedByViewportRef.current = autoPlay && !prefersReducedMotion
        video.pause()
      }
    }

    if (typeof IntersectionObserver === 'undefined') {
      handleVisibilityChange(true)
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      handleVisibilityChange(entry.intersectionRatio > 0)
    })

    observer.observe(video)
    return () => observer.disconnect()
  }, [autoPlay, isPlaying, prefersReducedMotion, requestPlayback, videoRef])

  useEffect(() => {
    if (!prefersReducedMotion) return

    initialAutoPlayHandledRef.current = true
    pausedByViewportRef.current = false
    videoRef.current?.pause()
  }, [prefersReducedMotion, videoRef])

  const togglePlayback = useCallback(() => {
    const video = videoRef.current

    if (!video) return

    initialAutoPlayHandledRef.current = true
    pausedByViewportRef.current = false

    if (isPlaying) {
      setIsPlaying(false)
      video.pause()
      return
    }

    requestPlayback()
  }, [isPlaying, requestPlayback, videoRef])

  return {
    handlePlaybackEnded,
    handlePlaybackPaused,
    handlePlaybackStarted,
    isPlaying,
    togglePlayback,
    videoRef,
  }
}
