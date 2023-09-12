import React, {forwardRef, PropsWithChildren, useMemo} from 'react'
import clsx from 'clsx'
import styles from './Hero.module.css'
import {Button, ButtonBaseProps} from '../Button'
import {Heading, HeadingProps} from '../Heading'
import {Text, TextSizes, TextWeightVariants, ResponsiveWeightMap} from '../Text'
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
}

const Root = forwardRef<HTMLElement, PropsWithChildren<HeroProps>>(
  ({className, align = 'start', children, imageContainerClassName, imageContainerStyle, ...rest}, ref) => {
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
              <div className={styles['Hero-actions']}>{HeroActions}</div>
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

type HeroHeadingProps = Omit<HeadingProps, 'as'>

const HeroHeading = forwardRef<HTMLHeadingElement, HeroHeadingProps>(({children, ...rest}, ref) => {
  return (
    <Heading id="hero-section-brand-heading" className={styles['Hero-heading']} as="h1" ref={ref} {...rest}>
      {children}
    </Heading>
  )
})

type HeroDescriptionProps = {
  size?: (typeof TextSizes)[number]
  weight?: TextWeightVariants | ResponsiveWeightMap
} & BaseProps<HTMLParagraphElement>

function HeroDescription({size = '200', weight, children}: PropsWithChildren<HeroDescriptionProps>) {
  return (
    <Text className={styles['Hero-description']} as="p" size={size} weight={weight}>
      {children}
    </Text>
  )
}

type HeroImageProps = {
  position?: 'inline-end' | 'block-end'
} & ImageProps &
  BaseProps<HTMLImageElement>

function HeroImage({position = 'block-end', className, ...rest}: PropsWithChildren<HeroImageProps>) {
  return <Image className={clsx(styles['Hero-image'], styles[`Hero-image--pos-${position}`], className)} {...rest} />
}

type HeroLabelProps = LabelProps & BaseProps<HTMLSpanElement>

function HeroLabel({children, ...rest}: PropsWithChildren<HeroLabelProps>) {
  return (
    <Label className={styles['Hero-label']} {...rest}>
      {children}
    </Label>
  )
}

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
})
