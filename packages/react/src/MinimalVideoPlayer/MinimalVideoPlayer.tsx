import {clsx} from 'clsx'
import {PauseIcon, PlayIcon} from '@primer/octicons-react'
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
    const {handlePlaybackEnded, handlePlaybackPaused, handlePlaybackStarted, isPlaying, setVideoRef, togglePlayback} =
      useMinimalVideoPlayback({
        autoPlay,
        forwardedRef,
        prefersReducedMotion,
      })

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
          {isPlaying ? <PauseIcon aria-hidden="true" /> : <PlayIcon aria-hidden="true" />}
        </button>
      </div>
    )
  },
)

export const MinimalVideoPlayer = Object.assign(_MinimalVideoPlayer, {testIds})
