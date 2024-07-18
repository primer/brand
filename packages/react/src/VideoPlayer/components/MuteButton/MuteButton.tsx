import React, {type HTMLAttributes} from 'react'
import {MuteIcon, UnmuteIcon} from '@primer/octicons-react'

import {IconControl} from '../'
import {useVideo} from '../../hooks/useVideo'

export const MuteButton = (props: HTMLAttributes<HTMLButtonElement>) => {
  const {isMuted, toggleMute} = useVideo()
  return (
    <IconControl tooltip={isMuted ? 'Unmute' : 'Mute'} onClick={toggleMute} {...props}>
      {isMuted ? <MuteIcon size={24} /> : <UnmuteIcon size={24} />}
    </IconControl>
  )
}
