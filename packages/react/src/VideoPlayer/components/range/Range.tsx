import React, {useState, useEffect} from 'react'
import {Tooltip} from '../index'

import styles from '../../VideoPlayer.module.css'

type RangeProps = {
  tooltip?: boolean
  tooltipFormatter?: (value: number | string | readonly string[]) => string
  max?: number
  a11yStep?: number
} & React.HTMLProps<HTMLInputElement>

export const Range = ({
  className,
  onChange,
  value: startValue,
  max,
  onKeyDown,
  a11yStep = 1,
  tooltip,
  tooltipFormatter = value => value.toString(),
  ...props
}: RangeProps) => {
  const [value, setValue] = useState(startValue)
  const [mousePos, setMousePos] = useState(0)
  const [hoverValue, setHoverValue] = useState(0)
  useEffect(() => {
    setValue(startValue)
  }, [startValue])

  useEffect(() => {
    const handleMouseMove = event => {
      setMousePos(event.offsetX)
      if (max) setHoverValue((event.offsetX / event.target.clientWidth) * max)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [max])

  const handleKeyDown = event => {
    if (value) {
      if (event.keyCode === 38) {
        setValue((value as number) + a11yStep)
      } else if (event.keyCode === 40) {
        setValue((value as number) - a11yStep)
      }
    }
  }

  return (
    <div className={styles.VideoPlayer__range}>
      <progress className={styles.VideoPlayer__rangeProgress} value={value} max={max} />
      <input
        tabIndex={0}
        type="range"
        className={styles.VideoPlayer__rangeInput}
        value={value}
        onChange={e => {
          setValue(e.currentTarget.valueAsNumber)
          onChange && onChange(e)
        }}
        max={max}
        onKeyDown={e => {
          handleKeyDown(e)
          onKeyDown && onKeyDown(e)
        }}
        {...props}
      />
      {tooltip && !!hoverValue && (
        <Tooltip style={{left: mousePos}}>{hoverValue ? tooltipFormatter(hoverValue) : ''}</Tooltip>
      )}
    </div>
  )
}
