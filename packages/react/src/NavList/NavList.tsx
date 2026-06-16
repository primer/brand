import React, {
  Children,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useState,
  type AriaAttributes,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
  type Ref,
} from 'react'
import {clsx} from 'clsx'
import {TriangleDownIcon, TriangleUpIcon} from '@primer/octicons-react'

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
  /**
   * Customizable labels for internally rendered controls.
   */
  internalAccessibleLabels?: {
    defaultNavigationLabel: string
    defaultSubNavLabel: string
    expand: string
    collapse: string
  }
} & BaseProps<HTMLElement> &
  Omit<React.HTMLAttributes<HTMLElement>, 'aria-label' | 'aria-labelledby'>

type NavListContextValue = Required<Pick<NavListRootProps, 'internalAccessibleLabels'>>

const defaultInternalAccessibleLabels = {
  defaultNavigationLabel: 'Navigation',
  defaultSubNavLabel: 'Nested navigation',
  expand: 'expand',
  collapse: 'collapse',
}

const NavListContext = React.createContext<NavListContextValue>({
  internalAccessibleLabels: defaultInternalAccessibleLabels,
})

type NavListLevel = 1 | 2 | 3 | 4

const MaxNavListLevel = 4
const NavListLevelContext = React.createContext<NavListLevel>(1)
const NavListSubNavContext = React.createContext<{
  expanded: boolean
  labelledBy?: string
  level: NavListLevel
}>({
  expanded: true,
  level: 2,
})

const NavListRoot = forwardRef<HTMLElement, NavListRootProps>(
  (
    {
      children,
      className,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'data-testid': testId,
      internalAccessibleLabels = defaultInternalAccessibleLabels,
      ...rest
    },
    ref,
  ) => (
    <NavListContext.Provider value={{internalAccessibleLabels}}>
      <nav
        ref={ref}
        className={clsx(styles.NavList, className)}
        aria-label={ariaLabelledBy ? undefined : ariaLabel ?? internalAccessibleLabels.defaultNavigationLabel}
        aria-labelledby={ariaLabelledBy}
        data-testid={testId || testIds.root}
        {...rest}
      >
        <NavListLevelContext.Provider value={1}>
          <ul className={styles.NavList__list} data-testid={testIds.list}>
            {children}
          </ul>
        </NavListLevelContext.Provider>
      </nav>
    </NavListContext.Provider>
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
    const {internalAccessibleLabels} = React.useContext(NavListContext)
    const level = React.useContext(NavListLevelContext)
    const subNavId = useId()
    const accordionButtonId = useId()
    const childrenArray = Children.toArray(children)
    const subNav = childrenArray.find(
      (child): child is NavListSubNavElement =>
        isValidElement<NavListSubNavProps>(child) && child.type === NavListSubNav,
    )
    const labelChildren = subNav ? childrenArray.filter(child => child !== subNav) : childrenArray
    const label = getTextContent(labelChildren).trim()
    const hasSubNav = Boolean(subNav)
    const canExpand = level < MaxNavListLevel
    const isLeafItem = !hasSubNav
    const controlledSubNavId = subNav?.props.id ?? subNavId
    const hasCurrentSubNavItem = hasCurrentDescendant(subNav?.props.children)
    const isControlled = expanded !== undefined
    const [uncontrolledExpanded, setUncontrolledExpanded] = useState(defaultExpanded || hasCurrentSubNavItem)
    const isExpanded = Boolean(isControlled ? expanded : uncontrolledExpanded)
    const ToggleIcon = isExpanded ? TriangleUpIcon : TriangleDownIcon
    const {
      href: _href,
      id: accordionButtonIdProp,
      ...accordionButtonProps
    } = rest as React.ButtonHTMLAttributes<HTMLButtonElement> & {
      href?: string
    }
    const controlledAccordionButtonId = accordionButtonIdProp ?? accordionButtonId
    const levelClassNames: Record<NavListLevel, string> = {
      1: styles['NavList__item--level-1'],
      2: styles['NavList__item--level-2'],
      3: styles['NavList__item--level-3'],
      4: styles['NavList__item--level-4'],
    }

    if (hasSubNav && !canExpand) {
      throw new Error('NavList supports up to 4 levels. Level 4 items cannot contain NavList.SubNav.')
    }

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

    const setAccordionButtonRef = useCallback(
      (node: HTMLButtonElement | null) => {
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref) {
          ;(ref as React.MutableRefObject<HTMLElement | null>).current = node
        }
      },
      [ref],
    )

    const handleAccordionClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) {
          event.preventDefault()
          return
        }

        onClick?.(event)

        if (!event.defaultPrevented) {
          toggleExpanded()
        }
      },
      [disabled, onClick, toggleExpanded],
    )

    return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <li
        className={clsx(styles.NavList__item, levelClassNames[level], isLeafItem && styles['NavList__item--leaf'])}
        data-testid={testId || testIds.item}
        onKeyDown={onKeyDown}
      >
        <div className={styles.NavList__itemContent}>
          {hasSubNav && canExpand ? (
            <button
              ref={setAccordionButtonRef}
              id={controlledAccordionButtonId}
              type="button"
              className={clsx(
                styles.NavList__link,
                styles.NavList__accordionButton,
                disabled && styles['NavList__link--disabled'],
                className,
              )}
              aria-expanded={isExpanded ? 'true' : 'false'}
              aria-controls={controlledSubNavId}
              aria-label={`${label || internalAccessibleLabels.defaultSubNavLabel} ${
                isExpanded ? internalAccessibleLabels.collapse : internalAccessibleLabels.expand
              }`}
              data-testid={testIds.toggle}
              {...accordionButtonProps}
              disabled={disabled}
              onClick={handleAccordionClick}
            >
              <ToggleIcon className={styles.NavList__toggleIcon} aria-hidden="true" />
              {renderVisual(leadingVisual, styles.NavList__leadingVisual)}
              <span className={styles.NavList__label}>{labelChildren}</span>
              {renderVisual(trailingVisual, styles.NavList__trailingVisual)}
            </button>
          ) : (
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
          )}
        </div>

        {subNav ? (
          <NavListSubNavContext.Provider
            value={{expanded: isExpanded, labelledBy: controlledAccordionButtonId, level: (level + 1) as NavListLevel}}
          >
            {React.cloneElement(subNav, {
              id: controlledSubNavId,
            })}
          </NavListSubNavContext.Provider>
        ) : null}
      </li>
    )
  },
)

export type NavListSubNavProps = {
  children: ReactNode
  'data-testid'?: string
} & BaseProps<HTMLUListElement> &
  React.HTMLAttributes<HTMLUListElement>

const NavListSubNav = forwardRef<HTMLUListElement, NavListSubNavProps>(
  ({children, className, 'aria-labelledby': ariaLabelledBy, 'data-testid': testId, ...rest}, ref) => {
    const {expanded, labelledBy, level} = React.useContext(NavListSubNavContext)

    return (
      <ul
        ref={ref}
        className={clsx(styles.NavList__subNav, className)}
        aria-labelledby={ariaLabelledBy ?? labelledBy}
        data-testid={testId || testIds.subNav}
        hidden={!expanded}
        {...rest}
      >
        <NavListLevelContext.Provider value={level}>{children}</NavListLevelContext.Provider>
      </ul>
    )
  },
)

/**
 * Use NavList to render vertical navigation links with expandable section rows and nested lists.
 * `aria-current` is the leaf-item current contract; top collapse-bar or responsive shell behavior is intentionally out of scope.
 * @see https://primer.style/brand/components/NavList
 */
export const NavList = Object.assign(NavListRoot, {
  Item: NavListItem,
  SubNav: NavListSubNav,
  testIds,
})
