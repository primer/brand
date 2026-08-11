import {clsx} from 'clsx'
import {PauseIcon} from '@primer/octicons-react'
import React, {forwardRef, type ComponentPropsWithoutRef} from 'react'

import {useReducedMotion} from '../hooks/useReducedMotion'
import {useMinimalVideoPlayback} from './useMinimalVideoPlayback'
import styles from './MinimalVideoPlayer.module.css'

export type MinimalVideoPlayerProps = Omit<
  ComponentPropsWithoutRef<'video'>,
  'autoPlay' | 'controls' | 'defaultMuted' | 'muted' | 'onVolumeChange' | 'playsInline' | 'title'
> & {
  /**
   * Plays the video when it is visible.
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
      title,
      ...rest
    },
    forwardedRef,
  ) => {
    const prefersReducedMotion = useReducedMotion()
    const {handlePlaybackEnded, handlePlaybackPaused, handlePlaybackStarted, isPlaying, togglePlayback, videoRef} =
      useMinimalVideoPlayback({
        autoPlay,
        forwardedRef,
        prefersReducedMotion,
      })

    return (
      <div className={styles.MinimalVideoPlayer} data-testid={testId || testIds.root}>
        <video
          {...rest}
          ref={videoRef}
          autoPlay={false}
          className={clsx(styles.MinimalVideoPlayer__video, className)}
          controls={false}
          data-testid={testIds.video}
          loop={loop}
          muted
          onEnded={event => {
            handlePlaybackEnded()
            onEnded?.(event)
          }}
          onPause={event => {
            handlePlaybackPaused()
            onPause?.(event)
          }}
          onPlay={event => {
            handlePlaybackStarted()
            onPlay?.(event)
          }}
          onPlaying={event => {
            handlePlaybackStarted()
            onPlaying?.(event)
          }}
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
          {isPlaying ? (
            <PauseIcon aria-hidden="true" />
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.3777 6.94756C14.2069 7.40341 14.2069 8.59489 13.3777 9.05073L5.37808 13.4483C4.57834 13.8879 3.60001 13.3093 3.60001 12.3967L3.60001 3.60161C3.60001 2.689 4.57834 2.1104 5.37808 2.55003L13.3777 6.94756Z"
                fill="currentColor"
              />
            </svg>
          )}
        </button>
      </div>
    )
  },
)

export const MinimalVideoPlayer = Object.assign(_MinimalVideoPlayer, {testIds})
