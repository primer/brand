import {useCallback, useEffect, useMemo, useState, type KeyboardEvent, type RefObject} from 'react'

import type {
  SubdomainNavBarSearchResultGroupProps,
  SubdomainNavBarSearchResultProps,
  SubdomainNavBarSearchResults,
} from './SubdomainNavBar'

export type NormalizedSearchResultGroup = {
  title?: string
  results: Array<{
    result: SubdomainNavBarSearchResultProps
    index: number
  }>
}

type UseSearchResultsOptions = {
  active?: boolean
  dialogRef: RefObject<HTMLDialogElement | null>
  searchResults?: SubdomainNavBarSearchResults
  searchTerm?: string
}

function isSearchResultGroup(
  item: SubdomainNavBarSearchResultProps | SubdomainNavBarSearchResultGroupProps,
): item is SubdomainNavBarSearchResultGroupProps {
  return 'results' in item
}

function normalizeSearchResults(searchResults: SubdomainNavBarSearchResults = []): NormalizedSearchResultGroup[] {
  const groups: NormalizedSearchResultGroup[] = []
  let resultIndex = 0

  for (const item of searchResults) {
    if (isSearchResultGroup(item)) {
      if (item.results.length === 0) continue

      groups.push({
        title: item.title,
        results: item.results.map(result => ({
          result,
          index: resultIndex++,
        })),
      })

      continue
    }

    const groupTitle = item.group
    let group = groups.find(existingGroup => existingGroup.title === groupTitle)

    if (!group) {
      group = {
        title: groupTitle,
        results: [],
      }
      groups.push(group)
    }

    group.results.push({
      result: item,
      index: resultIndex++,
    })
  }

  return groups
}

export function useSearchResults({active, dialogRef, searchResults, searchTerm}: UseSearchResultsOptions) {
  const normalizedSearchResultGroups = useMemo(() => normalizeSearchResults(searchResults), [searchResults])
  const hasGroupedSearchResults = normalizedSearchResultGroups.some(group => group.title)
  const searchResultsLength = normalizedSearchResultGroups.reduce((count, group) => count + group.results.length, 0)
  const hasSearchResults = searchResultsLength > 0
  const [activeDescendant, setActiveDescendant] = useState(-1)
  const [liveRegion, setLiveRegion] = useState(false)

  const resetActiveDescendant = useCallback(() => setActiveDescendant(-1), [])

  const handleSearchResultKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      const supportedKeys = ['ArrowDown', 'ArrowUp', 'Enter']
      const dialog = dialogRef.current
      let nextActiveDescendant = activeDescendant

      if (!supportedKeys.includes(event.key) || (event.key === 'Enter' && activeDescendant === -1) || !dialog) {
        return
      }

      event.preventDefault()

      if (event.key === 'ArrowDown') {
        nextActiveDescendant = activeDescendant < searchResultsLength - 1 ? activeDescendant + 1 : -1
        setActiveDescendant(nextActiveDescendant)
      } else if (event.key === 'ArrowUp') {
        nextActiveDescendant = activeDescendant === -1 ? searchResultsLength - 1 : activeDescendant - 1
        setActiveDescendant(nextActiveDescendant)
      }

      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        dialog
          .querySelector(`#subdomainnavbar-search-result-${nextActiveDescendant}`)
          ?.scrollIntoView({block: 'nearest'})
      }

      if (event.key === 'Enter') {
        const link = dialog.querySelector<HTMLAnchorElement>(`#subdomainnavbar-search-result-${activeDescendant}`)
        link?.click()
      }
    },
    [activeDescendant, dialogRef, searchResultsLength],
  )

  useEffect(() => {
    setLiveRegion(true)

    const timeoutId = window.setTimeout(() => {
      if (active) setLiveRegion(false)
    }, 200)

    return () => window.clearTimeout(timeoutId)
  }, [active, searchResultsLength, searchTerm])

  return {
    activeDescendant,
    handleSearchResultKeyDown,
    hasGroupedSearchResults,
    hasSearchResults,
    liveRegion,
    normalizedSearchResultGroups,
    resetActiveDescendant,
    searchResultsLength,
  }
}
