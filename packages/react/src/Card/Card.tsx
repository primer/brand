import React, {RefObject, forwardRef, useCallback} from 'react'
import {isFragment} from 'react-is'
import clsx from 'clsx'
import {Heading, HeadingProps, Text, useTheme, CardSkewEffect, Image, type ImageProps, Label, LabelColors} from '..'
import {Icon, type IconProps} from '../Icon'
import {ExpandableArrow} from '../ExpandableArrow'
import type {BaseProps} from '../component-helpers'
import {useProvidedRefOrCreate} from '../hooks/useRef'
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

export const CardIconColors = Colors

export const defaultCardIconColor = CardIconColors[0]
export type CardProps = {
  /**
   * Specify alternative card appearance
   */
  variant?: 'default' | 'minimal'
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
   * Disable the default hover animation
   */
  disableAnimation?: boolean
  /**
   * The href of the link
   * */
  href: string
  /**
   * Changes the cta text of the card
   * */
  ctaText?: string
  hasBorder?: boolean
  /**
   * Fills the width of the parent container and removes the default max-width.
   */
  fullWidth?: boolean
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
      disableAnimation = false,
      fullWidth = false,
      href,
      hasBorder = false,
      style,
      variant = 'default',
      ...props
    },
    ref,
  ) => {
    const cardRef = useProvidedRefOrCreate(ref as RefObject<HTMLDivElement>)
    const {colorMode} = useTheme()
    const [isActive, setIsActive] = React.useState(false)

    const handleActiveCard = useCallback(
      (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        setIsActive(true)
        onMouseEnter?.(event)
      },
      [onMouseEnter, setIsActive],
    )

    const handleInactiveCard = useCallback(
      (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        setIsActive(false)
        onMouseLeave?.(event)
      },
      [onMouseLeave, setIsActive],
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

    const hasSkewEffect = colorMode === 'dark' && variant !== 'minimal'
    const showBorder = hasSkewEffect || hasBorder

    const WrapperComponent = hasSkewEffect ? CardSkewEffect : DefaultCardWrapperComponent

    return (
      <WrapperComponent
        style={style}
        disableSkew={disableAnimation}
        className={clsx(fullWidth ? styles['Card--fullWidth'] : styles['Card--maxWidth'])}
      >
        <div
          className={clsx(
            styles.Card,
            disableAnimation && styles['Card--disableAnimation'],
            styles[`Card--colorMode-${colorMode}`],
            styles[`Card--variant-${variant}`],
            hasIcon && styles['Card--icon'],
            showBorder && styles['Card--border'],
            styles[`Card--colorMode-${colorMode}`],
            className,
          )}
          style={style}
          ref={cardRef}
          {...props}
        >
          {React.Children.map(filteredChildren, child => {
            if (React.isValidElement(child) && typeof child.type !== 'string' && child.type === CardHeading) {
              return React.cloneElement<CardHeadingProps>(child as React.ReactElement<CardHeadingProps>, {
                onMouseEnter: handleActiveCard,
                onMouseLeave: handleInactiveCard,
                href,
              })
            }
            return child
          })}
          <div className={styles.Card__action}>
            <Text as="span" size="200" className={clsx(stylesLink['Link--label'])}>
              {ctaText}
            </Text>
            <ExpandableArrow className={stylesLink['Link-arrow']} expanded={isActive} aria-hidden="true" />
          </div>
        </div>
      </WrapperComponent>
    )
  },
)

function DefaultCardWrapperComponent({className, children}) {
  return <div className={clsx(styles['Card__outer'], className)}>{children}</div>
}

type CardImageProps = ImageProps

function CardImage({className, ...rest}: CardImageProps) {
  return (
    <div className={styles.Card__image}>
      <Image className={className} {...rest} />
    </div>
  )
}

type CardIconProps = IconProps

const CardIcon = ({className, ...props}: IconProps) => (
  <Icon className={clsx(styles.Card__icon, className)} {...props} />
)

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
