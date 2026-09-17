import {RefObject, useCallback, useEffect, useState} from 'react'

import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect'

export type VisibilityMap = {
  [key: string]: boolean
}

function visibilityMapsAreEqual(current: VisibilityMap, next: VisibilityMap) {
  const currentKeys = Object.keys(current)
  const nextKeys = Object.keys(next)

  return currentKeys.length === nextKeys.length && nextKeys.every(key => current[key] === next[key])
}

export function useVisibilityObserver(
  navigationRef: RefObject<HTMLUListElement | null>,
  overflowRef: RefObject<HTMLElement | null>,
  measurementKey: string,
  disabled = false,
) {
  const [visibilityMap, setVisibilityMap] = useState<VisibilityMap>({})

  const updateVisibilityMap = useCallback(() => {
    const navigation = navigationRef.current

    if (disabled || !navigation) {
      setVisibilityMap(prev => (Object.keys(prev).length === 0 ? prev : {}))
      return
    }

    const navItems = Array.from(navigation.children).filter(
      (item): item is HTMLElement => item instanceof HTMLElement && item !== overflowRef.current,
    )

    if (navItems.length === 0) {
      setVisibilityMap(prev => (Object.keys(prev).length === 0 ? prev : {}))
      return
    }

    const navigationStyles = window.getComputedStyle(navigation)
    const inlinePadding =
      (Number.parseFloat(navigationStyles.paddingInlineStart) || 0) +
      (Number.parseFloat(navigationStyles.paddingInlineEnd) || 0)
    const availableWidth = Math.max(0, navigation.clientWidth - inlinePadding)
    const navItemsWidth = navItems.reduce((width, item) => width + item.offsetWidth, 0)

    if (navItemsWidth <= availableWidth) {
      const nextVisibilityMap = navItems.reduce<VisibilityMap>((nextMap, _item, index) => {
        nextMap[index] = true
        return nextMap
      }, {})

      setVisibilityMap(prev => (visibilityMapsAreEqual(prev, nextVisibilityMap) ? prev : nextVisibilityMap))
      return
    }

    const availableWidthWithOverflow = Math.max(0, availableWidth - (overflowRef.current?.offsetWidth ?? 0))
    let visibleItemsWidth = 0
    let hasOverflowedItem = false

    const nextVisibilityMap = navItems.reduce<VisibilityMap>((nextMap, item, index) => {
      if (hasOverflowedItem) {
        nextMap[index] = false
        return nextMap
      }

      const nextVisibleItemsWidth = visibleItemsWidth + item.offsetWidth
      const isVisible = nextVisibleItemsWidth <= availableWidthWithOverflow

      if (isVisible) {
        visibleItemsWidth = nextVisibleItemsWidth
      } else {
        hasOverflowedItem = true
      }

      nextMap[index] = isVisible
      return nextMap
    }, {})

    setVisibilityMap(prev => (visibilityMapsAreEqual(prev, nextVisibilityMap) ? prev : nextVisibilityMap))
  }, [disabled, navigationRef, overflowRef])

  useIsomorphicLayoutEffect(() => {
    updateVisibilityMap()
  }, [measurementKey, updateVisibilityMap])

  useEffect(() => {
    const navigation = navigationRef.current
    if (disabled || !navigation) return

    let animationFrameId: number | undefined
    let cancelled = false

    const scheduleVisibilityUpdate = () => {
      if (animationFrameId !== undefined) {
        cancelAnimationFrame(animationFrameId)
      }

      animationFrameId = requestAnimationFrame(updateVisibilityMap)
    }

    const resizeObserver =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(scheduleVisibilityUpdate) : undefined

    resizeObserver?.observe(navigation)

    for (const item of Array.from(navigation.children)) {
      if (item instanceof HTMLElement && item !== overflowRef.current) {
        resizeObserver?.observe(item)
      }
    }

    if (overflowRef.current) {
      resizeObserver?.observe(overflowRef.current)
    }

    if (!resizeObserver) {
      // eslint-disable-next-line github/prefer-observers -- This is the fallback path when ResizeObserver is unavailable.
      window.addEventListener('resize', scheduleVisibilityUpdate)
    }

    scheduleVisibilityUpdate()

    const fonts = (document as unknown as {fonts?: FontFaceSet}).fonts
    if (fonts) {
      void (async () => {
        await fonts.ready
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- Cleanup can run before font loading resolves.
        if (!cancelled) {
          scheduleVisibilityUpdate()
        }
      })()
    }

    return () => {
      cancelled = true
      if (animationFrameId !== undefined) {
        cancelAnimationFrame(animationFrameId)
      }
      resizeObserver?.disconnect()
      if (!resizeObserver) {
        window.removeEventListener('resize', scheduleVisibilityUpdate)
      }
    }
  }, [disabled, measurementKey, navigationRef, overflowRef, updateVisibilityMap])

  useEffect(() => {
    if (disabled) {
      setVisibilityMap(prev => (Object.keys(prev).length === 0 ? prev : {}))
    }
  }, [disabled])

  return [visibilityMap]
}
