import React, {useState, useEffect, useCallback, type HTMLAttributes, type FormEvent} from 'react'
import clsx from 'clsx'

import {Range} from '../'
import styles from '../../VideoPlayer.module.css'
import {Text} from '../../../Text'
import {useVideo} from '../../hooks/useVideo'

const padTime = (time: number) => time.toString().padStart(2, '0')
const formatTime = (time: number, duration?: number) => {
  if (isNaN(time) || time < 0) {
    return '00:00'
  }

  if (duration && time > duration) {
    time = duration
  }

  const minutes = padTime(Math.floor((time % 3600) / 60))
  const seconds = padTime(Math.floor(time % 60))

  let formattedTime = `${minutes}:${seconds}`

  if (time > 3600) {
    const hours = padTime(Math.floor(time / 3600))
    formattedTime = `${hours}:${formattedTime}`
  }

  return formattedTime
}

type SeekControlProps = HTMLAttributes<HTMLDivElement>

export const SeekControl = ({className, ...rest}: SeekControlProps) => {
  const {ref, duration} = useVideo()
  const [currentTime, setCurrentTime] = useState(0)
  const seek = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      const time = e.currentTarget.valueAsNumber
      if (ref.current) {
        ref.current.currentTime = time
      }
    },
    [ref],
  )

  useEffect(() => {
    const videoRef = ref.current
    if (!videoRef) return

    const onTimeUpdate = () => {
      setCurrentTime(videoRef.currentTime)
    }

    videoRef.addEventListener('timeupdate', onTimeUpdate)

    return () => {
      videoRef.removeEventListener('timeupdate', onTimeUpdate)
    }
  }, [ref])

  return (
    <div className={clsx(styles.VideoPlayer__seek, className)} {...rest}>
      <Range
        type="range"
        min="0"
        max={duration}
        step={0.0001}
        onInput={seek}
        value={currentTime}
        className={styles.VideoPlayer__progressBar}
        tooltip
        tooltipFormatter={time => formatTime(time, duration)}
        name="Seek"
      />
      <div className={styles.VideoPlayer__progressTime}>
        <Text
          as="p"
          className={clsx(styles.VideoPlayer__controlTextColor, styles.VideoPlayer__seekTime)}
          font="monospace"
        >
          {formatTime(currentTime, duration)}
          {<span className={styles.VideoPlayer__totalTime}> / {formatTime(duration)}</span>}
        </Text>
      </div>
    </div>
  )
}
