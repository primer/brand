import React, {RefObject, forwardRef, useCallback} from 'react'
import {isFragment} from 'react-is'
import clsx from 'clsx'
import {Heading, HeadingProps, Text} from '..'
import {ExpandableArrow} from '../ExpandableArrow'
import {Label, LabelColors} from '../Label'
import {Image, ImageProps} from '../Image'
import type {BaseProps} from '../component-helpers'
import {Colors} from '../constants'

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
import {Icon as IconProps} from '@primer/octicons-react'
import {useProvidedRefOrCreate} from '../hooks/useRef'

export const CardIconColors = Colors

export const defaultCardIconColor = CardIconColors[0]
export type CardProps = {
  /**
   * Valid children include Card.Image, Card.Heading, and Card.Description
   */
  children:
    | React.ReactNode
    | React.ReactElement<CardImageProps>
    | React.ReactElement<CardIconProps>
    | React.ReactElement<CardLabelProps>
    | React.ReactElement<CardHeadingProps>
    | React.ReactElement<CardDescriptionProps>

  /**
   * The href of the link
   * */
  href: string
  /**
   * Changes the cta text of the card
   * */
  ctaText?: string
  hasBorder?: boolean
} & Omit<BaseProps<HTMLDivElement>, 'animate'> &
  Omit<React.ComponentPropsWithoutRef<'div'>, 'onMouseEnter' | 'onMouseLeave' | 'onFocus' | 'onBlur'> &
  Pick<React.ComponentPropsWithoutRef<'a'>, 'onMouseEnter' | 'onMouseLeave' | 'onFocus' | 'onBlur'>

const CardRoot = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      children,
      className,
      ctaText = 'Learn more',
      href,
      hasBorder = false,
      style,
      ...props
    },
    ref,
  ) => {
    const cardRef = useProvidedRefOrCreate(ref as RefObject<HTMLDivElement>)
    const isHovered = React.useRef(false)
    const isFocused = React.useRef(false)

    const handleMouseEnter = useCallback(
      (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        isHovered.current = !isHovered.current
        onMouseEnter?.(event)
      },
      [onMouseEnter, isHovered],
    )

    const handleMouseLeave = useCallback(
      (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        isHovered.current = !isHovered.current
        onMouseLeave?.(event)
      },
      [onMouseLeave, isHovered],
    )

    const handleOnFocus = useCallback(
      (event: React.FocusEvent<HTMLAnchorElement, Element>) => {
        isFocused.current = !isFocused.current
        onFocus?.(event)
      },
      [onFocus, isFocused],
    )

    const handleOnBlur = useCallback(
      (event: React.FocusEvent<HTMLAnchorElement, Element>) => {
        isFocused.current = !isFocused.current
        onBlur?.(event)
      },
      [onBlur, isFocused],
    )

    const filteredChildren = React.Children.toArray(children).filter(child => {
      if (React.isValidElement(child) && typeof child.type !== 'string') {
        if (
          isFragment(child) ||
          child.type === CardImage ||
          child.type === CardIcon ||
          child.type === CardLabel ||
          child.type === CardHeading ||
          child.type === CardDescription
        ) {
          return true
        }
      }
      return false
    })

    const hasIcon = React.Children.toArray(children).some(
      child => React.isValidElement(child) && typeof child.type !== 'string' && child.type === CardIcon,
    )

    return (
      <div
        className={clsx(styles.Card, hasIcon && styles['Card--icon'], hasBorder && styles['Card--border'], className)}
        ref={cardRef}
        {...props}
      >
        {React.Children.map(filteredChildren, child => {
          if (React.isValidElement(child) && typeof child.type !== 'string' && child.type === CardHeading) {
            return React.cloneElement<CardHeadingProps>(child as React.ReactElement<CardHeadingProps>, {
              onMouseEnter: handleMouseEnter,
              onMouseLeave: handleMouseLeave,
              onFocus: handleOnFocus,
              onBlur: handleOnBlur,
              href,
            })
          }
          return child
        })}
        <div className={styles.Card__action}>
          <Text as="span" size="200" className={clsx(stylesLink['Link--label'])}>
            {ctaText}
          </Text>
          <ExpandableArrow
            className={stylesLink['Link-arrow']}
            expanded={isHovered.current || isFocused.current}
            aria-hidden="true"
          />
        </div>
      </div>
    )
  },
)

type CardImageProps = ImageProps

function CardImage({className, ...rest}: CardImageProps) {
  return (
    <div className={styles.Card__image}>
      <Image className={className} {...rest} />
    </div>
  )
}

type CardIconProps = BaseProps<HTMLSpanElement> & {
  icon: React.ReactNode | IconProps
  color?: (typeof CardIconColors)[number]
  hasBackground?: boolean
  ['aria-hidden']?: boolean
}

function CardIcon({
  'aria-hidden': ariaHidden,
  icon: Icon,
  className,
  color = defaultCardIconColor,
  hasBackground = false,
  ...rest
}: CardIconProps) {
  return (
    <span
      className={clsx(
        styles.Card__icon,
        styles[`Card__icon--color-${color}`],
        hasBackground && styles['Card__icon--badge'],
        className,
      )}
      aria-hidden={ariaHidden || typeof Icon !== 'function'}
      {...rest}
    >
      {typeof Icon === 'function' ? <Icon /> : Icon}
    </span>
  )
}

type CardLabelProps = BaseProps<HTMLSpanElement> & {
  children: React.ReactNode | React.ReactNode[]
  color?: (typeof LabelColors)[number]
}

const CardLabel = forwardRef<HTMLSpanElement, CardLabelProps>(
  ({children, className, color = LabelColors[0], ...rest}, ref) => {
    return (
      <span className={clsx(styles.Card__label, className)} ref={ref} {...rest}>
        <Label color={color}>{children}</Label>
      </span>
    )
  },
)

type CardHeadingProps = BaseProps<HTMLHeadingElement> & {
  children: React.ReactNode | React.ReactNode[]
  as?: Exclude<HeadingProps['as'], 'h1'>
  href?: string
} & Omit<HeadingProps, 'onMouseEnter' | 'onMouseLeave' | 'onFocus' | 'onBlur'> &
  React.ComponentPropsWithoutRef<'a'>

const CardHeading = forwardRef<HTMLHeadingElement, CardHeadingProps>(
  ({children, as = 'h3', className, href, onMouseEnter, onMouseLeave, onBlur, onFocus, ...rest}, ref) => {
    return (
      <Heading size="subhead-large" className={clsx(styles.Card__heading, className)} ref={ref} as={as} {...rest}>
        <a
          href={href}
          className={clsx(styles.Card__link)}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onBlur={onBlur}
          onFocus={onFocus}
        >
          {children}
        </a>
      </Heading>
    )
  },
)

type CardDescriptionProps = BaseProps<HTMLParagraphElement> & {
  children: React.ReactNode | React.ReactNode[]
}

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({children, className, ...rest}, ref) => {
    return (
      <Text variant="muted" ref={ref} size="200" as="p" className={clsx(styles.Card__description, className)} {...rest}>
        {children}
      </Text>
    )
  },
)

/**
 * Card component:
 * {@link https://primer.style/brand/components/Card/ See usage examples}.
 */
export const Card = Object.assign(CardRoot, {
  Image: CardImage,
  Label: CardLabel,
  Icon: CardIcon,
  Heading: CardHeading,
  Description: CardDescription,
})
