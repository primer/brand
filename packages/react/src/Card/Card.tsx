import React, {forwardRef} from 'react'
import {isFragment} from 'react-is'
import clsx from 'clsx'

import {Heading, Text, Link} from '..'
import type {BaseProps} from '../component-helpers'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/card/base.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/card/colors-with-modes.css'

/**
 * Main stylesheet (as a CSS Module)
 */
import styles from './Card.module.css'

export type CardProps = {
  /**
   * Valid children include Card.Image, Card.Heading, and Card.Description
   */
  children: React.ReactNode | React.ReactElement<CardHeadingProps> | React.ReactElement<CardDescriptionProps>
  /**
   * Changes the link content of the card
   * * @default 'Learn more'
   * */
  link?: string
  /**
   * The href of the link
   * */
  linkHref: string
} & BaseProps<HTMLLinkElement>

const CardRoot = forwardRef<HTMLLinkElement, CardProps>(({children, className, link, linkHref}) => {
  const childrenHasFragment = React.Children.toArray(children).some(child => isFragment(child))
  const filteredChildren = React.Children.toArray(children).filter(child => {
    if (React.isValidElement(child) && typeof child.type !== 'string') {
      if (childrenHasFragment || child.type === CardHeading || child.type === CardDescription) {
        return true
      }
    }
    return false
  })

  return (
    <a href={linkHref} className={clsx(styles.Card, className)}>
      {React.Children.toArray(filteredChildren).map(child => {
        return child
      })}
      <div className={styles.Card__action}>
        {/* Temporary using Link component to not repeat styles */}
        <Link>{link ? link : 'Learn more'}</Link>
      </div>
    </a>
  )
})

type CardHeadingProps = BaseProps<HTMLHeadingElement> & {
  children: string
  as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const CardHeading = forwardRef<HTMLHeadingElement, CardHeadingProps>(
  ({children, as = 'h3', className, ...rest}, ref) => {
    return (
      <Heading size="5" className={clsx(styles.Card__heading, className)} ref={ref} as={as} {...rest}>
        {children}
      </Heading>
    )
  }
)

type CardDescriptionProps = BaseProps<HTMLParagraphElement> & {
  children: string
}

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({children, className, ...rest}, ref) => {
    return (
      <Text variant="muted" ref={ref} size="300" as="p" className={clsx(styles.Card__description, className)} {...rest}>
        {children}
      </Text>
    )
  }
)

/**
 * Card component:
 * {@link https://primer.style/brand/components/Card/ See usage examples}.
 */
export const Card = Object.assign(CardRoot, {
  Heading: CardHeading,
  Description: CardDescription
})
