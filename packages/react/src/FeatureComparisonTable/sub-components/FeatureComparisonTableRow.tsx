import React, {type PropsWithChildren, useEffect, useState} from 'react'
import {clsx} from 'clsx'
import {Text} from '../../Text'
import {useId} from '../../hooks/useId'
import styles from '../FeatureComparisonTable.module.css'
import {type FeatureComparisonTableBaseProps, useTableContext, testIds} from '../FeatureComparisonTableContext'
import {getChildrenOfType, hasItemLabel} from '../FeatureComparisonTableHelpers'
import {FeatureComparisonTableRowHeading} from './FeatureComparisonTableRowHeading'
import {FeatureComparisonTableRowDescription} from './FeatureComparisonTableRowDescription'
import {FeatureComparisonTableCell} from './FeatureComparisonTableCell'
import {FeatureComparisonTableItemHeading} from './FeatureComparisonTableItemHeading'

export type FeatureComparisonTableRowProps = PropsWithChildren<FeatureComparisonTableBaseProps<HTMLDivElement>>

export const FeatureComparisonTableRow = ({children, className}: FeatureComparisonTableRowProps) => {
  const {
    items,
    breakpoint,
    groupIdentity,
    rowIdentity,
    narrowControlsRef,
    tableControlsRef,
    rowControlGroupIdentitiesRef,
    rowDescriptionsOpenRef,
    descriptionToggleLabels,
  } = useTableContext()
  const descriptionId = useId()
  const rowKey = `row:${groupIdentity}:${rowIdentity}`
  // Rows remount when the layout changes, so the open state lives on the root to survive the swap.
  const [descriptionOpen, setDescriptionOpen] = useState(() => rowDescriptionsOpenRef.current[rowKey] ?? false)
  const rowChildren = React.Children.toArray(children)
  const heading = getChildrenOfType(rowChildren, FeatureComparisonTableRowHeading).at(-1)
  const description = getChildrenOfType(rowChildren, FeatureComparisonTableRowDescription).at(-1)
  const cells = getChildrenOfType(rowChildren, FeatureComparisonTableCell)

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' && cells.length !== items.length) {
      // eslint-disable-next-line no-console
      console.warn(
        `FeatureComparisonTable.Row: expected ${items.length} Cell children to match the number of items, but received ${cells.length}. Missing cells render empty and extra cells are ignored.`,
      )
    }
  }, [cells.length, items.length])

  const rowHeading =
    heading && description ? (
      <div className={styles.FeatureComparisonTable__rowHeadingContent}>
        <button
          aria-controls={descriptionId}
          aria-expanded={descriptionOpen}
          className={styles.FeatureComparisonTable__descriptionToggle}
          onClick={() => {
            rowDescriptionsOpenRef.current[rowKey] = !descriptionOpen
            setDescriptionOpen(!descriptionOpen)
          }}
          ref={element => {
            if (element) rowControlGroupIdentitiesRef.current[rowKey] = groupIdentity
            ;(breakpoint === 'wide' ? tableControlsRef : narrowControlsRef).current[rowKey] = element
          }}
          type="button"
        >
          {heading}
          <span className="visually-hidden">
            {descriptionOpen ? descriptionToggleLabels.hide : descriptionToggleLabels.show}
          </span>
          <span
            aria-hidden="true"
            className={clsx(
              styles.FeatureComparisonTable__descriptionIcon,
              descriptionOpen && styles['FeatureComparisonTable__descriptionIcon--expanded'],
            )}
          >
            <svg viewBox="0 0 4 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path
                d="M0.75 3C0.33579 3 0 3.33579 0 3.75C0 4.16421 0.33579 4.5 0.75 4.5H1V6.5H0.75C0.33579 6.5 0 6.8358 0 7.25C0 7.6642 0.33579 8 0.75 8H2.75C3.16421 8 3.5 7.6642 3.5 7.25C3.5 6.8358 3.16421 6.5 2.75 6.5H2.5V3.75C2.5 3.33579 2.16421 3 1.75 3H0.75Z"
                fill="currentColor"
              />
              <path
                d="M2.5 1C2.5 1.55228 2.05229 2 1.5 2C0.94772 2 0.5 1.55228 0.5 1C0.5 0.44772 0.94772 0 1.5 0C2.05229 0 2.5 0.44772 2.5 1Z"
                fill="currentColor"
              />
            </svg>
          </span>
        </button>
        <div hidden={!descriptionOpen} id={descriptionId}>
          {description}
        </div>
      </div>
    ) : (
      heading
    )

  if (breakpoint === 'wide') {
    return (
      <tr className={clsx(styles.FeatureComparisonTable__row, className)} data-testid={testIds.row}>
        <th className={styles.FeatureComparisonTable__rowHeaderCell} scope="row" data-testid={testIds.rowHeading}>
          {rowHeading}
        </th>
        {items.map((item, index) => (
          <td
            className={clsx(
              styles.FeatureComparisonTable__tableCell,
              hasItemLabel(item) && styles.FeatureComparisonTable__highlightedColumn,
            )}
            key={item.key}
          >
            {cells[index]}
          </td>
        ))}
      </tr>
    )
  }

  return (
    <div className={clsx(styles.FeatureComparisonTable__row, className)} data-testid={testIds.row}>
      <div data-testid={testIds.rowHeading}>{rowHeading}</div>
      <dl className={styles.FeatureComparisonTable__planValues}>
        {items.map((item, index) => {
          const itemHeading = getChildrenOfType(
            React.Children.toArray(item.props.children),
            FeatureComparisonTableItemHeading,
          ).at(-1)
          const hasLabel = hasItemLabel(item)
          return (
            <React.Fragment key={item.key}>
              <dt
                className={clsx(
                  styles.FeatureComparisonTable__planTerm,
                  hasLabel && styles.FeatureComparisonTable__highlightedColumn,
                )}
              >
                <Text as="div" size="200" variant="muted" className={styles.FeatureComparisonTable__planName}>
                  {itemHeading ? itemHeading.props.children : index + 1}
                </Text>
              </dt>
              <dd
                className={clsx(
                  styles.FeatureComparisonTable__planValue,
                  hasLabel && styles.FeatureComparisonTable__highlightedColumn,
                )}
              >
                {cells[index]}
              </dd>
            </React.Fragment>
          )
        })}
      </dl>
    </div>
  )
}
