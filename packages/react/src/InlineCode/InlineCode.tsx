import React, {forwardRef} from 'react'
import {clsx} from 'clsx'
import type {BaseProps} from '../component-helpers'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/inline-code/colors-with-modes.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from './InlineCode.module.css'

export type InlineCodeProps = React.ComponentPropsWithoutRef<'code'> &
  BaseProps<HTMLElement> & {
    /**
     * Controls whether the code fragment can wrap.
     * Disable only for short fragments that must remain together.
     * @default true
     */
    wrap?: boolean
  }

function InlineCodeRoot(
  {className, children, wrap = true, ...rest}: InlineCodeProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  return (
    <code ref={ref} className={clsx(styles.InlineCode, !wrap && styles['InlineCode--nowrap'], className)} {...rest}>
      <span className={styles.InlineCode__text}>{children}</span>
    </code>
  )
}

/**
 * Use InlineCode to render a short inline code fragment.
 */
export const InlineCode = forwardRef<HTMLElement, InlineCodeProps>(InlineCodeRoot)
