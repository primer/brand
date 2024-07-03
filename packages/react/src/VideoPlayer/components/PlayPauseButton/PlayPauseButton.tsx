import React, {useCallback, useEffect, useState} from 'react'

import {IconControl, PlayIcon, PauseIcon} from '../'

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
    <IconControl onClick={onClick} tooltip={isPlaying ? 'Pause video' : 'Play video'}>
      {isPlaying ? <PauseIcon /> : <PlayIcon />}
    </IconControl>
  )
}
