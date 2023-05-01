import React, {forwardRef, PropsWithChildren, useMemo} from 'react'
import clsx from 'clsx'
import styles from './Hero.module.css'
import {Button, ButtonBaseProps} from '../Button'
import {Heading, HeadingProps} from '../Heading'
import {Text} from '../Text'

import type {BaseProps} from '../component-helpers'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/hero/base.css'

export type HeroProps = BaseProps<HTMLDivElement> & {
  align?: 'start' | 'center'
  children: React.ReactNode | React.ReactNode[] // Maybe use this from `FAQ`? type FAQRootProps = PropsWithChildren<BaseProps<HTMLElement>>
}

const Root = forwardRef<HTMLDivElement, HeroProps>(({className, align = 'start', children, ...rest}, ref) => {
  const HeroActions = useMemo(
    () =>
      React.Children.toArray(children).filter(
        child => React.isValidElement(child) && (child.type === HeroPrimaryAction || child.type === HeroSecondaryAction)
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
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          console.log(child)
          if (child.type !== HeroPrimaryAction && child.type !== HeroSecondaryAction) {
            return child
          }
        }
      })}
      <div className={styles['Hero-actions']}>{HeroActions}</div>
    </section>
  )
})

type HeroHeadingProps = {
  children: React.ReactNode | React.ReactNode[]
} & Omit<HeadingProps, 'as'>

const HeroHeading = forwardRef<HTMLHeadingElement, HeroHeadingProps>(({children, ...rest}, ref) => {
  return (
    <Heading id="hero-section-brand-heading" className={styles['Hero-heading']} as="h1" ref={ref} {...rest}>
      {children}
    </Heading>
  )
})

type HeroDescriptionProps = {
  children: React.ReactNode | React.ReactNode[]
}

function HeroDescription({children}: PropsWithChildren<HeroDescriptionProps>) {
  return (
    <Text className={styles['Hero-description']} as="p" size="400" variant="muted">
      {children}
    </Text>
  )
}

type HeroActions = {
  href: string
  children: React.ReactNode | React.ReactNode[]
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
