import {useCallback, useEffect, useRef, useState} from 'react'
import {useFocusTrap} from '../hooks/useFocusTrap'
import {useKeyboardEscape} from '../hooks/useKeyboardEscape'
import {useOnClickOutside} from '../hooks/useOnClickOutside'

// Uses a more traditional burger+takeover menu for narrower viewports.
export function useNarrowMenu(isLarge: boolean | undefined) {
  const navRef = useRef<HTMLElement>(null)
  const narrowMenuRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const isNarrowMenuOpen = !isLarge && isOpen

  // Keeps keyboard focus inside the menu while it's open.
  useFocusTrap({containerRef: narrowMenuRef, disabled: !isNarrowMenuOpen})

  // Closing the narrow menu shouldn't affect the wide one.
  const closeNarrowMenu = useCallback(() => {
    if (isLarge) return
    setIsOpen(false)
  }, [isLarge])

  // Only toggles this menu on narrow screens.
  const toggleNarrowMenu = useCallback(() => {
    if (isLarge) return
    setIsOpen(previous => !previous)
  }, [isLarge])

  // Closes the narrow menu when we switch to a wide viewport.
  useEffect(() => {
    if (isLarge) setIsOpen(false)
  }, [isLarge])

  useOnClickOutside(narrowMenuRef, closeNarrowMenu)
  useKeyboardEscape(closeNarrowMenu)

  // Locks page scrolling and gives the open menu the space it needs.
  useEffect(() => {
    if (!isNarrowMenuOpen) return
    const navElement = navRef.current
    const originalOverflow = document.body.style.overflow

    // Keeps the menu within the space below the nav.
    const updateAvailableHeight = () => {
      if (navElement) {
        const navTop = navElement.getBoundingClientRect().top
        navElement.style.setProperty('--subnav-available-height', `${window.innerHeight - navTop}px`)
      }
    }

    document.body.style.overflow = 'hidden'
    updateAvailableHeight()
    // eslint-disable-next-line github/prefer-observers
    window.addEventListener('resize', updateAvailableHeight)

    // Puts page scrolling back and removes the resize listener.
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('resize', updateAvailableHeight)
      navElement?.style.removeProperty('--subnav-available-height')
    }
  }, [isNarrowMenuOpen])

  return {navRef, narrowMenuRef, isNarrowMenuOpen, closeNarrowMenu, toggleNarrowMenu}
}
