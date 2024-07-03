import React, {useState, useEffect, useCallback, type HTMLAttributes} from 'react'
import clsx from 'clsx'

import {Range} from '../'
import styles from '../../VideoPlayer.module.css'
import {Text} from '../../../Text'

const padTime = (time: number) => time.toString().padStart(2, '0')
const formatTime = (time: number) => {
  const minutes = padTime(Math.floor(time / 60))
  const seconds = padTime(Math.floor(time % 60))

  return `${minutes}:${seconds}`
}

type SeekControlProps = {
  videoRef: React.RefObject<HTMLVideoElement>
} & HTMLAttributes<HTMLDivElement>

export const SeekControl = ({videoRef, className, ...rest}: SeekControlProps) => {
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const seek = useCallback(
    (time: number) => {
      if (videoRef.current) {
        videoRef.current.currentTime = time
      }
    },
    [videoRef],
  )

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime)
    }

    const onLoadedMetadata = () => {
      setDuration(video.duration)
    }

    video.addEventListener('timeupdate', onTimeUpdate)
    video.addEventListener('loadedmetadata', onLoadedMetadata)

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate)
      video.removeEventListener('loadedmetadata', onLoadedMetadata)
    }
  }, [videoRef])

  return (
    <div className={clsx(styles['VideoPlayer__seek'], className)} {...rest}>
      <Range
        type="range"
        min="0"
        max={duration}
        step={0.0001}
        onInput={e => {
          seek(e.currentTarget.valueAsNumber)
        }}
        value={currentTime}
        className={styles.VideoPlayer__progressBar}
        tooltip
        tooltipFormatter={formatTime}
        name="Seek"
      />
      <div className={styles.VideoPlayer__progressTime}>
        <Text as="p" className={styles.VideoPlayer__controlTextColor}>
          {formatTime(currentTime)}
          {<span className={styles.VideoPlayer__totalTime}> / {formatTime(duration)}</span>}
        </Text>
      </div>
    </div>
  )
}
