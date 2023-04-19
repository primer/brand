import React, {forwardRef, PropsWithChildren} from 'react'
import clsx from 'clsx'
import styles from './Hero.module.css'
import {Button} from '../Button'
import {Heading, HeadingProps, HeadingTags} from '../Heading'
import {Text} from '../Text'

import type {BaseProps} from '../component-helpers'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/hero/base.css'

export type HeroProps = BaseProps<HTMLDivElement> & {
  align?: 'start' | 'center'
  children: React.ReactNode | React.ReactNode[] // Maybe use this from `FAQ`? type FAQRootProps = PropsWithChildren<BaseProps<HTMLElement>>
}

const Root = forwardRef<HTMLDivElement, HeroProps>(({className, align = 'start', children, ...rest}, ref) => {
  return (
    <section className={clsx(styles.Hero, styles[`Hero--align-${align}`], className)} ref={ref} {...rest}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          if (child.type === HeroHeading || child.type === HeroDescription) {
            return child
          }
        }
      })}
      <div className={styles['Hero-actions']}>
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            if (child.type === HeroPrimaryAction || child.type === HeroSecondaryAction) {
              return child
            }
          }
        })}
      </div>
    </section>
  )
})

type HeroHeadingProps = {
  as?: HeadingTags['as']
  children: React.ReactNode | React.ReactNode[]
} & HeadingProps

const HeroHeading = forwardRef<HTMLHeadingElement, HeroHeadingProps>(({as = 'h1', children, ...rest}, ref) => {
  return (
    <Heading className={styles['Hero-heading']} as={as} ref={ref} {...rest}>
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
}

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
