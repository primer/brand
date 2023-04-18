import React, {PropsWithChildren, memo} from 'react'

import {default as clsx} from 'clsx'

import type {BaseProps} from '../component-helpers'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/grid/grid-responsive.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/grid/colors-with-modes.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from './Grid.module.css'

const testIds = {
  root: 'Grid'
}

type ResponsiveMap = {
  xsmall?: GridColumnIndex
  small?: GridColumnIndex
  medium?: GridColumnIndex
  large?: GridColumnIndex
  xlarge?: GridColumnIndex
  xxlarge?: GridColumnIndex
}

export type GridColumnIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export type GridProps = {
  /**
   * The HTML element used to render the grid.
   */
  as?: 'div' | 'section' | 'span'
  /**
   * The gap between columns.
   */
  gap?: 'condensed' | 'normal' | 'spacious'
  /**
   * Visual aid to help with alignment.
   */
  enableOverlay?: boolean
  /**
   * The horizontal spacing applied to the parent element.
   */
  gutters?: 'condensed' | 'normal' | 'spacious'
} & BaseProps<HTMLDivElement>

const _GridRoot = memo(
  ({
    className,
    children,
    as: Component = 'div',
    gap = 'normal',
    enableOverlay = false,
    gutters,
    ...rest
  }: PropsWithChildren<GridProps>) => {
    const gridClass = clsx(
      styles.Grid,
      styles[`Grid--${gap}`],
      enableOverlay && styles['Grid--has-overlay'],
      gutters && styles[`Grid--gutter-${gutters}`],
      className
    )

    return (
      <Component className={gridClass} {...rest}>
        {children}
      </Component>
    )
  }
)

type GridColumnProps = {
  as?: 'div' | 'section' | 'span'
  span?: GridColumnIndex | ResponsiveMap
  start?: GridColumnIndex | ResponsiveMap
} & BaseProps<HTMLDivElement>

const Column = memo(
  ({children, as: Component = 'div', span = 12, start, className, ...rest}: PropsWithChildren<GridColumnProps>) => {
    const columnClassArray = [styles['Grid__column']]

    if (typeof span === 'number') {
      columnClassArray.push(styles[`Grid__column--span-${span}`])
    } else if (typeof span === 'object') {
      for (const [key, value] of Object.entries(span)) {
        columnClassArray.push(styles[`Grid__column--span-${value}`])
        columnClassArray.push(styles[`Grid__column--${key}-span-${value}`])
      }
    }

    if (typeof start === 'number') {
      columnClassArray.push(styles[`Grid__column--start-${start}`])
    } else if (typeof start === 'object') {
      for (const [key, value] of Object.entries(start)) {
        columnClassArray.push(styles[`Grid__column--start-${value}`])
        columnClassArray.push(styles[`Grid__column--${key}-start-${value}`])
      }
    }

    const classes = clsx(columnClassArray, className)
    return (
      <Component className={classes} {...rest}>
        {children}
      </Component>
    )
  }
)

/**
 * Use Grid to create flexible and responsive grid-based layouts
 * @see https://primer.style/brand/components/Grid
 * @example
 *   <Grid>
 *     <Grid.Column span="6">
 *       ...
 *     </Grid.Column>
 *   </Grid>
 */
export const Grid = Object.assign(_GridRoot, {
  Column,
  testIds
})
