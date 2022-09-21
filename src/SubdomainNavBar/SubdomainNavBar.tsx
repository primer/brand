import React, {useState, PropsWithChildren, forwardRef} from 'react'
import clsx from 'clsx'
import {MarkGithubIcon, SearchIcon, ThreeBarsIcon, XIcon} from '@primer/octicons-react'

import {Button, FormControl, Heading, Text, TextInput} from '..'
import {NavigationVisbilityObserver} from './NavigationVisbilityObserver'

/**
 * Design tokens
 */
import '../../lib/design-tokens/css/tokens/functional/components/subdomain-nav-bar/colors-with-modes.css'

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
   * The title or name of the subdomain. Appears alongside the logo and is parsed by assisitive technologies.
   */
  title: string
  /**
   * Optionally change the URL of the logo
   */
  logoLink?: string
}

function Root({children, logoLink = 'https//github.com', title, ...rest}: SubdomainNavBarProps) {
  const [menuHidden, setMenuHidden] = useState(true)
  const [searchVisible, setSearchVisible] = useState(false)

  const handleMobileMenuClick = () => setMenuHidden(!menuHidden)
  const handleSearchVisibility = () => setSearchVisible(!searchVisible)

  return (
    <div className={styles['SubdomainNavBar-outer-container']}>
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
                <a href={logoLink} aria-label="Github Home" className={styles['SubdomainNavBar-logo-mark']}>
                  <MarkGithubIcon fill="currentColor" size="medium" />
                </a>
              </li>
              <li role="separator" className={styles['SubdomainNavBar-title-separator']} aria-hidden>
                /
              </li>
              <li>
                <a
                  href={logoLink}
                  aria-current="page"
                  aria-label={`${title} home`}
                  className={clsx(styles['SubdomainNavBar-title'])}
                >
                  {title}
                </a>
              </li>
            </ol>
          </nav>

          <nav aria-label={title} className={styles['SubdomainNavBar-secondary-nav']}>
            <NavigationVisbilityObserver
              className={clsx(!menuHidden && styles['SubdomainNavBar-secondary-nav-list--visible'])}
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
            {menuHidden ? <ThreeBarsIcon /> : <XIcon />}
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
      </header>
    </div>
  )
}

type LinkProps = {href: string} & React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>

function Link({href, className, children, ...rest}: PropsWithChildren<LinkProps>) {
  return (
    <li className={clsx(styles['SubdomainNavBar-secondary-nav-list-item'], className)} {...rest}>
      <a href={href} className={clsx(styles['SubdomainNavBar-link'])}>
        {children}
      </a>
    </li>
  )
}

type SearchResults = {
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
  searchResults?: SearchResults[]
  searchTerm?: string
}

const _SearchInternal = (
  {active, title, searchResults, searchTerm, handlerFn, onSubmit, onChange}: SearchProps,
  ref
) => {
  return (
    <>
      <div role="search" className={clsx(styles['SubdomainNavBar-search-trigger'])}>
        <button aria-label="search" className={styles['SubdomainNavBar-search-button']} onClick={handlerFn}>
          <SearchIcon />
        </button>
      </div>
      {active && (
        <div role="dialog" aria-modal="true" className={clsx(styles['SubdomainNavBar-search-dialog'])}>
          <div className={clsx(styles['SubdomainNavBar-search-dialog-control-area'])}>
            <div role="search" className={clsx(styles['SubdomainNavBar-search-trigger'])}>
              <button aria-label="search" className={styles['SubdomainNavBar-search-button']} onClick={handlerFn}>
                <SearchIcon />
              </button>
            </div>
            <form className={clsx(styles['SubdomainNavBar-search-form'])} onSubmit={onSubmit}>
              <FormControl fullWidth>
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
                  aria-controls="listbox-ID"
                  aria-activedescendant="IDREF"
                  placeholder={`Search ${title}`}
                  onChange={onChange}
                  defaultValue={searchTerm}
                />
              </FormControl>
            </form>
            <button
              aria-label="Close"
              className={clsx(styles['SubdomainNavBar-menu-button'], styles['SubdomainNavBar-menu-button--close'])}
              onClick={handlerFn}
            >
              <XIcon />
            </button>
          </div>

          {searchResults && searchResults.length > 0 && (
            <ul role="listbox" aria-labelledby="heading" className={clsx(styles['SubdomainNavBar-search-results'])}>
              <li>
                <Text className={styles['SubdomainNavBar-search-results-heading']}>
                  Results for &ldquo;{searchTerm}&rdquo;
                </Text>
              </li>

              {searchResults.map((result, index) => (
                <li key={`${result.title}-${index}`} className={styles['SubdomainNavBar-search-result-item']}>
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
          )}
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
