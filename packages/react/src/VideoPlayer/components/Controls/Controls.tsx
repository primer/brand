import React, {type HTMLAttributes} from 'react'

import {PlayPauseButton, CCButton, ControlsBar, SeekControl, MuteButton, VolumeControl, FullScreenButton} from '../'

export type ControlsProps = {
  videoRef: React.RefObject<HTMLVideoElement>
  isFullScreen: boolean
  setIsFullScreen: (isFullScreen: boolean) => void
  closedCaptionsEnabled: boolean
  setClosedCaptionsEnabled: (closedCaptionsEnabled: boolean) => void
  isSmall?: boolean
} & HTMLAttributes<HTMLDivElement>

export const Controls = ({
  videoRef,
  isFullScreen,
  setIsFullScreen,
  closedCaptionsEnabled,
  setClosedCaptionsEnabled,
  isSmall = false,
  ...rest
}: ControlsProps) => (
  <ControlsBar {...rest}>
    <PlayPauseButton videoRef={videoRef} />
    <SeekControl videoRef={videoRef} />
    <CCButton closedCaptionsEnabled={closedCaptionsEnabled} setClosedCaptionsEnabled={setClosedCaptionsEnabled} />
    <MuteButton videoRef={videoRef} />
    {isSmall ? null : <VolumeControl videoRef={videoRef} />}
    <FullScreenButton isFullScreen={isFullScreen} setIsFullScreen={setIsFullScreen} />
  </ControlsBar>
)
