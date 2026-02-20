import React, {forwardRef, useCallback, useMemo, type Ref} from 'react'
import {clsx} from 'clsx'
import type {BaseProps} from '../component-helpers'
import {Grid} from '../Grid'
import {Heading, HeadingProps} from '../Heading'
import {Text, TextProps} from '../Text'
import {ButtonGroup} from '../ButtonGroup'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/cta-banner/colors-with-modes.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from './CTABanner.module.css'
import {Image} from '../Image'

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
     * Alternative presentations
     */
    variant?: 'default' | 'balanced' | 'minimal'
    /**
     * The alignment of the content within the banner.
     */
    align?: 'start' | 'center'
    /**
     * A flag to add a border to the banner.
     */
    hasBorder?: boolean
    /**
     * Enable GridLines. Complimentary to hasBorder and can be used together with it.
     */
    hasGridLines?: boolean
    /**
     * A flag to remove the shadow from the banner.
     * @deprecated - hasShadow will be removed in a future release.
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
    leadingComponent?: React.FunctionComponent
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
      align = 'center',
      hasBorder = false,
      hasGridLines = false,
      hasShadow = false,
      hasBackground = true,
      backgroundColor = 'var(--brand-CTABanner-bgColor)',
      backgroundImageSrc,
      backgroundImagePosition = 'center',
      backgroundImageSize = 'cover',
      className,
      children,
      leadingComponent: LeadingComponent,
      trailingComponent: TrailingComponent,
      style,
      variant = 'default',
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

    const {ImageChild, ButtonGroupChild, restChildren, hasImageChild} = useMemo(() => {
      const result = React.Children.toArray(children).reduce<{
        ImageChild?: React.ReactElement
        ButtonGroupChild?: React.ReactElement
        restChildren: React.ReactElement[]
        hasImageChild: boolean
      }>(
        (acc, child) => {
          if (React.isValidElement(child)) {
            if (child.type === _Image) {
              acc.hasImageChild = true
              if (variant === 'balanced') {
                acc.ImageChild = child
              } else if (variant !== 'minimal') {
                acc.restChildren.push(child)
              }
              // minimal variant: image is intentionally excluded from rendering
            } else if (variant === 'minimal' && child.type === _ButtonGroup) {
              acc.ButtonGroupChild = child
            } else {
              acc.restChildren.push(child)
            }
          }
          return acc
        },
        {ImageChild: undefined, ButtonGroupChild: undefined, restChildren: [], hasImageChild: false},
      )
      return result
    }, [children, variant])

    const hasSideColumn = (variant === 'balanced' && ImageChild) || (variant === 'minimal' && ButtonGroupChild)

    const Tag: React.FC<React.PropsWithChildren> = hasGridLines
      ? ({children: inner}) => <div className={styles['CTABanner-outer-container--border']}>{inner}</div>
      : React.Fragment

    const defaultAlign = variant === 'balanced' || variant === 'minimal' ? 'start' : align

    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
      if (variant === 'balanced' && !ImageChild) {
        // eslint-disable-next-line no-console
        console.warn(
          'CTABanner: The "balanced" variant requires a CTABanner.Image child to display the two-column layout correctly.',
        )
      }
      if (variant === 'minimal' && hasImageChild) {
        // eslint-disable-next-line no-console
        console.warn('CTABanner: Image child is not supported in minimal variant and will not be rendered.')
      }
    }

    return (
      <Tag>
        <section
          ref={ref}
          className={clsx(
            styles.CTABanner,
            hasShadow && styles['CTABanner--shadow'],
            styles[`CTABanner--variant-${variant}`],
            className,
          )}
          style={{...backgroundStyles, ...style}}
          {...props}
        >
          <div
            className={clsx(
              styles['CTABanner-container'],
              hasBorder && styles['CTABanner-container--border'],
              hasGridLines && styles['CTABanner-container--border-gridlines'],
              hasBackground && styles['CTABanner-container--background'],
            )}
          >
            {hasSideColumn ? (
              <Grid className={styles['CTABanner-grid']}>
                <Grid.Column span={{xsmall: 12, large: 6}} className={styles['CTABanner-grid-column--primary']}>
                  <div
                    className={clsx(
                      styles['CTABanner-content'],
                      defaultAlign === 'center' && styles['CTABanner-content--center'],
                    )}
                  >
                    {LeadingComponent && <LeadingComponent />}
                    {restChildren}
                    {TrailingComponent && <TrailingComponent />}
                  </div>
                </Grid.Column>
                <Grid.Column span={{xsmall: 12, large: 6}} className={styles['CTABanner-grid-column--secondary']}>
                  {ImageChild || ButtonGroupChild}
                </Grid.Column>
              </Grid>
            ) : (
              <div
                className={clsx(
                  styles['CTABanner-content'],
                  defaultAlign === 'center' && styles['CTABanner-content--center'],
                )}
              >
                {LeadingComponent && <LeadingComponent />}
                {restChildren}
                {TrailingComponent && <TrailingComponent />}
              </div>
            )}
          </div>
        </section>
      </Tag>
    )
  },
)

const defaultHeadingLevel = 'h3'

type CTABannerHeadingProps = BaseProps<HTMLHeadingElement> & {
  children: React.ReactNode | React.ReactNode[]
} & HeadingProps

const defaultHeadingSize = '3'

const _Heading = forwardRef(
  (
    {as = defaultHeadingLevel, size = defaultHeadingSize, className, children, ...props}: CTABannerHeadingProps,
    ref: Ref<HTMLHeadingElement>,
  ) => {
    return (
      <Heading ref={ref} className={clsx(styles['CTABanner-heading'], className)} size={size} as={as} {...props}>
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

type CTABannerImageProps = BaseProps<HTMLImageElement> & {
  src: string
  alt: string
}

const _Image = forwardRef(({className, src, alt, ...props}: CTABannerImageProps, ref: Ref<HTMLImageElement>) => {
  return (
    <Image
      ref={ref}
      className={clsx(styles['CTABanner-image'], className)}
      src={src}
      alt={alt}
      borderRadius="medium"
      {...props}
    />
  )
})

export const CTABanner = Object.assign(Root, {Heading: _Heading, Description, ButtonGroup: _ButtonGroup, Image: _Image})
