import {useCallback, useEffect, useRef, useState, type RefObject} from 'react'
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect'
import {useKeyboardEscape} from '../hooks/useKeyboardEscape'
import styles from './AnchorNav.module.css'

export function useAnchorNavNarrowMenu(
  isWide: boolean | undefined,
  innerContainerRef: RefObject<HTMLElement | null>,
  actionRef: RefObject<HTMLElement | null>,
) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isActionFolded, setIsActionFolded] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuLabelRef = useRef<HTMLSpanElement>(null)
  const isNarrow = isWide === false
  const isExpanded = menuOpen && !isWide

  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const toggleMenu = () => setMenuOpen(open => !open)

  useKeyboardEscape(closeMenu)

  useEffect(() => {
    if (isExpanded) {
      document.body.classList.add(styles['AnchorNav--no-bg-scroll'])
    } else {
      document.body.classList.remove(styles['AnchorNav--no-bg-scroll'])
    }
  }, [isExpanded])

  useEffect(() => {
    if (isExpanded) innerContainerRef.current?.querySelector<HTMLElement>('a')?.focus()
  }, [innerContainerRef, isExpanded])

  useEffect(() => {
    const element = innerContainerRef.current
    if (!element || !isExpanded) return

    const handleFocusOut = (event: FocusEvent) => {
      if (!element.contains(event.relatedTarget as Node)) closeMenu()
    }

    element.addEventListener('focusout', handleFocusOut)
    return () => element.removeEventListener('focusout', handleFocusOut)
  }, [closeMenu, innerContainerRef, isExpanded])

  const updateFoldRef = useRef<() => void>(() => {})
  updateFoldRef.current = () => {
    const container = innerContainerRef.current
    const button = menuButtonRef.current
    const label = menuLabelRef.current
    const action = actionRef.current

    if (!isNarrow || !container || !button || !label || !action) {
      setIsActionFolded(false)
      return
    }
    if (isExpanded) return

    const containerStyles = getComputedStyle(container)
    const inlinePadding =
      (Number.parseFloat(containerStyles.paddingInlineStart) || 0) +
      (Number.parseFloat(containerStyles.paddingInlineEnd) || 0)
    const columnGap = Number.parseFloat(containerStyles.columnGap) || 0
    const buttonWidth = button.getBoundingClientRect().width - label.clientWidth + label.scrollWidth
    const actionWidth = action.getBoundingClientRect().width
    setIsActionFolded(buttonWidth + columnGap + actionWidth > container.clientWidth - inlinePadding)
  }

  // Rechecks when rendered label content changes, while the observer effect below stays attached.
  useIsomorphicLayoutEffect(() => {
    updateFoldRef.current()
  })

  useIsomorphicLayoutEffect(() => {
    const container = innerContainerRef.current
    const action = actionRef.current
    if (!isNarrow || isExpanded || !container || !action) return

    let animationFrameId: number | undefined
    let cancelled = false
    const scheduleUpdate = () => {
      if (animationFrameId !== undefined) cancelAnimationFrame(animationFrameId)
      animationFrameId = requestAnimationFrame(() => updateFoldRef.current())
    }

    const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(scheduleUpdate) : undefined
    resizeObserver?.observe(container)
    resizeObserver?.observe(action)

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
  }, [actionRef, innerContainerRef, isExpanded, isNarrow])

  return {
    isExpanded,
    isActionFolded,
    menuButtonRef,
    menuLabelRef,
    closeMenu,
    toggleMenu,
  }
}
