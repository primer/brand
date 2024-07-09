import React from 'react'

import {IconControl, PlayIcon, PauseIcon} from '../'
import {useVideo} from '../../hooks/useVideo'

export const PlayPauseButton = () => {
  const {isPlaying, pause, play} = useVideo()

  return (
    <IconControl
      onClick={() => {
        isPlaying ? pause() : play()
      }}
      tooltip={isPlaying ? 'Pause video' : 'Play video'}
    >
      {isPlaying ? <PauseIcon /> : <PlayIcon />}
    </IconControl>
  )
}
