import React, {createContext, forwardRef, type PropsWithChildren, useContext, useEffect, useRef, useState} from 'react'
import {CheckIcon, ChevronDownIcon, DashIcon, InfinityIcon, SyncIcon} from '@primer/octicons-react'
import {clsx} from 'clsx'
import type {BaseProps} from '../component-helpers'
import {Button, type ButtonBaseProps} from '../Button'
import {Heading as HeadingComponent, type HeadingProps} from '../Heading'
import {Text} from '../Text'
import {useAnimation} from '../animation'
import {useId} from '../hooks/useId'
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect'

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
    /**
     * Highlights rows on hover or keyboard focus. Enabled by default.
     */
    rowHighlighting?: boolean
  }

type FeatureComparisonTableBaseProps<T> = Omit<BaseProps<T>, 'animate' | 'id' | 'ref'>
type FeatureComparisonTableAnimatedBaseProps<T> = Omit<BaseProps<T>, 'id' | 'ref'>

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

type BreakpointCategory = keyof Exclude<NonNullable<FeatureComparisonTableGroupProps['expanded']>, boolean>

type TableContextValue = {
  instanceId: string
  breakpoint: BreakpointCategory
  items: Array<React.ReactElement<FeatureComparisonTableItemProps>>
  narrowGroupControls: React.RefObject<Record<string, HTMLElement | null>>
  tableGroupControls: React.RefObject<Record<string, HTMLButtonElement | null>>
}

const TableContext = createContext<TableContextValue | undefined>(undefined)
const ItemIndexContext = createContext(0)
const GroupContext = createContext({index: 0, identity: ''})

const useTableContext = () => {
  const context = useContext(TableContext)
  if (!context) throw new Error('FeatureComparisonTable subcomponents must be rendered inside FeatureComparisonTable.')
  return context
}

const getChildrenOfType = <P,>(children: React.ReactNode[], type: React.JSXElementConstructor<P>) =>
  children.filter((child): child is React.ReactElement<P> => React.isValidElement<P>(child) && child.type === type)

const hasItemLabel = (item: React.ReactElement<FeatureComparisonTableItemProps>) =>
  getChildrenOfType(React.Children.toArray(item.props.children), Label).length > 0

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
    const [breakpoint, setBreakpoint] = useState<BreakpointCategory>('narrow')
    const tableRef = useRef<HTMLTableElement>(null)
    const narrowGroupControls = useRef<Record<string, HTMLElement | null>>({})
    const tableGroupControls = useRef<Record<string, HTMLButtonElement | null>>({})
    const previousBreakpoint = useRef(breakpoint)
    const blurredControl = useRef<HTMLElement | null>(null)
    const focusedGroupIdentity = useRef<string | undefined>(undefined)
    const rootChildren = React.Children.toArray(children)
    const heading = getChildrenOfType(rootChildren, Heading).at(-1)
    const allItems = getChildrenOfType(rootChildren, Item)
    const items = allItems.slice(0, 4)
    const groups = getChildrenOfType(rootChildren, Group)
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
      const regularQuery = window.matchMedia('(min-width: 48rem)')
      const wideQuery = window.matchMedia('(min-width: 80rem)')
      const updateBreakpoint = () => {
        const nextBreakpoint = wideQuery.matches ? 'wide' : regularQuery.matches ? 'regular' : 'narrow'
        const previous = previousBreakpoint.current

        if ((previous === 'wide') !== (nextBreakpoint === 'wide')) {
          // Capture focus before the previous projection unmounts and clears its refs.
          const activeElement =
            document.activeElement === document.body ? blurredControl.current : document.activeElement
          const previousControls = previous === 'wide' ? tableGroupControls.current : narrowGroupControls.current
          focusedGroupIdentity.current = Object.entries(previousControls).find(
            ([, control]) => control !== null && control === activeElement,
          )?.[0]
        }
        setBreakpoint(nextBreakpoint)
      }

      updateBreakpoint()
      regularQuery.addEventListener('change', updateBreakpoint)
      wideQuery.addEventListener('change', updateBreakpoint)
      return () => {
        regularQuery.removeEventListener('change', updateBreakpoint)
        wideQuery.removeEventListener('change', updateBreakpoint)
      }
    }, [])

    useIsomorphicLayoutEffect(() => {
      const previous = previousBreakpoint.current
      previousBreakpoint.current = breakpoint
      blurredControl.current = null
      if ((previous === 'wide') === (breakpoint === 'wide')) return
      const nextControls = breakpoint === 'wide' ? tableGroupControls.current : narrowGroupControls.current
      if (focusedGroupIdentity.current) {
        nextControls[focusedGroupIdentity.current]?.focus()
        focusedGroupIdentity.current = undefined
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

    const groupElements = groups.map((group, index) => (
      <GroupContext.Provider value={{index, identity: String(group.key)}} key={group.key}>
        {group}
      </GroupContext.Provider>
    ))

    return (
      <TableContext.Provider value={{instanceId, breakpoint, items, narrowGroupControls, tableGroupControls}}>
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
          onBlur={event => {
            if (window.matchMedia('(min-width: 80rem)').matches !== (breakpoint === 'wide'))
              blurredControl.current = event.target
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
              aria-labelledby={heading ? `${instanceId}-heading` : undefined}
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
              <thead
                className={clsx(
                  groups.length > 0 && gridlineStyles.gridline,
                  styles.FeatureComparisonTable__itemDivider,
                  styles.FeatureComparisonTable__headingGrid,
                  hasLabels && styles['FeatureComparisonTable__headingGrid--hasLabel'],
                )}
              >
                <tr className={styles.FeatureComparisonTable__headingRow}>
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
                        hasItemLabel(item) && styles.FeatureComparisonTable__promoted,
                      )}
                      scope="col"
                      key={item.key}
                    >
                      <ItemIndexContext.Provider value={index + 1}>{item}</ItemIndexContext.Provider>
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
export type FeatureComparisonTableHeadingProps = PropsWithChildren<Omit<HeadingProps, 'id' | 'ref'>>

const Heading = (props: FeatureComparisonTableHeadingProps) => {
  const {children, as = 'h2', size, className, id: _id, ...rest}: FeatureComparisonTableHeadingProps & {id?: string} =
    props
  const {instanceId} = useTableContext()

  return (
    <HeadingComponent
      as={as}
      size={size ?? 'subhead-large'}
      weight="semibold"
      className={clsx(size === undefined && styles.FeatureComparisonTable__tableHeadingText, className)}
      data-testid={testIds.heading}
      id={`${instanceId}-heading`}
      {...rest}
    >
      {children}
    </HeadingComponent>
  )
}

export type FeatureComparisonTableItemHeadingProps = PropsWithChildren<Omit<HeadingProps, 'id' | 'ref'>>

const ItemHeading = (props: FeatureComparisonTableItemHeadingProps) => {
  const {
    children,
    as = 'h3',
    size = 'subhead-medium',
    id: _id,
    ...rest
  }: FeatureComparisonTableItemHeadingProps & {id?: string} = props

  return (
    <HeadingComponent as={as} size={size} weight="semibold" {...rest}>
      {children}
    </HeadingComponent>
  )
}

export type FeatureComparisonTableLabelProps = PropsWithChildren<FeatureComparisonTableBaseProps<HTMLSpanElement>>

const Label = (props: FeatureComparisonTableLabelProps) => {
  const {children, className, id: _id, ...rest}: FeatureComparisonTableLabelProps & {id?: string} = props

  return (
    <div className={styles.FeatureComparisonTable__labelCell} data-testid={testIds.label}>
      <span className={clsx(styles.FeatureComparisonTable__label, className)} {...rest}>
        {children}
      </span>
    </div>
  )
}
export type FeatureComparisonTableDescriptionProps = PropsWithChildren<
  FeatureComparisonTableAnimatedBaseProps<HTMLParagraphElement>
>

const Description = (props: FeatureComparisonTableDescriptionProps) => {
  const {children, className, id: _id, ...rest}: FeatureComparisonTableDescriptionProps & {id?: string} = props

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
export type FeatureComparisonTablePriceProps = PropsWithChildren<
  FeatureComparisonTableAnimatedBaseProps<HTMLParagraphElement>
>

const Price = (props: FeatureComparisonTablePriceProps) => {
  const {children, className, id: _id, ...rest}: FeatureComparisonTablePriceProps & {id?: string} = props

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

const PrimaryAction = (props: FeatureComparisonTableActionProps) => {
  const {id: _id, ...rest}: FeatureComparisonTableActionProps & {id?: string} = props

  return <Button {...rest} variant="primary" size="small" block />
}

const SecondaryAction = (props: FeatureComparisonTableActionProps) => {
  const {id: _id, ...rest}: FeatureComparisonTableActionProps & {id?: string} = props

  return <Button {...rest} variant="secondary" size="small" block />
}

export type FeatureComparisonTableItemProps = PropsWithChildren<FeatureComparisonTableBaseProps<HTMLDivElement>>

const Item = ({children, className}: FeatureComparisonTableItemProps) => {
  const {items} = useTableContext()
  const itemIndex = useContext(ItemIndexContext)
  const itemChildren = React.Children.toArray(children)
  const label = getChildrenOfType(itemChildren, Label).at(-1)
  const heading = getChildrenOfType(itemChildren, ItemHeading).at(-1)
  const description = getChildrenOfType(itemChildren, Description).at(-1)
  const price = getChildrenOfType(itemChildren, Price).at(-1)
  const primaryAction = getChildrenOfType(itemChildren, PrimaryAction).at(-1)
  const secondaryAction = getChildrenOfType(itemChildren, SecondaryAction).at(-1)
  const hasLabels = items.some(hasItemLabel)

  return (
    <section
      className={clsx(
        styles.FeatureComparisonTable__item,
        label && styles['FeatureComparisonTable__item--hasLabel'],
        hasLabels && !label && styles['FeatureComparisonTable__item--offset'],
        label && styles.FeatureComparisonTable__promoted,
        className,
      )}
      data-projection="wide"
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
            className: clsx(styles.FeatureComparisonTable__heading, heading.props.className),
          })
        ) : (
          <span className={styles.FeatureComparisonTable__heading}>{itemIndex}</span>
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
export type FeatureComparisonTableRowHeadingProps = PropsWithChildren<FeatureComparisonTableBaseProps<HTMLDivElement>>

const RowHeading = (props: FeatureComparisonTableRowHeadingProps) => {
  const {children, className, id: _id, ...rest}: FeatureComparisonTableRowHeadingProps & {id?: string} = props

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
export type FeatureComparisonTableRowDescriptionProps = PropsWithChildren<
  FeatureComparisonTableBaseProps<HTMLParagraphElement>
>

const RowDescription = (props: FeatureComparisonTableRowDescriptionProps) => {
  const {children, className, id: _id, ...rest}: FeatureComparisonTableRowDescriptionProps & {id?: string} = props

  return (
    <Text
      as="p"
      size="100"
      weight="normal"
      variant="muted"
      className={clsx(styles.FeatureComparisonTable__rowDescription, className)}
      {...rest}
    >
      {children}
    </Text>
  )
}

const cellVariants = {
  included: {icon: CheckIcon, label: 'Included'},
  unavailable: {icon: DashIcon, label: 'Unavailable'},
  unlimited: {icon: InfinityIcon, label: 'Unlimited'},
  refresh: {icon: SyncIcon, label: 'Refresh'},
}

type FeatureComparisonTableCellVariantProps =
  | {
      variant?: undefined
      variantAriaLabel?: never
    }
  | {
      variant: 'included' | 'unavailable' | 'unlimited' | 'refresh'
      variantAriaLabel?: string
    }

export type FeatureComparisonTableCellProps = PropsWithChildren<
  FeatureComparisonTableBaseProps<HTMLDivElement> & FeatureComparisonTableCellVariantProps
>

const Cell = (props: FeatureComparisonTableCellProps) => {
  const {
    children,
    className,
    variant,
    variantAriaLabel,
    id: _id,
    ...rest
  }: FeatureComparisonTableCellProps & {id?: string} = props
  const StatusIcon = variant ? cellVariants[variant].icon : null
  const resolvedVariantAriaLabel = variantAriaLabel ?? (variant ? cellVariants[variant].label : undefined)

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
              variant === 'unlimited' && styles['FeatureComparisonTable__status--unlimited'],
              variant === 'refresh' && styles['FeatureComparisonTable__status--refresh'],
            )}
            aria-hidden="true"
          >
            {StatusIcon && <StatusIcon size={16} />}
          </span>
          <span className="visually-hidden">{resolvedVariantAriaLabel}</span>
        </>
      ) : null}
      {children}
    </Text>
  )
}
export type FeatureComparisonTableRowProps = PropsWithChildren<FeatureComparisonTableBaseProps<HTMLDivElement>>

const Row = ({children, className}: FeatureComparisonTableRowProps) => {
  const {items, breakpoint} = useTableContext()
  const rowChildren = React.Children.toArray(children)
  const heading = getChildrenOfType(rowChildren, RowHeading).at(-1)
  const description = getChildrenOfType(rowChildren, RowDescription).at(-1)
  const cells = getChildrenOfType(rowChildren, Cell)

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
              styles.FeatureComparisonTable__dataCell,
              hasItemLabel(item) && styles.FeatureComparisonTable__promoted,
              cells[index]?.props.variant && styles.FeatureComparisonTable__statusCell,
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
          const itemHeading = getChildrenOfType(React.Children.toArray(item.props.children), ItemHeading).at(-1)
          return (
            <React.Fragment key={item.key}>
              <dt
                className={clsx(
                  styles.FeatureComparisonTable__planTerm,
                  hasItemLabel(item) && styles.FeatureComparisonTable__promoted,
                )}
              >
                <Text as="div" size="200" variant="muted" className={styles.FeatureComparisonTable__planName}>
                  {itemHeading ? itemHeading.props.children : index + 1}
                </Text>
              </dt>
              <dd
                className={clsx(
                  styles.FeatureComparisonTable__planValue,
                  hasItemLabel(item) && styles.FeatureComparisonTable__promoted,
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
export type FeatureComparisonTableGroupHeadingProps = PropsWithChildren<Omit<HeadingProps, 'ref'>>

const GroupHeading = ({children, as = 'h3', size, className, ...rest}: FeatureComparisonTableGroupHeadingProps) => {
  const {breakpoint} = useTableContext()
  return (
    <HeadingComponent
      as={as}
      size={size ?? 'subhead-large'}
      weight="semibold"
      className={clsx(breakpoint === 'wide' && !size && styles.FeatureComparisonTable__groupHeading, className)}
      {...rest}
    >
      {children}
    </HeadingComponent>
  )
}

const Chevron = ({expanded}: {expanded: boolean}) => (
  <ChevronDownIcon
    aria-hidden="true"
    size={16}
    className={clsx(
      styles.FeatureComparisonTable__chevron,
      expanded && styles['FeatureComparisonTable__chevron--expanded'],
    )}
  />
)

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

const Group = ({children, className, expanded}: FeatureComparisonTableGroupProps) => {
  const {instanceId, breakpoint, items, narrowGroupControls, tableGroupControls} = useTableContext()
  const {index, identity} = useContext(GroupContext)
  const groupChildren = React.Children.toArray(children)
  const heading = getChildrenOfType(groupChildren, GroupHeading).at(-1)
  const rows = getChildrenOfType(groupChildren, Row)
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
  const isWide = breakpoint === 'wide'
  const groupId = `${instanceId}-${isWide ? 'table' : 'narrow'}-group-${index}`
  const groupControlId = `${instanceId}-table-group-control-${index}`

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
            narrowGroupControls.current[identity] = control
          }}
        >
          {heading ?? <GroupHeading />}
          <Chevron expanded={open} />
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
      ref={element => {
        tableGroupControls.current[identity] = element
      }}
      type="button"
    >
      {heading?.props.children}
      <Chevron expanded={open} />
    </button>
  )

  return (
    <>
      <tbody className={styles.FeatureComparisonTable__groupHeader}>
        <tr>
          <th
            className={clsx(index > 0 && gridlineStyles.gridline, styles.FeatureComparisonTable__groupDivider)}
            colSpan={items.length + 1}
            scope="rowgroup"
          >
            <div className={styles.FeatureComparisonTable__groupBackground} aria-hidden="true">
              <span />
              {items.map(item => (
                <span key={item.key} className={clsx(hasItemLabel(item) && styles.FeatureComparisonTable__promoted)} />
              ))}
            </div>
            {heading ? React.cloneElement(heading, {children: control}) : <GroupHeading>{control}</GroupHeading>}
          </th>
        </tr>
      </tbody>
      <tbody
        aria-labelledby={groupControlId}
        className={clsx(styles.FeatureComparisonTable__groupRows, className)}
        hidden={!open}
        id={groupId}
      >
        {rows}
      </tbody>
    </>
  )
}

/**
 * Feature comparison tables compare plan metadata and feature availability across two to four plans.
 */
export const FeatureComparisonTable = Object.assign(FeatureComparisonTableRoot, {
  Item,
  Label,
  Heading,
  ItemHeading,
  Description,
  Price,
  PrimaryAction,
  SecondaryAction,
  Group,
  GroupHeading,
  Row,
  RowHeading,
  RowDescription,
  Cell,
  testIds,
})
