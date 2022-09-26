import React, {forwardRef, useMemo} from 'react'
import clsx from 'clsx'

import type {BaseProps} from '../component-helpers'

import '../../lib/design-tokens/css/tokens/functional/size/size.css'
import styles from './Stack.module.css'

type StackDirectionVariants = 'horizontal' | 'vertical'

type StackSpacingVariants = 'condensed' | 'normal' | 'spacious'

type ResponsiveDirectionMap = {
  narrow?: StackDirectionVariants
  regular?: StackDirectionVariants
  wide?: StackDirectionVariants
}

type ResponsiveSpacingMap = {
  narrow?: StackSpacingVariants
  regular?: StackSpacingVariants
  wide?: StackSpacingVariants
}

export type StackProps = BaseProps<HTMLElement> & {
  children: React.ReactElement[] | React.ReactElement
  /**
   * Defines the flex-direction CSS property.
   * A string value will be applied to all viewports.
   * An object can be used to define different values for different viewports.
   */
  direction?: StackDirectionVariants | ResponsiveDirectionMap
  /**
   * Defines the gap CSS property.
   * A string value will be applied to all viewports.
   * An object can be used to define different values for different viewports.
   */
  gap?: StackSpacingVariants | ResponsiveSpacingMap
  /**
   * Applies vertical alignment to child elements relative to the Stack, using the align-items CSS property.
   */
  alignItems?: 'center' | 'flex-start' | 'flex-end'
  /**
   * Defines the padding CSS property on the parent Stack.
   * A string value will be applied to all viewports.
   * An object can be used to define different values for different viewports.
   */
  padding?: StackSpacingVariants | ResponsiveSpacingMap
  /**
   * Applies horizontal alignment to child elements relative to the Stack, using the justify-content CSS property.
   */
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'
  /**
   * Forward inline styles
   */
  style?: React.CSSProperties
} & BaseProps<HTMLDivElement>

const _Stack = (
  {
    children,
    direction = 'vertical',
    gap = 'normal',
    alignItems,
    padding = 'normal',
    justifyContent,
    ...rest
  }: StackProps,
  ref
): React.ReactElement => {
  const directionClass = useMemo(
    () =>
      typeof direction === 'string'
        ? styles[`Stack--${direction}`]
        : Object.keys(direction)
            .map(viewport => styles[`Stack-${viewport}--${direction[viewport]}`])
            .join(' '),
    [direction]
  )

  const gapClass = useMemo(
    () =>
      typeof gap === 'string'
        ? styles[`Stack--gap-${gap}`]
        : Object.keys(gap)
            .map(viewport => styles[`Stack-${viewport}--gap-${gap[viewport]}`])
            .join(' '),
    [gap]
  )

  const paddingClass = useMemo(
    () =>
      typeof padding === 'string'
        ? styles[`Stack--padding-${padding}`]
        : Object.keys(padding)
            .map(viewport => styles[`Stack-${viewport}--padding-${padding[viewport]}`])
            .join(' '),
    [padding]
  )

  const alignItemsClass = useMemo(() => styles[`Stack-align-items--${alignItems}`], [alignItems])

  const justifyContentClass = useMemo(() => styles[`Stack-justify-content--${justifyContent}`], [justifyContent])

  return (
    <div
      ref={ref}
      className={clsx(styles.Stack, directionClass, gapClass, alignItemsClass, justifyContentClass, paddingClass)}
      {...rest}
    >
      {children}
    </div>
  )
}

/**
 * Stack enables layout of its immediate children along the vertical or horizontal axis
 * @see https://primer.style/brand/components/Stack
 */
export const Stack = forwardRef(_Stack)
