import {useEffect, useRef} from 'react'
import styles from './SubNav.module.css'

// Viewport-agnostic logic for the SubNavs anchor nav features
export function useAnchorMenu() {
  const anchorMenuRef = useRef<HTMLDivElement>(null)
  const portalRef = useRef<HTMLDivElement>(null)

  // Shows the anchor links once the row sticks to the top.
  useEffect(() => {
    const menuContainer = anchorMenuRef.current

    const observer = new IntersectionObserver(
      // Uses the latest entry so stale updates don't show the menu too early.
      entries => {
        if (entries.length === 0) return
        const entry = entries[entries.length - 1]

        entry.target.classList.toggle(
          styles['SubNav__anchor-menu-outer-container--stuck'],
          entry.boundingClientRect.top < 0 && entry.intersectionRatio < 1,
        )
      },
      {threshold: [1]},
    )

    if (menuContainer) {
      observer.observe(menuContainer)
    }

    // Stops watching this row when the nav goes away.
    return () => {
      if (menuContainer) {
        observer.unobserve(menuContainer)
      }
    }
  }, [])

  return {anchorMenuRef, portalRef}
}
