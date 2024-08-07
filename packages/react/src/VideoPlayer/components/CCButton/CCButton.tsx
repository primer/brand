import React, {type HTMLAttributes} from 'react'
import clsx from 'clsx'

import {Text} from '../../../Text'
import styles from '../../VideoPlayer.module.css'
import {VideoTooltip} from '../'
import {useVideo} from '../../hooks/useVideo'

export const CCButton = ({className, ...props}: HTMLAttributes<HTMLButtonElement>) => {
  const {ccEnabled, toggleCC} = useVideo()

  return (
    <button
      className={clsx(
        className,
        styles.VideoPlayer__iconControl,
        styles.VideoPlayer__closedCaption,
        !ccEnabled && styles.VideoPlayer__ccOff,
      )}
      onClick={toggleCC}
      aria-label={ccEnabled ? 'Disable captions' : 'Enable captions'}
      {...props}
    >
      <Text className={styles.VideoPlayer__ccText}>CC</Text>
      <VideoTooltip>{ccEnabled ? 'Disable captions' : 'Enable captions'}</VideoTooltip>
    </button>
  )
}
