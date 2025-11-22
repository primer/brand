import React, {forwardRef, useCallback, useRef, useState, PropsWithChildren} from 'react'
import {clsx} from 'clsx'
import {ChevronDownIcon} from '@primer/octicons-react'

import {BaseProps} from '../component-helpers'
import {useVisibilityObserver} from './useVisibilityObserver'
import {useOnClickOutside} from '../hooks/useOnClickOutside'
import type {VisibilityMap} from './useVisibilityObserver'
import type {SubdomainNavBarLinkProps} from './SubdomainNavBar'

import styles from './SubdomainNavBar.module.css'
import {useKeyboardEscape} from '../hooks/useKeyboardEscape'
import {useWindowSize} from '../hooks/useWindowSize'
import {useProvidedRefOrCreate} from '../hooks/useRef'

type NavigationVisibilityObserverProps = PropsWithChildren<
  BaseProps<HTMLUListElement> & React.HTMLAttributes<HTMLUListElement>
>

export const NavigationVisbilityObserver = forwardRef<HTMLUListElement, NavigationVisibilityObserverProps>(
  ({children, className, ...rest}, forwardedRef) => {
    const navRef = useProvidedRefOrCreate<HTMLUListElement>(
      forwardedRef as React.RefObject<HTMLUListElement> | React.RefCallback<HTMLUListElement> | null,
    )
    const [visibilityMap] = useVisibilityObserver(navRef, children)
    const {isMedium} = useWindowSize()

    const showOverflow = Object.values(visibilityMap).includes(false)

    return (
      <ul className={clsx(styles['SubdomainNavBar-primary-nav-list'], className)} ref={navRef} {...rest}>
        {React.Children.map(children, child => {
          if (React.isValidElement<SubdomainNavBarLinkProps>(child)) {
            const visibilityKey = child.props['data-navitemid']
            if (!visibilityKey) {
              return child
            }
            const isVisible = visibilityMap[visibilityKey]
            return React.cloneElement(child, {
              className: clsx(
                child.props.className,
                isMedium && isVisible && styles['SubdomainNavBar-primary-nav-list-item--visible'],
                isMedium && isVisible === false && styles['SubdomainNavBar-primary-nav-list-item--invisible'],
              ),
            })
          }
          return child
        })}

        {showOverflow && <AnchoredOverlay visibilityMap={visibilityMap}>{children}</AnchoredOverlay>}
      </ul>
    )
  },
)

type AnchoredOverlayProps = {
  visibilityMap: VisibilityMap
} & BaseProps<HTMLDivElement>

function AnchoredOverlay({children, className, visibilityMap}: React.PropsWithChildren<AnchoredOverlayProps>) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const ref = useRef<HTMLLIElement | null>(null)

  useOnClickOutside(ref, () => handleClose())

  const open = Boolean(anchorEl)

  const handleClick = event => {
    if (anchorEl) {
      handleClose()
    } else {
      setAnchorEl(event.currentTarget)
    }
  }

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  useKeyboardEscape(handleClose)

  return (
    <li className={clsx(styles['SubdomainNavBar-primary-nav-list-item--overflow'], className)} ref={ref}>
      <button
        aria-expanded={open ? 'true' : 'false'}
        aria-controls="more-navigation"
        aria-haspopup="true"
        onClick={handleClick}
        className={clsx(styles['SubdomainNavBar-link'], styles['SubdomainNavBar-more-link'])}
      >
        More
        <ChevronDownIcon />
      </button>

      <div
        id="more-navigation"
        style={{display: open ? 'block' : 'none'}}
        className={clsx(styles['SubdomainNavBar-overflow-menu'])}
      >
        <ul className={clsx(styles['SubdomainNavBar-overflow-menu-list'])}>
          {React.Children.map(children, child => {
            if (React.isValidElement<SubdomainNavBarLinkProps>(child)) {
              const navItemChild = child.props['data-navitemid']
              if (!navItemChild || visibilityMap[navItemChild]) {
                return null
              }

              return (
                <React.Fragment>
                  {React.cloneElement(child, {
                    onClick: handleClose,
                    className: clsx(styles['SubdomainNavBar-overflow-menu-item'], child.props.className),
                  })}
                </React.Fragment>
              )
            }
            return null
          })}
        </ul>
      </div>
    </li>
  )
}
