import React, {forwardRef, PropsWithChildren} from 'react'
import {Button, ButtonBaseProps} from '../../Button'
import type {BaseProps} from '../../component-helpers'
import {useHeroContext} from '../HeroContext'
import {Box} from '../../Box'

type RestrictedPolymorphism =
  | (BaseProps<HTMLAnchorElement> & {as?: 'a'})
  | (BaseProps<HTMLButtonElement> & {as?: 'button'})

export type HeroPrimaryActionProps = {
  as?: 'a' | 'button'
  href: string
} & ButtonBaseProps &
  RestrictedPolymorphism

export const HeroPrimaryAction = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  PropsWithChildren<HeroPrimaryActionProps>
>(({href, as = 'a', children, ...rest}, ref) => {
  const {variant: heroVariant, enableAnimation} = useHeroContext()
  const isGridline = heroVariant === 'gridline'
  const Tag = isGridline ? Box : React.Fragment
  const tagProps = isGridline
    ? {
        animate: enableAnimation
          ? {
              variant: 'slide-in-up' as const,
              delay: 750,
              duration: 1000,
            }
          : undefined,
      }
    : {}

  return (
    <Tag {...tagProps}>
      <Button ref={ref as React.Ref<HTMLButtonElement>} as={as} variant="accent" size="medium" href={href} {...rest}>
        {children}
      </Button>
    </Tag>
  )
})
