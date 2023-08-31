import React, {useEffect, useMemo, useState} from 'react'
import clsx from 'clsx'
import {UnmuteIcon, MuteIcon, ScreenNormalIcon, ScreenFullIcon} from '@primer/octicons-react'
import {IconControl, Captions, Range, Tooltip} from '../index'
import {Text} from '../../../Text'

import styles from '../../VideoPlayer.module.css'

type ControlsProps = {
  videoRef: React.RefObject<HTMLVideoElement>
  videoWrapperRef: React.RefObject<HTMLDivElement>
  totalTime: number
  currentTime: number
  playing: boolean
  trackInformation?: TextTrackCueList
}

const getMinuteSecondTime = (time: number) => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time - minutes * 60)
  const x = minutes < 10 ? `0${minutes}` : minutes
  const y = seconds < 10 ? `0${seconds}` : seconds

  return `${x}:${y}`
}

export const Controls = ({
  videoRef,
  videoWrapperRef,
  totalTime,
  currentTime,
  playing: playingProp,
  trackInformation,
}: ControlsProps) => {
  const [playing, setPlaying] = useState(playingProp)
  const [playedTime, setPlayedTime] = useState(0)
  const [volume, setVolume] = useState(0.5)
  const [previousVolume, setPreviousVolume] = useState(volume)
  const [closedCaption, setClosedCaption] = useState(true)
  const [fullScreen, setFullScreen] = useState(false)

  useEffect(() => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }, [videoRef, playing])

  useEffect(() => {
    setPlaying(playingProp)
  }, [playingProp])

  const renderPlayPauseButton = useMemo(() => {
    return (
      <IconControl
        onClick={() => {
          setPlaying(!playing)
        }}
        className={styles.VideoPlayer__shiftTooltipRight}
        tooltip={!playing ? 'Play video' : 'Pause video'}
      >
        {!playing ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M1.56489 23.8112C0.884817 24.2389 1.07491e-06 23.7501 1.0398e-06 22.9467L8.28679e-08 1.05473C4.73246e-08 0.241596 0.904067 -0.245404 1.58307 0.201969L18.5829 11.4026C19.2032 11.8113 19.1935 12.7244 18.5647 13.1198L1.56489 23.8112Z"
              fill="currentColor"
            />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect width="7.2" height="24" rx="1" fill="currentColor" />
            <rect x="12.5" width="7.2" height="24" rx="1" fill="currentColor" />
          </svg>
        )}
      </IconControl>
    )
  }, [playing])

  useEffect(() => {
    setPlayedTime(videoRef.current?.currentTime || 0)
  }, [videoRef, videoRef.current?.currentTime])

  const renderSeek = useMemo(() => {
    const handleSeek = (e: React.FormEvent<HTMLInputElement>) => {
      if (videoRef.current) videoRef.current.currentTime = e.currentTarget.valueAsNumber
    }

    return (
      <>
        <Range
          type="range"
          min="0"
          max={totalTime || 0}
          step={0.0001}
          onInput={handleSeek}
          value={currentTime}
          className={styles.VideoPlayer__progressBar}
          tooltip
          tooltipFormatter={value => getMinuteSecondTime(value as number)}
          name="Seek"
        />
        <div className={styles.VideoPlayer__progressTime}>
          <Text as="p" className={styles.VideoPlayer__controlTextColor}>
            {<span>{getMinuteSecondTime(playedTime || 0) || '00:00'}</span>}
            {<span className={styles.VideoPlayer__totalTime}> / {getMinuteSecondTime(totalTime || 0) || '00:00'}</span>}
          </Text>
        </div>
      </>
    )
  }, [videoRef, totalTime, currentTime, playedTime])

  const renderCCButton = useMemo(() => {
    return (
      <button
        className={clsx(
          styles.VideoPlayer__iconControl,
          styles.VideoPlayer__closedCaption,
          !closedCaption && styles.VideoPlayer__ccOff,
        )}
        onClick={() => setClosedCaption(!closedCaption)}
      >
        <Text className={styles.VideoPlayer__ccText}>CC</Text>
        <Tooltip>{!closedCaption ? 'Enable captions' : 'Disable captions'}</Tooltip>
      </button>
    )
  }, [closedCaption])

  const renderMuteButton = useMemo(
    () => (
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
    ),
    [volume, previousVolume],
  )

  /* 5. Volume                                                  */
  useEffect(() => {
    if (videoRef.current) videoRef.current.volume = volume
  }, [videoRef, volume])

  const renderVolume = useMemo(
    () => (
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
    ),
    [volume],
  )

  const renderFullscreenButton = useMemo(() => {
    const handleFullScreen = () => {
      if (videoWrapperRef.current) {
        if (!fullScreen) {
          videoWrapperRef.current.requestFullscreen()
          setFullScreen(true)
        } else {
          document.exitFullscreen()
          setFullScreen(false)
        }
      }
    }

    return (
      <IconControl onClick={handleFullScreen} tooltip={!fullScreen ? 'Full screen' : 'Exit full screen'}>
        {!fullScreen ? <ScreenFullIcon size={24} /> : <ScreenNormalIcon size={24} />}
      </IconControl>
    )
  }, [videoWrapperRef, fullScreen])

  return (
    <div className={clsx(styles.VideoPlayer__controls)}>
      <Captions videoRef={videoRef} trackInformation={trackInformation} disabled={!closedCaption} />
      <div className={styles.VideoPlayer__controlsWrapper}>
        {renderPlayPauseButton}
        {renderSeek}
        {renderCCButton}
        {renderMuteButton}
        {renderVolume}
        {renderFullscreenButton}
      </div>
    </div>
  )
}
