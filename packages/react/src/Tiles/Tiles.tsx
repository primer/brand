import {clsx} from 'clsx'
import React, {createContext, forwardRef, type PropsWithChildren, type Ref, useContext, useMemo} from 'react'
import {ArrowUpRightIcon} from '@primer/octicons-react'
import type {BaseProps} from '../component-helpers'
import {Text} from '../Text'

/** * Design Tokens */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/tiles/colors-with-modes.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from './Tiles.module.css'

const testIds = {
  root: 'Tiles',
  get grid() {
    return `${this.root}-grid`
  },
  get item() {
    return `${this.root}-item`
  },
}

type TilesVariant = 'default' | 'gridlines'

type TilesLayout = 'default' | 'compact'

const TilesContext = createContext<TilesLayout>('default')

export type TilesProps = {
  /**
   * The visual variant of the Tiles component.
   * - `default`: No gridlines
   * - `gridlines`: Includes gridlines between tiles
   */
  variant?: TilesVariant
  /**
   * The layout density of the Tiles grid.
   * - `default`: 6 items per row on large viewports
   * - `compact`: 8 items per row on large viewports
   */
  layout?: TilesLayout
  /**
   * Test id for the root Tiles element.
   */
  'data-testid'?: string
} & BaseProps<HTMLDivElement> &
  React.HTMLAttributes<HTMLDivElement>

const TilesRoot = forwardRef(
  (
    {
      variant = 'default',
      layout = 'default',
      children,
      className,
      'data-testid': testId,
      ...rest
    }: PropsWithChildren<TilesProps>,
    ref: Ref<HTMLDivElement>,
  ) => {
    return (
      <TilesContext.Provider value={layout}>
        <div
          ref={ref}
          className={clsx(
            styles.Tiles,
            styles[`Tiles--variant-${variant}`],
            styles[`Tiles--layout-${layout}`],
            className,
          )}
          data-testid={testId || testIds.root}
          {...rest}
        >
          <ul className={styles['Tiles-grid']} data-testid={testIds.grid}>
            {children}
          </ul>
        </div>
      </TilesContext.Provider>
    )
  },
)

export type TilesItemProps = {
  /**
   * The accessible name for the tile item.
   */
  name: string
  /**
   * Optional URL to link the tile to.
   */
  href?: string
  /**
   * Test id for the tile item element.
   */
  'data-testid'?: string
} & BaseProps<HTMLLIElement> &
  Omit<React.HTMLAttributes<HTMLLIElement>, 'children'> & {
    children: React.ReactNode
  }

const _Item = forwardRef(
  ({name, href, children, className, 'data-testid': testId, ...rest}: TilesItemProps, ref: Ref<HTMLLIElement>) => {
    const layout = useContext(TilesContext)
    const hasLink = Boolean(href)
    const isLabelHidden = layout === 'compact' && !hasLink

    const content = useMemo(
      () => (
        <span className={styles['Tiles-item-content']}>
          <span className={styles['Tiles-item-media']} aria-hidden="true">
            {children}
          </span>
          <span className={clsx(styles['Tiles-item-label'], isLabelHidden && 'visually-hidden')}>
            <Text as="span" size="100" className={styles['Tiles-item-name']}>
              {name}
            </Text>
            {hasLink && <ArrowUpRightIcon size={16} className={styles['Tiles-item-icon']} aria-hidden="true" />}
          </span>
        </span>
      ),
      [children, name, hasLink, isLabelHidden],
    )

    return (
      <li ref={ref} className={clsx(styles['Tiles-item'], className)} data-testid={testId || testIds.item} {...rest}>
        {hasLink ? (
          <a href={href} className={styles['Tiles-item-link']}>
            {content}
          </a>
        ) : (
          content
        )}
      </li>
    )
  },
)

/**
 * Use Tiles to display a grid of logos or icons with optional links.
 * @see https://primer.style/brand/components/Tiles
 */
export const Tiles = Object.assign(TilesRoot, {
  Item: _Item,
  testIds,
})
