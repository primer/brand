import React, {forwardRef, PropsWithChildren, useMemo} from 'react'
import {clsx} from 'clsx'
import {Button, ButtonBaseProps} from '../Button'
import {Heading, HeadingProps} from '../Heading'
import {Text, TextSizes, TextWeightVariants, ResponsiveWeightMap, TextProps} from '../Text'
import {Label, LabelProps} from '../Label'
import {Image, ImageProps} from '../Image'
import {Grid} from '../Grid'
import {Stack} from '../Stack'
import type {BaseProps} from '../component-helpers'
import {useBlinkingCursorAnimation} from '../hooks/useBlinkingCursorAnimation'

import {useProvidedRefOrCreate} from '../hooks/useRef'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/hero/base.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from './Hero.module.css'

const testIds = {
  root: 'Hero',
  get video() {
    return `${this.root}-video`
  },
}

export type HeroProps = BaseProps<HTMLElement> & {
  align?: 'start' | 'center'
  imageContainerClassName?: string
  imageContainerStyle?: React.CSSProperties
  imageBackgroundColor?: 'default' | 'subtle'
  variant?: 'default' | 'bordered-grid'
  /**
   * Escape-hatch for inserting custom React components.
   * Warning:
   *   This prop isn't advertised in our docs but remains part of the public API for edge-cases.
   *   Need to use this prop? Please check in with #primer-brand first to confirm correct usage.
   */
  trailingComponent?: React.FunctionComponent
  'data-testid'?: string
}

const Root = forwardRef<HTMLElement, PropsWithChildren<HeroProps>>(
  (
    {
      className,
      align = 'start',
      children,
      imageContainerClassName,
      imageContainerStyle,
      imageBackgroundColor,
      trailingComponent: TrailingComponent,
      'data-testid': testId,
      ...rest
    },
    ref,
  ) => {
    const {HeroActions, HeroChildren, HeroImageChild, HeroVideoChild} = useMemo(() => {
      const result = React.Children.toArray(children).reduce<{
        HeroActions: React.ReactElement[]
        HeroImageChild?: React.ReactElement<HeroImageProps>
        HeroVideoChild?: React.ReactElement<HeroVideoProps>
        HeroChildren: React.ReactElement[]
      }>(
        (acc, child) => {
          if (React.isValidElement(child)) {
            if (child.type === HeroPrimaryAction || child.type === HeroSecondaryAction) {
              acc.HeroActions.push(child)
            } else if (child.type === HeroImage) {
              acc.HeroImageChild = child as React.ReactElement<HeroImageProps>
            } else if (child.type === HeroVideo) {
              acc.HeroVideoChild = child as React.ReactElement<HeroVideoProps>
            } else {
              acc.HeroChildren.push(child)
            }
          }
          return acc
        },
        {HeroActions: [], HeroChildren: [], HeroImageChild: undefined, HeroVideoChild: undefined},
      )

      // Users shouldn't be able to have two types of media, prefer Hero.Image
      if (result.HeroImageChild && result.HeroVideoChild) {
        result.HeroVideoChild = undefined
      }

      return result
    }, [children])

    const mediaPosition = HeroImageChild?.props.position || HeroVideoChild?.props.position || 'block-end'
    const imageFullWidth = HeroImageChild?.props.fullWidth !== false
    const mediaChild = HeroImageChild || HeroVideoChild

    // When image has background color and is not fullWidth, render it outside the grid
    // so the background can span full width while the image stays constrained
    const renderImageOutsideGrid = imageBackgroundColor && !imageFullWidth && mediaPosition === 'block-end'

    const heroLayoutClass = HeroImageChild ? styles['Hero--layout-image'] : styles['Hero--layout-default']
    return (
      <section
        className={clsx(
          styles.Hero,
          mediaPosition !== 'inline-end' && styles[`Hero--align-${align}`],
          heroLayoutClass,
          (HeroImageChild || HeroVideoChild) && styles[`Hero--image-pos-${mediaPosition}`],
          className,
        )}
        ref={ref}
        aria-labelledby="hero-section-brand-heading"
        data-testid={testId || testIds.root}
        {...rest}
      >
        <Grid
          fullWidth={imageFullWidth}
          className={clsx(
            styles['Hero-grid'],
            styles[`Hero-grid--${mediaPosition}`],
            renderImageOutsideGrid && styles['Hero-grid--contained'],
          )}
        >
          <Grid.Column span={{medium: mediaChild && mediaPosition === 'inline-end' ? 6 : 12}}>
            <Stack
              direction="vertical"
              gap="none"
              padding="none"
              alignItems={mediaPosition === 'inline-end' || align === 'start' ? 'flex-start' : 'center'}
              justifyContent={mediaPosition === 'inline-end' ? undefined : align === 'start' ? 'flex-start' : 'center'}
            >
              {HeroChildren}
              {HeroActions.length > 0 && <div className={styles['Hero-actions']}>{HeroActions}</div>}
              {TrailingComponent && (
                <div className={styles['Hero-trailing']}>
                  <TrailingComponent />
                </div>
              )}
            </Stack>
          </Grid.Column>
          {mediaChild &&
            (renderImageOutsideGrid ? null : (
              <Grid.Column
                span={{medium: mediaPosition === 'inline-end' ? 6 : 12}}
                className={clsx(
                  imageContainerClassName,
                  imageBackgroundColor && styles[`Hero-imageContainer--bg-${imageBackgroundColor}`],
                )}
                style={imageContainerStyle}
              >
                {mediaChild}
              </Grid.Column>
            ))}
        </Grid>
        {mediaChild && renderImageOutsideGrid && (
          <div
            className={clsx(
              styles['Hero-imageWrapper'],
              imageContainerClassName,
              styles[`Hero-imageWrapper--bg-${imageBackgroundColor}`],
            )}
            style={imageContainerStyle}
          >
            {mediaChild}
          </div>
        )}
      </section>
    )
  },
)

type HeroHeadingProps = Omit<HeadingProps, 'as'> & {
  fullWidth?: boolean
}

const HeroHeading = forwardRef<HTMLHeadingElement, HeroHeadingProps>(({children, fullWidth = false, ...rest}, ref) => {
  return (
    <Heading
      id="hero-section-brand-heading"
      className={clsx(styles['Hero-heading'], fullWidth && styles['Hero-heading--fullWidth'])}
      as="h1"
      ref={ref}
      {...rest}
    >
      {children}
    </Heading>
  )
})

type HeroDescriptionProps = {
  size?: (typeof TextSizes)[number]
  weight?: TextWeightVariants | ResponsiveWeightMap
} & BaseProps<HTMLParagraphElement> &
  TextProps

const HeroDescription = forwardRef<HTMLParagraphElement, PropsWithChildren<HeroDescriptionProps>>(
  (
    {
      size = '350',
      weight = 'normal',
      children,
      variant = 'default',
      className,
    }: PropsWithChildren<HeroDescriptionProps>,
    ref,
  ) => {
    return (
      <Text
        ref={ref}
        className={clsx(styles['Hero-description'], className)}
        as="p"
        size={size}
        weight={weight}
        variant={variant}
      >
        {children}
      </Text>
    )
  },
)

type HeroImageProps = {
  position?: 'inline-end' | 'block-end'
  /**
   * When false, constrains the image to a maximum width and centers it.
   * When true (default), the image spans the full width of the container.
   */
  fullWidth?: boolean
} & ImageProps &
  BaseProps<HTMLImageElement>

const HeroImage = forwardRef<HTMLImageElement, HeroImageProps>(
  ({position = 'block-end', fullWidth = true, className, ...rest}: PropsWithChildren<HeroImageProps>, ref) => {
    return (
      <Image
        ref={ref}
        className={clsx(
          styles['Hero-image'],
          styles[`Hero-image--pos-${position}`],
          !fullWidth && styles['Hero-image--contained'],
          className,
        )}
        {...rest}
      />
    )
  },
)

type HeroVideoProps = {
  position?: 'inline-end' | 'block-end'
  'data-testid'?: string
} & PropsWithChildren<BaseProps<HTMLDivElement>>

const HeroVideo = forwardRef<HTMLDivElement, HeroVideoProps>(
  ({className, children, 'data-testid': testId, ...rest}: HeroVideoProps, ref) => {
    const containerRef = useProvidedRefOrCreate(ref as React.RefObject<HTMLDivElement>)

    return (
      <div
        className={clsx(styles['Hero-video'], className)}
        ref={containerRef}
        data-testid={testId || testIds.video}
        {...rest}
      >
        {children}
      </div>
    )
  },
)

type HeroEyebrowProps = PropsWithChildren<BaseProps<HTMLDivElement>>

const HeroEyebrow = forwardRef<HTMLDivElement, HeroEyebrowProps>(
  ({children, className, ...rest}: PropsWithChildren<HeroEyebrowProps>, ref) => {
    return (
      <div ref={ref} className={clsx(styles['Hero-eyebrow'], className)} {...rest}>
        {children}
      </div>
    )
  },
)

type HeroLabelProps = Omit<TextProps, 'as' | 'ref' | 'animate'> &
  Omit<BaseProps<HTMLSpanElement>, 'animate'> & {
    /**
     * The animation effect to apply to the label
     * - 'blinking-cursor': Text appears letter by letter with a blinking cursor at the end
     * - undefined: No animation, static cursor shown
     */
    animation?: 'blinking-cursor'
  }

const HeroLabel = forwardRef<HTMLSpanElement, HeroLabelProps>(
  ({children, className, animation, ...rest}: PropsWithChildren<HeroLabelProps>, ref) => {
    const text = typeof children === 'string' ? children : ''
    const {displayedText, showCursor, shouldBlink} = useBlinkingCursorAnimation({
      text,
      animation,
    })

    return (
      <Text
        font="monospace"
        weight="medium"
        as="span"
        size="100"
        variant="muted"
        ref={ref}
        className={clsx(styles['Hero-label'], className)}
        {...rest}
      >
        {text && animation !== undefined ? (
          // Render placeholder text invisibly to maintain full width during animation
          // This prevents text from jumping when center-aligned
          <span className={styles['Hero-label-inner']}>
            <span className={styles['Hero-label-placeholder']} aria-hidden="true">
              {text}
            </span>
            <span className={styles['Hero-label-text']}>
              {displayedText}
              {showCursor && (
                <span
                  className={clsx(styles['Hero-label-cursor'], shouldBlink && styles['Hero-label-cursor--blink'])}
                  aria-hidden="true"
                />
              )}
            </span>
          </span>
        ) : (
          <>
            {text ? displayedText : children}
            {showCursor && (
              <span
                className={clsx(styles['Hero-label-cursor'], shouldBlink && styles['Hero-label-cursor--blink'])}
                aria-hidden="true"
              />
            )}
          </>
        )}
      </Text>
    )
  },
)

type RestrictedPolymorphism =
  | (BaseProps<HTMLAnchorElement> & {as?: 'a'})
  | (BaseProps<HTMLButtonElement> & {as?: 'button'})

type HeroActions = {
  as?: 'a' | 'button'
  href: string
} & ButtonBaseProps &
  RestrictedPolymorphism

const HeroPrimaryAction = forwardRef<HTMLAnchorElement | HTMLButtonElement, PropsWithChildren<HeroActions>>(
  ({href, as = 'a', children, ...rest}, ref) => {
    return (
      <Button ref={ref as React.Ref<HTMLButtonElement>} as={as} variant="primary" size="medium" href={href} {...rest}>
        {children}
      </Button>
    )
  },
)

const HeroSecondaryAction = forwardRef<HTMLAnchorElement | HTMLButtonElement, PropsWithChildren<HeroActions>>(
  ({href, as = 'a', children, ...rest}, ref) => {
    return (
      <Button ref={ref as React.Ref<HTMLButtonElement>} as={as} variant="secondary" size="medium" href={href} {...rest}>
        {children}
      </Button>
    )
  },
)

export const Hero = Object.assign(Root, {
  Heading: HeroHeading,
  Description: HeroDescription,
  PrimaryAction: HeroPrimaryAction,
  SecondaryAction: HeroSecondaryAction,
  Image: HeroImage,
  Video: HeroVideo,
  Label: HeroLabel,
  Eyebrow: HeroEyebrow,
  testIds,
})
