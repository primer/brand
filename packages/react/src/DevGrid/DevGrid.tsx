/**
 * TODO
 * - support all breakpoints
 * - make columns declarative
 * - use design tokens for breakpoints
 */

import React, {useCallback, useEffect, useState, type ReactElement} from 'react'
import clsx from 'clsx'
import {useDevGridKeyCombo} from '../hooks/useDevGridKeyCombo'
import {useWindowSize} from '../hooks/useWindowSize'

/**
 * Design tokens
 */
import breakpoints from '@primer/brand-primitives/lib/design-tokens/ts/tokens/functional/size/breakpoints'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/size/size.css'

/**
 * Main stylesheet (as a CSS Module)
 */
import styles from './DevGrid.module.css'

/*
 * Generate from design tokens or FIgma
 */
enum Breakpoints {
  NARROW = 4,
  MEDIUM = 8,
  WIDE = 12
}

/**
 * Defaults
 */
export const defaultGridSize = Breakpoints.NARROW

/**
 * A Toggle-able grid to assist developers in front-end development.
 */
export type DevGridProps = {
  size?: number
}

export const DevGrid = ({size = defaultGridSize}: DevGridProps) => {
  const [gridIsOpen, setIsGridOpen] = useState(false)
  const [numCols, setNumCols] = useState(size)
  const handleToggle = () => setIsGridOpen(!gridIsOpen)

  useDevGridKeyCombo(handleToggle)
  const {width} = useWindowSize()

  const convertPxToRem = useCallback((rem: string): number => {
    return parseFloat(rem) * parseFloat(getComputedStyle(document.documentElement).fontSize)
  }, [])

  const mediumBreakpointToPx = convertPxToRem(breakpoints.brand.breakpoint.medium)
  const largeBreakpointToPx = convertPxToRem(breakpoints.brand.breakpoint.large)

  useEffect(() => {
    if (width) {
      if (width < mediumBreakpointToPx) {
        setNumCols(Breakpoints.NARROW)
      }
      if (width >= mediumBreakpointToPx && width < largeBreakpointToPx) {
        setNumCols(Breakpoints.MEDIUM)
      }
      if (width >= largeBreakpointToPx) {
        setNumCols(Breakpoints.WIDE)
      }
    }
  }, [numCols, setNumCols, width, mediumBreakpointToPx, largeBreakpointToPx])

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--devGrid-grid-size', `${numCols}`)
  }, [numCols])

  return (
    <div className={clsx(styles.DevGrid, gridIsOpen && styles['DevGrid--show'])}>
      {numCols > 0 &&
        Array.from(Array(numCols).keys()).map(value => {
          return (
            <div
              className={clsx(styles.DevGrid__column, styles[`DevGrid__Column-${value + 1}`])}
              key={`DevGrid__Column-${value}`}
            />
          )
        })}
    </div>
  )
}
