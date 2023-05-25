import React, {PropsWithChildren, forwardRef, type Ref} from 'react'
import clsx from 'clsx'
import {Text, TextSizes, defaultTextSize} from '../'
import type {BaseProps} from '../component-helpers'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/inline-link/colors-with-modes.css'

/**
 * Main stylesheet (as a CSS Module)
 */
import styles from './InlineLink.module.css'

export type InlineLinkProps = BaseProps<HTMLAnchorElement> & {
  /**
   * Specify the links destination
   */
  href: string
  /**
   * Specify the text size
   */
  size?: typeof TextSizes[number]
} & React.AnchorHTMLAttributes<HTMLAnchorElement> &
  React.HTMLAttributes<HTMLAnchorElement>

/**
 * A HTML anchor link component that renders inline with adjacent text.
 */
export const InlineLink = forwardRef(
  (
    {className, size = defaultTextSize, children, href, ...rest}: PropsWithChildren<InlineLinkProps>,
    ref: Ref<HTMLAnchorElement>
  ) => {
    const classes = clsx(styles.InlineLink, className)

    return (
      <a href={href} className={classes} {...rest} ref={ref}>
        <Text size={size} as="span">
          {children}
        </Text>
      </a>
    )
  }
)
