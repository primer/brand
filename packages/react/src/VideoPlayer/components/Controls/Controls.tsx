import React, {type HTMLAttributes} from 'react'

import {PlayPauseButton, CCButton, ControlsBar, SeekControl, MuteButton, VolumeControl, FullScreenButton} from '../'

export type ControlsProps = {
  isSmall?: boolean
  showControlsWhenPaused?: boolean
} & HTMLAttributes<HTMLDivElement>

export const Controls = ({isSmall = false, ...rest}: ControlsProps) => (
  <ControlsBar {...rest}>
    <PlayPauseButton />
    <SeekControl />
    <CCButton />
    <MuteButton />
    {!isSmall && <VolumeControl />}
    <FullScreenButton />
  </ControlsBar>
)
