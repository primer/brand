import React, {type HTMLAttributes} from 'react'
import {ScreenFullIcon, ScreenNormalIcon} from '@primer/octicons-react'

import {IconControl} from '../'
import {useVideo} from '../../hooks'

export const FullScreenButton = (props: HTMLAttributes<HTMLButtonElement>) => {
  const {isFullScreen, toggleFullScreen} = useVideo()
  return (
    <IconControl onClick={toggleFullScreen} tooltip={isFullScreen ? 'Exit full screen' : 'Full screen'} {...props}>
      {isFullScreen ? <ScreenNormalIcon size={24} /> : <ScreenFullIcon size={24} />}
    </IconControl>
  )
}
