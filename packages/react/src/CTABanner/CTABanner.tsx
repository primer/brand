import React, {forwardRef, type Ref} from 'react'
import clsx from 'clsx'
import type {BaseProps} from '../component-helpers'
import {Heading, HeadingTags} from '../Heading'
import {Text} from '../Text'
import {ButtonGroup} from '../ButtonGroup'

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
      <section ref={ref} className={clsx(styles.CTABanner, hasShadow && styles['CTABanner--shadow'])} {...props}>
        <div
          className={clsx(
            styles['CTABanner-container'],
            hasBorder && styles['CTABanner-container--border'],
            hasBackground && styles['CTABanner-container--background']
          )}
        >
          <div className={clsx(styles['CTABanner-content'], align === 'center' && styles['CTABanner-content--center'])}>
            {children}
          </div>
        </div>
      </section>
    )
  }
)

type CTABannerHeadingProps = BaseProps<HTMLHeadingElement> & {
  children: React.ReactNode | React.ReactNode[]
} & HeadingTags

const defaultHeadingTag = HeadingTags[2]
const defaultHeadingSize = '2'

export const _Heading = forwardRef(
  (
    {as = defaultHeadingTag, size = defaultHeadingSize, className, children, ...props}: CTABannerHeadingProps,
    ref: Ref<HTMLHeadingElement>
  ) => {
    return (
      <Heading ref={ref} className={className} size={size} as={as} {...props}>
        {children}
      </Heading>
    )
  }
)

type CTABannerDescriptionProps = BaseProps<HTMLParagraphElement> & {
  children: React.ReactNode | React.ReactNode[]
}

export const Description = forwardRef(
  ({className, children, ...props}: CTABannerDescriptionProps, ref: Ref<HTMLParagraphElement>) => {
    return (
      <Text ref={ref} className={clsx(styles['CTABanner-description'], className)} size={'400'} as="p" {...props}>
        {children}
      </Text>
    )
  }
)

const _ButtonGroup = forwardRef(
  ({className, buttonSize = 'large', buttonsAs, children, ...props}: React.ComponentProps<typeof ButtonGroup>) => {
    return (
      <ButtonGroup buttonSize={buttonSize} buttonsAs={buttonsAs} className={className} {...props}>
        {children}
      </ButtonGroup>
    )
  }
)

export const CTABanner = Object.assign(Root, {Heading: _Heading, Description, ButtonGroup: _ButtonGroup})
