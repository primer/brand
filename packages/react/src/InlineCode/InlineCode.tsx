import React, {forwardRef} from 'react'
import {clsx} from 'clsx'
import type {BaseProps} from '../component-helpers'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/inline-code/colors-with-modes.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from './InlineCode.module.css'

export type InlineCodeProps = React.ComponentPropsWithoutRef<'code'> & BaseProps<HTMLElement>
/**
 * Use InlineCode to render a short inline code fragment.
 */
export const InlineCode = forwardRef<HTMLElement, InlineCodeProps>(({className, children, ...rest}, ref) => (
  <code ref={ref} className={clsx(styles.InlineCode, className)} {...rest}>
    <span className={styles.InlineCode__text}>{children}</span>
  </code>
))
