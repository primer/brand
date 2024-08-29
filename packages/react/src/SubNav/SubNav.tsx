import React, {
  Children,
  forwardRef,
  isValidElement,
  memo,
  useCallback,
  useState,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
  type RefObject,
} from 'react'
import {Button, ButtonSizes, ButtonVariants, type HeadingTags, Text} from '..'

import {default as clsx} from 'clsx'
import {ChevronDownIcon, XIcon} from '@primer/octicons-react'
import {useId} from '@reach/auto-id'
import {useKeyboardEscape} from '../hooks/useKeyboardEscape'
import {useFocusTrap} from '../hooks/useFocusTrap'
import {useOnClickOutside} from '../hooks/useOnClickOutside'
import {useProvidedRefOrCreate} from '../hooks/useRef'
import {useContainsFocus} from './useContainsFocus'

import type {BaseProps} from '../component-helpers'

/**
 * Design tokens
 */
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/sub-nav/base.css'
import '@primer/brand-primitives/lib/design-tokens/css/tokens/functional/components/sub-nav/colors-with-modes.css'

/** * Main Stylesheet (as a CSS Module) */
import styles from './SubNav.module.css'

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
  get heading() {
    return `${this.root}-heading`
  },
  get action() {
    return `${this.root}-action`
  },
}

export type SubNavProps = {
  hasShadow?: boolean
  /**
   * Allows the SubNav to be used at full width,
   * removing any internal padding and guttering.
   */
  fullWidth?: boolean
  'data-testid'?: string
} & PropsWithChildren<BaseProps<HTMLElement>>

const _SubNavRoot = memo(({id, children, className, 'data-testid': testId, fullWidth, hasShadow}: SubNavProps) => {
  const navRef = React.useRef<HTMLElement>(null)
  const overlayRef = React.useRef<HTMLUListElement>(null)
  const [isOpenAtNarrow, setIsOpenAtNarrow] = useState(false)
  const idForLinkContainer = useId()

  const closeMenuCallback = useCallback(() => {
    setIsOpenAtNarrow(false)
  }, [])

  const handleMenuToggle = useCallback(() => {
    setIsOpenAtNarrow(!isOpenAtNarrow)
  }, [isOpenAtNarrow])

  useOnClickOutside(navRef, closeMenuCallback)
  useKeyboardEscape(closeMenuCallback)
  useFocusTrap({containerRef: overlayRef, restoreFocusOnCleanUp: true, disabled: !isOpenAtNarrow})

  const activeLink = Children.toArray(children).find(child => {
    if (isValidElement(child)) {
      return child.props['aria-current']
    }
  }) as React.ReactElement | undefined

  const {
    heading: HeadingChild,
    links: LinkChildren,
    action: ActionChild,
  } = Children.toArray(children).reduce(
    (acc: {heading?: ReactNode; links: ReactElement[]; action?: ReactNode}, child) => {
      if (isValidElement(child)) {
        if (child.type === SubNavHeading) {
          acc.heading = child
        } else if (child.type === SubNavLink) {
          acc.links.push(
            React.cloneElement(child as ReactElement<SubNavLinkProps>, {
              onClick: child.props['aria-current'] ? handleMenuToggle : child.props.onClick,
            }),
          )
        } else if (child.type === _SubNavAction) {
          acc.action = child
        }
      }
      return acc
    },
    {heading: undefined, links: [], action: undefined},
  )

  return (
    <nav
      ref={navRef}
      id={id}
      className={clsx(
        styles.SubNav,
        isOpenAtNarrow && styles['SubNav--open'],
        hasShadow && styles['SubNav--has-shadow'],
        fullWidth && styles['SubNav--full-width'],
        className,
      )}
      data-testid={testId || testIds.root}
    >
      {HeadingChild}
      {LinkChildren.length && (
        <ul
          ref={overlayRef}
          id={idForLinkContainer}
          className={clsx(styles['SubNav__links-overlay'], isOpenAtNarrow && styles['SubNav__links-overlay--open'])}
          data-testid={testIds.overlay}
        >
          {LinkChildren}
          {ActionChild && <li className={styles['SubNav__action-container']}>{ActionChild}</li>}
        </ul>
      )}
      <button
        className={styles['SubNav__overlay-toggle']}
        data-testid={testIds.button}
        onClick={handleMenuToggle}
        aria-expanded={isOpenAtNarrow ? 'true' : 'false'}
        aria-controls={idForLinkContainer}
        aria-label={`${isOpenAtNarrow ? 'close' : 'open'} navigation menu`}
      >
        {isOpenAtNarrow ? (
          <XIcon className={styles['SubNav__overlay-toggle-icon']} size={24} />
        ) : (
          <div className={styles['SubNav__overlay-toggle-content']}>
            <Text as="span">{activeLink && activeLink.props.children}</Text>
            <ChevronDownIcon className={styles['SubNav__overlay-toggle-icon']} size={24} />
          </div>
        )}
      </button>
    </nav>
  )
})

type SubNavHeadingProps = {
  href: string
  'data-testid'?: string
  as?: (typeof HeadingTags)[number]
} & PropsWithChildren<React.HTMLProps<HTMLAnchorElement>> &
  BaseProps<HTMLAnchorElement>

const SubNavHeading = ({
  href,
  children,
  className,
  'data-testid': testID = testIds.heading,
  as: HeadingComponent = 'h2',
  ...props
}: SubNavHeadingProps) => {
  return (
    <HeadingComponent className={styles['SubNav__heading-container']}>
      <a href={href} className={clsx(styles['SubNav__heading'], className)} data-testid={testID} {...props}>
        {children}
      </a>
    </HeadingComponent>
  )
}

type SubNavLinkProps = {
  href: string
  'data-testid'?: string
} & PropsWithChildren<React.HTMLProps<HTMLAnchorElement>> &
  BaseProps<HTMLAnchorElement>

const SubNavLinkWithSubmenu = forwardRef<HTMLDivElement, SubNavLinkProps>(
  ({children, href, 'aria-current': ariaCurrent, 'data-testid': testId, className, ...props}, forwardedRef) => {
    const submenuId = useId()

    const [isExpanded, setIsExpanded] = useState(false)
    const ref = useProvidedRefOrCreate(forwardedRef as RefObject<HTMLDivElement>)

    useContainsFocus(ref, (containsFocus: boolean) => {
      if (!containsFocus) {
        setIsExpanded(false)
      }
    })

    const [label, SubMenuChildren] = children as ReactNode[]

    const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (['Enter', ' '].includes(e.key)) {
        setIsExpanded(prev => !prev)
      }
    }, [])

    return (
      <div
        className={clsx(
          styles['SubNav__link'],
          styles['SubNav__link--has-sub-menu'],
          isExpanded && styles['SubNav__link--expanded'],
        )}
        data-testid={testId || testIds.link}
        ref={ref}
        onMouseOver={() => setIsExpanded(true)}
        onMouseOut={() => setIsExpanded(false)}
        /**
         * onFocus and onBlur need to be defined to keep the jsx-a11y/mouse-events-have-key-events
         * eslint rule happy. The focus/blur behaviour is handled by useContainsFocus
         */
        onFocus={() => null}
        onBlur={() => null}
      >
        <a
          href={href}
          className={clsx(styles['SubNav__link'], ariaCurrent && styles['SubNav__link--active'], className)}
          aria-current={ariaCurrent}
          {...props}
        >
          <Text as="span" size="200" className={styles['SubNav__link-label']}>
            {label}
          </Text>
        </a>
        <button
          className={styles['SubNav__sub-menu-toggle']}
          onKeyDown={onKeyDown}
          aria-expanded={isExpanded ? 'true' : 'false'}
          aria-controls={submenuId}
          aria-label={`${isExpanded ? 'Close' : 'Open'} submenu`}
        >
          <ChevronDownIcon className={styles['SubNav__sub-menu-icon']} size={16} />
        </button>
        <div id={submenuId} className={styles['SubNav__sub-menu-children']}>
          {SubMenuChildren}
        </div>
      </div>
    )
  },
)

const SubNavLink = forwardRef<HTMLAnchorElement | HTMLDivElement, SubNavLinkProps>((props, ref) => {
  const hasSubMenu = Children.toArray(props.children).some(child => {
    if (isValidElement(child)) {
      return child.type === _SubMenu
    }
  })

  if (hasSubMenu) {
    return (
      <li>
        <SubNavLinkWithSubmenu {...props} ref={ref as RefObject<HTMLDivElement>} />
      </li>
    )
  }

  const {children, href, 'aria-current': ariaCurrent, 'data-testid': testId, className, ...rest} = props

  return (
    <li>
      <a
        href={href}
        className={clsx(styles['SubNav__link'], ariaCurrent && styles['SubNav__link--active'], className)}
        aria-current={ariaCurrent}
        data-testid={testId || testIds.link}
        ref={ref as RefObject<HTMLAnchorElement>}
        {...rest}
      >
        <Text as="span" size="200" className={styles['SubNav__link-label']}>
          {children}
        </Text>
      </a>
    </li>
  )
})

function _SubMenu({children, className, ...props}: PropsWithChildren<BaseProps<HTMLUListElement>>) {
  return (
    <ul className={clsx(styles['SubNav__sub-menu'], className)} {...props}>
      {children}
    </ul>
  )
}

type SubNavActionProps = {
  /**
   * Required path or location for the action button to link to.
   */
  href: string
  /**
   * Optional sizes for the button.
   */
  size?: (typeof ButtonSizes)[number]
  /**
   * Optional sizes for the button.
   */
  variant?: (typeof ButtonVariants)[number]
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>

function _SubNavAction({children, href, variant = 'primary', size = 'small', ...rest}: SubNavActionProps) {
  return (
    <Button
      className={styles['SubNav__action']}
      as="a"
      href={href}
      variant={variant}
      hasArrow={false}
      data-testid={testIds.action}
      size={size}
      {...rest}
    >
      {children}
    </Button>
  )
}

/**
 * Use SubNav to display a secondary navigation beneath a primary header.
 * @see https://primer.style/brand/components/SubNav
 */
export const SubNav = Object.assign(_SubNavRoot, {
  Heading: SubNavHeading,
  Link: SubNavLink,
  Action: _SubNavAction,
  SubMenu: _SubMenu,
  testIds,
})
