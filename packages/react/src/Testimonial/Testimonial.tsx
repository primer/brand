import React, {HTMLAttributes, PropsWithChildren, forwardRef, SVGProps} from 'react'
import clsx from 'clsx'
import {BaseProps} from '../component-helpers'
import {Text} from '../'

import styles from './Testimonial.module.css'

type TestimonialAlignment = 'start' | 'center'

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
} & BaseProps<HTMLElement>

/**
 * Testimonial parent element
 * <Testimonial>
 */
function _Root({align, className, children, ...rest}: PropsWithChildren<TestimonialProps>, ref) {
  return (
    <figure
      ref={ref}
      className={clsx(styles['Testimonial'], align && styles[`Testimonial--${align}`], className)}
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
  children: string
} & React.HTMLAttributes<HTMLElement> &
  BaseProps<HTMLElement>

function _Quote({children, className}: QuoteProps, ref) {
  return (
    <blockquote ref={ref}>
      <Text size="300" className={clsx(styles['Testimonial-quote'], className)}>
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
      <Text size="200" className={clsx(styles['Testimonial-from'], className)} variant="muted">
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

export const Name = forwardRef(_Name)

/**
 * Testimonial avatar child element
 * <Testimonial.Avatar>
 */
type AvatarProps = {
  src: string
  alt: string
} & React.HTMLAttributes<HTMLImageElement> &
  BaseProps<HTMLImageElement>

function _Avatar({alt, src, ...rest}: AvatarProps, ref) {
  return (
    <div className={styles['Testimonial-avatar']}>
      <img
        ref={ref}
        className={styles['Testimonial-avatar-image']}
        src={src}
        {...rest}
        alt={alt}
        width={48}
        height={48}
      />
    </div>
  )
}

export const Avatar = forwardRef(_Avatar)

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
              ref
            })
          }
        }
      })}
    </div>
  )
}

export const Logo = forwardRef(_Logo)

/**
 * Use Testimonial to display a quote from a customer or user.
 * @see https://primer.style/brand/components/Testimonial
 */
export const Testimonial = Object.assign(Root, {
  Quote,
  Name,
  Avatar,
  Logo
})
