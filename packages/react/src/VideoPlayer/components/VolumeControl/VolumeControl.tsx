import React, {useCallback, useEffect, useState} from 'react'

import {Range} from '../'

type VolumeControlProps = {videoRef: React.RefObject<HTMLVideoElement>}

export const VolumeControl = ({videoRef}: VolumeControlProps) => {
  const [volume, setVolume] = useState(1)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onVolumeChange = () => {
      setVolume(video.volume)
    }

    video.addEventListener('volumechange', onVolumeChange)

    return () => {
      video.removeEventListener('volumechange', onVolumeChange)
    }
  }, [videoRef])

  const onInput = useCallback(
    e => {
      const video = videoRef.current
      if (!video) return

      video.volume = e.currentTarget.valueAsNumber
    },
    [videoRef],
  )

  return (
    <Range type="range" min="0" max={1} step={0.001} onInput={onInput} value={volume} a11yStep={0.1} name="Volume" />
  )
}
