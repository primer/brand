import React from 'react'

import {Range} from '../'
import {useVideo} from '../../hooks/useVideo'

export const VolumeControl = () => {
  const {volume, setVolume} = useVideo()

  return (
    <Range
      type="range"
      min="0"
      max={1}
      step={0.001}
      onInput={e => setVolume(e.currentTarget.valueAsNumber)}
      value={volume}
      a11yStep={0.1}
      name="Volume"
    />
  )
}
