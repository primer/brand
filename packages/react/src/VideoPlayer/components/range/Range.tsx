import React, {useState, useEffect} from 'react'
import clsx from 'clsx'
import {useId} from '@reach/auto-id'
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
  id,
  ...props
}: RangeProps) => {
  const [value, setValue] = useState(startValue)
  const [mousePos, setMousePos] = useState(0)
  const [hoverValue, setHoverValue] = useState(0)
  const generatedId = useId()
  const inputId = id || generatedId

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
    <div className={clsx(styles.VideoPlayer__range, className)}>
      <progress aria-hidden="true" className={styles.VideoPlayer__rangeProgress} value={value} max={max} />
      <label htmlFor={inputId}>
        <span className={styles.VideoPlayer__srOnly}>Seek</span>
        <input
          tabIndex={0}
          type="range"
          className={clsx(styles.VideoPlayer__rangeInput, styles.VideoPlayer__progressBar2)}
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
          id={inputId}
          {...props}
        />
      </label>
      {tooltip && !!hoverValue && (
        <Tooltip style={{left: mousePos}}>{hoverValue ? tooltipFormatter(hoverValue) : ''}</Tooltip>
      )}
    </div>
  )
}
