import React, {useCallback, useEffect, useMemo, useRef} from 'react'

import type {PaginationPageType} from '../Pagination/model'
import {useTabs} from '../hooks/useTabs'

type UseMediaPlaylistProps = {
  children: React.ReactNode
  components: MediaPlaylistComponentTypes
  defaultSelectedIndex: number
  onChange?: (selectedIndex: number) => void
  selectedIndex?: number
}

/**
 * Internal only hook used by MediaPlaylist to manage state and behavior.
 * @private
 * @internal
 */
export type MediaPlaylistComponentTypes = {
  Heading: React.ElementType
  Item: React.ElementType
  ItemHeading: React.ElementType
  ItemContent: React.ElementType
  ItemMedia: React.ElementType
}

type MediaPlaylistHeadingChildProps = {
  activeIndex?: number | null
  id?: string
  itemCount?: number
}

type MediaPlaylistItemProps = React.PropsWithChildren<{
  className?: string
  thumbnail?: React.ReactNode
}>

type MediaPlaylistItemChildProps = React.PropsWithChildren<Record<string, unknown>>

type MediaPlaylistItemChild = React.ReactElement<MediaPlaylistItemChildProps>

type MediaPlaylistItemData = {
  className?: string
  content: MediaPlaylistItemChild
  heading: MediaPlaylistItemChild
  media: MediaPlaylistItemChild
  thumbnail?: React.ReactNode
}

/**
 * Internal only hook used by MediaPlaylist to manage state and behavior.
 * @private
 * @internal
 */
export function useMediaPlaylist({
  children,
  components,
  defaultSelectedIndex,
  onChange,
  selectedIndex,
}: UseMediaPlaylistProps) {
  const {headingChild, items} = useMemo(() => getMediaPlaylistChildren(children, components), [children, components])
  const itemCount = items.length
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
    headingChild,
    isItemSelected,
    items,
    setItemRef,
    tabListRef,
  }
}

const createComponentTypeGuard =
  <T>(componentType: React.ElementType) =>
  (element: unknown): element is React.ReactElement<T> =>
    React.isValidElement<T>(element) && element.type === componentType

function getMediaPlaylistChildren(children: React.ReactNode, components: MediaPlaylistComponentTypes) {
  const isHeading = createComponentTypeGuard<MediaPlaylistHeadingChildProps>(components.Heading)
  const isItem = createComponentTypeGuard<MediaPlaylistItemProps>(components.Item)
  const isItemHeading = createComponentTypeGuard<MediaPlaylistItemChildProps>(components.ItemHeading)
  const isItemContent = createComponentTypeGuard<MediaPlaylistItemChildProps>(components.ItemContent)
  const isItemMedia = createComponentTypeGuard<MediaPlaylistItemChildProps>(components.ItemMedia)

  const playlistChildren = {
    headingChild: null as React.ReactElement<MediaPlaylistHeadingChildProps> | null,
    items: [] as MediaPlaylistItemData[],
  }

  for (const child of React.Children.toArray(children)) {
    if (isHeading(child)) {
      playlistChildren.headingChild = child
      continue
    }

    if (!isItem(child)) {
      continue
    }

    const itemChildren = React.Children.toArray(child.props.children)

    const itemParts = {
      heading: null as MediaPlaylistItemChild | null,
      content: null as MediaPlaylistItemChild | null,
      media: null as MediaPlaylistItemChild | null,
    }

    for (const itemChild of itemChildren) {
      if (isItemHeading(itemChild)) {
        itemParts.heading = itemChild
      }

      if (isItemContent(itemChild)) {
        itemParts.content = itemChild
      }

      if (isItemMedia(itemChild)) {
        itemParts.media = itemChild
      }
    }

    if (!itemParts.heading || !itemParts.content || !itemParts.media) {
      continue
    }

    playlistChildren.items.push({
      className: child.props.className,
      content: itemParts.content,
      heading: itemParts.heading,
      media: itemParts.media,
      thumbnail: child.props.thumbnail,
    })
  }

  return playlistChildren
}

const getValidIndex = (index: number, length: number) => {
  if (length < 1) return null

  const normalizedIndex = Number.isFinite(index) ? Math.trunc(index) : 0
  return Math.min(Math.max(normalizedIndex, 0), length - 1)
}
