import React, {useState, useRef, useEffect} from 'react'
import clsx from 'clsx'
import {Text} from '../Text'
import {Controls} from './components'
import {MarkGithubIcon} from '@primer/octicons-react'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/video-player/base.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/video-player/colors.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from './VideoPlayer.module.css'

type VideoPlayerProps = {
  poster?: string
  title: string
  branding?: boolean
  children: React.ReactElement | React.ReactElement[]
  ref?: React.RefObject<HTMLVideoElement>
} & React.HTMLProps<HTMLVideoElement>

const Root = ({
  poster,
  title,
  branding = true,
  children,
  className,
  onPlay,
  onPause,
  onLoadedMetadata,
  onPlaying,
  ref,
  ...rest
}: VideoPlayerProps) => {
  const videoPlayerRef = useRef<HTMLVideoElement>(null)
  const videoWrapperRef = useRef<HTMLDivElement>(null)
  const videoRef = ref ? ref : videoPlayerRef
  const [playing, setPlaying] = useState(false)
  const [playedTime, setPlayedTime] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const [trackInformation, setTrackInformation] = useState<TextTrackCueList | undefined>(undefined)

  /* > Play / Pause                                                    */
  const handleVideoPlayback = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }

  const handleVideoOnPlaying = () => {
    videoRef.current?.textTracks[0].cues && setTrackInformation(videoRef.current.textTracks[0].cues)
  }

  /* > Hide Default Captions                                                   */
  useEffect(() => {
    if (videoRef.current) {
      for (let i = 0; i < videoRef.current.textTracks.length; i++) {
        videoRef.current.textTracks[0].mode = 'hidden'
      }
    }
  }, [videoRef])

  /* > Set breakpoint classes                                                   */

  useEffect(() => {
    const handleResize = () => {
      const breakpoint = videoWrapperRef.current?.getBoundingClientRect().width
      if (breakpoint && breakpoint < 650) {
        videoWrapperRef.current.classList.add(styles.VideoPlayer__breakpointSmall)
      } else {
        videoWrapperRef.current?.classList.remove(styles.VideoPlayer__breakpointSmall)
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
  }, [videoWrapperRef, playing])

  return (
    <div
      className={clsx(
        styles.VideoPlayer__container,
        styles.VideoPlayer__overlays,
        !playing && styles.VideoPlayer__showOverlays,
      )}
      ref={videoWrapperRef}
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={videoRef}
        title={title}
        controls={false}
        poster={poster}
        {...rest}
        className={clsx(styles.VideoPlayer, className)}
        onPlay={e => {
          setPlaying(true)
          onPlay && onPlay(e)
        }}
        onPause={e => {
          setPlaying(false)
          onPause && onPause(e)
        }}
        onPlaying={e => {
          handleVideoOnPlaying()
          onPlaying && onPlaying(e)
        }}
        onLoadedMetadata={e => {
          setTotalTime(videoRef.current?.duration || 0)

          onLoadedMetadata && onLoadedMetadata(e)
        }}
        onTimeUpdate={() => setPlayedTime(videoRef.current?.currentTime || 0)}
      >
        {children}
      </video>
      {title && (
        <div className={styles.VideoPlayer__title}>
          {branding && <MarkGithubIcon size={48} />}
          <Text size="500" weight="medium" className={styles.VideoPlayer__controlTextColor}>
            {title}
          </Text>
        </div>
      )}
      <button className={styles.VideoPlayer__playButton} onClick={handleVideoPlayback}>
        {!playing && (
          <span className={styles.VideoPlayer__playButtonInner}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              style={{marginLeft: 5}}
              aria-hidden="true"
            >
              <path
                d="M1.56489 23.8112C0.884817 24.2389 1.07491e-06 23.7501 1.0398e-06 22.9467L8.28679e-08 1.05473C4.73246e-08 0.241596 0.904067 -0.245404 1.58307 0.201969L18.5829 11.4026C19.2032 11.8113 19.1935 12.7244 18.5647 13.1198L1.56489 23.8112Z"
                fill="currentColor"
              />
            </svg>
          </span>
        )}
        <span className={styles.VideoPlayer__srOnly}>Play</span>
      </button>
      <Controls
        videoRef={videoRef}
        videoWrapperRef={videoWrapperRef}
        totalTime={totalTime}
        currentTime={playedTime}
        playing={playing}
        trackInformation={trackInformation}
      />
    </div>
  )
}

const VideoPlayerSource = (props: React.HTMLProps<HTMLSourceElement>) => {
  return <source {...props} />
}

const VideoPlayerTrack = (props: React.HTMLProps<HTMLTrackElement>) => {
  return <track {...props} />
}

export const VideoPlayer = Object.assign(Root, {
  Source: VideoPlayerSource,
  Track: VideoPlayerTrack,
})
