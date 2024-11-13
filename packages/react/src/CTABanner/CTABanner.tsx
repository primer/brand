import React, {forwardRef, useCallback, useMemo, type Ref} from 'react'
import clsx from 'clsx'
import type {BaseProps} from '../component-helpers'
import {Heading, HeadingProps} from '../Heading'
import {Text, TextProps} from '../Text'
import {ButtonGroup} from '../ButtonGroup'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/cta-banner/colors-with-modes.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from './CTABanner.module.css'

export const CTABannerBackgroundColors = ['default', 'subtle'] as const

type ResponsiveMap<T> = {
  narrow?: T
  regular?: T
  wide?: T
}

type ResponsiveBackgroundImageSrcMap = ResponsiveMap<string | string[]>
type BackgroundColors = (typeof CTABannerBackgroundColors)[number] | AnyString
type ResponsiveBackgroundColorMap = ResponsiveMap<BackgroundColors>
type ResponsiveBackgroundImagePositionMap = ResponsiveMap<string | string[]>
type ResponsiveBackgroundImageSizeMap = ResponsiveMap<string | string[]>

export type CTABannerProps = BaseProps<HTMLElement> &
  React.HTMLAttributes<HTMLElement> & {
    /**
     * The alignment of the content within the banner.
     */
    align?: 'start' | 'center'
    /**
     * A flag to add a border to the banner.
     */
    hasBorder?: boolean
    /**
     * A flag to remove the shadow from the banner.
     */
    hasShadow?: boolean
    /**
     * A flag to remove the background from the banner.
     */
    hasBackground?: boolean
    /**
     * Optional, custom background color.
     */
    backgroundColor?: BackgroundColors | ResponsiveBackgroundColorMap
    /**
     * Optional, custom background image.
     */
    backgroundImageSrc?: string | ResponsiveBackgroundImageSrcMap
    /**
     * Optional, custom background position.
     */
    backgroundImagePosition?: string | ResponsiveBackgroundImagePositionMap
    /**
     * Optional, custom background size.
     */
    backgroundImageSize?: string | ResponsiveBackgroundImageSizeMap
    /**
     * Escape-hatch for inserting custom React components.
     * Warning:
     *   This prop isn't advertised in our docs but remains part of the public API for edge-cases.
     *   Need to use this prop? Please check in with #primer-brand first to confirm correct usage.
     */
    trailingComponent?: React.FunctionComponent
  }

const Root = forwardRef(
  (
    {
      align = 'start',
      hasBorder = false,
      hasShadow = true,
      hasBackground = true,
      backgroundColor = 'var(--brand-CTABanner-bgColor)',
      backgroundImageSrc,
      backgroundImagePosition = 'center',
      backgroundImageSize = 'cover',
      className,
      children,
      trailingComponent: TrailingComponent,
      style,
      ...props
    }: CTABannerProps,
    ref: Ref<HTMLElement>,
  ) => {
    const processBackgroundValue = useCallback((value: string | string[], property) => {
      if (property === 'background-image-src') {
        return `url(${value})`
      }

      if (property === 'background-color' && typeof value === 'string') {
        return CTABannerBackgroundColors.includes(value as (typeof CTABannerBackgroundColors)[number])
          ? `var(--brand-color-canvas-${value})`
          : value
      }

      return value
    }, [])

    const createStyles = useCallback(
      (property, value) =>
        typeof value === 'string' || Array.isArray(value)
          ? {[`--brand-CTABanner-${property}`]: processBackgroundValue(value, property)}
          : {
              [`--brand-CTABanner-narrow-${property}`]: processBackgroundValue(value?.narrow, property),
              [`--brand-CTABanner-regular-${property}`]: processBackgroundValue(value?.regular, property),
              [`--brand-CTABanner-wide-${property}`]: processBackgroundValue(value?.wide, property),
            },
      [processBackgroundValue],
    )

    const backgroundStyles = useMemo(() => {
      const allStyles = {}

      const addStyle = (property, value) => {
        if (value) {
          Object.assign(allStyles, createStyles(property, value))
        }
      }

      addStyle('background-color', backgroundColor)
      addStyle('background-image-src', backgroundImageSrc)
      addStyle('background-image-position', backgroundImagePosition)
      addStyle('background-image-size', backgroundImageSize)

      return allStyles
    }, [backgroundColor, backgroundImageSrc, backgroundImagePosition, backgroundImageSize, createStyles])

    return (
      <section
        ref={ref}
        className={clsx(styles.CTABanner, hasShadow && styles['CTABanner--shadow'], className)}
        style={{...backgroundStyles, ...style}}
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
            {TrailingComponent && <TrailingComponent />}
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

type CTABannerDescriptionProps = React.HtmlHTMLAttributes<HTMLParagraphElement> &
  BaseProps<HTMLParagraphElement> & {
    variant?: TextProps['variant']
  }

const Description = forwardRef(
  ({className, children, variant = 'muted', ...props}: CTABannerDescriptionProps, ref: Ref<HTMLParagraphElement>) => {
    return (
      <Text ref={ref} className={clsx(styles['CTABanner-description'], className)} as="p" variant={variant} {...props}>
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
