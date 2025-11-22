import {RefObject, useState, useEffect} from 'react'

export type VisibilityMap = {
  [key: string]: boolean
}

export function useVisibilityObserver(navigationRef: RefObject<HTMLUListElement | null>, children) {
  const [visibilityMap, setVisibilityMap] = useState<VisibilityMap>({})
  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const updatedEntries = {}

    for (const entry of entries) {
      const navitemid = entry.target.getAttribute('data-navitemid')
      if (navitemid) {
        if (entry.isIntersecting) {
          updatedEntries[navitemid] = true
        } else {
          updatedEntries[navitemid] = false
        }
      }
    }

    setVisibilityMap(prev => ({
      ...prev,
      ...updatedEntries,
    }))
  }

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: navigationRef.current,
      threshold: 1,
    })

    if (navigationRef.current) {
      const navItems = Array.from(navigationRef.current.children)

      for (const item of navItems) {
        if (item.getAttribute('data-navitemid')) {
          observer.observe(item)
        }
      }
    }

    return () => observer.disconnect()
  }, [navigationRef, children])

  return [visibilityMap]
}
