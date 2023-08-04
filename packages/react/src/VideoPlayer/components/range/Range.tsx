import React, {useState, useEffect} from 'react'
import styles from '../../VideoPlayer.module.css'

export const Range = ({className, onChange, value: startValue, ...props}: React.HTMLProps<HTMLInputElement>) => {
  const [value, setValue] = useState(startValue)
  useEffect(() => {
    setValue(startValue)
  }, [startValue])
  return (
    <div className={styles.VideoPlayer__range}>
      <progress className={styles.VideoPlayer__rangeProgress} value={value} max={props.max} />
      <input
        tabIndex={0}
        type="range"
        className={styles.VideoPlayer__rangeInput}
        value={value}
        onChange={e => {
          setValue(e.currentTarget.valueAsNumber)
          onChange && onChange(e)
        }}
        {...props}
      />
    </div>
  )
}
