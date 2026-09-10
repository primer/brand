import React, {forwardRef, type Ref} from 'react'
import {clsx} from 'clsx'
import type {BaseProps} from '../component-helpers'
import {Button, ButtonProps} from '../Button'
import {ActionMenu, ActionMenuProps} from '../ActionMenu'
import styles from './ButtonGroup.module.css'

export type PrimerBrandButtonType = React.ReactElement<ButtonProps<React.ElementType<'button' | 'a'>>>
export type PrimerBrandActionMenuType = React.ReactElement<ActionMenuProps>
export type ButtonGroupChild = PrimerBrandButtonType | PrimerBrandActionMenuType | false | null | undefined

export type ButtonGroupProps = BaseProps<HTMLDivElement> & {
  children: ButtonGroupChild | ButtonGroupChild[]
  buttonSize?: ButtonProps<'button' | 'a'>['size']
  buttonsAs?: 'button' | 'a'
}

export const ButtonGroup = forwardRef(
  ({buttonSize = 'medium', buttonsAs, className, children, ...props}: ButtonGroupProps, ref: Ref<HTMLDivElement>) => {
    const buttonsToRender = React.Children.toArray(children)
      .filter(
        (child): child is React.ReactElement =>
          React.isValidElement(child) && (child.type === Button || child.type === ActionMenu),
      )
      .slice(0, 2)
      .map((child, index) => {
        const variant = index === 0 ? 'primary' : 'secondary'

        if (React.isValidElement<ButtonProps<'button' | 'a'>>(child) && child.type === Button) {
          return React.cloneElement(child, {
            size: child.props.size ?? buttonSize,
            as: child.props.as ?? buttonsAs,
            variant: child.props.variant ?? variant,
          })
        }

        const actionMenu = child as PrimerBrandActionMenuType
        const actionMenuSize = buttonSize === 'large' ? 'medium' : buttonSize
        const actionMenuChildren = React.Children.map(actionMenu.props.children, actionMenuChild => {
          if (
            React.isValidElement<React.ComponentProps<typeof ActionMenu.Button>>(actionMenuChild) &&
            actionMenuChild.type === ActionMenu.Button
          ) {
            return React.cloneElement(actionMenuChild, {
              variant: actionMenuChild.props.variant ?? variant,
            })
          }
          return actionMenuChild
        })

        return React.cloneElement(actionMenu, {
          children: actionMenuChildren,
          size: actionMenu.props.size ?? actionMenuSize,
        })
      })

    return (
      <section ref={ref} {...props} className={clsx(styles.ButtonGroup, className)}>
        {buttonsToRender}
      </section>
    )
  },
)
