import React, {forwardRef, ReactElement, useCallback, useMemo, type Ref} from 'react'
import clsx from 'clsx'
import {Icon} from '@primer/octicons-react'

import type {BaseProps} from '../component-helpers'
import {Heading, HeadingProps, Text, Stack, Link, LinkProps, StackProps} from '../'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/cta-banner/colors-with-modes.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from './BreakoutBanner.module.css'

type ResponsiveMap<T> = {
  narrow?: T
  regular?: T
  wide?: T
}

export const BreakoutBannerBackgroundColors = ['default', 'subtle'] as const

type ResponsiveBackgroundImageSrcMap = ResponsiveMap<string | string[]>
type BackgroundColors = (typeof BreakoutBannerBackgroundColors)[number] | string
type ResponsiveBackgroundColorMap = ResponsiveMap<BackgroundColors>
type ResponsiveBackgroundImagePositionMap = ResponsiveMap<string | string[]>
type ResponsiveBackgroundImageSizeMap = ResponsiveMap<string | string[]>

export type BreakoutBannerProps = BaseProps<HTMLDivElement> &
  React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode | React.ReactNode[]
    /**
     * The alignment of the content within the banner
     */
    align?: 'start' | 'center'
    /**
     * Optional, custom background color
     */
    backgroundColor?: BackgroundColors | ResponsiveBackgroundColorMap
    /**
     * Optional, custom background image
     */
    backgroundImageSrc?: string | string[] | ResponsiveBackgroundImageSrcMap
    /**
     * Optional, custom background position
     */
    backgroundImagePosition?: string | string[] | ResponsiveBackgroundImagePositionMap
    /**
     * Optional, custom background position size
     */
    backgroundImageSize?: string | string[] | ResponsiveBackgroundImageSizeMap
    /**
     * The leading visual appears before the button content
     */
    leadingVisual?: ReactElement | Icon
  }

const Root = forwardRef(
  (
    {
      align = 'start',
      backgroundColor = 'subtle',
      backgroundImageSrc,
      backgroundImagePosition = '50%',
      backgroundImageSize = 'cover',
      className,
      children,
      style,
      leadingVisual: LeadingVisual,
      ...props
    }: BreakoutBannerProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    const processBackgroundValue = useCallback((value: string | string[], property) => {
      if (property === 'background-image-src') {
        return `url(${value})`
      }

      if (property === 'background-color' && typeof value === 'string') {
        return BreakoutBannerBackgroundColors.includes(value as (typeof BreakoutBannerBackgroundColors)[number])
          ? `var(--brand-color-canvas-${value})`
          : value
      }

      return value
    }, [])

    const createStyles = useCallback(
      (property, value) =>
        typeof value === 'string' || Array.isArray(value)
          ? {[`--brand-BreakoutBanner-${property}`]: processBackgroundValue(value, property)}
          : {
              [`--brand-BreakoutBanner-narrow-${property}`]: processBackgroundValue(value?.narrow, property),
              [`--brand-BreakoutBanner-regular-${property}`]: processBackgroundValue(value?.regular, property),
              [`--brand-BreakoutBanner-wide-${property}`]: processBackgroundValue(value?.wide, property),
            },
      [processBackgroundValue],
    )

    const backgroundStyles = useMemo(
      () => ({
        ...createStyles('background-color', backgroundColor),
        ...createStyles('background-image-src', backgroundImageSrc),
        ...createStyles('background-image-position', backgroundImagePosition),
        ...createStyles('background-image-size', backgroundImageSize),
      }),
      [backgroundColor, backgroundImageSrc, backgroundImagePosition, backgroundImageSize, createStyles],
    )

    return (
      <div
        ref={ref}
        className={clsx(styles.BreakoutBanner, className)}
        style={{...backgroundStyles, ...style}}
        {...props}
      >
        <div className={clsx(styles['BreakoutBanner-container'])}>
          <div
            className={clsx(
              styles['BreakoutBanner-content'],
              align === 'center' && styles['BreakoutBanner-content--center'],
            )}
          >
            {LeadingVisual && <div className={clsx(styles['BreakoutBanner-leadingVisual'])}>{LeadingVisual}</div>}
            {children}
          </div>
        </div>
      </div>
    )
  },
)

const defaultHeadingLevel = 'h3'

type BreakoutBannerHeadingProps = BaseProps<HTMLHeadingElement> & {
  children: React.ReactNode | React.ReactNode[]
} & HeadingProps

const defaultHeadingSize = '4'

const _Heading = forwardRef(
  (
    {as = defaultHeadingLevel, size = defaultHeadingSize, className, children, ...props}: BreakoutBannerHeadingProps,
    ref: Ref<HTMLHeadingElement>,
  ) => {
    return (
      <Heading ref={ref} className={clsx(styles['BreakoutBanner__heading'], className)} size={size} as={as} {...props}>
        {children}
      </Heading>
    )
  },
)

type BreakoutBannerDescriptionProps = BaseProps<HTMLParagraphElement> & {
  children: React.ReactNode | React.ReactNode[]
}

const Description = forwardRef(
  ({className, children, ...props}: BreakoutBannerDescriptionProps, ref: Ref<HTMLParagraphElement>) => {
    return (
      <Text ref={ref} className={clsx(styles['BreakoutBanner-description'], className)} as="p" {...props}>
        {children}
      </Text>
    )
  },
)

type LinkGroupProps = React.ComponentProps<typeof Stack>

const _LinkGroup = forwardRef(
  ({className, direction, gap, padding, children, ...props}: LinkGroupProps, ref: Ref<HTMLDivElement>) => {
    const linksToRender = React.Children.toArray(children)
      .map((child, index) => {
        if (React.isValidElement(child) && typeof child.type !== 'string' && child.type === Link) {
          return React.cloneElement(child, {
            size: child.props.size || 'medium',
            variant: child.props.variant || 'accent',
            arrowDirection: child.props.arrowDirection || index === 0 ? 'end' : 'none',
            ...child.props,
          } as LinkProps)
        }
      })
      .filter(Boolean)
      .slice(0, 2)

    const defaultProps: Partial<StackProps> =
      direction === 'vertical'
        ? {
            gap: 'condensed',
            direction: 'vertical',
            alignItems: 'flex-start',
          }
        : {
            gap: gap || {narrow: 'normal', regular: 'spacious'},
            direction: direction || {narrow: 'vertical', regular: 'horizontal'},
          }

    return (
      <Stack
        padding={padding || 'none'}
        className={clsx(styles['BreakoutBanner-linkGroup'], className)}
        ref={ref}
        {...defaultProps}
        {...props}
      >
        {linksToRender}
      </Stack>
    )
  },
)

export const BreakoutBanner = Object.assign(Root, {Heading: _Heading, Description, LinkGroup: _LinkGroup})
