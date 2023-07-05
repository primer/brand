import React from 'react'
import {Text} from '../'
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
    fontVariationSettings: `${fontVariationSettings}`,
  }
  const grid = `
  body {
    background-image: url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='smallGrid' width='10' height='10' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 10 0 L 0 0 0 10' fill='none' stroke='gray' stroke-width='0.5'/%3E%3C/pattern%3E%3Cpattern id='grid' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Crect width='100' height='100' fill='url(%23smallGrid)'/%3E%3Cpath d='M 100 0 L 0 0 0 100' fill='none' stroke='gray' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)' /%3E%3C/svg%3E");
    background-position: -2px -2px;
  }
`
  return (
    <>
      <style>{grid}</style>
      <Text className={styles.MonaSans} style={style} as="p">
        {children}
      </Text>
    </>
  )
}
