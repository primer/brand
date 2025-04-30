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
  type ReactElement,
  type ReactNode,
  type RefObject,
} from 'react'
import {Button, ButtonSizes, ButtonVariants, Text, TextProps, ThemeProvider, useWindowSize} from '..'

import {default as clsx} from 'clsx'
import {ChevronDownIcon, ChevronUpIcon} from '@primer/octicons-react'
import {useId} from '../hooks/useId'
import {useKeyboardEscape} from '../hooks/useKeyboardEscape'
import {useOnClickOutside} from '../hooks/useOnClickOutside'
import {useProvidedRefOrCreate} from '../hooks/useRef'
import {useContainsFocus} from './useContainsFocus'

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
}

export const SubNavSubMenuVariants = ['dropdown', 'anchor'] as const
type SubMenuVariants = (typeof SubNavSubMenuVariants)[number]

type SubNavContextType = {
  portalRef: RefObject<HTMLDivElement>
}

const SubNavContext = createContext<SubNavContextType | undefined>(undefined)

export const useSubNavContext = () => {
  const context = useContext(SubNavContext)
  if (!context) {
    throw new Error('useSubNavContext must be used within a SubNavProvider')
  }
  return context
}

function SubNavProvider({children}: {children: React.ReactNode}) {
  const anchoredNavOuterPortalRef = React.useRef<HTMLDivElement>(null)
  const anchoredNavPortalRef = React.useRef<HTMLDivElement>(null)

  const value = useMemo(
    () => ({
      portalRef: anchoredNavPortalRef,
    }),
    [],
  )

  useEffect(() => {
    const menuContainer = anchoredNavOuterPortalRef.current

    const observer = new IntersectionObserver(
      ([entry]) => {
        entry.target.classList.toggle(styles['SubNav__anchor-menu-outer-container--stuck'], entry.intersectionRatio < 1)
      },
      {threshold: [1]},
    )

    if (menuContainer) {
      observer.observe(menuContainer)
    }

    return () => {
      if (menuContainer) {
        observer.unobserve(menuContainer)
      }
    }
  }, [])

  return (
    <SubNavContext.Provider value={value}>
      {children}

      <div className={styles['SubNav__anchor-menu-outer-container']} ref={anchoredNavOuterPortalRef}>
        <div className={clsx(styles['SubNav__anchor-menu-container'])} ref={anchoredNavPortalRef} />
      </div>
    </SubNavContext.Provider>
  )
}

export type SubNavProps = {
  hasShadow?: boolean
  /**
   * Allows the SubNav to be used at full width,
   * removing any internal padding and guttering.
   */
  fullWidth?: boolean
  'data-testid'?: string
} & PropsWithChildren<BaseProps<HTMLElement>>

const _SubNavRoot = memo(({id, children, className, 'data-testid': testId, fullWidth, hasShadow}: SubNavProps) => {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const navRef = React.useRef<HTMLElement>(null)
  const overlayRef = React.useRef<HTMLUListElement>(null)
  const [isOpenAtNarrow, setIsOpenAtNarrow] = useState(false)
  const idForLinkContainer = useId()
  const [hasAnchoredNav, setHasAnchoredNav] = useState(false)

  const {isLarge} = useWindowSize()

  const childrenArr = Children.toArray(children)

  const closeMenuCallback = useCallback(() => {
    if (isLarge) return
    setIsOpenAtNarrow(false)
  }, [isLarge])

  const handleMenuToggle = useCallback(() => {
    if (isLarge) return
    setIsOpenAtNarrow(prev => !prev)
  }, [isLarge])

  useOnClickOutside(rootRef, closeMenuCallback)
  useKeyboardEscape(closeMenuCallback)

  useEffect(() => {
    if (isOpenAtNarrow && !isLarge) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpenAtNarrow, isLarge])

  const activeLink = childrenArr.find(child => {
    if (isValidElement(child)) {
      return child.props['aria-current']
    }
  }) as React.ReactElement | undefined

  useEffect(() => {
    // check if there is an anchored nav in the SubNav.SubMenu child
    const hasAnchorVariant = childrenArr.some(child => {
      if (isValidElement(child) && child.type === SubNavLink) {
        const [, subMenu] = child.props.children
        if (subMenu?.props?.variant === 'anchor') {
          return true
        }
      }
    })
    setHasAnchoredNav(hasAnchorVariant)
  }, [childrenArr])

  const {
    heading: HeadingChild,
    links: LinkChildren,
    action: ActionChild,
  } = childrenArr.reduce(
    (acc: {heading?: ReactNode; links: ReactElement[]; action?: ReactNode}, child) => {
      if (isValidElement(child)) {
        if (child.type === SubNavHeading) {
          acc.heading = child
        } else if (child.type === SubNavLink) {
          const [link, subMenu] = child.props.children

          if (subMenu?.props?.variant === 'anchor') {
            acc.links.push(
              React.cloneElement(child as ReactElement<SubNavLinkProps>, {
                children: [link],
                onClick: child.props['aria-current'] ? closeMenuCallback : child.props.onClick,
              }),
            )
          } else {
            acc.links.push(
              React.cloneElement(child as ReactElement<SubNavLinkProps>, {
                onClick: child.props['aria-current'] ? closeMenuCallback : child.props.onClick,
              }),
            )
          }
        } else if (child.type === _SubNavAction) {
          acc.action = child
        }
      }
      return acc
    },
    {heading: undefined, links: [], action: undefined},
  )

  const activeLinklabel =
    typeof activeLink?.props.children === 'string' ? activeLink.props.children : activeLink?.props.children[0]

  // needed to prevent rendering of anchor subnav inside the narrow <button> element
  const MaybeSubNav = activeLink?.props.children?.[1]?.props?.variant === 'anchor' && activeLink.props.children?.[1]
  return (
    <div className={clsx(styles['SubNav__container'], hasAnchoredNav && styles['SubNav__container--with-anchor-nav'])}>
      <SubNavProvider>
        <nav
          ref={navRef}
          id={id}
          className={clsx(
            styles.SubNav,
            isOpenAtNarrow && styles['SubNav--open'],
            hasShadow && styles['SubNav--has-shadow'],
            fullWidth && styles['SubNav--full-width'],
            className,
          )}
          data-testid={testId || testIds.root}
        >
          <div ref={rootRef} className={styles['SubNav--header-container-outer']}>
            <div className={styles['SubNav__header-container']}>
              {HeadingChild && <div className={styles['SubNav__heading-container']}>{HeadingChild}</div>}
              <span
                role="separator"
                className={clsx(
                  styles['SubNav__heading-separator'],
                  activeLinklabel && styles['SubNav__heading-separator--has-adjacent-label'],
                )}
                aria-hidden
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="16"
                  viewBox="0 0 8 16"
                  fill="none"
                  aria-hidden
                >
                  <g clipPath="url(#clip0_50_1307)">
                    <path d="M0 15.2992L5.472 0.701172H7.632L2.16 15.2992H0Z" fill="currentColor" />
                  </g>
                  <defs>
                    <clipPath id="clip0_50_1307">
                      <rect width="7.632" height="14.598" transform="translate(0 0.701172)" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              {!isLarge && (
                <button
                  className={clsx(
                    styles['SubNav__overlay-toggle'],
                    isOpenAtNarrow && styles['SubNav__overlay-toggle--open'],
                  )}
                  data-testid={testIds.button}
                  onClick={isOpenAtNarrow ? closeMenuCallback : handleMenuToggle}
                  aria-expanded={isOpenAtNarrow ? 'true' : 'false'}
                  aria-controls={idForLinkContainer}
                >
                  {activeLinklabel && <span className="visually-hidden">Navigation menu. Current page: </span>}
                  <span
                    className={clsx(
                      styles['SubNav__overlay-toggle-content'],
                      !activeLinklabel && styles['SubNav__overlay-toggle-content--end'],
                    )}
                  >
                    {activeLinklabel && (
                      <Text as="span" size="200">
                        {activeLinklabel}
                      </Text>
                    )}
                    {isOpenAtNarrow ? (
                      <ChevronUpIcon className={styles['SubNav__overlay-toggle-icon']} size={24} />
                    ) : (
                      <ChevronDownIcon className={styles['SubNav__overlay-toggle-icon']} size={24} />
                    )}
                  </span>
                </button>
              )}
              {MaybeSubNav && MaybeSubNav}
            </div>
            {LinkChildren.length && (
              <ul
                ref={overlayRef}
                id={idForLinkContainer}
                className={clsx(
                  styles['SubNav__links-overlay'],
                  isOpenAtNarrow && styles['SubNav__links-overlay--open'],
                )}
                data-testid={testIds.overlay}
              >
                {LinkChildren}
                {ActionChild && <li className={styles['SubNav__action-container']}>{ActionChild}</li>}
              </ul>
            )}
          </div>
        </nav>
      </SubNavProvider>
    </div>
  )
})

type SubNavHeadingProps = {
  href: string
  'data-testid'?: string
} & PropsWithChildren<React.HTMLProps<HTMLAnchorElement>> &
  BaseProps<HTMLAnchorElement>

const SubNavHeading = ({href, children, className, 'data-testid': testID, ...props}: SubNavHeadingProps) => {
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

type SubNavLinkProps = {
  href: string
  'data-testid'?: string
  variant?: TextProps['variant']
  _subMenuVariant?: SubMenuVariants
} & PropsWithChildren<React.HTMLProps<HTMLAnchorElement>> &
  BaseProps<HTMLAnchorElement>

const SubNavLinkWithSubmenu = forwardRef<HTMLDivElement, SubNavLinkProps>(
  (
    {children, href, 'aria-current': ariaCurrent, 'data-testid': testId, className, _subMenuVariant, variant, ...props},
    forwardedRef,
  ) => {
    const submenuId = useId()
    const {isLarge} = useWindowSize()

    const [isExpanded, setIsExpanded] = useState(false)
    const ref = useProvidedRefOrCreate(forwardedRef as RefObject<HTMLDivElement>)

    useContainsFocus(ref, (containsFocus: boolean) => {
      if (!containsFocus) {
        setIsExpanded(false)
      }
    })

    const expand = useCallback(() => setIsExpanded(true), [])
    const collapse = useCallback(() => setIsExpanded(false), [])
    const toggleExpanded = useCallback(() => setIsExpanded(prev => !prev), [])

    useKeyboardEscape(collapse)

    const [label, SubMenuChildren] = children as ReactNode[]

    return (
      <div
        className={clsx(styles['SubNav__link--has-sub-menu'], isExpanded && styles['SubNav__link--expanded'])}
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
        >
          <Text
            as="span"
            size="200"
            weight="semibold"
            className={styles['SubNav__link-label']}
            variant={ariaCurrent === 'page' || variant === 'default' ? 'default' : 'muted'}
          >
            {label}
          </Text>
        </a>
        {isLarge && (
          <button
            className={styles['SubNav__sub-menu-toggle']}
            onClick={toggleExpanded}
            aria-expanded={isExpanded ? 'true' : 'false'}
            aria-controls={submenuId}
            aria-label={`${isExpanded ? 'Close' : 'Open'} submenu`}
          >
            <ChevronDownIcon className={styles['SubNav__sub-menu-icon']} size={16} />
          </button>
        )}

        <div id={submenuId} className={styles['SubNav__sub-menu-children']} aria-hidden={!isExpanded}>
          {SubMenuChildren}
        </div>
      </div>
    )
  },
)

const SubNavLink = forwardRef<HTMLAnchorElement | HTMLDivElement, SubNavLinkProps>((props, ref) => {
  const [isInView, setIsInView] = useState(false)
  const childrenArr = Children.toArray(props.children)

  const hasSubMenu = childrenArr.some(child => {
    if (isValidElement(child)) {
      return child.type === _SubMenu
    }
  })

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
      if (isValidElement(child)) {
        return child.type === _SubMenu && child.props.variant === 'anchor'
      }
    })

    return (
      <li>
        <SubNavLinkWithSubmenu
          {...props}
          ref={ref as RefObject<HTMLDivElement>}
          _subMenuVariant={isAnchorVariantSubMenu ? 'anchor' : undefined}
        />
      </li>
    )
  }

  const {children, href, 'aria-current': ariaCurrent, 'data-testid': testId, variant, className, ...rest} = props

  return (
    <li>
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
      >
        <Text
          as="span"
          size="100"
          weight="semibold"
          className={styles['SubNav__link-label']}
          variant={ariaCurrent === 'page' || variant === 'default' ? 'default' : 'muted'}
        >
          {children}
        </Text>
      </a>
    </li>
  )
})

type SubMenuProps = {
  variant?: SubMenuVariants
} & React.HTMLAttributes<HTMLUListElement> &
  BaseProps<HTMLUListElement>

function _SubMenu({children, className, variant = 'dropdown', ...props}: SubMenuProps) {
  const context = React.useContext(SubNavContext)
  const navRef = useRef<HTMLElement>(null)

  const {isLarge} = useWindowSize()

  /**
   * Effect is needed to prevent the bubbling of onClick events to the overlay trigger.
   * Removing this effect will cause clicks on the anchor nav element to toggle the overlay.
   */
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
        aria-label="Sub navigation"
      >
        <ul className={styles['SubNav__sub-menu-list']} {...props}>
          {React.Children.map(children, child => {
            if (isValidElement(child)) {
              return React.cloneElement(child as React.ReactElement<SubNavLinkProps>, {
                onClick: e => {
                  if (child.props.onClick) {
                    child.props.onClick(e)
                  }
                },
              })
            }
          })}
        </ul>
      </nav>,
      context.portalRef.current,
    )
  } else {
    const Tag = isLarge ? ThemeProvider : React.Fragment

    return (
      <Tag {...(isLarge ? {colorMode: 'light'} : {})}>
        <ul className={clsx(styles['SubNav__sub-menu'], styles[`SubNav__sub-menu--${variant}`], className)} {...props}>
          {children}
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

function _SubNavAction({children, href, variant = 'primary', size = 'small', ...rest}: SubNavActionProps) {
  return (
    <Button
      className={styles['SubNav__action']}
      as="a"
      href={href}
      variant={variant}
      hasArrow={false}
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
export const SubNav = Object.assign(_SubNavRoot, {
  Heading: SubNavHeading,
  Link: SubNavLink,
  Action: _SubNavAction,
  SubMenu: _SubMenu,
  testIds,
})
