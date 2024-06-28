import React, {useRef, useEffect, forwardRef, useCallback} from 'react'
import clsx from 'clsx'
import {Text} from '../Text'
import {type AnimateProps} from '../animation'
import {Controls} from './components'
import {MarkGithubIcon} from '@primer/octicons-react'
import {useProvidedRefOrCreate} from '../hooks/useRef'
import {useVideoMetadata} from './hooks/useVideoMetadata'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/video-player/base.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/video-player/colors-with-modes.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from './VideoPlayer.module.css'
import {useIsElementFullScreen} from './hooks/useIsElementFullScreen'

type VideoPlayerProps = {
  poster?: string
  title: string
  branding?: boolean
  children: React.ReactElement | React.ReactElement[]
  animate?: AnimateProps
} & React.HTMLProps<HTMLVideoElement>

const Root = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  ({poster, title, branding = true, children, className, ...rest}, forwardedRef) => {
    const videoRef = useProvidedRefOrCreate(forwardedRef)
    const videoWrapperRef = useRef<HTMLDivElement>(null)

    const {isPlaying, currentTime, duration, trackInformation, volume} = useVideoMetadata(videoRef)
    const isFullScreen = useIsElementFullScreen(videoWrapperRef)

    useEffect(() => {
      // TODO Do we need this? what's it doing?
      if (videoRef.current) {
        for (let i = 0; i < videoRef.current.textTracks.length; i++) {
          videoRef.current.textTracks[0].mode = 'hidden'
        }
      }
    }, [videoRef])

    useEffect(() => {
      // TODO - A good use case for container queries?
      const handleResize = () => {
        const breakpoint = videoWrapperRef.current?.getBoundingClientRect().width
        if (breakpoint && breakpoint < 650) {
          videoWrapperRef.current.classList.add(styles['VideoPlayer__container--small'])
        } else {
          videoWrapperRef.current?.classList.remove(styles['VideoPlayer__container--small'])
        }
      }

      const resizeObserver = new ResizeObserver(_ => {
        if (videoWrapperRef.current) {
          handleResize()
        }
      })

      handleResize()

      const currentRef = videoWrapperRef.current

      resizeObserver.observe(videoWrapperRef.current as Element)
      return () => {
        resizeObserver.unobserve(currentRef as Element)
      }
    }, [videoWrapperRef, isPlaying])

    const play = useCallback(() => {
      if (videoRef.current) {
        videoRef.current.play()
      }
    }, [videoRef])

    const pause = useCallback(() => {
      if (videoRef.current) {
        videoRef.current.pause()
      }
    }, [videoRef])

    const togglePlaying = useCallback(() => {
      if (isPlaying) {
        pause()
      } else {
        play()
      }
    }, [isPlaying, play, pause])

    const seek = useCallback(
      (time: number) => {
        if (videoRef.current) {
          videoRef.current.currentTime = time
        }
      },
      [videoRef],
    )

    const setVolume = useCallback(
      (value: number) => {
        if (videoRef.current) {
          videoRef.current.volume = value
        }
      },
      [videoRef],
    )

    const setIsFullScreen = useCallback(
      (value: boolean) => {
        if (!videoWrapperRef.current || isFullScreen === value) return

        if (value) {
          videoWrapperRef.current.requestFullscreen()
        } else {
          document.exitFullscreen()
        }
      },
      [videoWrapperRef, isFullScreen],
    )

    return (
      <div
        className={clsx(
          styles.VideoPlayer__container,
          styles.VideoPlayer__overlays,
          !isPlaying && styles.VideoPlayer__showOverlays,
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
        <button className={styles.VideoPlayer__playButton} onClick={() => togglePlaying()}>
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
          <span className="visually-hidden">Play</span>
        </button>
        <Controls
          videoRef={videoRef}
          duration={duration}
          currentTime={currentTime}
          isPlaying={isPlaying}
          trackInformation={trackInformation}
          play={play}
          pause={pause}
          seek={seek}
          volume={volume}
          setVolume={setVolume}
          isFullScreen={isFullScreen}
          setIsFullScreen={setIsFullScreen}
        />
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
// Escape key needs to toggle fullScreen state
// F should go fullscreen
// Space should play/pause
// K should play/pause
// M should mute
// Arrow keys should seek
// J and L should seek
// C should toggle captions
// Contrast on the captions feels very low
// Pointer area on blue play button only covers icon, not the blue bit
