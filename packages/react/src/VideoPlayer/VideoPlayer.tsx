import React, {useState, useRef, useEffect} from 'react'
import clsx from 'clsx'
import {Text} from '../Text'
import {Controls} from './components'

import styles from './VideoPlayer.module.css'

type VideoPlayerProps = {
  poster?: string
  title: string
  branding?: boolean
  children: React.ReactElement | React.ReactElement[]
  ref?: React.RefObject<HTMLVideoElement>
} & React.HTMLProps<HTMLVideoElement>

function Root({
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
}: VideoPlayerProps) {
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

  /* > Hide Default Captions                                                   */
  useEffect(() => {
    if (videoRef.current) {
      for (let i = 0; i < videoRef.current.textTracks.length; i++) {
        videoRef.current.textTracks[0].mode = 'hidden'
      }
    }
  }, [videoRef])

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
          videoRef.current?.textTracks[0].cues && setTrackInformation(videoRef.current.textTracks[0].cues)
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
          {branding && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="48" height="48">
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
              ></path>
            </svg>
          )}
          <Text size="500" weight="medium" className={styles.VideoPlayer__controlTextColor}>
            {title}
          </Text>
        </div>
      )}
      <button className={styles.VideoPlayer__playButton} onClick={handleVideoPlayback}>
        <span>
          {!playing && (
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none">
              <path
                d="M1.56489 23.8112C0.884817 24.2389 1.07491e-06 23.7501 1.0398e-06 22.9467L8.28679e-08 1.05473C4.73246e-08 0.241596 0.904067 -0.245404 1.58307 0.201969L18.5829 11.4026C19.2032 11.8113 19.1935 12.7244 18.5647 13.1198L1.56489 23.8112Z"
                fill="currentColor"
              />
            </svg>
          )}
        </span>
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

function VideoPlayerSource(props: React.HTMLProps<HTMLSourceElement>) {
  return <source {...props} />
}

function VideoPlayerTrack(props: React.HTMLProps<HTMLTrackElement>) {
  return <track {...props} />
}

export const VideoPlayer = Object.assign(Root, {
  Source: VideoPlayerSource,
  Track: VideoPlayerTrack,
})
