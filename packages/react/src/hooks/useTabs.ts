import {useCallback, useState, useRef, type HTMLAttributes, type KeyboardEvent} from 'react'
import {useId} from '@reach/auto-id'

type TabOrientation = 'horizontal' | 'vertical'

type UseTabsOptions = {
  defaultTab?: string
  autoActivate?: boolean
  onTabActivate?: (id: string) => void
  orientation?: TabOrientation
}

type TabState = {
  activeTab: string | null
  focusedTab: string | null
  tabs: Set<string>
}

type TabListProps = {
  label?: string
  labelledBy?: string
}

type UseTabs = {
  activeTab: string | null
  focusedTab: string | null
  activateTab: (id: string) => void
  focusTab: (id: string) => void
  getTabListProps: (props?: TabListProps) => HTMLAttributes<HTMLElement>
  getTabProps: (id: string) => HTMLAttributes<HTMLElement>
  getTabPanelProps: (id: string) => HTMLAttributes<HTMLElement>
}

export const useTabs = ({
  defaultTab,
  autoActivate = true,
  orientation = 'horizontal',
  onTabActivate,
}: UseTabsOptions = {}): UseTabs => {
  const uniqueId = useId()
  const [state, _setState] = useState<TabState>({
    activeTab: defaultTab || null,
    focusedTab: null,
    tabs: new Set(),
  })

  const setState = useCallback(
    (updater: (state: TabState) => TabState) => {
      _setState(prev => {
        const nextState = updater(prev)

        if (nextState.activeTab && nextState.activeTab !== prev.activeTab) {
          onTabActivate?.(nextState.activeTab)
        }

        return nextState
      })
    },
    [onTabActivate],
  )

  // Refs to store tab elements for focus management
  const tabRefs = useRef<Map<string, HTMLElement>>(new Map())

  const getTabId = useCallback((id: string) => `tabs-${uniqueId}-tab-${id}`, [uniqueId])
  const getPanelId = useCallback((id: string) => `tabs-${uniqueId}-panel-${id}`, [uniqueId])

  const registerTab = useCallback(
    (id: string, element: HTMLElement) => {
      if (tabRefs.current.has(id)) {
        return
      }

      tabRefs.current.set(id, element)
      setState(prev => ({
        ...prev,
        tabs: new Set([...prev.tabs, id]),
        activeTab: prev.activeTab || id, // Set as active if no active tab
      }))
    },
    [setState],
  )

  const focusTab = useCallback(
    (id: string) => {
      const element = tabRefs.current.get(id)
      if (element) {
        element.focus()
        setState(prev => ({
          ...prev,
          focusedTab: id,
        }))
      }
    },
    [setState],
  )

  const activateTab = useCallback(
    (id: string) => {
      setState(prev => ({
        ...prev,
        activeTab: id,
        focusedTab: id,
      }))
    },
    [setState],
  )

  const getNextTabIdx = useCallback((idx: number, tabs: string[]) => (idx + 1) % tabs.length, [])
  const getPrevTabIdx = useCallback((idx: number, tabs: string[]) => (idx - 1 + tabs.length) % tabs.length, [])

  const onTabKeyDown = useCallback(
    (event: KeyboardEvent, id: string) => {
      const tabs = [...state.tabs]
      const currentIndex = tabs.indexOf(id)

      switch (true) {
        case event.key === 'ArrowLeft' && orientation === 'horizontal':
        case event.key === 'ArrowUp' && orientation === 'vertical': {
          event.preventDefault()
          const prevIdx = getPrevTabIdx(currentIndex, tabs)
          const prevTab = tabs[prevIdx]
          focusTab(prevTab)
          if (autoActivate) activateTab(prevTab)
          break
        }

        case event.key === 'ArrowRight' && orientation === 'horizontal':
        case event.key === 'ArrowDown' && orientation === 'vertical': {
          event.preventDefault()
          const nextIdx = getNextTabIdx(currentIndex, tabs)
          const nextTab = tabs[nextIdx]
          focusTab(nextTab)
          if (autoActivate) activateTab(nextTab)
          break
        }

        case event.key === 'Home': {
          event.preventDefault()
          focusTab(tabs[0])
          if (autoActivate) activateTab(tabs[0])
          break
        }

        case event.key === 'End': {
          event.preventDefault()
          focusTab(tabs[tabs.length - 1])
          if (autoActivate) activateTab(tabs[tabs.length - 1])
          break
        }

        case event.key === ' ':
        case event.key === 'Enter': {
          event.preventDefault()
          if (!autoActivate) activateTab(id)
          break
        }
      }
    },
    [state.tabs, orientation, getPrevTabIdx, focusTab, autoActivate, activateTab, getNextTabIdx],
  )

  const onTabClick = useCallback(
    (id: string) => {
      activateTab(id)
    },
    [activateTab],
  )

  const onTabFocus = useCallback(
    (id: string) => {
      setState(prev => ({
        ...prev,
        focusedTab: id,
      }))
    },
    [setState],
  )

  const getTabListProps = useCallback(
    ({label, labelledBy}: TabListProps = {}) => ({
      role: 'tablist',
      'aria-orientation': orientation,
      ...(label && {'aria-label': label}),
      ...(labelledBy && {'aria-labelledby': labelledBy}),
    }),
    [orientation],
  )

  const getTabProps = useCallback(
    (id: string) => ({
      role: 'tab',
      id: getTabId(id),
      'aria-controls': getPanelId(id),
      'aria-selected': id === state.activeTab,
      tabIndex: id === state.activeTab ? 0 : -1,
      onClick: () => onTabClick(id),
      onKeyDown: (event: KeyboardEvent) => onTabKeyDown(event, id),
      onFocus: () => onTabFocus(id),
      ref: (element: HTMLElement | null) => {
        if (element) registerTab(id, element)
      },
    }),
    [state.activeTab, getTabId, getPanelId, onTabClick, onTabKeyDown, onTabFocus, registerTab],
  )

  const getTabPanelProps = useCallback(
    (id: string) => ({
      role: 'tabpanel',
      id: getPanelId(id),
      'aria-labelledby': getTabId(id),
      hidden: id !== state.activeTab,
      tabIndex: 0,
    }),
    [state.activeTab, getPanelId, getTabId],
  )

  return {
    activeTab: state.activeTab,
    focusedTab: state.focusedTab,

    activateTab,
    focusTab,

    getTabListProps,
    getTabProps,
    getTabPanelProps,
  }
}
