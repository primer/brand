import React, {forwardRef, type Ref} from 'react'
import {clsx} from 'clsx'
import {Text, type TextProps} from '../Text'

import type {BaseProps} from '../component-helpers'

/** * Main Stylesheet (as a CSS Module) */
import styles from './EyebrowText.module.css'

export const EyebrowTextVariants = ['default', 'muted', 'accent'] as const

export type EyebrowTextVariant = (typeof EyebrowTextVariants)[number]

export type EyebrowTextProps = Omit<TextProps, 'as' | 'animate' | 'variant'> &
  Omit<BaseProps<HTMLSpanElement>, 'animate'> & {
    variant?: EyebrowTextVariant
    ['data-testid']?: string
  }

const testIds = {
  root: 'EyebrowText',
}

const _EyebrowText = forwardRef<HTMLSpanElement, EyebrowTextProps>(
  (
    {
      className,
      children,
      style,
      'data-testid': testId,
      font = 'monospace',
      size = '100',
      variant = 'muted',
      weight = 'normal',
      ...props
    },
    ref: Ref<HTMLSpanElement>,
  ) => {
    const textVariant = variant === 'accent' ? 'default' : variant

    return (
      <Text
        ref={ref}
        as="span"
        size={size}
        variant={textVariant}
        font={font}
        weight={weight}
        className={clsx(styles.EyebrowText, variant === 'accent' && styles['EyebrowText--variant-accent'], className)}
        style={style}
        data-testid={testId || testIds.root}
        {...props}
      >
        {children}
      </Text>
    )
  },
)

/**
 * EyebrowText is a simple text component that should be used above Headings.
 */
export const EyebrowText = Object.assign(_EyebrowText, {testIds})
