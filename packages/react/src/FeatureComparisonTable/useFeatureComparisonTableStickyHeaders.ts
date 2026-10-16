import {type RefObject, useState} from 'react'
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect'

export function useFeatureComparisonTableStickyHeaders(
  tableRef: RefObject<HTMLTableElement | null>,
  isWide: boolean,
  hasItems: boolean,
) {
  const [hasStickyHeaders, setHasStickyHeaders] = useState(false)

  useIsomorphicLayoutEffect(() => {
    const table = tableRef.current
    const header = table?.tHead
    if (!isWide || !table || !header) {
      setHasStickyHeaders(false)
      return
    }

    const update = () => {
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight
      const headerHeight = header.getBoundingClientRect().height
      setHasStickyHeaders(
        viewportHeight > 0 && headerHeight < viewportHeight && table.getBoundingClientRect().height > viewportHeight,
      )
    }

    update()
    const resizeObserver = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(update)
    resizeObserver?.observe(table)
    resizeObserver?.observe(header)
    const mutationObserver = new MutationObserver(update)
    mutationObserver.observe(table, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['hidden', 'open'],
    })
    // Viewport-only height changes do not resize the observed table or header.
    // eslint-disable-next-line github/prefer-observers
    window.addEventListener('resize', update)
    const viewport = window.visualViewport
    // eslint-disable-next-line github/prefer-observers
    viewport?.addEventListener('resize', update)

    return () => {
      resizeObserver?.disconnect()
      mutationObserver.disconnect()
      window.removeEventListener('resize', update)
      viewport?.removeEventListener('resize', update)
    }
  }, [tableRef, isWide, hasItems])

  return isWide && hasStickyHeaders
}
