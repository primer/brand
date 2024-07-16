import React, {type HTMLAttributes} from 'react'

import {IconControl, PlayIcon, PauseIcon} from '../'
import {useVideo} from '../../hooks/useVideo'

export const PlayPauseButton = (props: HTMLAttributes<HTMLButtonElement>) => {
  const {isPlaying, togglePlaying} = useVideo()

  return (
    <IconControl onClick={togglePlaying} tooltip={isPlaying ? 'Pause video' : 'Play video'} {...props}>
      {isPlaying ? <PauseIcon /> : <PlayIcon />}
    </IconControl>
  )
}
