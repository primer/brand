import React, {useState, useEffect, DOMAttributes, useRef} from 'react'
import clsx from 'clsx'
import {useId} from '@reach/auto-id'

import {VideoTooltip} from '../'
import styles from '../../VideoPlayer.module.css'

export type RangeProps = {
  tooltip?: boolean
  tooltipFormatter?: (value: number) => string
  max?: number
  a11yStep?: number
} & React.HTMLProps<HTMLInputElement>

export const Range = ({
  className,
  onChange = x => x,
  value: startValue,
  max,
  onKeyDown = x => x,
  a11yStep = 1,
  tooltip,
  tooltipFormatter = value => value.toString(),
  name,
  id,
  ...props
}: RangeProps) => {
  const [value, setValue] = useState(startValue)
  const [mousePos, setMousePos] = useState(0)
  const [hoverValue, setHoverValue] = useState(0)
  const generatedId = useId()
  const inputId = id || generatedId
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    setValue(startValue)
  }, [startValue])

  useEffect(() => {
    if (!max || !tooltip || !inputRef.current) {
      return
    }

    const handleMouseMove = event => {
      if (event.target !== inputRef.current) {
        setHoverValue(0)
        setMousePos(0)
        return
      }

      setMousePos(event.offsetX)

      setHoverValue((event.offsetX / event.target.clientWidth) * max)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [max, tooltip, inputRef])

  const handleKeyDown: DOMAttributes<HTMLInputElement>['onKeyDown'] = event => {
    if (typeof value !== 'number') return

    if (event.key === 'ArrowUp') {
      event.stopPropagation()
      setValue(value + a11yStep)
    } else if (event.key === 'ArrowDown') {
      event.stopPropagation()
      setValue(value - a11yStep)
    }
  }

  return (
    <div className={clsx(styles.VideoPlayer__range, className)}>
      <progress aria-hidden="true" className={styles.VideoPlayer__rangeProgress} value={value} max={max} />
      <label htmlFor={inputId}>
        <span className="visually-hidden">{name}</span>
        <input
          tabIndex={0}
          type="range"
          className={clsx(styles.VideoPlayer__rangeInput, styles.VideoPlayer__progressBar)}
          value={value}
          onChange={e => {
            setValue(e.currentTarget.valueAsNumber)
            onChange(e)
          }}
          max={max}
          onKeyDown={e => {
            handleKeyDown(e)
            onKeyDown(e)
          }}
          id={inputId}
          name={name}
          ref={inputRef}
          {...props}
        />
      </label>
      {tooltip && hoverValue ? (
        <VideoTooltip style={{left: mousePos}}>{tooltipFormatter(hoverValue)}</VideoTooltip>
      ) : null}
    </div>
  )
}
