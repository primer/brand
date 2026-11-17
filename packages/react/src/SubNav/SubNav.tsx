import React, {
  Children,
  createContext,
  forwardRef,
  isValidElement,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
  type ReactNode,
  type RefObject,
} from 'react'
import {Button, ButtonSizes, ButtonVariants, Text, TextProps, ThemeProvider, useWindowSize} from '..'

import {clsx} from 'clsx'
import {TriangleDownIcon, TriangleUpIcon} from '@primer/octicons-react'
import {useId} from '../hooks/useId'
import {useKeyboardEscape} from '../hooks/useKeyboardEscape'
import {useProvidedRefOrCreate} from '../hooks/useRef'
import {useContainsFocus} from './useContainsFocus'

import {useAnchorMenu} from './useAnchorMenu'
import {useNarrowMenu} from './useNarrowMenu'
import {useWideMenu} from './useWideMenu'

import type {BaseProps} from '../component-helpers'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/sub-nav/base.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/sub-nav/colors-with-modes.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from './SubNav.module.css'
import {createPortal} from 'react-dom'

const testIds = {
  root: 'SubNav-root',
  get button() {
    return `${this.root}-button`
  },
  get overlay() {
    return `${this.root}-overlay`
  },
  get link() {
    return `${this.root}-link`
  },
  get heading() {
    return `${this.root}-heading`
  },
  get action() {
    return `${this.root}-action`
  },
  get subMenu() {
    return `${this.root}-sub-menu`
  },
  get overflowButton() {
    return `${this.root}-overflow-button`
  },
  get overflowMenu() {
    return `${this.root}-overflow-menu`
  },
}

export const SubNavSubMenuVariants = ['dropdown', 'anchor'] as const
type SubMenuVariants = (typeof SubNavSubMenuVariants)[number]

type SubNavContextType = {
  portalRef: RefObject<HTMLDivElement | null>
}

const SubNavContext = createContext<SubNavContextType | undefined>(undefined)

export const useSubNavContext = () => {
  const context = useContext(SubNavContext)
  if (!context) {
    throw new Error('useSubNavContext must be used within a SubNavProvider')
  }
  return context
}

function SubNavProvider({children}: PropsWithChildren) {
  const {anchorMenuRef, portalRef} = useAnchorMenu()

  const value = useMemo(
    () => ({
      portalRef,
    }),
    [portalRef],
  )

  return (
    <SubNavContext.Provider value={value}>
      {children}

      <div className={styles['SubNav__anchor-menu-outer-container']} ref={anchorMenuRef}>
        <div className={clsx(styles['SubNav__anchor-menu-container'])} ref={portalRef} />
      </div>
    </SubNavContext.Provider>
  )
}

export type SubNavMenuLabels = {
  menuLabel: string
  closeLabel: string
  activeLabel: string
  closeActiveLabel: string
  overflowMenuLabel: string
}

const defaultMenuLabels: SubNavMenuLabels = {
  menuLabel: 'Navigation menu',
  closeLabel: 'Close navigation menu',
  activeLabel: 'Navigation menu. Current page:',
  closeActiveLabel: 'Close navigation menu. Current page:',
  overflowMenuLabel: 'More',
}

export type SubNavProps = {
  /**
   * @deprecated The hasShadow prop is deprecated and will be removed in a future release.
   */
  hasShadow?: boolean
  /**
   * Allows the SubNav to be used at full width,
   * removing any internal padding and guttering.
   */
  fullWidth?: boolean
  /**
   * Customizable accessible labels
   */
  menuLabels?: Partial<SubNavMenuLabels>
  'data-testid'?: string
} & PropsWithChildren<BaseProps<HTMLDivElement>>

// Puts the menus, headings, and actions together.
const SubNavRoot = memo(
  forwardRef<HTMLDivElement, SubNavProps>(
    ({id, children, className, 'data-testid': testId, fullWidth, hasShadow, menuLabels}, ref) => {
      const rootRef = useProvidedRefOrCreate<HTMLDivElement>(ref as RefObject<HTMLDivElement>)
      const narrowButtonRef = useRef<HTMLButtonElement>(null)
      const idForLinkContainer = useId()
      const overflowMenuId = useId()
      const [hasAnchoredNav, setHasAnchoredNav] = useState(false)
      const resolvedMenuLabels = {...defaultMenuLabels, ...menuLabels}

      const {isLarge} = useWindowSize()
      const {navRef, narrowMenuRef, isNarrowMenuOpen, closeNarrowMenu, toggleNarrowMenu} = useNarrowMenu(isLarge)
      const childrenArr = Children.toArray(children)

      const activeLink = childrenArr.find(child => {
        return isValidElement<LinkBaseProps>(child) && Boolean(child.props['aria-current'])
      }) as React.ReactElement<LinkBaseProps> | undefined

      // Checks whether any link comes with an anchor submenu.
      useEffect(() => {
        const hasAnchorVariant = childrenArr.some(child => {
          if (isValidElement<LinkBaseProps>(child) && child.type === LinkBase) {
            const childNodes = Children.toArray(child.props.children)
            const maybeSubMenu = childNodes[1]
            if (
              isValidElement<SubMenuProps>(maybeSubMenu) &&
              maybeSubMenu.type === SubMenuBase &&
              maybeSubMenu.props.variant === 'anchor'
            ) {
              return true
            }
          }
          return false
        })
        setHasAnchoredNav(hasAnchorVariant)
      }, [childrenArr])

      // Picks out the headings, links, and action for the layout.
      const {
        heading: HeadingChild,
        subheading: SubHeadingChild,
        links: LinkChildren,
        action: ActionChild,
      } = childrenArr.reduce(
        (
          acc: {
            heading?: React.ReactElement<HeadingBaseProps>
            subheading?: React.ReactElement<SubHeadingBaseProps>
            links: React.ReactElement<LinkBaseProps>[]
            action?: React.ReactElement<SubNavActionProps>
          },
          child,
        ) => {
          if (isValidElement(child)) {
            if (child.type === HeadingBase) {
              acc.heading = child as React.ReactElement<HeadingBaseProps>
            } else if (child.type === SubHeadingBase) {
              acc.subheading = child as React.ReactElement<SubHeadingBaseProps>
            } else if (child.type === LinkBase) {
              const linkChild = child as React.ReactElement<LinkBaseProps>
              const childNodes = Children.toArray(linkChild.props.children)
              const [link, subMenu] = childNodes
              const isAnchorVariant =
                isValidElement<SubMenuProps>(subMenu) &&
                subMenu.type === SubMenuBase &&
                subMenu.props.variant === 'anchor'

              acc.links.push(
                React.cloneElement(linkChild, {
                  ...(isAnchorVariant ? {children: [link]} : {}),
                  onClick: event => {
                    linkChild.props.onClick?.(event)
                    if (!event.defaultPrevented && linkChild.props['aria-current']) closeNarrowMenu()
                  },
                }),
              )
            } else if (child.type === ActionBase) {
              acc.action = child as React.ReactElement<SubNavActionProps>
            }
          }
          return acc
        },
        {heading: undefined, subheading: undefined, links: [], action: undefined},
      )

      const {
        overlayRef,
        overflowRef,
        overflowButtonRef,
        overflowMenuRef,
        visibleLinkCount,
        hasOverflow,
        isOverflowMenuOpen,
        closeOverflowMenu,
        handleOverflowMenuBlur,
      } = useWideMenu(children, isLarge, LinkChildren.length)
      const activeLinkChildren = activeLink ? Children.toArray(activeLink.props.children) : []
      const activeLinklabel = activeLinkChildren[0]

      // needed to prevent rendering of anchor subnav inside the narrow <button> element
      const maybeSubMenu = activeLinkChildren[1]
      const MaybeSubNav =
        isValidElement<SubMenuProps>(maybeSubMenu) &&
        maybeSubMenu.type === SubMenuBase &&
        maybeSubMenu.props.variant === 'anchor'
          ? maybeSubMenu
          : null

      const subHeadingIsActive =
        isValidElement<SubHeadingBaseProps>(SubHeadingChild) &&
        SubHeadingChild.type === SubHeadingBase &&
        Boolean(SubHeadingChild.props['aria-current'])
      const narrowButtonLabel = SubHeadingChild ? activeLinklabel : null
      const hasActiveOverflow = LinkChildren.slice(visibleLinkCount).some(
        link => Boolean(link.props['aria-current']) && link.props['aria-current'] !== 'false',
      )

      const NarrowButton = useMemo(
        () => (
          <div
            className={clsx(
              styles['SubNav__overlay-toggle'],
              isNarrowMenuOpen && styles['SubNav__overlay-toggle--open'],
            )}
          >
            <span
              className={clsx(
                styles['SubNav__overlay-toggle-content'],
                !narrowButtonLabel && styles['SubNav__overlay-toggle-content--end'],
              )}
            >
              <button
                ref={narrowButtonRef}
                className={styles['SubNav__overlay-toggle-label']}
                data-testid={testIds.button}
                onClick={isNarrowMenuOpen ? closeNarrowMenu : toggleNarrowMenu}
                aria-expanded={isNarrowMenuOpen ? 'true' : 'false'}
                aria-controls={idForLinkContainer}
                aria-label={
                  activeLinklabel
                    ? `${
                        isNarrowMenuOpen ? resolvedMenuLabels.closeActiveLabel : resolvedMenuLabels.activeLabel
                      } ${activeLinklabel}`
                    : isNarrowMenuOpen
                    ? resolvedMenuLabels.closeLabel
                    : resolvedMenuLabels.menuLabel
                }
              >
                {narrowButtonLabel && (
                  <Text as="span" size="100">
                    {narrowButtonLabel}
                  </Text>
                )}
                {isNarrowMenuOpen ? (
                  <TriangleUpIcon className={styles['SubNav__overlay-toggle-icon']} size={13} />
                ) : (
                  <TriangleDownIcon className={styles['SubNav__overlay-toggle-icon']} size={13} />
                )}
              </button>
            </span>
          </div>
        ),
        [
          closeNarrowMenu,
          toggleNarrowMenu,
          idForLinkContainer,
          isNarrowMenuOpen,
          activeLinklabel,
          narrowButtonLabel,
          resolvedMenuLabels.closeLabel,
          resolvedMenuLabels.menuLabel,
          resolvedMenuLabels.activeLabel,
          resolvedMenuLabels.closeActiveLabel,
        ],
      )

      const measurementCopyProps = {
        id: undefined,
        ref: null,
        'aria-activedescendant': undefined,
        'aria-controls': undefined,
        'aria-describedby': undefined,
        'aria-details': undefined,
        'aria-flowto': undefined,
        'aria-labelledby': undefined,
        'aria-owns': undefined,
      }

      // Keeps consumer identity on the real links, not their hidden measurement copies.
      const createMeasurementCopies = (nodes: ReactNode): ReactNode =>
        Children.map(nodes, child => {
          if (
            !isValidElement<PropsWithChildren<React.HTMLAttributes<HTMLElement>> & {ref?: React.Ref<HTMLElement>}>(
              child,
            )
          ) {
            return child
          }
          const childProps = child.type === React.Fragment ? {} : measurementCopyProps
          return React.cloneElement(child, {
            ...childProps,
            ...(child.props.children === undefined ? {} : {children: createMeasurementCopies(child.props.children)}),
          })
        })

      return (
        <div
          ref={rootRef}
          className={clsx(
            styles['SubNav__container'],
            SubHeadingChild && styles['SubNav--has-sub-heading'],
            SubHeadingChild && subHeadingIsActive && styles['SubNav--subHeadingActive'],
            hasAnchoredNav && styles['SubNav__container--with-anchor-nav'],
          )}
        >
          <SubNavProvider>
            <nav
              ref={navRef}
              id={id}
              className={clsx(
                styles.SubNav,
                isNarrowMenuOpen && styles['SubNav--open'],
                hasShadow && styles['SubNav--has-shadow'],
                fullWidth && styles['SubNav--full-width'],
                className,
              )}
              data-testid={testId || testIds.root}
            >
              <div ref={narrowMenuRef} className={styles['SubNav--header-container-outer']}>
                <div className={styles['SubNav__header-container']}>
                  {HeadingChild && <div className={styles['SubNav__heading-container']}>{HeadingChild}</div>}

                  {SubHeadingChild && (
                    <div
                      className={clsx(
                        styles['SubNav__heading-container'],
                        styles['SubNav__subheading-container'],
                        subHeadingIsActive && styles['SubNav__subheading-container-active'],
                      )}
                    >
                      {SubHeadingChild}
                    </div>
                  )}

                  {!isLarge && (!SubHeadingChild || subHeadingIsActive) && NarrowButton}

                  {MaybeSubNav && MaybeSubNav}
                </div>
                {!isLarge && SubHeadingChild && !subHeadingIsActive && NarrowButton}
                {LinkChildren.length > 0 && (
                  <ul
                    ref={overlayRef}
                    id={idForLinkContainer}
                    className={clsx(
                      styles['SubNav__links-overlay'],
                      isNarrowMenuOpen && styles['SubNav__links-overlay--open'],
                    )}
                    data-testid={testIds.overlay}
                  >
                    {LinkChildren.map((link, index) => {
                      const isOverflowed = Boolean(isLarge) && index >= visibleLinkCount
                      const hasSubMenu = Children.toArray(link.props.children).some(
                        child => isValidElement(child) && child.type === SubMenuBase,
                      )
                      return React.cloneElement(link, {
                        className: clsx(link.props.className, !hasSubMenu && styles['SubNav__link--in-overlay']),
                        _isOverflowed: isOverflowed,
                        ...(isOverflowed
                          ? {
                              ...measurementCopyProps,
                              children: createMeasurementCopies(link.props.children),
                            }
                          : {}),
                      })
                    })}
                    <li
                      ref={overflowRef}
                      className={clsx(
                        styles['SubNav__overflow-container'],
                        hasOverflow && styles['SubNav__overflow-container--visible'],
                      )}
                      aria-hidden={hasOverflow ? undefined : true}
                      onBlur={handleOverflowMenuBlur}
                    >
                      <button
                        ref={overflowButtonRef}
                        type="button"
                        className={clsx(
                          styles['SubNav__overflow-toggle'],
                          hasActiveOverflow && styles['SubNav__overflow-toggle--active'],
                        )}
                        data-testid={testIds.overflowButton}
                        aria-expanded={isOverflowMenuOpen}
                        aria-controls={overflowMenuId}
                        tabIndex={hasOverflow ? undefined : -1}
                      >
                        <Text as="span" size="100" className={styles['SubNav__link-label']}>
                          {resolvedMenuLabels.overflowMenuLabel}
                        </Text>
                        {isOverflowMenuOpen ? <TriangleUpIcon /> : <TriangleDownIcon />}
                      </button>
                      <div
                        ref={overflowMenuRef}
                        id={overflowMenuId}
                        popover="auto"
                        data-testid={testIds.overflowMenu}
                        className={styles['SubNav__overflow-menu']}
                      >
                        <ul
                          className={styles['SubNav__overflow-menu-list']}
                          aria-label={resolvedMenuLabels.overflowMenuLabel}
                        >
                          {LinkChildren.slice(visibleLinkCount).map(link =>
                            React.cloneElement(link, {
                              _isOverflowed: false,
                              _isOverflowMenu: true,
                              _onOverflowLinkActivate: closeOverflowMenu,
                            }),
                          )}
                        </ul>
                      </div>
                    </li>
                    {ActionChild && <li className={styles['SubNav__action-container']}>{ActionChild}</li>}
                  </ul>
                )}
              </div>
            </nav>
          </SubNavProvider>
        </div>
      )
    },
  ),
)

type HeadingBaseProps = {
  href: string
  'data-testid'?: string
} & PropsWithChildren<React.HTMLProps<HTMLAnchorElement>> &
  BaseProps<HTMLAnchorElement>

const HeadingBase = ({href, children, className, 'data-testid': testID, ...props}: HeadingBaseProps) => {
  return (
    <a
      href={href}
      className={clsx(styles['SubNav__heading'], className)}
      data-testid={testIds.heading || testID}
      {...props}
    >
      {children}
    </a>
  )
}

type SubHeadingBaseProps = {
  href: string
  'data-testid'?: string
} & PropsWithChildren<React.HTMLProps<HTMLAnchorElement>> &
  BaseProps<HTMLAnchorElement>

const SubHeadingBase = ({href, children, className, 'data-testid': testID, ...props}: SubHeadingBaseProps) => {
  return (
    <a
      href={href}
      className={clsx(styles['SubNav__heading'], styles['SubNav__link'], styles['SubNav__subHeading'], className)}
      data-testid={testIds.heading || testID}
      {...props}
    >
      {children}
    </a>
  )
}

type LinkBaseProps = {
  href: string
  'data-testid'?: string
  variant?: TextProps['variant']
  _subMenuVariant?: SubMenuVariants
  _isOverflowed?: boolean
  _isOverflowMenu?: boolean
  _onOverflowLinkActivate?: () => void
} & PropsWithChildren<React.HTMLProps<HTMLAnchorElement>> &
  BaseProps<HTMLAnchorElement>

// Handles hover, focus, and toggling for links with submenus.
const LinkBaseWithSubmenu = forwardRef<HTMLDivElement, LinkBaseProps>(
  (
    {
      children,
      href,
      'aria-current': ariaCurrent,
      'data-testid': testId,
      className,
      _subMenuVariant,
      _isOverflowMenu = false,
      _onOverflowLinkActivate,
      variant,
      ...props
    },
    forwardedRef,
  ) => {
    const submenuId = useId()
    const {isLarge} = useWindowSize()

    const [isExpanded, setIsExpanded] = useState(false)
    const ref = useProvidedRefOrCreate(forwardedRef as RefObject<HTMLDivElement>)
    const subMenuChildrenRef = useRef<HTMLDivElement>(null)

    useContainsFocus(ref, (containsFocus: boolean) => {
      if (!containsFocus) {
        setIsExpanded(false)
      }
    })

    const expand = useCallback(() => setIsExpanded(true), [])
    const collapse = useCallback(() => setIsExpanded(false), [])
    const toggleExpanded = useCallback(() => setIsExpanded(prev => !prev), [])
    const isAriaCurrent = Boolean(ariaCurrent) && ariaCurrent !== 'false'

    useKeyboardEscape(collapse)

    // Keeps collapsed desktop submenus out of the tab order.
    useEffect(() => {
      if (subMenuChildrenRef.current) {
        // Workaround to avoid React 18 / 19 type mismatches with the `inert` attribute.
        // This approach won't immediately apply the attribute in pure SSR contexts, only post-hydration
        // TODO: Move back to JSX when React 19 is fully adopted in Dotcom.
        // `inert` removes the collapsed submenu from tab order and the accessibility tree
        // without affecting visual appearance
        subMenuChildrenRef.current.toggleAttribute('inert', Boolean(isLarge) && !_isOverflowMenu && !isExpanded)
      }
    }, [isLarge, _isOverflowMenu, isExpanded])

    const [label, subMenuChildren] = children as ReactNode[]
    const subMenuLabel =
      isValidElement<SubMenuProps>(subMenuChildren) && subMenuChildren.type === SubMenuBase
        ? subMenuChildren.props['aria-label']
        : undefined
    const subMenu =
      _isOverflowMenu && isValidElement<SubMenuProps>(subMenuChildren) && subMenuChildren.type === SubMenuBase
        ? React.cloneElement(subMenuChildren, {_isOverflowMenu, _onOverflowLinkActivate})
        : subMenuChildren

    return (
      <div
        className={clsx(
          styles['SubNav__link--has-sub-menu'],
          isExpanded && styles['SubNav__link--expanded'],
          isAriaCurrent && styles['SubNav__link--has-active-sub-menu'],
        )}
        data-testid={testId || testIds.subMenu}
        ref={ref}
        onMouseOver={expand}
        onMouseOut={collapse}
        /**
         * onFocus and onBlur need to be defined to keep the jsx-a11y/mouse-events-have-key-events
         * eslint rule happy. The focus/blur behaviour is handled by useContainsFocus
         */
        onFocus={() => null}
        onBlur={() => null}
      >
        <a
          href={href}
          className={clsx(styles['SubNav__link'], ariaCurrent && styles['SubNav__link--active'], className)}
          aria-current={ariaCurrent}
          {...props}
          onClick={event => {
            props.onClick?.(event)
            if (!event.defaultPrevented) _onOverflowLinkActivate?.()
          }}
        >
          <Text as="span" size="100" weight="medium" className={styles['SubNav__link-label']}>
            {label}
          </Text>
        </a>
        {isLarge && !_isOverflowMenu && (
          <button
            className={styles['SubNav__sub-menu-toggle']}
            onClick={toggleExpanded}
            aria-expanded={isExpanded ? 'true' : 'false'}
            aria-controls={submenuId}
            aria-label={subMenuLabel ?? `${label?.toString().trim()} submenu`}
          >
            <TriangleDownIcon className={styles['SubNav__sub-menu-icon']} size={16} />
          </button>
        )}

        <div id={submenuId} className={styles['SubNav__sub-menu-children']} ref={subMenuChildrenRef}>
          {subMenu}
        </div>
      </div>
    )
  },
)

// Renders a link and tracks its section for anchor navigation.
const LinkBase = forwardRef<HTMLAnchorElement | HTMLDivElement, LinkBaseProps>((props, ref) => {
  const [isInView, setIsInView] = useState(false)
  const listItemRef = useRef<HTMLLIElement>(null)
  const {_isOverflowed, _isOverflowMenu = false, _onOverflowLinkActivate, ...linkProps} = props
  const childrenArr = Children.toArray(props.children)

  // Keeps links moved into overflow out of the row's tab order.
  useEffect(() => {
    listItemRef.current?.toggleAttribute('inert', Boolean(_isOverflowed))
  }, [_isOverflowed])

  const hasSubMenu = childrenArr.some(child => {
    if (isValidElement(child)) {
      return child.type === SubMenuBase
    }
  })

  // Marks an anchor link active when its section reaches the top.
  useEffect(() => {
    if (hasSubMenu) return
    const targetId = props.href.replace('#', '')
    const target = document.getElementById(targetId)
    if (!target) return

    const topOfWindow = '0px 0px -100%'
    const observerParams = {threshold: 0, root: null, rootMargin: topOfWindow}

    const handleIntersectionUpdate: IntersectionObserverCallback = ([entry]) => {
      setIsInView(entry.isIntersecting)
    }

    const observer = new IntersectionObserver(handleIntersectionUpdate, observerParams)
    observer.observe(target)
    return () => observer.disconnect()
  }, [hasSubMenu, props.href])

  if (hasSubMenu) {
    const isAnchorVariantSubMenu = childrenArr.some(child => {
      return isValidElement<SubMenuProps>(child) && child.type === SubMenuBase && child.props.variant === 'anchor'
    })

    return (
      <li
        ref={listItemRef}
        aria-hidden={_isOverflowed ? true : undefined}
        className={clsx(styles['SubNav__link-item'], _isOverflowed && styles['SubNav__link-item--overflowed'])}
      >
        <LinkBaseWithSubmenu
          ref={ref as RefObject<HTMLDivElement>}
          {...linkProps}
          _isOverflowMenu={_isOverflowMenu}
          _onOverflowLinkActivate={_onOverflowLinkActivate}
          _subMenuVariant={isAnchorVariantSubMenu ? 'anchor' : undefined}
        />
      </li>
    )
  }

  const {children, href, 'aria-current': ariaCurrent, 'data-testid': testId, variant, className, ...rest} = linkProps

  return (
    <li
      ref={listItemRef}
      aria-hidden={_isOverflowed ? true : undefined}
      className={clsx(styles['SubNav__link-item'], _isOverflowed && styles['SubNav__link-item--overflowed'])}
    >
      <a
        href={href}
        className={clsx(
          styles['SubNav__link'],
          ariaCurrent && styles['SubNav__link--active'],
          isInView && styles['SubNav__link--is-in-view'],
          className,
        )}
        aria-current={ariaCurrent}
        data-testid={testId || testIds.link}
        ref={ref as RefObject<HTMLAnchorElement>}
        {...rest}
        onClick={event => {
          rest.onClick?.(event)
          if (!event.defaultPrevented) _onOverflowLinkActivate?.()
        }}
      >
        <Text as="span" size="100" weight="medium" className={styles['SubNav__link-label']}>
          {children}
        </Text>
      </a>
    </li>
  )
})

type SubMenuProps = {
  variant?: SubMenuVariants
  _isOverflowMenu?: boolean
  _onOverflowLinkActivate?: () => void
} & React.HTMLAttributes<HTMLUListElement> &
  BaseProps<HTMLUListElement>

// Puts anchor links in the shared portal and keeps dropdown links local.
function SubMenuBase({
  children,
  className,
  'aria-label': ariaLabel = 'Sub navigation',
  variant = 'dropdown',
  _isOverflowMenu = false,
  _onOverflowLinkActivate,
  ...props
}: SubMenuProps) {
  const context = React.useContext(SubNavContext)
  const navRef = useRef<HTMLElement>(null)

  const {isLarge} = useWindowSize()

  /**
   * Effect is needed to prevent the bubbling of onClick events to the overlay trigger.
   * Removing this effect will cause clicks on the anchor nav element to toggle the overlay.
   */
  // Keeps clicks in the anchor menu from toggling the narrow menu.
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        return
      }

      if (!(e.target instanceof HTMLAnchorElement)) {
        e.stopPropagation()
      }
    }

    if (variant === 'anchor') {
      document.addEventListener('click', handleClick, true) // Capture phase
    }

    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [variant])

  if (variant === 'anchor' && context?.portalRef.current) {
    return createPortal(
      <nav
        ref={navRef}
        className={clsx(styles['SubNav__sub-menu'], styles['SubNav__sub-menu--anchor'], className)}
        role="navigation"
        aria-label={ariaLabel}
      >
        <ul className={styles['SubNav__sub-menu-list']} {...props}>
          {React.Children.map(children, child => {
            if (isValidElement<LinkBaseProps>(child) && child.type === LinkBase) {
              return React.cloneElement(child, {
                ...(_isOverflowMenu ? {_isOverflowMenu, _onOverflowLinkActivate} : {}),
                onClick: e => {
                  child.props.onClick?.(e)
                },
              })
            }
            return null
          })}
        </ul>
      </nav>,
      context.portalRef.current,
    )
  } else {
    const Tag = isLarge && !_isOverflowMenu ? ThemeProvider : React.Fragment

    return (
      <Tag {...(isLarge && !_isOverflowMenu ? {colorMode: 'light'} : {})}>
        <ul
          className={clsx(styles['SubNav__sub-menu'], styles[`SubNav__sub-menu--${variant}`], className)}
          aria-label={ariaLabel}
          {...props}
        >
          {_isOverflowMenu
            ? Children.map(children, child =>
                isValidElement<LinkBaseProps>(child) && child.type === LinkBase
                  ? React.cloneElement(child, {_isOverflowMenu, _onOverflowLinkActivate})
                  : child,
              )
            : children}
        </ul>
      </Tag>
    )
  }
}

type SubNavActionProps = {
  /**
   * Required path or location for the action button to link to.
   */
  href: string
  /**
   * Optional sizes for the button.
   */
  size?: (typeof ButtonSizes)[number]
  /**
   * Optional sizes for the button.
   */
  variant?: (typeof ButtonVariants)[number]
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>

function ActionBase({children, href, variant = 'primary', size = 'small', ...rest}: SubNavActionProps) {
  return (
    <Button
      className={styles['SubNav__action']}
      as="a"
      href={href}
      variant={variant}
      data-testid={testIds.action}
      size={size}
      {...rest}
    >
      {children}
    </Button>
  )
}

/**
 * Use SubNav to display a secondary navigation beneath a primary header.
 * @see https://primer.style/brand/components/SubNav
 */
export const SubNav = Object.assign(SubNavRoot, {
  Heading: HeadingBase,
  SubHeading: SubHeadingBase,
  Link: LinkBase,
  Action: ActionBase,
  SubMenu: SubMenuBase,
  testIds,
})
