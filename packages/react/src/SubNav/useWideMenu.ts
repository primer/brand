import {useCallback, useEffect, useRef, useState, type FocusEvent, type ReactNode} from 'react'
import {getAnchoredPosition} from '@primer/behaviors'
import {isSupported, isPolyfilled, apply} from '@oddbird/popover-polyfill/fn'
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect'
import styles from './SubNav.module.css'

// At wide viewports we move links that don't fit into the wide menu's overflow dropdown.
export function useWideMenu(children: ReactNode, isLarge: boolean | undefined, linkCount: number) {
  const overlayRef = useRef<HTMLUListElement>(null)
  const overflowRef = useRef<HTMLLIElement>(null)
  const overflowButtonRef = useRef<HTMLButtonElement>(null)
  const overflowMenuRef = useRef<HTMLDivElement>(null)
  const [visibleLinkCount, setVisibleLinkCount] = useState(linkCount)
  const [isOverflowMenuOpen, setIsOverflowMenuOpen] = useState(false)
  const hasOverflow = Boolean(isLarge) && visibleLinkCount < linkCount

  const closeOverflowMenu = useCallback(() => {
    const menu = overflowMenuRef.current
    if (menu?.matches(':popover-open')) menu.hidePopover()
  }, [])

  // Keeps the popover lined up with the row, including after a resize.
  const positionOverflowMenu = useCallback(() => {
    const menu = overflowMenuRef.current
    const anchor = overflowRef.current
    if (!menu || !anchor || !menu.matches(':popover-open')) return

    const nativePopover = !isPolyfilled()
    let {top, left} = getAnchoredPosition(menu, anchor, {
      align: 'end',
      side: 'outside-bottom',
      displayInViewport: nativePopover,
    })
    if (nativePopover) {
      // Native popovers use page coordinates, not the body's margins.
      const bodyRect = document.body.getBoundingClientRect()
      const bodyStyles = getComputedStyle(document.body)
      top += bodyRect.top + window.scrollY + (Number.parseInt(bodyStyles.borderTopWidth, 10) || 0)
      left += bodyRect.left + window.scrollX + (Number.parseInt(bodyStyles.borderLeftWidth, 10) || 0)
    }
    menu.style.top = `${top}px`
    menu.style.left = `${left}px`
  }, [])

  // Lets the browser close the popover and keeps the arrow in sync.
  useIsomorphicLayoutEffect(() => {
    if (!isSupported()) apply()
    const menu = overflowMenuRef.current
    if (!menu) return
    // Hooks up the trigger without React-version-specific popover props.
    overflowButtonRef.current?.setAttribute('popovertarget', menu.id)

    const handleToggle = (event: Event) => {
      const isOpen = (event as ToggleEvent).newState === 'open'
      if (isOpen) positionOverflowMenu()
      setIsOverflowMenuOpen(isOpen)
    }

    menu.addEventListener('toggle', handleToggle)
    return () => {
      menu.removeEventListener('toggle', handleToggle)
      if (menu.matches(':popover-open')) menu.hidePopover()
    }
  }, [linkCount, positionOverflowMenu])

  // Closes the dropdown when keyboard focus leaves the trigger and links.
  const handleOverflowMenuBlur = (event: FocusEvent<HTMLLIElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) closeOverflowMenu()
  }

  // Closes the dropdown when the row no longer needs it.
  useEffect(() => {
    if (!hasOverflow) {
      closeOverflowMenu()
      setIsOverflowMenuOpen(false)
    }
  }, [closeOverflowMenu, hasOverflow, visibleLinkCount])

  // Keeps the top-layer popup attached when its parent scrolls or the viewport changes.
  useEffect(() => {
    if (!isOverflowMenuOpen) return
    // eslint-disable-next-line github/prefer-observers
    document.addEventListener('scroll', positionOverflowMenu, true)
    // eslint-disable-next-line github/prefer-observers -- Viewport resizing can move the anchor without resizing the row.
    window.addEventListener('resize', positionOverflowMenu)
    return () => {
      document.removeEventListener('scroll', positionOverflowMenu, true)
      window.removeEventListener('resize', positionOverflowMenu)
    }
  }, [isOverflowMenuOpen, positionOverflowMenu])

  // Updates the position when the visible links or their labels change.
  useIsomorphicLayoutEffect(positionOverflowMenu, [children, visibleLinkCount, positionOverflowMenu])

  // Works out how many links fit before the browser paints.
  useIsomorphicLayoutEffect(() => {
    const navigation = overlayRef.current

    if (!isLarge || !navigation) {
      setVisibleLinkCount(linkCount)
      return
    }

    const items = Array.from(navigation.children).filter((item): item is HTMLElement => item instanceof HTMLElement)

    const action = items.find(item => item.classList.contains(styles['SubNav__action-container']))

    const links = items.filter(item => item !== action && item !== overflowRef.current)

    // Reserves room for the action and overflow trigger when links don't fit.
    const updateOverflow = () => {
      if (navigation.clientWidth === 0) {
        setVisibleLinkCount(linkCount)
        return
      }
      const navigationStyles = getComputedStyle(navigation)
      const inlinePadding =
        (Number.parseFloat(navigationStyles.paddingInlineStart) || 0) +
        (Number.parseFloat(navigationStyles.paddingInlineEnd) || 0)
      const gap = Number.parseFloat(navigationStyles.columnGap) || 0
      const availableWidth = navigation.clientWidth - inlinePadding
      const linkWidths = links.map(link => link.getBoundingClientRect().width)
      const actionWidth = action ? action.getBoundingClientRect().width + gap : 0
      const requiredWidth = linkWidths.reduce((total, width) => total + width, 0) + gap * Math.max(0, links.length - 1)

      if (requiredWidth + actionWidth <= availableWidth) {
        setVisibleLinkCount(links.length)
        return
      }

      const overflowWidth = overflowRef.current?.getBoundingClientRect().width ?? 0
      const availableLinkWidth = Math.max(0, availableWidth - actionWidth - overflowWidth)
      let usedWidth = 0
      let nextVisibleLinkCount = 0
      for (const width of linkWidths) {
        if (usedWidth + width + gap > availableLinkWidth) break
        usedWidth += width + gap
        nextVisibleLinkCount++
      }
      setVisibleLinkCount(nextVisibleLinkCount)
      positionOverflowMenu()
    }

    updateOverflow()

    let animationFrameId: number | undefined
    let cancelled = false
    // Batches size changes into one update per frame.
    const scheduleUpdate = () => {
      if (animationFrameId !== undefined) cancelAnimationFrame(animationFrameId)
      animationFrameId = requestAnimationFrame(updateOverflow)
    }

    const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(scheduleUpdate) : undefined
    resizeObserver?.observe(navigation)
    for (const item of items) resizeObserver?.observe(item)

    if (!resizeObserver) {
      // eslint-disable-next-line github/prefer-observers -- Fallback for browsers without ResizeObserver.
      window.addEventListener('resize', scheduleUpdate)
    }

    const fonts = (document as unknown as {fonts?: FontFaceSet}).fonts
    if (fonts) {
      // Checks the widths again once the fonts are ready.
      void (async () => {
        await fonts.ready
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- Cleanup can run before fonts finish loading.
        if (!cancelled) scheduleUpdate()
      })()
    }

    // Stops watching sizes and cancels any queued update.
    return () => {
      cancelled = true
      if (animationFrameId !== undefined) cancelAnimationFrame(animationFrameId)
      resizeObserver?.disconnect()
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [children, isLarge, linkCount, positionOverflowMenu])

  return {
    overlayRef,
    overflowRef,
    overflowButtonRef,
    overflowMenuRef,
    visibleLinkCount,
    hasOverflow,
    isOverflowMenuOpen,
    closeOverflowMenu,
    handleOverflowMenuBlur,
  }
}
