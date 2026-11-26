import React, {type PropsWithChildren, useCallback} from 'react'
import {ChevronDownIcon} from '@primer/octicons-react'
import {clsx} from 'clsx'
import styles from '../FeatureComparisonTable.module.css'
import gridlineStyles from '../../component-helpers/shared.module.css'
import {
  type FeatureComparisonTableBaseProps,
  TableContext,
  useTableContext,
  testIds,
} from '../FeatureComparisonTableContext'
import {getChildrenOfType, hasItemLabel} from '../FeatureComparisonTableHelpers'
import {FeatureComparisonTableGroupHeading} from './FeatureComparisonTableGroupHeading'
import {FeatureComparisonTableRow} from './FeatureComparisonTableRow'

export type FeatureComparisonTableGroupProps = PropsWithChildren<
  FeatureComparisonTableBaseProps<HTMLDivElement> & {
    expanded?:
      | boolean
      | {
          narrow: boolean
          regular: boolean
          wide: boolean
        }
  }
>

export const FeatureComparisonTableGroup = ({children, className}: FeatureComparisonTableGroupProps) => {
  const context = useTableContext()
  const {
    instanceId,
    breakpoint,
    items,
    narrowControlsRef,
    tableControlsRef,
    groupIndex: index,
    groupIdentity: identity,
    groupOpen: open,
    onGroupOpenChange: setOpen,
  } = context
  const groupChildren = React.Children.toArray(children)
  const heading = getChildrenOfType(groupChildren, FeatureComparisonTableGroupHeading).at(-1)
  const rows = getChildrenOfType(groupChildren, FeatureComparisonTableRow)
  const rowElements = rows.map(row => (
    <TableContext.Provider key={row.key} value={{...context, rowIdentity: String(row.key)}}>
      {row}
    </TableContext.Provider>
  ))
  const registerTableGroupControl = useCallback(
    (element: HTMLButtonElement | null) => {
      tableControlsRef.current[identity] = element
    },
    [identity, tableControlsRef],
  )
  const isWide = breakpoint === 'wide'
  const groupId = `${instanceId}-${isWide ? 'table' : 'narrow'}-group-${index}`
  const groupControlId = `${instanceId}-table-group-control-${index}`
  const chevron = (
    <ChevronDownIcon
      aria-hidden="true"
      size={16}
      className={clsx(
        styles.FeatureComparisonTable__chevron,
        open && styles['FeatureComparisonTable__chevron--expanded'],
      )}
    />
  )

  if (!isWide) {
    return (
      <details
        className={clsx(styles.FeatureComparisonTable__group, className)}
        data-testid={testIds.group}
        open={open}
        onToggle={event => {
          if (event.currentTarget.open !== open) setOpen(event.currentTarget.open)
        }}
      >
        <summary
          className={styles.FeatureComparisonTable__summary}
          aria-controls={groupId}
          aria-expanded={open}
          ref={control => {
            narrowControlsRef.current[identity] = control
          }}
        >
          {heading ?? <FeatureComparisonTableGroupHeading />}
          {chevron}
        </summary>
        <div id={groupId}>{rowElements}</div>
      </details>
    )
  }

  const control = (
    <button
      className={styles.FeatureComparisonTable__groupControl}
      aria-controls={groupId}
      aria-expanded={open}
      id={groupControlId}
      onClick={() => setOpen(!open)}
      ref={registerTableGroupControl}
      type="button"
    >
      {heading?.props.children}
      {chevron}
    </button>
  )

  return (
    <>
      <tbody>
        <tr>
          <th
            className={clsx(
              index > 0 && gridlineStyles.gridline,
              styles.FeatureComparisonTable__groupDivider,
              (!open || rows.length === 0) && styles['FeatureComparisonTable__groupDivider--noVisibleRows'],
            )}
            colSpan={items.length + 1}
            scope="rowgroup"
          >
            <div className={styles.FeatureComparisonTable__groupBackground} aria-hidden="true">
              <span />
              {items.map(item => (
                <span
                  key={item.key}
                  className={clsx(hasItemLabel(item) && styles.FeatureComparisonTable__highlightedColumn)}
                />
              ))}
            </div>
            {heading ? (
              React.cloneElement(heading, {children: control})
            ) : (
              <FeatureComparisonTableGroupHeading>{control}</FeatureComparisonTableGroupHeading>
            )}
          </th>
        </tr>
      </tbody>
      <tbody aria-labelledby={groupControlId} className={className} hidden={!open} id={groupId}>
        {rowElements}
      </tbody>
    </>
  )
}
