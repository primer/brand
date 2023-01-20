import React, {forwardRef} from 'react'
import {isFragment} from 'react-is'
import clsx from 'clsx'

import {Heading, Text, TextSizes, HeadingSizes, Link} from '..'
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

export const CardVariants = ['default', 'inset', 'elevated'] as const
export const CardSizes = ['small', 'medium', 'large'] as const

export type CardProps = {
  /**
   * Valid children include Testimonial.Name, Testimonial.Avatar, and Testimonial.Name
   */
  children:
    | React.ReactNode
    | React.ReactElement<CardImageProps>
    | React.ReactElement<CardHeadingProps>
    | React.ReactElement<CardDescriptionProps>
  /**
   * Aligns the testimonial content
   */
  variant?: typeof CardVariants[number]
  size?: typeof CardSizes[number]
  link?: string
  linkHref: string
} & BaseProps<HTMLLinkElement>

const CardRoot = forwardRef<HTMLLinkElement, CardProps>(
  ({children, className, size = CardSizes[1], variant = CardVariants[0], link, linkHref}) => {
    const childrenHasFragment = React.Children.toArray(children).some(child => isFragment(child))
    const filteredChildren = React.Children.toArray(children).filter(child => {
      if (React.isValidElement(child) && typeof child.type !== 'string') {
        if (
          childrenHasFragment ||
          child.type === CardImage ||
          child.type === CardHeading ||
          child.type === CardDescription
        ) {
          return true
        }
      }
      return false
    })

    return (
      <a
        href={linkHref}
        className={clsx(styles.Card, styles[`Card__variant--${variant}`], styles[`Card__size--${size}`], className)}
      >
        {React.Children.toArray(filteredChildren).map(child => {
          if (React.isValidElement(child) && typeof child.type !== 'string') {
            if (child.type === CardHeading) {
              return React.cloneElement(child, {})
            }
          }
          return child
        })}
        <div className={styles.Card__action}>
          <Link>{link}</Link>
        </div>
      </a>
    )
  }
)

type CardImageProps = {
  src: string
  alt: string
  height?: number
  fullBleed?: boolean
} & React.HTMLAttributes<HTMLImageElement> &
  BaseProps<HTMLImageElement>

const CardImage = forwardRef<HTMLImageElement, CardImageProps>(({alt, src, height, fullBleed, className, ...rest}) => {
  return (
    <img
      alt={alt}
      src={src}
      height={height}
      className={clsx(styles.Card__image, fullBleed && styles['Card__image--fullBleed'], className)}
      {...rest}
    />
  )
})

// type CardIconProps = BaseProps<HTMLElement> & {
//   icon: string
//   fillColor: string
//   backgroundColor: number
// }

// function CardIcon({className, icon, fillColor, backgroundColor, ...rest}: CardIconProps) {
//   return (
//     <Text size={size} as="p" className={clsx(styles.Card__description, className)} {...rest}>
//       {children}
//     </Text>
//   )
// }

type CardHeadingProps = BaseProps<HTMLHeadingElement> & {
  children: string
  size: typeof HeadingSizes[number]
}

const CardHeading = forwardRef<HTMLHeadingElement, CardHeadingProps>(({children, className, size, ...rest}, ref) => {
  return (
    <Heading size={size} className={clsx(styles.Card__heading, className)} ref={ref} {...rest}>
      {children}
    </Heading>
  )
})

type CardDescriptionProps = BaseProps<HTMLParagraphElement> & {
  children: string
  size: typeof TextSizes[number]
}

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({children, className, size, ...rest}, ref) => {
    return (
      <Text size={size} as="p" className={clsx(styles.Card__description, className)} {...rest}>
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
  Image: CardImage,
  Heading: CardHeading,
  Description: CardDescription
})
