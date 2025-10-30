import React from 'react'
import {clsx} from 'clsx'
import styles from './ExpandableArrow.module.css'

type ExpandableArrowProps = {
  className?: string
  /** Animate between a chevron arrow and an arrow with a stem by toggling the value of `expanded` */
  expanded?: boolean
  hidden?: boolean
  reverse?: boolean
}

export function ExpandableArrow({className, expanded = false, reverse = false, hidden, ...rest}: ExpandableArrowProps) {
  return (
    <svg
      className={clsx(
        styles.ExpandableArrow,
        expanded && styles['ExpandableArrow--expanded'],
        reverse && styles['ExpandableArrow--reversed'],
        className,
      )}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden={hidden}
      focusable={hidden ? 'false' : undefined}
      {...rest}
    >
      <path
        fill="currentColor"
        d="M7.28033 3.21967C6.98744 2.92678 6.51256 2.92678 6.21967 3.21967C5.92678 3.51256 5.92678 3.98744 6.21967 4.28033L7.28033 3.21967ZM11 8L11.5303 8.53033C11.8232 8.23744 11.8232 7.76256 11.5303 7.46967L11 8ZM6.21967 11.7197C5.92678 12.0126 5.92678 12.4874 6.21967 12.7803C6.51256 13.0732 6.98744 13.0732 7.28033 12.7803L6.21967 11.7197ZM6.21967 4.28033L10.4697 8.53033L11.5303 7.46967L7.28033 3.21967L6.21967 4.28033ZM10.4697 7.46967L6.21967 11.7197L7.28033 12.7803L11.5303 8.53033L10.4697 7.46967Z"
      />
      <path
        className={clsx(styles['ExpandableArrow-stem'], expanded && styles['ExpandableArrow-stem--expanded'])}
        stroke="currentColor"
        d="M1.75 8H11"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
