import React, {forwardRef, type Ref} from 'react'
import clsx from 'clsx'
import type {BaseProps} from '../component-helpers'
import styles from './CTABanner.module.css'
import {Heading as PlainHeading} from '../Heading'
import {Text} from '../Text'

export type CTABannerProps = BaseProps<HTMLDivElement> & {
  children: React.ReactNode | React.ReactNode[]
  align?: 'start' | 'center'
}

export const Root = forwardRef(
  ({align = 'start', className, children, ...props}: CTABannerProps, ref: Ref<HTMLDivElement>) => {
    return (
      <section
        ref={ref}
        className={clsx(styles.CTABanner, align === 'center' && styles['CTABanner--center'], className)}
        {...props}
      >
        {children}
      </section>
    )
  }
)

export const CTABannerHeadingTags = ['h1', 'h2'] as const

export type CTABannerHeadingProps = BaseProps<HTMLHeadingElement> & {
  children: React.ReactNode | React.ReactNode[]
  as?: typeof CTABannerHeadingTags[number]
}

export const Heading = forwardRef(
  (
    {as = CTABannerHeadingTags[1], className, children, ...props}: CTABannerHeadingProps,
    ref: Ref<HTMLHeadingElement>
  ) => {
    return <PlainHeading {...props}>{children}</PlainHeading>
  }
)

export type CTABannerDescriptionProps = BaseProps<HTMLHeadingElement> & {
  children: React.ReactNode | React.ReactNode[]
}

export const Description = forwardRef(
  ({className, children, ...props}: CTABannerDescriptionProps, ref: Ref<HTMLParagraphElement>) => {
    return (
      <Text ref={ref} className={clsx(styles.CTABannerDescription, className)} size={'400'} as="div" {...props}>
        {children}
      </Text>
    )
  }
)

export const CTABanner = Object.assign(Root, {Heading, Description})
