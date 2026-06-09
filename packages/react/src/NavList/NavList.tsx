import React, {
  Children,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type AriaAttributes,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
  type Ref,
} from 'react'
import {clsx} from 'clsx'
import {ChevronDownIcon} from '@primer/octicons-react'

import type {BaseProps} from '../component-helpers'
import {useId} from '../hooks/useId'

/** * Main stylesheet (as a CSS Module) */
import styles from './NavList.module.css'

const testIds = {
  root: 'NavList',
  get list() {
    return `${this.root}-list`
  },
  get item() {
    return `${this.root}-item`
  },
  get link() {
    return `${this.root}-link`
  },
  get subNav() {
    return `${this.root}-sub-nav`
  },
  get toggle() {
    return `${this.root}-toggle`
  },
  get group() {
    return `${this.root}-group`
  },
  get groupHeading() {
    return `${this.root}-group-heading`
  },
  get divider() {
    return `${this.root}-divider`
  },
}

type NavListRootProps = {
  /**
   * Accessible label for the navigation landmark. Defaults to "Navigation".
   */
  'aria-label'?: string
  /**
   * ID of an element that labels the navigation landmark.
   */
  'aria-labelledby'?: string
  children: ReactNode
  'data-testid'?: string
} & BaseProps<HTMLElement> &
  Omit<React.HTMLAttributes<HTMLElement>, 'aria-label' | 'aria-labelledby'>

const NavListRoot = forwardRef<HTMLElement, NavListRootProps>(
  (
    {children, className, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, 'data-testid': testId, ...rest},
    ref,
  ) => (
    <nav
      ref={ref}
      className={clsx(styles.NavList, className)}
      aria-label={ariaLabelledBy ? undefined : ariaLabel ?? 'Navigation'}
      aria-labelledby={ariaLabelledBy}
      data-testid={testId || testIds.root}
      {...rest}
    >
      <ul className={styles.NavList__list} data-testid={testIds.list}>
        {children}
      </ul>
    </nav>
  ),
)

type Visual = ReactElement | React.ElementType

type ItemOwnProps = {
  /**
   * Leading visual rendered before the item label.
   */
  leadingVisual?: Visual
  /**
   * Trailing visual rendered after the item label.
   */
  trailingVisual?: Visual
  /**
   * Whether nested items should be expanded by default.
   */
  defaultExpanded?: boolean
  /**
   * Controls the nested item expanded state.
   */
  expanded?: boolean
  /**
   * Called when a nested item is expanded or collapsed.
   */
  onExpandedChange?: (expanded: boolean) => void
  /**
   * Marks the item as disabled. Disabled link items receive `aria-disabled`.
   */
  disabled?: boolean
  'data-testid'?: string
}

export type NavListItemProps<C extends React.ElementType = 'a'> = {
  as?: C
} & ItemOwnProps &
  PropsWithChildren<BaseProps<HTMLElement>> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof ItemOwnProps | keyof BaseProps<HTMLElement> | 'as' | 'children'>

type NavListSubNavElement = ReactElement<NavListSubNavProps>

type ElementWithChildren = ReactElement<{children?: ReactNode}>
type ElementWithCurrent = ReactElement<{children?: ReactNode; 'aria-current'?: AriaAttributes['aria-current']}>

function isCurrentValue(value: AriaAttributes['aria-current']) {
  return Boolean(value) && value !== 'false'
}

function hasCurrentDescendant(node: ReactNode): boolean {
  return Children.toArray(node).some(child => {
    if (!isValidElement(child)) return false

    const currentChild = child as ElementWithCurrent
    if (isCurrentValue(currentChild.props['aria-current'])) return true

    return hasCurrentDescendant((child as ElementWithChildren).props.children)
  })
}

function getTextContent(node: ReactNode): string {
  return Children.toArray(node)
    .map(child => {
      if (typeof child === 'string' || typeof child === 'number') return String(child)
      if (isValidElement(child)) return getTextContent((child as ElementWithChildren).props.children)
      return ''
    })
    .join('')
}

function renderVisual(visual: Visual | undefined, className: string) {
  if (!visual) return null

  const visualElement = isValidElement(visual) ? visual : React.createElement(visual)

  if (!isValidElement<{className?: string; ['aria-hidden']?: string; focusable?: string}>(visualElement)) return null

  return (
    <span className={className}>
      {React.cloneElement(visualElement, {
        className: clsx(visualElement.props.className),
        'aria-hidden': 'true',
        focusable: 'false',
      })}
    </span>
  )
}

const NavListItem = forwardRef(
  <C extends React.ElementType = 'a'>(
    {
      as,
      children,
      className,
      defaultExpanded = false,
      disabled = false,
      expanded,
      leadingVisual,
      onClick,
      onExpandedChange,
      onKeyDown,
      trailingVisual,
      'aria-current': ariaCurrent,
      'data-testid': testId,
      ...rest
    }: NavListItemProps<C>,
    ref: Ref<HTMLElement>,
  ) => {
    const Component = as || 'a'
    const subNavId = useId()
    const toggleButtonRef = useRef<HTMLButtonElement>(null)
    const childrenArray = Children.toArray(children)
    const subNav = childrenArray.find(
      (child): child is NavListSubNavElement =>
        isValidElement<NavListSubNavProps>(child) && child.type === NavListSubNav,
    )
    const labelChildren = subNav ? childrenArray.filter(child => child !== subNav) : childrenArray
    const label = getTextContent(labelChildren).trim()
    const hasSubNav = Boolean(subNav)
    const hasCurrentSubNavItem = hasCurrentDescendant(subNav?.props.children)
    const isControlled = expanded !== undefined
    const [uncontrolledExpanded, setUncontrolledExpanded] = useState(defaultExpanded || hasCurrentSubNavItem)
    const isExpanded = Boolean((isControlled ? expanded : uncontrolledExpanded) || hasCurrentSubNavItem)
    const isCurrent = isCurrentValue(ariaCurrent)

    useEffect(() => {
      if (hasCurrentSubNavItem && !isControlled) {
        setUncontrolledExpanded(true)
      }
    }, [hasCurrentSubNavItem, isControlled])

    const setExpanded = useCallback(
      (value: boolean) => {
        if (!isControlled) {
          setUncontrolledExpanded(value)
        }
        onExpandedChange?.(value)
      },
      [isControlled, onExpandedChange],
    )

    const toggleExpanded = useCallback(() => {
      setExpanded(!isExpanded)
    }, [isExpanded, setExpanded])

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        if (disabled) {
          event.preventDefault()
          return
        }

        onClick?.(event)
      },
      [disabled, onClick],
    )

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLElement>) => {
        onKeyDown?.(event)

        if (event.defaultPrevented || !hasSubNav || event.key !== 'Escape' || !isExpanded) return

        event.preventDefault()
        setExpanded(false)
        toggleButtonRef.current?.focus()
      },
      [hasSubNav, isExpanded, onKeyDown, setExpanded],
    )

    return (
      <li
        className={clsx(
          styles.NavList__item,
          hasSubNav && styles['NavList__item--has-sub-nav'],
          isExpanded && styles['NavList__item--expanded'],
          isCurrent && styles['NavList__item--current'],
        )}
        data-testid={testId || testIds.item}
        onKeyDown={handleKeyDown}
      >
        <div className={styles.NavList__itemContent}>
          <Component
            ref={ref}
            className={clsx(styles.NavList__link, disabled && styles['NavList__link--disabled'], className)}
            aria-current={ariaCurrent}
            aria-disabled={disabled || undefined}
            data-testid={testIds.link}
            onClick={handleClick}
            {...rest}
          >
            {renderVisual(leadingVisual, styles.NavList__leadingVisual)}
            <span className={styles.NavList__label}>{labelChildren}</span>
            {renderVisual(trailingVisual, styles.NavList__trailingVisual)}
          </Component>

          {hasSubNav && (
            <button
              ref={toggleButtonRef}
              type="button"
              className={styles.NavList__toggle}
              aria-expanded={isExpanded ? 'true' : 'false'}
              aria-controls={subNavId}
              aria-label={`${label || 'Nested navigation'} ${isExpanded ? 'collapse' : 'expand'}`}
              data-testid={testIds.toggle}
              onClick={toggleExpanded}
            >
              <ChevronDownIcon className={styles.NavList__toggleIcon} aria-hidden="true" />
            </button>
          )}
        </div>

        {subNav
          ? React.cloneElement(subNav, {
              id: subNav.props.id ?? subNavId,
              _expanded: isExpanded,
            })
          : null}
      </li>
    )
  },
)

export type NavListSubNavProps = {
  children: ReactNode
  'data-testid'?: string
  _expanded?: boolean
} & BaseProps<HTMLUListElement> &
  React.HTMLAttributes<HTMLUListElement>

const NavListSubNav = forwardRef<HTMLUListElement, NavListSubNavProps>(
  ({children, className, _expanded = true, 'data-testid': testId, ...rest}, ref) => (
    <ul
      ref={ref}
      className={clsx(styles.NavList__subNav, className)}
      data-testid={testId || testIds.subNav}
      hidden={!_expanded}
      {...rest}
    >
      {children}
    </ul>
  ),
)

export type NavListGroupProps = {
  title: ReactNode
  children: ReactNode
  'data-testid'?: string
} & BaseProps<HTMLLIElement> &
  React.LiHTMLAttributes<HTMLLIElement>

const NavListGroup = forwardRef<HTMLLIElement, NavListGroupProps>(
  ({children, className, title, 'data-testid': testId, ...rest}, ref) => {
    const headingId = useId()

    return (
      <li ref={ref} className={clsx(styles.NavList__group, className)} data-testid={testId || testIds.group} {...rest}>
        <div id={headingId} className={styles.NavList__groupHeading} data-testid={testIds.groupHeading}>
          {title}
        </div>
        <ul className={styles.NavList__groupList} aria-labelledby={headingId}>
          {children}
        </ul>
      </li>
    )
  },
)

export type NavListDividerProps = BaseProps<HTMLLIElement> & React.LiHTMLAttributes<HTMLLIElement>

const NavListDivider = forwardRef<HTMLLIElement, NavListDividerProps>(({className, ...rest}, ref) => (
  <li
    ref={ref}
    className={clsx(styles.NavList__divider, className)}
    role="separator"
    data-testid={testIds.divider}
    {...rest}
  />
))

/**
 * Use NavList to render vertical navigation links with optional groups and expandable nested lists.
 * `aria-current` is the current-item contract; top collapse-bar or responsive shell behavior is intentionally out of scope.
 * @see https://primer.style/brand/components/NavList
 */
export const NavList = Object.assign(NavListRoot, {
  Item: NavListItem,
  SubNav: NavListSubNav,
  Group: NavListGroup,
  Divider: NavListDivider,
  testIds,
})
