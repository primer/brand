import React, {useCallback, useEffect, useRef} from 'react'

import type {PaginationPageType} from '../Pagination/model'
import {useTabs} from '../hooks/useTabs'

type UseMediaPlaylistProps = {
  defaultSelectedIndex: number
  itemCount: number
  onChange?: (selectedIndex: number) => void
  selectedIndex?: number
}

export function useMediaPlaylist({defaultSelectedIndex, itemCount, onChange, selectedIndex}: UseMediaPlaylistProps) {
  const defaultActiveIndex = getValidIndex(defaultSelectedIndex, itemCount)

  const controlledActiveIndex =
    typeof selectedIndex === 'number' && Number.isFinite(selectedIndex) ? getValidIndex(selectedIndex, itemCount) : null

  const initialActiveIndex = controlledActiveIndex ?? defaultActiveIndex
  const initialActiveTab = initialActiveIndex === null ? undefined : String(initialActiveIndex)
  const hasOverflowItems = itemCount > 3
  const tabListRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Array<HTMLDivElement | null>>([])
  const suppressOnTabActivateRef = useRef(false)

  const scrollListToIndex = useCallback((index: number) => {
    const tabList = tabListRef.current
    const item = itemRefs.current[index]

    if (!tabList || !item || typeof tabList.scrollTo !== 'function') return

    tabList.scrollTo({
      top: Math.max(0, item.offsetTop - tabList.offsetTop),
      behavior: 'smooth',
    })
  }, [])

  const handleTabActivate = useCallback(
    (id: string) => {
      const nextIndex = Number(id)
      if (Number.isNaN(nextIndex)) return

      if (hasOverflowItems) {
        scrollListToIndex(nextIndex)
      }

      if (suppressOnTabActivateRef.current) {
        suppressOnTabActivateRef.current = false
        return
      }

      onChange?.(nextIndex)
    },
    [hasOverflowItems, onChange, scrollListToIndex],
  )

  const {activeTab, activateTab, getTabListProps, getTabPanelProps, getTabProps} = useTabs({
    defaultTab: initialActiveTab,
    onTabActivate: handleTabActivate,
    orientation: 'vertical',
  })

  const activeIndex = activeTab === null ? initialActiveIndex : getValidIndex(Number(activeTab), itemCount)
  const currentItemPage = activeIndex === null ? 1 : activeIndex + 1

  useEffect(() => {
    if (controlledActiveIndex === null) return

    const controlledTab = String(controlledActiveIndex)
    if (activeTab !== controlledTab) {
      suppressOnTabActivateRef.current = true
      activateTab(controlledTab)
    }
  }, [activateTab, activeTab, controlledActiveIndex])

  useEffect(() => {
    if (activeIndex === null || activeTab === String(activeIndex)) return

    suppressOnTabActivateRef.current = true
    activateTab(String(activeIndex))
  }, [activateTab, activeIndex, activeTab])

  const handlePageChange = useCallback(
    (event: React.MouseEvent, page: number) => {
      event.preventDefault()

      const nextIndex = getValidIndex(page - 1, itemCount)
      if (nextIndex === null) return

      scrollListToIndex(nextIndex)

      if (activeTab !== String(nextIndex)) {
        activateTab(String(nextIndex))
      }
    },
    [activateTab, activeTab, itemCount, scrollListToIndex],
  )

  const isItemSelected = useCallback((index: number) => activeTab === String(index), [activeTab])

  const setItemRef = useCallback((index: number, element: HTMLDivElement | null) => {
    itemRefs.current[index] = element
  }, [])

  const getPaginationAttributes = useCallback((pageNumber: number, page: PaginationPageType) => {
    switch (page.type) {
      case 'PREV':
        return {'aria-label': 'Previous video'}
      case 'NEXT':
        return {'aria-label': 'Next video'}
      case 'NUM': {
        const attributes: {[key: string]: string} = {'aria-label': `Video ${pageNumber}`}

        if (page.selected) {
          attributes['aria-current'] = 'step'
        }

        return attributes
      }
      case 'BREAK':
        return {}
    }
  }, [])

  return {
    activeIndex,
    currentItemPage,
    getPaginationAttributes,
    getTabListProps,
    getTabPanelProps,
    getTabProps,
    handlePageChange,
    hasOverflowItems,
    isItemSelected,
    setItemRef,
    tabListRef,
  }
}

const getValidIndex = (index: number, length: number) => {
  if (length < 1) return null

  const normalizedIndex = Number.isFinite(index) ? Math.trunc(index) : 0
  return Math.min(Math.max(normalizedIndex, 0), length - 1)
}
