import React, {PropsWithChildren} from 'react'
import {clsx} from 'clsx'
import {useCursorAnimation} from '../hooks/useCursorAnimation'

import styles from './TextCursorAnimation.module.css'

export const testIds = {
  root: 'TextCursorAnimation',
  get cursor() {
    return `${this.root}-cursor`
  },
}

export type TextCursorAnimationProps = {
  /**
   * Whether to animate the text reveal with a sliding wipe animation
   * and a cursor that transitions from grey to green.
   */
  animate?: boolean
  ['data-testid']?: string
  delay?: number
} & React.HTMLAttributes<HTMLSpanElement>

export function TextCursorAnimation({
  children,
  className,
  animate,
  'data-testid': testId,
  delay = 500,
}: PropsWithChildren<TextCursorAnimationProps>) {
  const text = typeof children === 'string' ? children : ''
  const {showCursor, progress} = useCursorAnimation({
    text,
    animate,
    delay,
  })

  const revealStyle = {
    '--brand-TextCursorAnimation-reveal-progress': progress,
    '--brand-TextCursorAnimation-cursor-progress': progress,
  } as React.CSSProperties

  const staticStyle = {
    '--brand-TextCursorAnimation-reveal-progress': 1,
    '--brand-TextCursorAnimation-cursor-progress': 1,
  } as React.CSSProperties

  const hasAnimation = animate === true && text

  return (
    <span className={clsx(styles.TextCursorAnimation, className)} data-testid={testId || testIds.root}>
      {hasAnimation ? (
        <span className={styles['TextCursorAnimation-inner']} style={revealStyle}>
          <span className={styles['TextCursorAnimation-text']}>{text}</span>
          {showCursor && (
            <span className={styles['TextCursorAnimation-cursor']} aria-hidden="true" data-testid={testIds.cursor} />
          )}
        </span>
      ) : (
        <span className={styles['TextCursorAnimation-inner']} style={staticStyle}>
          <span className={styles['TextCursorAnimation-text']}>{text || children}</span>
          <span className={styles['TextCursorAnimation-cursor']} aria-hidden="true" data-testid={testIds.cursor} />
        </span>
      )}
    </span>
  )
}
