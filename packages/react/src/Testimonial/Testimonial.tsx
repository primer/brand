import React, {
  HTMLAttributes,
  PropsWithChildren,
  forwardRef,
  SVGProps,
  CSSProperties,
  useMemo,
  useCallback,
} from 'react'
import clsx from 'clsx'
import {BaseProps} from '../component-helpers'
import {Text, Avatar as BaseAvatar, useAnimation} from '../'
import type {AvatarProps} from '../'
import findElementInChildren from '../findElementInChildren'

import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/testimonial/base.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/testimonial/colors-with-modes.css'

import styles from './Testimonial.module.css'
import {Colors, BiColorGradients} from '../constants'

type TestimonialSize = 'small' | 'large'

export const TestimonialQuoteMarkColors = [...Colors, ...BiColorGradients] as const
export const defaultQuoteMarkColor = TestimonialQuoteMarkColors[0]

export const TestimonialVariants = ['subtle', 'default', 'minimal'] as const
type TestimonialVariant = (typeof TestimonialVariants)[number]
export const defaultTestimonialVariant: TestimonialVariant = 'minimal'

export type TestimonialProps = {
  /**
   * Sets alternative appearance for the testimonial
   */
  variant?: TestimonialVariant
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
function _Root(
  {
    quoteMarkColor = 'default',
    animate,
    className,
    children,
    variant = 'minimal',
    size,
    style,
    ...rest
  }: PropsWithChildren<TestimonialProps>,
  ref,
) {
  const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)

  return (
    <figure
      ref={ref}
      className={clsx(
        animationClasses,
        styles['Testimonial'],
        styles[`Testimonial--variant-${variant}`],
        size && styles[`Testimonial--size-${size}`],
        className,
      )}
      style={{
        ...animationInlineStyles,
        ...style,
        ['--testimonial-accent-color' as keyof CSSProperties]: quoteMarkColor,
      }}
      {...rest}
    >
      <div
        aria-hidden="true"
        className={clsx(styles['Testimonial__quoteMark'], styles[`Testimonial__quoteMark--${quoteMarkColor}`])}
      >
        “
      </div>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          if (child.type === Quote) {
            return child
          }
        }
      })}
      <div className={clsx(styles['Testimonial__media'])}>
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            if (child.type === Avatar) {
              return child
            }
          }
        })}
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            if (child.type === Logo) {
              return child
            }
          }
        })}
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            if (child.type === Name) {
              return child
            }
          }
        })}
      </div>
    </figure>
  )
}

const Root = forwardRef(_Root)

/**
 * Testimonial quote child element
 * <Testimonial.Quote>
 */
type QuoteProps = React.HTMLAttributes<HTMLElement> & BaseProps<HTMLElement>

function _Quote({children, className}: QuoteProps, ref) {
  const childrenArray = useMemo(() => React.Children.toArray(children), [children])

  // TODO: when Firefox supports :has() selector, we should use that instead of JS
  const getConditionalVariant = useCallback(() => {
    if (findElementInChildren(children, 'b') || findElementInChildren(children, 'em')) {
      return 'muted'
    }
    return 'default'
  }, [children])

  const defaultColor = childrenArray.length === 1 ? 'default' : getConditionalVariant()

  return (
    <blockquote ref={ref}>
      <Text
        className={clsx(
          styles['Testimonial-quote'],
          defaultColor === 'muted' && styles['Testimonial-quote--muted'],
          className,
        )}
      >
        {children}
      </Text>
    </blockquote>
  )
}

const Quote = forwardRef(_Quote)

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
            return React.cloneElement(child, {
              className: clsx(styles['Testimonial-logo-image']),
              ref,
            })
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
 * Use Testimonial to display a quote from a customer or user.
 * @see https://primer.style/brand/components/Testimonial
 */
export const Testimonial = Object.assign(Root, {
  Quote,
  Name,
  Avatar,
  Logo,
})
