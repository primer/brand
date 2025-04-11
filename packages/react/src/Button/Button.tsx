import clsx from 'clsx'
import React, {forwardRef, useCallback, type Ref, ReactElement} from 'react'
import type {Icon} from '@primer/octicons-react'

import {ExpandableArrow} from '../ExpandableArrow'
import {Text} from '../Text'
import type {BaseProps} from '../component-helpers'

import {useAnimation} from '../'

import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/button/colors-with-modes.css'
import styles from './Button.module.css'

export const ButtonVariants = ['primary', 'secondary', 'subtle', 'accent'] as const
export const ButtonSizes = ['small', 'medium', 'large'] as const

export const defaultButtonVariant = ButtonVariants[1]
export const defaultButtonSize = ButtonSizes[1]

type ButtonVariant = (typeof ButtonVariants)[number]

export type ButtonBaseProps = {
  /**
   * The leading visual appears before the button content
   */
  leadingVisual?: ReactElement | Icon
  /**
   * The trailing visual appears after the button content
   */
  trailingVisual?: ReactElement | Icon
  /**
   * The styling variations available in Button
   */
  variant?: ButtonVariant
  /**
   * The size variations available in Button
   */
  size?: (typeof ButtonSizes)[number]
  /**
   * A flag to show/hide the arrow icon
   */
  hasArrow?: boolean
  /**
   * The Button spans the full width
   */
  block?: boolean
}

const variantsWithArrow = ['subtle']

export type ButtonProps<C extends React.ElementType> = BaseProps<C> & {
  as?: C
} & ButtonBaseProps &
  React.ComponentPropsWithoutRef<C>

const testIds = {
  root: 'Button',
  get leadingVisual() {
    return `${this.root}-leading-visual`
  },
  get trailingVisual() {
    return `${this.root}-trailing-visual`
  },
  get expandableArrow() {
    return `${this.root}-expandable-arrow`
  },
}

export const _Button = forwardRef(
  <C extends React.ElementType>(
    {
      animate,
      as,
      variant = defaultButtonVariant,
      size = defaultButtonSize,
      hasArrow,
      block = false,
      className,
      children,
      disabled,
      'aria-disabled': ariaDisabled,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      leadingVisual: LeadingVisual,
      trailingVisual: TrailingVisual,
      style,
      ...props
    }: ButtonProps<C>,
    ref: Ref<HTMLButtonElement>,
  ) => {
    const [isHovered, setIsHovered] = React.useState(false)
    const [isFocused, setIsFocused] = React.useState(false)
    const Component = as || 'button'
    const isDisabled =
      disabled || ariaDisabled === 'true' || (typeof ariaDisabled === 'boolean' && ariaDisabled === true)

    const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const showArrow = variantsWithArrow.includes(variant) && hasArrow !== false // required for disabling buttons where hasArrow is optionally false
    console.log(hasArrow, showArrow)

    const returnValidComponent = useCallback((component?: ReactElement | Icon) => {
      if (React.isValidElement(component)) {
        return component
      }

      if (typeof component === 'function') {
        return React.createElement(component)
      }
    }, [])

    const LeadingVisualComponent = returnValidComponent(LeadingVisual)
    const TrailingVisualComponent = returnValidComponent(TrailingVisual)

    const handleOnMouseEnter = useCallback(
      event => {
        if (!isDisabled) {
          setIsHovered(true)
          onMouseEnter?.(event)
        }
      },
      [isDisabled, onMouseEnter],
    )

    const handleOnMouseLeave = useCallback(
      event => {
        if (!isDisabled) {
          setIsHovered(false)
          onMouseLeave?.(event)
        }
      },
      [isDisabled, onMouseLeave],
    )

    const handleOnFocus = useCallback(
      event => {
        if (!isDisabled) {
          setIsFocused(true)
          onFocus?.(event)
        }
      },
      [isDisabled, onFocus],
    )

    const handleOnBlur = useCallback(
      event => {
        if (!isDisabled) {
          setIsFocused(false)
          onBlur?.(event)
        }
      },
      [isDisabled, onBlur],
    )

    return (
      <Component
        ref={ref}
        className={clsx(
          styles.Button,
          styles[`Button--${variant}`],
          styles[`Button--size-${size}`],
          block && styles['Button--block'],
          isDisabled && styles[`Button--disabled`],
          animationClasses,
          className,
        )}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        disabled={disabled}
        aria-disabled={ariaDisabled}
        style={{...animationInlineStyles, ...style}}
        {...props}
      >
        {LeadingVisualComponent && (
          <span className={styles['Button__leading-visual']} data-testid={testIds.leadingVisual}>
            {React.cloneElement(LeadingVisualComponent as React.ReactElement, {
              className: clsx(styles['Button__icon-visual'], isDisabled && styles['Button__icon-visual--disabled']),
              ['aria-hidden']: 'true',
              focusable: 'false',
            })}
          </span>
        )}

        <span className={styles['Button__text']}>
          <Text
            as="span"
            size={size === 'small' ? '100' : size === 'medium' ? '200' : '400'}
            weight="semibold"
            className={clsx(
              styles['Button--label'],
              styles[`Button--label-${size}`],
              styles[`Button--label-${variant}`],
              isDisabled && styles[`Button-label--disabled`],
            )}
          >
            {children}
          </Text>
        </span>

        {!TrailingVisual && showArrow && (
          <span className={clsx(styles['Button__trailing-visual'])}>
            <ExpandableArrow
              hidden
              className={clsx(styles['Button-arrow'], isDisabled && styles[`Button-arrow--disabled`])}
              expanded={!isDisabled && (isHovered || isFocused)}
              data-testid={testIds.expandableArrow}
            />
          </span>
        )}
        {TrailingVisualComponent && (
          <span className={clsx(styles['Button__trailing-visual'])} data-testid={testIds.trailingVisual}>
            {React.cloneElement(TrailingVisualComponent as React.ReactElement, {
              className: clsx(styles['Button__icon-visual'], isDisabled && styles['Button__icon-visual--disabled']),
              ['aria-hidden']: 'true',
              focusable: 'false',
            })}
          </span>
        )}
      </Component>
    )
  },
)

export const Button = Object.assign(_Button, {testIds})
