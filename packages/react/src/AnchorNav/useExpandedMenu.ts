import React, {useEffect} from 'react'

export const useExpandedMenu = (
  open: boolean,
  containerRef: React.RefObject<HTMLElement>,
  anchorRef: React.RefObject<HTMLElement>,
  isNarrow: boolean,
) => {
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

  // Manage the keyboard focus on the menu items
  useEffect(() => {
    const anchor = anchorRef.current
    const container = containerRef.current
    const nextNode = container?.nextSibling as HTMLElement | null
    const childNodes = container?.children as unknown as HTMLElement[] | null // convert from HTMLCollecion to HTMLElement[]

    let activeNodeIndex = 0

    const handler = (event: KeyboardEvent) => {
      if (!open || !container || !childNodes || childNodes.length <= 1) return

      const lastChild = childNodes[childNodes.length - 1]
      const lastChildIndexPos = childNodes.length - 1
      // tab key
      if (event.key === 'Tab') {
        event.preventDefault()

        if (nextNode?.getAttribute('data-forward-focus') === 'true' && nextNode.firstChild instanceof HTMLElement) {
          nextNode.firstChild.focus()
        } else {
          nextNode?.focus()
        }
      }
      // shift+tab
      if (event.shiftKey && event.key === 'Tab') {
        event.preventDefault()
        anchor?.focus()
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        if (activeNodeIndex === lastChildIndexPos) {
          childNodes[0].focus()
          activeNodeIndex = 0
          return
        } else if (activeNodeIndex < lastChildIndexPos) {
          childNodes[activeNodeIndex + 1].focus()
          activeNodeIndex += 1
          return
        }
      } else if (event.key === 'ArrowUp') {
        event.preventDefault() // prevent scroll event
        if (activeNodeIndex === 0) {
          lastChild.focus()
          activeNodeIndex = lastChildIndexPos
          return
        } else {
          childNodes[activeNodeIndex - 1].focus()
          activeNodeIndex--
          return
        }
      }
    }

    container?.addEventListener('keydown', handler)
    return () => container?.addEventListener('keydown', handler)
  }, [open, containerRef, anchorRef])
}
