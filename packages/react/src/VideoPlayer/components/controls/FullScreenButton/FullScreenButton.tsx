import React from 'react'
import {IconControl} from '../IconControl'
import {type ControlsProps} from './../Controls'
import {ScreenFullIcon, ScreenNormalIcon} from '@primer/octicons-react'

type FullScreenButtonProps = Pick<ControlsProps, 'isFullScreen' | 'setIsFullScreen'>

export const FullScreenButton = ({isFullScreen, setIsFullScreen}: FullScreenButtonProps) => (
  <IconControl
    onClick={() => {
      setIsFullScreen(!isFullScreen)
    }}
    tooltip={isFullScreen ? 'Exit full screen' : 'Full screen'}
  >
    {isFullScreen ? <ScreenNormalIcon size={24} /> : <ScreenFullIcon size={24} />}
  </IconControl>
)
