import React, {useRef, forwardRef, useCallback, useState, type PropsWithChildren} from 'react'
import clsx from 'clsx'
import {Text} from '../Text'
import {type AnimateProps} from '../animation'
import {Captions, Controls, type ControlsProps} from './components'
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
  renderControls?: (props: ControlsProps) => React.ReactElement
}> &
  React.HTMLProps<HTMLVideoElement>

const Root = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  (
    {poster, title, branding = true, children, className, renderControls = props => <Controls {...props} />, ...rest},
    forwardedRef,
  ) => {
    const videoRef = useProvidedRefOrCreate(forwardedRef)
    const videoWrapperRef = useRef<HTMLDivElement>(null)
    const isPlaying = useVideo(videoRef)
    const isSmall = useVideoResizeObserver({videoWrapperRef, className: styles['VideoPlayer__container--small']})

    const [isFullScreen, setIsFullScreen] = useIsElementFullScreen(videoWrapperRef)

    const toggleFullScreen = useCallback(() => {
      setIsFullScreen(prev => !prev)
    }, [setIsFullScreen])

    const [closedCaptionsEnabled, setClosedCaptionsEnabled] = useState(true)
    const toggleClosedCaptions = useCallback(() => {
      setClosedCaptionsEnabled(prev => !prev)
    }, [setClosedCaptionsEnabled])

    useVideoKeypressHandlers(videoRef, videoWrapperRef, {
      toggleFullScreen,
      toggleClosedCaptions,
    })

    return (
      <div
        className={clsx(
          styles.VideoPlayer__container,
          styles.VideoPlayer__overlays,
          isPlaying ? null : styles.VideoPlayer__showOverlays,
        )}
        ref={videoWrapperRef}
      >
        <video
          ref={videoRef}
          title={title}
          controls={false}
          poster={poster}
          className={clsx(styles.VideoPlayer, className)}
          {...rest}
        >
          {children}
          <track kind="captions" />
        </video>
        {title && (
          <div className={styles.VideoPlayer__title}>
            {branding && <MarkGithubIcon size={48} />}
            <Text size="500" weight="medium" className={styles.VideoPlayer__controlTextColor}>
              {title}
            </Text>
          </div>
        )}
        <button
          className={styles.VideoPlayer__playButton}
          onClick={() => {
            const video = videoRef.current
            if (!video) return

            video.paused ? video.play() : video.pause()
          }}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? null : (
            <span className={styles.VideoPlayer__playButtonInner}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1.56489 23.8112C0.884817 24.2389 1.07491e-06 23.7501 1.0398e-06 22.9467L8.28679e-08 1.05473C4.73246e-08 0.241596 0.904067 -0.245404 1.58307 0.201969L18.5829 11.4026C19.2032 11.8113 19.1935 12.7244 18.5647 13.1198L1.56489 23.8112Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          )}
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
          })}
        </div>
      </div>
    )
  },
)

const VideoPlayerSource = (props: React.HTMLProps<HTMLSourceElement>) => {
  return <source {...props} />
}

const VideoPlayerTrack = ({kind = 'captions', ...rest}: React.HTMLProps<HTMLTrackElement>) => {
  return <track kind={kind} {...rest} />
}

export const VideoPlayer = Object.assign(Root, {
  Source: VideoPlayerSource,
  Track: VideoPlayerTrack,
})

// TODO
// - [x] Escape key needs to toggle fullScreen state
// - [x] F should go fullscreen
// - [x] Space should play/pause
// - [x] K should play/pause
// - [x] M should mute
// - [x] Arrow keys should seek
// - [x] J and L should seek
// - [x] C should toggle captions
// - [x] Contrast on the captions feels very low
// - [x] Pointer area on blue play button only covers icon, not the blue bit
// - [x] Tidy up all my imports
// - [x] Decide what components I'm exporting and tidy all that up
// - [ ] Split out the styles of controls to live alongside each control
// - [x] Add bindings for numbers 0 - 9 to jump to 0% - 90% of the video
// - [ ] CSS variable for the accent colour
