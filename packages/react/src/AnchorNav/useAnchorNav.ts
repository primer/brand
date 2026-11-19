import {useCallback, useEffect, useRef, useState} from 'react'
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect'

export function useAnchorNav(
  hrefs: string[],
  hideUntilSticky: boolean,
  isPaused: boolean,
  isWide: boolean | undefined,
) {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const rootRef = useRef<HTMLElement | null>(null)
  const [intersectionEntry, setIntersectionEntry] = useState<IntersectionObserverEntry>()
  const [initialYOffset, setInitialYOffset] = useState<undefined | number>()
  const [navShouldFix, setNavShouldFix] = useState(false)
  const [navHeight, setNavHeight] = useState(0)
  const [activeHref, setActiveHref] = useState<string>()
  const selectedHrefRef = useRef<string | undefined>(undefined)
  const wasAtBottomRef = useRef(false)
  const updateRef = useRef<(() => void) | undefined>(undefined)
  const settleTimeoutRef = useRef<number | undefined>(undefined)

  const holdUntilScrollSettles = useCallback(() => {
    window.clearTimeout(settleTimeoutRef.current)
    settleTimeoutRef.current = window.setTimeout(() => {
      settleTimeoutRef.current = undefined
      updateRef.current?.()
    }, 150) // Smooth scrolling reports a scroll every frame, so a longer gap means it has stopped.
  }, [])

  useIsomorphicLayoutEffect(() => {
    const nav = rootRef.current
    // The expanded narrow menu covers the page, so the last result is kept until it closes.
    if (!nav || isPaused) return

    const update = () => {
      const {scrollY, innerHeight} = window
      const navBottom = Math.max(0, nav.getBoundingClientRect().bottom)
      const isAtBottom = scrollY > 0 && Math.ceil(scrollY + innerHeight) >= document.documentElement.scrollHeight - 1
      let reachedHref: string | undefined
      let reachedTop = -Infinity
      let lastVisibleHref: string | undefined
      let lastVisibleTop = -Infinity
      let isSelectedVisible = false

      for (const href of hrefs) {
        const section = document.getElementById(href.replace(/^#/, ''))
        if (!section) continue
        const {top, bottom} = section.getBoundingClientRect()
        const isVisible = top < innerHeight && bottom > navBottom
        // Leaves room for the section's scroll-margin-top and sub-pixel scroll positions.
        if (top <= navBottom + 64 && top > reachedTop) {
          reachedHref = href
          reachedTop = top
        }
        if (isVisible && top > lastVisibleTop) {
          lastVisibleHref = href
          lastVisibleTop = top
        }
        if (isVisible && href === selectedHrefRef.current) isSelectedVisible = true
      }

      const selectedHref = isSelectedVisible ? selectedHrefRef.current : undefined
      // Forgets the selection once its section is reached or the page scrolls up from the bottom.
      if (!isAtBottom && (wasAtBottomRef.current || reachedHref === selectedHrefRef.current)) {
        selectedHrefRef.current = undefined
      }
      wasAtBottomRef.current = isAtBottom
      setActiveHref(isAtBottom ? selectedHref ?? lastVisibleHref ?? reachedHref : reachedHref)
    }

    const handleChange = () => (settleTimeoutRef.current === undefined ? update() : holdUntilScrollSettles())

    if (settleTimeoutRef.current === undefined) update()
    updateRef.current = update
    // eslint-disable-next-line github/prefer-observers -- Section positions change on every scroll.
    window.addEventListener('scroll', handleChange)
    // eslint-disable-next-line github/prefer-observers -- Viewport resizing can move sections without a scroll.
    window.addEventListener('resize', handleChange)

    return () => {
      updateRef.current = undefined
      window.removeEventListener('scroll', handleChange)
      window.removeEventListener('resize', handleChange)
    }
  }, [hrefs, isPaused, rootRef, holdUntilScrollSettles])

  const selectSection = (href: string) => {
    selectedHrefRef.current = href
    setActiveHref(href)
    // Also covers links that don't scroll, such as one at the bottom of the page.
    holdUntilScrollSettles()
  }

  useEffect(() => () => window.clearTimeout(settleTimeoutRef.current), [])

  useEffect(() => {
    if (initialYOffset === undefined && intersectionEntry) {
      setInitialYOffset(intersectionEntry.boundingClientRect.y + window.scrollY)
    }
  }, [initialYOffset, intersectionEntry])

  useEffect(() => {
    const handler = () => {
      if (initialYOffset !== undefined) {
        setNavShouldFix(window.pageYOffset > initialYOffset)
      }
    }
    // eslint-disable-next-line github/prefer-observers
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [initialYOffset])

  useEffect(() => {
    const node = hideUntilSticky ? wrapperRef.current : rootRef.current
    const supportsIntersectionObserver = !!window.IntersectionObserver

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!supportsIntersectionObserver || !node) return

    const observer = new IntersectionObserver(([entry]) => setIntersectionEntry(entry), {
      threshold: 0,
      root: null,
      rootMargin: '0px 0px -100%',
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [hideUntilSticky])

  useEffect(() => {
    if (wrapperRef.current) setNavHeight(wrapperRef.current.offsetHeight)
  }, [isWide])

  return {activeHref, selectSection, wrapperRef, rootRef, navShouldFix, navHeight}
}
