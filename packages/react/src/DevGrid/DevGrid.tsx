import {forwardRef, type Ref} from 'react'
import type {ReactElement} from 'react'
import type {BaseProps} from '../component-helpers'

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
export type DevGridProps = BaseProps<HTMLDivElement> & {
  size?: number
}

export const DevGrid = forwardRef(({size = defaultGridSize}: DevGridProps, ref: Ref<HTMLDivElement>) => {
  let col = size
  let columns: ReactElement[] = []

  while (col > 0) {
    col--
    columns.push(<DevColumn key={`DevGrid__Column-${col}`} />)
  }

  return (
    <div className={styles.DevGrid} ref={ref}>
      {columns}
    </div>
  )
})

export const DevColumn = () => <div className={styles.DevGrid__column} />
