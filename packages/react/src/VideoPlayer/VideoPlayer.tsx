import React, {useState, useRef} from 'react'
import clsx from 'clsx'
import {Text} from '../Text'

import styles from './VideoPlayer.module.css'

type VideoPlayerProps = {
  poster: string
  title: string
  branding?: boolean
  children: React.ReactElement | React.ReactElement[]
  ref?: React.RefObject<HTMLVideoElement>
} & React.HTMLProps<HTMLVideoElement>

export function VideoPlayer({
  poster,
  title,
  branding = true,
  children,
  className,
  onPlay,
  onPause,
  ref,
  ...rest
}: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false)
  const [playedTime, setPlayedTime] = useState('00:00')
  const [totalTime, setTotalTime] = useState('00:00')
  const [fullScreen, setFullScreen] = useState(false)
  const videoPlayerRef = useRef<HTMLVideoElement>(null)
  const videoRef = ref ? ref : videoPlayerRef

  const handleVideoPlayback = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }

  const handleFullScreen = () => {
    if (videoRef.current) {
      if (!fullScreen) {
        videoRef.current.requestFullscreen()
        setFullScreen(true)
      } else {
        document.exitFullscreen()
        setFullScreen(false)
      }
    }
  }

  const handleFullScreenMinimize = () => {
    if (!document.fullscreenElement) {
      setFullScreen(false)
    }
  }

  React.useEffect(() => {
    window.addEventListener('fullscreenchange', handleFullScreenMinimize)

    // cleanup this component
    return () => {
      window.removeEventListener('fullscreenchange', handleFullScreenMinimize)
    }
  }, [])

  const getMinuteSecondTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time - minutes * 60)
    const x = minutes < 10 ? `0${minutes}` : minutes
    const y = seconds < 10 ? `0${seconds}` : seconds

    return `${x}:${y}`
  }

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('timeupdate', () => {
        setPlayedTime(getMinuteSecondTime(videoRef.current?.currentTime || 0) || '00:00')
      })
    }
  }, [videoRef, videoRef.current?.currentTime])

  // TODO: This needs to load as soon as the video loads
  React.useEffect(() => {
    setTotalTime(getMinuteSecondTime(videoRef.current?.duration || 0) || '00:00')
  }, [videoRef, videoRef.current?.duration])

  return (
    <div className={styles.VideoPlayer__container}>
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
      >
        {children}
      </video>
      {title && !playing && (
        <div className={styles.VideoPlayer__title}>
          <Text>{title}</Text>
        </div>
      )}
      <button className={styles.VideoPlayer__playButton}>
        <span>
          {!playing && (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M1.56489 23.8112C0.884817 24.2389 1.07491e-06 23.7501 1.0398e-06 22.9467L8.28679e-08 1.05473C4.73246e-08 0.241596 0.904067 -0.245404 1.58307 0.201969L18.5829 11.4026C19.2032 11.8113 19.1935 12.7244 18.5647 13.1198L1.56489 23.8112Z"
                fill="#fff"
              />
            </svg>
          )}
        </span>
      </button>
      <div className={styles.VideoPlayer__controls}>
        <button className={styles.VideoPlayer__iconControl} onClick={handleVideoPlayback}>
          {!playing ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M1.56489 23.8112C0.884817 24.2389 1.07491e-06 23.7501 1.0398e-06 22.9467L8.28679e-08 1.05473C4.73246e-08 0.241596 0.904067 -0.245404 1.58307 0.201969L18.5829 11.4026C19.2032 11.8113 19.1935 12.7244 18.5647 13.1198L1.56489 23.8112Z"
                fill="#fff"
              />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect width="7.2" height="24" rx="1" fill="#fff" />
              <rect x="12.5" width="7.2" height="24" rx="1" fill="#fff" />
            </svg>
          )}
          <VideoPlayerTooltip>{!playing ? 'play' : 'pause'}</VideoPlayerTooltip>
        </button>
        <div className={styles.VideoPlayer__progress}>
          <Text>
            {playedTime} / {totalTime}
          </Text>
        </div>
        <button className={styles.VideoPlayer__iconControl} onClick={handleFullScreen}>
          {!fullScreen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.13888 2.83333C2.97013 2.83333 2.83333 2.97013 2.83333 3.13888V8.33331C2.83333 8.83957 2.42292 9.31108 1.91666 9.31108C1.4104 9.31108 1 8.83957 1 8.33331V3.13888C1 1.95761 1.95761 1 3.13888 1H8.33331C8.83957 1 9.31108 1.47152 9.31108 1.97777C9.31108 2.48403 8.83957 2.83333 8.33331 2.83333H3.13888ZM14.6888 1.97777C14.6888 1.47152 15.1604 1 15.6666 1H20.861C22.0423 1 22.9999 1.95761 22.9999 3.13888V8.33331C22.9999 8.83957 22.5895 9.31108 22.0833 9.31108C21.577 9.31108 21.1666 8.83957 21.1666 8.33331V3.13888C21.1666 2.97013 21.0298 2.83333 20.861 2.83333H15.6666C15.1604 2.83333 14.6888 2.48403 14.6888 1.97777ZM1.91666 14.6888C2.42292 14.6888 2.83333 15.1604 2.83333 15.6666V20.861C2.83333 21.0298 2.97013 21.1666 3.13888 21.1666H8.33331C8.83957 21.1666 9.31108 21.5159 9.31108 22.0222C9.31108 22.5284 8.83957 22.9999 8.33331 22.9999H3.13888C1.95761 22.9999 1 22.0423 1 20.861V15.6666C1 15.1604 1.4104 14.6888 1.91666 14.6888ZM22.0833 14.6888C22.5895 14.6888 22.9999 15.1604 22.9999 15.6666V20.861C22.9999 22.0423 22.0423 22.9999 20.861 22.9999H15.6666C15.1604 22.9999 14.6888 22.5284 14.6888 22.0222C14.6888 21.5159 15.1604 21.1666 15.6666 21.1666H20.861C21.0298 21.1666 21.1666 21.0298 21.1666 20.861V15.6666C21.1666 15.1604 21.577 14.6888 22.0833 14.6888Z"
                fill="#fff"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <g clipPath="url(#clip0_103_24779)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.6 9.7H23.2244C23.3766 9.7 23.5 9.5766 23.5 9.42439V7.67561C23.5 7.52339 23.3766 7.4 23.2244 7.4H16.6V0.775611C16.6 0.623395 16.4766 0.5 16.3244 0.5H14.5756C14.4234 0.5 14.3 0.623395 14.3 0.775611V9.42439C14.3 9.57661 14.4234 9.7 14.5756 9.7H16.6ZM16.6 16.6H23.2244C23.3766 16.6 23.5 16.4766 23.5 16.3244V14.5756C23.5 14.4234 23.3766 14.3 23.2244 14.3H14.5756C14.4234 14.3 14.3 14.4234 14.3 14.5756V23.2244C14.3 23.3766 14.4234 23.5 14.5756 23.5H16.3244C16.4766 23.5 16.6 23.3766 16.6 23.2244V16.6ZM7.4 23.2244C7.4 23.3766 7.52339 23.5 7.67561 23.5H9.42439C9.57661 23.5 9.7 23.3766 9.7 23.2244V14.5756C9.7 14.4234 9.5766 14.3 9.42439 14.3H0.77561C0.623395 14.3 0.5 14.4234 0.5 14.5756V16.3244C0.5 16.4766 0.623395 16.6 0.775611 16.6H7.4V23.2244ZM7.4 0.775611C7.4 0.623395 7.52339 0.5 7.67561 0.5H9.42439C9.57661 0.5 9.7 0.623395 9.7 0.775611V9.42439C9.7 9.57661 9.5766 9.7 9.42439 9.7H0.77561C0.623395 9.7 0.5 9.5766 0.5 9.42439V7.67561C0.5 7.52339 0.623395 7.4 0.775611 7.4H7.4V0.775611Z"
                  fill="#fff"
                  stroke="#fff"
                  strokeWidth="1.21053"
                />
              </g>
              <defs>
                <clipPath id="clip0_103_24779">
                  <rect width="24" height="24" fill="currentColor" />
                </clipPath>
              </defs>
            </svg>
          )}
          <VideoPlayerTooltip>{!fullScreen ? 'Full Screen' : 'Exit Full Screen'}</VideoPlayerTooltip>
        </button>
      </div>
    </div>
  )
}

export function VideoPlayerTooltip({children}: {children: React.ReactNode}) {
  return (
    <div className={styles.VideoPlayer__tooltip} aria-hidden="true">
      <span className={styles.VideoPlayer__tooltipContent}>
        <Text>{children}</Text>
      </span>
    </div>
  )
}
