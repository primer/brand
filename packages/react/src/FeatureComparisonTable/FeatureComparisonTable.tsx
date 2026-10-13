import React, {forwardRef, type PropsWithChildren, useEffect, useRef, useState} from 'react'
import {clsx} from 'clsx'
import type {BaseProps} from '../component-helpers'
import {useAnimation} from '../animation'
import {useId} from '../hooks/useId'
import {useWindowSize} from '../hooks/useWindowSize'
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect'
import {type BreakpointCategory, type TableContextValue, TableContext, testIds} from './FeatureComparisonTableContext'
import {getChildrenOfType, hasItemLabel} from './FeatureComparisonTableHelpers'
import {
  FeatureComparisonTableHeading,
  FeatureComparisonTableItem,
  FeatureComparisonTableGroup,
  FeatureComparisonTableLabel,
  FeatureComparisonTableItemHeading,
  FeatureComparisonTableDescription,
  FeatureComparisonTablePrice,
  FeatureComparisonTablePrimaryAction,
  FeatureComparisonTableSecondaryAction,
  FeatureComparisonTableGroupHeading,
  FeatureComparisonTableRow,
  FeatureComparisonTableRowHeading,
  FeatureComparisonTableRowDescription,
  FeatureComparisonTableCell,
} from './sub-components'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/feature-comparison-table/base.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/feature-comparison-table/colors-with-modes.css'

/**
 * Main stylesheet (as a CSS Module)
 */
import styles from './FeatureComparisonTable.module.css'
import gridlineStyles from '../component-helpers/shared.module.css'

export type FeatureComparisonTableProps = PropsWithChildren<
  BaseProps<HTMLDivElement> &
    Omit<React.HTMLAttributes<HTMLDivElement>, 'aria-label' | 'aria-labelledby'> & {
      /**
       * Use a root FeatureComparisonTable.Heading to name the comparison.
       * It labels the wide table; aria-label on the wrapper would not label that table.
       */
      'aria-label'?: never
      /**
       * The wide table is labelled by the root FeatureComparisonTable.Heading.
       * Use that child instead of setting aria-labelledby on the wrapper.
       */
      'aria-labelledby'?: never
      'data-testid'?: string
      /**
       * Keeps wide table headers fixed to the viewport while scrolling.
       * Ancestors must not set overflow in a way that changes the sticky containing block.
       */
      hasStickyHeaders?: boolean
      /**
       * Highlights rows on hover or keyboard focus. Enabled by default.
       */
      rowHighlighting?: boolean
    }
>

const FeatureComparisonTableRoot = forwardRef<HTMLDivElement, FeatureComparisonTableProps>(
  (
    {
      animate,
      children,
      className,
      hasStickyHeaders = false,
      onBlur,
      onFocus,
      rowHighlighting = true,
      style,
      'data-testid': testId,
      ...rest
    },
    ref,
  ) => {
    const instanceId = useId()
    const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)
    const {width, isMedium: isRegular, isXLarge: isWide} = useWindowSize()
    const [breakpoint, setBreakpoint] = useState<BreakpointCategory>('narrow')
    const tableRef = useRef<HTMLTableElement>(null)
    const narrowGroupControlsRef = useRef<Record<string, HTMLElement | null>>({})
    const tableGroupControlsRef = useRef<Record<string, HTMLButtonElement | null>>({})
    const previousBreakpointRef = useRef(breakpoint)
    const blurredElementRef = useRef<HTMLElement | null>(null)
    const focusedGroupIdentityRef = useRef<string | undefined>(undefined)
    const rootChildren = React.Children.toArray(children)
    const heading = getChildrenOfType(rootChildren, FeatureComparisonTableHeading).at(-1)
    const allItems = getChildrenOfType(rootChildren, FeatureComparisonTableItem)
    const items = allItems.slice(0, 4)
    const groups = getChildrenOfType(rootChildren, FeatureComparisonTableGroup)
    const hasLabels = items.some(hasItemLabel)

    useEffect(() => {
      if (process.env.NODE_ENV !== 'production' && allItems.length > 4) {
        // eslint-disable-next-line no-console
        console.warn(
          `FeatureComparisonTable: supports at most 4 Item children, but received ${allItems.length}. Extra items are ignored.`,
        )
      }
    }, [allItems.length])

    useEffect(() => {
      const nextBreakpoint = isWide ? 'wide' : isRegular ? 'regular' : 'narrow'
      const previous = previousBreakpointRef.current

      if ((previous === 'wide') !== (nextBreakpoint === 'wide')) {
        // Capture focus before the previous projection unmounts and clears its refs.
        const activeElement =
          document.activeElement === document.body ? blurredElementRef.current : document.activeElement
        const previousControls = previous === 'wide' ? tableGroupControlsRef.current : narrowGroupControlsRef.current
        focusedGroupIdentityRef.current = Object.entries(previousControls).find(
          ([, control]) => control !== null && control === activeElement,
        )?.[0]
      }
      blurredElementRef.current = null
      setBreakpoint(nextBreakpoint)
    }, [isRegular, isWide, width])

    useIsomorphicLayoutEffect(() => {
      const previous = previousBreakpointRef.current
      previousBreakpointRef.current = breakpoint
      blurredElementRef.current = null
      if ((previous === 'wide') === (breakpoint === 'wide')) return
      const nextControls = breakpoint === 'wide' ? tableGroupControlsRef.current : narrowGroupControlsRef.current
      if (focusedGroupIdentityRef.current) {
        nextControls[focusedGroupIdentityRef.current]?.focus()
        focusedGroupIdentityRef.current = undefined
      }
    }, [breakpoint])

    const handleFocus = (event: React.FocusEvent<HTMLDivElement>) => {
      const table = tableRef.current
      const target = event.target
      if (hasStickyHeaders && breakpoint === 'wide' && table?.contains(target) && !target.closest('thead')) {
        if (target.closest('tbody')) {
          const stickyHeaderBottom = Array.from(table.querySelectorAll<HTMLTableCellElement>('thead th')).reduce(
            (maximumBottom, header) => {
              const rect = header.getBoundingClientRect()
              const isVisible = rect.bottom > 0 && rect.top < window.innerHeight
              return isVisible ? Math.max(maximumBottom, rect.bottom) : maximumBottom
            },
            0,
          )
          const targetRect = target.getBoundingClientRect()
          const targetStyles = window.getComputedStyle(target)
          const focusIndicatorClearance = Math.max(
            0,
            (Number.parseFloat(targetStyles.outlineWidth) || 0) + (Number.parseFloat(targetStyles.outlineOffset) || 0),
          )
          if (
            stickyHeaderBottom > 0 &&
            targetRect.bottom > 0 &&
            targetRect.top - focusIndicatorClearance < stickyHeaderBottom
          ) {
            window.scrollBy({top: targetRect.top - stickyHeaderBottom - focusIndicatorClearance, behavior: 'instant'})
          }
        }
      }
      onFocus?.(event)
    }

    if (items.length === 0) return null
    if (!heading && process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn('FeatureComparisonTable: a root FeatureComparisonTable.Heading child is required.')
    }

    const tableContext: TableContextValue = {
      instanceId,
      breakpoint,
      items,
      itemIndex: 0,
      groupIndex: 0,
      groupIdentity: '',
      narrowGroupControlsRef,
      tableGroupControlsRef,
    }
    const groupElements = groups.map((group, index) => (
      <TableContext.Provider
        value={{...tableContext, groupIndex: index, groupIdentity: String(group.key)}}
        key={group.key}
      >
        {group}
      </TableContext.Provider>
    ))

    return (
      <TableContext.Provider value={tableContext}>
        <div
          className={clsx(
            styles.FeatureComparisonTable,
            gridlineStyles.gridline,
            items.length > 1 && styles[`FeatureComparisonTable--items${items.length}`],
            hasStickyHeaders && styles['FeatureComparisonTable--stickyHeaders'],
            rowHighlighting && styles['FeatureComparisonTable--rowHighlighting'],
            animationClasses,
            className,
          )}
          data-testid={testId || testIds.root}
          ref={ref}
          onBlur={event => {
            if (window.innerWidth !== width || Boolean(isWide) !== (breakpoint === 'wide'))
              blurredElementRef.current = event.target
            onBlur?.(event)
          }}
          onFocus={handleFocus}
          style={{...animationInlineStyles, ...style}}
          {...rest}
        >
          {breakpoint !== 'wide' ? (
            <div className={styles.FeatureComparisonTable__narrow} data-testid={testIds.narrow}>
              {heading ? (
                <div className={clsx(styles.FeatureComparisonTable__narrowHeading, gridlineStyles.gridline)}>
                  {heading}
                </div>
              ) : null}
              {groupElements}
            </div>
          ) : (
            <table
              aria-labelledby={heading ? heading.props.id || `${instanceId}-heading` : undefined}
              className={styles.FeatureComparisonTable__table}
              data-testid={testIds.table}
              ref={tableRef}
            >
              <colgroup>
                <col className={styles.FeatureComparisonTable__featureColumn} />
                {items.map(item => (
                  <col key={item.key} />
                ))}
              </colgroup>
              <thead className={styles.FeatureComparisonTable__head}>
                <tr
                  className={clsx(
                    groups.length > 0 && gridlineStyles.gridline,
                    styles.FeatureComparisonTable__headingGrid,
                    hasLabels && styles['FeatureComparisonTable__headingGrid--hasLabel'],
                  )}
                >
                  <th
                    className={clsx(
                      styles.FeatureComparisonTable__headerCell,
                      hasLabels && styles['FeatureComparisonTable__headerCell--hasLabel'],
                    )}
                    scope="col"
                  >
                    {heading ? (
                      React.cloneElement(heading, {
                        className: clsx(
                          heading.props.className,
                          styles.FeatureComparisonTable__tableHeading,
                          hasLabels && styles['FeatureComparisonTable__tableHeading--hasLabel'],
                        ),
                      })
                    ) : (
                      <span className="visually-hidden">Feature</span>
                    )}
                  </th>
                  {items.map((item, index) => (
                    <th
                      className={clsx(
                        styles.FeatureComparisonTable__headerCell,
                        hasLabels && styles['FeatureComparisonTable__headerCell--hasLabel'],
                        hasItemLabel(item) && styles.FeatureComparisonTable__highlightedColumn,
                      )}
                      scope="col"
                      key={item.key}
                    >
                      <TableContext.Provider value={{...tableContext, itemIndex: index + 1}}>
                        {item}
                      </TableContext.Provider>
                    </th>
                  ))}
                </tr>
              </thead>
              {groupElements}
            </table>
          )}
        </div>
      </TableContext.Provider>
    )
  },
)

/**
 * Feature comparison tables compare plan metadata and feature availability across two to four plans.
 */
export const FeatureComparisonTable = Object.assign(FeatureComparisonTableRoot, {
  Item: FeatureComparisonTableItem,
  Label: FeatureComparisonTableLabel,
  Heading: FeatureComparisonTableHeading,
  ItemHeading: FeatureComparisonTableItemHeading,
  Description: FeatureComparisonTableDescription,
  Price: FeatureComparisonTablePrice,
  PrimaryAction: FeatureComparisonTablePrimaryAction,
  SecondaryAction: FeatureComparisonTableSecondaryAction,
  Group: FeatureComparisonTableGroup,
  GroupHeading: FeatureComparisonTableGroupHeading,
  Row: FeatureComparisonTableRow,
  RowHeading: FeatureComparisonTableRowHeading,
  RowDescription: FeatureComparisonTableRowDescription,
  Cell: FeatureComparisonTableCell,
  testIds,
})

export type {
  FeatureComparisonTableHeadingProps,
  FeatureComparisonTableItemHeadingProps,
  FeatureComparisonTableLabelProps,
  FeatureComparisonTableDescriptionProps,
  FeatureComparisonTablePriceProps,
  FeatureComparisonTableActionProps,
  FeatureComparisonTableItemProps,
  FeatureComparisonTableRowHeadingProps,
  FeatureComparisonTableRowDescriptionProps,
  FeatureComparisonTableCellProps,
  FeatureComparisonTableRowProps,
  FeatureComparisonTableGroupHeadingProps,
  FeatureComparisonTableGroupProps,
} from './sub-components'
