import React, {useState, useCallback, useRef, PropsWithChildren, forwardRef, useMemo, useEffect} from 'react'
import clsx from 'clsx'
import {ChevronLeftIcon, MarkGithubIcon, SearchIcon, XIcon} from '@primer/octicons-react'

import {Button, FormControl, Text, TextInput} from '..'
import {NavigationVisbilityObserver} from './NavigationVisbilityObserver'
import {useOnClickOutside} from '../hooks/useOnClickOutside'
import {useFocusTrap} from '../hooks/useFocusTrap'
import {useKeyboardEscape} from '../hooks/useKeyboardEscape'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/subdomain-nav-bar/colors-with-modes.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from './SubdomainNavBar.module.css'

export type SubdomainNavBarProps = {
  /**
   * Valid child elements are `SubdomainNavBar.Link`, `SubdomainNavBar.PrimaryAction`,
   * `SubdomainNavBar.SecondaryAction` and `SubdomainNavBar.Search`
   */
  children?:
    | React.ReactNode
    | React.ReactElement<LinkProps>
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

function Root({
  children,
  className,
  fixed = true,
  fullWidth = false,
  logoHref = 'https://github.com',
  title,
  titleHref = '/',
  ...rest
}: SubdomainNavBarProps) {
  const [menuHidden, setMenuHidden] = useState(true)
  const [searchVisible, setSearchVisible] = useState(false)

  const handleMobileMenuClick = () => setMenuHidden(!menuHidden)
  const handleSearchVisibility = () => setSearchVisible(!searchVisible)

  useEffect(() => {
    const newOverflowState = menuHidden ? 'auto' : 'hidden'
    document.body.style.overflow = newOverflowState
  }, [menuHidden])

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
          if (React.isValidElement(child) && typeof child.type !== 'string') {
            if (child.type === Link) {
              return React.cloneElement(child as React.ReactElement, {
                'data-navitemid': child.props.children,
                href: child.props.href,
                children: child.props.children,
                style: {
                  [`--animation-order`]: index,
                },
              })
            }
            return null
          }
        })
        .filter(Boolean),
    [children],
  )

  return (
    <div
      className={clsx(
        styles['SubdomainNavBar-outer-container'],
        fixed && styles['SubdomainNavBar-outer-container--fixed'],
      )}
    >
      <header className={clsx(styles['SubdomainNavBar'], className)} data-testid={testIds.root} {...rest}>
        <div
          className={clsx(
            styles['SubdomainNavBar-inner-container'],
            searchVisible && styles['SubdomainNavBar-inner-container--search-open'],
            !fullWidth && styles['SubdomainNavBar-inner-container--centered'],
          )}
          data-testid={testIds.innerContainer}
        >
          <nav aria-label="global breadcrumb">
            <ol className={styles['SubdomainNavBar-title-area']}>
              <li>
                <a href={logoHref} aria-label="Github Home" className={styles['SubdomainNavBar-logo-mark']}>
                  <span className={clsx(styles['SubdomainNavBar-back-arrow'])}>
                    <ChevronLeftIcon fill="currentColor" size={24} />
                  </span>
                  <MarkGithubIcon fill="currentColor" size={24} />
                </a>
              </li>
              {title && (
                <>
                  <li role="separator" className={styles['SubdomainNavBar-title-separator']} aria-hidden>
                    /
                  </li>
                  <li>
                    <a href={titleHref} aria-label={`${title} home`} className={clsx(styles['SubdomainNavBar-title'])}>
                      {title}
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
              <NavigationVisbilityObserver className={clsx(styles['SubdomainNavBar-primary-nav-list--invisible'])}>
                {menuItems}
              </NavigationVisbilityObserver>
            </nav>
          )}

          <div className={clsx(styles['SubdomainNavBar-secondary-nav'])}>
            {React.Children.toArray(children)
              .map(child => {
                if (React.isValidElement(child) && typeof child.type !== 'string') {
                  if (child.type === Search) {
                    return React.cloneElement(child as React.ReactElement, {
                      active: searchVisible,
                      handlerFn: handleSearchVisibility,
                      title,
                    })
                  }
                  return null
                }
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

            <div className={clsx(styles['SubdomainNavBar-foobarbaz'])}>
              {hasLinks && !menuHidden && (
                <NavigationVisbilityObserver className={clsx(styles['SubdomainNavBar-primary-nav-list--visible'])}>
                  {menuItems}
                </NavigationVisbilityObserver>
              )}

              <div
                className={clsx(
                  styles['SubdomainNavBar-button-area'],
                  !menuHidden && styles['SubdomainNavBar-button-area--visible'],
                )}
              >
                <div className={styles['SubdomainNavBar-button-area-inner']}>
                  {React.Children.toArray(children)
                    .map(child => {
                      if (React.isValidElement(child) && typeof child.type !== 'string') {
                        if (child.type === PrimaryAction) {
                          return child
                        }
                        return null
                      }
                    })
                    .filter(Boolean)}

                  {React.Children.toArray(children)
                    .map(child => {
                      if (React.isValidElement(child) && typeof child.type !== 'string') {
                        if (child.type === SecondaryAction) {
                          return child
                        }
                        return null
                      }
                    })
                    .filter(Boolean)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

type LinkProps = {href: string} & React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>

function Link({href, className, children, ...rest}: PropsWithChildren<LinkProps>) {
  return (
    <li className={clsx(styles['SubdomainNavBar-primary-nav-list-item'], className)} {...rest}>
      <a href={href} className={clsx(styles['SubdomainNavBar-link'])}>
        {children}
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
}

type SearchProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  ref: React.RefObject<HTMLInputElement>
  active?: boolean
  title?: string
  handlerFn?: (event: MouseEvent | TouchEvent | FocusEvent) => void
  autoComplete?: boolean
  searchResults?: SubdomainNavBarSearchResultProps[]
  searchTerm?: string
}

const _SearchInternal = (
  {active, title, searchResults, searchTerm, handlerFn, onSubmit, onChange}: SearchProps,
  ref,
) => {
  const dialogRef = useRef<HTMLDivElement | null>(null)

  useFocusTrap({containerRef: dialogRef, restoreFocusOnCleanUp: true, disabled: !active})
  useOnClickOutside(dialogRef, handlerFn)

  const [activeDescendant, setActiveDescendant] = useState<number>(-1)
  const [listboxActive, setListboxActive] = useState<boolean>()
  const [liveRegion, setLiveRegion] = useState<boolean>(false)

  const handleClose = useCallback(
    (event = null) => {
      if (handlerFn) handlerFn(event)
      setActiveDescendant(-1)
    },
    [handlerFn],
  )

  useOnClickOutside(dialogRef, handleClose)
  useKeyboardEscape(() => {
    // Close the dialog if combobox is already collapsed
    if (!listboxActive && active) {
      handleClose()
      return false
    }

    setListboxActive(false)
    setActiveDescendant(-1)
  })

  const handleAriaFocus = useCallback(
    event => {
      const supportedKeys = ['ArrowDown', 'ArrowUp', 'Escape', 'Enter']
      const currentCount = activeDescendant
      const searchResultsLength = searchResults ? searchResults.length : 0
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
    [searchResults, activeDescendant],
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
    // We want to set "listboxActive" when search results are present,
    // or the user pressed "Escape". We watch for "searchTerm", as we -
    // want the listbox to become active if they pressed "Escape", and -
    // adjusted their existing value.
    const search = searchResults && searchResults.length ? true : false
    setListboxActive(search)
    searchLiveRegion()
  }, [searchResults, searchTerm, searchLiveRegion])

  return (
    <>
      <div className={clsx(styles['SubdomainNavBar-search-trigger'])}>
        <button
          aria-label="search"
          className={styles['SubdomainNavBar-search-button']}
          onClick={handlerFn as (event) => void}
          data-testid="toggle-search"
        >
          <SearchIcon />
        </button>
      </div>
      {active && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-label={`Search ${title}`}
          aria-modal="true"
          tabIndex={-1}
          className={clsx(styles['SubdomainNavBar-search-dialog'])}
        >
          <div className={clsx(styles['SubdomainNavBar-search-dialog-control-area'])}>
            <form className={clsx(styles['SubdomainNavBar-search-form'])} onSubmit={onSubmit} role="search">
              <FormControl fullWidth size="medium">
                <FormControl.Label visuallyHidden>Search</FormControl.Label>
                <TextInput
                  ref={ref}
                  className={clsx(styles['SubdomainNavBar-search-text-input'])}
                  // Input load is deferred and when visible, should immediately be focussed
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus
                  name="search"
                  role="combobox"
                  aria-expanded={listboxActive}
                  aria-controls="listbox-search-results"
                  placeholder={`Search ${title}`}
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
              className={clsx(styles['SubdomainNavBar-menu-button'], styles['SubdomainNavBar-menu-button--close'])}
              onClick={handleClose}
            >
              <XIcon size={24} />
            </button>
          </div>

          <div id="listbox-search-results">
            {listboxActive && (
              <div className={clsx(styles['SubdomainNavBar-search-results-container'])}>
                <Text
                  id="subdomainnavbar-search-results-heading"
                  className={styles['SubdomainNavBar-search-results-heading']}
                >
                  Results for &ldquo;{searchTerm}&rdquo;
                </Text>
                <ul
                  role="listbox"
                  tabIndex={0}
                  aria-labelledby="subdomainnavbar-search-results-heading"
                  className={clsx(styles['SubdomainNavBar-search-results'])}
                >
                  {searchResults?.map((result, index) => (
                    <li
                      key={`${result.title}-${index}`}
                      id={`subdomainnavbar-search-result-${index}`}
                      className={styles['SubdomainNavBar-search-result-item']}
                      role="option"
                      aria-selected={index === activeDescendant}
                    >
                      <div className={styles['SubdomainNavBar-search-result-item-container']}>
                        <a href={result.url}>{result.title}</a>
                      </div>

                      <Text
                        as="p"
                        size="200"
                        id={`subdomainnavbar-search-result-item-desc${index}`}
                        className={styles['SubdomainNavBar-search-result-item-desc']}
                      >
                        {result.description}
                      </Text>
                      <div>
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
                  ))}
                </ul>
              </div>
            )}
            <div aria-live="polite" aria-atomic="true" data-testid={testIds.liveRegion} className="visually-hidden">
              {`${searchResults?.length} suggestions.`}
              {liveRegion && <span>&nbsp;</span>}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const Search = forwardRef(_SearchInternal)

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
      hasArrow={false}
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
      hasArrow={false}
      {...rest}
    >
      {children}
    </Button>
  )
}

export const SubdomainNavBar = Object.assign(Root, {
  Link,
  Search,
  PrimaryAction,
  SecondaryAction,
  testIds,
})
