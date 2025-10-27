import React, {forwardRef, useContext, type HTMLProps, type FunctionComponent} from 'react'
import {clsx} from 'clsx'
import {Text} from '../Text'
import {type AnimateProps} from '../animation'
import {
  Captions,
  CCButton,
  ControlsBar,
  FullScreenButton,
  MuteButton,
  PlayIcon as DefaultPlayIcon,
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
import {useVideo, VideoContext, VideoProvider} from './hooks/useVideo'

type VideoPlayerProps = {
  title: string
  visuallyHiddenTitle?: boolean
  showBranding?: boolean
  animate?: AnimateProps
  showPlayPauseButton?: boolean
  showSeekControl?: boolean
  showCCButton?: boolean
  showMuteButton?: boolean
  showVolumeControl?: boolean
  showFullScreenButton?: boolean
  playIcon?: FunctionComponent
} & HTMLProps<HTMLVideoElement>

const Root = ({
  title,
  visuallyHiddenTitle,
  showBranding = true,
  children,
  className,
  showPlayPauseButton = true,
  showSeekControl = true,
  showCCButton = true,
  showMuteButton = true,
  showVolumeControl = true,
  showFullScreenButton = true,
  playIcon: PlayIcon = () => <DefaultPlayIcon className={styles.VideoPlayer__playButton} />,
  ...rest
}: VideoPlayerProps) => {
  const videoContext = useVideo()
  const {ccEnabled, fullscreenRef, isPlaying, ref, togglePlaying} = videoContext

  const isSmall = useVideoResizeObserver({
    videoWrapperRef: fullscreenRef,
    className: styles['VideoPlayer__container--small'],
  })

  const showControlsRow1 = showPlayPauseButton || showSeekControl
  const showControlsRow2 = showCCButton || showMuteButton || showVolumeControl || showFullScreenButton
  const showControlsBar = showControlsRow1 || showControlsRow2

  return (
    <div className={styles.VideoPlayer__container} ref={fullscreenRef}>
      <div className={styles.VideoPlayer__overlayContainer}>
        <video title={title} controls={false} className={clsx(styles.VideoPlayer, className)} {...rest} ref={ref}>
          {children}
          <track kind="captions" />
        </video>
        {showBranding || !visuallyHiddenTitle ? (
          <div className={clsx(styles.VideoPlayer__title, isPlaying && styles['VideoPlayer__title--hidden'])}>
            {showBranding && <MarkGithubIcon size={40} aria-label="GitHub logo" />}
            {!visuallyHiddenTitle && (
              <Text size="400" weight="medium" className={styles.VideoPlayer__controlTextColor}>
                {title}
              </Text>
            )}
          </div>
        ) : null}
        <button
          className={clsx(
            styles.VideoPlayer__playButtonOverlay,
            isPlaying && styles['VideoPlayer__playButtonOverlay--transparent'],
          )}
          onClick={togglePlaying}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {!isPlaying && <PlayIcon />}
        </button>
      </div>

      {ccEnabled && <Captions />}
      {showControlsBar && (
        <ControlsBar>
          {showControlsRow1 && (
            <div className={styles['VideoPlayer__controlsBar__row1']}>
              {showPlayPauseButton && <PlayPauseButton />}
              {showSeekControl && <SeekControl />}
            </div>
          )}
          {showControlsRow2 && (
            <div className={styles['VideoPlayer__controlsBar__row2']}>
              {showCCButton && <CCButton />}
              {showMuteButton && <MuteButton />}
              {showVolumeControl && !isSmall && <VolumeControl />}
              {showFullScreenButton && <FullScreenButton />}
            </div>
          )}
        </ControlsBar>
      )}
    </div>
  )
}

const VideoPlayerSource = (props: React.HTMLProps<HTMLSourceElement>) => <source {...props} />

const VideoPlayerTrack = ({kind = 'captions', ...rest}: React.HTMLProps<HTMLTrackElement>) => (
  <track kind={kind} {...rest} />
)

const RootWithProvider = forwardRef<HTMLVideoElement, VideoPlayerProps>((props, ref) => {
  const context = useContext(VideoContext)

  return context ? (
    <Root {...props} ref={ref} />
  ) : (
    <VideoProvider>
      <Root {...props} ref={ref} />
    </VideoProvider>
  )
})

export const VideoPlayer = Object.assign(RootWithProvider, {
  Source: VideoPlayerSource,
  Track: VideoPlayerTrack,
  Provider: VideoProvider,
})
