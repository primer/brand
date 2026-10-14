import React, {type PropsWithChildren, useCallback, useState} from 'react'
import {ChevronDownIcon} from '@primer/octicons-react'
import {clsx} from 'clsx'
import styles from '../FeatureComparisonTable.module.css'
import gridlineStyles from '../../component-helpers/shared.module.css'
import {type FeatureComparisonTableBaseProps, useTableContext, testIds} from '../FeatureComparisonTableContext'
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

export const FeatureComparisonTableGroup = ({children, className, expanded}: FeatureComparisonTableGroupProps) => {
  const {
    instanceId,
    breakpoint,
    items,
    narrowGroupControlsRef,
    tableGroupControlsRef,
    groupIndex: index,
    groupIdentity: identity,
  } = useTableContext()
  const groupChildren = React.Children.toArray(children)
  const heading = getChildrenOfType(groupChildren, FeatureComparisonTableGroupHeading).at(-1)
  const rows = getChildrenOfType(groupChildren, FeatureComparisonTableRow)
  const signature =
    typeof expanded === 'boolean'
      ? String(expanded)
      : expanded
      ? `${expanded.narrow}-${expanded.regular}-${expanded.wide}`
      : 'default'
  const defaultOpen =
    typeof expanded === 'boolean' ? expanded : expanded ? expanded[breakpoint] : breakpoint !== 'narrow'
  const [state, setState] = useState({breakpoint, signature, open: defaultOpen})
  const open = state.breakpoint === breakpoint && state.signature === signature ? state.open : defaultOpen

  if (state.breakpoint !== breakpoint || state.signature !== signature) {
    setState({breakpoint, signature, open})
  }

  const setOpen = (nextOpen: boolean) =>
    setState(previous => (previous.open === nextOpen ? previous : {...previous, open: nextOpen}))
  const registerTableGroupControl = useCallback(
    (element: HTMLButtonElement | null) => {
      tableGroupControlsRef.current[identity] = element
    },
    [identity, tableGroupControlsRef],
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
            narrowGroupControlsRef.current[identity] = control
          }}
        >
          {heading ?? <FeatureComparisonTableGroupHeading />}
          {chevron}
        </summary>
        <div id={groupId}>{rows}</div>
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
        {rows}
      </tbody>
    </>
  )
}
