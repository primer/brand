import React, {forwardRef, PropsWithChildren, useMemo} from 'react'
import clsx from 'clsx'
import styles from './Hero.module.css'
import {Button, ButtonBaseProps} from '../Button'
import {Heading, HeadingProps} from '../Heading'
import {Text, TextSizes, TextWeightVariants, ResponsiveWeightMap, TextProps} from '../Text'
import {Label, LabelProps} from '../Label'
import {Image, ImageProps} from '../Image'
import {Grid} from '../Grid'
import {Stack} from '../Stack'

import type {BaseProps} from '../component-helpers'

import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/hero/base.css'

export type HeroProps = BaseProps<HTMLElement> & {
  align?: 'start' | 'center'
  imageContainerClassName?: string
  imageContainerStyle?: React.CSSProperties
  /**
   * Escape-hatch for inserting custom React components.
   * Warning:
   *   This prop isn't advertised in our docs but remains part of the public API for edge-cases.
   *   Need to use this prop? Please check in with #primer-brand first to confirm correct usage.
   */
  trailingComponent?: React.FunctionComponent
}

const Root = forwardRef<HTMLElement, PropsWithChildren<HeroProps>>(
  (
    {
      className,
      align = 'start',
      children,
      imageContainerClassName,
      imageContainerStyle,
      trailingComponent: TrailingComponent,
      ...rest
    },
    ref,
  ) => {
    const {HeroActions, HeroChildren, HeroImageChild} = useMemo(
      () =>
        React.Children.toArray(children).reduce<{
          HeroActions: React.ReactElement[]
          HeroImageChild?: React.ReactElement
          HeroChildren: React.ReactElement[]
        }>(
          (acc, child) => {
            if (React.isValidElement(child)) {
              if (child.type === HeroPrimaryAction || child.type === HeroSecondaryAction) {
                acc.HeroActions.push(child)
              } else if (child.type === HeroImage) {
                acc.HeroImageChild = child
              } else {
                acc.HeroChildren.push(child)
              }
            }
            return acc
          },
          {HeroActions: [], HeroChildren: [], HeroImageChild: undefined},
        ),
      [children],
    )

    const imagePosition = HeroImageChild?.props?.position || 'block-end'

    const heroLayoutClass = HeroImageChild ? styles['Hero--layout-image'] : styles['Hero--layout-default']
    return (
      <section
        className={clsx(
          styles.Hero,
          imagePosition !== 'inline-end' && styles[`Hero--align-${align}`],
          heroLayoutClass,
          HeroImageChild && styles[`Hero--image-pos-${imagePosition}`],
          className,
        )}
        ref={ref}
        aria-labelledby="hero-section-brand-heading"
        {...rest}
      >
        <Grid fullWidth className={clsx(styles['Hero-grid'], styles[`Hero-grid--${imagePosition}`])}>
          <Grid.Column span={{medium: HeroImageChild && imagePosition === 'inline-end' ? 6 : 12}}>
            <Stack
              direction="vertical"
              gap="none"
              padding="none"
              alignItems={imagePosition === 'inline-end' || align === 'start' ? 'flex-start' : 'center'}
              justifyContent={imagePosition === 'inline-end' ? undefined : align === 'start' ? 'flex-start' : 'center'}
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
          {HeroImageChild && (
            <Grid.Column
              span={{medium: imagePosition === 'inline-end' ? 6 : 12}}
              className={imageContainerClassName}
              style={{...imageContainerStyle}}
            >
              {HeroImageChild}
            </Grid.Column>
          )}
        </Grid>
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
  ({size = '200', weight, children, variant = 'default', className}: PropsWithChildren<HeroDescriptionProps>, ref) => {
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
} & ImageProps &
  BaseProps<HTMLImageElement>

const HeroImage = forwardRef<HTMLImageElement, HeroImageProps>(
  ({position = 'block-end', className, ...rest}: PropsWithChildren<HeroImageProps>, ref) => {
    return (
      <Image
        ref={ref}
        className={clsx(styles['Hero-image'], styles[`Hero-image--pos-${position}`], className)}
        {...rest}
      />
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

type HeroLabelProps = LabelProps & BaseProps<HTMLSpanElement>

const HeroLabel = forwardRef<HTMLSpanElement, HeroLabelProps>(
  ({children, className, ...rest}: PropsWithChildren<HeroLabelProps>, ref) => {
    return (
      <Label ref={ref} className={clsx(styles['Hero-label'], className)} {...rest}>
        {children}
      </Label>
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
      <Button as={as} variant="primary" size="medium" href={href} {...rest} ref={ref as React.Ref<HTMLButtonElement>}>
        {children}
      </Button>
    )
  },
)

const HeroSecondaryAction = forwardRef<HTMLAnchorElement | HTMLButtonElement, PropsWithChildren<HeroActions>>(
  ({href, as = 'a', children, ...rest}, ref) => {
    return (
      <Button as={as} variant="secondary" size="medium" href={href} {...rest} ref={ref as React.Ref<HTMLButtonElement>}>
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
  Label: HeroLabel,
  Eyebrow: HeroEyebrow,
})
