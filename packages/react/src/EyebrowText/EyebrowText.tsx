import React, {forwardRef, type Ref} from 'react'
import {clsx} from 'clsx'
import {Text} from '../Text'

import type {BaseProps} from '../component-helpers'

/** * Main Stylesheet (as a CSS Module) */
import styles from './EyebrowText.module.css'

export type EyebrowTextProps = BaseProps<HTMLSpanElement> & {
  ['data-testid']?: string
} & React.ComponentPropsWithoutRef<'span'>

const testIds = {
  root: 'EyebrowText',
}

const _EyebrowText = forwardRef<HTMLSpanElement, EyebrowTextProps>(
  ({className, children, style, 'data-testid': testId, ...props}, ref: Ref<HTMLSpanElement>) => {
    return (
      <Text
        ref={ref}
        as="span"
        size="100"
        variant="muted"
        font="monospace"
        weight="normal"
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
 * EyebrowText is a simple uppercase, muted text label typically used above headings.
 * @see https://primer.style/brand/components/EyebrowText
 */
export const EyebrowText = Object.assign(_EyebrowText, {testIds})
