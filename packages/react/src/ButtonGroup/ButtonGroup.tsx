import clsx from 'clsx'
import React, {forwardRef, type Ref} from 'react'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/button/colors-with-modes.css'
import type {BaseProps} from '../component-helpers'
import {Button, ButtonProps} from '../Button'
import {Stack, StackProps} from '../Stack'
import styles from './ButtonGroup.module.css'

// TODO: Use generics properly to accept any type of button acceptable
// Using 'size' over 'buttonSize' causes an issue of the value not being passed to the clone children
export type ButtonGroupProps = BaseProps<HTMLDivElement> & {
  children: React.ReactElement<ButtonProps<'button'>>[]
  stackDirection?: StackProps['direction']
  buttonSize?: ButtonProps<'button'>['size']
  buttonsAs?: React.ElementType
}

export const ButtonGroup = forwardRef(
  (
    {stackDirection = 'horizontal', buttonSize = 'medium', buttonsAs, className, children, ...props}: ButtonGroupProps,
    ref: Ref<HTMLDivElement>
  ) => {
    // I would prefer not to have to loop twice for this
    const onlyButtons = React.Children.toArray(children).map(child => {
      if (React.isValidElement(child) && typeof child.type !== 'string' && child.type === Button) {
        return child
      }
    })
    const buttonsToRender = React.Children.toArray(onlyButtons)
      .slice(0, 2)
      .map((child, index) => {
        if (React.isValidElement(child) && typeof child.type !== 'string' && child.type === Button) {
          return React.cloneElement(child, {
            size: buttonSize,
            as: buttonsAs,
            variant: index === 0 ? 'primary' : 'secondary',
            // This ensures that the child components initial props override
            ...child.props
          } as ButtonProps<'button'>)
        }
      })

    return (
      <section ref={ref} className={clsx(styles.ButtonGroup, className)} {...props}>
        <Stack direction={'horizontal'}>{buttonsToRender as React.ReactElement[]}</Stack>
        {/* {buttonsToRender} */}
      </section>
    )
  }
)
