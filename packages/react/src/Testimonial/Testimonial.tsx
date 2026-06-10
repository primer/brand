import React, {
  HTMLAttributes,
  PropsWithChildren,
  forwardRef,
  SVGProps,
  CSSProperties,
  ComponentPropsWithRef,
} from 'react'
import {clsx} from 'clsx'
import {BaseProps} from '../component-helpers'
import {Text, Avatar as BaseAvatar, useAnimation} from '../'
import type {AvatarProps} from '../'
import {Link, type LinkProps} from '../Link'

import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/testimonial/base.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/testimonial/colors-with-modes.css'

import styles from './Testimonial.module.css'
import {Colors, BiColorGradients} from '../constants'

type TestimonialSize = 'small' | 'large'

export const TestimonialQuoteMarkColors = [...Colors, ...BiColorGradients] as const
export const defaultQuoteMarkColor = TestimonialQuoteMarkColors[0]

export const TestimonialVariants = ['subtle', 'default', 'minimal', 'expressive'] as const
type TestimonialVariant = (typeof TestimonialVariants)[number]
export const defaultTestimonialVariant: TestimonialVariant = 'minimal'

export type TestimonialProps = {
  /**
   * Sets alternative appearance for the testimonial
   */
  variant?: TestimonialVariant
  /**
   * Applies an optional border where a variant supports it
   */
  hasBorder?: boolean
  /**
   * Valid children include Testimonial.Name, Testimonial.Avatar, and Testimonial.Name
   */
  children:
    | React.ReactNode
    | React.ReactElement<QuoteProps>
    | React.ReactElement<NameProps>
    | React.ReactElement<AvatarProps>
    | React.ReactElement<LogoProps>[]
  /**
   * Sets the testimonial text size
   */
  size?: TestimonialSize
  /** Sets the color of the quote mark */
  quoteMarkColor?: (typeof TestimonialQuoteMarkColors)[number]
} & BaseProps<HTMLElement> &
  React.HTMLAttributes<HTMLElement>

/**
 * Testimonial parent element
 * <Testimonial>
 */
function TestimonialBase(
  {
    quoteMarkColor,
    animate,
    className,
    children,
    variant = 'minimal',
    hasBorder = true,
    size,
    style,
    ...rest
  }: PropsWithChildren<TestimonialProps>,
  ref,
) {
  const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)

  const resolvedQuoteMarkColor = quoteMarkColor ?? (variant === 'expressive' ? 'green' : 'default')

  const quoteMark = (
    <div
      aria-hidden="true"
      className={clsx(
        styles['Testimonial__quoteMark'],
        styles[`Testimonial__quoteMark--${resolvedQuoteMarkColor}`],
        variant === 'expressive' && styles['Testimonial__quoteMark--hasBackground'],
      )}
    >
      <span className={styles['Testimonial__quoteMarkGlyph']}>&ldquo;</span>
    </div>
  )

  const childrenArray = React.Children.toArray(children)
  const findChild = (type: React.ElementType) =>
    childrenArray.find(child => React.isValidElement(child) && child.type === type)

  const quoteChild = findChild(Quote)
  const actionChild = findChild(_Link)
  const avatarChild = findChild(Avatar)
  const logoChild = findChild(Logo)
  const nameChild = findChild(Name)

  return (
    <figure
      ref={ref}
      className={clsx(
        animationClasses,
        styles['Testimonial'],
        styles[`Testimonial--variant-${variant}`],
        size && styles[`Testimonial--size-${size}`],
        hasBorder && styles['Testimonial--border'],
        className,
      )}
      style={{
        ...animationInlineStyles,
        ...style,
        ['--testimonial-accent-color' as keyof CSSProperties]: resolvedQuoteMarkColor,
      }}
      {...rest}
    >
      <div className={styles['Testimonial__quoteWrapper']}>
        {quoteMark}
        {quoteChild}
        {actionChild}
      </div>
      <div className={styles['Testimonial__media']}>
        {avatarChild}
        {logoChild}
        {nameChild}
      </div>
    </figure>
  )
}

const Root = forwardRef(TestimonialBase)

/**
 * Testimonial quote child element
 * <Testimonial.Quote>
 */
type QuoteProps = React.HTMLAttributes<HTMLElement> & BaseProps<HTMLElement>

function QuoteBase({children, className}: QuoteProps, ref) {
  return (
    <blockquote ref={ref}>
      <Text className={clsx(styles['Testimonial-quote'], className)}>{children}</Text>
    </blockquote>
  )
}

const Quote = forwardRef(QuoteBase)

/**
 * Testimonial name child element
 * <Testimonial.Name>
 */
type NameProps = {
  position?: string
} & React.HTMLAttributes<HTMLElement> &
  BaseProps<HTMLElement>

function _Name({children, className, position}: NameProps, ref) {
  return (
    <figcaption ref={ref} className={clsx(styles['Testimonial-caption'], className)}>
      <Text size="200" className={clsx(styles['Testimonial-from'])} font="monospace">
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

const Name = forwardRef(_Name)

/**
 * Testimonial logo child element
 * <Testimonial.Logo>
 */
type LogoProps = {
  children: React.ReactElement<SVGProps<SVGSVGElement>> | React.ReactElement<HTMLAttributes<HTMLImageElement>>
} & React.HTMLAttributes<HTMLImageElement> &
  BaseProps<HTMLImageElement>

function _Logo({children, ...rest}: LogoProps, ref) {
  return (
    <div className={styles['Testimonial-logo']} {...rest}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          if (child.type === 'img') {
            const imageChild = child as React.ReactElement<ComponentPropsWithRef<'img'>>
            const imageProps: ComponentPropsWithRef<'img'> = {
              className: clsx(styles['Testimonial-logo-image']),
              ref: ref as ComponentPropsWithRef<'img'>['ref'],
            }

            return React.cloneElement(imageChild, imageProps)
          }
        }
      })}
    </div>
  )
}

const Logo = forwardRef(_Logo)

/**
 * Testimonial avatar child element
 * <Testimonial.Avatar>
 */

function _Avatar({size, ...rest}: AvatarProps) {
  return <BaseAvatar className={clsx(styles['Testimonial-avatar'])} size={48} {...rest} />
}

const Avatar = _Avatar

/**
 * Testimonial link child element
 * <Testimonial.Link>
 */
function _LinkBase({className, ...rest}: LinkProps, _ref) {
  return <Link className={clsx(styles['Testimonial-link'], className)} {...rest} size="medium" variant="accent" />
}

const _Link = forwardRef(_LinkBase)

/**
 * Use Testimonial to display a quote from a customer or user.
 * @see https://primer.style/brand/components/Testimonial
 */
export const Testimonial = Object.assign(Root, {
  Quote,
  Name,
  Avatar,
  Logo,
  Link: _Link,
})
