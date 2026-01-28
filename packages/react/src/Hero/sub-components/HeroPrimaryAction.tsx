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
  const Tag = heroVariant === 'gridline' ? Box : React.Fragment
  return (
    <Tag
      animate={
        heroVariant === 'gridline' && enableAnimation
          ? {
              variant: 'slide-in-up',
              delay: 750,
              duration: 1000,
            }
          : undefined
      }
    >
      <Button ref={ref as React.Ref<HTMLButtonElement>} as={as} variant="accent" size="medium" href={href} {...rest}>
        {children}
      </Button>
    </Tag>
  )
})
