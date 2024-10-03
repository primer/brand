import React, {forwardRef, useCallback, useMemo, type Ref} from 'react'
import clsx from 'clsx'
import {Heading, Text, Stack, Link, LinkProps, StackProps} from '../'

/** * Main Stylesheet (as a CSS Module) */
import styles from './BreakoutBanner.module.css'
import {
  BreakoutBannerBackgroundColors,
  BreakoutBannerDescriptionProps,
  BreakoutBannerHeadingProps,
  BreakoutBannerProps,
} from './BreakoutBanner.types'

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
            {LeadingVisual && <div className={clsx(styles['BreakoutBanner-leadingVisual'])}>{LeadingVisual}</div>}
            {children}
          </div>
        </div>
      </div>
    )
  },
)

const defaultHeadingLevel = 'h3'

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
