import {clsx} from 'clsx'
import React, {ReactElement, useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {ChevronDownIcon, ChevronUpIcon} from '@primer/octicons-react'
import {useId} from '../hooks/useId'

import {Button, ButtonBaseProps, Text} from '../'
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
  },
  get secondaryAction() {
    return `${this.root}-secondary-action`
  },
  get navSpacer() {
    return `${this.root}-nav-spacer`
  },
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
  /**
   * When true, the anchor nav will hide until it is sticky.
   */
  hideUntilSticky?: boolean
} & React.ComponentPropsWithoutRef<'nav'>

function AnchorNavBase({children, enableDefaultBgColor = false, hideUntilSticky = false, ...rest}: AnchorNavProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [currentActiveNavItem, setCurrentActiveNavItem] = useState<string | null>()
  const [intersectionEntry, setIntersectionEntry] = useState<IntersectionObserverEntry>()
  const [initialYOffset, setInitialYOffset] = useState<undefined | number>()
  const [navShouldFix, setNavShouldFix] = useState<boolean>(false)
  const [navHeight, setNavHeight] = useState<number>(0)

  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const rootRef = useRef<HTMLElement | null>(null)
  const linkContainerRef = useRef<HTMLDivElement | null>(null)
  const innerContainerRef = useRef<HTMLDivElement | null>(null)

  const {isLarge} = useWindowSize()
  const idForLinkContainer = useId()

  const closeMenuCallback = useCallback(() => setMenuOpen(false), [setMenuOpen])
  const toggleMenuCallback = useCallback(() => setMenuOpen(!menuOpen), [menuOpen])

  const ValidChildren = useMemo(
    () =>
      React.Children.toArray(children).filter(
        (child: React.ReactNode): boolean => React.isValidElement(child) && typeof child.type !== 'string',
      ),
    [children],
  )

  useEffect(() => {
    if (initialYOffset === undefined && intersectionEntry) {
      setInitialYOffset(intersectionEntry.boundingClientRect.y + window.scrollY)
    }
  }, [initialYOffset, intersectionEntry])

  const handleIntersectionUpdate = ([nextEntry]: IntersectionObserverEntry[]): void => {
    setIntersectionEntry(nextEntry)
  }

  useKeyboardEscape(closeMenuCallback)
  useExpandedMenu(menuOpen, linkContainerRef, innerContainerRef, !isLarge, closeMenuCallback)

  useEffect(() => {
    if (wrapperRef.current) {
      const height = wrapperRef.current.offsetHeight
      setNavHeight(height)
    }
  }, [isLarge])

  useEffect(() => {
    const queryResult = window.matchMedia('(prefers-reduced-motion: reduce)')

    setPrefersReducedMotion(queryResult.matches)
  }, [])

  useEffect(() => {
    const handler = () => {
      if (initialYOffset) {
        const isPastInitialYOffset = window.pageYOffset > initialYOffset
        setNavShouldFix(isPastInitialYOffset)
      }
    }
    // eslint-disable-next-line github/prefer-observers
    window.addEventListener('scroll', handler)
    return () => {
      window.removeEventListener('scroll', handler)
    }
  }, [initialYOffset])

  useEffect(() => {
    const node = hideUntilSticky ? wrapperRef.current : rootRef.current

    const supportsIntersectionObserver = !!window.IntersectionObserver

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!supportsIntersectionObserver || !node) return

    const topOfWindow = '0px 0px -100%'
    const observerParams = {threshold: 0, root: null, rootMargin: topOfWindow}
    const observer = new IntersectionObserver(handleIntersectionUpdate, observerParams)

    observer.observe(node)

    return () => observer.disconnect()
  }, [hideUntilSticky])

  const handleMenuToggle = useCallback(
    event => {
      event?.preventDefault()
      toggleMenuCallback()
    },
    [toggleMenuCallback],
  )

  const handleUpdateToCurrentActiveNavItem = useCallback(
    (id: string | null) => {
      setCurrentActiveNavItem(id)
    },
    [setCurrentActiveNavItem],
  )

  const numLinks = ValidChildren.filter(child => React.isValidElement(child) && child.type === NavLinkBase).length
  const Links = ValidChildren.map((child, index) => {
    if (React.isValidElement<AnchorNavLinkProps>(child) && child.type === NavLinkBase) {
      const defaultProps: AnchorNavLinkProps = {
        href: child.props.href,
        toggleMenuCallback,
        prefersReducedMotion,
        updateCurrentActiveNav: handleUpdateToCurrentActiveNavItem,
        alignment: numLinks < 4 ? 'start' : 'center',
      }
      return React.cloneElement(child, {
        isActive: index === 0,
        ...defaultProps,
      })
    }

    return null
  })
    .filter(Boolean)
    .slice(0, 5)

  const Action = ValidChildren.reduce<React.ReactElement<AnchorNavActionProps>[]>((acc, child) => {
    if (React.isValidElement<AnchorNavActionProps>(child) && child.type === ActionBase) {
      acc.push(React.cloneElement(child))
    }
    return acc
  }, [])

  const SecondaryAction = ValidChildren.reduce<React.ReactElement<AnchorNavActionProps>[]>((acc, child) => {
    if (React.isValidElement<AnchorNavActionProps>(child) && child.type === SecondaryActionBase) {
      acc.push(React.cloneElement(child))
    }
    return acc
  }, [])

  const hasLargerSizeActions =
    Action.some(action => action.props.size && action.props.size !== 'small') ||
    SecondaryAction.some(action => action.props.size && action.props.size !== 'small')

  /* On page load, the rootMargin positions and/or thresholds of the IntersectionObserver
   * may not be met depending on the position of the AnchorNav on the page.
   * The following useEffect ensures that the first link always marked as the active link, until
   * the observer kicks in. Without this, the active link is undefined.
   */
  useEffect(() => {
    if (!currentActiveNavItem && Links.length > 0) {
      setCurrentActiveNavItem(Links[0]?.props.children as string)
    }
  }, [currentActiveNavItem, Links])

  const hasTwoActions = Action.length > 0 && SecondaryAction.length > 0

  return (
    <div ref={wrapperRef}>
      <nav
        ref={rootRef}
        aria-label="Anchored navigation"
        data-sticky={navShouldFix.toString()}
        className={clsx(
          styles.AnchorNav,
          hideUntilSticky && styles['AnchorNav--hide-until-sticky'],
          navShouldFix && styles['AnchorNav--stuck'],
          menuOpen && styles['AnchorNav--expanded'],
          enableDefaultBgColor && styles['AnchorNav--with-default-background-color'],
        )}
        {...rest}
      >
        <div
          ref={innerContainerRef}
          className={clsx(
            styles['AnchorNav-inner-container'],
            menuOpen && styles['AnchorNav-inner-container--expanded'],
          )}
        >
          <button
            onClick={handleMenuToggle}
            className={clsx(styles['AnchorNav-menu-button'])}
            aria-expanded={menuOpen}
            aria-controls={idForLinkContainer}
            data-testid={testIds.menuButton}
          >
            {menuOpen ? (
              <ChevronUpIcon size={16} className={styles['AnchorNav-menu-button-arrow']} fill="currentcolor" />
            ) : (
              <ChevronDownIcon size={16} className={styles['AnchorNav-menu-button-arrow']} fill="currentcolor" />
            )}
            <span className="visually-hidden">Anchor navigation menu. Currently selected: </span>
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
          <span
            data-forward-focus="true"
            className={clsx(
              styles['AnchorNav__actionsContainer'],
              hasLargerSizeActions && styles['AnchorNav__actionsContainer--no-offset'],
              hasTwoActions && styles['AnchorNav__actionsContainer--multiple'],
            )}
          >
            {Action.length && SecondaryAction.length && React.isValidElement<AnchorNavActionProps>(Action[0])
              ? React.cloneElement(Action[0], {
                  variant: 'primary',
                })
              : Action}
            {SecondaryAction}
          </span>
        </div>
        <span
          className={clsx(menuOpen && styles['AnchorNav-overlay--expanded'])}
          onClick={closeMenuCallback}
          aria-hidden
        />
      </nav>
      {navShouldFix && <div style={{height: navHeight}} aria-hidden="true" data-testid={testIds.navSpacer} />}
    </div>
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

function NavLinkBase({
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
  const {isLarge} = useWindowSize()
  const [intersectionEntry, setIntersectionEntry] = useState<IntersectionObserverEntry>()

  const isAnchor = /^#/.test(href)
  const anchoredContentIsVisible = !!intersectionEntry?.isIntersecting

  const handleIntersectionUpdate = ([nextEntry]: IntersectionObserverEntry[]): void => {
    setIntersectionEntry(nextEntry)
  }

  useEffect(() => {
    const node = document.querySelector(isAnchor ? href : `#${href}`)

    const supportsIntersectionObserver = !!window.IntersectionObserver

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!supportsIntersectionObserver || !node) return

    const rootMarginTop = '0px'
    const rootMarginCenter = '-50% 0% -50% 0%'

    const rootMargin = intersectionOptions.rootMargin === 'start' ? rootMarginTop : rootMarginCenter

    const observerParams = {threshold: intersectionOptions.rootMargin === 'start' ? 0.4 : 0, root: null, rootMargin}

    const observer = new IntersectionObserver(handleIntersectionUpdate, observerParams)

    observer.observe(node)

    return () => observer.disconnect()
  }, [href, intersectionOptions.rootMargin, isAnchor])

  // updates root AnchorNav to notify of active section
  useEffect(() => {
    if (anchoredContentIsVisible && updateCurrentActiveNav && typeof children === 'string') {
      updateCurrentActiveNav(children)
    }
  }, [anchoredContentIsVisible, children, updateCurrentActiveNav])

  const handleClick = useCallback(() => {
    if (toggleMenuCallback && !isLarge) {
      toggleMenuCallback()
    }
  }, [isLarge, toggleMenuCallback])

  return (
    <a
      className={clsx(
        styles['AnchorNav-link'],
        styles[`AnchorNav-link--${alignment}`],
        anchoredContentIsVisible && styles['AnchorNav-link--is-active'],
      )}
      href={isAnchor ? href : `#${href}`}
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
          anchoredContentIsVisible && styles['AnchorNav-link-label--is-active'],
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
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> &
  ButtonBaseProps

function ActionBase({children, href, variant = 'secondary', size = 'small', ...rest}: AnchorNavActionProps) {
  return (
    <Button
      as="a"
      variant={variant}
      className={clsx(styles['AnchorNav-action'])}
      href={href}
      hasArrow={false}
      data-testid={testIds.action}
      size={size}
      {...rest}
    >
      {children}
    </Button>
  )
}

function SecondaryActionBase({children, href, variant = 'secondary', size = 'small', ...rest}: AnchorNavActionProps) {
  return (
    <Button
      as="a"
      variant={variant}
      className={clsx(styles['AnchorNav-action'])}
      href={href}
      hasArrow={false}
      data-testid={testIds.secondaryAction}
      size={size}
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
  SecondaryAction: SecondaryActionBase,
  testIds,
})
