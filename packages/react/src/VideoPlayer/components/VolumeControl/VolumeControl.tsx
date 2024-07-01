import React from 'react'

import {type ControlsProps, Range, RangeProps} from '../'
import styles from '../../VideoPlayer.module.css'

type VolumeControlProps = RangeProps & Pick<ControlsProps, 'volume' | 'setVolume'>

export const VolumeControl = ({volume, setVolume, ...props}: VolumeControlProps) => (
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
    {...props}
  />
)
