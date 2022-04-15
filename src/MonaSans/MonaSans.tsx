import React from 'react'
import styles from './MonaSans.module.css'

type MonaSansProps = {
  children: string | React.ReactElement
  italic?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10'
  size?: number
  weight?: number
  width?: number
}

export function MonaSans({children, italic, size, weight, width}: MonaSansProps) {
  const ital = italic && `"ital" ${italic}`
  const wdth = width && `"wdth" ${width}`
  const fontVariationSettings = [ital, wdth].filter(Boolean).join(',')
  const style = {
    fontSize: `${size}px`,
    fontWeight: `${weight}`,
    fontVariationSettings: `${fontVariationSettings}`
  }
  return (
    <p className={styles.MonaSans} style={style}>
      {children}
    </p>
  )
}
