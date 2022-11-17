import React, {forwardRef, type Ref} from 'react'
import clsx from 'clsx'
import type {BaseProps} from '../component-helpers'
import {Heading} from '../Heading'
import {Text} from '../Text'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/cta-banner/colors-with-modes.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from './CTABanner.module.css'

export type CTABannerProps = BaseProps<HTMLDivElement> & {
  children: React.ReactNode | React.ReactNode[]
  align?: 'start' | 'center'
  hasBorder?: boolean
  hasShadow?: boolean
  hasBackground?: boolean
}

export const Root = forwardRef(
  (
    {
      align = 'start',
      hasBorder = false,
      hasShadow = true,
      hasBackground = true,
      className,
      children,
      ...props
    }: CTABannerProps,
    ref: Ref<HTMLDivElement>
  ) => {
    return (
      <section ref={ref} className={styles.CTABanner} {...props}>
        {hasShadow && (
          <>
            <div aria-hidden className={clsx(styles['CTABanner--Shadow'], styles['CTABanner--StartShadow'])} />
            <div aria-hidden className={clsx(styles['CTABanner--Shadow'], styles['CTABanner--EndShadow'])} />
          </>
        )}
        <div
          className={clsx(
            styles['CTABanner-content'],
            hasBorder && styles['CTABanner-content--border'],
            !hasShadow || (!hasBackground && styles['CTABanner-content--noshadow']),
            align === 'center' && styles['CTABanner-content--center']
          )}
        >
          {children}
        </div>
      </section>
    )
  }
)

export const CTABannerHeadingTags = ['h1', 'h2'] as const

export type CTABannerHeadingProps = BaseProps<HTMLHeadingElement> & {
  children: React.ReactNode | React.ReactNode[]
  as?: typeof CTABannerHeadingTags[number]
}

export const _Heading = forwardRef(
  (
    {as = CTABannerHeadingTags[1], className, children, ...props}: CTABannerHeadingProps,
    ref: Ref<HTMLHeadingElement>
  ) => {
    return (
      <Heading ref={ref} {...props} className={className} as={as}>
        {children}
      </Heading>
    )
  }
)

export type CTABannerDescriptionProps = BaseProps<HTMLHeadingElement> & {
  children: React.ReactNode | React.ReactNode[]
}

export const Description = forwardRef(
  ({className, children, ...props}: CTABannerDescriptionProps, ref: Ref<HTMLParagraphElement>) => {
    return (
      <Text ref={ref} className={clsx(styles['CTABanner-description'], className)} size={'400'} as="div" {...props}>
        {children}
      </Text>
    )
  }
)

export const CTABanner = Object.assign(Root, {Heading: _Heading, Description})
