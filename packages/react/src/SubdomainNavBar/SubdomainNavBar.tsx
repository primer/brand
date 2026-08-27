import React, {
  useState,
  useCallback,
  useRef,
  PropsWithChildren,
  forwardRef,
  useMemo,
  useEffect,
  useImperativeHandle,
} from 'react'
import {clsx} from 'clsx'
import {ArrowUpRightIcon, LinkExternalIcon, MarkGithubIcon, SearchIcon} from '@primer/octicons-react'

import {Button, FormControl, Text, TextInput} from '..'
import {NavigationVisbilityObserver} from './NavigationVisbilityObserver'
import {useFocusTrap} from '../hooks/useFocusTrap'
import {useKeyboardEscape} from '../hooks/useKeyboardEscape'
import {useWindowSize} from '../hooks/useWindowSize'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/subdomain-nav-bar/colors-with-modes.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from './SubdomainNavBar.module.css'
import {useId} from '../hooks/useId'
import {SubdomainNavBarLinkContext, useSubdomainNavBarLinkContext} from './SubdomainNavBarLinkContext'
import {useSearchKeyboardShortcut} from './useSearchKeyboardShortcut'
import {useSearchResults, type NormalizedSearchResultGroup} from './useSearchResults'

export type SubdomainNavBarMenuLabels = {
  /**
   * Visible and accessible label for the closed narrow menu control.
   */
  menuLabel: string
  /**
   * Visible and accessible label for the open narrow menu control.
   */
  closeLabel: string
  /**
   * Visible and accessible label for the desktop overflow menu control.
   */
  overflowMenuLabel: string
}

const defaultMenuLabels: SubdomainNavBarMenuLabels = {
  menuLabel: 'Menu',
  closeLabel: 'Close',
  overflowMenuLabel: 'More',
}

const SubdomainNavBarActionSizeContext = React.createContext<'small' | 'medium'>('small')

export type SubdomainNavBarProps = Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'title'> & {
  /**
   * Valid child elements are `SubdomainNavBar.Link`, `SubdomainNavBar.PrimaryAction`,
   * `SubdomainNavBar.SecondaryAction` and `SubdomainNavBar.Search`
   */
  children?:
    | React.ReactNode
    | React.ReactElement<SubdomainNavBarLinkProps>
    | React.ReactElement<SubdomainNavBarSearchProps>
    | React.ReactElement<CTAActionProps>
  /**
   * Fixes the navigation bar to the top of the viewport. Defaults to `true`.
   */
  fixed?: boolean
  /**
   * Fill the maximum width of the parent container. Defaults to `false`.
   */
  fullWidth?: boolean
  /**
   * Optional React element rendered after the navigation links.
   */
  leadingComponent?: React.ReactElement
  /**
   * Optional React element rendered after the actions.
   */
  trailingComponent?: React.ReactElement
  /**
   * The title or name of the subdomain. Appears adjacent to the logo and is required for communicating content to assistive technologies.
   */
  title: string
  /**
   * The URL for the site. Typically used to link the titleText prop value to the site root.
   */
  titleHref?: string
  /**
   * Optionally change the URL of the logo
   */
  logoHref?: string
  /**
   * When the menu is opened or closed on narrow viewports, this callback is called with the new open state.
   */
  onNarrowMenuToggle?: (isOpen: boolean) => void
  /**
   * Customizable visible and accessible menu labels.
   */
  menuLabels?: Partial<SubdomainNavBarMenuLabels>
  /**
   * ID of the element that receives focus when the skip-to-content link is activated.
   * Defaults to the first rendered `main` element that is not hidden from assistive technologies.
   */
  skipToContentTargetId?: string
}

export type SubdomainNavBarHandle = HTMLElement & {
  openSearch: () => void
  closeSearch: () => void
}

const testIds = {
  root: 'SubdomainNavBar',
  get innerContainer() {
    return `${this.root}-inner-container`
  },
  get menuButton() {
    return `${this.root}-menuButton`
  },
  get menuLinks() {
    return `${this.root}-menuLinks`
  },
  get liveRegion() {
    return `${this.root}-search-live-region`
  },
}

function isUsableSkipToContentTarget(element: HTMLElement) {
  if (element.closest('[hidden], [inert], [aria-hidden="true"]')) return false

  for (
    let currentElement: HTMLElement | null = element;
    currentElement;
    currentElement = currentElement.parentElement
  ) {
    const computedStyles = window.getComputedStyle(currentElement)
    if (computedStyles.display === 'none' || computedStyles.visibility === 'hidden') return false
  }

  return true
}

function Root(
  {
    children,
    className,
    fixed = true,
    fullWidth = false,
    logoHref = 'https://github.com',
    style,
    title,
    titleHref = '/',
    leadingComponent,
    trailingComponent,
    onNarrowMenuToggle,
    menuLabels,
    skipToContentTargetId,
    ...rest
  }: SubdomainNavBarProps,
  forwardedRef: React.ForwardedRef<SubdomainNavBarHandle>,
) {
  const [menuHidden, setMenuHidden] = useState(true)
  const [searchVisible, setSearchVisible] = useState(false)
  const [menuViewportOffsetBlockStart, setMenuViewportOffsetBlockStart] = useState(0)
  const {isMedium, isLarge} = useWindowSize()
  const [startOfContentButtonFocused, setStartOfContentButtonFocused] = useState(false)
  const [resolvedSkipToContentTargetId, setResolvedSkipToContentTargetId] = useState<string>()
  const headerRef = useRef<HTMLElement | null>(null)
  const fallbackTargetRef = useRef<HTMLDivElement | null>(null)
  const fallbackTargetID = useId()
  const generatedMainTargetID = `${fallbackTargetID}-main`
  const narrowMenuID = useId()
  const resolvedMenuLabels = {...defaultMenuLabels, ...menuLabels}

  const updateMenuViewportOffsetBlockStart = useCallback(() => {
    setMenuViewportOffsetBlockStart(Math.max(0, headerRef.current?.getBoundingClientRect().top ?? 0))
  }, [])

  const closeNarrowMenu = useCallback(() => {
    if (menuHidden) return

    setMenuHidden(true)
    onNarrowMenuToggle?.(false)
  }, [menuHidden, onNarrowMenuToggle])

  const handleMobileMenuClick = () => {
    if (!menuHidden) {
      closeNarrowMenu()
      return
    }

    setSearchVisible(false)
    updateMenuViewportOffsetBlockStart()
    setMenuHidden(false)
    onNarrowMenuToggle?.(true)
  }
  const focusTrapRef = useRef<HTMLDivElement | null>(null)

  const resolveDefaultSkipToContentTarget = useCallback(() => {
    const mainElement = Array.from(document.querySelectorAll<HTMLElement>('main')).find(isUsableSkipToContentTarget)

    if (mainElement) {
      if (!mainElement.id) {
        mainElement.id = document.getElementById('start-of-content') ? generatedMainTargetID : 'start-of-content'
      }
      return mainElement
    }

    return fallbackTargetRef.current
  }, [generatedMainTargetID])

  const resolveSkipToContentTarget = useCallback(() => {
    if (skipToContentTargetId) {
      const explicitTarget = document.getElementById(skipToContentTargetId)
      if (explicitTarget && isUsableSkipToContentTarget(explicitTarget)) return explicitTarget
    }

    return resolveDefaultSkipToContentTarget()
  }, [resolveDefaultSkipToContentTarget, skipToContentTargetId])

  const handleSkipToContentFocus = useCallback(() => {
    setStartOfContentButtonFocused(true)

    const target = resolveSkipToContentTarget()
    if (target) setResolvedSkipToContentTargetId(target.id)
  }, [resolveSkipToContentTarget])

  const handleSkipToContentClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }

      const explicitTarget = skipToContentTargetId ? document.getElementById(skipToContentTargetId) : null
      const explicitTargetUnavailable =
        skipToContentTargetId && (!explicitTarget || !isUsableSkipToContentTarget(explicitTarget))
      const target = resolveSkipToContentTarget()

      if (explicitTargetUnavailable) {
        // eslint-disable-next-line no-console
        console.warn(
          `SubdomainNavBar could not find the skip-to-content target "${skipToContentTargetId}". Falling back to the page's main content.`,
        )
      }

      if (!target) return

      const targetHash = `#${encodeURIComponent(target.id)}`
      event.currentTarget.setAttribute('href', targetHash)
      setResolvedSkipToContentTargetId(target.id)

      const addedTabIndex = target.tabIndex < 0 && !target.hasAttribute('tabindex')
      if (addedTabIndex) {
        target.tabIndex = -1
      }

      const previousScrollMarginBlockStart = target.style.scrollMarginBlockStart
      if (fixed) {
        const navbarHeight = headerRef.current?.getBoundingClientRect().height ?? 0
        target.style.scrollMarginBlockStart = `${navbarHeight}px`
      }

      target.addEventListener(
        'blur',
        () => {
          if (addedTabIndex) target.removeAttribute('tabindex')
          target.style.scrollMarginBlockStart = previousScrollMarginBlockStart
        },
        {once: true},
      )

      target.focus({preventScroll: true})
    },
    [fixed, resolveSkipToContentTarget, skipToContentTargetId],
  )

  useEffect(() => {
    const target = resolveSkipToContentTarget()
    if (target) setResolvedSkipToContentTargetId(target.id)
  }, [resolveSkipToContentTarget])

  useFocusTrap({containerRef: focusTrapRef, restoreFocusOnCleanUp: true, disabled: menuHidden})
  useKeyboardEscape(closeNarrowMenu)

  useEffect(() => {
    if (isLarge) closeNarrowMenu()
  }, [closeNarrowMenu, isLarge])

  useEffect(() => {
    if (menuHidden || isLarge) return

    updateMenuViewportOffsetBlockStart()

    const resizeObserver = new ResizeObserver(updateMenuViewportOffsetBlockStart)
    const header = headerRef.current

    if (header) resizeObserver.observe(header)
    resizeObserver.observe(document.documentElement)

    return () => resizeObserver.disconnect()
  }, [isLarge, menuHidden, updateMenuViewportOffsetBlockStart])

  useEffect(() => {
    if (menuHidden) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [menuHidden])

  const setStartOfContentButtonFocusedFalse = useCallback(() => setStartOfContentButtonFocused(false), [])

  const hasLinks =
    useMemo(
      () =>
        React.Children.toArray(children).filter(
          child => React.isValidElement(child) && typeof child.type !== 'string' && child.type === Link,
        ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    ).length > 0

  const menuItems = useMemo(
    () =>
      React.Children.toArray(children)
        .map((child, index) => {
          if (React.isValidElement<SubdomainNavBarLinkMeasurementProps>(child) && child.type === Link) {
            const navItemLabel = typeof child.props.children === 'string' ? child.props.children : 'item'
            const navItemId = `${index}-${navItemLabel}`
            return React.cloneElement(child, {
              'data-navitemid': navItemId,
              href: child.props.href,
              children: child.props.children,
              style: {
                '--animation-order': index,
              } as React.CSSProperties,
            })
          }
          return null
        })
        .filter(Boolean),
    [children],
  )

  const actionItems = useMemo(
    () =>
      React.Children.toArray(children).filter(
        (child): child is React.ReactElement<CTAActionProps> =>
          React.isValidElement<CTAActionProps>(child) &&
          (child.type === PrimaryAction || child.type === SecondaryAction),
      ),
    [children],
  )

  const narrowActionItems = useMemo(
    () =>
      actionItems.map(child =>
        React.cloneElement(child, {
          onClick: event => {
            child.props.onClick?.(event)
            if (!event.defaultPrevented) closeNarrowMenu()
          },
        }),
      ),
    [actionItems, closeNarrowMenu],
  )

  const hasActions = actionItems.length > 0

  const searchItem = useMemo(
    () =>
      React.Children.toArray(children).find(
        (child): child is React.ReactElement<SubdomainNavBarSearchProps> =>
          React.isValidElement<SubdomainNavBarSearchProps>(child) && child.type === Search,
      ),
    [children],
  )
  const hasSearch = Boolean(searchItem)

  const handleSearchOpen = useCallback(() => {
    if (!hasSearch) return

    closeNarrowMenu()
    setSearchVisible(true)
  }, [closeNarrowMenu, hasSearch])

  const handleSearchClose = useCallback(() => setSearchVisible(false), [])

  useImperativeHandle(
    forwardedRef,
    () => {
      if (!headerRef.current) {
        return {
          openSearch: handleSearchOpen,
          closeSearch: handleSearchClose,
        } as SubdomainNavBarHandle
      }

      return Object.assign(headerRef.current, {
        openSearch: handleSearchOpen,
        closeSearch: handleSearchClose,
      })
    },
    [handleSearchClose, handleSearchOpen],
  )

  useSearchKeyboardShortcut({
    disabled: searchVisible,
    keyboardShortcut: searchItem?.props.keyboardShortcut,
    onTrigger: handleSearchOpen,
  })

  const hasLeadingComponent = leadingComponent != null
  const hasTrailingComponent = trailingComponent != null
  const hasNarrowMenuContent = hasLinks || hasActions || hasLeadingComponent || hasTrailingComponent
  const subdomainNavBarStyle = {
    ...style,
    '--SubdomainNavBar-menu-offset-block-start': `${menuViewportOffsetBlockStart}px`,
  } as React.CSSProperties

  return (
    <>
      <div
        className={clsx(
          styles['SubdomainNavBar-outer-container'],
          fixed && styles['SubdomainNavBar-outer-container--fixed'],
        )}
      >
        <Button
          as="a"
          href={`#${resolvedSkipToContentTargetId || skipToContentTargetId || fallbackTargetID}`}
          variant="primary"
          size="small"
          className={clsx(styles['SubdomainNavBar-skip-to-content'], !startOfContentButtonFocused && 'visually-hidden')}
          onFocus={handleSkipToContentFocus}
          onBlur={setStartOfContentButtonFocusedFalse}
          onClick={handleSkipToContentClick}
        >
          Skip to content
        </Button>
        <header
          ref={headerRef}
          className={clsx(styles['SubdomainNavBar'], className)}
          data-testid={testIds.root}
          style={subdomainNavBarStyle}
          {...rest}
        >
          <div
            ref={focusTrapRef}
            className={clsx(
              styles['SubdomainNavBar-inner-container'],
              searchVisible && styles['SubdomainNavBar-inner-container--search-open'],
              !fullWidth && styles['SubdomainNavBar-inner-container--centered'],
            )}
            data-testid={testIds.innerContainer}
          >
            <nav aria-label="Header logo and title">
              <ol className={styles['SubdomainNavBar-title-area']}>
                <li>
                  <a href={logoHref} aria-label="Github Home" className={styles['SubdomainNavBar-logo-mark']}>
                    <MarkGithubIcon fill="currentColor" size={24} />
                  </a>
                </li>
                {title && (
                  <>
                    <li>
                      <a
                        href={titleHref}
                        aria-label={`${title} home`}
                        className={clsx(styles['SubdomainNavBar-title'])}
                      >
                        <Text size="400" weight="medium">
                          <span className={styles['SubdomainNavBar-title-prefix']}>GitHub</span>{' '}
                          <span className={styles['SubdomainNavBar-title-label']}>{title}</span>
                        </Text>
                      </a>
                    </li>
                  </>
                )}
              </ol>
            </nav>
            {hasLinks && (
              <nav
                id="menu-navigation"
                aria-label={title}
                className={styles['SubdomainNavBar-primary-nav']}
                data-testid={testIds.menuLinks}
              >
                <NavigationVisbilityObserver
                  className={clsx(styles['SubdomainNavBar-primary-nav-list--invisible'])}
                  overflowMenuLabel={resolvedMenuLabels.overflowMenuLabel}
                >
                  {menuItems}
                </NavigationVisbilityObserver>
              </nav>
            )}
            {isLarge && hasLeadingComponent && (
              <div className={styles['SubdomainNavBar-leading-component']}>{leadingComponent}</div>
            )}

            <div className={clsx(styles['SubdomainNavBar-secondary-nav'])}>
              {React.Children.toArray(children)
                .map(child => {
                  if (React.isValidElement<SubdomainNavBarSearchProps>(child) && child.type === Search) {
                    return React.cloneElement(child, {
                      active: searchVisible,
                      className: clsx(
                        child.props.className,
                        isLarge &&
                          (hasActions || hasTrailingComponent) &&
                          styles['SubdomainNavBar-search-trigger--has-trailing-item'],
                      ),
                      onSearchOpen: handleSearchOpen,
                      onSearchClose: handleSearchClose,
                      title,
                    })
                  }
                  return null
                })
                .filter(Boolean)}

              {hasNarrowMenuContent && (
                <button
                  aria-expanded={!menuHidden}
                  aria-label={menuHidden ? resolvedMenuLabels.menuLabel : resolvedMenuLabels.closeLabel}
                  aria-controls={narrowMenuID}
                  className={clsx(
                    styles['SubdomainNavBar-menu-button'],
                    styles['SubdomainNavBar-mobile-menu-button'],
                    !menuHidden && styles['SubdomainNavBar-menu-button--close'],
                  )}
                  data-testid={testIds.menuButton}
                  onClick={handleMobileMenuClick}
                >
                  <span className={styles['SubdomainNavBar-menu-button-icon']} aria-hidden="true">
                    <span className={styles['SubdomainNavBar-menu-button-bar']}></span>
                    <span className={styles['SubdomainNavBar-menu-button-bar']}></span>
                    <span className={styles['SubdomainNavBar-menu-button-bar']}></span>
                  </span>
                  <span className={styles['SubdomainNavBar-menu-button-label']}>
                    {menuHidden ? resolvedMenuLabels.menuLabel : resolvedMenuLabels.closeLabel}
                  </span>
                </button>
              )}

              {isLarge && hasActions && (
                <div
                  className={clsx(
                    styles['SubdomainNavBar-button-area'],
                    styles['SubdomainNavBar-button-area--visible'],
                    hasTrailingComponent && styles['SubdomainNavBar-button-area--has-trailing-item'],
                  )}
                >
                  <div className={styles['SubdomainNavBar-button-area-inner']}>{actionItems}</div>
                </div>
              )}
              {isLarge && hasTrailingComponent && (
                <div className={styles['SubdomainNavBar-trailing-component']}>{trailingComponent}</div>
              )}

              {!isLarge && (
                <div
                  id={narrowMenuID}
                  className={clsx(
                    styles['SubdomainNavBar-menu-wrapper'],
                    menuHidden && styles['SubdomainNavBar-menu-wrapper--close'],
                  )}
                >
                  {!menuHidden && (
                    <div>
                      {hasLeadingComponent && (
                        <div className={styles['SubdomainNavBar-leading-component']}>{leadingComponent}</div>
                      )}
                      {hasLinks && (
                        <SubdomainNavBarLinkContext.Provider value={{onLinkClick: closeNarrowMenu}}>
                          {isMedium ? (
                            <ul className={styles['SubdomainNavBar-primary-nav-list--visible']}>{menuItems}</ul>
                          ) : (
                            <NavigationVisbilityObserver
                              className={clsx(styles['SubdomainNavBar-primary-nav-list--visible'])}
                              overflowMenuLabel={resolvedMenuLabels.overflowMenuLabel}
                            >
                              {menuItems}
                            </NavigationVisbilityObserver>
                          )}
                        </SubdomainNavBarLinkContext.Provider>
                      )}
                    </div>
                  )}
                  {!menuHidden && (hasActions || hasTrailingComponent) && (
                    <div
                      className={clsx(
                        styles['SubdomainNavBar-menu-wrapper-footer'],
                        (hasLinks || hasLeadingComponent) &&
                          styles['SubdomainNavBar-menu-wrapper-footer--has-leading-item'],
                      )}
                    >
                      {hasActions && (
                        <div
                          className={clsx(
                            styles['SubdomainNavBar-button-area'],
                            styles['SubdomainNavBar-button-area--visible'],
                          )}
                        >
                          <div className={styles['SubdomainNavBar-button-area-inner']}>
                            <SubdomainNavBarActionSizeContext.Provider value={isMedium ? 'small' : 'medium'}>
                              {narrowActionItems}
                            </SubdomainNavBarActionSizeContext.Provider>
                          </div>
                        </div>
                      )}
                      {hasTrailingComponent && (
                        <div className={styles['SubdomainNavBar-trailing-component']}>{trailingComponent}</div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          {!isLarge && !menuHidden && <div className={styles['SubdomainNavBar-menu-backdrop']} aria-hidden="true" />}
        </header>
      </div>
      <div ref={fallbackTargetRef} id={fallbackTargetID} tabIndex={-1} />
    </>
  )
}

export type SubdomainNavBarLinkProps = {
  href: string
  isExternal?: boolean
} & React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>

type SubdomainNavBarLinkMeasurementProps = SubdomainNavBarLinkProps & {
  'data-navitemid'?: string
}

function Link({
  href,
  className,
  children,
  isExternal,
  'aria-current': ariaCurrent,
  'aria-hidden': ariaHidden,
  tabIndex,
  ...rest
}: PropsWithChildren<SubdomainNavBarLinkProps>) {
  const {isOverflowed, onLinkClick} = useSubdomainNavBarLinkContext()

  return (
    <li
      {...rest}
      // Keep overflowed links measurable in layout; removing them would make overflow calculation state-dependent.
      aria-hidden={isOverflowed ? true : ariaHidden}
      className={clsx(styles['SubdomainNavBar-primary-nav-list-item'], className)}
      tabIndex={isOverflowed ? -1 : tabIndex}
    >
      <a
        href={href}
        aria-current={ariaCurrent}
        className={styles['SubdomainNavBar-link']}
        onClick={onLinkClick}
        tabIndex={isOverflowed ? -1 : undefined}
      >
        <span className={styles['SubdomainNavBar-link-content']}>
          <span className={styles['SubdomainNavBar-link-text']}>{children}</span>
          {isExternal && <LinkExternalIcon size={16} aria-label="External link" />}
        </span>
      </a>
    </li>
  )
}

export type SubdomainNavBarSearchResultProps = {
  title: string
  description: string
  url: string
  date: string
  category?: string
  group?: string
  isExternal?: boolean
}

export type SubdomainNavBarSearchResultGroupProps = {
  title: string
  results: SubdomainNavBarSearchResultProps[]
}

export type SubdomainNavBarSearchResults = SubdomainNavBarSearchResultProps[] | SubdomainNavBarSearchResultGroupProps[]

export type SubdomainNavBarSearchLabels = {
  /**
   * Accessible label for the search input. Defaults to "Search".
   */
  searchLabel: string
  /**
   * Visible and accessible label for the close action. Defaults to "Close".
   */
  closeLabel: string
  /**
   * Accessible label for an untitled search result group. Defaults to "Results".
   */
  resultsLabel: string
  /**
   * Accessible label for grouped search results without a search term. Defaults to "Search results".
   */
  searchResultsLabel: string
  /**
   * Formats the default search placeholder and dialog label using the navigation title.
   */
  formatSearchWithTitle: (title: string) => string
  /**
   * Formats the accessible label for the responsive search trigger.
   */
  formatSearchTrigger: (placeholder: string) => string
  /**
   * Formats the visible heading for ungrouped search results.
   */
  formatResultsHeading: (searchTerm: string) => string
  /**
   * Formats the accessible label for grouped search results.
   */
  formatResultsLabel: (searchTerm: string) => string
  /**
   * Formats the search result count announcement.
   */
  formatSuggestions: (count: number) => string
}

const defaultSearchLabels: SubdomainNavBarSearchLabels = {
  searchLabel: 'Search',
  closeLabel: 'Close',
  resultsLabel: 'Results',
  searchResultsLabel: 'Search results',
  formatSearchWithTitle: title => `Search ${title}`,
  formatSearchTrigger: placeholder => `${placeholder} search`,
  formatResultsHeading: searchTerm => `Results for “${searchTerm}”`,
  formatResultsLabel: searchTerm => `Results for ${searchTerm}`,
  formatSuggestions: count => `${count} suggestions.`,
}

export type SubdomainNavBarSearchProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  active?: boolean
  className?: string
  title?: string
  onSearchOpen?: () => void
  onSearchClose?: () => void
  /**
   * Placeholder text shown in the search trigger and the opened search input.
   */
  placeholder?: string
  /**
   * Optional keyboard shortcut hint shown in the search trigger. Pass an empty string to hide it.
   */
  shortcutLabel?: string
  /**
   * Optional global keyboard shortcut that opens the search dialog. Omit or pass `false` to disable it.
   * Supports single keys and modifier combinations, such as `/` or `Command+Option+k`.
   */
  keyboardShortcut?: string | false
  searchResults?: SubdomainNavBarSearchResults
  searchTerm?: string
  /**
   * Customizable visible and accessible search text. Unspecified labels use the English defaults.
   */
  labels?: Partial<SubdomainNavBarSearchLabels>
}

const _SearchInternal = forwardRef<HTMLInputElement, SubdomainNavBarSearchProps>(
  (
    {
      active,
      className,
      title,
      searchResults,
      searchTerm,
      onSearchOpen,
      onSearchClose,
      onSubmit,
      onChange,
      placeholder,
      shortcutLabel,
      keyboardShortcut,
      labels,
    },
    forwardedRef,
  ) => {
    const dialogRef = useRef<HTMLDialogElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const resolvedLabels = {...defaultSearchLabels, ...labels}
    const resolvedPlaceholder =
      placeholder ?? (title ? resolvedLabels.formatSearchWithTitle(title) : resolvedLabels.searchLabel)
    const dialogLabel = title ? resolvedLabels.formatSearchWithTitle(title) : resolvedLabels.searchLabel
    const resolvedShortcutLabel = shortcutLabel ?? (keyboardShortcut || '')
    const {
      activeDescendant,
      handleSearchResultKeyDown,
      hasGroupedSearchResults,
      hasSearchResults,
      liveRegion,
      normalizedSearchResultGroups,
      resetActiveDescendant,
      searchResultsLength,
    } = useSearchResults({active, dialogRef, searchResults, searchTerm})

    const handleClose = useCallback(() => {
      onSearchClose?.()
      resetActiveDescendant()
    }, [onSearchClose, resetActiveDescendant])

    const setInputRef = useCallback(
      (input: HTMLInputElement | null) => {
        inputRef.current = input

        if (typeof forwardedRef === 'function') {
          forwardedRef(input)
          return
        }

        if (forwardedRef) {
          forwardedRef.current = input
        }
      },
      [forwardedRef],
    )

    useEffect(() => {
      const dialog = dialogRef.current

      if (!dialog) return

      if (active) {
        if (!dialog.open) {
          if (typeof dialog.showModal === 'function') {
            dialog.showModal()
          } else {
            dialog.setAttribute('open', '')
          }
        }

        inputRef.current?.focus()

        return
      }

      if (dialog.open) {
        if (typeof dialog.close === 'function') {
          dialog.close()
        } else {
          dialog.removeAttribute('open')
        }
      }
    }, [active, inputRef])

    useEffect(() => {
      const dialog = dialogRef.current
      if (!dialog) return

      const handleDialogClick = (event: MouseEvent) => {
        if (event.target !== dialog) return

        const dialogRect = dialog.getBoundingClientRect()
        const clickIsInsideDialog =
          event.clientX >= dialogRect.left &&
          event.clientX <= dialogRect.right &&
          event.clientY >= dialogRect.top &&
          event.clientY <= dialogRect.bottom

        if (clickIsInsideDialog) return

        handleClose()
      }

      dialog.addEventListener('click', handleDialogClick)
      return () => dialog.removeEventListener('click', handleDialogClick)
    }, [handleClose])

    const handleDialogCancel = useCallback(
      (event: React.SyntheticEvent<HTMLDialogElement>) => {
        event.preventDefault()
        handleClose()
      },
      [handleClose],
    )

    const renderSearchResult = ({result, index}: NormalizedSearchResultGroup['results'][number]) => (
      <li key={`${result.title}-${index}`} className={styles['SubdomainNavBar-search-result-item']} role="presentation">
        <div className={styles['SubdomainNavBar-search-result-item-container']}>
          <a
            id={`subdomainnavbar-search-result-${index}`}
            href={result.url}
            role="option"
            aria-selected={index === activeDescendant}
          >
            <span>{result.title}</span>
            {hasGroupedSearchResults && result.isExternal && <ArrowUpRightIcon size={20} aria-hidden="true" />}
          </a>
        </div>

        <Text
          as="p"
          size="200"
          id={`subdomainnavbar-search-result-item-desc${index}`}
          className={styles['SubdomainNavBar-search-result-item-desc']}
        >
          {result.description}
        </Text>
        <div className={styles['SubdomainNavBar-search-result-item-meta']}>
          <Text size="100" className={styles['SubdomainNavBar-search-result-item-desc']}>
            {result.date}
          </Text>
          {result.category && (
            <>
              <Text size="100" className={styles['SubdomainNavBar-search-result-item-desc']}>
                {' '}
                •{' '}
              </Text>
              <Text size="100" className={styles['SubdomainNavBar-search-result-item-desc']}>
                {result.category}
              </Text>
            </>
          )}
        </div>
      </li>
    )

    return (
      <>
        <div className={clsx(styles['SubdomainNavBar-search-trigger'], className)}>
          <button
            aria-label={resolvedLabels.formatSearchTrigger(resolvedPlaceholder)}
            className={styles['SubdomainNavBar-search-input-button']}
            onClick={onSearchOpen}
            data-testid="toggle-search"
            type="button"
          >
            <span className={styles['SubdomainNavBar-search-input-button-placeholder']}>
              <SearchIcon aria-hidden="true" size={16} />
              <span>{resolvedPlaceholder}</span>
            </span>
            {resolvedShortcutLabel && (
              <span className={styles['SubdomainNavBar-search-input-button-shortcut']}>{resolvedShortcutLabel}</span>
            )}
          </button>
        </div>
        <dialog
          ref={dialogRef}
          aria-label={dialogLabel}
          className={clsx(
            styles['SubdomainNavBar-search-dialog'],
            hasSearchResults && styles['SubdomainNavBar-search-dialog--has-results'],
          )}
          onCancel={handleDialogCancel}
        >
          {active && (
            <>
              <div className={clsx(styles['SubdomainNavBar-search-dialog-control-area'])}>
                <div className={styles['SubdomainNavBar-search-input-area']}>
                  <form className={clsx(styles['SubdomainNavBar-search-form'])} onSubmit={onSubmit} role="search">
                    <FormControl fullWidth size="medium">
                      <FormControl.Label visuallyHidden>{resolvedLabels.searchLabel}</FormControl.Label>
                      <TextInput
                        ref={setInputRef}
                        className={clsx(styles['SubdomainNavBar-search-text-input'])}
                        name="search"
                        role="combobox"
                        // Suppress the browser's native autocomplete/autofill dropdown. When it is
                        // open, the browser consumes the first Escape to dismiss it, which would
                        // otherwise require an extra keypress before the native dialog can close.
                        autoComplete="off"
                        aria-autocomplete="list"
                        aria-expanded={hasSearchResults}
                        aria-controls="listbox-search-results"
                        placeholder={resolvedPlaceholder}
                        onChange={onChange}
                        defaultValue={searchTerm}
                        invisible
                        leadingVisual={<SearchIcon size={16} />}
                        aria-activedescendant={
                          activeDescendant === -1 ? undefined : `subdomainnavbar-search-result-${activeDescendant}`
                        }
                        onKeyDown={handleSearchResultKeyDown}
                      />
                    </FormControl>
                  </form>
                  <button
                    aria-label={resolvedLabels.closeLabel}
                    className={styles['SubdomainNavBar-search-close-button']}
                    onClick={handleClose}
                    type="button"
                  >
                    {resolvedLabels.closeLabel}
                  </button>
                </div>
              </div>

              <div
                id="listbox-search-results"
                className={clsx(
                  styles['SubdomainNavBar-search-results-area'],
                  hasSearchResults && styles['SubdomainNavBar-search-results-area--visible'],
                )}
              >
                {hasSearchResults && (
                  <div className={clsx(styles['SubdomainNavBar-search-results-container'])}>
                    {!hasGroupedSearchResults && (
                      <Text
                        id="subdomainnavbar-search-results-heading"
                        className={styles['SubdomainNavBar-search-results-heading']}
                      >
                        {resolvedLabels.formatResultsHeading(searchTerm ?? '')}
                      </Text>
                    )}
                    <ul
                      role="listbox"
                      tabIndex={0}
                      aria-labelledby={!hasGroupedSearchResults ? 'subdomainnavbar-search-results-heading' : undefined}
                      aria-label={
                        hasGroupedSearchResults
                          ? searchTerm
                            ? resolvedLabels.formatResultsLabel(searchTerm)
                            : resolvedLabels.searchResultsLabel
                          : undefined
                      }
                      className={clsx(styles['SubdomainNavBar-search-results'])}
                    >
                      {hasGroupedSearchResults
                        ? normalizedSearchResultGroups.map((group, groupIndex) => {
                            const groupHeadingId = `subdomainnavbar-search-result-group-${groupIndex}`

                            return (
                              <li
                                key={group.title ?? `ungrouped-${groupIndex}`}
                                className={styles['SubdomainNavBar-search-result-group']}
                                role="presentation"
                              >
                                {group.title && (
                                  <Text
                                    id={groupHeadingId}
                                    className={styles['SubdomainNavBar-search-result-group-heading']}
                                  >
                                    {group.title}
                                  </Text>
                                )}
                                <ul
                                  className={styles['SubdomainNavBar-search-result-group-list']}
                                  role="group"
                                  aria-labelledby={group.title ? groupHeadingId : undefined}
                                  aria-label={group.title ? undefined : resolvedLabels.resultsLabel}
                                >
                                  {group.results.map(renderSearchResult)}
                                </ul>
                              </li>
                            )
                          })
                        : normalizedSearchResultGroups.flatMap(group => group.results.map(renderSearchResult))}
                    </ul>
                  </div>
                )}
                <div aria-live="polite" aria-atomic="true" data-testid={testIds.liveRegion} className="visually-hidden">
                  {resolvedLabels.formatSuggestions(searchResultsLength)}
                  {liveRegion && <span>&nbsp;</span>}
                </div>
              </div>
            </>
          )}
        </dialog>
      </>
    )
  },
)

const Search = _SearchInternal

const RootWithRef = forwardRef<SubdomainNavBarHandle, SubdomainNavBarProps>(Root)
RootWithRef.displayName = 'SubdomainNavBar'

type CTAActionProps = {
  href: string
} & React.HTMLAttributes<HTMLAnchorElement>

function PrimaryAction({children, href, ...rest}: PropsWithChildren<CTAActionProps>) {
  const size = React.useContext(SubdomainNavBarActionSizeContext)

  return (
    <Button
      as="a"
      href={href}
      className={clsx(styles['SubdomainNavBar-cta-button'])}
      variant="primary"
      size={size}
      {...rest}
    >
      {children}
    </Button>
  )
}

function SecondaryAction({children, href, ...rest}: PropsWithChildren<CTAActionProps>) {
  const size = React.useContext(SubdomainNavBarActionSizeContext)

  return (
    <Button
      as="a"
      href={href}
      className={clsx(styles['SubdomainNavBar-cta-button'], styles['SubdomainNavBar-cta-button--secondary'])}
      size={size}
      {...rest}
    >
      {children}
    </Button>
  )
}

export const SubdomainNavBar = Object.assign(RootWithRef, {
  Link,
  Search,
  PrimaryAction,
  SecondaryAction,
  testIds,
})
