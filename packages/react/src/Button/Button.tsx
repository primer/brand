import clsx from 'clsx'
import React, {forwardRef, useCallback, type Ref} from 'react'
import {ExpandableArrow} from '../ExpandableArrow'
import {Text} from '../Text'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/button/colors-with-modes.css'
import type {BaseProps} from '../component-helpers'
import styles from './Button.module.css'

export const ButtonVariants = ['primary', 'secondary', 'subtle'] as const
export const ButtonSizes = ['medium', 'large'] as const

export const defaultButtonVariant = ButtonVariants[1]
export const defaultButtonSize = ButtonSizes[0]

export type ButtonBaseProps = {
  variant?: typeof ButtonVariants[number]
  size?: typeof ButtonSizes[number]
  hasArrow?: boolean
  ariaDisabled?: boolean
}

export type ButtonProps<C extends React.ElementType> = BaseProps<C> & {
  as?: C
} & ButtonBaseProps &
  React.ComponentPropsWithoutRef<C>

export const Button = forwardRef(
  <C extends React.ElementType>(
    {
      as,
      variant = defaultButtonVariant,
      size = defaultButtonSize,
      hasArrow = true,
      className,
      children,
      disabled,
      'aria-disabled': ariaDisabled,
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

    const isDisabled =
      disabled || ariaDisabled === 'true' || (typeof ariaDisabled === 'boolean' && ariaDisabled === true)

    const handleOnMouseEnter = useCallback(
      event => {
        if (!isDisabled) {
          setIsHovered(true)
          onMouseEnter?.(event)
        }
      },
      [disabled, ariaDisabled, onMouseEnter]
    )

    const handleOnMouseLeave = useCallback(
      event => {
        if (!isDisabled) {
          setIsHovered(false)
          onMouseLeave?.(event)
        }
      },
      [isDisabled, onMouseLeave]
    )

    const handleOnFocus = useCallback(
      event => {
        if (!isDisabled) {
          setIsFocused(true)
          onFocus?.(event)
        }
      },
      [isDisabled, onFocus]
    )

    const handleOnBlur = useCallback(
      event => {
        if (!isDisabled) {
          setIsFocused(false)
          onBlur?.(event)
        }
      },
      [isDisabled, onBlur]
    )

    return (
      <Component
        ref={ref}
        className={clsx(
          styles.Button,
          styles[`Button--${variant}`],
          styles[`Button--size-${size}`],
          isDisabled && styles[`Button--disabled`],
          className
        )}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        disabled={disabled}
        aria-disabled={ariaDisabled}
        {...props}
      >
        <Text
          as="span"
          size={size === 'medium' ? '300' : '400'}
          className={clsx(
            styles['Button--label'],
            styles[`Button--label-${variant}`],
            isDisabled && styles[`Button-label--disabled`]
          )}
        >
          {children}
        </Text>
        {hasArrow && (
          <ExpandableArrow
            hidden
            className={clsx(styles['Button-arrow'], isDisabled && styles[`Button-arrow--disabled`])}
            expanded={!isDisabled && (isHovered || isFocused)}
          />
        )}
      </Component>
    )
  }
)
