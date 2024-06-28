import React, {useState} from 'react'
import clsx from 'clsx'
import {Captions} from '../'

import {PlayPauseButton} from './PlayPauseButton'
import {CCButton} from './CCButton'
import {SeekControl} from './SeekControl'
import {MuteButton} from './MuteButton'
import {VolumeControl} from './VolumeControl'
import {FullScreenButton} from './FullScreenButton'

import styles from '../../VideoPlayer.module.css'

export type ControlsProps = {
  videoRef: React.RefObject<HTMLVideoElement>
  duration: number
  currentTime: number
  trackInformation?: TextTrackCueList
  isPlaying: boolean
  play: () => void
  pause: () => void
  seek: (time: number) => void
  volume: number
  setVolume: (volume: number) => void
  isFullScreen: boolean
  setIsFullScreen: (fullScreen: boolean) => void
}

export const Controls = ({
  videoRef,
  duration,
  currentTime,
  isPlaying,
  trackInformation,
  play,
  pause,
  seek,
  volume,
  setVolume,
  isFullScreen,
  setIsFullScreen,
}: ControlsProps) => {
  const [closedCaptionsEnabled, setClosedCaptionsEnabled] = useState(true)

  return (
    <div className={clsx(styles.VideoPlayer__controls)}>
      <Captions videoRef={videoRef} trackInformation={trackInformation} disabled={!closedCaptionsEnabled} />
      <div className={styles.VideoPlayer__controlsWrapper}>
        <PlayPauseButton isPlaying={isPlaying} pause={pause} play={play} />
        <SeekControl currentTime={currentTime} duration={duration} seek={seek} />
        <CCButton closedCaptionsEnabled={closedCaptionsEnabled} setClosedCaptionsEnabled={setClosedCaptionsEnabled} />
        <MuteButton volume={volume} setVolume={setVolume} />
        <VolumeControl volume={volume} setVolume={setVolume} />
        <FullScreenButton isFullScreen={isFullScreen} setIsFullScreen={setIsFullScreen} />
      </div>
    </div>
  )
}
