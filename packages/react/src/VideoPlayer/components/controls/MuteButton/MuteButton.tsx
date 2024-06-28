import React, {useState} from 'react'
import {IconControl} from '../IconControl'
import {type ControlsProps} from './../Controls'
import {MuteIcon, UnmuteIcon} from '@primer/octicons-react'

type MuteButtonProps = Pick<ControlsProps, 'volume' | 'setVolume'>

export const MuteButton = ({volume, setVolume}: MuteButtonProps) => {
  const [previousVolume, setPreviousVolume] = useState(1)

  return (
    <IconControl
      tooltip={volume > 0 ? 'Mute' : 'Unmute'}
      onClick={() => {
        if (volume > 0) {
          setPreviousVolume(volume)
          setVolume(0)
        } else {
          setVolume(previousVolume)
        }
      }}
    >
      {volume > 0 ? <UnmuteIcon size={24} /> : <MuteIcon size={24} />}
    </IconControl>
  )
}
