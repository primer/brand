import {clsx} from 'clsx'
import React, {useRef} from 'react'
import {TriangleDownIcon, TriangleUpIcon} from '@primer/octicons-react'
import {useId} from '../hooks/useId'

import {Button, type ButtonBaseProps} from '../Button'
import {useWindowSize} from '../hooks/useWindowSize'
import {useAnchorNav} from './useAnchorNav'
import {useAnchorNavNarrowMenu} from './useAnchorNavNarrowMenu'
import {useAnchorNavWideMenu} from './useAnchorNavWideMenu'

import type {BaseProps} from '../component-helpers'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/anchor-nav/base.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/anchor-nav/colors-with-modes.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from './AnchorNav.module.css'

const testIds = {
  root: 'AnchorNav',
  get menuButton() {
    return `${this.root}-menu-button`
  },
  get menuLinks() {
    return `${this.root}-menu-links`
  },
  get overflowButton() {
    return `${this.root}-overflow-button`
  },
  get overflowMenu() {
    return `${this.root}-overflow-menu`
  },
  get action() {
    return `${this.root}-action`
  },
  get navSpacer() {
    return `${this.root}-nav-spacer`
  },
}

const maxAnchorNavLinks = 9

export type AnchorNavMenuLabels = {
  /**
   * Announced before the current link label on the narrow menu button.
   */
  activeLabel: string
  /**
   * Accessible name for the navigation landmark. `aria-label` overrides it.
   */
  navigationLabel: string
  /**
   * Label for the button and list that hold links that don't fit at wide viewports.
   */
  overflowMenuLabel: string
}

const defaultMenuLabels: AnchorNavMenuLabels = {
  activeLabel: 'Anchor navigation menu. Currently selected:',
  navigationLabel: 'Anchored navigation',
  overflowMenuLabel: 'More',
}

export type AnchorNavProps = BaseProps<HTMLElement> & {
  /**
   * Accepts up to nine `AnchorNav.Link` and one `AnchorNav.Action` child components.
   */
  children: React.ReactNode[]
  /**
   * When true, the anchor nav will hide until it is sticky.
   */
  hideUntilSticky?: boolean
  /**
   * Overrides the default accessible labels. Use this to localize them.
   */
  menuLabels?: Partial<AnchorNavMenuLabels>
} & React.ComponentPropsWithoutRef<'nav'>

function AnchorNavBase({
  'aria-label': ariaLabel,
  children,
  className,
  hideUntilSticky = false,
  menuLabels,
  ...rest
}: AnchorNavProps) {
  const innerContainerRef = useRef<HTMLDivElement | null>(null)
  const actionRef = useRef<HTMLDivElement | null>(null)

  // Links show in a row from the small breakpoint up, and behind the menu button below it.
  const {isSmall: isWide} = useWindowSize()
  const idForLinkContainer = useId()
  const overflowMenuId = useId()
  const resolvedMenuLabels = {...defaultMenuLabels, ...menuLabels}
  const validChildren = React.Children.toArray(children).filter(React.isValidElement)
  const allLinks = validChildren.filter(
    (child): child is React.ReactElement<AnchorNavLinkProps> => child.type === NavLinkBase,
  )
  const actions = validChildren.filter(
    (child): child is React.ReactElement<AnchorNavActionProps> => child.type === ActionBase,
  )

  if (
    (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') &&
    allLinks.length > maxAnchorNavLinks
  ) {
    // eslint-disable-next-line no-console
    console.warn(`AnchorNav: Use no more than ${maxAnchorNavLinks} links.`)
  }

  if ((process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') && actions.length > 1) {
    // eslint-disable-next-line no-console
    console.warn('AnchorNav: Use no more than one AnchorNav.Action.')
  }

  const links = allLinks.slice(0, maxAnchorNavLinks)
  const action = actions.length > 0 ? actions[0] : null
  const narrowMenu = useAnchorNavNarrowMenu(isWide, innerContainerRef, actionRef)
  const {activeHref, selectSection, wrapperRef, rootRef, navShouldFix, navHeight} = useAnchorNav(
    links.map(link => link.props.href),
    hideUntilSticky,
    narrowMenu.isExpanded,
    isWide,
  )
  const activeIndex = links.findIndex(link => link.props.href === activeHref)
  const narrowActiveIndex = Math.max(activeIndex, 0)
  const activeLabel = links.length > 0 ? links[narrowActiveIndex].props.children : null

  const {
    linksRef,
    overflowRef,
    overflowButtonRef,
    overflowMenuRef,
    indicatorRef,
    visibleLinkCount,
    hasOverflow,
    hasActiveOverflow,
    activeItemIndex,
    isOverflowMenuOpen,
    closeOverflowMenu,
    handleOverflowMenuBlur,
  } = useAnchorNavWideMenu(children, isWide, links.length, activeIndex, innerContainerRef, actionRef)

  return (
    <div ref={wrapperRef}>
      <nav
        ref={rootRef}
        aria-label={ariaLabel ?? resolvedMenuLabels.navigationLabel}
        data-sticky={navShouldFix.toString()}
        className={clsx(
          styles.AnchorNav,
          hideUntilSticky && styles['AnchorNav--hide-until-sticky'],
          navShouldFix && styles['AnchorNav--stuck'],
          narrowMenu.isExpanded && styles['AnchorNav--expanded'],
          className,
        )}
        {...rest}
      >
        <div
          ref={innerContainerRef}
          className={clsx(
            styles['AnchorNav-inner-container'],
            narrowMenu.isExpanded && styles['AnchorNav-inner-container--expanded'],
          )}
        >
          <button
            ref={narrowMenu.menuButtonRef}
            type="button"
            onClick={narrowMenu.toggleMenu}
            className={styles['AnchorNav-menu-button']}
            aria-expanded={narrowMenu.isExpanded}
            aria-controls={idForLinkContainer}
            data-testid={testIds.menuButton}
          >
            <span className="visually-hidden">{resolvedMenuLabels.activeLabel} </span>
            <span ref={narrowMenu.menuLabelRef} className={styles['AnchorNav-link-label']}>
              {activeLabel}
            </span>
            {narrowMenu.isExpanded ? (
              <TriangleUpIcon size={13} className={styles['AnchorNav-menu-button-arrow']} />
            ) : (
              <TriangleDownIcon size={13} className={styles['AnchorNav-menu-button-arrow']} />
            )}
          </button>
          <ul
            ref={linksRef}
            id={idForLinkContainer}
            data-testid={testIds.menuLinks}
            className={styles['AnchorNav-link-container']}
          >
            {links.map((link, index) => {
              const isOverflowed = hasOverflow && index >= visibleLinkCount
              return (
                <li
                  key={link.key ?? index}
                  // Workaround to avoid React 18 / 19 type mismatches with the `inert` attribute.
                  ref={node => {
                    node?.toggleAttribute('inert', isOverflowed)
                  }}
                  aria-hidden={isOverflowed ? true : undefined}
                  className={clsx(
                    styles['AnchorNav-link-item'],
                    isOverflowed && styles['AnchorNav-link-item--overflowed'],
                  )}
                >
                  {React.cloneElement(link, {
                    id: isOverflowed ? undefined : link.props.id,
                    _isActive:
                      !isOverflowed &&
                      (narrowMenu.isExpanded ? index === narrowActiveIndex : link.props.href === activeHref),
                    _onActivate: () => {
                      selectSection(link.props.href)
                      narrowMenu.closeMenu()
                    },
                  })}
                </li>
              )
            })}
            <li
              ref={overflowRef}
              className={clsx(styles['AnchorNav-overflow'], hasOverflow && styles['AnchorNav-overflow--visible'])}
              aria-hidden={hasOverflow ? undefined : true}
              onBlur={handleOverflowMenuBlur}
            >
              <button
                ref={overflowButtonRef}
                type="button"
                className={clsx(
                  styles['AnchorNav-link'],
                  styles['AnchorNav-overflow-toggle'],
                  hasActiveOverflow && styles['AnchorNav-link--is-active'],
                  isOverflowMenuOpen && styles['AnchorNav-overflow-toggle--open'],
                )}
                data-testid={testIds.overflowButton}
                aria-expanded={isOverflowMenuOpen}
                aria-controls={overflowMenuId}
                tabIndex={hasOverflow ? undefined : -1}
              >
                <span className={styles['AnchorNav-link-label']}>{resolvedMenuLabels.overflowMenuLabel}</span>
                {isOverflowMenuOpen ? <TriangleUpIcon size={13} /> : <TriangleDownIcon size={13} />}
              </button>
              <div
                ref={overflowMenuRef}
                id={overflowMenuId}
                popover="auto"
                data-testid={testIds.overflowMenu}
                className={styles['AnchorNav-overflow-menu']}
              >
                <ul
                  className={styles['AnchorNav-overflow-menu-list']}
                  aria-label={resolvedMenuLabels.overflowMenuLabel}
                >
                  {hasOverflow &&
                    links.slice(visibleLinkCount).map((link, index) => (
                      <li key={link.key ?? index}>
                        {React.cloneElement(link, {
                          _isActive: link.props.href === activeHref,
                          _onActivate: () => {
                            selectSection(link.props.href)
                            closeOverflowMenu()
                          },
                        })}
                      </li>
                    ))}
                </ul>
              </div>
            </li>
          </ul>
          <span
            ref={indicatorRef}
            className={clsx(
              styles['AnchorNav-active-indicator'],
              activeItemIndex !== undefined && styles['AnchorNav-active-indicator--visible'],
            )}
            aria-hidden
          />
          {action && (
            <div
              ref={actionRef}
              className={clsx(
                styles['AnchorNav__actionsContainer'],
                narrowMenu.isActionFolded && !narrowMenu.isExpanded && styles['AnchorNav__actionsContainer--hidden'],
              )}
            >
              {action}
            </div>
          )}
        </div>
        <span
          className={clsx(narrowMenu.isExpanded && styles['AnchorNav-overlay--expanded'])}
          onClick={narrowMenu.closeMenu}
          aria-hidden
        />
      </nav>
      {navShouldFix && <div style={{height: navHeight}} aria-hidden="true" data-testid={testIds.navSpacer} />}
    </div>
  )
}

type AnchorNavLinkProps = BaseProps<HTMLAnchorElement> & {
  /**
   * Required path or location for the anchor to link to.
   */
  href: string
  _isActive?: boolean // internal prop, not exposed in docs
  _onActivate?: () => void // internal prop, not exposed in docs
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>

function NavLinkBase({
  children,
  className,
  href,
  onClick,
  _isActive = false,
  _onActivate,
  ...rest
}: AnchorNavLinkProps) {
  const isAnchor = /^#/.test(href)

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (!event.defaultPrevented) _onActivate?.()
  }

  return (
    <a
      className={clsx(styles['AnchorNav-link'], _isActive && styles['AnchorNav-link--is-active'], className)}
      href={isAnchor ? href : `#${href}`}
      aria-current={_isActive ? 'true' : undefined}
      onClick={handleClick}
      {...rest}
    >
      <span className={styles['AnchorNav-link-label']}>{children}</span>
    </a>
  )
}

type AnchorNavActionProps = {
  /**
   * Required path or location for the action button to link to.
   */
  href: string
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> &
  Omit<ButtonBaseProps, 'size'>

function ActionBase({children, className, href, variant = 'secondary', ...rest}: AnchorNavActionProps) {
  return (
    <Button
      as="a"
      variant={variant}
      size="small"
      className={clsx(styles['AnchorNav-action'], className)}
      href={href}
      data-testid={testIds.action}
      {...rest}
    >
      {children}
    </Button>
  )
}

/**
 * AnchorNav allows users to navigate to different sections of a page.
 * @see https://primer.style/brand/components/AnchorNav
 */
export const AnchorNav = Object.assign(AnchorNavBase, {
  Link: NavLinkBase,
  Action: ActionBase,
  testIds,
})
