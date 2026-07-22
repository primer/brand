import React, {forwardRef, useCallback, useEffect, useRef, useState, PropsWithChildren} from 'react'
import {clsx} from 'clsx'
import {ChevronDownIcon} from '@primer/octicons-react'

import {BaseProps} from '../component-helpers'
import {useVisibilityObserver} from './useVisibilityObserver'
import {useOnClickOutside} from '../hooks/useOnClickOutside'
import type {VisibilityMap} from './useVisibilityObserver'
import type {SubdomainNavBarLinkProps} from './SubdomainNavBar'

import styles from './SubdomainNavBar.module.css'
import {useAnchoredPosition} from '../hooks/useAnchoredPosition'
import {useKeyboardEscape} from '../hooks/useKeyboardEscape'
import {useWindowSize} from '../hooks/useWindowSize'
import {useProvidedRefOrCreate} from '../hooks/useRef'
import {SubdomainNavBarLinkContext} from './SubdomainNavBarLinkContext'

type NavigationLinkProps = SubdomainNavBarLinkProps & {
  'data-navitemid'?: string
}

type NavigationVisibilityObserverProps = PropsWithChildren<
  BaseProps<HTMLUListElement> & React.HTMLAttributes<HTMLUListElement>
>

export const NavigationVisbilityObserver = forwardRef<HTMLUListElement, NavigationVisibilityObserverProps>(
  ({children, className, ...rest}, forwardedRef) => {
    const navRef = useProvidedRefOrCreate<HTMLUListElement>(
      forwardedRef as React.RefObject<HTMLUListElement> | React.RefCallback<HTMLUListElement> | null,
    )
    const overflowRef = useRef<HTMLLIElement | null>(null)
    const overflowButtonRef = useRef<HTMLButtonElement | null>(null)
    const overflowMenuRef = useRef<HTMLDivElement | null>(null)
    const {isMedium} = useWindowSize()
    const measurementKey = React.Children.toArray(children)
      .map((child, index) => {
        if (React.isValidElement<NavigationLinkProps>(child)) {
          return `${index}:${child.props['data-navitemid'] ?? ''}`
        }

        return `${index}:`
      })
      .join('|')
    const [visibilityMap] = useVisibilityObserver(navRef, overflowRef, measurementKey, !isMedium)
    const [menuOpen, setMenuOpen] = useState(false)

    const showOverflow = Object.values(visibilityMap).includes(false)
    const overflowMenuId = React.useId()
    const firstOverflowedItemIndex = React.Children.toArray(children).findIndex(child => {
      if (React.isValidElement<NavigationLinkProps>(child)) {
        const visibilityKey = child.props['data-navitemid']
        return Boolean(visibilityKey && visibilityMap[visibilityKey] === false)
      }

      return false
    })
    const overflowOrder =
      firstOverflowedItemIndex === -1 ? React.Children.count(children) * 2 : firstOverflowedItemIndex * 2 - 1

    const navItems = React.Children.map(children, (child, index) => {
      if (React.isValidElement<NavigationLinkProps>(child)) {
        const visibilityKey = child.props['data-navitemid']
        if (!visibilityKey) {
          return child
        }

        const isOverflowed = isMedium && visibilityMap[visibilityKey] === false
        return (
          <SubdomainNavBarLinkContext.Provider value={{isOverflowed}}>
            {React.cloneElement(child, {
              className: clsx(
                child.props.className,
                isOverflowed && styles['SubdomainNavBar-primary-nav-list-item--overflowed'],
              ),
              style: {
                ...child.props.style,
                order: index * 2,
              },
            })}
          </SubdomainNavBarLinkContext.Provider>
        )
      }

      return child
    })

    const handleClose = useCallback(() => {
      setMenuOpen(false)
    }, [])

    const handleOverflowButtonClick = () => {
      setMenuOpen(prevMenuOpen => !prevMenuOpen)
    }

    const handleEscape = useCallback(() => {
      if (menuOpen) {
        handleClose()
        overflowButtonRef.current?.focus()
      }
    }, [handleClose, menuOpen])

    useEffect(() => {
      if (!showOverflow) {
        handleClose()
      }
    }, [handleClose, showOverflow])

    useOnClickOutside(overflowRef, () => handleClose(), overflowMenuRef)
    useKeyboardEscape(handleEscape)

    const {position} = useAnchoredPosition(
      {
        floatingElementRef: overflowMenuRef,
        anchorElementRef: overflowButtonRef,
        align: 'end',
        side: 'outside-bottom',
      },
      [menuOpen, showOverflow, overflowOrder, visibilityMap],
    )

    if (!isMedium) {
      return (
        <ul className={clsx(styles['SubdomainNavBar-primary-nav-list'], className)} ref={navRef} {...rest}>
          {children}
        </ul>
      )
    }

    return (
      <div
        className={clsx(styles['SubdomainNavBar-primary-nav-overflow'], className)}
        data-has-overflow={showOverflow ? 'true' : undefined}
      >
        <ul className={styles['SubdomainNavBar-primary-nav-list']} ref={navRef} {...rest}>
          {navItems}
          <OverflowButton
            ariaControls={overflowMenuId}
            buttonRef={overflowButtonRef}
            menuOpen={menuOpen}
            onClick={handleOverflowButtonClick}
            order={overflowOrder}
            ref={overflowRef}
            visible={showOverflow}
          />
        </ul>
        <OverflowMenu
          id={overflowMenuId}
          menuOpen={menuOpen}
          onClose={handleClose}
          position={position}
          ref={overflowMenuRef}
          visibilityMap={visibilityMap}
        >
          {children}
        </OverflowMenu>
      </div>
    )
  },
)

type OverflowButtonProps = {
  ariaControls: string
  buttonRef: React.RefObject<HTMLButtonElement | null>
  menuOpen: boolean
  onClick: () => void
  order: number
  visible: boolean
} & BaseProps<HTMLLIElement>

const OverflowButton = forwardRef<HTMLLIElement, OverflowButtonProps>(
  ({ariaControls, buttonRef, className, menuOpen, onClick, order, visible}, forwardedRef) => {
    const ref = useProvidedRefOrCreate<HTMLLIElement>(
      forwardedRef as React.RefObject<HTMLLIElement> | React.RefCallback<HTMLLIElement> | null,
    )

    return (
      <li
        aria-hidden={visible ? undefined : true}
        className={clsx(styles['SubdomainNavBar-primary-nav-list-item--overflow'], className)}
        ref={ref}
        style={{order}}
      >
        <button
          aria-expanded={menuOpen ? 'true' : 'false'}
          aria-controls={ariaControls}
          onClick={onClick}
          className={clsx(styles['SubdomainNavBar-link'], styles['SubdomainNavBar-more-link'])}
          ref={buttonRef}
          tabIndex={visible ? undefined : -1}
        >
          <span className={styles['SubdomainNavBar-link-content']}>
            More
            <ChevronDownIcon />
          </span>
        </button>
      </li>
    )
  },
)

type OverflowMenuProps = {
  id: string
  menuOpen: boolean
  onClose: () => void
  position?: {top: number; left: number}
  visibilityMap: VisibilityMap
} & BaseProps<HTMLDivElement>

const OverflowMenu = forwardRef<HTMLDivElement, React.PropsWithChildren<OverflowMenuProps>>(
  ({children, className, id, menuOpen, onClose, position, visibilityMap}, forwardedRef) => {
    if (!menuOpen) {
      return null
    }

    return (
      <div
        id={id}
        ref={forwardedRef}
        style={{
          top: `${position?.top ?? 0}px`,
          left: `${position?.left ?? 0}px`,
          visibility: position ? undefined : 'hidden',
        }}
        className={clsx(styles['SubdomainNavBar-overflow-menu'], className)}
      >
        <ul className={clsx(styles['SubdomainNavBar-overflow-menu-list'])}>
          {React.Children.map(children, child => {
            if (React.isValidElement<NavigationLinkProps>(child)) {
              const navItemChild = child.props['data-navitemid']
              if (!navItemChild || visibilityMap[navItemChild]) {
                return null
              }

              return (
                <SubdomainNavBarLinkContext.Provider value={{isOverflowed: false, onLinkClick: onClose}}>
                  {React.cloneElement(child, {
                    className: clsx(styles['SubdomainNavBar-overflow-menu-item'], child.props.className),
                  })}
                </SubdomainNavBarLinkContext.Provider>
              )
            }
            return null
          })}
        </ul>
      </div>
    )
  },
)
