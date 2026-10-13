import React, {type PropsWithChildren, useEffect} from 'react'
import {clsx} from 'clsx'
import {Text} from '../../Text'
import styles from '../FeatureComparisonTable.module.css'
import {type FeatureComparisonTableBaseProps, useTableContext, testIds} from '../FeatureComparisonTableContext'
import {getChildrenOfType, hasItemLabel} from '../FeatureComparisonTableHelpers'
import {FeatureComparisonTableRowHeading} from './FeatureComparisonTableRowHeading'
import {FeatureComparisonTableRowDescription} from './FeatureComparisonTableRowDescription'
import {FeatureComparisonTableCell} from './FeatureComparisonTableCell'
import {FeatureComparisonTableItemHeading} from './FeatureComparisonTableItemHeading'

export type FeatureComparisonTableRowProps = PropsWithChildren<FeatureComparisonTableBaseProps<HTMLDivElement>>

export const FeatureComparisonTableRow = ({children, className}: FeatureComparisonTableRowProps) => {
  const {items, breakpoint} = useTableContext()
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
        {heading}
        {description}
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
              cells[index]?.props.variant && styles['FeatureComparisonTable__tableCell--hasVariant'],
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
