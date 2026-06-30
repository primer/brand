import React, {
  Children,
  createContext,
  forwardRef,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type AriaAttributes,
  type MutableRefObject,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
  type Ref,
} from 'react'

import {clsx} from 'clsx'
import {TriangleDownIcon, type Icon} from '@primer/octicons-react'
import type {BaseProps} from '../component-helpers'
import {useId} from '../hooks/useId'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/nav-list/colors-with-modes.css'

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
  get group() {
    return `${this.root}-group`
  },
  get groupTitle() {
    return `${this.root}-group-title`
  },
  get groupList() {
    return `${this.root}-group-list`
  },
  get toggle() {
    return `${this.root}-toggle`
  },
}

export type NavListRootProps = {
  /**
   * Accessible label for the navigation landmark.
   */
  'aria-label': string
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
const NavListLevelContext = createContext<NavListLevel>(1)
const NavListSubNavContext = createContext<{
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
    const childrenArray = useMemo(() => Children.toArray(children), [children])
    const hasTopLevelSubNav = useMemo(() => childrenArray.some(childHasDirectSubNav), [childrenArray])
    const hasTopLevelGroup = useMemo(() => childrenArray.some(childIsNavListGroupElement), [childrenArray])
    const rootLevel = hasTopLevelSubNav ? 1 : 2

    return (
      <nav
        ref={ref}
        className={clsx(styles.NavList, className)}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        data-testid={testId || testIds.root}
        {...rest}
      >
        <NavListLevelContext.Provider value={rootLevel}>
          <ul
            className={clsx(
              styles.NavList__list,
              !hasTopLevelSubNav && !hasTopLevelGroup && styles['NavList__list--flat'],
            )}
            data-testid={testIds.list}
          >
            {children}
          </ul>
        </NavListLevelContext.Provider>
      </nav>
    )
  },
)

type Visual = ReactElement | React.ElementType | Icon

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
    const level = useContext(NavListLevelContext)
    const subNavId = useId()
    const accordionButtonId = useId()
    const childrenArray = useMemo(() => Children.toArray(children), [children])
    const subNavChildren = useMemo(() => childrenArray.filter(isNavListSubNavElement), [childrenArray])
    const subNav = useMemo(() => childrenArray.find(isNavListSubNavElement), [childrenArray])
    const navListGroupChildren = useMemo(() => childrenArray.filter(childHasNavListGroupElement), [childrenArray])
    const labelChildren = useMemo(
      () => (subNav ? childrenArray.filter(child => child !== subNav) : childrenArray),
      [childrenArray, subNav],
    )
    const hasLabelContent = labelChildren.length > 0
    const hasSubNav = Boolean(subNav)
    const canExpand = level < MaxNavListLevel
    const isLeafItem = !hasSubNav
    const controlledSubNavId = subNav?.props.id ?? subNavId
    const hasCurrentSubNavItem = useMemo(() => hasCurrentDescendant(subNav?.props.children), [subNav?.props.children])
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
    const invalidMessage = getInvalidNavListItemMessage({
      as,
      canExpand,
      hasLabelContent,
      hasSubNav,
      href,
      navListGroupCount: navListGroupChildren.length,
      subNavCount: subNavChildren.length,
    })

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

    if (invalidMessage) {
      warnNavListValidation(invalidMessage)
      return null
    }

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
        data-has-current-descendant={hasCurrentSubNavItem ? 'true' : undefined}
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
    const {expanded, labelledBy, level} = useContext(NavListSubNavContext)
    const subNavRef = useRef<HTMLUListElement | null>(null)

    const setSubNavHeight = useCallback((subNav: HTMLUListElement) => {
      subNav.style.setProperty('--brand-NavList-subNav-height', `${subNav.scrollHeight}px`)
    }, [])

    const setSubNavAndAncestorHeights = useCallback(() => {
      let subNav = subNavRef.current

      while (subNav) {
        setSubNavHeight(subNav)
        subNav = subNav.parentElement?.closest<HTMLUListElement>(`.${styles.NavList__subNav}`) ?? null
      }
    }, [setSubNavHeight])

    const setSubNavRef = useCallback(
      (node: HTMLUListElement | null) => {
        subNavRef.current = node
        assignRef(ref, node)
      },
      [ref],
    )

    useEffect(() => {
      setSubNavAndAncestorHeights()
    }, [children, expanded, setSubNavAndAncestorHeights])

    useEffect(() => {
      subNavRef.current?.toggleAttribute('inert', !expanded)
    }, [expanded])

    useEffect(() => {
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
      >
        <NavListLevelContext.Provider value={level}>{children}</NavListLevelContext.Provider>
      </ul>
    )
  },
)

export type NavListGroupProps = {
  /**
   * Heading text for the grouped navigation section.
   */
  title?: ReactNode
  children: ReactNode
  'data-testid'?: string
} & BaseProps<HTMLLIElement> &
  Omit<React.LiHTMLAttributes<HTMLLIElement>, 'title'>

const NavListGroup = forwardRef<HTMLLIElement, NavListGroupProps>(
  ({title, children, className, 'data-testid': testId, ...rest}, ref) => {
    const titleId = useId()
    const validChildren = useMemo(() => getValidNavListGroupChildren(children), [children])
    const hasInvalidChild = useMemo(() => hasInvalidNavListGroupChild(children), [children])

    if (hasInvalidChild) {
      warnNavListValidation(
        'NavList.Group: Only NavList.Item children are supported. Invalid children will not be rendered. Use NavList.SubNav as a child of NavList.Item for nested disclosure.',
      )
    }

    return (
      <li ref={ref} className={clsx(styles.NavList__group, className)} data-testid={testId || testIds.group} {...rest}>
        {title ? (
          <h3 id={titleId} className={styles.NavList__groupTitle} data-testid={testIds.groupTitle}>
            {title}
          </h3>
        ) : null}
        <ul
          className={styles.NavList__groupList}
          aria-labelledby={title ? titleId : undefined}
          data-testid={testIds.groupList}
        >
          <NavListLevelContext.Provider value={2}>{validChildren}</NavListLevelContext.Provider>
        </ul>
      </li>
    )
  },
)

/**
 * Use NavList to render vertical navigation links with grouped sections and expandable nested lists.
 * @see https://primer.style/brand/components/NavList
 */
export const NavList = Object.assign(NavListRoot, {
  Item: NavListItem,
  SubNav: NavListSubNav,
  Group: NavListGroup,
  testIds,
})

type ElementWithChildren = ReactElement<{children?: ReactNode}>
type ElementWithCurrent = ReactElement<{children?: ReactNode; 'aria-current'?: AriaAttributes['aria-current']}>

function isNavListSubNavElement(node: ReactNode): node is NavListSubNavElement {
  return isValidElement<NavListSubNavProps>(node) && node.type === NavListSubNav
}

function isNavListItemElement(node: ReactNode): node is ReactElement<NavListItemProps> {
  return isValidElement<NavListItemProps>(node) && node.type === NavListItem
}

function isNavListGroupElement(node: ReactNode): node is ReactElement<NavListGroupProps> {
  return isValidElement<NavListGroupProps>(node) && node.type === NavListGroup
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

function assignRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (!ref) return

  if (typeof ref === 'function') {
    ref(value)
    return
  }

  ;(ref as MutableRefObject<T | null>).current = value
}

function childHasDirectSubNav(node: ReactNode): boolean {
  if (!isValidElement(node)) return false

  if (node.type === React.Fragment) {
    return Children.toArray((node as ElementWithChildren).props.children).some(childHasDirectSubNav)
  }

  return Children.toArray((node as ElementWithChildren).props.children).some(isNavListSubNavElement)
}

function childIsNavListGroupElement(node: ReactNode): boolean {
  if (!isValidElement(node)) return false

  if (node.type === React.Fragment) {
    return Children.toArray((node as ElementWithChildren).props.children).some(childIsNavListGroupElement)
  }

  return isNavListGroupElement(node)
}

function childHasNavListGroupElement(node: ReactNode): boolean {
  if (!isValidElement(node)) return false

  if (node.type === React.Fragment) {
    return Children.toArray((node as ElementWithChildren).props.children).some(childHasNavListGroupElement)
  }

  return isNavListGroupElement(node)
}

function getValidNavListGroupChildren(children: ReactNode): ReactNode[] {
  return Children.toArray(children).flatMap(child => {
    if (isNavListItemElement(child)) {
      return [child]
    }

    if (isValidElement(child) && child.type === React.Fragment) {
      return getValidNavListGroupChildren((child as ElementWithChildren).props.children)
    }

    return []
  })
}

function hasInvalidNavListGroupChild(children: ReactNode): boolean {
  return Children.toArray(children).some(child => {
    if (isNavListItemElement(child)) {
      return false
    }

    if (isValidElement(child) && child.type === React.Fragment) {
      return hasInvalidNavListGroupChild((child as ElementWithChildren).props.children)
    }

    return true
  })
}

function renderVisual(visual: Visual | undefined, className: string) {
  if (!visual) return null

  const visualElement = isValidElement(visual) ? visual : React.createElement(visual)

  if (!isValidElement<{className?: string; ['aria-hidden']?: string; focusable?: string}>(visualElement)) return null

  return (
    <span className={className}>
      {React.cloneElement(visualElement, {
        className: visualElement.props.className,
        'aria-hidden': 'true',
        focusable: 'false',
      })}
    </span>
  )
}

function getInvalidNavListItemMessage({
  as,
  canExpand,
  hasLabelContent,
  hasSubNav,
  href,
  navListGroupCount,
  subNavCount,
}: {
  as?: React.ElementType
  canExpand: boolean
  hasLabelContent: boolean
  hasSubNav: boolean
  href?: string
  navListGroupCount: number
  subNavCount: number
}) {
  if (navListGroupCount > 0) {
    return 'NavList.Item: NavList.Group is not supported as a child. Use NavList.SubNav for nested disclosure. NavList.Item will not be rendered.'
  }

  if (hasSubNav && !canExpand) {
    return 'NavList.Item: NavList supports up to 5 levels. Level 5 items cannot contain NavList.SubNav. NavList.Item will not be rendered.'
  }

  if (subNavCount > 1) {
    return 'NavList.Item: Only one NavList.SubNav child is supported. NavList.Item will not be rendered.'
  }

  if (hasSubNav && !hasLabelContent) {
    return 'NavList.Item: A label is required when using NavList.SubNav. NavList.Item will not be rendered.'
  }

  if (hasSubNav && (href !== undefined || as !== undefined)) {
    return 'NavList.Item: `href` and `as` are not supported when using NavList.SubNav because expandable items render as buttons. NavList.Item will not be rendered.'
  }
}

function warnNavListValidation(message: string) {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    // eslint-disable-next-line no-console
    console.warn(message)
  }
}
