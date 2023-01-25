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

export const CardVariants = ['plain', 'elevated', 'filled'] as const
export const CardSizes = ['small', 'medium', 'large'] as const
const CardHeadingSizesMap = {
  small: HeadingSizes[4],
  medium: HeadingSizes[3],
  large: HeadingSizes[2]
}
const CardTextSizesMap = {
  small: TextSizes[5],
  medium: TextSizes[4],
  large: TextSizes[3]
}

export type CardProps = {
  /**
   * Valid children include Card.Image, Card.Heading, and Card.Description
   */
  children:
    | React.ReactNode
    | React.ReactElement<CardImageProps>
    | React.ReactElement<CardHeadingProps>
    | React.ReactElement<CardDescriptionProps>
  /**
   * Changes the visual style of the card
   * * @default 'elevated'
   */
  variant?: typeof CardVariants[number]
  /**
   * Changes the padding, font and icon size of the card
   * * @default 'medium'
   */
  size?: typeof CardSizes[number]
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

const CardRoot = forwardRef<HTMLLinkElement, CardProps>(
  ({children, className, size = 'medium', variant = 'elevated', link, linkHref}) => {
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
            if (child.type === CardDescription || child.type === CardHeading) {
              return React.cloneElement(child, {
                size: child.type === CardDescription ? CardTextSizesMap[size] : CardHeadingSizesMap[size]
              })
            }
          }

          return child
        })}
        <div className={styles.Card__action}>
          {/* Temporary Link component until we change it for an animated parapgraph */}
          <Link>{link ? link : 'Learn more'}</Link>
        </div>
      </a>
    )
  }
)

type CardImageProps = {
  src: string
  alt: string
  height: number
  width: number
  fill?: boolean
  fullBleed?: boolean
} & React.HTMLAttributes<HTMLImageElement> &
  BaseProps<HTMLImageElement>

const CardImage = forwardRef<HTMLImageElement, CardImageProps>(
  ({alt, src, height, width, fullBleed, fill, className, ...rest}) => {
    return (
      <div
        className={clsx(
          styles.Card__image,
          fullBleed && styles['Card__image--fullBleed'],
          fill && styles['Card__image--fill'],
          className
        )}
      >
        <img alt={alt} src={src} width={width} height={height} {...rest} />
      </div>
    )
  }
)

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
  size?: '4' | '5' | '6'
  customSize?: '1' | '2' | '3' | '4' | '5' | '6'
  as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const CardHeading = forwardRef<HTMLHeadingElement, CardHeadingProps>(
  ({children, customSize, as = 'h3', className, size, ...rest}, ref) => {
    return (
      <Heading
        size={customSize ? customSize : size}
        className={clsx(styles.Card__heading, className)}
        ref={ref}
        as={as}
        {...rest}
      >
        {children}
      </Heading>
    )
  }
)

type CardDescriptionProps = BaseProps<HTMLParagraphElement> & {
  children: string
  size?: '400' | '500' | '600' | '700'
  customSize?: '100' | '200' | '300' | '400' | '500' | '600' | '700'
}

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({children, className, customSize, size, ...rest}, ref) => {
    return (
      <Text
        ref={ref}
        size={customSize ? customSize : size}
        as="p"
        className={clsx(styles.Card__description, className)}
        {...rest}
      >
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
