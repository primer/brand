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
import {TriangleDownIcon} from '@primer/octicons-react'
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

const DefaultNavigationLabel = 'Navigation'

export type NavListRootProps = {
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

type NavListLevel = 1 | 2 | 3 | 4 | 5

const MaxNavListLevel = 5
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
    {children, className, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, 'data-testid': testId, ...rest},
    ref,
  ) => {
    const hasTopLevelSubNav = Children.toArray(children).some(childHasDirectSubNav)
    const rootLevel = hasTopLevelSubNav ? 1 : 2

    return (
      <nav
        ref={ref}
        className={clsx(styles.NavList, className)}
        aria-label={ariaLabelledBy ? undefined : ariaLabel ?? DefaultNavigationLabel}
        aria-labelledby={ariaLabelledBy}
        data-testid={testId || testIds.root}
        {...rest}
      >
        <NavListLevelContext.Provider value={rootLevel}>
          <ul
            className={clsx(styles.NavList__list, !hasTopLevelSubNav && styles['NavList__list--flat'])}
            data-testid={testIds.list}
          >
            {children}
          </ul>
        </NavListLevelContext.Provider>
      </nav>
    )
  },
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

function isNavListSubNavElement(node: ReactNode): node is NavListSubNavElement {
  return isValidElement<NavListSubNavProps>(node) && node.type === NavListSubNav
}

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

function assignRef<T>(ref: React.Ref<T> | undefined, value: T | null) {
  if (!ref) return

  if (typeof ref === 'function') {
    ref(value)
    return
  }

  ;(ref as React.MutableRefObject<T | null>).current = value
}

function childHasDirectSubNav(node: ReactNode): boolean {
  if (!isValidElement(node)) return false

  if (node.type === React.Fragment) {
    return Children.toArray((node as ElementWithChildren).props.children).some(childHasDirectSubNav)
  }

  return Children.toArray((node as ElementWithChildren).props.children).some(isNavListSubNavElement)
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
      trailingVisual,
      'aria-current': ariaCurrent,
      'data-testid': testId,
      ...rest
    }: NavListItemProps<C>,
    ref: Ref<HTMLElement>,
  ) => {
    const Component = as || 'a'
    const level = React.useContext(NavListLevelContext)
    const subNavId = useId()
    const accordionButtonId = useId()
    const childrenArray = Children.toArray(children)
    const subNavChildren = childrenArray.filter(isNavListSubNavElement)
    const subNav = childrenArray.find(isNavListSubNavElement)
    const labelChildren = subNav ? childrenArray.filter(child => child !== subNav) : childrenArray
    const hasLabelContent = Children.toArray(labelChildren).length > 0
    const hasSubNav = Boolean(subNav)
    const canExpand = level < MaxNavListLevel
    const isLeafItem = !hasSubNav
    const controlledSubNavId = subNav?.props.id ?? subNavId
    const hasCurrentSubNavItem = hasCurrentDescendant(subNav?.props.children)
    const isControlled = expanded !== undefined
    const [uncontrolledExpanded, setUncontrolledExpanded] = useState(defaultExpanded || hasCurrentSubNavItem)
    const isExpanded = Boolean(isControlled ? expanded : uncontrolledExpanded)
    const {
      href,
      id: accordionButtonIdProp,
      ...accordionButtonProps
    } = rest as React.ButtonHTMLAttributes<HTMLButtonElement> & {
      href?: string
    }
    const controlledAccordionButtonId = accordionButtonIdProp ?? accordionButtonId

    if (hasSubNav && !canExpand) {
      throw new Error('NavList supports up to 5 levels. Level 5 items cannot contain NavList.SubNav.')
    }

    if (subNavChildren.length > 1) {
      throw new Error('NavList.Item supports only one NavList.SubNav child.')
    }

    if (hasSubNav && !hasLabelContent) {
      throw new Error('NavList.Item with NavList.SubNav requires label content.')
    }

    if (hasSubNav && (href !== undefined || as !== undefined)) {
      throw new Error(
        'NavList.Item with NavList.SubNav cannot include href or as because expandable items render as buttons.',
      )
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
        assignRef(ref, node)
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

    const labelArea = (
      <span className={styles.NavList__labelArea}>
        {renderVisual(leadingVisual, styles.NavList__leadingVisual)}
        <span className={styles.NavList__label}>{labelChildren}</span>
        {renderVisual(trailingVisual, styles.NavList__trailingVisual)}
      </span>
    )

    return (
      <li
        className={clsx(
          styles.NavList__item,
          styles[`NavList__item--level-${level}`],
          isLeafItem && styles['NavList__item--leaf'],
        )}
        data-testid={testId || testIds.item}
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
              data-testid={testIds.toggle}
              {...accordionButtonProps}
              disabled={disabled}
              onClick={handleAccordionClick}
            >
              <TriangleDownIcon className={styles.NavList__toggleIcon} aria-hidden="true" />
              {labelArea}
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
              {labelArea}
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
    const subNavRef = React.useRef<HTMLUListElement | null>(null)

    const setSubNavHeight = React.useCallback((subNav: HTMLUListElement) => {
      subNav.style.setProperty('--brand-NavList-subNav-height', `${subNav.scrollHeight}px`)
    }, [])

    const setSubNavAndAncestorHeights = React.useCallback(() => {
      let subNav = subNavRef.current

      while (subNav) {
        setSubNavHeight(subNav)
        subNav = subNav.parentElement?.closest<HTMLUListElement>(`.${styles.NavList__subNav}`) ?? null
      }
    }, [setSubNavHeight])

    const setSubNavRef = React.useCallback(
      (node: HTMLUListElement | null) => {
        subNavRef.current = node
        assignRef(ref, node)
      },
      [ref],
    )

    React.useEffect(() => {
      setSubNavAndAncestorHeights()
    }, [children, expanded, setSubNavAndAncestorHeights])

    React.useEffect(() => {
      const subNav = subNavRef.current

      if (!subNav || typeof ResizeObserver === 'undefined') {
        return
      }

      const resizeObserver = new ResizeObserver(setSubNavAndAncestorHeights)
      resizeObserver.observe(subNav)

      return () => {
        resizeObserver.disconnect()
      }
    }, [setSubNavAndAncestorHeights])

    return (
      <ul
        ref={setSubNavRef}
        className={clsx(styles.NavList__subNav, className)}
        aria-labelledby={ariaLabelledBy ?? labelledBy}
        {...rest}
        aria-hidden={expanded ? undefined : 'true'}
        data-testid={testId || testIds.subNav}
        data-expanded={expanded ? 'true' : 'false'}
        inert={!expanded}
      >
        <NavListLevelContext.Provider value={level}>{children}</NavListLevelContext.Provider>
      </ul>
    )
  },
)

/**
 * Use NavList to render vertical navigation links with expandable section rows and nested lists.
 * @see https://primer.style/brand/components/NavList
 */
export const NavList = Object.assign(NavListRoot, {
  Item: NavListItem,
  SubNav: NavListSubNav,
  testIds,
})
