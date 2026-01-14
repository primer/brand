import React, {forwardRef, PropsWithChildren} from 'react'
import {Button, ButtonBaseProps} from '../../Button'
import type {BaseProps} from '../../component-helpers'

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
  return (
    <Button ref={ref as React.Ref<HTMLButtonElement>} as={as} variant="accent" size="medium" href={href} {...rest}>
      {children}
    </Button>
  )
})
