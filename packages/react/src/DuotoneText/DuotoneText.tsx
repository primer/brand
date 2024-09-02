import React, {forwardRef, PropsWithChildren} from 'react'
import clsx from 'clsx'
import type {BaseProps} from '../component-helpers'

import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/duotone-text/colors.css'
import styles from './DuotoneText.module.css'

type DuotoneTextProps = {
  ['data-testid']?: string
} & PropsWithChildren<BaseProps<HTMLSpanElement>>

const testIds = {
  root: 'DuotoneText',
  emphasis: 'DuotoneText__emphasis',
}

const Root = forwardRef<HTMLSpanElement, PropsWithChildren<DuotoneTextProps>>(
  ({className, children, 'data-testid': testId, ...props}, ref) => {
    return (
      <span ref={ref} className={clsx(styles.DuotoneText, className)} data-testid={testId || testIds.root} {...props}>
        {children}
      </span>
    )
  },
)

type DuotoneTextEmphasisProps = {
  ['data-testid']?: string
} & PropsWithChildren<BaseProps<HTMLSpanElement>>

const Emphasis = forwardRef<HTMLSpanElement, PropsWithChildren<DuotoneTextEmphasisProps>>(
  ({className, children, 'data-testid': testId, ...props}, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(styles.DuotoneText__emphasis, className)}
        data-testid={testId || testIds.emphasis}
        {...props}
      >
        {children}
      </span>
    )
  },
)

export const DuotoneText = Object.assign(Root, {Emphasis})
