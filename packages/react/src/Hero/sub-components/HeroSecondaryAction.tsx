import React, {forwardRef, PropsWithChildren} from 'react'
import {Button, ButtonBaseProps} from '../../Button'
import type {BaseProps} from '../../component-helpers'
import {Box} from '../..'
import {useHeroContext} from '../HeroContext'

type RestrictedPolymorphism =
  | (BaseProps<HTMLAnchorElement> & {as?: 'a'})
  | (BaseProps<HTMLButtonElement> & {as?: 'button'})

export type HeroSecondaryActionProps = {
  as?: 'a' | 'button'
  href: string
} & ButtonBaseProps &
  RestrictedPolymorphism

export const HeroSecondaryAction = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  PropsWithChildren<HeroSecondaryActionProps>
>(({href, as = 'a', children, ...rest}, ref) => {
  const {variant: heroVariant, enableAnimation} = useHeroContext()
  const Tag = heroVariant === 'bordered-grid' ? Box : React.Fragment
  return (
    <Tag
      animate={
        heroVariant === 'bordered-grid' && enableAnimation
          ? {
              variant: 'slide-in-up',
              delay: 750,
              duration: 1000,
            }
          : undefined
      }
    >
      <Button ref={ref as React.Ref<HTMLButtonElement>} as={as} variant="secondary" size="medium" href={href} {...rest}>
        {children}
      </Button>
    </Tag>
  )
})
