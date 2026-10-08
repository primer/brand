import {clsx} from 'clsx'
import React, {createContext, forwardRef, type PropsWithChildren, type Ref, useContext} from 'react'
import {ArrowUpRightIcon} from '@primer/octicons-react'
import type {BaseProps} from '../component-helpers'
import gridlineStyles from '../component-helpers/shared.module.css'
import {Text} from '../Text'
import {isFragmentElement} from '../utils/isFragmentElement'

/** * Design Tokens */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/tiles/base.css'
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

const maximumTilesPerRowByViewport = {
  default: {xsmall: 2, small: 3, medium: 4, large: 9},
  compact: {xsmall: 4, small: 3, medium: 6, large: 9},
} satisfies Record<TilesLayout, Record<'xsmall' | 'small' | 'medium' | 'large', number>>

const TilesContext = createContext<TilesLayout>('default')

export type TilesProps = {
  /**
   * The visual variant of the Tiles component.
   */
  variant?: TilesVariant
  /**
   * The layout density of the Tiles grid.
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
    const getChildCount = (childNodes: React.ReactNode): number =>
      React.Children.toArray(childNodes).reduce<number>(
        (count, child) => count + (isFragmentElement(child) ? getChildCount(child.props.children) : 1),
        0,
      )

    const getBalancedColumnCount = (itemCount: number, maximumTilesPerRow: number) => {
      if (itemCount === 0) return 1

      const fewestRowsNeeded = Math.ceil(itemCount / maximumTilesPerRow)
      return Math.ceil(itemCount / fewestRowsNeeded)
    }

    const itemCount = getChildCount(children)

    if ((process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') && itemCount > 9) {
      // eslint-disable-next-line no-console
      console.warn('Tiles: Use no more than 9 items.')
    }

    const maximumTilesPerRow = maximumTilesPerRowByViewport[layout]
    const gridStyle = {
      '--tiles-columns-xsmall': getBalancedColumnCount(itemCount, maximumTilesPerRow.xsmall),
      '--tiles-columns-small': getBalancedColumnCount(itemCount, maximumTilesPerRow.small),
      '--tiles-columns-medium': getBalancedColumnCount(itemCount, maximumTilesPerRow.medium),
      '--tiles-columns-large': getBalancedColumnCount(itemCount, maximumTilesPerRow.large),
    } as React.CSSProperties

    return (
      <TilesContext.Provider value={layout}>
        <div
          ref={ref}
          className={clsx(
            styles.Tiles,
            styles[`Tiles--variant-${variant}`],
            styles[`Tiles--layout-${layout}`],
            variant === 'gridlines' && gridlineStyles.gridline,
            className,
          )}
          data-testid={testId || testIds.root}
          {...rest}
        >
          <ul className={styles['Tiles-grid']} data-testid={testIds.grid} style={gridStyle}>
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

    const content = (
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
