import {forwardRef, PropsWithChildren} from 'react'
import {clsx} from 'clsx'
import {Text, TextProps} from '../../Text'
import type {BaseProps} from '../../component-helpers'
import {useBlinkingCursorAnimation} from '../../hooks/useBlinkingCursorAnimation'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/blinking-cursor/colors-with-modes.css'

import styles from '../Hero.module.css'

export type HeroLabelProps = Omit<TextProps, 'as' | 'ref' | 'animate'> &
  Omit<BaseProps<HTMLSpanElement>, 'animate'> & {
    animation?: 'blinking-cursor'
  }

export const HeroLabel = forwardRef<HTMLSpanElement, HeroLabelProps>(
  ({children, className, animation, ...rest}: PropsWithChildren<HeroLabelProps>, ref) => {
    const text = typeof children === 'string' ? children : ''
    const {displayedText, showCursor, shouldBlink} = useBlinkingCursorAnimation({
      text,
      animation,
    })

    return (
      <Text
        font="monospace"
        weight="medium"
        as="span"
        size="100"
        variant="muted"
        ref={ref}
        className={clsx(styles['Hero-label'], className)}
        {...rest}
      >
        {text && animation !== undefined ? (
          <span className={styles['Hero-label-inner']}>
            <span className={styles['Hero-label-placeholder']} aria-hidden="true">
              {text}
            </span>
            <span className={styles['Hero-label-text']}>
              {displayedText}
              {showCursor && (
                <span
                  className={clsx(styles['Hero-label-cursor'], shouldBlink && styles['Hero-label-cursor--blink'])}
                  aria-hidden="true"
                />
              )}
            </span>
          </span>
        ) : (
          <>
            {text ? displayedText : children}
            {showCursor && (
              <span
                className={clsx(styles['Hero-label-cursor'], shouldBlink && styles['Hero-label-cursor--blink'])}
                aria-hidden="true"
              />
            )}
          </>
        )}
      </Text>
    )
  },
)
