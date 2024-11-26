import React, {forwardRef} from 'react'
import clsx from 'clsx'
import {BaseProps} from '../component-helpers'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/breadcrumbs/colors-with-modes.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from './Breadcrumbs.module.css'
import {InlineLink} from '../InlineLink'
import {Text} from '../Text'

export const BreadcrumbVariants = ['default', 'accent'] as const

export type BreadcrumbsProps = {
  variant?: (typeof BreadcrumbVariants)[number]
} & BaseProps<HTMLElement> &
  React.HTMLAttributes<HTMLElement>

/**
 * Breadcrumbs parent element
 * <Breadcrumbs>
 */

const _Root = forwardRef<HTMLElement, BreadcrumbsProps>(({className, children, variant = 'default', ...rest}, ref) => {
  return (
    <nav
      ref={ref}
      className={clsx(styles.Breadcrumbs, styles[`Breadcrumbs--${variant}`])}
      aria-label="Breadcrumbs"
      {...rest}
    >
      <ol className={clsx(styles.Breadcrumbs__list)}>{children}</ol>
    </nav>
  )
})

type ItemProps = {
  href: string
  selected?: boolean
} & BaseProps<HTMLAnchorElement> &
  React.HTMLAttributes<HTMLAnchorElement>

const _Item = forwardRef<HTMLAnchorElement, ItemProps>(
  ({'aria-current': ariaCurrent, className, children, href, selected, ...rest}, ref) => {
    return (
      <li className={styles.Breadcrumbs__item}>
        {selected ? (
          <Text
            variant="muted"
            className={clsx(styles.Breadcrumbs__link, styles['Breadcrumbs__link--selected'], className)}
            aria-current={ariaCurrent ? ariaCurrent : 'page'}
            {...rest}
          >
            {children}
          </Text>
        ) : (
          <InlineLink href={href} ref={ref} className={clsx(styles.Breadcrumbs__link, className)} {...rest}>
            {children}
          </InlineLink>
        )}
      </li>
    )
  },
)

/**
 * Use Breadcrumbs to display the current location within a navigational hierarchy.
 * @see https://primer.style/brand/components/Breadcrumbs
 */
export const Breadcrumbs = Object.assign(_Root, {
  Item: _Item,
})
