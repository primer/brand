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
import {ArrowUpRightIcon, ChevronLeftIcon, LinkExternalIcon, MarkGithubIcon, SearchIcon} from '@primer/octicons-react'

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
import {useSubdomainNavBarLinkContext} from './SubdomainNavBarLinkContext'

export const SubdomainNavBarVariants = ['default', 'gridline'] as const
export type SubdomainNavBarVariant = (typeof SubdomainNavBarVariants)[number]
export const SubdomainNavBarSearchVariants = ['icon', 'input'] as const
export type SubdomainNavBarSearchVariant = (typeof SubdomainNavBarSearchVariants)[number]

export type SubdomainNavBarProps = {
  /**
   * Valid child elements are `SubdomainNavBar.Link`, `SubdomainNavBar.PrimaryAction`,
   * `SubdomainNavBar.SecondaryAction` and `SubdomainNavBar.Search`
   */
  children?:
    | React.ReactNode
    | React.ReactElement<SubdomainNavBarLinkProps>
    | React.ReactElement<SearchProps>
    | React.ReactElement<CTAActionProps>
  /**
   * Forward a custom HTML class attribute
   */
  className?: string
  /**
   * Fixes the navigation bar to the top of the viewport. Defaults to `true`.
   */
  fixed?: boolean
  /**
   * Fill the maximum width of the parent container. Defaults to `false`.
   */
  fullWidth?: boolean
  /**
   * Apply a visual variant. The default is `default`.
   * `gridline` adds horizontal and vertical separator lines.
   */
  variant?: SubdomainNavBarVariant
  /**
   * Optional content rendered after the title and before navigation links.
   */
  leadingComponent?: React.ReactNode
  /**
   * Optional content rendered after the actions.
   */
  trailingComponent?: React.ReactNode
  /**
   * The title or name of the subdomain. Appears adjacent to the logo and is required for communicating content to assisitive technologies.
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

function isEditableKeyboardTarget(target: EventTarget | Element | null): boolean {
  if (!(target instanceof Element)) return false

  const editableElement = target.closest(
    'input, textarea, select, [role="textbox"], [role="combobox"], [role="searchbox"], [contenteditable]',
  )

  if (!editableElement) return false

  if (editableElement instanceof HTMLElement && editableElement.isContentEditable) return true

  return editableElement.matches('input, textarea, select, [role="textbox"], [role="combobox"], [role="searchbox"]')
}

type SearchKeyboardShortcut = {
  key: string
  altKey: boolean
  ctrlKey: boolean
  metaKey: boolean
  shiftKey: boolean
}

const searchKeyboardShortcutModifiers = new Set(['alt', 'option', 'ctrl', 'control', 'meta', 'cmd', 'command', 'shift'])

function parseSearchKeyboardShortcut(keyboardShortcut: string | false): SearchKeyboardShortcut | false {
  if (!keyboardShortcut) return false

  const shortcutParts = keyboardShortcut
    .split('+')
    .map(part => part.trim())
    .filter(Boolean)
  const key = shortcutParts.pop()
  if (!key) return false

  const modifiers = shortcutParts.map(part => part.toLowerCase())

  if (!modifiers.every(modifier => searchKeyboardShortcutModifiers.has(modifier))) return false

  return {
    key,
    altKey: modifiers.includes('alt') || modifiers.includes('option'),
    ctrlKey: modifiers.includes('ctrl') || modifiers.includes('control'),
    metaKey: modifiers.includes('meta') || modifiers.includes('cmd') || modifiers.includes('command'),
    shiftKey: modifiers.includes('shift'),
  }
}

function keyboardEventMatchesShortcut(event: KeyboardEvent, shortcut: SearchKeyboardShortcut): boolean {
  const shortcutKey = shortcut.key.toLowerCase()
  const eventKey = event.key.toLowerCase()
  const eventCode = event.code.toLowerCase()

  if (event.altKey !== shortcut.altKey || event.ctrlKey !== shortcut.ctrlKey || event.metaKey !== shortcut.metaKey) {
    return false
  }

  if (/^[^a-z0-9]$/.test(shortcutKey) && eventKey === shortcutKey) {
    return shortcut.shiftKey ? event.shiftKey : true
  }

  if (event.shiftKey !== shortcut.shiftKey) {
    return false
  }

  if (/^[a-z]$/.test(shortcutKey)) {
    return eventKey === shortcutKey || eventCode === `key${shortcutKey}`
  }

  if (/^[0-9]$/.test(shortcutKey)) {
    return eventKey === shortcutKey || eventCode === `digit${shortcutKey}`
  }

  return eventKey === shortcutKey
}

function Root(
  {
    children,
    className,
    fixed = true,
    fullWidth = false,
    logoHref = 'https://github.com',
    title,
    titleHref = '/',
    variant = 'default',
    leadingComponent,
    trailingComponent,
    onNarrowMenuToggle,
    ...rest
  }: SubdomainNavBarProps,
  forwardedRef: React.ForwardedRef<SubdomainNavBarHandle>,
) {
  const [menuHidden, setMenuHidden] = useState(true)
  const [searchVisible, setSearchVisible] = useState(false)
  const {isSmall, isMedium, isLarge} = useWindowSize()
  const [startOfContentButtonFocused, setStartOfContentButtonFocused] = useState(false)
  const headerRef = useRef<HTMLElement | null>(null)
  const mainElRef = useRef<HTMLElement | null>(null)
  const startOfContentID = useId('start-of-content')

  const handleMobileMenuClick = () => {
    const nextMenuHidden = !menuHidden
    setMenuHidden(nextMenuHidden)

    onNarrowMenuToggle?.(!nextMenuHidden)
  }
  const focusTrapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const mainEl = document.querySelector('main')
    if (mainEl) {
      mainEl.id = mainEl.id || startOfContentID
      mainElRef.current = mainEl
    }
  }, [startOfContentID])

  useFocusTrap({containerRef: focusTrapRef, restoreFocusOnCleanUp: true, disabled: menuHidden})
  useKeyboardEscape(() => {
    setMenuHidden(true)
    onNarrowMenuToggle?.(false)
  })

  useEffect(() => {
    if (isMedium) {
      setMenuHidden(true)
      onNarrowMenuToggle?.(false)
    }
  }, [isMedium, menuHidden, onNarrowMenuToggle])

  useEffect(() => {
    const newOverflowState = menuHidden ? 'auto' : 'hidden'
    document.body.style.overflow = newOverflowState
  }, [menuHidden])

  const setStartOfContentButtonFocusedTrue = useCallback(() => setStartOfContentButtonFocused(true), [])
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

  const hasActions = actionItems.length > 0

  const searchItem = useMemo(
    () =>
      React.Children.toArray(children).find(
        (child): child is React.ReactElement<SearchProps> =>
          React.isValidElement<SearchProps>(child) && child.type === Search,
      ),
    [children],
  )
  const hasSearch = Boolean(searchItem)
  const usesInputSearchTrigger = searchItem?.props.variant === 'input' && isLarge
  const searchKeyboardShortcut = useMemo(
    () => parseSearchKeyboardShortcut(searchItem?.props.keyboardShortcut ?? '/'),
    [searchItem?.props.keyboardShortcut],
  )

  const handleSearchOpen = useCallback(() => {
    if (!hasSearch) return

    setSearchVisible(true)
  }, [hasSearch])

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

  useEffect(() => {
    const handleDocumentKeyDown = (event: KeyboardEvent) => {
      if (
        !hasSearch ||
        searchVisible ||
        event.defaultPrevented ||
        event.isComposing ||
        !searchKeyboardShortcut ||
        !keyboardEventMatchesShortcut(event, searchKeyboardShortcut)
      ) {
        return
      }

      if (isEditableKeyboardTarget(event.target) || isEditableKeyboardTarget(document.activeElement)) {
        return
      }

      event.preventDefault()
      handleSearchOpen()
    }

    document.addEventListener('keydown', handleDocumentKeyDown)

    return () => {
      document.removeEventListener('keydown', handleDocumentKeyDown)
    }
  }, [handleSearchOpen, hasSearch, searchKeyboardShortcut, searchVisible])

  const hasLeadingComponent =
    leadingComponent !== undefined && leadingComponent !== null && typeof leadingComponent !== 'boolean'
  const hasTrailingComponent =
    trailingComponent !== undefined && trailingComponent !== null && typeof trailingComponent !== 'boolean'

  return (
    <>
      <div
        className={clsx(
          styles['SubdomainNavBar-outer-container'],
          fixed && styles['SubdomainNavBar-outer-container--fixed'],
          variant === 'gridline' && styles['SubdomainNavBar-outer-container--variant-gridline'],
        )}
      >
        <Button
          as="a"
          href={`#${mainElRef.current?.id || startOfContentID}`}
          variant="primary"
          className={clsx(styles['SubdomainNavBar-skip-to-content'], !startOfContentButtonFocused && 'visually-hidden')}
          onFocus={setStartOfContentButtonFocusedTrue}
          onBlur={setStartOfContentButtonFocusedFalse}
        >
          Skip to content
        </Button>
        <header
          ref={headerRef}
          className={clsx(styles['SubdomainNavBar'], styles[`SubdomainNavBar--variant-${variant}`], className)}
          data-testid={testIds.root}
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
                    <span className={clsx(styles['SubdomainNavBar-back-arrow'])}>
                      <ChevronLeftIcon fill="currentColor" size={24} />
                    </span>
                    <MarkGithubIcon fill="currentColor" size={24} />
                  </a>
                </li>
                {title && isSmall && (
                  <>
                    {variant !== 'gridline' && (
                      <li role="separator" className={styles['SubdomainNavBar-title-separator']} aria-hidden>
                        /
                      </li>
                    )}
                    <li>
                      <a
                        href={titleHref}
                        aria-label={`${title} home`}
                        className={clsx(styles['SubdomainNavBar-title'])}
                      >
                        <Text size="400" weight="medium">
                          {title}
                        </Text>
                      </a>
                    </li>
                  </>
                )}
              </ol>
            </nav>
            {isMedium && hasLeadingComponent && (
              <div className={styles['SubdomainNavBar-leading-component']}>{leadingComponent}</div>
            )}
            {hasLinks && (
              <nav
                id="menu-navigation"
                aria-label={title}
                className={styles['SubdomainNavBar-primary-nav']}
                data-testid={testIds.menuLinks}
              >
                <NavigationVisbilityObserver className={clsx(styles['SubdomainNavBar-primary-nav-list--invisible'])}>
                  {menuItems}
                </NavigationVisbilityObserver>
              </nav>
            )}

            <div className={clsx(styles['SubdomainNavBar-secondary-nav'])}>
              {React.Children.toArray(children)
                .map(child => {
                  if (React.isValidElement<SearchProps>(child) && child.type === Search) {
                    return React.cloneElement(child, {
                      active: searchVisible,
                      className: clsx(
                        child.props.className,
                        (hasActions || hasTrailingComponent) &&
                          styles['SubdomainNavBar-search-trigger--has-trailing-item'],
                      ),
                      onSearchOpen: handleSearchOpen,
                      onSearchClose: handleSearchClose,
                      subdomainNavBarVariant: variant,
                      title,
                      variant: usesInputSearchTrigger ? 'input' : 'icon',
                    })
                  }
                  return null
                })
                .filter(Boolean)}

              {hasLinks && (
                <button
                  aria-expanded={!menuHidden}
                  aria-label="Menu"
                  aria-controls="menu-navigation"
                  aria-haspopup="true"
                  className={clsx(
                    styles['SubdomainNavBar-menu-button'],
                    styles['SubdomainNavBar-mobile-menu-button'],
                    !menuHidden && styles['SubdomainNavBar-menu-button--close'],
                  )}
                  data-testid={testIds.menuButton}
                  onClick={handleMobileMenuClick}
                >
                  <div className={clsx(styles['SubdomainNavBar-menu-button-bar'])}></div>
                  <div className={clsx(styles['SubdomainNavBar-menu-button-bar'])}></div>
                  <div className={clsx(styles['SubdomainNavBar-menu-button-bar'])}></div>
                </button>
              )}

              {isMedium && hasActions && (
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
              {isMedium && hasTrailingComponent && (
                <div className={styles['SubdomainNavBar-trailing-component']}>{trailingComponent}</div>
              )}

              {!isMedium && (
                <div
                  className={clsx(
                    styles['SubdomainNavBar-menu-wrapper'],
                    menuHidden && styles['SubdomainNavBar-menu-wrapper--close'],
                  )}
                >
                  <div>
                    {title && titleHref && (
                      <Text as="p">
                        <a
                          href={titleHref}
                          aria-label={`${title} home`}
                          className={clsx(styles['SubdomainNavBar-link'], styles['SubdomainNavBar-link--title'])}
                        >
                          {title}
                        </a>
                      </Text>
                    )}
                    {hasLeadingComponent && (
                      <div className={styles['SubdomainNavBar-leading-component']}>{leadingComponent}</div>
                    )}
                    {hasLinks && !menuHidden && (
                      <NavigationVisbilityObserver
                        className={clsx(styles['SubdomainNavBar-primary-nav-list--visible'])}
                      >
                        {menuItems}
                      </NavigationVisbilityObserver>
                    )}
                  </div>
                  {hasActions && (
                    <div
                      className={clsx(
                        styles['SubdomainNavBar-button-area'],
                        styles['SubdomainNavBar-button-area--visible'],
                      )}
                    >
                      <div className={styles['SubdomainNavBar-button-area-inner']}>{actionItems}</div>
                    </div>
                  )}
                  {hasTrailingComponent && (
                    <div className={styles['SubdomainNavBar-trailing-component']}>{trailingComponent}</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>
      </div>
      {!mainElRef.current && <div id={`${startOfContentID}`} tabIndex={-1} />}
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
        className={styles['SubdomainNavBar-link']}
        onClick={onLinkClick}
        tabIndex={isOverflowed ? -1 : undefined}
      >
        <span className={styles['SubdomainNavBar-link-text']}>{children}</span>
        {isExternal && <LinkExternalIcon size={16} aria-label="External link" />}
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

type SearchProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  active?: boolean
  className?: string
  /**
   * Alternative presentation for the search trigger button.
   */
  variant?: SubdomainNavBarSearchVariant
  title?: string
  onSearchOpen?: () => void
  onSearchClose?: () => void
  autoComplete?: boolean
  /**
   * Placeholder text shown in the input-style trigger and the opened search input.
   */
  placeholder?: string
  /**
   * Optional keyboard shortcut hint shown in the input-style trigger. Pass an empty string to hide it.
   */
  shortcutLabel?: string
  /**
   * Keyboard shortcut that opens the search dialog. Pass `false` to disable it.
   * Supports single keys and modifier combinations, such as `/` or `Command+Option+k`.
   */
  keyboardShortcut?: string | false
  searchResults?: SubdomainNavBarSearchResults
  searchTerm?: string
  subdomainNavBarVariant?: SubdomainNavBarVariant
}

type NormalizedSearchResultGroup = {
  title?: string
  results: Array<{
    result: SubdomainNavBarSearchResultProps
    index: number
  }>
}

function isSearchResultGroup(
  item: SubdomainNavBarSearchResultProps | SubdomainNavBarSearchResultGroupProps,
): item is SubdomainNavBarSearchResultGroupProps {
  return 'results' in item
}

function normalizeSearchResults(searchResults: SubdomainNavBarSearchResults = []): NormalizedSearchResultGroup[] {
  const groups: NormalizedSearchResultGroup[] = []
  let resultIndex = 0

  for (const item of searchResults) {
    if (isSearchResultGroup(item)) {
      if (item.results.length === 0) continue

      groups.push({
        title: item.title,
        results: item.results.map(result => ({
          result,
          index: resultIndex++,
        })),
      })

      continue
    }

    const groupTitle = item.group
    let group = groups.find(existingGroup => existingGroup.title === groupTitle)

    if (!group) {
      group = {
        title: groupTitle,
        results: [],
      }
      groups.push(group)
    }

    group.results.push({
      result: item,
      index: resultIndex++,
    })
  }

  return groups
}

const _SearchInternal = forwardRef<HTMLInputElement, SearchProps>(
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
      keyboardShortcut = '/',
      subdomainNavBarVariant,
      variant: searchVariant = 'icon',
    },
    forwardedRef,
  ) => {
    const dialogRef = useRef<HTMLDialogElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const isGridlineVariant = subdomainNavBarVariant === 'gridline'
    const resolvedPlaceholder = placeholder ?? (title ? `Search ${title}` : 'Search')
    const resolvedShortcutLabel = shortcutLabel ?? (keyboardShortcut || '')
    const normalizedSearchResultGroups = useMemo(() => normalizeSearchResults(searchResults), [searchResults])
    const hasGroupedSearchResults = normalizedSearchResultGroups.some(group => group.title)
    const searchResultsLength = normalizedSearchResultGroups.reduce((count, group) => count + group.results.length, 0)
    const hasSearchResults = searchResultsLength > 0

    const [activeDescendant, setActiveDescendant] = useState<number>(-1)
    const [liveRegion, setLiveRegion] = useState<boolean>(false)

    const handleClose = useCallback(() => {
      onSearchClose?.()
      setActiveDescendant(-1)
    }, [onSearchClose])

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

    const handleDialogClick = useCallback(
      (event: React.MouseEvent<HTMLDialogElement>) => {
        if (event.target !== event.currentTarget) return

        const dialog = event.currentTarget
        const dialogRect = dialog.getBoundingClientRect()
        const clickIsInsideDialog =
          event.clientX >= dialogRect.left &&
          event.clientX <= dialogRect.right &&
          event.clientY >= dialogRect.top &&
          event.clientY <= dialogRect.bottom

        if (clickIsInsideDialog) return

        handleClose()
      },
      [handleClose],
    )

    const handleDialogCancel = useCallback(
      (event: React.SyntheticEvent<HTMLDialogElement>) => {
        event.preventDefault()
        handleClose()
      },
      [handleClose],
    )

    const handleAriaFocus = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        const supportedKeys = ['ArrowDown', 'ArrowUp', 'Enter']
        const currentCount = activeDescendant
        const dialog = dialogRef.current
        let count

        // Prevent any other keys outside of supported from being prevented.
        // Only prevent "Enter" if activeDescendant is greater than -1.
        if (!supportedKeys.includes(event.key) || (event.key === 'Enter' && activeDescendant === -1) || !dialog) {
          return false
        }

        event.preventDefault()

        if (event.key === 'ArrowDown') {
          // If count reaches last search result item, reset to -1
          count = currentCount < searchResultsLength - 1 ? currentCount + 1 : -1
          setActiveDescendant(count)
        } else if (event.key === 'ArrowUp') {
          // Reset to last search result item if
          count = currentCount === -1 ? searchResultsLength - 1 : currentCount - 1
          setActiveDescendant(count)
        }

        if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
          dialog.querySelector(`#subdomainnavbar-search-result-${count}`)?.scrollIntoView()
        }

        if (event.key === 'Enter') {
          const link = dialog.querySelector(`#subdomainnavbar-search-result-${activeDescendant} a`) as HTMLAnchorElement
          link.click()
        }
      },
      [searchResultsLength, activeDescendant],
    )

    const searchLiveRegion = useCallback(() => {
      // Adding a non-breaking space and then removing it will force screen readers to announce the text,
      // as it thinks that there was a change within the live region.
      setLiveRegion(true)

      setTimeout(() => {
        if (active) setLiveRegion(false)
      }, 200)
    }, [active])

    useEffect(() => {
      searchLiveRegion()
    }, [searchResultsLength, searchTerm, searchLiveRegion])

    const renderSearchResult = ({result, index}: NormalizedSearchResultGroup['results'][number]) => (
      <li
        key={`${result.title}-${index}`}
        id={`subdomainnavbar-search-result-${index}`}
        className={styles['SubdomainNavBar-search-result-item']}
        role="option"
        aria-selected={index === activeDescendant}
      >
        <div className={styles['SubdomainNavBar-search-result-item-container']}>
          <a href={result.url}>
            <span>{result.title}</span>
            {isGridlineVariant && hasGroupedSearchResults && result.isExternal && (
              <ArrowUpRightIcon size={20} aria-hidden="true" />
            )}
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
        <div
          className={clsx(
            styles['SubdomainNavBar-search-trigger'],
            searchVariant === 'input' && styles['SubdomainNavBar-search-trigger--input'],
            className,
          )}
        >
          {searchVariant === 'input' ? (
            <button
              aria-label={`${resolvedPlaceholder} search`}
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
          ) : (
            <Button
              aria-label="Toggle search bar"
              className={
                isGridlineVariant
                  ? styles['SubdomainNavBar-search-button--gridline']
                  : styles['SubdomainNavBar-search-button']
              }
              variant="secondary"
              size="small"
              leadingVisual={<SearchIcon />}
              onClick={onSearchOpen}
              data-testid="toggle-search"
            />
          )}
        </div>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- Native dialog keyboard dismissal is handled by onCancel; click only closes backdrop clicks. */}
        <dialog
          ref={dialogRef}
          aria-label={`Search ${title}`}
          className={clsx(
            styles['SubdomainNavBar-search-dialog'],
            isGridlineVariant && styles['SubdomainNavBar-search-dialog--gridline'],
          )}
          onCancel={handleDialogCancel}
          onClick={handleDialogClick}
        >
          {active && (
            <>
              <div className={clsx(styles['SubdomainNavBar-search-dialog-control-area'])}>
                <div className={styles['SubdomainNavBar-search-input-area']}>
                  <form className={clsx(styles['SubdomainNavBar-search-form'])} onSubmit={onSubmit} role="search">
                    <FormControl fullWidth size="medium">
                      <FormControl.Label visuallyHidden>Search</FormControl.Label>
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
                        onKeyDown={handleAriaFocus}
                      />
                    </FormControl>
                  </form>
                  <button
                    aria-label="Close"
                    className={styles['SubdomainNavBar-search-close-button']}
                    onClick={handleClose}
                    type="button"
                  >
                    Close
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
                        Results for &ldquo;{searchTerm}&rdquo;
                      </Text>
                    )}
                    <ul
                      role="listbox"
                      tabIndex={0}
                      aria-labelledby={!hasGroupedSearchResults ? 'subdomainnavbar-search-results-heading' : undefined}
                      aria-label={
                        hasGroupedSearchResults
                          ? searchTerm
                            ? `Results for ${searchTerm}`
                            : 'Search results'
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
                                  aria-label={group.title ? undefined : 'Results'}
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
                  {`${searchResultsLength} suggestions.`}
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
  return (
    <Button
      as="a"
      href={href}
      className={clsx(styles['SubdomainNavBar-cta-button'])}
      variant="primary"
      size="small"
      {...rest}
    >
      {children}
    </Button>
  )
}

function SecondaryAction({children, href, ...rest}: PropsWithChildren<CTAActionProps>) {
  return (
    <Button
      as="a"
      href={href}
      className={clsx(styles['SubdomainNavBar-cta-button'], styles['SubdomainNavBar-cta-button--secondary'])}
      size="small"
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
