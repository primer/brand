import React, {forwardRef, PropsWithChildren, useMemo} from 'react'
import clsx from 'clsx'
import styles from './Hero.module.css'
import {Button, ButtonBaseProps} from '../Button'
import {Heading, HeadingProps} from '../Heading'
import {Text, TextSizes, TextWeightVariants, ResponsiveWeightMap} from '../Text'

import type {BaseProps} from '../component-helpers'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/hero/base.css'

export type HeroProps = BaseProps<HTMLElement> & {
  align?: 'start' | 'center'
}

const Root = forwardRef<HTMLElement, PropsWithChildren<HeroProps>>(
  ({className, align = 'start', children, ...rest}, ref) => {
    const {HeroActions, HeroChildren} = useMemo(
      () =>
        React.Children.toArray(children).reduce<{
          HeroActions: React.ReactElement[]
          HeroChildren: React.ReactElement[]
        }>(
          (acc, child) => {
            if (React.isValidElement(child)) {
              if (child.type === HeroPrimaryAction || child.type === HeroSecondaryAction) {
                acc.HeroActions.push(child)
              } else {
                acc.HeroChildren.push(child)
              }
            }
            return acc
          },
          {HeroActions: [], HeroChildren: []}
        ),
      [children]
    )

    return (
      <section
        className={clsx(styles.Hero, styles[`Hero--align-${align}`], className)}
        ref={ref}
        aria-labelledby="hero-section-brand-heading"
        {...rest}
      >
        {HeroChildren}
        <div className={styles['Hero-actions']}>{HeroActions}</div>
      </section>
    )
  }
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
  size?: typeof TextSizes[number]
  weight?: TextWeightVariants | ResponsiveWeightMap
}

function HeroDescription({size = '400', weight, children}: PropsWithChildren<HeroDescriptionProps>) {
  return (
    <Text className={styles['Hero-description']} as="p" size={size} weight={weight} variant="muted">
      {children}
    </Text>
  )
}

type HeroActions = {
  href: string
} & Omit<ButtonBaseProps, 'variant'>

function HeroPrimaryAction({href, children, ...rest}: PropsWithChildren<HeroActions>) {
  return (
    <Button as="a" variant="primary" size="large" href={href} {...rest}>
      {children}
    </Button>
  )
}

function HeroSecondaryAction({href, children, ...rest}: PropsWithChildren<HeroActions>) {
  return (
    <Button as="a" variant="secondary" size="large" href={href} {...rest}>
      {children}
    </Button>
  )
}

export const Hero = Object.assign(Root, {
  Heading: HeroHeading,
  Description: HeroDescription,
  PrimaryAction: HeroPrimaryAction,
  SecondaryAction: HeroSecondaryAction
})
