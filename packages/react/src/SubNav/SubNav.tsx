import React, {
  Children,
  isValidElement,
  useState,
  PropsWithChildren,
  memo,
  ReactElement,
  ReactNode,
  useCallback,
} from 'react'
import {Text} from '..'

import {default as clsx} from 'clsx'
import {ChevronDownIcon, XIcon} from '@primer/octicons-react'
import {useKeyboardEscape} from '../hooks/useKeyboardEscape'
import {useFocusTrap} from '../hooks/useFocusTrap'

import type {BaseProps} from '../component-helpers'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/sub-nav/colors-with-modes.css'

/** * Main Stylesheet (as a CSS Module) */ import styles from './SubNav.module.css'

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
}

export type SubNavProps = {
  hasShadow?: boolean
  'data-testid'?: string
} & PropsWithChildren<BaseProps<HTMLElement>>

const _SubNavRoot = memo(({id, children, className, 'data-testid': testId, hasShadow}: SubNavProps) => {
  const overlayRef = React.useRef<HTMLDivElement>(null)
  const [isOpenAtNarrow, setIsOpenAtNarrow] = useState(false)

  const closeMenuCallback = useCallback(() => {
    setIsOpenAtNarrow(false)
  }, [])

  useKeyboardEscape(closeMenuCallback)
  useFocusTrap({containerRef: overlayRef, restoreFocusOnCleanUp: true, disabled: !isOpenAtNarrow})

  const {heading: HeadingChild, links: LinkChildren} = Children.toArray(children).reduce(
    (acc: {heading?: ReactNode; links: ReactElement[]}, child) => {
      if (isValidElement(child)) {
        if (child.type === SubNavHeading) {
          acc.heading = child
        } else if (child.type === SubNavLink) {
          acc.links.push(child)
        }
      }
      return acc
    },
    {heading: undefined, links: []},
  )

  return (
    <nav
      id={id}
      className={clsx(
        styles.SubNav,
        isOpenAtNarrow && styles['SubNav--open'],
        hasShadow && styles['SubNav--has-shadow'],
        className,
      )}
      data-testid={testId || testIds.root}
    >
      <button
        className={styles['SubNav__overlay-toggle']}
        data-testid={testIds.button}
        onClick={() => setIsOpenAtNarrow(!isOpenAtNarrow)}
        aria-label="Toggle sub navigation"
      >
        {isOpenAtNarrow ? (
          <XIcon className={styles['SubNav__overlay-toggle-icon']} size={24} />
        ) : (
          <ChevronDownIcon className={styles['SubNav__overlay-toggle-icon']} size={24} />
        )}
      </button>
      {HeadingChild && <div className={styles['SubNav__heading-container']}>{HeadingChild}</div>}
      {LinkChildren.length && (
        <div
          ref={overlayRef}
          className={clsx(styles['SubNav__links-overlay'], isOpenAtNarrow && styles['SubNav__links-overlay--open'])}
        >
          {LinkChildren}
        </div>
      )}
    </nav>
  )
})

type SubNavHeadingProps = {href: string} & PropsWithChildren<React.HTMLProps<HTMLAnchorElement>> &
  BaseProps<HTMLAnchorElement>

const SubNavHeading = ({href, children, className, ...props}: SubNavHeadingProps) => {
  return (
    <a href={href} className={clsx(styles['SubNav__heading'], className)} {...props}>
      {children}
    </a>
  )
}

type SubNavLinkProps = {
  href: string
  'data-testid'?: string
} & PropsWithChildren<React.HTMLProps<HTMLAnchorElement>> &
  BaseProps<HTMLAnchorElement>

const SubNavLink = ({
  children,
  href,
  'aria-current': ariaCurrent,
  'data-testid': testId,
  className,
  ...props
}: SubNavLinkProps) => {
  return (
    <a
      href={href}
      className={clsx(styles['SubNav__link'], ariaCurrent && styles['SubNav__link--active'], className)}
      aria-current={ariaCurrent}
      tabIndex={ariaCurrent ? -1 : undefined}
      data-testid={testId || testIds.link}
      {...props}
    >
      <Text as="span" size="200" className={styles['SubNav__link-label']}>
        {children}
      </Text>
    </a>
  )
}

/**
 * Use SubNav to display a secondary navigation beneath a primary header.
 * @see https://primer.style/brand/components/SubNav
 */
export const SubNav = Object.assign(_SubNavRoot, {
  Heading: SubNavHeading,
  Link: SubNavLink,
  testIds,
})
