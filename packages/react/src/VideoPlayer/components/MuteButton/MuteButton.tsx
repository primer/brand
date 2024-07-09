import React from 'react'
import {MuteIcon, UnmuteIcon} from '@primer/octicons-react'

import {IconControl} from '../'
import {useVideo} from '../../hooks/useVideo'

export const MuteButton = () => {
  const {isMuted, mute, unmute} = useVideo()
  return (
    <IconControl tooltip={isMuted ? 'Unmute' : 'Mute'} onClick={() => (isMuted ? unmute() : mute())}>
      {isMuted ? <MuteIcon size={24} /> : <UnmuteIcon size={24} />}
    </IconControl>
  )
}
