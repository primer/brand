import {clsx} from 'clsx'
import {PauseIcon, PlayIcon} from '@primer/octicons-react'
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type Ref,
} from 'react'

import {useReducedMotion} from '../hooks/useReducedMotion'
import styles from './MinimalVideoPlayer.module.css'

export type MinimalVideoPlayerProps = Omit<
  ComponentPropsWithoutRef<'video'>,
  'autoPlay' | 'controls' | 'defaultMuted' | 'muted' | 'playsInline' | 'title'
> & {
  /**
   * Plays the video when it is visible and reduced motion is not requested.
   * @default true
   */
  autoPlay?: boolean
  /**
   * Provides an accessible name for the video.
   */
  title: string
  /**
   * Customizable labels for the internal play and pause control.
   */
  internalAccessibleLabels?: {
    play: string
    pause: string
  }
  ['data-testid']?: string
}

const defaultInternalAccessibleLabels = {
  play: 'Play video',
  pause: 'Pause video',
}

type PlaybackReason = 'initial-autoplay' | 'viewport-resume' | 'manual'

const testIds = {
  root: 'MinimalVideoPlayer',
  get video() {
    return `${this.root}-video`
  },
  get control() {
    return `${this.root}-control`
  },
}

export const _MinimalVideoPlayer = forwardRef<HTMLVideoElement, MinimalVideoPlayerProps>(
  (
    {
      autoPlay = true,
      children,
      className,
      'data-testid': testId,
      internalAccessibleLabels = defaultInternalAccessibleLabels,
      loop = true,
      onEnded,
      onPause,
      onPlay,
      onPlaying,
      onVolumeChange,
      title,
      ...rest
    },
    forwardedRef,
  ) => {
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const isPlayingRef = useRef(false)
    const isVisibleRef = useRef<boolean | null>(null)
    const autoPlayRef = useRef(autoPlay)
    const previousAutoPlayRef = useRef(autoPlay)
    const manualPauseRequestedRef = useRef(false)
    const pausedByViewportRef = useRef(false)
    const playbackRequestRef = useRef<{cancelled: boolean; reason: PlaybackReason} | null>(null)
    const prefersReducedMotion = useReducedMotion()
    const prefersReducedMotionRef = useRef(prefersReducedMotion)
    const shouldAttemptInitialAutoPlayRef = useRef(autoPlay && !prefersReducedMotion)

    autoPlayRef.current = autoPlay
    prefersReducedMotionRef.current = prefersReducedMotion

    const setVideoRef = useCallback(
      (node: HTMLVideoElement | null) => {
        videoRef.current = node
        assignRef(forwardedRef, node)
      },
      [forwardedRef],
    )

    const updatePlayingState = useCallback((nextIsPlaying: boolean) => {
      isPlayingRef.current = nextIsPlaying
      setIsPlaying(nextIsPlaying)
    }, [])

    const requestPlayback = useCallback(
      async (reason: PlaybackReason) => {
        const video = videoRef.current

        if (!video) return

        const playbackRequest = {cancelled: false, reason}
        playbackRequestRef.current = playbackRequest

        try {
          await video.play()

          if (playbackRequest.cancelled && playbackRequestRef.current === playbackRequest) {
            video.pause()
          }
        } catch {
          if (playbackRequestRef.current === playbackRequest) {
            if (reason === 'viewport-resume') {
              pausedByViewportRef.current = false
            }
            updatePlayingState(false)
          }
        } finally {
          if (playbackRequestRef.current === playbackRequest) {
            playbackRequestRef.current = null
          }
        }
      },
      [updatePlayingState],
    )

    const pauseIfPlaybackRequestWasCancelled = useCallback(
      (video: HTMLVideoElement) => {
        if (!playbackRequestRef.current?.cancelled) return false

        video.pause()
        updatePlayingState(false)
        return true
      },
      [updatePlayingState],
    )

    const pauseIfOffscreen = useCallback((video: HTMLVideoElement) => {
      if (isVisibleRef.current !== false || manualPauseRequestedRef.current) return

      pausedByViewportRef.current = autoPlayRef.current && !prefersReducedMotionRef.current
      video.pause()
    }, [])

    const handlePlaybackStarted = useCallback(
      (video: HTMLVideoElement) => {
        if (pauseIfPlaybackRequestWasCancelled(video)) return

        updatePlayingState(true)
        pauseIfOffscreen(video)
      },
      [pauseIfOffscreen, pauseIfPlaybackRequestWasCancelled, updatePlayingState],
    )

    const handlePlay = useCallback<NonNullable<MinimalVideoPlayerProps['onPlay']>>(
      event => {
        handlePlaybackStarted(event.currentTarget)
        onPlay?.(event)
      },
      [handlePlaybackStarted, onPlay],
    )

    const handlePlaying = useCallback<NonNullable<MinimalVideoPlayerProps['onPlaying']>>(
      event => {
        handlePlaybackStarted(event.currentTarget)
        onPlaying?.(event)
      },
      [handlePlaybackStarted, onPlaying],
    )

    const handlePause = useCallback<NonNullable<MinimalVideoPlayerProps['onPause']>>(
      event => {
        const wasManualPauseRequested = manualPauseRequestedRef.current
        manualPauseRequestedRef.current = false
        updatePlayingState(false)
        if (wasManualPauseRequested || isVisibleRef.current !== false) {
          pausedByViewportRef.current = false
        }
        onPause?.(event)
      },
      [onPause, updatePlayingState],
    )

    const handleEnded = useCallback<NonNullable<MinimalVideoPlayerProps['onEnded']>>(
      event => {
        pausedByViewportRef.current = false
        updatePlayingState(false)
        onEnded?.(event)
      },
      [onEnded, updatePlayingState],
    )

    const handleVolumeChange = useCallback<NonNullable<MinimalVideoPlayerProps['onVolumeChange']>>(
      event => {
        event.currentTarget.muted = true
        onVolumeChange?.(event)
      },
      [onVolumeChange],
    )

    useEffect(() => {
      const video = videoRef.current

      if (!video) return

      const handleVisibilityChange = (isVisible: boolean) => {
        isVisibleRef.current = isVisible

        if (isVisible) {
          if (pausedByViewportRef.current) {
            pausedByViewportRef.current = false
            if (autoPlayRef.current && !prefersReducedMotionRef.current) {
              void requestPlayback('viewport-resume')
            }
            return
          }

          if (shouldAttemptInitialAutoPlayRef.current && autoPlayRef.current && !prefersReducedMotionRef.current) {
            shouldAttemptInitialAutoPlayRef.current = false
            void requestPlayback('initial-autoplay')
          }
          return
        }

        if (isPlayingRef.current && !manualPauseRequestedRef.current) {
          pausedByViewportRef.current = autoPlayRef.current && !prefersReducedMotionRef.current
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
    }, [requestPlayback])

    useEffect(() => {
      const previousAutoPlay = previousAutoPlayRef.current
      previousAutoPlayRef.current = autoPlay

      if (previousAutoPlay === autoPlay) return

      if (!autoPlay) {
        shouldAttemptInitialAutoPlayRef.current = false
        pausedByViewportRef.current = false

        const playbackRequest = playbackRequestRef.current
        if (playbackRequest && playbackRequest.reason !== 'manual') {
          playbackRequest.cancelled = true
          videoRef.current?.pause()
        }
        return
      }

      if (prefersReducedMotion) return

      shouldAttemptInitialAutoPlayRef.current = true
      if (isVisibleRef.current === true && !isPlayingRef.current) {
        shouldAttemptInitialAutoPlayRef.current = false
        void requestPlayback('initial-autoplay')
      }
    }, [autoPlay, prefersReducedMotion, requestPlayback])

    useEffect(() => {
      if (!prefersReducedMotion) return

      shouldAttemptInitialAutoPlayRef.current = false
      pausedByViewportRef.current = false
      if (playbackRequestRef.current) {
        playbackRequestRef.current.cancelled = true
      }

      videoRef.current?.pause()
    }, [prefersReducedMotion])

    const togglePlayback = useCallback(() => {
      const video = videoRef.current

      if (!video) return

      shouldAttemptInitialAutoPlayRef.current = false
      pausedByViewportRef.current = false

      if (isPlayingRef.current) {
        manualPauseRequestedRef.current = true
        video.pause()
        return
      }

      void requestPlayback('manual')
    }, [requestPlayback])

    return (
      <div className={styles.MinimalVideoPlayer} data-testid={testIds.root}>
        <video
          {...rest}
          ref={setVideoRef}
          autoPlay={false}
          className={clsx(styles.MinimalVideoPlayer__video, className)}
          controls={false}
          data-testid={testId || testIds.video}
          loop={loop}
          muted
          onEnded={handleEnded}
          onPause={handlePause}
          onPlay={handlePlay}
          onPlaying={handlePlaying}
          onVolumeChange={handleVolumeChange}
          playsInline
          title={title}
        >
          {children}
        </video>
        <button
          aria-label={isPlaying ? internalAccessibleLabels.pause : internalAccessibleLabels.play}
          className={styles.MinimalVideoPlayer__control}
          data-testid={testIds.control}
          onClick={togglePlayback}
          type="button"
        >
          {isPlaying ? <PauseIcon aria-hidden="true" /> : <PlayIcon aria-hidden="true" />}
        </button>
      </div>
    )
  },
)

function assignRef<T>(targetRef: Ref<T> | null | undefined, value: T | null) {
  if (!targetRef) return

  if (typeof targetRef === 'function') {
    targetRef(value)
    return
  }

  targetRef.current = value
}

export const MinimalVideoPlayer = Object.assign(_MinimalVideoPlayer, {testIds})
