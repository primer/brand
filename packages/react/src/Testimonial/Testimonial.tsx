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

import styles from './Testimonial.module.css'

type TestimonialAlignment = 'start' | 'center'
type TestimonialSize = 'small' | 'large'

export type TestimonialProps = {
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
   * Aligns the testimonial content
   */
  align?: TestimonialAlignment
  /**
   * Sets the testimonial text size
   */
  size?: TestimonialSize
  /** Sets the color of the quote mark */
  quoteMarkFill?: React.CSSProperties['color']
} & BaseProps<HTMLElement> &
  React.HTMLAttributes<HTMLElement>

/**
 * Testimonial parent element
 * <Testimonial>
 */
function _Root(
  {
    quoteMarkFill = 'currentColor',
    align,
    animate,
    className,
    children,
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
        align && styles[`Testimonial--${align}`],
        size && styles[`Testimonial--size-${size}`],
        className,
      )}
      style={{...animationInlineStyles, ...style, ['--testimonial-accent-color' as keyof CSSProperties]: quoteMarkFill}}
      {...rest}
    >
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          if (child.type === Quote) {
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
    </figure>
  )
}

const Root = forwardRef(_Root)

/**
 * Testimonial quote child element
 * <Testimonial.Quote>
 */
type QuoteProps = {
  children: string | Array<string | React.ReactElement<HTMLElement>>
} & React.HTMLAttributes<HTMLElement> &
  BaseProps<HTMLElement>

function _Quote({children, className}: QuoteProps, ref) {
  const childrenArray = useMemo(() => React.Children.toArray(children), [children])

  // TODO: when Firefox supports :has() selector, we should use that instead of JS
  const getConditionalVariant = useCallback(() => {
    if (findElementInChildren(children, 'em')) {
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
    <figcaption ref={ref}>
      <Text size="100" className={clsx(styles['Testimonial-from'], className)} variant="muted">
        {children}{' '}
        {position && (
          <span>
            {' // '}
            {position}
          </span>
        )}
      </Text>
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
  return <BaseAvatar size={48} {...rest} />
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
