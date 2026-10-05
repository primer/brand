import {CheckIcon, ChevronDownIcon, DashIcon} from '@primer/octicons-react'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/feature-comparison-table/colors-with-modes.css'
import {clsx} from 'clsx'
import React, {forwardRef, PropsWithChildren, useLayoutEffect, useMemo, useRef, useState} from 'react'
import {Button, type ButtonBaseProps} from '../Button'
import {useAnimation} from '../animation'
import type {BaseProps} from '../component-helpers'
import {Heading as HeadingComponent, type HeadingProps} from '../Heading'
import {Text} from '../Text'
import {Tooltip} from '../Tooltip'
import {useId} from '../hooks/useId'
import {useProvidedRefOrCreate} from '../hooks/useRef'
import {useWindowSize} from '../hooks/useWindowSize'
import styles from './FeatureComparisonTable.module.css'

export type FeatureComparisonTableProps = PropsWithChildren<
  BaseProps<HTMLDivElement> &
    React.HTMLAttributes<HTMLDivElement> & {
      'data-testid'?: string
      /**
       * Keeps regular and wide table headers fixed to the viewport while scrolling.
       * Ancestors must not set overflow in a way that changes the sticky containing block.
       */
      hasStickyHeaders?: boolean
      rowHighlighting?: boolean
    }
>

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
  regularSummary: 'FeatureComparisonTable__regularSummary',
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

  const {
    children,
    as = 'h3',
    size = 'subhead-medium',
    className,
    id: _id,
    ...rest
  } = item.heading.props as FeatureComparisonTableHeadingProps & {id?: string}
  return (
    <HeadingComponent as={as} size={size} {...rest} {...props} className={clsx(className, props?.className)}>
      {children}
    </HeadingComponent>
  )
}

const renderTableHeading = (
  heading: React.ReactElement<FeatureComparisonTableHeadingProps>,
  id: string,
  className?: string,
) => {
  const {
    children,
    as = 'h2',
    size = 'subhead-large',
    className: headingClassName,
    id: _id,
    ...rest
  } = heading.props as FeatureComparisonTableHeadingProps & {id?: string}

  return (
    <HeadingComponent
      as={as}
      size={size}
      className={clsx(headingClassName, className)}
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
  const {
    children,
    className,
    id: _id,
    ...rest
  } = description.props as FeatureComparisonTableDescriptionProps & {
    id?: string
  }
  return (
    <Text
      as="p"
      size="200"
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
  const {children, className, id: _id, ...rest} = price.props as FeatureComparisonTablePriceProps & {id?: string}

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
  const {
    as,
    children,
    className,
    id: _id,
    ...rest
  } = action.props as FeatureComparisonTableActionProps & {
    id?: string
  }
  return (
    <Button
      {...(rest as Omit<FeatureComparisonTableActionProps, 'as' | 'children'>)}
      as={as}
      className={className}
      variant={variant}
      size="small"
      block
    >
      {children}
    </Button>
  )
}

const renderItemSummary = (item: NormalizedItem, index: number, projection: 'regular' | 'wide') => {
  const {className} = item.element.props
  const showLabel = projection === 'wide' && Boolean(item.label)
  const {
    children: labelChildren,
    className: labelClassName,
    id: _labelId,
    ...labelRest
  } = (item.label?.props as (FeatureComparisonTableLabelProps & {id?: string}) | undefined) ?? {}

  return (
    <section
      className={clsx(
        styles.FeatureComparisonTable__item,
        showLabel && styles['FeatureComparisonTable__headingGrid--hasLabel'],
        item.label && styles.FeatureComparisonTable__promoted,
        className,
      )}
      data-projection={projection}
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
    id: _id,
    infoTooltip,
    infoTooltipAriaLabel,
    ...rest
  } = heading.props as FeatureComparisonTableRowHeadingProps & {id?: string}

  return (
    <Text
      as="span"
      size="200"
      variant="muted"
      className={clsx(styles.FeatureComparisonTable__rowHeading, className)}
      {...rest}
    >
      {children}
      {infoTooltip ? (
        <Tooltip text={infoTooltip} direction="n">
          <button
            type="button"
            className={styles.FeatureComparisonTable__info}
            aria-label={
              infoTooltipAriaLabel ??
              // eslint-disable-next-line i18n-text/no-en
              `More information about ${typeof children === 'string' ? children : 'this feature'}`
            }
          >
            <span aria-hidden="true">i</span>
          </button>
        </Tooltip>
      ) : null}
    </Text>
  )
}

const renderCell = (cell: React.ReactElement<FeatureComparisonTableCellProps> | null) => {
  if (!cell) return null
  const {
    children,
    className,
    id: _id,
    variant,
    variantAriaLabel,
    ...rest
  } = cell.props as FeatureComparisonTableCellProps & {id?: string}
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

const FeatureComparisonTableRoot = forwardRef<HTMLDivElement, FeatureComparisonTableProps>(
  (
    {
      animate,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
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
    const rootRef = useProvidedRefOrCreate<HTMLDivElement | null>(ref)
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
      let rootHeading: React.ReactElement<FeatureComparisonTableHeadingProps> | null = null

      for (const child of rootChildren) {
        if (React.isValidElement(child) && child.type === Heading) {
          rootHeading = child as React.ReactElement<FeatureComparisonTableHeadingProps>
        }
      }

      const itemElements = rootChildren.filter(
        (child): child is React.ReactElement<FeatureComparisonTableItemProps> =>
          React.isValidElement(child) && child.type === Item,
      )

      const normalizedItems = itemElements.slice(0, 4).map(element => {
        const item: NormalizedItem = {
          element,
          label: null,
          heading: null,
          description: null,
          price: null,
          primaryAction: null,
          secondaryAction: null,
        }

        for (const child of React.Children.toArray(element.props.children)) {
          if (!React.isValidElement(child)) continue
          if (child.type === Label) item.label = child as React.ReactElement<FeatureComparisonTableLabelProps>
          if (child.type === Heading) item.heading = child as React.ReactElement<FeatureComparisonTableHeadingProps>
          if (child.type === Description)
            item.description = child as React.ReactElement<FeatureComparisonTableDescriptionProps>
          if (child.type === Price) item.price = child as React.ReactElement<FeatureComparisonTablePriceProps>
          if (child.type === PrimaryAction)
            item.primaryAction = child as React.ReactElement<FeatureComparisonTableActionProps>
          if (child.type === SecondaryAction)
            item.secondaryAction = child as React.ReactElement<FeatureComparisonTableActionProps>
        }

        return item
      })

      const normalizedGroups = rootChildren
        .filter(
          (child): child is React.ReactElement<FeatureComparisonTableGroupProps> =>
            React.isValidElement(child) && child.type === Group,
        )
        .map((element, groupIndex) => {
          const group: NormalizedGroup = {
            element,
            heading: null,
            identity: element.key === null ? `index:${groupIndex}` : `key:${String(element.key)}`,
            rows: [],
          }

          for (const child of React.Children.toArray(element.props.children)) {
            if (!React.isValidElement(child)) continue
            if (child.type === GroupHeading) {
              group.heading = child as React.ReactElement<FeatureComparisonTableGroupHeadingProps>
            }
            if (child.type === Row) {
              const rowElement = child as React.ReactElement<FeatureComparisonTableRowProps>
              const row: NormalizedRow = {element: rowElement, heading: null, cells: []}
              const rowChildren = React.Children.toArray(rowElement.props.children)
              const cellElements = rowChildren.filter(
                (rowChild): rowChild is React.ReactElement<FeatureComparisonTableCellProps> =>
                  React.isValidElement(rowChild) && rowChild.type === Cell,
              )

              if (process.env.NODE_ENV !== 'production' && cellElements.length !== normalizedItems.length) {
                // eslint-disable-next-line no-console
                console.warn(
                  `FeatureComparisonTable.Row: expected ${normalizedItems.length} Cell children to match the number of items, but received ${cellElements.length}. Missing cells render empty and extra cells are ignored.`,
                )
              }

              for (const rowChild of rowChildren) {
                if (!React.isValidElement(rowChild)) continue
                if (rowChild.type === RowHeading) {
                  row.heading = rowChild as React.ReactElement<FeatureComparisonTableRowHeadingProps>
                }
                if (rowChild.type === Cell && row.cells.length < normalizedItems.length) {
                  row.cells.push(rowChild as React.ReactElement<FeatureComparisonTableCellProps>)
                }
              }

              while (row.cells.length < normalizedItems.length) row.cells.push(null)
              group.rows.push(row)
            }
          }

          return group
        })

      return {heading: rootHeading, items: normalizedItems, groups: normalizedGroups}
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

      const changedProjection = (previous === 'narrow') !== (breakpoint === 'narrow')
      if (!changedProjection) return

      const activeElement = document.activeElement
      const previousControls = previous === 'narrow' ? narrowGroupControls.current : tableGroupControls.current
      const nextControls = breakpoint === 'narrow' ? narrowGroupControls.current : tableGroupControls.current
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

      if (hasStickyHeaders && breakpoint !== 'narrow' && table?.contains(target) && !target.closest('thead')) {
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

    const narrowHeadingId = `${instanceId}-narrow-heading`
    const tableHeadingId = `${instanceId}-table-heading`
    const resolvedRootAriaLabelledBy =
      ariaLabelledBy ??
      (!ariaLabel && heading ? (breakpoint === 'narrow' ? narrowHeadingId : tableHeadingId) : undefined)
    const resolvedTableAriaLabelledBy = ariaLabelledBy ?? (!ariaLabel && heading ? tableHeadingId : undefined)

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
          styles[`FeatureComparisonTable--items${items.length}`],
          hasStickyHeaders && styles['FeatureComparisonTable--stickyHeaders'],
          rowHighlighting && styles['FeatureComparisonTable--rowHighlighting'],
          animationClasses,
          className,
        )}
        data-testid={testId || testIds.root}
        ref={rootRef}
        aria-label={ariaLabel}
        aria-labelledby={resolvedRootAriaLabelledBy}
        onFocus={handleFocus}
        style={{...animationInlineStyles, ...style}}
        {...rest}
      >
        <div className={styles.FeatureComparisonTable__narrow} data-testid={testIds.narrow}>
          {heading ? renderTableHeading(heading, narrowHeadingId, 'visually-hidden') : null}
          {groups.map((group, groupIndex) => {
            const groupId = `${instanceId}-narrow-group-${groupIndex}`
            const groupOpen = groupStates[group.identity].open
            const headingProps = group.heading?.props
            const {
              children: groupHeadingChildren,
              as: GroupHeadingTag = 'h3',
              size = 'subhead-large',
              className: groupHeadingClassName,
              id: _groupHeadingId,
              ...groupHeadingRest
            } = (headingProps as (FeatureComparisonTableGroupHeadingProps & {id?: string}) | undefined) ?? {}

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
                  <HeadingComponent
                    as={GroupHeadingTag}
                    size={size}
                    className={groupHeadingClassName}
                    {...groupHeadingRest}
                  >
                    {groupHeadingChildren}
                  </HeadingComponent>
                  <ChevronDownIcon
                    aria-hidden="true"
                    size={16}
                    className={clsx(
                      styles.FeatureComparisonTable__chevron,
                      groupOpen && styles['FeatureComparisonTable__chevron--expanded'],
                    )}
                  />
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

        <div className={styles.FeatureComparisonTable__regularSummary} data-testid={testIds.regularSummary}>
          {Array.from({length: Math.ceil(items.length / 2)}, (_, rowIndex) => {
            const rowItems = items.slice(rowIndex * 2, rowIndex * 2 + 2)

            return (
              <div className={styles.FeatureComparisonTable__summaryRow} key={`${instanceId}-summary-row-${rowIndex}`}>
                {rowItems.map((item, itemIndex) => {
                  const absoluteItemIndex = rowIndex * 2 + itemIndex

                  return (
                    <React.Fragment key={`${instanceId}-regular-item-${absoluteItemIndex}`}>
                      {renderItemSummary(item, absoluteItemIndex, 'regular')}
                    </React.Fragment>
                  )
                })}
              </div>
            )
          })}
        </div>

        <table
          aria-label={ariaLabel}
          aria-labelledby={resolvedTableAriaLabelledBy}
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
            className={clsx(items.some(item => item.label) && styles['FeatureComparisonTable__headingGrid--hasLabel'])}
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
                  <div className={styles.FeatureComparisonTable__compactHeading}>
                    {renderItemHeading(item, itemIndex + 1)}
                  </div>
                  <div className={styles.FeatureComparisonTable__wideSummary}>
                    {renderItemSummary(item, itemIndex, 'wide')}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          {groups.map((group, groupIndex) => {
            const groupControlId = `${instanceId}-table-group-control-${groupIndex}`
            const groupId = `${instanceId}-table-group-${groupIndex}`
            const groupOpen = groupStates[group.identity].open
            const headingProps = group.heading?.props
            const {
              children: groupHeadingChildren,
              as: GroupHeadingTag = 'h3',
              size = 'subhead-large',
              className: groupHeadingClassName,
              id: _groupHeadingId,
              ...groupHeadingRest
            } = (headingProps as (FeatureComparisonTableGroupHeadingProps & {id?: string}) | undefined) ?? {}

            return (
              <React.Fragment key={group.identity}>
                <tbody>
                  <tr>
                    <th colSpan={items.length + 1} scope="rowgroup">
                      <div className={styles.FeatureComparisonTable__groupBackground} aria-hidden="true">
                        <span />
                        {items.map((item, itemIndex) => (
                          <span
                            key={itemIndex}
                            className={clsx(item.label && styles.FeatureComparisonTable__promoted)}
                          />
                        ))}
                      </div>
                      <HeadingComponent
                        as={GroupHeadingTag}
                        size={size}
                        className={groupHeadingClassName}
                        {...groupHeadingRest}
                      >
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
                          {groupHeadingChildren}
                          <ChevronDownIcon
                            aria-hidden="true"
                            size={16}
                            className={clsx(
                              styles.FeatureComparisonTable__chevron,
                              groupOpen && styles['FeatureComparisonTable__chevron--expanded'],
                            )}
                          />
                        </button>
                      </HeadingComponent>
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
                          className={clsx(items[cellIndex].label && styles.FeatureComparisonTable__promoted)}
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
