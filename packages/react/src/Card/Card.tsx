import React, {RefObject, forwardRef} from 'react'
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

export const CardVariants = ['default', 'minimal', 'torchlight'] as const

export const CardIconColors = Colors

export const defaultCardIconColor = CardIconColors[0]

export type CardVariants = (typeof CardVariants)[number]

export type CardProps = {
  /**
   * Specify alternative card appearance
   */
  variant?: CardVariants
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
  /**
   * Aligns the card content
   */
  align?: 'start' | 'center'
} & Omit<BaseProps<HTMLDivElement>, 'animate'> &
  Omit<React.ComponentPropsWithoutRef<'div'>, 'onMouseEnter' | 'onMouseLeave' | 'onFocus' | 'onBlur'> &
  Pick<React.ComponentPropsWithoutRef<'a'>, 'onMouseEnter' | 'onMouseLeave' | 'onFocus' | 'onBlur'>

const CardRoot = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      align = 'start',
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      children: childrenMaybeWrappedInFragment,
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

    const children = isFragment(childrenMaybeWrappedInFragment)
      ? childrenMaybeWrappedInFragment.props.children
      : childrenMaybeWrappedInFragment

    const {cardImage, cardIcon, cardLabel, cardHeading, cardDescription} = React.Children.toArray(children).reduce<{
      cardHeading?: ReturnType<typeof CardHeading>
      cardImage?: ReturnType<typeof CardImage>
      cardIcon?: ReturnType<typeof CardIcon>
      cardLabel?: ReturnType<typeof CardLabel>
      cardDescription?: ReturnType<typeof CardDescription>
    }>((acc, child) => {
      if (isCardHeading(child)) {
        acc.cardHeading = React.cloneElement(child, {
          href,
        })
      } else if (isCardImage(child)) {
        acc.cardImage = child
      } else if (isCardIcon(child)) {
        acc.cardIcon = child
      } else if (isCardLabel(child)) {
        acc.cardLabel = child
      } else if (isCardDescription(child)) {
        acc.cardDescription = child
      }

      return acc
    }, {})

    const hasSkewEffect = colorMode === 'dark' && variant === 'torchlight'
    const showBorder = hasSkewEffect || hasBorder

    const WrapperComponent = hasSkewEffect ? CardSkewEffect : DefaultCardWrapperComponent

    return (
      <WrapperComponent
        style={style}
        disableSkew={disableAnimation}
        className={clsx(
          fullWidth ? styles['Card--fullWidth'] : styles['Card--maxWidth'],
          styles[`Card--align-${align}`],
        )}
      >
        <div
          className={clsx(
            styles.Card,
            disableAnimation && styles['Card--disableAnimation'],
            styles[`Card--colorMode-${colorMode}`],
            styles[`Card--variant-${variant}`],
            cardIcon && styles['Card--icon'],
            showBorder && styles['Card--border'],
            styles[`Card--colorMode-${colorMode}`],
            className,
          )}
          style={style}
          ref={cardRef}
          {...props}
        >
          {cardHeading}
          {cardImage}
          {cardIcon}
          {cardLabel}
          {cardDescription}

          <div className={styles.Card__action}>
            <Text as="span" size="200" className={clsx(stylesLink['Link--label'])}>
              {ctaText}
            </Text>
            <ExpandableArrow
              className={clsx(stylesLink['Link-arrow'], styles['Card--expandableArrow'])}
              aria-hidden="true"
            />
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

const createComponentTypeGuard =
  <T,>(componentType: React.ComponentType<T>) =>
  (element: unknown): element is React.ReactElement<T> =>
    React.isValidElement(element) && element.type === componentType

const isCardImage = createComponentTypeGuard(CardImage)
const isCardLabel = createComponentTypeGuard(CardLabel)
const isCardIcon = createComponentTypeGuard(CardIcon)
const isCardHeading = createComponentTypeGuard(CardHeading)
const isCardDescription = createComponentTypeGuard(CardDescription)

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
