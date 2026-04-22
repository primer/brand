import React, {RefObject, forwardRef} from 'react'

import {clsx} from 'clsx'
import {Heading, HeadingProps, Text, Image, type ImageProps} from '..'
import {EyebrowText, type EyebrowTextProps, EyebrowTextVariants} from '../EyebrowText'
import {Icon, type IconProps} from '../Icon'
import {ExpandableArrow} from '../ExpandableArrow'
import type {BaseProps} from '../component-helpers'
import {useProvidedRefOrCreate} from '../hooks/useRef'
import {Colors} from '../constants'
import {isFragmentElement} from '../utils/isFragmentElement'

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

export const CardVariants = ['default', 'minimal'] as const
export const CardCTAVariants = ['text', 'arrow', 'none'] as const
export const CardBackgroundColors = ['default', 'subtle', 'none'] as const
export const CardTokenPositions = ['block-start', 'block-end'] as const
export const CardLabelVariants = EyebrowTextVariants

export const CardIconColors = Colors

export const defaultCardIconColor = CardIconColors[0]
export const defaultCardCTAVariant = CardCTAVariants[0]
export const defaultCardLabelVariant = CardLabelVariants[1]

export type CardVariants = (typeof CardVariants)[number]
export type CardCTAVariant = (typeof CardCTAVariants)[number]
export type CardTokenPosition = (typeof CardTokenPositions)[number]
export type CardLabelVariant = (typeof CardLabelVariants)[number]
export type CardBackgroundColor = (typeof CardBackgroundColors)[number]

type CardLeadingVisual = React.ReactElement | React.ComponentType<{className?: string}>

export type CardProps = {
  /**
   * Specify alternative card appearance
   */
  variant?: CardVariants
  /**
   * Valid children include Card.Image, Card.Icon, Card.Label, Card.Tokens, Card.Heading, and Card.Description
   */
  children:
    | React.ReactNode
    | React.ReactElement<CardImageProps>
    | React.ReactElement<CardIconProps>
    | React.ReactElement<CardLabelProps>
    | React.ReactElement<CardTokensProps>
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
  /**
   * Specifies the presentation of the call-to-action area
   */
  ctaVariant?: CardCTAVariant
  /**
   * Optional, custom background color.
   */
  backgroundColor?: CardBackgroundColor
  /**
   * A visual that appears before the heading, commonly used for a logo or brand mark
   */
  leadingVisual?: CardLeadingVisual
  /**
   * Adds a border to the card.
   */
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
      ctaVariant = defaultCardCTAVariant,
      disableAnimation = false,
      fullWidth = false,
      href,
      hasBorder = false,
      leadingVisual,
      style,
      variant = 'default',
      backgroundColor,
      ...props
    },
    ref,
  ) => {
    const cardRef = useProvidedRefOrCreate(ref as RefObject<HTMLDivElement>)
    const resolvedBackgroundColor =
      backgroundColor ?? (variant === 'minimal' || ctaVariant === 'arrow' ? 'none' : 'default')

    let children: React.ReactNode | null

    if (childrenMaybeWrappedInFragment == null) {
      children = null
    } else if (isFragmentElement(childrenMaybeWrappedInFragment)) {
      children = childrenMaybeWrappedInFragment.props.children ?? null
    } else {
      children = childrenMaybeWrappedInFragment
    }

    const {cardImage, cardIcon, cardLabel, cardTokensBlockStart, cardTokensBlockEnd, cardHeading, cardDescription} =
      React.Children.toArray(children).reduce<{
        cardHeading?: ReturnType<typeof CardHeading>
        cardImage?: ReturnType<typeof CardImage>
        cardIcon?: ReturnType<typeof CardIcon>
        cardLabel?: ReturnType<typeof CardLabel>
        cardTokensBlockStart?: ReturnType<typeof CardTokens>
        cardTokensBlockEnd?: ReturnType<typeof CardTokens>
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
        } else if (isCardTokens(child)) {
          if (child.props.position === 'block-end') {
            acc.cardTokensBlockEnd = child
          } else {
            acc.cardTokensBlockStart = child
          }
        } else if (isCardDescription(child)) {
          acc.cardDescription = child
        }

        return acc
      }, {})

    if ((process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') && leadingVisual && cardIcon) {
      // eslint-disable-next-line no-console
      console.warn('Card: `leadingVisual` and `Card.Icon` cannot be used together. `Card.Icon` will not be rendered.')
    }

    const renderedLeadingVisual = getRenderableLeadingVisual(leadingVisual)
    const renderedCardIcon = renderedLeadingVisual ? undefined : cardIcon
    const imagePosition = cardImage ? cardImage.props.position || 'block-start' : null
    const shouldRenderLinkArrow = !(align === 'center' && ctaVariant === 'text')

    return (
      <DefaultCardWrapperComponent
        style={style}
        className={clsx(
          fullWidth ? styles['Card--fullWidth'] : styles['Card--maxWidth'],
          styles[`Card--align-${align}`],
        )}
      >
        <div
          className={clsx(
            styles.Card,
            disableAnimation && styles['Card--disableAnimation'],
            renderedLeadingVisual && styles['Card--hasLeadingVisual'],
            ctaVariant === 'arrow' && styles['Card--ctaVariant-arrow'],
            cardTokensBlockEnd && styles['Card--tokensPosition-block-end'],
            variant === 'minimal' && styles['Card--variant-minimal'],
            hasBorder && styles['Card--border'],
            styles[`Card--backgroundColor-${resolvedBackgroundColor}`],
            imagePosition && styles[`Card--imagePos-${imagePosition}`],
            className,
          )}
          style={style}
          ref={cardRef}
          {...props}
        >
          {imagePosition === 'block-start' ? cardImage : null}
          {renderedLeadingVisual ? <div className={styles.Card__leadingVisual}>{renderedLeadingVisual}</div> : null}
          {renderedCardIcon}
          {cardTokensBlockStart}
          {cardLabel}
          {cardHeading}
          {cardDescription}
          {cardTokensBlockEnd}
          {imagePosition === 'block-end' ? cardImage : null}

          {ctaVariant !== 'none' ? (
            <div
              className={clsx(styles.Card__action, ctaVariant === 'arrow' && styles['Card__action--arrowOnly'])}
              aria-hidden={ctaVariant === 'arrow' ? true : undefined}
            >
              <span className={clsx(ctaVariant === 'arrow' && styles.Card__actionLabelClip)}>
                <Text as="span" size="200" className={clsx(stylesLink['Link--label'], styles.Card__actionLabel)}>
                  {ctaText}
                </Text>
              </span>
              {shouldRenderLinkArrow ? (
                <span
                  className={clsx(
                    styles.Card__actionIcon,
                    ctaVariant === 'arrow' && styles['Card__actionIcon--arrowOnly'],
                  )}
                >
                  <ExpandableArrow
                    className={clsx(stylesLink['Link-arrow'], styles['Card--expandableArrow'])}
                    aria-hidden="true"
                  />
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
      </DefaultCardWrapperComponent>
    )
  },
)

type DefaultCardWrapperComponentProps = React.PropsWithChildren<{
  className?: string
  style?: React.CSSProperties
}>

function DefaultCardWrapperComponent({className, children, style}: DefaultCardWrapperComponentProps) {
  return (
    <div className={clsx(styles['Card__outer'], className)} style={style}>
      {children}
    </div>
  )
}

function getRenderableLeadingVisual(leadingVisual?: CardLeadingVisual) {
  if (!leadingVisual) {
    return null
  }

  if (typeof leadingVisual === 'function') {
    return React.createElement(leadingVisual, {className: styles['Card__leadingVisualItem']})
  }

  if (React.isValidElement<{className?: string}>(leadingVisual)) {
    return React.cloneElement(leadingVisual, {
      className: clsx(styles['Card__leadingVisualItem'], leadingVisual.props.className),
    })
  }

  return null
}

type CardImageProps = {
  position?: 'block-start' | 'block-end'
} & ImageProps

function CardImage({className, ...rest}: CardImageProps) {
  return (
    <div className={styles.Card__image}>
      <Image className={className} {...rest} />
    </div>
  )
}

type CardIconProps = IconProps

const CardIcon = ({className, hasBackground = true, ...props}: IconProps) => (
  <Icon className={clsx(styles.Card__icon, className)} hasBackground={hasBackground} {...props} />
)

type CardTokensProps = BaseProps<HTMLDivElement> & {
  children: React.ReactNode | React.ReactNode[]
  position?: CardTokenPosition
}

const CardTokens = forwardRef<HTMLDivElement, CardTokensProps>(
  ({children, className, position = 'block-start', ...rest}, ref) => {
    return (
      <div
        className={clsx(
          styles.Card__tokens,
          position === 'block-end' && styles['Card__tokens--position-block-end'],
          className,
        )}
        ref={ref}
        {...rest}
      >
        {children}
      </div>
    )
  },
)

type CardLabelProps = EyebrowTextProps & {
  children: React.ReactNode | React.ReactNode[]
}

const CardLabel = forwardRef<HTMLSpanElement, CardLabelProps>(
  ({children, variant = 'accent', className, ...rest}, ref) => {
    return (
      <EyebrowText ref={ref} className={clsx(styles.Card__label, className)} variant={variant} {...rest}>
        {children}
      </EyebrowText>
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
      <Heading size="6" className={clsx(styles.Card__heading, className)} ref={ref} as={as} {...rest}>
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
const isCardIcon = createComponentTypeGuard(CardIcon)
const isCardLabel = createComponentTypeGuard(CardLabel)
const isCardTokens = createComponentTypeGuard(CardTokens)
const isCardHeading = createComponentTypeGuard(CardHeading)
const isCardDescription = createComponentTypeGuard(CardDescription)

/**
 * Card component:
 * {@link https://primer.style/brand/components/Card/ See usage examples}.
 */
export const Card = Object.assign(CardRoot, {
  Image: CardImage,
  Icon: CardIcon,
  Label: CardLabel,
  Tokens: CardTokens,
  Heading: CardHeading,
  Description: CardDescription,
})
