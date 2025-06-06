import React from 'react'

import {Range, type RangeProps} from '../'
import styles from './VolumeControl.module.css'
import {useVideo} from '../../hooks/useVideo'

export const VolumeControl = ({name = 'Volume', ...rest}: RangeProps) => {
  const {volume, setVolume} = useVideo()

  return (
    <Range
      className={styles.VolumeControl}
      type="range"
      min="0"
      max={1}
      step={0.001}
      onInput={e => setVolume(e.currentTarget.valueAsNumber)}
      value={volume}
      a11yStep={0.1}
      name={name}
      {...rest}
    />
  )
}
