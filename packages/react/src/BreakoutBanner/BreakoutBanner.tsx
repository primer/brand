import React, {forwardRef, ReactElement, useCallback, useMemo, type Ref} from 'react'
import {clsx} from 'clsx'
import type {Icon} from '@primer/octicons-react'

import type {BaseProps} from '../component-helpers'
import {Heading, HeadingProps, Text, Stack, Link, LinkProps, StackProps} from '../'

/** * Main Stylesheet (as a CSS Module) */
import styles from './BreakoutBanner.module.css'

type ResponsiveMap<T> = {
  narrow?: T
  regular?: T
  wide?: T
}

export const BreakoutBannerBackgroundColors = ['default', 'subtle'] as const

type ResponsiveBackgroundImageSrcMap = ResponsiveMap<string | string[]>
type BackgroundColors = (typeof BreakoutBannerBackgroundColors)[number] | AnyString
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
    backgroundImageSrc?: string | ResponsiveBackgroundImageSrcMap
    /**
     * Optional, custom background position
     */
    backgroundImagePosition?: string | ResponsiveBackgroundImagePositionMap
    /**
     * Optional, custom background size
     */
    backgroundImageSize?: string | ResponsiveBackgroundImageSizeMap
    /**
     * An optional leading visual that appears before the heading
     */
    leadingVisual?: ReactElement | Icon
  }

const Root = forwardRef(
  (
    {
      align = 'start',
      backgroundColor = 'subtle',
      backgroundImageSrc,
      backgroundImagePosition = 'center',
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

    const hasHeading = useMemo(
      () => React.Children.toArray(children).some(child => React.isValidElement(child) && child.type === _Heading),
      [children],
    )

    if (!hasHeading && (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test')) {
      // eslint-disable-next-line no-console
      console.warn('The `BreakoutBanner` component expects a `BreakoutBanner.Heading` element to be specified.')
    }

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
            {LeadingVisual && (
              <div className={clsx(styles['BreakoutBanner-leadingVisual'])}>
                {typeof LeadingVisual === 'function' ? <LeadingVisual /> : LeadingVisual}
              </div>
            )}
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
      <Text
        ref={ref}
        as="p"
        variant="muted"
        className={clsx(styles['BreakoutBanner-description'], className)}
        {...props}
      >
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

/**
 * Breakout banner component
 * {@link https://primer.style/brand/components/BreakoutBanner/ See usage examples}.
 */
export const BreakoutBanner = Object.assign(Root, {Heading: _Heading, Description, LinkGroup: _LinkGroup})
