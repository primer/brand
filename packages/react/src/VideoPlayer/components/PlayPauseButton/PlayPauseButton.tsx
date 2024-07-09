import React from 'react'

import {IconControl, PlayIcon, PauseIcon} from '../'
import {useVideo} from '../../hooks/useVideo'

export const PlayPauseButton = () => {
  const {isPlaying, togglePlaying} = useVideo()

  return (
    <IconControl
      onClick={() => {
        togglePlaying()
      }}
      tooltip={isPlaying ? 'Pause video' : 'Play video'}
    >
      {isPlaying ? <PauseIcon /> : <PlayIcon />}
    </IconControl>
  )
}
