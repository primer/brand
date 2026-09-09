import React, {PropsWithChildren, useRef} from 'react'
import {clsx} from 'clsx'
import {useCursorAnimation} from '../hooks/useCursorAnimation'
import {EyebrowText} from '../EyebrowText'
import {TextProps} from '../Text/Text'

import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/text-cursor-animation/base.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/text-cursor-animation/colors-with-modes.css'

import styles from './TextCursorAnimation.module.css'

export const testIds = {
  root: 'TextCursorAnimation',
  get text() {
    return `${this.root}-text`
  },
  get cursor() {
    return `${this.root}-cursor`
  },
}

export type TextCursorAnimationProps = {
  /**
   * Whether to animate the text with a typing effect.
   */
  animate?: boolean
  /**
   * Optional text to type before transitioning to the final text
   */
  initialText?: string
  ['data-testid']?: string
  delay?: number
  waitForPageLoad?: boolean
  animationTrigger?: 'immediate' | 'on-visible'
} & React.HTMLAttributes<HTMLSpanElement> &
  Omit<TextProps, 'animate' | 'as'>

export function TextCursorAnimation({
  children,
  className,
  animate,
  initialText,
  'data-testid': testId,
  delay,
  waitForPageLoad = true,
  animationTrigger = 'immediate',
  variant = 'muted',
}: PropsWithChildren<TextCursorAnimationProps>) {
  const rootRef = useRef<HTMLSpanElement>(null)
  const text = typeof children === 'string' ? children : ''
  const {showCursor, visibleText, cursorPhase} = useCursorAnimation({
    text,
    initialText,
    animate,
    delay,
    waitForPageLoad,
    startOnIntersection: animationTrigger === 'on-visible',
    intersectionRef: rootRef,
  })

  const hasAnimation = animate === true && text.length > 0
  const content = text || children
  const cursorPhaseClassName = {
    initial: styles['TextCursorAnimation__cursor--initial'],
    correction: styles['TextCursorAnimation__cursor--correction'],
    final: styles['TextCursorAnimation__cursor--final'],
    complete: styles['TextCursorAnimation__cursor--complete'],
  }[hasAnimation ? cursorPhase : 'complete']

  const cursor = showCursor ? (
    <span
      className={clsx(
        styles.TextCursorAnimation__cursor,
        hasAnimation && styles['TextCursorAnimation__cursor--animated'],
        cursorPhaseClassName,
      )}
      aria-hidden="true"
      data-testid={testIds.cursor}
    />
  ) : null

  return (
    <span ref={rootRef} className={clsx(styles.TextCursorAnimation, className)} data-testid={testId || testIds.root}>
      <span className={styles.TextCursorAnimation__inner}>
        {hasAnimation && (
          <span className={styles.TextCursorAnimation__sizingContainer}>
            <EyebrowText
              size="100"
              variant={variant}
              font="monospace"
              weight="medium"
              className={clsx(styles.TextCursorAnimation__text, styles.TextCursorAnimation__sizingText)}
            >
              {text}
            </EyebrowText>
            {initialText && initialText !== text && (
              <EyebrowText
                size="100"
                variant={variant}
                font="monospace"
                weight="medium"
                className={clsx(styles.TextCursorAnimation__text, styles.TextCursorAnimation__sizingText)}
                aria-hidden="true"
              >
                {initialText}
              </EyebrowText>
            )}
          </span>
        )}
        <span
          className={clsx(
            styles.TextCursorAnimation__content,
            hasAnimation && styles['TextCursorAnimation__content--animated'],
          )}
          aria-hidden={hasAnimation ? 'true' : undefined}
        >
          <EyebrowText
            size="100"
            variant={variant}
            font="monospace"
            weight="medium"
            className={styles.TextCursorAnimation__text}
            data-testid={testIds.text}
          >
            {hasAnimation ? visibleText : content}
          </EyebrowText>
          {cursor}
        </span>
      </span>
    </span>
  )
}
