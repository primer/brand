import clsx from 'clsx'
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {ChevronDownIcon, ChevronUpIcon} from '@primer/octicons-react'
import {useId} from '@reach/auto-id'

import {Button, Text} from '../'
import {useWindowSize} from '../hooks/useWindowSize'
import {useKeyboardEscape} from '../hooks/useKeyboardEscape'
import {useExpandedMenu} from './useExpandedMenu'

import type {BaseProps} from '../component-helpers'

/**
 * Design tokens
 */
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
  get action() {
    return `${this.root}-action`
  }
}

export type AnchorNavProps = BaseProps<HTMLElement> & {
  /**
   * Accepts all of `AnchorNav.Item` and `AnchorNav.Action` child components.
   */
  children: React.ReactNode[]
  /**
   * Enable the idle state background color, which is transparent by default.
   */
  enableDefaultBgColor?: boolean
} & React.ComponentPropsWithoutRef<'nav'>

function _AnchorNav({children, enableDefaultBgColor = false, ...props}: AnchorNavProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [currentActiveNavItem, setCurrentActiveNavItem] = useState<string | null>()
  const [intersectionEntry, setIntersectionEntry] = useState<IntersectionObserverEntry>()
  const [initialYOffset, setInitialYOffset] = useState<undefined | number>()
  const [navShouldFix, setNavShouldFix] = useState<boolean>(false)

  const rootRef = useRef<HTMLElement | null>(null)
  const menuToggleButtonRef = useRef<HTMLButtonElement | null>(null)
  const linkContainerRef = useRef<HTMLDivElement | null>(null)

  const {isLarge} = useWindowSize()
  const idForLinkContainer = useId()

  const closeMenuCallback = useCallback(() => setMenuOpen(false), [setMenuOpen])
  const toggleMenuCallback = useCallback(() => setMenuOpen(!menuOpen), [menuOpen])

  const ValidChildren = useMemo(
    () =>
      React.Children.toArray(children).filter(
        (child: React.ReactNode): boolean => React.isValidElement(child) && typeof child.type !== 'string'
      ),
    [children]
  )

  useEffect(() => {
    if (initialYOffset === undefined && intersectionEntry) {
      setInitialYOffset(intersectionEntry.boundingClientRect.y)
    }
  }, [initialYOffset, intersectionEntry])

  const handleIntersectionUpdate = ([nextEntry]: IntersectionObserverEntry[]): void => {
    setIntersectionEntry(nextEntry)
  }

  useKeyboardEscape(closeMenuCallback)
  useExpandedMenu(menuOpen, linkContainerRef, menuToggleButtonRef, !isLarge)

  useEffect(() => {
    const queryResult = window.matchMedia('(prefers-reduced-motion: reduce)')

    setPrefersReducedMotion(queryResult.matches)
  }, [])

  useEffect(() => {
    const handler = () => {
      if (initialYOffset) {
        const isPastInitialYOffset = window.pageYOffset > initialYOffset
        isPastInitialYOffset ? setNavShouldFix(true) : setNavShouldFix(false)
      }
    }
    // eslint-disable-next-line github/prefer-observers
    window.addEventListener('scroll', handler)
    return () => {
      window.removeEventListener('scroll', handler)
    }
  }, [initialYOffset])

  useEffect(() => {
    const node = rootRef.current

    const supportsIntersectionObserver = !!window.IntersectionObserver

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!supportsIntersectionObserver || !node) return

    const topOfWindow = '0px 0px -100%'
    const observerParams = {threshold: 0, root: null, rootMargin: topOfWindow}
    const observer = new IntersectionObserver(handleIntersectionUpdate, observerParams)

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  const handleMenuToggle = useCallback(
    event => {
      event?.preventDefault()
      toggleMenuCallback()
    },
    [toggleMenuCallback]
  )

  const handleUpdateToCurrentActiveNavItem = useCallback(
    (id: string | null) => {
      setCurrentActiveNavItem(id)
    },
    [setCurrentActiveNavItem]
  )

  const numLinks = ValidChildren.filter(child => React.isValidElement(child) && child.type === _AnchorNavLink).length
  const Links = ValidChildren.map((child, index) => {
    if (React.isValidElement(child)) {
      if (child.type === _AnchorNavLink) {
        const defaultProps: AnchorNavLinkProps = {
          href: child.props.href,
          toggleMenuCallback,
          prefersReducedMotion,
          updateCurrentActiveNav: handleUpdateToCurrentActiveNavItem,
          alignment: numLinks < 4 ? 'start' : 'center'
        }
        return React.cloneElement(child as React.ReactElement<AnchorNavLinkProps>, {
          isActive: index === 0,
          ...defaultProps
        })
      }
    }

    return null
  })
    .filter(Boolean)
    .slice(0, 5)

  const Action = ValidChildren.map(child => {
    if (React.isValidElement(child) && child.type === _AnchorNavAction) {
      return React.cloneElement(child)
    }
    return null
  }).filter(Boolean)

  return (
    <nav
      ref={rootRef}
      className={clsx(
        styles.AnchorNav,
        navShouldFix && styles['AnchorNav--stuck'],
        menuOpen && styles['AnchorNav--expanded'],
        enableDefaultBgColor && styles['AnchorNav--with-default-background-color']
      )}
      {...props}
    >
      <div
        className={clsx(styles['AnchorNav-inner-container'], menuOpen && styles['AnchorNav-inner-container--expanded'])}
      >
        <button
          ref={menuToggleButtonRef}
          onClick={handleMenuToggle}
          className={clsx(styles['AnchorNav-menu-button'])}
          aria-expanded={menuOpen ? 'true' : 'false'}
          aria-controls={idForLinkContainer}
          aria-label={`${menuOpen ? 'close' : 'open'} anchor navigation menu`}
          data-testid={testIds.menuButton}
        >
          {menuOpen ? (
            <ChevronUpIcon size={16} className={styles['AnchorNav-menu-button-arrow']} fill="currentcolor" />
          ) : (
            <ChevronDownIcon size={16} className={styles['AnchorNav-menu-button-arrow']} fill="currentcolor" />
          )}
          <Text as="span" className={clsx(styles['AnchorNav-link-label'])}>
            {currentActiveNavItem}
          </Text>
        </button>
        {/**Replace with unique ids and test ids */}
        <div
          id={idForLinkContainer}
          data-testid={testIds.menuLinks}
          className={styles['AnchorNav-link-container']}
          ref={linkContainerRef}
        >
          {Links}
        </div>
        {Action}
      </div>
      <span
        className={clsx(menuOpen && styles['AnchorNav-overlay--expanded'])}
        onClick={closeMenuCallback}
        aria-hidden
      />
    </nav>
  )
}

type AnchorNavLinkIntersectionOptions = {
  /**
   * The area of the element that should trigger the next linked section to be highlighted.
   */
  rootMargin: 'start' | 'middle'
}

type AnchorNavLinkProps = BaseProps<HTMLAnchorElement> & {
  /**
   * Optional text alignment for the link. Defaults to 'start' if there are less than 4 links, otherwise 'center'.
   */
  alignment?: 'start' | 'center'
  /**
   * Required path or location for the anchor to link to.
   */
  href: string
  /**
   * Optional boolean to indicate if the link is the current active link.
   * Typically doesn't need to be sset unless custom animation is being used.
   */
  isActive?: boolean // internal prop, not exposed in docs
  toggleMenuCallback?: () => void // internal prop, not exposed in docs
  intersectionOptions?: AnchorNavLinkIntersectionOptions // internal prop, not exposed in docs
  prefersReducedMotion?: boolean // internal prop, not exposed in docs
  updateCurrentActiveNav?: (id: string | null) => void // internal prop, not exposed in docs
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>

function _AnchorNavLink({
  alignment = 'start',
  children,
  href,
  isActive,
  toggleMenuCallback,
  prefersReducedMotion,
  intersectionOptions = {rootMargin: 'middle'},
  updateCurrentActiveNav,
  ...rest
}: AnchorNavLinkProps) {
  const [offsetPosition, setOffsetPosition] = useState<undefined | number>()
  const {isLarge} = useWindowSize()
  const [intersectionEntry, setIntersectionEntry] = useState<IntersectionObserverEntry>()

  const isAnchor = /^#/.test(href)
  const sansAnchor = isAnchor ? href.replace(/^#/, '') : href
  const anchoredContentIsVisible = !!intersectionEntry?.isIntersecting

  const handleIntersectionUpdate = ([nextEntry]: IntersectionObserverEntry[]): void => {
    setIntersectionEntry(nextEntry)
  }

  useEffect(() => {
    const node = document.querySelector(isAnchor ? href : `#${href}`)

    const supportsIntersectionObserver = !!window.IntersectionObserver

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!supportsIntersectionObserver || !node) return

    const rootMarginTop = '0px 0px -100%'
    const rootMarginCenter = '-50% 0% -50% 0%'

    const rootMargin = intersectionOptions.rootMargin === 'start' ? rootMarginTop : rootMarginCenter

    const observerParams = {threshold: 0, root: null, rootMargin}

    const observer = new IntersectionObserver(handleIntersectionUpdate, observerParams)

    observer.observe(node)

    return () => observer.disconnect()
  }, [href, intersectionOptions.rootMargin, isAnchor])

  useEffect(() => {
    const element = document.querySelector(isAnchor ? href : `#${href}`)
    if (!element) return

    const offset = 0
    const bodyRect = document.body.getBoundingClientRect().top
    const elementRect = element.getBoundingClientRect().top
    const elementPosition = elementRect - bodyRect
    const nextOffsetPosition = elementPosition + offset

    setOffsetPosition(nextOffsetPosition)
  }, [href, isAnchor])

  // updates root AnchorNav to notify of active section
  useEffect(() => {
    if (anchoredContentIsVisible && updateCurrentActiveNav && typeof children === 'string') {
      updateCurrentActiveNav(children)
    }
  }, [anchoredContentIsVisible, children, updateCurrentActiveNav])

  const handleClick = useCallback(
    event => {
      event.preventDefault()
      const behavior = prefersReducedMotion ? 'auto' : 'smooth'
      if (toggleMenuCallback && !isLarge) {
        toggleMenuCallback()
      }
      window.scrollTo({
        top: offsetPosition,
        behavior
      })
    },
    [isLarge, offsetPosition, toggleMenuCallback, prefersReducedMotion]
  )

  return (
    <a
      className={clsx(
        styles['AnchorNav-link'],
        styles[`AnchorNav-link--${alignment}`],
        anchoredContentIsVisible && styles['AnchorNav-link--is-active']
      )}
      href={isAnchor ? href : `#${href}`}
      aria-describedby={sansAnchor}
      aria-current={anchoredContentIsVisible && 'true'}
      data-first={isActive}
      data-active={anchoredContentIsVisible ? 'true' : 'false'}
      onClick={handleClick}
      {...rest}
    >
      <Text
        as="span"
        className={clsx(
          styles['AnchorNav-link-label'],
          anchoredContentIsVisible && styles['AnchorNav-link-label--is-active']
        )}
      >
        {children}
      </Text>
    </a>
  )
}

type AnchorNavActionProps = {
  /**
   * Required path or location for the action button to link to.
   */
  href: string
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>

function _AnchorNavAction({children, href, ...rest}: AnchorNavActionProps) {
  return (
    <Button
      as="a"
      variant="secondary"
      className={clsx(styles['AnchorNav-action'])}
      href={href}
      hasArrow={false}
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
export const AnchorNav = Object.assign(_AnchorNav, {
  Link: _AnchorNavLink,
  Action: _AnchorNavAction,
  testIds
})
