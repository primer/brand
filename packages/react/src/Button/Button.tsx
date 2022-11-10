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

export type ButtonProps<C extends React.ElementType> = BaseProps<C> & {
  as?: C
  variant?: typeof ButtonVariants[number]
  size?: typeof ButtonSizes[number]
  hasArrow?: boolean
} & React.ComponentPropsWithoutRef<C>

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

    const handleOnMouseEnter = useCallback(
      event => {
        if (!disabled) {
          setIsHovered(true)
          onMouseEnter?.(event)
        }
      },
      [disabled, onMouseEnter]
    )

    const handleOnMouseLeave = useCallback(
      event => {
        if (!disabled) {
          setIsHovered(false)
          onMouseLeave?.(event)
        }
      },
      [disabled, onMouseLeave]
    )

    const handleOnFocus = useCallback(
      event => {
        if (!disabled) {
          setIsFocused(true)
          onFocus?.(event)
        }
      },
      [disabled, onFocus]
    )

    const handleOnBlur = useCallback(
      event => {
        if (!disabled) {
          setIsFocused(false)
          onBlur?.(event)
        }
      },
      [disabled, onBlur]
    )

    return (
      <Component
        ref={ref}
        className={clsx(
          styles.Button,
          styles[`Button--${variant}`],
          styles[`Button--size-${size}`],
          disabled && styles[`Button--disabled`],
          className
        )}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        disabled={disabled}
        aria-disabled={disabled ? 'true' : 'false'}
        {...props}
      >
        <Text
          as="span"
          size={size === 'medium' ? '300' : '400'}
          className={clsx(
            styles['Button--label'],
            styles[`Button--label-${variant}`],
            disabled && styles[`Button-label--disabled`]
          )}
        >
          {children}
        </Text>
        {hasArrow && (
          <ExpandableArrow
            className={clsx(styles['Button-arrow'], disabled && styles[`Button-arrow--disabled`])}
            expanded={!disabled && (isHovered || isFocused)}
          />
        )}
      </Component>
    )
  }
)
