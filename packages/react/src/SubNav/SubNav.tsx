import React, {Children, isValidElement, useState, PropsWithChildren, memo, ReactElement, ReactNode} from 'react'
import {Text, Heading, HeadingProps} from '..'

import {default as clsx} from 'clsx'
import {ChevronDownIcon, XIcon} from '@primer/octicons-react'

import type {BaseProps} from '../component-helpers'

/** * Main Stylesheet (as a CSS Module) */
import styles from './SubNav.module.css'

const testIds = {
  root: 'SubNav',
  get button() {
    return `${this.root}-button`
  },
  get overlay() {
    return `${this.root}-overlay`
  },
  get list() {
    return `${this.root}-list`
  },
  get item() {
    return `${this.root}-list-item`
  },
}

export type SubNavProps = {
  'data-testid'?: string
} & PropsWithChildren<BaseProps<HTMLElement>>

const _SubNavRoot = memo(({id, children, 'data-testid': testId}: SubNavProps) => {
  const [isOpenAtNarrow, setIsOpenAtNarrow] = useState(false)

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
    <nav className={clsx(styles.SubNav, isOpenAtNarrow && styles['SubNav--open'])}>
      <button
        className={styles['SubNav__overlay-toggle']}
        aria-haspopup="dialog"
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
        <div className={clsx(styles['SubNav__links-overlay'], isOpenAtNarrow && styles['SubNav__links-overlay--open'])}>
          {LinkChildren}
        </div>
      )}
    </nav>
  )
})

type SubNavHeadingProps = HeadingProps & PropsWithChildren<React.HTMLProps<HTMLHeadingElement>>

const SubNavHeading = ({children, className, ...props}: SubNavHeadingProps) => {
  return (
    <Heading as="h3" size="5" className={clsx(styles['SubNav__heading'], className)} {...props}>
      {children}
    </Heading>
  )
}

type SubNavLinkProps = {
  href: string
  'aria-current'?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false'
} & PropsWithChildren<React.HTMLProps<HTMLAnchorElement>> &
  BaseProps<HTMLAnchorElement>

const SubNavLink = ({children, href, 'aria-current': ariaCurrent, className, ...props}: SubNavLinkProps) => {
  return (
    <a
      href={href}
      className={clsx(styles['SubNav__link'], ariaCurrent && styles['SubNav__link--active'], className)}
      aria-current={ariaCurrent}
      tabIndex={ariaCurrent ? -1 : undefined}
      {...props}
    >
      <Text as="span" size="200" weight="medium" className={styles['SubNav__link-label']}>
        {children}
      </Text>
    </a>
  )
}

/**
 * Use SubNav to display a secondary navigation beneath the primary header.
 * @see https://primer.style/brand/components/SubNav
 */
export const SubNav = Object.assign(_SubNavRoot, {
  Heading: SubNavHeading,
  Link: SubNavLink,
  testIds,
})
