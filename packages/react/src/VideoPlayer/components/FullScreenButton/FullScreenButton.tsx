import React from 'react'
import {ScreenFullIcon, ScreenNormalIcon} from '@primer/octicons-react'

import {type ControlsProps, IconControl} from '../'

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
