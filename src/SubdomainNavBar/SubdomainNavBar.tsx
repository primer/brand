import React, {useState, useRef, PropsWithChildren, forwardRef} from 'react'
import clsx from 'clsx'
import {ChevronLeftIcon, MarkGithubIcon, SearchIcon, XIcon} from '@primer/octicons-react'

import {Button, FormControl, Heading, Text, TextInput} from '..'
import {NavigationVisbilityObserver} from './NavigationVisbilityObserver'

/**
 * Design tokens
 */
import '../../lib/design-tokens/css/tokens/functional/components/subdomain-nav-bar/colors-with-modes.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from './SubdomainNavBar.module.css'
import {useOnClickOutside} from '../hooks/useOnClickOutside'

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
   * The title or name of the subdomain. Appears adjacent to the logo and is required for communicating content to assisitive technologies.
   */
  title: string
  /**
   * Optionally change the URL of the logo
   */
  logoHref?: string
}

function Root({children, fixed = true, logoHref = 'https://github.com', title, ...rest}: SubdomainNavBarProps) {
  const [menuHidden, setMenuHidden] = useState(true)
  const [searchVisible, setSearchVisible] = useState(false)

  const handleMobileMenuClick = () => setMenuHidden(!menuHidden)
  const handleSearchVisibility = () => setSearchVisible(!searchVisible)

  return (
    <div
      className={clsx(
        styles['SubdomainNavBar-outer-container'],
        fixed && styles['SubdomainNavBar-outer-container--fixed']
      )}
    >
      <header className={styles['SubdomainNavBar']} {...rest}>
        <div
          className={clsx(
            styles['SubdomainNavBar-inner-container'],
            searchVisible && styles['SubdomainNavBar-inner-container--search-open']
          )}
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
              <li role="separator" className={styles['SubdomainNavBar-title-separator']} aria-hidden>
                /
              </li>
              <li>
                <a
                  href={logoHref}
                  aria-current="page"
                  aria-label={`${title} home`}
                  className={clsx(styles['SubdomainNavBar-title'])}
                >
                  {title}
                </a>
              </li>
            </ol>
          </nav>

          <nav id="menu-navigation" aria-label={title} className={styles['SubdomainNavBar-primary-nav']}>
            <NavigationVisbilityObserver
              className={clsx(!menuHidden && styles['SubdomainNavBar-primary-nav-list--visible'])}
            >
              {React.Children.toArray(children)
                .map((child, index) => {
                  if (React.isValidElement(child) && typeof child.type !== 'string') {
                    if (child.type === Link) {
                      return React.cloneElement(child, {
                        'data-navitemid': child.props.children,
                        href: child.props.href,
                        children: child.props.children,
                        style: {
                          [`--animation-order`]: index
                        }
                      })
                    }
                    return null
                  }
                })
                .filter(Boolean)}
            </NavigationVisbilityObserver>
          </nav>

          <div className={clsx(styles['SubdomainNavBar-secondary-nav'])}>
            {React.Children.toArray(children)
              .map(child => {
                if (React.isValidElement(child) && typeof child.type !== 'string') {
                  if (child.type === Search) {
                    return React.cloneElement(child, {
                      active: searchVisible,
                      handlerFn: handleSearchVisibility,
                      title
                    })
                  }
                  return null
                }
              })
              .filter(Boolean)}

            <button
              aria-expanded="true"
              aria-label="Menu"
              aria-controls="menu-navigation"
              aria-haspopup="true"
              className={clsx(
                styles['SubdomainNavBar-menu-button'],
                styles['SubdomainNavBar-mobile-menu-button'],
                !menuHidden && styles['SubdomainNavBar-menu-button--close']
              )}
              onClick={handleMobileMenuClick}
            >
              <div className={clsx(styles['SubdomainNavBar-menu-button-bar'])}></div>
              <div className={clsx(styles['SubdomainNavBar-menu-button-bar'])}></div>
              <div className={clsx(styles['SubdomainNavBar-menu-button-bar'])}></div>
            </button>

            <div
              className={clsx(
                styles['SubdomainNavBar-button-area'],
                !menuHidden && styles['SubdomainNavBar-button-area--visible']
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
  handlerFn?: () => void
  autoComplete?: boolean
  searchResults?: SubdomainNavBarSearchResultProps[]
  searchTerm?: string
}

const _SearchInternal = (
  {active, title, searchResults, searchTerm, handlerFn, onSubmit, onChange}: SearchProps,
  ref
) => {
  const dialogRef = useRef<HTMLDivElement | null>(null)

  useOnClickOutside(dialogRef, handlerFn)

  return (
    <>
      <div role="search" className={clsx(styles['SubdomainNavBar-search-trigger'])} aria-label="open search">
        <button
          aria-label="search"
          className={styles['SubdomainNavBar-search-button']}
          onClick={handlerFn}
          data-testid="toggle-search"
        >
          <SearchIcon />
        </button>
      </div>
      {active && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-label="search menu dialog"
          title={`Search ${title}`}
          aria-modal="true"
          className={clsx(styles['SubdomainNavBar-search-dialog'])}
        >
          <div className={clsx(styles['SubdomainNavBar-search-dialog-control-area'])}>
            <form className={clsx(styles['SubdomainNavBar-search-form'])} onSubmit={onSubmit}>
              <FormControl fullWidth size="large">
                <FormControl.Label visuallyHidden>Search</FormControl.Label>
                <TextInput
                  ref={ref}
                  className={clsx(styles['SubdomainNavBar-search-text-input'])}
                  // Input load is deferred and when visible, should immediately be focussed
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus
                  name="search"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="listbox-search-results"
                  placeholder={`Search ${title}`}
                  onChange={onChange}
                  defaultValue={searchTerm}
                  invisible
                  leadingVisual={<SearchIcon size={16} />}
                />
              </FormControl>
            </form>
            <button
              aria-label="Close"
              className={clsx(styles['SubdomainNavBar-menu-button'], styles['SubdomainNavBar-menu-button--close'])}
              onClick={handlerFn}
            >
              <XIcon size={24} />
            </button>
          </div>

          <div id="listbox-search-results">
            {searchResults && searchResults.length > 0 && (
              <div className={clsx(styles['SubdomainNavBar-search-results-container'])}>
                <Text
                  id="subdomainnavbar-search-results-heading"
                  className={styles['SubdomainNavBar-search-results-heading']}
                >
                  Results for &ldquo;{searchTerm}&rdquo;
                </Text>
                <ul
                  role="listbox"
                  aria-label="search results"
                  aria-labelledby="subdomainnavbar-search-results-heading"
                  aria-activedescendant="subdomainnavbar-search-result-1"
                  className={clsx(styles['SubdomainNavBar-search-results'])}
                  tabIndex={0}
                >
                  {searchResults.map((result, index) => (
                    <li
                      key={`${result.title}-${index}`}
                      id={`subdomainnavbar-search-result-${index}`}
                      className={styles['SubdomainNavBar-search-result-item']}
                    >
                      <Heading as="h6" className={styles['SubdomainNavBar-search-result-item-heading']}>
                        <a href={result.url}>{result.title}</a>
                      </Heading>

                      <Text as="p" size="200" className={styles['SubdomainNavBar-search-result-item-desc']}>
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
          </div>
        </div>
      )}
    </>
  )
}

const Search = forwardRef(_SearchInternal)

type CTAActionProps = {
  href: string
}

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
      href="#"
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
  SecondaryAction
})
