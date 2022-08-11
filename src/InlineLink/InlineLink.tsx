import React, {PropsWithChildren} from 'react'
import clsx from 'clsx'
import {Text, TextSizes, defaultTextSize} from '../'

/**
 * Design tokens
 */
import '../../lib/design-tokens/css/tokens/functional/components/inline-link/colors-with-modes.css'

/**
 * Main stylesheet (as a CSS Module)
 */
import styles from './InlineLink.module.css'

export type InlineLinkProps = {
  /**
   * Forward a custom HTML class attribute
   */
  className?: string
  /**
   * Specify the links destination
   */
  href: string
  /**
   * Specify the text size
   */
  size?: typeof TextSizes[number]
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

/**
 * A HTML anchor link component that renders inline with adjacent text.
 */
export function InlineLink({
  className,
  size = defaultTextSize,
  children,
  href,
  ...rest
}: PropsWithChildren<InlineLinkProps>) {
  const classes = clsx(styles.InlineLink, className)

  return (
    <a href={href} className={classes} {...rest}>
      <Text size={size} as="span">
        {children}
      </Text>
    </a>
  )
}
