import React, {useState} from 'react'
import clsx from 'clsx'
import {UnmuteIcon, MuteIcon, ScreenNormalIcon, ScreenFullIcon} from '@primer/octicons-react'
import {IconControl, Captions, Range, Tooltip} from '../index'
import {Text} from '../../../Text'

import styles from '../../VideoPlayer.module.css'

const getMinuteSecondTime = (time: number) => {
  // TODO I think this can be done with browser APIs
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time - minutes * 60)
  const x = minutes < 10 ? `0${minutes}` : minutes
  const y = seconds < 10 ? `0${seconds}` : seconds

  return `${x}:${y}`
}

type PlayPauseButtonProps = Pick<ControlsProps, 'isPlaying' | 'play' | 'pause'>

const PlayPauseButton = ({isPlaying, play, pause}: PlayPauseButtonProps) => (
  <IconControl
    onClick={() => {
      isPlaying ? pause() : play()
    }}
    className={styles.VideoPlayer__shiftTooltipRight}
    tooltip={isPlaying ? 'Pause video' : 'Play video'}
  >
    {isPlaying ? (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect width="7.2" height="24" rx="1" fill="currentColor" />
        <rect x="12.5" width="7.2" height="24" rx="1" fill="currentColor" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M1.56489 23.8112C0.884817 24.2389 1.07491e-06 23.7501 1.0398e-06 22.9467L8.28679e-08 1.05473C4.73246e-08 0.241596 0.904067 -0.245404 1.58307 0.201969L18.5829 11.4026C19.2032 11.8113 19.1935 12.7244 18.5647 13.1198L1.56489 23.8112Z"
          fill="currentColor"
        />
      </svg>
    )}
  </IconControl>
)

type SeekControlProps = Pick<ControlsProps, 'currentTime' | 'duration' | 'seek'>

const SeekControl = ({currentTime, duration, seek}: SeekControlProps) => (
  <>
    <Range
      type="range"
      min="0"
      max={duration || 0}
      step={0.0001}
      onInput={e => {
        seek(e.currentTarget.valueAsNumber)
      }}
      value={currentTime}
      className={styles.VideoPlayer__progressBar}
      tooltip
      tooltipFormatter={value => getMinuteSecondTime(value as number)}
      name="Seek"
    />
    <div className={styles.VideoPlayer__progressTime}>
      <Text as="p" className={styles.VideoPlayer__controlTextColor}>
        {<span>{getMinuteSecondTime(currentTime || 0) || '00:00'}</span>}
        {<span className={styles.VideoPlayer__totalTime}> / {getMinuteSecondTime(duration || 0) || '00:00'}</span>}
      </Text>
    </div>
  </>
)

type CCButtonProps = {
  closedCaptionsEnabled: boolean
  setClosedCaptionsEnabled: React.Dispatch<React.SetStateAction<boolean>>
}

const CCButton = ({closedCaptionsEnabled, setClosedCaptionsEnabled}: CCButtonProps) => (
  <button
    className={clsx(
      styles.VideoPlayer__iconControl,
      styles.VideoPlayer__closedCaption,
      !closedCaptionsEnabled && styles.VideoPlayer__ccOff,
    )}
    onClick={() => setClosedCaptionsEnabled(prev => !prev)}
  >
    <Text className={styles.VideoPlayer__ccText}>CC</Text>
    <Tooltip>{closedCaptionsEnabled ? 'Disable captions' : 'Enable captions'}</Tooltip>
  </button>
)

type MuteButtonProps = Pick<ControlsProps, 'volume' | 'setVolume'>

const MuteButton = ({volume, setVolume}: MuteButtonProps) => {
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

type VolumeControlProps = Pick<ControlsProps, 'volume' | 'setVolume'>

const VolumeControl = ({volume, setVolume}: VolumeControlProps) => (
  <Range
    type="range"
    min="0"
    max={1}
    step={0.001}
    onInput={e => {
      setVolume(e.currentTarget.valueAsNumber)
    }}
    className={styles.VideoPlayer__volumeBar}
    value={volume}
    a11yStep={0.1}
    name="Volume"
  />
)

type FullScreenButtonProps = Pick<ControlsProps, 'isFullScreen' | 'setIsFullScreen'>

const FullScreenButton = ({isFullScreen, setIsFullScreen}: FullScreenButtonProps) => (
  <IconControl
    onClick={() => {
      setIsFullScreen(!isFullScreen)
    }}
    tooltip={isFullScreen ? 'Exit full screen' : 'Full screen'}
  >
    {isFullScreen ? <ScreenNormalIcon size={24} /> : <ScreenFullIcon size={24} />}
  </IconControl>
)

type ControlsProps = {
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
