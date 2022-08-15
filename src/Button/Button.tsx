import clsx from 'clsx'
import React, {forwardRef, type Ref} from 'react'
import {ExpandableArrow} from '../ExpandableArrow'
import {Text} from '../Text'
import '../../lib/design-tokens/css/tokens/functional/components/button/colors-with-modes.css'
import type {BaseProps} from '../component-helpers'
import styles from './Button.module.css'

export type ButtonProps<C extends React.ElementType> = BaseProps<C> & {
  as?: C
  variant?: 'primary' | 'secondary'
} & React.ComponentPropsWithoutRef<C>

export const Button = forwardRef(
  <C extends React.ElementType>(
    {
      as,
      variant = 'secondary',
      className,
      children,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      ...props
    }: ButtonProps<C>,
    ref: Ref<HTMLButtonElement>
  ) => {
    const [isHovered, setIsHovered] = React.useState(false)
    const [isFocused, setIsFocused] = React.useState(false)
    const Component = as || 'button'

    return (
      <Component
        ref={ref}
        className={clsx(styles.Button, styles[`Button--${variant}`], className)}
        onMouseEnter={event => {
          setIsHovered(true)
          onMouseEnter?.(event)
        }}
        onMouseLeave={event => {
          setIsHovered(false)
          onMouseLeave?.(event)
        }}
        onFocus={event => {
          setIsFocused(true)
          onFocus?.(event)
        }}
        onBlur={event => {
          setIsFocused(false)
          onBlur?.(event)
        }}
        {...props}
      >
        <Text
          as="span"
          size="400"
          className={clsx(styles['Button--label'], variant === 'primary' && styles['Button--label-primary'])}
        >
          {children}
        </Text>
        <ExpandableArrow className={styles['Button-arrow']} expanded={isHovered || isFocused} />
      </Component>
    )
  }
)
