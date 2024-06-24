import React, {useEffect} from 'react'

export const useExpandedMenu = (open: boolean, containerRef: React.RefObject<HTMLElement>, isNarrow: boolean) => {
  // Prevent background scroll when menu is open
  useEffect(() => {
    if (open && isNarrow) {
      document.body.classList.add('AnchorNav--no-bg-scroll')
    } else {
      document.body.classList.remove('AnchorNav--no-bg-scroll')
    }
  }, [open, isNarrow])

  // Move focus to the first menu item when the menu opens
  useEffect(() => {
    if (open) {
      const firstChildOfMenu = containerRef.current?.firstChild as HTMLElement
      firstChildOfMenu.focus()
    }
  }, [open, containerRef])
}
