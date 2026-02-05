import React, {PropsWithChildren} from 'react'
import {clsx} from 'clsx'
import {useCursorAnimation} from '../hooks/useCursorAnimation'
import {Text, TextProps} from '../Text/Text'

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
  waitForPageLoad?: boolean
} & React.HTMLAttributes<HTMLSpanElement> &
  Omit<TextProps, 'animate' | 'as'>

export function TextCursorAnimation({
  children,
  className,
  animate,
  'data-testid': testId,
  delay = 500,
  waitForPageLoad = true,
  variant = 'muted',
}: PropsWithChildren<TextCursorAnimationProps>) {
  const text = typeof children === 'string' ? children : ''
  const {showCursor, progress} = useCursorAnimation({
    text,
    animate,
    delay,
    waitForPageLoad,
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

  const style = hasAnimation ? revealStyle : staticStyle
  const content = text || children

  return (
    <span className={clsx(styles.TextCursorAnimation, className)} data-testid={testId || testIds.root}>
      <span className={styles['TextCursorAnimation-inner']} style={style}>
        <Text size="100" variant={variant} font="monospace" className={styles['TextCursorAnimation-text']}>
          {content}
        </Text>
        {(showCursor || !hasAnimation) && (
          <span className={styles['TextCursorAnimation-cursor']} aria-hidden="true" data-testid={testIds.cursor} />
        )}
      </span>
    </span>
  )
}
