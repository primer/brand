import React, {forwardRef, useCallback} from 'react'
import {isFragment} from 'react-is'
import clsx from 'clsx'

import {Heading, HeadingTags, Text} from '..'
import {ExpandableArrow} from '../ExpandableArrow'
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
import stylesLink from '../Link/Link.module.css'

export type CardProps = {
  /**
   * Valid children include Card.Image, Card.Heading, and Card.Description
   */
  children:
    | React.ReactNode
    | React.ReactElement<CardLabelProps>
    | React.ReactElement<CardHeadingProps>
    | React.ReactElement<CardDescriptionProps>
    | React.ReactElement<CardLinkProps>
  /**
   * The href of the link
   * */
  href: string
} & BaseProps<HTMLAnchorElement> &
  React.ComponentPropsWithoutRef<'a'>

const CardRoot = forwardRef<HTMLAnchorElement, CardProps>(
  ({onMouseEnter, onMouseLeave, onFocus, onBlur, children, className, href, ref, ...props}) => {
    const [isHovered, setIsHovered] = React.useState(false)
    const [isFocused, setIsFocused] = React.useState(false)

    const handleMouseEnter = useCallback(
      (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        setIsHovered(!isHovered)
        onMouseEnter?.(event)
      },
      [onMouseEnter, isHovered]
    )

    const handleMouseLeave = useCallback(
      (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        setIsHovered(!isHovered)
        onMouseLeave?.(event)
      },
      [onMouseLeave, isHovered]
    )

    const handleOnFocus = useCallback(
      (event: React.FocusEvent<HTMLAnchorElement, Element>) => {
        setIsFocused(!isFocused)
        onFocus?.(event)
      },
      [onFocus, isFocused]
    )

    const handleOnBlur = useCallback(
      (event: React.FocusEvent<HTMLAnchorElement, Element>) => {
        setIsFocused(!isFocused)
        onBlur?.(event)
      },
      [onBlur, isFocused]
    )

    const filteredChildren = React.Children.toArray(children).filter(child => {
      if (React.isValidElement(child) && typeof child.type !== 'string') {
        if (
          isFragment(child) ||
          child.type === CardLabel ||
          child.type === CardHeading ||
          child.type === CardDescription ||
          child.type === CardLink
        ) {
          return true
        }
      }
      return false
    })

    const hasCardLink = React.Children.toArray(children).some(
      child => React.isValidElement(child) && typeof child.type !== 'string' && child.type === CardLink
    )

    return (
      <a
        href={href}
        className={clsx(styles.Card, className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        ref={ref}
        {...props}
      >
        {React.Children.toArray(filteredChildren).map(child => {
          if (React.isValidElement(child) && typeof child.type !== 'string') {
            if (child.type === CardLink) {
              return React.cloneElement(child, {
                isExpanded: isHovered || isFocused
              })
            }
          }
          return child
        })}

        {!hasCardLink && <CardLink isExpanded={isHovered || isFocused}>{'Learn more'}</CardLink>}
      </a>
    )
  }
)

type CardLabelProps = BaseProps<HTMLSpanElement> & {
  children: React.ReactNode | React.ReactNode[]
}

const CardLabel = forwardRef<HTMLSpanElement, CardLabelProps>(({children, className, ...rest}, ref) => {
  return (
    <span className={clsx(styles.Card__label, className)} ref={ref} {...rest}>
      <span className={styles['Card__label-wrapper']}>
        <Text as="span" size="200" className={styles['Card__label--text']}>
          {children}
        </Text>
      </span>
    </span>
  )
})

type CardHeadingProps = BaseProps<HTMLHeadingElement> & {
  children: React.ReactNode | React.ReactNode[]
  as?: Exclude<HeadingTags['as'], 'h1'>
}

const CardHeading = forwardRef<HTMLHeadingElement, CardHeadingProps>(
  ({children, as = HeadingTags[2], className, ...rest}, ref) => {
    return (
      <Heading size="6" className={clsx(styles.Card__heading, className)} ref={ref} as={as} {...rest}>
        {children}
      </Heading>
    )
  }
)

type CardDescriptionProps = BaseProps<HTMLParagraphElement> & {
  children: React.ReactNode | React.ReactNode[]
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

type CardLinkProps = BaseProps<HTMLDivElement> & {
  children: React.ReactNode | React.ReactNode[]
  isExpanded?: boolean
}

const CardLink = forwardRef<HTMLDivElement, CardLinkProps>(({children, isExpanded, className, ...rest}, ref) => {
  return (
    <div ref={ref} className={styles.Card__action} {...rest}>
      <Text as="span" size="300" className={clsx(stylesLink['Link--label'])}>
        {children}
      </Text>
      <ExpandableArrow className={stylesLink['Link-arrow']} expanded={isExpanded} />
    </div>
  )
})

/**
 * Card component:
 * {@link https://primer.style/brand/components/Card/ See usage examples}.
 */
export const Card = Object.assign(CardRoot, {
  Label: CardLabel,
  Heading: CardHeading,
  Description: CardDescription,
  Link: CardLink
})
