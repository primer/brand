import React, {useCallback, useEffect, useState} from 'react'
import {MuteIcon, UnmuteIcon} from '@primer/octicons-react'

import {IconControl} from '../'

type MuteButtonProps = {videoRef: React.RefObject<HTMLVideoElement>}

export const MuteButton = ({videoRef}: MuteButtonProps) => {
  const [isMuted, setIsMuted] = useState(false)

  const toggleMute = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    video.dispatchEvent(new Event(isMuted ? 'unmute' : 'mute'))
  }, [videoRef, isMuted])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onVolumeChange = () => {
      setIsMuted(video.volume === 0)
    }

    video.addEventListener('volumechange', onVolumeChange)

    return () => {
      video.removeEventListener('volumechange', onVolumeChange)
    }
  }, [videoRef])

  return (
    <IconControl tooltip={isMuted ? 'Unmute' : 'Mute'} onClick={toggleMute}>
      {isMuted ? <MuteIcon size={24} /> : <UnmuteIcon size={24} />}
    </IconControl>
  )
}
