import React, {
  useRef,
  forwardRef,
  useCallback,
  useState,
  type PropsWithChildren,
  type HTMLProps,
  type ReactElement,
} from 'react'
import clsx from 'clsx'
import {Text} from '../Text'
import {type AnimateProps} from '../animation'
import {Captions, Controls, PlayIcon, type ControlsProps} from './components'
import {MarkGithubIcon} from '@primer/octicons-react'
import {useProvidedRefOrCreate} from '../hooks/useRef'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/video-player/base.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/video-player/colors-with-modes.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from './VideoPlayer.module.css'
import {useIsElementFullScreen, useVideoKeypressHandlers, useVideo, useVideoResizeObserver} from './hooks/'

type VideoPlayerProps = PropsWithChildren<{
  poster?: string
  title: string
  branding?: boolean
  animate?: AnimateProps
  renderControls?: (props: ControlsProps & {isPlaying: boolean}) => ReactElement | null
  renderPlayButton?: () => ReactElement | null
}> &
  HTMLProps<HTMLVideoElement>

const Root = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  (
    {
      title,
      branding = true,
      children,
      className,
      renderControls = props => <Controls {...props} />,
      renderPlayButton = () => (
        <span className={styles.VideoPlayer__playButtonInner}>
          <PlayIcon />
        </span>
      ),
      ...rest
    },
    forwardedRef,
  ) => {
    const videoRef = useProvidedRefOrCreate(forwardedRef)
    const videoWrapperRef = useRef<HTMLDivElement>(null)
    const {isPlaying} = useVideo(videoRef)
    const isSmall = useVideoResizeObserver({videoWrapperRef, className: styles['VideoPlayer__container--small']})

    const [isFullScreen, setIsFullScreen] = useIsElementFullScreen(videoWrapperRef)
    const [closedCaptionsEnabled, setClosedCaptionsEnabled] = useState(true)

    useVideoKeypressHandlers(videoRef, videoWrapperRef, {
      toggleFullScreen: () => setIsFullScreen(prev => !prev),
      toggleClosedCaptions: () => setClosedCaptionsEnabled(prev => !prev),
    })

    const playPause = useCallback(() => {
      const video = videoRef.current
      if (!video) return

      video.paused ? video.play() : video.pause()
    }, [videoRef])

    return (
      <div
        className={clsx(
          styles.VideoPlayer__container,
          styles.VideoPlayer__overlays,
          !isPlaying && styles.VideoPlayer__showOverlays,
        )}
        ref={videoWrapperRef}
      >
        <video ref={videoRef} title={title} controls={false} className={clsx(styles.VideoPlayer, className)} {...rest}>
          {children}
          <track kind="captions" />
        </video>
        <div className={styles.VideoPlayer__title}>
          {branding && <MarkGithubIcon size={40} />}
          <Text size="400" weight="medium" className={styles.VideoPlayer__controlTextColor}>
            {title}
          </Text>
        </div>
        <button
          className={styles.VideoPlayer__playButton}
          onClick={playPause}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {!isPlaying && renderPlayButton()}
        </button>
        <div className={styles.VideoPlayer__controls}>
          {closedCaptionsEnabled ? <Captions videoRef={videoRef} /> : null}
          {renderControls({
            videoRef,
            isFullScreen,
            setIsFullScreen,
            closedCaptionsEnabled,
            setClosedCaptionsEnabled,
            isSmall,
            isPlaying,
          })}
        </div>
      </div>
    )
  },
)

const VideoPlayerSource = (props: React.HTMLProps<HTMLSourceElement>) => <source {...props} />

const VideoPlayerTrack = ({kind = 'captions', ...rest}: React.HTMLProps<HTMLTrackElement>) => (
  <track kind={kind} {...rest} />
)

export const VideoPlayer = Object.assign(Root, {
  Source: VideoPlayerSource,
  Track: VideoPlayerTrack,
})
