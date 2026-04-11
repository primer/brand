import React, {forwardRef, type Ref} from 'react'
import {clsx} from 'clsx'
import {Text, type TextProps} from '../Text'

import type {BaseProps} from '../component-helpers'

/** * Main Stylesheet (as a CSS Module) */
import styles from './EyebrowText.module.css'

export type EyebrowTextProps = Omit<TextProps, 'as' | 'animate'> &
  Omit<BaseProps<HTMLSpanElement>, 'animate'> & {
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
    return (
      <Text
        ref={ref}
        as="span"
        size={size}
        variant={variant}
        font={font}
        weight={weight}
        className={clsx(styles.EyebrowText, className)}
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
