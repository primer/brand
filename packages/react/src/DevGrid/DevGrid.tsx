import React, {useEffect, useState, type ReactElement} from 'react'
import clsx from 'clsx'
import {useDevGridKeyCombo} from '../hooks/useDevGridKeyCombo'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/size/size.css'

/**
 * Main stylesheet (as a CSS Module)
 */
import styles from './DevGrid.module.css'

/**
 * Defaults
 */
export const defaultGridSize = 12

/**
 * A Toggle-able grid to assist developers in front-end development.
 */
export type DevGridProps = {
  size?: number
}

export const DevGrid = ({size = defaultGridSize}: DevGridProps) => {
  const [gridIsOpen, setIsGridOpen] = useState(false)
  const handleToggle = () => setIsGridOpen(!gridIsOpen)

  useDevGridKeyCombo(handleToggle)
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--devGrid-grid-size', `${size}`)
  }, [size])

  let col = size
  const columns: ReactElement[] = []

  while (col > 0) {
    col--
    columns.push(<div className={styles.DevGrid__column} key={`DevGrid__Column-${col}`} />)
  }

  return <div className={clsx(styles.DevGrid, gridIsOpen && styles['DevGrid--show'])}>{columns}</div>
}
