import React, {type PropsWithChildren} from 'react'
import {clsx} from 'clsx'
import styles from '../FeatureComparisonTable.module.css'
import {type FeatureComparisonTableBaseProps, useTableContext, testIds} from '../FeatureComparisonTableContext'
import {getChildrenOfType, hasItemLabel} from '../FeatureComparisonTableHelpers'
import {FeatureComparisonTableLabel} from './FeatureComparisonTableLabel'
import {FeatureComparisonTableItemHeading} from './FeatureComparisonTableItemHeading'
import {FeatureComparisonTableDescription} from './FeatureComparisonTableDescription'
import {FeatureComparisonTablePrice} from './FeatureComparisonTablePrice'
import {FeatureComparisonTablePrimaryAction} from './FeatureComparisonTablePrimaryAction'
import {FeatureComparisonTableSecondaryAction} from './FeatureComparisonTableSecondaryAction'

export type FeatureComparisonTableItemProps = PropsWithChildren<FeatureComparisonTableBaseProps<HTMLDivElement>>

export const FeatureComparisonTableItem = ({children, className}: FeatureComparisonTableItemProps) => {
  const {items, itemIndex} = useTableContext()
  const itemChildren = React.Children.toArray(children)
  const label = getChildrenOfType(itemChildren, FeatureComparisonTableLabel).at(-1)
  const heading = getChildrenOfType(itemChildren, FeatureComparisonTableItemHeading).at(-1)
  const description = getChildrenOfType(itemChildren, FeatureComparisonTableDescription).at(-1)
  const price = getChildrenOfType(itemChildren, FeatureComparisonTablePrice).at(-1)
  const primaryAction = getChildrenOfType(itemChildren, FeatureComparisonTablePrimaryAction).at(-1)
  const secondaryAction = getChildrenOfType(itemChildren, FeatureComparisonTableSecondaryAction).at(-1)
  const hasLabels = items.some(hasItemLabel)

  return (
    <section
      className={clsx(
        styles.FeatureComparisonTable__item,
        label && styles['FeatureComparisonTable__item--hasLabel'],
        hasLabels && !label && styles['FeatureComparisonTable__item--offset'],
        label && styles.FeatureComparisonTable__highlightedColumn,
        className,
      )}
      data-testid={testIds.item}
    >
      {label}
      <div
        className={clsx(
          styles.FeatureComparisonTable__itemContent,
          label && styles['FeatureComparisonTable__itemContent--hasLabel'],
        )}
      >
        {heading ? (
          React.cloneElement(heading, {
            className: clsx(styles.FeatureComparisonTable__itemHeading, heading.props.className),
          })
        ) : (
          <span className={styles.FeatureComparisonTable__itemHeading}>{itemIndex}</span>
        )}
        {description}
        {price}
        {primaryAction || secondaryAction ? (
          <div className={styles.FeatureComparisonTable__actions}>
            {primaryAction}
            {secondaryAction}
          </div>
        ) : null}
      </div>
    </section>
  )
}
