import {useCallback, useEffect, useRef, useState, type FocusEvent, type ReactNode, type RefObject} from 'react'
import {getAnchoredPosition} from '@primer/behaviors'
import {isSupported, isPolyfilled, apply} from '@oddbird/popover-polyfill/fn'
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect'

export function useAnchorNavWideMenu(
  children: ReactNode,
  isWide: boolean | undefined,
  linkCount: number,
  activeIndex: number,
  innerContainerRef: RefObject<HTMLElement | null>,
  actionRef: RefObject<HTMLElement | null>,
) {
  const linksRef = useRef<HTMLUListElement>(null)
  const overflowRef = useRef<HTMLLIElement>(null)
  const overflowButtonRef = useRef<HTMLButtonElement>(null)
  const overflowMenuRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLSpanElement>(null)
  const previousIndexRef = useRef<number | undefined>(undefined)
  const [visibleLinkCount, setVisibleLinkCount] = useState(linkCount)
  const [isOverflowMenuOpen, setIsOverflowMenuOpen] = useState(false)
  const hasOverflow = Boolean(isWide) && visibleLinkCount < linkCount
  const hasActiveOverflow = hasOverflow && activeIndex >= visibleLinkCount
  const activeItemIndex = isWide && activeIndex >= 0 ? (hasActiveOverflow ? linkCount : activeIndex) : undefined

  const closeOverflowMenu = useCallback(() => {
    const menu = overflowMenuRef.current
    if (menu?.matches(':popover-open')) menu.hidePopover()
  }, [])

  const positionOverflowMenu = useCallback(() => {
    const menu = overflowMenuRef.current
    const anchor = overflowRef.current
    if (!menu || !anchor || !menu.matches(':popover-open')) return

    const nativePopover = !isPolyfilled()
    // A zero offset puts the menu's top border on the bar's bottom border.
    let {top, left} = getAnchoredPosition(menu, anchor, {
      align: 'end',
      side: 'outside-bottom',
      anchorOffset: 0,
      displayInViewport: nativePopover,
    })
    if (nativePopover) {
      const bodyRect = document.body.getBoundingClientRect()
      const bodyStyles = getComputedStyle(document.body)
      top += bodyRect.top + window.scrollY + (Number.parseInt(bodyStyles.borderTopWidth, 10) || 0)
      left += bodyRect.left + window.scrollX + (Number.parseInt(bodyStyles.borderLeftWidth, 10) || 0)
    }
    menu.style.top = `${top}px`
    menu.style.left = `${left}px`
  }, [])

  useIsomorphicLayoutEffect(() => {
    if (!isSupported()) apply()
    const menu = overflowMenuRef.current
    if (!menu) return
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

  const handleOverflowMenuBlur = (event: FocusEvent<HTMLLIElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) closeOverflowMenu()
  }

  useEffect(() => {
    if (!hasOverflow) {
      closeOverflowMenu()
      setIsOverflowMenuOpen(false)
    }
  }, [closeOverflowMenu, hasOverflow, visibleLinkCount])

  useEffect(() => {
    if (!isOverflowMenuOpen) return
    // eslint-disable-next-line github/prefer-observers
    document.addEventListener('scroll', positionOverflowMenu, true)
    // eslint-disable-next-line github/prefer-observers -- Viewport resizing can move the anchor without resizing the bar.
    window.addEventListener('resize', positionOverflowMenu)
    return () => {
      document.removeEventListener('scroll', positionOverflowMenu, true)
      window.removeEventListener('resize', positionOverflowMenu)
    }
  }, [isOverflowMenuOpen, positionOverflowMenu])

  useIsomorphicLayoutEffect(positionOverflowMenu, [children, visibleLinkCount, positionOverflowMenu])

  useIsomorphicLayoutEffect(() => {
    const container = innerContainerRef.current
    const navigation = linksRef.current

    if (!isWide || !container || !navigation) {
      setVisibleLinkCount(linkCount)
      return
    }

    const links = Array.from(navigation.children).filter(
      (item): item is HTMLElement => item instanceof HTMLElement && item !== overflowRef.current,
    )

    const updateOverflow = () => {
      if (container.clientWidth === 0) {
        setVisibleLinkCount(linkCount)
        return
      }
      const containerStyles = getComputedStyle(container)
      const inlinePadding =
        (Number.parseFloat(containerStyles.paddingInlineStart) || 0) +
        (Number.parseFloat(containerStyles.paddingInlineEnd) || 0)
      const columnGap = Number.parseFloat(containerStyles.columnGap) || 0
      const gap = Number.parseFloat(getComputedStyle(navigation).columnGap) || 0
      const actionWidth = actionRef.current?.getBoundingClientRect().width ?? 0
      const availableWidth = Math.max(0, container.clientWidth - inlinePadding - 2 * (actionWidth + columnGap))
      const linkWidths = links.map(link => link.getBoundingClientRect().width)
      const requiredWidth = linkWidths.reduce((total, width) => total + width, 0) + gap * Math.max(0, links.length - 1)

      if (requiredWidth <= availableWidth) {
        setVisibleLinkCount(links.length)
        return
      }

      const overflowWidth = overflowRef.current?.getBoundingClientRect().width ?? 0
      const availableLinkWidth = Math.max(0, availableWidth - overflowWidth)
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
    const scheduleUpdate = () => {
      if (animationFrameId !== undefined) cancelAnimationFrame(animationFrameId)
      animationFrameId = requestAnimationFrame(updateOverflow)
    }

    const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(scheduleUpdate) : undefined
    resizeObserver?.observe(container)
    for (const item of Array.from(navigation.children)) resizeObserver?.observe(item)
    if (actionRef.current) resizeObserver?.observe(actionRef.current)

    if (!resizeObserver) {
      // eslint-disable-next-line github/prefer-observers -- Fallback for browsers without ResizeObserver.
      window.addEventListener('resize', scheduleUpdate)
    }

    const fonts = (document as unknown as {fonts?: FontFaceSet}).fonts
    if (fonts) {
      void (async () => {
        await fonts.ready
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- Cleanup can run before fonts finish loading.
        if (!cancelled) scheduleUpdate()
      })()
    }

    return () => {
      cancelled = true
      if (animationFrameId !== undefined) cancelAnimationFrame(animationFrameId)
      resizeObserver?.disconnect()
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [actionRef, children, innerContainerRef, isWide, linkCount, positionOverflowMenu])

  useIsomorphicLayoutEffect(() => {
    const indicator = indicatorRef.current
    const container = innerContainerRef.current
    const links = linksRef.current
    const previousIndex = previousIndexRef.current
    previousIndexRef.current = activeItemIndex
    if (!indicator || !container || !links || activeItemIndex === undefined) return

    const moveIndicator = (shouldSlide: boolean) => {
      const target = links.children.item(activeItemIndex)?.firstElementChild
      const label = target?.firstElementChild
      if (!target || !label) return

      const containerRect = container.getBoundingClientRect()
      const targetRect = target.getBoundingClientRect()
      const labelRect = label.getBoundingClientRect()
      const isRtl = getComputedStyle(container).direction === 'rtl'
      const position = {
        '--anchorNav-indicator-x': `${
          isRtl ? labelRect.right - containerRect.right : labelRect.left - containerRect.left
        }px`,
        '--anchorNav-indicator-y': `${targetRect.bottom - containerRect.top - indicator.offsetHeight}px`,
        '--anchorNav-indicator-size': `${labelRect.width}px`,
      }
      const hasMoved = Object.entries(position).some(
        ([property, value]) => indicator.style.getPropertyValue(property) !== value,
      )
      if (!hasMoved) return

      if (!shouldSlide) indicator.style.transitionProperty = 'opacity'
      for (const [property, value] of Object.entries(position)) indicator.style.setProperty(property, value)
      if (!shouldSlide) {
        indicator.getBoundingClientRect()
        indicator.style.removeProperty('transition-property')
      }
    }

    moveIndicator(previousIndex !== undefined && previousIndex !== activeItemIndex)

    const resizeObserver =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => moveIndicator(false)) : undefined
    resizeObserver?.observe(container)
    resizeObserver?.observe(links)
    return () => resizeObserver?.disconnect()
  }, [activeItemIndex, innerContainerRef])

  return {
    linksRef,
    overflowRef,
    overflowButtonRef,
    overflowMenuRef,
    indicatorRef,
    visibleLinkCount,
    hasOverflow,
    hasActiveOverflow,
    activeItemIndex,
    isOverflowMenuOpen,
    closeOverflowMenu,
    handleOverflowMenuBlur,
  }
}
