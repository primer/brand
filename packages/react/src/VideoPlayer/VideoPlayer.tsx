import React, {useRef, forwardRef, type HTMLProps} from 'react'
import clsx from 'clsx'
import {Text} from '../Text'
import {type AnimateProps} from '../animation'
import {
  Captions,
  CCButton,
  ControlsBar,
  FullScreenButton,
  MuteButton,
  PlayIcon,
  PlayPauseButton,
  SeekControl,
  VolumeControl,
} from './components'
import {MarkGithubIcon} from '@primer/octicons-react'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/video-player/base.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/video-player/colors-with-modes.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from './VideoPlayer.module.css'
import {useVideoResizeObserver} from './hooks/'
import {useVideo, VideoProvider} from './hooks/useVideo'

type VideoPlayerProps = {
  title: string
  visuallyHiddenTitle?: boolean
  showBranding?: boolean
  animate?: AnimateProps
  showControlsWhenPaused?: boolean
  showPlayPauseButton?: boolean
  showSeekControl?: boolean
  showCCButton?: boolean
  showMuteButton?: boolean
  showVolumeControl?: boolean
  showFullScreenButton?: boolean
} & HTMLProps<HTMLVideoElement>

const Root = ({
  title,
  visuallyHiddenTitle,
  showBranding = true,
  children,
  className,
  showControlsWhenPaused = true,
  showPlayPauseButton = true,
  showSeekControl = true,
  showCCButton = true,
  showMuteButton = true,
  showVolumeControl = true,
  showFullScreenButton = true,

  ...rest
}: VideoPlayerProps) => {
  const videoWrapperRef = useRef<HTMLDivElement>(null)
  const useVideoContext = useVideo()
  const {ccEnabled, isPlaying, ref, togglePlaying} = useVideoContext
  const isSmall = useVideoResizeObserver({videoWrapperRef, className: styles['VideoPlayer__container--small']})

  const hideControls = !isPlaying && !showControlsWhenPaused

  return (
    <div className={styles.VideoPlayer__container} ref={videoWrapperRef}>
      <video ref={ref} title={title} controls={false} className={clsx(styles.VideoPlayer, className)} {...rest}>
        {children}
        <track kind="captions" />
      </video>
      <div className={styles.VideoPlayer__title}>
        {showBranding && <MarkGithubIcon size={40} />}
        {!visuallyHiddenTitle && (
          <Text size="400" weight="medium" className={styles.VideoPlayer__controlTextColor}>
            {title}
          </Text>
        )}
      </div>
      <button
        className={styles.VideoPlayer__playButton}
        onClick={togglePlaying}
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {!isPlaying && <PlayIcon className={styles.VideoPlayer__playButtonOverlay} />}
      </button>
      <div className={styles.VideoPlayer__controls}>
        {ccEnabled && <Captions />}
        {!hideControls && (
          <ControlsBar>
            {showPlayPauseButton && <PlayPauseButton />}
            {showSeekControl && <SeekControl />}
            {showCCButton && <CCButton />}
            {showMuteButton && <MuteButton />}
            {showVolumeControl && !isSmall && <VolumeControl />}
            {showFullScreenButton && <FullScreenButton />}
          </ControlsBar>
        )}
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
  Provider: VideoProvider,
  WithoutProvider: Root,
})
