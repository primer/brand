import React, {useEffect} from 'react'
import styles from './AnchorNav.module.css'

export const useExpandedMenu = (
  open: boolean,
  linkContainerRef: React.RefObject<HTMLElement>,
  innerContainerRef: React.RefObject<HTMLElement>,
  isNarrow: boolean,
  closeMenuCallback: () => void,
) => {
  // Prevent background scroll when menu is open
  useEffect(() => {
    if (open && isNarrow) {
      document.body.classList.add(styles['AnchorNav--no-bg-scroll'])
    } else {
      document.body.classList.remove(styles['AnchorNav--no-bg-scroll'])
    }
  }, [open, isNarrow])

  // Move focus to the first menu item when the menu opens
  useEffect(() => {
    if (open && isNarrow) {
      const firstLink = linkContainerRef.current?.firstChild as HTMLElement | null
      firstLink?.focus()
    }
  }, [open, isNarrow, linkContainerRef])

  // Close the menu when focus moves outside the menu container
  useEffect(() => {
    if (innerContainerRef.current && open && isNarrow) {
      const handleFocusOut = (event: FocusEvent) => {
        if (!innerContainerRef.current?.contains(event.relatedTarget as Node)) {
          closeMenuCallback()
        }
      }

      document.addEventListener('focusout', handleFocusOut)

      return () => {
        document.removeEventListener('focusout', handleFocusOut)
      }
    }
  }, [open, isNarrow, innerContainerRef, closeMenuCallback])
}
