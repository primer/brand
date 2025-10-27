import React, {forwardRef, useMemo} from 'react'
import {clsx} from 'clsx'

import type {BaseProps} from '../component-helpers'
import {BaseSizeScale} from '../constants'
import {useAnimation} from '../animation'

import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/size/size.css'
import styles from './Stack.module.css'

export const StackDirectionVariants = ['horizontal', 'vertical'] as const
type StackDirectionVariants = (typeof StackDirectionVariants)[number]
export const defaultStackDirection = StackDirectionVariants[1]

export const StackSpacingVariants = ['none', 'condensed', 'normal', 'spacious', ...BaseSizeScale] as const
type StackSpacingVariants = (typeof StackSpacingVariants)[number]
export const defaultStackSpacing = StackSpacingVariants[1]

export const StackAlignItemVariants = ['center', 'flex-start', 'flex-end'] as const
type StackAlignItemVariants = (typeof StackAlignItemVariants)[number]

export const StackFlexWrapVariants = ['wrap', 'nowrap'] as const
type StackFlexWrapVariants = (typeof StackFlexWrapVariants)[number]

export const StackJustifyContentVariants = [
  ...StackAlignItemVariants,
  'space-between',
  'space-around',
  'space-evenly',
] as const
type justifyContentVariants = (typeof StackJustifyContentVariants)[number]

type ResponsiveJustifyContentMap = {
  narrow?: justifyContentVariants
  regular?: justifyContentVariants
  wide?: justifyContentVariants
}

type ResponsiveAlignItemsMap = {
  narrow?: StackAlignItemVariants
  regular?: StackAlignItemVariants
  wide?: StackAlignItemVariants
}

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

type ResponsiveFlexWrapMap = {
  narrow?: StackFlexWrapVariants
  regular?: StackFlexWrapVariants
  wide?: StackFlexWrapVariants
}

export type StackProps = BaseProps<HTMLElement> & {
  children: React.ReactNode[] | React.ReactNode
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
   * A string value will be applied to all viewports.
   * An object can be used to define different values for different viewports.
   */
  alignItems?: StackAlignItemVariants | ResponsiveAlignItemsMap
  /**
   * Defines the padding CSS property on the parent Stack.
   * A string value will be applied to all viewports.
   * An object can be used to define different values for different viewports.
   */
  padding?: StackSpacingVariants | ResponsiveSpacingMap
  /**
   * Applies horizontal alignment to child elements relative to the Stack, using the justify-content CSS property.
   * A string value will be applied to all viewports.
   * An object can be used to define different values for different viewports.
   */
  justifyContent?: justifyContentVariants | ResponsiveJustifyContentMap
  /**
   * Forward inline styles
   */
  style?: React.CSSProperties
  /**
   * Applies flex-wrap to the Stack, using the flex-wrap CSS property.
   */
  flexWrap?: StackFlexWrapVariants | ResponsiveFlexWrapMap
} & BaseProps<HTMLDivElement> &
  React.HTMLAttributes<HTMLDivElement>

const StackBase = (
  {
    animate,
    children,
    direction = defaultStackDirection,
    gap = defaultStackSpacing,
    alignItems,
    padding = defaultStackSpacing,
    justifyContent,
    className,
    style,
    flexWrap,
    ...rest
  }: StackProps,
  ref,
): React.ReactElement => {
  const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)

  const directionClass = useMemo(
    () =>
      typeof direction === 'string'
        ? styles[`Stack--${direction}`]
        : Object.keys(direction)
            .map(viewport => styles[`Stack-${viewport}--${direction[viewport]}`])
            .join(' '),
    [direction],
  )

  const gapClass = useMemo(
    () =>
      typeof gap === 'string' || typeof gap === 'number'
        ? styles[`Stack--gap-${gap}`]
        : Object.keys(gap)
            .map(viewport => styles[`Stack-${viewport}--gap-${gap[viewport]}`])
            .join(' '),
    [gap],
  )

  const paddingClass = useMemo(
    () =>
      typeof padding === 'string' || typeof padding === 'number'
        ? styles[`Stack--padding-${padding}`]
        : Object.keys(padding)
            .map(viewport => styles[`Stack-${viewport}--padding-${padding[viewport]}`])
            .join(' '),
    [padding],
  )

  const alignItemsClass = useMemo(
    () =>
      typeof alignItems === 'string'
        ? styles[`Stack--align-items-${alignItems}`]
        : typeof alignItems === 'object'
        ? Object.keys(alignItems)
            .map(viewport => styles[`Stack-${viewport}--align-items-${alignItems[viewport]}`])
            .join(' ')
        : null,
    [alignItems],
  )

  const justifyContentClass = useMemo(
    () =>
      typeof justifyContent === 'string'
        ? styles[`Stack--justify-content-${justifyContent}`]
        : typeof justifyContent === 'object'
        ? Object.keys(justifyContent)
            .map(viewport => styles[`Stack-${viewport}--justify-content-${justifyContent[viewport]}`])
            .join(' ')
        : null,
    [justifyContent],
  )

  const flexWrapClass = useMemo(
    () =>
      typeof flexWrap === 'string'
        ? styles[`Stack-flexWrap--${flexWrap}`]
        : typeof flexWrap === 'object'
        ? Object.keys(flexWrap)
            .map(viewport => styles[`Stack-${viewport}-flexWrap--${flexWrap[viewport]}`])
            .join(' ')
        : null,
    [flexWrap],
  )

  return (
    <div
      ref={ref}
      className={clsx(
        animationClasses,
        styles.Stack,
        directionClass,
        gapClass,
        alignItemsClass,
        justifyContentClass,
        paddingClass,
        flexWrapClass,
        className,
      )}
      style={{...animationInlineStyles, ...style}}
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
export const Stack = forwardRef(StackBase)
