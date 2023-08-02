import React, {useState, useRef, useEffect} from 'react'
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
  const videoPlayerRef = useRef<HTMLVideoElement>(null)
  const videoRef = ref ? ref : videoPlayerRef
  const [playing, setPlaying] = useState(false)
  const [playedTime, setPlayedTime] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const [fullScreen, setFullScreen] = useState(false)
  const [volume, setVolume] = useState(0.1)
  const [previousVolume, setPreviousVolume] = useState(volume)

  //   Play Pause Functionality:
  const handleVideoPlayback = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }

  // Full Screen Change:

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

  //  Time to video format converter
  const getMinuteSecondTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time - minutes * 60)
    const x = minutes < 10 ? `0${minutes}` : minutes
    const y = seconds < 10 ? `0${seconds}` : seconds

    return `${x}:${y}`
  }

  // Play Time Change:

  const handlePlayTimeChange = (value: number) => {
    if (videoRef.current) videoRef.current.currentTime = value
  }

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('timeupdate', () => {
        setPlayedTime(videoRef.current?.currentTime || 0)
      })
    }
  }, [videoRef, videoRef.current?.currentTime])

  // Volume Change:

  const handleVolumeChange = (value: number) => {
    console.log('setting volume to', value)
    setVolume(value)
  }

  React.useEffect(() => {
    if (videoRef.current) videoRef.current.volume = volume
  }, [videoRef, videoRef.current?.volume, volume])

  // TODO: This needs to load as soon as the video loads
  // Sets total time
  React.useEffect(() => {
    setTotalTime(videoRef.current?.duration || 0)
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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M1.56489 23.8112C0.884817 24.2389 1.07491e-06 23.7501 1.0398e-06 22.9467L8.28679e-08 1.05473C4.73246e-08 0.241596 0.904067 -0.245404 1.58307 0.201969L18.5829 11.4026C19.2032 11.8113 19.1935 12.7244 18.5647 13.1198L1.56489 23.8112Z"
                fill="currentColor"
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
                fill="currentColor"
              />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect width="7.2" height="24" rx="1" fill="currentColor" />
              <rect x="12.5" width="7.2" height="24" rx="1" fill="currentColor" />
            </svg>
          )}
          <VideoPlayerTooltip>{!playing ? 'Play' : 'Pause'}</VideoPlayerTooltip>
        </button>
        <input
          type="range"
          min="0"
          max={totalTime}
          step={0.01}
          onChange={e => {
            handlePlayTimeChange(e.currentTarget.valueAsNumber)
          }}
          value={playedTime}
          className={styles.VideoPlayer__progressBar}
        />
        <div className={styles.VideoPlayer__progressTime}>
          <Text className={styles.VideoPlayer__controlTextColor}>
            {getMinuteSecondTime(playedTime || 0) || '00:00'} / {getMinuteSecondTime(totalTime || 0) || '00:00'}
          </Text>
        </div>
        <button
          className={styles.VideoPlayer__iconControl}
          onClick={() => {
            if (volume > 0) {
              setPreviousVolume(volume)
              setVolume(0)
            } else {
              setVolume(previousVolume)
            }
          }}
        >
          {volume >= 0 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.553 3.064C11.686 3.12273 11.799 3.21883 11.8784 3.34062C11.9577 3.46241 12 3.60464 12 3.75V20.25C12.0001 20.3954 11.9579 20.5377 11.8786 20.6596C11.7993 20.7814 11.6863 20.8776 11.5533 20.9364C11.4204 20.9952 11.2732 21.0141 11.1296 20.9908C10.9861 20.9674 10.8525 20.9029 10.745 20.805L5.46 16H2.75C2.28587 16 1.84075 15.8156 1.51256 15.4874C1.18437 15.1592 1 14.7141 1 14.25V9.75C1 8.784 1.784 8 2.75 8H5.46L10.745 3.195C10.8526 3.0974 10.9863 3.03316 11.1297 3.01008C11.2731 2.987 11.4202 3.00608 11.553 3.065V3.064Z"
                fill="currentColor"
              />
              <path
                d="M18.718 4.222C18.8586 4.08155 19.0492 4.00266 19.248 4.00266C19.4467 4.00266 19.6374 4.08155 19.778 4.222C24.074 8.518 24.074 15.482 19.778 19.778C19.6358 19.9105 19.4478 19.9826 19.2535 19.9792C19.0592 19.9757 18.8738 19.897 18.7364 19.7596C18.599 19.6222 18.5203 19.4368 18.5168 19.2425C18.5134 19.0482 18.5855 18.8602 18.718 18.718C19.6003 17.8358 20.3002 16.7885 20.7777 15.6358C21.2552 14.4831 21.501 13.2477 21.501 12C21.501 10.7523 21.2552 9.51687 20.7777 8.36419C20.3002 7.21151 19.6003 6.16417 18.718 5.282C18.5775 5.14137 18.4987 4.95075 18.4987 4.752C18.4987 4.55325 18.5775 4.36263 18.718 4.222V4.222Z"
                fill="currentColor"
              />
              <path
                d="M16.243 7.757C16.1733 7.68733 16.0906 7.63207 15.9996 7.59437C15.9086 7.55667 15.811 7.53726 15.7125 7.53726C15.614 7.53726 15.5164 7.55667 15.4254 7.59437C15.3344 7.63207 15.2517 7.68733 15.182 7.757C15.1123 7.82667 15.0571 7.90937 15.0194 8.0004C14.9817 8.09142 14.9623 8.18898 14.9623 8.2875C14.9623 8.38602 14.9817 8.48358 15.0194 8.5746C15.0571 8.66563 15.1123 8.74833 15.182 8.818C15.5999 9.23586 15.9313 9.73194 16.1575 10.2779C16.3836 10.8239 16.5 11.409 16.5 12C16.5 12.591 16.3836 13.1761 16.1575 13.7221C15.9313 14.2681 15.5999 14.7641 15.182 15.182C15.0495 15.3242 14.9774 15.5122 14.9808 15.7065C14.9843 15.9008 15.063 16.0862 15.2004 16.2236C15.3378 16.361 15.5232 16.4397 15.7175 16.4432C15.9118 16.4466 16.0998 16.3745 16.242 16.242C17.3671 15.1168 17.9992 13.5907 17.9992 11.9995C17.9992 10.4083 17.3671 8.88221 16.242 7.757H16.243Z"
                fill="currentColor"
              />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="fff">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.553 3.064C11.686 3.12273 11.799 3.21883 11.8784 3.34062C11.9577 3.46241 12 3.60464 12 3.75V20.25C12.0001 20.3954 11.9579 20.5377 11.8786 20.6596C11.7993 20.7814 11.6863 20.8776 11.5533 20.9364C11.4204 20.9952 11.2732 21.0141 11.1296 20.9908C10.9861 20.9674 10.8525 20.9029 10.745 20.805L5.46 16H2.75C2.28587 16 1.84075 15.8156 1.51256 15.4874C1.18437 15.1592 1 14.7141 1 14.25V9.75C1 8.784 1.784 8 2.75 8H5.46L10.745 3.195C10.8526 3.0974 10.9863 3.03316 11.1297 3.01008C11.2731 2.987 11.4202 3.00608 11.553 3.065V3.064Z"
                fill="currentColor"
              />
              <line
                x1="16"
                y1="14.5962"
                x2="20.5962"
                y2="10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="16.0607"
                y1="10.0604"
                x2="20.6569"
                y2="14.6566"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          )}
          <VideoPlayerTooltip>{volume >= 0 ? 'Mute' : 'Unmute'}</VideoPlayerTooltip>
        </button>
        <input
          type="range"
          min="0"
          max={1}
          step={10}
          onChange={e => {
            handleVolumeChange(e.currentTarget.valueAsNumber)
          }}
          value={volume}
          className={styles.VideoPlayer__progressBar}
        />
        <button className={styles.VideoPlayer__iconControl} onClick={handleFullScreen}>
          {!fullScreen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.13888 2.83333C2.97013 2.83333 2.83333 2.97013 2.83333 3.13888V8.33331C2.83333 8.83957 2.42292 9.31108 1.91666 9.31108C1.4104 9.31108 1 8.83957 1 8.33331V3.13888C1 1.95761 1.95761 1 3.13888 1H8.33331C8.83957 1 9.31108 1.47152 9.31108 1.97777C9.31108 2.48403 8.83957 2.83333 8.33331 2.83333H3.13888ZM14.6888 1.97777C14.6888 1.47152 15.1604 1 15.6666 1H20.861C22.0423 1 22.9999 1.95761 22.9999 3.13888V8.33331C22.9999 8.83957 22.5895 9.31108 22.0833 9.31108C21.577 9.31108 21.1666 8.83957 21.1666 8.33331V3.13888C21.1666 2.97013 21.0298 2.83333 20.861 2.83333H15.6666C15.1604 2.83333 14.6888 2.48403 14.6888 1.97777ZM1.91666 14.6888C2.42292 14.6888 2.83333 15.1604 2.83333 15.6666V20.861C2.83333 21.0298 2.97013 21.1666 3.13888 21.1666H8.33331C8.83957 21.1666 9.31108 21.5159 9.31108 22.0222C9.31108 22.5284 8.83957 22.9999 8.33331 22.9999H3.13888C1.95761 22.9999 1 22.0423 1 20.861V15.6666C1 15.1604 1.4104 14.6888 1.91666 14.6888ZM22.0833 14.6888C22.5895 14.6888 22.9999 15.1604 22.9999 15.6666V20.861C22.9999 22.0423 22.0423 22.9999 20.861 22.9999H15.6666C15.1604 22.9999 14.6888 22.5284 14.6888 22.0222C14.6888 21.5159 15.1604 21.1666 15.6666 21.1666H20.861C21.0298 21.1666 21.1666 21.0298 21.1666 20.861V15.6666C21.1666 15.1604 21.577 14.6888 22.0833 14.6888Z"
                fill="currentColor"
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
                  fill="currentColor"
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

export function VideoPlayerTooltip({children}: {children: string}) {
  return (
    <div className={styles.VideoPlayer__tooltip} aria-hidden="true">
      <span className={styles.VideoPlayer__tooltipContent}>
        <Text className={styles.VideoPlayer__tooltipText} weight="medium">
          {children}
        </Text>
      </span>
    </div>
  )
}
