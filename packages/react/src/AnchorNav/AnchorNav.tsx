import clsx from 'clsx'
import React, {useCallback, useEffect, useRef, useState} from 'react'
import {ChevronDownIcon, ChevronUpIcon} from '@primer/octicons-react'

import {Button, Text} from '../'
import {useWindowSize} from '../hooks/useWindowSize'
import {useKeyboardEscape} from '../hooks/useKeyboardEscape'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/anchor-nav/colors-with-modes.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from './AnchorNav.module.css'

export type AnchorNavProps = {
  children: React.ReactNode[]
} & React.ComponentPropsWithoutRef<'nav'>

function _AnchorNav({children, ...props}: AnchorNavProps) {
  const rootRef = useRef<HTMLElement | null>(null)
  const [entry, setEntry] = useState<IntersectionObserverEntry>()
  const [menuOpen, setMenuOpen] = useState(false)

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry)
  }

  useEffect(() => {
    const node = rootRef?.current // DOM Ref
    const hasIOSupport = !!window.IntersectionObserver

    if (!hasIOSupport || !node) return

    const observerParams = {threshold: 0, root: null, rootMargin: '0px 0px -100%'}
    const observer = new IntersectionObserver(updateEntry, observerParams)

    observer.observe(node)

    return () => observer.disconnect()
  }, [rootRef?.current])

  const isVisible = !!entry?.isIntersecting

  const closeMenuCallback = useCallback(() => setMenuOpen(false), [menuOpen])
  const toggleMenuCallback = useCallback(() => setMenuOpen(!menuOpen), [menuOpen])

  const handleMenuToggle = useCallback(
    event => {
      event?.preventDefault()
      toggleMenuCallback()
    },
    [menuOpen]
  )

  const Links = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child) && child.type === _AnchorNavLink) {
      const defaultProps = {toggleMenuCallback}
      if (index === 0) return React.cloneElement(child, {isActive: true, ...defaultProps})
      return React.cloneElement(child, {
        ...defaultProps
      })
    }
    return null
  })
    ?.filter(Boolean)
    ?.slice(0, 5)

  const Action = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child) && child.type === _AnchorNavAction) {
      if (index === 0) return React.cloneElement(child, {isActive: true})
      return child
    }
    return null
  })
    ?.filter(Boolean)
    ?.slice(0, 5)

  useKeyboardEscape(closeMenuCallback)

  return (
    <nav
      ref={rootRef}
      className={clsx(
        styles.AnchorNav,
        isVisible && styles['AnchorNav--stuck'],
        menuOpen && styles['AnchorNav--expanded']
      )}
    >
      <div
        className={clsx(styles['AnchorNav-inner-container'], menuOpen && styles['AnchorNav-inner-container--expanded'])}
      >
        <button onClick={handleMenuToggle} className={clsx(styles['AnchorNav-menu-button'])}>
          {menuOpen ? (
            <ChevronUpIcon size={16} className={styles['AnchorNav-menu-button-arrow']} fill="currentcolor" />
          ) : (
            <ChevronDownIcon size={16} className={styles['AnchorNav-menu-button-arrow']} fill="currentcolor" />
          )}
        </button>
        <div className={styles['AnchorNav-link-container']}>{Links}</div>
        {Action}
      </div>
      <span className={clsx(menuOpen && styles['AnchorNav-overlay--expanded'])} onClick={closeMenuCallback} />
    </nav>
  )
}

type AnchorNavLinkIntersectionOptions = {
  /**
   * The area of the precedeing element that should trigger the next linked section to be highlighted.
   */
  rootMargin: 'start' | 'middle'
}

type AnchorNavLinkProps = {
  href: string
  isActive?: boolean
  toggleMenuCallback?: () => void
  instersectionOptions?: AnchorNavLinkIntersectionOptions
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>

function _AnchorNavLink({
  children,
  href,
  isActive,
  toggleMenuCallback,
  instersectionOptions = {rootMargin: 'middle'},
  ...rest
}: AnchorNavLinkProps) {
  const [offsetPosition, setOffsetPosition] = useState<undefined | number>()
  const {isLarge} = useWindowSize()
  const [entry, setEntry] = useState<IntersectionObserverEntry>()

  const isAnchor = /^#/.test(href)
  const sansAnchor = isAnchor ? href.replace(/^#/, '') : href
  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry)
  }

  useEffect(() => {
    const node = document.querySelector(isAnchor ? href : `#${href}`)

    const hasIOSupport = !!window.IntersectionObserver

    if (!hasIOSupport || !node) return

    const rootMarginTop = '0px 0px -100%'
    const rootMarginCenter = '-50% 0% -50% 0%'

    const rootMargin = instersectionOptions.rootMargin === 'start' ? rootMarginTop : rootMarginCenter

    const observerParams = {threshold: 0, root: null, rootMargin}

    const observer = new IntersectionObserver(updateEntry, observerParams)

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  const anchoredContentIsVisible = !!entry?.isIntersecting

  useEffect(() => {
    const element = document.querySelector(isAnchor ? href : `#${href}`)
    if (!element) return

    const offset = 0
    const bodyRect = document.body.getBoundingClientRect().top
    const elementRect = element.getBoundingClientRect().top
    const elementPosition = elementRect - bodyRect
    const offsetPosition = elementPosition + offset

    setOffsetPosition(offsetPosition)
  }, [])

  return (
    <a
      className={clsx(styles['AnchorNav-link'])}
      href={isAnchor ? href : `#${href}`}
      aria-describedby={sansAnchor}
      aria-current={anchoredContentIsVisible && 'true'}
      data-first={isActive}
      data-active={anchoredContentIsVisible ? 'true' : 'false'}
      onClick={event => {
        event?.preventDefault()
        if (toggleMenuCallback && !isLarge) {
          toggleMenuCallback()
        }
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }}
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
      {...rest}
    >
      {children}
    </Button>
  )
}

export const AnchorNav = Object.assign(_AnchorNav, {
  Link: _AnchorNavLink,
  Action: _AnchorNavAction
})
