import React, {useRef, forwardRef, type PropsWithChildren, type HTMLProps, type ReactElement} from 'react'
import clsx from 'clsx'
import {Text} from '../Text'
import {type AnimateProps} from '../animation'
import {Captions, Controls, PlayIcon, type ControlsProps} from './components'
import {MarkGithubIcon} from '@primer/octicons-react'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/video-player/base.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/video-player/colors-with-modes.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from './VideoPlayer.module.css'
import {useVideoKeypressHandlers, useVideoResizeObserver} from './hooks/'
import {useVideo, VideoProvider} from './hooks/useVideo'

type VideoPlayerProps = PropsWithChildren<{
  poster?: string
  title: string
  branding?: boolean
  animate?: AnimateProps
  renderControls?: (props: ControlsProps) => ReactElement | null
  renderPlayOverlay?: () => ReactElement | null
}> &
  HTMLProps<HTMLVideoElement>

const Root = ({
  title,
  branding = true,
  children,
  className,
  renderControls = props => <Controls {...props} />,
  renderPlayOverlay = () => (
    <span className={styles.VideoPlayer__playButtonInner}>
      <PlayIcon />
    </span>
  ),
  ...rest
}: VideoPlayerProps) => {
  const videoWrapperRef = useRef<HTMLDivElement>(null)
  const {ccEnabled, isPlaying, ref, play, pause} = useVideo()
  const isSmall = useVideoResizeObserver({videoWrapperRef, className: styles['VideoPlayer__container--small']})

  useVideoKeypressHandlers(videoWrapperRef)

  return (
    <div
      className={clsx(
        styles.VideoPlayer__container,
        styles.VideoPlayer__overlays,
        !isPlaying && styles.VideoPlayer__showOverlays,
      )}
      ref={videoWrapperRef}
    >
      <video ref={ref} title={title} controls={false} className={clsx(styles.VideoPlayer, className)} {...rest}>
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
        onClick={() => {
          isPlaying ? pause() : play()
        }}
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {!isPlaying && renderPlayOverlay()}
      </button>
      <div className={styles.VideoPlayer__controls}>
        {ccEnabled ? <Captions /> : null}
        {renderControls({
          isSmall,
        })}
      </div>
    </div>
  )
}

const VideoPlayerSource = (props: React.HTMLProps<HTMLSourceElement>) => <source {...props} />

const VideoPlayerTrack = ({kind = 'captions', ...rest}: React.HTMLProps<HTMLTrackElement>) => (
  <track kind={kind} {...rest} />
)

const RootWithProvider = forwardRef<HTMLVideoElement, VideoPlayerProps>((props, ref) => (
  <VideoProvider ref={ref}>
    <Root {...props} />
  </VideoProvider>
))

export const VideoPlayer = Object.assign(RootWithProvider, {
  Source: VideoPlayerSource,
  Track: VideoPlayerTrack,
})
