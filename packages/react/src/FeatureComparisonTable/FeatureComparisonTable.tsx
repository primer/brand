import {CheckIcon, ChevronDownIcon, DashIcon} from '@primer/octicons-react'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/feature-comparison-table/colors-with-modes.css'
import {clsx} from 'clsx'
import React, {forwardRef, type PropsWithChildren, useLayoutEffect, useMemo, useRef, useState} from 'react'
import {Button, type ButtonBaseProps} from '../Button'
import {useAnimation} from '../animation'
import type {BaseProps} from '../component-helpers'
import gridlineStyles from '../component-helpers/shared.module.css'
import {Heading as HeadingComponent, type HeadingProps} from '../Heading'
import {Text} from '../Text'
import {useId} from '../hooks/useId'
import {useWindowSize} from '../hooks/useWindowSize'
import styles from './FeatureComparisonTable.module.css'

export type FeatureComparisonTableProps = BaseProps<HTMLDivElement> &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'aria-label' | 'aria-labelledby'> & {
    /**
     * Include a root FeatureComparisonTable.Heading to name the comparison.
     */
    children: React.ReactNode
    'aria-label'?: never
    'aria-labelledby'?: never
    'data-testid'?: string
    /**
     * Keeps wide table headers fixed to the viewport while scrolling.
     * Ancestors must not set overflow in a way that changes the sticky containing block.
     */
    hasStickyHeaders?: boolean
    rowHighlighting?: boolean
  }

type ProjectedBaseProps<T> = Omit<BaseProps<T>, 'animate' | 'id' | 'ref'>
type AnimatedProjectedBaseProps<T> = Omit<BaseProps<T>, 'id' | 'ref'>

export type FeatureComparisonTableItemProps = PropsWithChildren<ProjectedBaseProps<HTMLDivElement>>
export type FeatureComparisonTableLabelProps = PropsWithChildren<ProjectedBaseProps<HTMLSpanElement>>
export type FeatureComparisonTableHeadingProps = PropsWithChildren<Omit<HeadingProps, 'id' | 'ref'>>
export type FeatureComparisonTableDescriptionProps = PropsWithChildren<AnimatedProjectedBaseProps<HTMLParagraphElement>>
export type FeatureComparisonTablePriceProps = PropsWithChildren<AnimatedProjectedBaseProps<HTMLParagraphElement>>

type FeatureComparisonTableActionBaseProps = Omit<ButtonBaseProps, 'block' | 'size' | 'variant'>
type FeatureComparisonTableAnchorActionProps = {
  as: 'a'
  href: string
} & FeatureComparisonTableActionBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'id'>
type FeatureComparisonTableButtonActionProps = {
  as: 'button'
} & FeatureComparisonTableActionBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'id'>
export type FeatureComparisonTableActionProps = PropsWithChildren<
  FeatureComparisonTableAnchorActionProps | FeatureComparisonTableButtonActionProps
>

export type FeatureComparisonTableGroupProps = PropsWithChildren<
  ProjectedBaseProps<HTMLDivElement> & {
    expanded?:
      | boolean
      | {
          narrow: boolean
          regular: boolean
          wide: boolean
        }
  }
>
export type FeatureComparisonTableGroupHeadingProps = PropsWithChildren<Omit<HeadingProps, 'id' | 'ref'>>
export type FeatureComparisonTableRowProps = PropsWithChildren<ProjectedBaseProps<HTMLDivElement>>
export type FeatureComparisonTableRowHeadingProps = PropsWithChildren<
  ProjectedBaseProps<HTMLDivElement> & {
    infoTooltip?: string
    infoTooltipAriaLabel?: string
  }
>

type FeatureComparisonTableCellVariantProps =
  | {
      variant?: undefined
      variantAriaLabel?: never
    }
  | {
      variant: 'included' | 'unavailable'
      variantAriaLabel?: string
    }

export type FeatureComparisonTableCellProps = PropsWithChildren<
  ProjectedBaseProps<HTMLDivElement> & FeatureComparisonTableCellVariantProps
>

const testIds = {
  root: 'FeatureComparisonTable',
  heading: 'FeatureComparisonTable__heading',
  narrow: 'FeatureComparisonTable__narrow',
  table: 'FeatureComparisonTable__table',
  item: 'FeatureComparisonTable__item',
  label: 'FeatureComparisonTable__label',
  price: 'FeatureComparisonTable__price',
  group: 'FeatureComparisonTable__group',
  row: 'FeatureComparisonTable__row',
  rowHeading: 'FeatureComparisonTable__rowHeading',
  cell: 'FeatureComparisonTable__cell',
}

const Item = (_props: FeatureComparisonTableItemProps) => null
const Label = (_props: FeatureComparisonTableLabelProps) => null
const Heading = (_props: FeatureComparisonTableHeadingProps) => null
const Description = (_props: FeatureComparisonTableDescriptionProps) => null
const Price = (_props: FeatureComparisonTablePriceProps) => null
const PrimaryAction = (_props: FeatureComparisonTableActionProps) => null
const SecondaryAction = (_props: FeatureComparisonTableActionProps) => null
const Group = (_props: FeatureComparisonTableGroupProps) => null
const GroupHeading = (_props: FeatureComparisonTableGroupHeadingProps) => null
const Row = (_props: FeatureComparisonTableRowProps) => null
const RowHeading = (_props: FeatureComparisonTableRowHeadingProps) => null
const Cell = (_props: FeatureComparisonTableCellProps) => null

type NormalizedItem = {
  element: React.ReactElement<FeatureComparisonTableItemProps>
  label: React.ReactElement<FeatureComparisonTableLabelProps> | null
  heading: React.ReactElement<FeatureComparisonTableHeadingProps> | null
  description: React.ReactElement<FeatureComparisonTableDescriptionProps> | null
  price: React.ReactElement<FeatureComparisonTablePriceProps> | null
  primaryAction: React.ReactElement<FeatureComparisonTableActionProps> | null
  secondaryAction: React.ReactElement<FeatureComparisonTableActionProps> | null
}

type NormalizedRow = {
  element: React.ReactElement<FeatureComparisonTableRowProps>
  heading: React.ReactElement<FeatureComparisonTableRowHeadingProps> | null
  cells: Array<React.ReactElement<FeatureComparisonTableCellProps> | null>
}

type NormalizedGroup = {
  element: React.ReactElement<FeatureComparisonTableGroupProps>
  heading: React.ReactElement<FeatureComparisonTableGroupHeadingProps> | null
  identity: string
  rows: NormalizedRow[]
}

type BreakpointCategory = 'narrow' | 'regular' | 'wide'

type GroupState = {
  signature: string
  open: boolean
}

const getChildrenOfType = <P,>(children: React.ReactNode[], type: React.JSXElementConstructor<P>) =>
  children.filter((child): child is React.ReactElement<P> => React.isValidElement<P>(child) && child.type === type)

// Projected children render in both layouts, so consumer IDs must not be duplicated.
const withoutId = <P,>({id: _id, ...props}: P & {id?: string}) => props

const resolveExpanded = (expanded: FeatureComparisonTableGroupProps['expanded'], breakpoint: BreakpointCategory) => {
  if (typeof expanded === 'boolean') return expanded
  if (expanded) return expanded[breakpoint]
  return breakpoint !== 'narrow'
}

const getExpandedSignature = (expanded: FeatureComparisonTableGroupProps['expanded']) => {
  if (typeof expanded === 'boolean') return String(expanded)
  if (!expanded) return 'default'
  return `${expanded.narrow}-${expanded.regular}-${expanded.wide}`
}

const renderItemHeading = (
  item: NormalizedItem,
  fallback: React.ReactNode,
  props?: React.HTMLAttributes<HTMLHeadingElement>,
) => {
  if (!item.heading) {
    return <span {...props}>{fallback}</span>
  }

  const {children, as = 'h3', size = 'subhead-medium', className, ...rest} = withoutId(item.heading.props)
  return (
    <HeadingComponent
      as={as}
      size={size}
      weight="semibold"
      {...rest}
      {...props}
      className={clsx(className, props?.className)}
    >
      {children}
    </HeadingComponent>
  )
}

const renderTableHeading = (
  heading: React.ReactElement<FeatureComparisonTableHeadingProps>,
  id: string,
  className?: string,
) => {
  const {children, as = 'h2', size = 'subhead-large', className: headingClassName, ...rest} = withoutId(heading.props)

  return (
    <HeadingComponent
      as={as}
      size={size}
      weight="semibold"
      className={clsx(
        !heading.props.size && styles.FeatureComparisonTable__tableHeadingText,
        headingClassName,
        className,
      )}
      data-testid={testIds.heading}
      id={id}
      {...rest}
    >
      {children}
    </HeadingComponent>
  )
}

const renderDescription = (description: NormalizedItem['description']) => {
  if (!description) return null
  const {children, className, ...rest} = withoutId(description.props)
  return (
    <Text
      as="p"
      size="100"
      variant="muted"
      className={clsx(styles.FeatureComparisonTable__description, className)}
      {...rest}
    >
      {children}
    </Text>
  )
}

const renderPrice = (price: NormalizedItem['price']) => {
  if (!price) return null
  const {children, className, ...rest} = withoutId(price.props)

  return (
    <Text
      as="p"
      size="100"
      variant="default"
      weight="semibold"
      className={clsx(styles.FeatureComparisonTable__price, className)}
      data-testid={testIds.price}
      {...rest}
    >
      {children}
    </Text>
  )
}

const renderAction = (
  action: React.ReactElement<FeatureComparisonTableActionProps> | null,
  variant: 'primary' | 'secondary',
) => {
  if (!action) return null
  return <Button {...withoutId(action.props)} variant={variant} size="small" block />
}

const renderItemSummary = (item: NormalizedItem, index: number) => {
  const {className} = item.element.props
  const showLabel = Boolean(item.label)
  const {children: labelChildren, className: labelClassName, ...labelRest} = withoutId(item.label?.props ?? {})

  return (
    <section
      className={clsx(
        styles.FeatureComparisonTable__item,
        showLabel && styles['FeatureComparisonTable__headingGrid--hasLabel'],
        item.label && styles.FeatureComparisonTable__promoted,
        className,
      )}
      data-projection="wide"
      data-testid={testIds.item}
    >
      {showLabel ? (
        <div className={styles.FeatureComparisonTable__labelCell} data-testid={testIds.label}>
          <span className={clsx(styles.FeatureComparisonTable__label, labelClassName)} {...labelRest}>
            {labelChildren}
          </span>
        </div>
      ) : null}
      <div
        className={clsx(
          styles.FeatureComparisonTable__itemContent,
          styles['FeatureComparisonTable__itemContent--compact'],
        )}
      >
        {renderItemHeading(item, index + 1, {className: styles.FeatureComparisonTable__heading})}
        {renderDescription(item.description)}
        {renderPrice(item.price)}
        {item.primaryAction || item.secondaryAction ? (
          <div className={styles.FeatureComparisonTable__actions}>
            {renderAction(item.primaryAction, 'primary')}
            {renderAction(item.secondaryAction, 'secondary')}
          </div>
        ) : null}
      </div>
    </section>
  )
}

const renderRowHeading = (heading: NormalizedRow['heading']) => {
  if (!heading) return null
  const {
    children,
    className,
    infoTooltip: _infoTooltip,
    infoTooltipAriaLabel: _infoTooltipAriaLabel,
    ...rest
  } = withoutId(heading.props)

  return (
    <Text
      as="span"
      size="200"
      weight="medium"
      variant="muted"
      className={clsx(styles.FeatureComparisonTable__rowHeading, className)}
      {...rest}
    >
      {children}
    </Text>
  )
}

const renderCell = (cell: React.ReactElement<FeatureComparisonTableCellProps> | null) => {
  if (!cell) return null
  const {children, className, variant, variantAriaLabel, ...rest} = withoutId(cell.props)
  const resolvedVariantAriaLabel = variantAriaLabel ?? (variant === 'included' ? 'Included' : 'Unavailable')

  return (
    <Text
      as="div"
      size="200"
      variant="muted"
      className={clsx(styles.FeatureComparisonTable__cell, className)}
      data-testid={testIds.cell}
      {...rest}
    >
      {variant ? (
        <>
          <span
            className={clsx(
              styles.FeatureComparisonTable__status,
              variant === 'included' && styles['FeatureComparisonTable__status--included'],
            )}
            aria-hidden="true"
          >
            {variant === 'included' ? <CheckIcon size={16} /> : <DashIcon size={16} />}
          </span>
          <span className="visually-hidden">{resolvedVariantAriaLabel}</span>
        </>
      ) : null}
      {children}
    </Text>
  )
}

const renderGroupHeading = (heading: NormalizedGroup['heading'], children: React.ReactNode, className?: string) => {
  const {
    children: _children,
    as = 'h3',
    size = 'subhead-large',
    className: headingClassName,
    ...rest
  } = withoutId(heading?.props ?? {})

  return (
    <HeadingComponent as={as} size={size} weight="semibold" className={clsx(className, headingClassName)} {...rest}>
      {children}
    </HeadingComponent>
  )
}

const renderChevron = (expanded: boolean) => (
  <ChevronDownIcon
    aria-hidden="true"
    size={16}
    className={clsx(
      styles.FeatureComparisonTable__chevron,
      expanded && styles['FeatureComparisonTable__chevron--expanded'],
    )}
  />
)

const FeatureComparisonTableRoot = forwardRef<HTMLDivElement, FeatureComparisonTableProps>(
  (
    {
      animate,
      children,
      className,
      hasStickyHeaders = false,
      onFocus,
      rowHighlighting = false,
      style,
      'data-testid': testId,
      ...rest
    },
    ref,
  ) => {
    const instanceId = useId()
    const {classes: animationClasses, styles: animationInlineStyles} = useAnimation(animate)
    const {isMedium, isXLarge} = useWindowSize()
    const breakpoint: BreakpointCategory = isXLarge ? 'wide' : isMedium ? 'regular' : 'narrow'
    const tableRef = useRef<HTMLTableElement>(null)
    const [disclosureState, setDisclosureState] = useState<{
      breakpoint: BreakpointCategory
      groups: Record<string, GroupState | undefined>
    }>({breakpoint, groups: {}})
    const narrowGroupControls = useRef<Record<string, HTMLElement | null>>({})
    const tableGroupControls = useRef<Record<string, HTMLButtonElement | null>>({})
    const previousBreakpoint = useRef(breakpoint)

    const {heading, items, groups} = useMemo(() => {
      const rootChildren = React.Children.toArray(children)
      const normalizedItems: NormalizedItem[] = getChildrenOfType(rootChildren, Item)
        .slice(0, 4)
        .map(element => {
          const itemChildren = React.Children.toArray(element.props.children)
          return {
            element,
            label: getChildrenOfType(itemChildren, Label).at(-1) ?? null,
            heading: getChildrenOfType(itemChildren, Heading).at(-1) ?? null,
            description: getChildrenOfType(itemChildren, Description).at(-1) ?? null,
            price: getChildrenOfType(itemChildren, Price).at(-1) ?? null,
            primaryAction: getChildrenOfType(itemChildren, PrimaryAction).at(-1) ?? null,
            secondaryAction: getChildrenOfType(itemChildren, SecondaryAction).at(-1) ?? null,
          }
        })

      const normalizedGroups: NormalizedGroup[] = getChildrenOfType(rootChildren, Group).map((element, groupIndex) => {
        const groupChildren = React.Children.toArray(element.props.children)
        return {
          element,
          heading: getChildrenOfType(groupChildren, GroupHeading).at(-1) ?? null,
          identity: element.key === null ? `index:${groupIndex}` : `key:${String(element.key)}`,
          rows: getChildrenOfType(groupChildren, Row).map(rowElement => {
            const rowChildren = React.Children.toArray(rowElement.props.children)
            const cells = getChildrenOfType(rowChildren, Cell)

            if (process.env.NODE_ENV !== 'production' && cells.length !== normalizedItems.length) {
              // eslint-disable-next-line no-console
              console.warn(
                `FeatureComparisonTable.Row: expected ${normalizedItems.length} Cell children to match the number of items, but received ${cells.length}. Missing cells render empty and extra cells are ignored.`,
              )
            }

            return {
              element: rowElement,
              heading: getChildrenOfType(rowChildren, RowHeading).at(-1) ?? null,
              cells: normalizedItems.map((_, index) => cells[index] ?? null),
            }
          }),
        }
      })

      return {
        heading: getChildrenOfType(rootChildren, Heading).at(-1) ?? null,
        items: normalizedItems,
        groups: normalizedGroups,
      }
    }, [children])

    const groupStates = groups.reduce<Record<string, GroupState>>((states, group) => {
      const signature = getExpandedSignature(group.element.props.expanded)
      const previous = disclosureState.groups[group.identity]
      states[group.identity] =
        disclosureState.breakpoint === breakpoint && previous?.signature === signature
          ? previous
          : {signature, open: resolveExpanded(group.element.props.expanded, breakpoint)}
      return states
    }, {})

    if (
      disclosureState.breakpoint !== breakpoint ||
      Object.keys(disclosureState.groups).length !== groups.length ||
      groups.some(group => disclosureState.groups[group.identity] !== groupStates[group.identity])
    ) {
      setDisclosureState({breakpoint, groups: groupStates})
    }

    useLayoutEffect(() => {
      const previous = previousBreakpoint.current
      previousBreakpoint.current = breakpoint

      const changedProjection = (previous === 'wide') !== (breakpoint === 'wide')
      if (!changedProjection) return

      const activeElement = document.activeElement
      const previousControls = previous === 'wide' ? tableGroupControls.current : narrowGroupControls.current
      const nextControls = breakpoint === 'wide' ? tableGroupControls.current : narrowGroupControls.current
      const focusedGroupIdentity = Object.entries(previousControls).find(
        ([, control]) => control === activeElement,
      )?.[0]

      if (focusedGroupIdentity) {
        nextControls[focusedGroupIdentity]?.focus()
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

          if (stickyHeaderBottom > 0 && targetRect.bottom > 0 && targetRect.top < stickyHeaderBottom) {
            window.scrollBy({
              top: targetRect.top - stickyHeaderBottom - focusIndicatorClearance,
              behavior: 'instant',
            })
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

    const narrowHeadingId = `${instanceId}-narrow-heading`
    const tableHeadingId = `${instanceId}-table-heading`

    const updateGroupOpen = (group: NormalizedGroup, open: boolean) => {
      setDisclosureState(previous => {
        const current = previous.groups[group.identity]
        if (!current || current.open === open) return previous
        return {
          ...previous,
          groups: {
            ...previous.groups,
            [group.identity]: {...current, open},
          },
        }
      })
    }

    return (
      <div
        className={clsx(
          styles.FeatureComparisonTable,
          gridlineStyles.gridline,
          styles[`FeatureComparisonTable--items${items.length}`],
          hasStickyHeaders && styles['FeatureComparisonTable--stickyHeaders'],
          rowHighlighting && styles['FeatureComparisonTable--rowHighlighting'],
          animationClasses,
          className,
        )}
        data-testid={testId || testIds.root}
        ref={ref}
        onFocus={handleFocus}
        style={{...animationInlineStyles, ...style}}
        {...rest}
      >
        <div className={styles.FeatureComparisonTable__narrow} data-testid={testIds.narrow}>
          {heading ? (
            <div className={clsx(styles.FeatureComparisonTable__narrowHeading, gridlineStyles.gridline)}>
              {renderTableHeading(heading, narrowHeadingId)}
            </div>
          ) : null}
          {groups.map((group, groupIndex) => {
            const groupId = `${instanceId}-narrow-group-${groupIndex}`
            const groupOpen = groupStates[group.identity].open

            return (
              <details
                className={clsx(styles.FeatureComparisonTable__group, group.element.props.className)}
                data-testid={testIds.group}
                key={group.identity}
                open={groupOpen}
              >
                <summary
                  aria-controls={groupId}
                  aria-expanded={groupOpen}
                  onClick={event => {
                    event.preventDefault()
                    updateGroupOpen(group, !groupOpen)
                  }}
                  ref={control => {
                    narrowGroupControls.current[group.identity] = control
                  }}
                >
                  {renderGroupHeading(group.heading, group.heading?.props.children)}
                  {renderChevron(groupOpen)}
                </summary>
                <div id={groupId} hidden={!groupOpen}>
                  {group.rows.map((row, rowIndex) => (
                    <div
                      className={clsx(styles.FeatureComparisonTable__row, row.element.props.className)}
                      data-testid={testIds.row}
                      key={`${groupId}-row-${rowIndex}`}
                    >
                      <div data-testid={testIds.rowHeading}>{renderRowHeading(row.heading)}</div>
                      <dl>
                        {items.map((item, itemIndex) => (
                          <React.Fragment key={`${groupId}-row-${rowIndex}-item-${itemIndex}`}>
                            <dt className={clsx(item.label && styles.FeatureComparisonTable__promoted)}>
                              {renderItemHeading(item, itemIndex + 1, {
                                className: styles.FeatureComparisonTable__planName,
                              })}
                            </dt>
                            <dd className={clsx(item.label && styles.FeatureComparisonTable__promoted)}>
                              {renderCell(row.cells[itemIndex])}
                            </dd>
                          </React.Fragment>
                        ))}
                      </dl>
                    </div>
                  ))}
                </div>
              </details>
            )
          })}
        </div>

        <table
          aria-labelledby={heading ? tableHeadingId : undefined}
          className={styles.FeatureComparisonTable__table}
          data-testid={testIds.table}
          ref={tableRef}
        >
          <colgroup>
            <col className={styles.FeatureComparisonTable__featureColumn} />
            {items.map((_, itemIndex) => (
              <col key={`${instanceId}-item-column-${itemIndex}`} />
            ))}
          </colgroup>
          <thead
            className={clsx(
              groups.length > 0 && gridlineStyles.gridline,
              styles.FeatureComparisonTable__itemDivider,
              items.some(item => item.label) && styles['FeatureComparisonTable__headingGrid--hasLabel'],
            )}
          >
            <tr>
              <th scope="col">
                {heading ? (
                  renderTableHeading(heading, tableHeadingId, styles.FeatureComparisonTable__tableHeading)
                ) : (
                  <span className="visually-hidden">Feature</span>
                )}
              </th>
              {items.map((item, itemIndex) => (
                <th
                  className={clsx(item.label && styles.FeatureComparisonTable__promoted)}
                  scope="col"
                  key={`${instanceId}-item-${itemIndex}`}
                >
                  <div className={styles.FeatureComparisonTable__wideSummary}>{renderItemSummary(item, itemIndex)}</div>
                </th>
              ))}
            </tr>
          </thead>
          {groups.map((group, groupIndex) => {
            const groupControlId = `${instanceId}-table-group-control-${groupIndex}`
            const groupId = `${instanceId}-table-group-${groupIndex}`
            const groupOpen = groupStates[group.identity].open

            return (
              <React.Fragment key={group.identity}>
                <tbody>
                  <tr>
                    <th
                      className={clsx(
                        groupIndex > 0 && gridlineStyles.gridline,
                        styles.FeatureComparisonTable__groupDivider,
                      )}
                      colSpan={items.length + 1}
                      scope="rowgroup"
                    >
                      <div className={styles.FeatureComparisonTable__groupBackground} aria-hidden="true">
                        <span />
                        {items.map((item, itemIndex) => (
                          <span
                            key={itemIndex}
                            className={clsx(item.label && styles.FeatureComparisonTable__promoted)}
                          />
                        ))}
                      </div>
                      {renderGroupHeading(
                        group.heading,
                        <button
                          aria-controls={groupId}
                          aria-expanded={groupOpen}
                          id={groupControlId}
                          onClick={() => updateGroupOpen(group, !groupOpen)}
                          ref={control => {
                            tableGroupControls.current[group.identity] = control
                          }}
                          type="button"
                        >
                          {group.heading?.props.children}
                          {renderChevron(groupOpen)}
                        </button>,
                        group.heading?.props.size ? undefined : styles.FeatureComparisonTable__groupHeading,
                      )}
                    </th>
                  </tr>
                </tbody>
                <tbody
                  aria-labelledby={groupControlId}
                  className={group.element.props.className}
                  hidden={!groupOpen}
                  id={groupId}
                >
                  {group.rows.map((row, rowIndex) => (
                    <tr
                      className={clsx(styles.FeatureComparisonTable__row, row.element.props.className)}
                      data-testid={testIds.row}
                      key={`${groupId}-row-${rowIndex}`}
                    >
                      <th scope="row" data-testid={testIds.rowHeading}>
                        {renderRowHeading(row.heading)}
                      </th>
                      {row.cells.map((cell, cellIndex) => (
                        <td
                          className={clsx(
                            items[cellIndex].label && styles.FeatureComparisonTable__promoted,
                            cell?.props.variant && styles.FeatureComparisonTable__statusCell,
                          )}
                          key={`${groupId}-row-${rowIndex}-cell-${cellIndex}`}
                        >
                          {renderCell(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </React.Fragment>
            )
          })}
        </table>
      </div>
    )
  },
)

/**
 * Feature comparison tables compare plan metadata and feature availability across two to four plans.
 */
export const FeatureComparisonTable = Object.assign(FeatureComparisonTableRoot, {
  Item,
  Label,
  Heading,
  Description,
  Price,
  PrimaryAction,
  SecondaryAction,
  Group,
  GroupHeading,
  Row,
  RowHeading,
  Cell,
  testIds,
})
