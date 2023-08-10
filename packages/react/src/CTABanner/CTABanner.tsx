import React, {forwardRef, type Ref} from 'react'
import clsx from 'clsx'
import type {BaseProps} from '../component-helpers'
import {Heading, HeadingProps} from '../Heading'
import {Text} from '../Text'
import {ButtonGroup} from '../ButtonGroup'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/cta-banner/colors-with-modes.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from './CTABanner.module.css'

export type CTABannerProps = BaseProps<HTMLElement> & {
  children: React.ReactNode | React.ReactNode[]
  align?: 'start' | 'center'
  hasBorder?: boolean
  hasShadow?: boolean
  hasBackground?: boolean
}

const Root = forwardRef(
  (
    {
      /**
       * The alignment of the content within the banner.
       */
      align = 'start',
      /**
       * A flag to add a border to the banner.
       */
      hasBorder = false,
      /**
       * A flag to remove the shadow from the banner.
       */
      hasShadow = true,
      /**
       * A flag to remove the background from the banner.
       */
      hasBackground = true,
      /**
       * Forward a custom HTML class attribute to the root element.
       */
      className,
      /**
       * React.ReactNode and React.ReactNode[] are valid children.
       */
      children,
      ...props
    }: CTABannerProps,
    ref: Ref<HTMLElement>,
  ) => {
    return (
      <section
        ref={ref}
        className={clsx(styles.CTABanner, hasShadow && styles['CTABanner--shadow'], className)}
        {...props}
      >
        <div
          className={clsx(
            styles['CTABanner-container'],
            hasBorder && styles['CTABanner-container--border'],
            hasBackground && styles['CTABanner-container--background'],
          )}
        >
          <div className={clsx(styles['CTABanner-content'], align === 'center' && styles['CTABanner-content--center'])}>
            {children}
          </div>
        </div>
      </section>
    )
  },
)

const defaultHeadingLevel = 'h3'

type CTABannerHeadingProps = BaseProps<HTMLHeadingElement> & {
  children: React.ReactNode | React.ReactNode[]
} & HeadingProps

const defaultHeadingSize = '1'

const _Heading = forwardRef(
  (
    {as = defaultHeadingLevel, size = defaultHeadingSize, className, children, ...props}: CTABannerHeadingProps,
    ref: Ref<HTMLHeadingElement>,
  ) => {
    return (
      <Heading ref={ref} className={className} size={size} as={as} {...props}>
        {children}
      </Heading>
    )
  },
)

type CTABannerDescriptionProps = BaseProps<HTMLParagraphElement> & {
  children: React.ReactNode | React.ReactNode[]
}

const Description = forwardRef(
  ({className, children, ...props}: CTABannerDescriptionProps, ref: Ref<HTMLParagraphElement>) => {
    return (
      <Text ref={ref} className={clsx(styles['CTABanner-description'], className)} as="p" {...props}>
        {children}
      </Text>
    )
  },
)

const _ButtonGroup = forwardRef(
  (
    {className, buttonSize = 'medium', buttonsAs, children, ...props}: React.ComponentProps<typeof ButtonGroup>,
    ref: Ref<HTMLDivElement>,
  ) => {
    return (
      <ButtonGroup buttonSize={buttonSize} buttonsAs={buttonsAs} className={className} ref={ref} {...props}>
        {children}
      </ButtonGroup>
    )
  },
)

export const CTABanner = Object.assign(Root, {Heading: _Heading, Description, ButtonGroup: _ButtonGroup})
