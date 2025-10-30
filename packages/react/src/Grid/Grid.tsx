import React, {HTMLAttributes, PropsWithChildren, memo} from 'react'

import {clsx} from 'clsx'

import type {BaseProps} from '../component-helpers'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/grid/grid.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/grid/colors-with-modes.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from './Grid.module.css'
import {useId} from '../hooks/useId'

const testIds = {
  root: 'Grid',
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

export type GridProps<T extends keyof JSX.IntrinsicElements = 'div'> = React.HTMLAttributes<T> & {
  /**
   * The HTML element used to render the grid.
   */
  as?: T | 'div' | 'span' | 'section'
  /**
   * Visual aid to help with alignment.
   */
  enableOverlay?: boolean
  /**
   * Fills the width of the parent container and removes the max-width.
   */
  fullWidth?: boolean
  /**
   * Test id for the root element.
   */
  ['data-testid']?: string
} & (T extends 'span'
    ? BaseProps<HTMLSpanElement>
    : T extends 'section'
    ? BaseProps<HTMLElement>
    : BaseProps<HTMLDivElement>)

const _GridRoot = memo(
  ({
    className,
    children,
    as = 'div',
    fullWidth = false,
    enableOverlay = false,
    ['data-testid']: testId,
    ...rest
  }: PropsWithChildren<GridProps>) => {
    const gridClass = clsx(
      styles.Grid,
      enableOverlay && styles['Grid--has-overlay'],
      fullWidth && styles['Grid--full-width'],
      className,
    )

    const testIdUID = useId(testId)

    const validElements = ['div', 'span', 'section']
    const Component = validElements.includes(as) ? as : 'div'

    return (
      <Component
        className={gridClass}
        data-testid={testId || `${testIds.root}-${testIdUID}`}
        {...(rest as HTMLAttributes<HTMLElement>)}
      >
        {children}
      </Component>
    )
  },
)

type GridColumnProps<T extends keyof JSX.IntrinsicElements = 'div'> = {
  as?: T | 'div' | 'span' | 'section'
  span?: GridColumnIndex | ResponsiveMap
  start?: GridColumnIndex | ResponsiveMap
} & (T extends 'span'
  ? BaseProps<HTMLSpanElement> & React.HTMLAttributes<HTMLSpanElement>
  : T extends 'section'
  ? BaseProps<HTMLElement> & React.HTMLAttributes<HTMLElement>
  : BaseProps<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>)

const Column = memo(
  ({children, as = 'div', span = 12, start, className, ...rest}: PropsWithChildren<GridColumnProps>) => {
    const validElements = ['div', 'span', 'section']
    const Component = validElements.includes(as) ? as : 'div'

    const columnClassArray = [styles['Grid__column']]

    if (typeof span === 'number') {
      columnClassArray.push(styles[`Grid__column--span-${span}`])
    } else if (typeof span === 'object') {
      for (const [key, value] of Object.entries(span)) {
        if (key === 'xsmall') {
          columnClassArray.push(styles[`Grid__column--xsmall-span-${value}`])
        } else {
          columnClassArray.push(styles[`Grid__column--${key}-span-${value}`])
        }
      }
    }

    if (typeof start === 'number') {
      columnClassArray.push(styles[`Grid__column--start-${start}`])
    } else if (typeof start === 'object') {
      for (const [key, value] of Object.entries(start)) {
        if (key === 'xsmall') {
          columnClassArray.push(styles[`Grid__column--xsmall-start-${value}`])
        } else {
          columnClassArray.push(styles[`Grid__column--${key}-start-${value}`])
        }
      }
    }

    const classes = clsx(columnClassArray, className)
    return (
      <Component className={classes} {...rest}>
        {children}
      </Component>
    )
  },
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
  testIds,
})
