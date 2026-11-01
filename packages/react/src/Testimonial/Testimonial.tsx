import React, {HTMLAttributes, forwardRef, SVGProps, CSSProperties, ComponentPropsWithRef} from 'react'
import {clsx} from 'clsx'
import {BaseProps} from '../component-helpers'
import {Text, Avatar, useAnimation} from '../'
import type {AvatarProps} from '../'
import {Link, type LinkProps} from '../Link'
import {TextCursorAnimation} from '../TextCursorAnimation'
import {Colors} from '../constants'

/**
 * Design tokens
 */

import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/testimonial/base.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/testimonial/colors-with-modes.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from './Testimonial.module.css'

type TestimonialSize = 'small' | 'large'

export const TestimonialQuoteMarkColors = [...Colors] as const
export const defaultQuoteMarkColor = 'green'

export const TestimonialVariants = ['subtle', 'default', 'minimal', 'expressive'] as const
type TestimonialVariant = (typeof TestimonialVariants)[number]
export const defaultTestimonialVariant: TestimonialVariant = 'minimal'

const testIds = {
  root: 'Testimonial',
  get quoteMark() {
    return `${this.root}__quoteMark`
  },
  get quoteWrapper() {
    return `${this.root}__quoteWrapper`
  },
  get media() {
    return `${this.root}__media`
  },
}

export type TestimonialProps = {
  /**
   * Sets alternative visual appearance
   */
  variant?: TestimonialVariant
  /**
   * Applies an optional border where a variant supports it
   */
  hasBorder?: boolean
  /**
   * Valid children
   */
  children: React.ReactNode
  /**
   * Sets the testimonial text size
   */
  size?: TestimonialSize
  /** Sets the color of the quote mark */
  quoteMarkColor?: (typeof TestimonialQuoteMarkColors)[number]
  /** Class applied to the quote mark. */
  quoteMarkClassName?: string
  /** Class applied to the attribution wrapper. */
  mediaClassName?: string
  ['data-testid']?: string
} & BaseProps<HTMLElement> &
  React.HTMLAttributes<HTMLElement>

/**
 * Testimonial parent element
 * <Testimonial>
 */
function TestimonialRootBase(
  {
    quoteMarkColor = defaultQuoteMarkColor,
    quoteMarkClassName,
    mediaClassName,
    animate,
    className,
    children,
    variant = defaultTestimonialVariant,
    hasBorder = true,
    size,
    style,
    'data-testid': testId,
    ...rest
  }: TestimonialProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)
  const resolvedQuoteMarkColor = TestimonialQuoteMarkColors.includes(quoteMarkColor)
    ? quoteMarkColor
    : defaultQuoteMarkColor

  const quoteMark = (
    <div
      aria-hidden="true"
      data-testid={testIds.quoteMark}
      className={clsx(
        styles['Testimonial__quoteMark'],
        styles[`Testimonial__quoteMark--${resolvedQuoteMarkColor}`],
        quoteMarkClassName,
      )}
    >
      <span className={styles.Testimonial__quoteMarkGlyph}>&ldquo;</span>
    </div>
  )

  const childrenArray = React.Children.toArray(children)
  const findChild = <Props,>(type: React.ElementType): React.ReactElement<Props> | undefined =>
    childrenArray.find(
      (child): child is React.ReactElement<Props> => React.isValidElement<Props>(child) && child.type === type,
    )

  const quoteChild = findChild<TestimonialQuoteProps>(TestimonialQuote)
  const actionChild = findChild<LinkProps>(TestimonialLink)
  const avatarChild = findChild<AvatarProps>(TestimonialAvatar)
  const logoChild = findChild<TestimonialLogoProps>(TestimonialLogo)
  const nameChild = findChild<TestimonialNameProps>(TestimonialName)

  const name =
    nameChild && variant === 'expressive' && typeof nameChild.props.children === 'string'
      ? React.cloneElement(nameChild, {
          children: (
            <TextCursorAnimation animate animationTrigger="on-visible" variant="default">
              {nameChild.props.children}
            </TextCursorAnimation>
          ),
        })
      : nameChild

  return (
    <figure
      ref={ref}
      data-testid={testId || testIds.root}
      className={clsx(
        animationClasses,
        styles['Testimonial'],
        styles[`Testimonial--variant-${variant}`],
        size && styles[`Testimonial--size-${size}`],
        hasBorder && styles['Testimonial--border'],
        variant === 'expressive' && actionChild && styles['Testimonial--hasLink'],
        className,
      )}
      style={{
        ...animationInlineStyles,
        ...style,
        ['--testimonial-accent-color' as keyof CSSProperties]: resolvedQuoteMarkColor,
      }}
      {...rest}
    >
      <div className={styles['Testimonial__quoteWrapper']} data-testid={testIds.quoteWrapper}>
        {quoteMark}
        {quoteChild}
        {variant !== 'expressive' && actionChild}
      </div>
      <div className={clsx(styles['Testimonial__media'], mediaClassName)} data-testid={testIds.media}>
        {avatarChild}
        {logoChild}
        {name}
      </div>
      {variant === 'expressive' && actionChild}
    </figure>
  )
}

const TestimonialRoot = forwardRef(TestimonialRootBase)

/**
 * Testimonial quote child element
 * <Testimonial.Quote>
 */
type TestimonialQuoteProps = React.HTMLAttributes<HTMLElement> & BaseProps<HTMLElement>
function TestimonialQuoteBase(
  {children, className, ...rest}: TestimonialQuoteProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  return (
    <blockquote {...rest} ref={ref as React.Ref<HTMLQuoteElement>}>
      <Text className={clsx(styles['Testimonial-quote'], className)}>{children}</Text>
    </blockquote>
  )
}
const TestimonialQuote = forwardRef(TestimonialQuoteBase)

/**
 * Testimonial name child element
 * <Testimonial.Name>
 */
type TestimonialNameProps = {
  position?: string
} & React.HTMLAttributes<HTMLElement> &
  BaseProps<HTMLElement>

function TestimonialNameBase(
  {children, className, position, ...rest}: TestimonialNameProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  return (
    <figcaption {...rest} ref={ref} className={clsx(styles['Testimonial-caption'], className)}>
      <Text size="200" className={styles['Testimonial-from']} font="monospace">
        {children}
      </Text>
      {position && (
        <Text size="200" className={clsx(styles['Testimonial-position'])} variant="muted">
          {position}
        </Text>
      )}
    </figcaption>
  )
}
const TestimonialName = forwardRef(TestimonialNameBase)

/**
 * Testimonial logo child element
 * <Testimonial.Logo>
 */
type TestimonialLogoProps = {
  children: React.ReactElement<SVGProps<SVGSVGElement>> | React.ReactElement<HTMLAttributes<HTMLImageElement>>
} & React.HTMLAttributes<HTMLImageElement> &
  BaseProps<HTMLImageElement>

function TestimonialLogoBase({children, ...rest}: TestimonialLogoProps, ref: React.ForwardedRef<unknown>) {
  return (
    <div className={styles['Testimonial-logo']} {...rest}>
      {React.Children.map(children, child => {
        if (React.isValidElement<ComponentPropsWithRef<'img'>>(child) && child.type === 'img') {
          return React.cloneElement(child, {
            className: clsx(styles['Testimonial-logo-image'], child.props.className),
            ref: ref as ComponentPropsWithRef<'img'>['ref'],
          })
        }

        if (React.isValidElement<SVGProps<SVGSVGElement>>(child)) {
          return React.cloneElement(child, {
            className: clsx(styles['Testimonial-logo-image'], child.props.className),
            ref: ref as React.Ref<SVGSVGElement>,
          })
        }
      })}
    </div>
  )
}
const TestimonialLogo = forwardRef(TestimonialLogoBase)

/**
 * Testimonial avatar child element
 * <Testimonial.Avatar>
 */

function TestimonialAvatarBase({size, className, ...rest}: AvatarProps, ref: React.ForwardedRef<HTMLImageElement>) {
  return <Avatar ref={ref} className={clsx(styles['Testimonial-avatar'], className)} size={48} {...rest} />
}
const TestimonialAvatar = forwardRef(TestimonialAvatarBase)

/**
 * Testimonial link child element
 * <Testimonial.Link>
 */
function TestimonialLinkBase({className, ...rest}: LinkProps, ref: React.ForwardedRef<HTMLAnchorElement>) {
  return (
    <Link ref={ref} className={clsx(styles['Testimonial-link'], className)} {...rest} size="medium" variant="accent" />
  )
}
const TestimonialLink = forwardRef(TestimonialLinkBase)

/**
 * Use Testimonial to display a quote from a customer or user.
 * @see https://primer.style/brand/components/Testimonial
 */
export const Testimonial = Object.assign(TestimonialRoot, {
  Quote: TestimonialQuote,
  Name: TestimonialName,
  Avatar: TestimonialAvatar,
  Logo: TestimonialLogo,
  Link: TestimonialLink,
  testIds,
})
