import React, {useCallback, useRef, useState} from 'react'
import {clsx} from 'clsx'
import {ChevronDownIcon} from '@primer/octicons-react'

import {BaseProps} from '../component-helpers'
import {useVisibilityObserver} from './useVisibilityObserver'
import {useOnClickOutside} from '../hooks/useOnClickOutside'
import type {VisibilityMap} from './useVisibilityObserver'

import styles from './SubdomainNavBar.module.css'
import {useKeyboardEscape} from '../hooks/useKeyboardEscape'
import {useWindowSize} from '../hooks/useWindowSize'

export function NavigationVisbilityObserver({children, className, ...rest}) {
  const navRef = useRef<HTMLUListElement | null>(null)
  const [visibilityMap] = useVisibilityObserver(navRef, children)
  const {isMedium} = useWindowSize()

  const showOverflow = Object.values(visibilityMap).includes(false)

  return (
    <ul className={clsx(styles['SubdomainNavBar-primary-nav-list'], className)} ref={navRef} {...rest}>
      {React.Children.map(children, child => {
        return React.cloneElement(child, {
          className: clsx(
            child.props.className,
            isMedium &&
              !!visibilityMap[child.props['data-navitemid']] &&
              styles['SubdomainNavBar-primary-nav-list-item--visible'],
            isMedium &&
              !visibilityMap[child.props['data-navitemid']] &&
              styles['SubdomainNavBar-primary-nav-list-item--invisible'],
          ),
        })
      })}

      {showOverflow && <AnchoredOverlay visibilityMap={visibilityMap}>{children}</AnchoredOverlay>}
    </ul>
  )
}

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
            if (React.isValidElement(child)) {
              const navItemChild = child.props['data-navitemid']

              if (!visibilityMap[navItemChild]) {
                return (
                  <React.Fragment>
                    {React.cloneElement(child as React.ReactElement, {
                      onClick: handleClose,
                      className: clsx(styles['SubdomainNavBar-overflow-menu-item'], child.props.className),
                    })}
                  </React.Fragment>
                )
              }
            }
            return null
          })}
        </ul>
      </div>
    </li>
  )
}
