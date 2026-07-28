import {useCallback, useEffect, useRef, useState, type Ref} from 'react'

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
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const isPlayingRef = useRef(false)
  const pausedByViewportRef = useRef(false)
  const initialAutoPlayHandledRef = useRef(!autoPlay || prefersReducedMotion)
  const [isPlaying, setIsPlaying] = useState(false)

  const updatePlayingState = useCallback((nextIsPlaying: boolean) => {
    isPlayingRef.current = nextIsPlaying
    setIsPlaying(nextIsPlaying)
  }, [])

  const setVideoRef = useCallback(
    (node: HTMLVideoElement | null) => {
      videoRef.current = node
      assignRef(forwardedRef, node)
    },
    [forwardedRef],
  )

  const requestPlayback = useCallback(async () => {
    const video = videoRef.current

    if (!video) return

    try {
      await video.play()
    } catch {
      if (video.paused) {
        updatePlayingState(false)
      }
    }
  }, [updatePlayingState])

  const handlePlaybackStarted = useCallback(() => updatePlayingState(true), [updatePlayingState])
  const handlePlaybackPaused = useCallback(() => updatePlayingState(false), [updatePlayingState])
  const handlePlaybackEnded = useCallback(() => {
    pausedByViewportRef.current = false
    updatePlayingState(false)
  }, [updatePlayingState])

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

        if (!initialAutoPlayHandledRef.current) {
          initialAutoPlayHandledRef.current = true
          requestPlayback()
        }
        return
      }

      if (isPlayingRef.current) {
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
  }, [autoPlay, prefersReducedMotion, requestPlayback])

  useEffect(() => {
    if (!prefersReducedMotion) return

    initialAutoPlayHandledRef.current = true
    pausedByViewportRef.current = false
    videoRef.current?.pause()
  }, [prefersReducedMotion])

  const togglePlayback = useCallback(() => {
    const video = videoRef.current

    if (!video) return

    initialAutoPlayHandledRef.current = true
    pausedByViewportRef.current = false

    if (isPlayingRef.current) {
      isPlayingRef.current = false
      video.pause()
      return
    }

    requestPlayback()
  }, [requestPlayback])

  return {
    handlePlaybackEnded,
    handlePlaybackPaused,
    handlePlaybackStarted,
    isPlaying,
    setVideoRef,
    togglePlayback,
  }
}

function assignRef<T>(targetRef: Ref<T> | null | undefined, value: T | null) {
  if (!targetRef) return

  if (typeof targetRef === 'function') {
    targetRef(value)
    return
  }

  targetRef.current = value
}
