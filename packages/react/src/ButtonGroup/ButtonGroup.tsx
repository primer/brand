import React, {forwardRef, type Ref} from 'react'
import type {BaseProps} from '../component-helpers'
import {Button, ButtonProps} from '../Button'
import styles from './ButtonGroup.module.css'

export type PrimerBrandButtonType = React.ReactElement<ButtonProps<React.ElementType<'button' | 'a'>>>

export type ButtonGroupProps = BaseProps<HTMLDivElement> & {
  children: PrimerBrandButtonType[] | PrimerBrandButtonType
  buttonSize?: ButtonProps<'button' | 'a'>['size']
  buttonsAs?: 'button' | 'a'
}

export const ButtonGroup = forwardRef(
  ({buttonSize = 'medium', buttonsAs, className, children, ...props}: ButtonGroupProps, ref: Ref<HTMLDivElement>) => {
    const buttonsToRender = React.Children.toArray(children)
      .map((child, index) => {
        if (React.isValidElement<ButtonProps<'button' | 'a'>>(child) && child.type === Button) {
          return React.cloneElement(child, {
            size: buttonSize,
            as: buttonsAs,
            variant: index === 0 ? 'accent' : 'subtle',
            hasArrow: false,
            ...child.props,
          })
        }
        return null
      })
      .filter(Boolean)
      .slice(0, 2)

    return (
      <section ref={ref} className={styles.ButtonGroup} {...props}>
        {buttonsToRender as React.ReactElement[]}
      </section>
    )
  },
)
