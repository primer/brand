import clsx from 'clsx'
import React, {forwardRef, type Ref} from 'react'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/button/colors-with-modes.css'
import type {BaseProps} from '../component-helpers'
import {Button, ButtonProps} from '../Button'
import styles from './ButtonGroup.module.css'

// TODO: Use generics properly to accept any type of button acceptable
export type ButtonGroupProps = BaseProps<HTMLDivElement> & {
  // This can only accept type of button but I want it to accept a generic type here
  children: React.ReactElement<ButtonProps<'button'>>[]
  direction?: 'horizontal' | 'vertical'
  buttonSize?: ButtonProps<'button'>['size']
  buttonsAs?: React.ElementType
}

export const ButtonGroup = forwardRef(
  (
    {direction = 'horizontal', buttonSize = 'medium', buttonsAs, className, children, ...props}: ButtonGroupProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const buttonsToRender = React.Children.toArray(children)
      .map((child, index) => {
        if (React.isValidElement(child) && typeof child.type !== 'string' && child.type === Button) {
          return React.cloneElement(child, {
            size: buttonSize,
            as: buttonsAs,
            variant: index === 0 ? 'primary' : 'secondary',
            ...child.props
          } as ButtonProps<'button'>)
        }
      })
      .filter(Boolean)
      .slice(0, 2)

    return (
      <section
        ref={ref}
        className={clsx(styles.ButtonGroup, direction === 'horizontal' && styles['ButtonGroup--horizontal'], className)}
        {...props}
      >
        {buttonsToRender as React.ReactElement[]}
      </section>
    )
  }
)
