import React, {useCallback, useEffect, useState} from 'react'

import {IconControl} from '../'
import styles from '../../VideoPlayer.module.css'

type PlayPauseButtonProps = {
  videoRef: React.RefObject<HTMLVideoElement>
}

export const PlayPauseButton = ({videoRef}: PlayPauseButtonProps) => {
  const [isPlaying, setIsPlaying] = useState(false)

  const onClick = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    isPlaying ? video.pause() : video.play()
  }, [videoRef, isPlaying])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onPlay = () => {
      setIsPlaying(true)
    }

    const onPause = () => {
      setIsPlaying(false)
    }

    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)

    return () => {
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
    }
  }, [videoRef])

  return (
    <IconControl
      onClick={onClick}
      className={styles.VideoPlayer__shiftTooltipRight}
      tooltip={isPlaying ? 'Pause video' : 'Play video'}
    >
      {isPlaying ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect width="7.2" height="24" rx="1" fill="currentColor" />
          <rect x="12.5" width="7.2" height="24" rx="1" fill="currentColor" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M1.56489 23.8112C0.884817 24.2389 1.07491e-06 23.7501 1.0398e-06 22.9467L8.28679e-08 1.05473C4.73246e-08 0.241596 0.904067 -0.245404 1.58307 0.201969L18.5829 11.4026C19.2032 11.8113 19.1935 12.7244 18.5647 13.1198L1.56489 23.8112Z"
            fill="currentColor"
          />
        </svg>
      )}
    </IconControl>
  )
}
