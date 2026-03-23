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
type TestimonialLayout = 'default' | 'wide'

export const TestimonialQuoteMarkColors = [...Colors, ...BiColorGradients] as const
export const defaultQuoteMarkColor = TestimonialQuoteMarkColors[0]

export const TestimonialVariants = ['subtle', 'default', 'minimal'] as const
type TestimonialVariant = (typeof TestimonialVariants)[number]
export const defaultTestimonialVariant: TestimonialVariant = 'minimal'

export const TestimonialLayouts = ['default', 'wide'] as const

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
  /**
   * When true, renders the quote mark inside a colored background box.
   * Defaults to false.
   */
  quoteMarkHasBackground?: boolean
  /**
   * Sets the layout of the testimonial.
   * 'default' stacks all content in a single column.
   * 'wide' places the quote in a left column and the attribution (logo + name) in a right column.
   */
  layout?: TestimonialLayout
} & BaseProps<HTMLElement> &
  React.HTMLAttributes<HTMLElement>

/**
 * Testimonial parent element
 * <Testimonial>
 */
function TestimonialBase(
  {
    quoteMarkColor = 'default',
    quoteMarkHasBackground = false,
    animate,
    className,
    children,
    variant = 'minimal',
    hasBorder = true,
    size,
    layout = 'default',
    style,
    ...rest
  }: PropsWithChildren<TestimonialProps>,
  ref,
) {
  const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)

  const quoteMark = (
    <div
      aria-hidden="true"
      className={clsx(
        styles['Testimonial__quoteMark'],
        styles[`Testimonial__quoteMark--${quoteMarkColor}`],
        quoteMarkHasBackground && styles['Testimonial__quoteMark--hasBackground'],
      )}
    >
      <span className={quoteMarkHasBackground ? styles['Testimonial__quoteMarkGlyph'] : undefined}>&ldquo;</span>
    </div>
  )

  const quoteChild = React.Children.toArray(children).find(child => React.isValidElement(child) && child.type === Quote)

  const actionChild = React.Children.toArray(children).find(
    child => React.isValidElement(child) && child.type === _Link,
  )

  const avatarChild = React.Children.toArray(children).find(
    child => React.isValidElement(child) && child.type === Avatar,
  )

  const logoChild = React.Children.toArray(children).find(child => React.isValidElement(child) && child.type === Logo)

  const nameChild = React.Children.toArray(children).find(child => React.isValidElement(child) && child.type === Name)

  return (
    <figure
      ref={ref}
      className={clsx(
        animationClasses,
        styles['Testimonial'],
        styles[`Testimonial--variant-${variant}`],
        size && styles[`Testimonial--size-${size}`],
        hasBorder && styles['Testimonial--border'],
        layout === 'wide' && styles['Testimonial--layout-wide'],
        className,
      )}
      style={{
        ...animationInlineStyles,
        ...style,
        ['--testimonial-accent-color' as keyof CSSProperties]: quoteMarkColor,
      }}
      {...rest}
    >
      <div className={styles['Testimonial__quoteCol']}>
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
      <Text size="200" className={clsx(styles['Testimonial-from'])}>
        {children}
      </Text>
      {position && (
        <Text size="100" className={clsx(styles['Testimonial-position'])} variant="muted">
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
function _Link({className, ...rest}: LinkProps) {
  return <Link className={clsx(styles['Testimonial-link'], className)} {...rest} size="medium" variant="accent" />
}

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
