import React from 'react'
import clsx from 'clsx'

import {PlayPauseButton, Captions, CCButton, SeekControl, MuteButton, VolumeControl, FullScreenButton} from '../'
import styles from '../../VideoPlayer.module.css'

export type ControlsProps = {
  videoRef: React.RefObject<HTMLVideoElement>
  isFullScreen: boolean
  setIsFullScreen: (isFullScreen: boolean) => void
  closedCaptionsEnabled: boolean
  setClosedCaptionsEnabled: (closedCaptionsEnabled: boolean) => void
  isSmall?: boolean
}

export const Controls = ({
  videoRef,
  isFullScreen,
  setIsFullScreen,
  closedCaptionsEnabled,
  setClosedCaptionsEnabled,
  isSmall = false,
}: ControlsProps) => {
  return (
    <div className={clsx(styles.VideoPlayer__controls)}>
      {closedCaptionsEnabled ? <Captions videoRef={videoRef} /> : null}
      <div className={styles.VideoPlayer__controlsWrapper}>
        <PlayPauseButton videoRef={videoRef} />
        <SeekControl videoRef={videoRef} />
        <CCButton closedCaptionsEnabled={closedCaptionsEnabled} setClosedCaptionsEnabled={setClosedCaptionsEnabled} />
        <MuteButton videoRef={videoRef} />
        {isSmall ? null : <VolumeControl videoRef={videoRef} />}
        <FullScreenButton isFullScreen={isFullScreen} setIsFullScreen={setIsFullScreen} />
      </div>
    </div>
  )
}
