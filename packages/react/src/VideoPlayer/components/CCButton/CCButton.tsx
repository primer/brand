import React from 'react'
import clsx from 'clsx'

import {Text} from '../../../Text'
import styles from '../../VideoPlayer.module.css'
import {Tooltip} from '../'

type CCButtonProps = {
  closedCaptionsEnabled: boolean
  setClosedCaptionsEnabled: React.Dispatch<React.SetStateAction<boolean>>
}

export const CCButton = ({closedCaptionsEnabled, setClosedCaptionsEnabled}: CCButtonProps) => (
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
