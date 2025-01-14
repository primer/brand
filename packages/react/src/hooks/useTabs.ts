import {useCallback, useState, useRef} from 'react'
import {useId} from '@reach/auto-id'

type TabOrientation = 'horizontal' | 'vertical'

type UseTabsOptions = {
  defaultTab?: string
  autoActivate?: boolean
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

export const useTabs = ({defaultTab, autoActivate = true, orientation = 'horizontal'}: UseTabsOptions = {}) => {
  const uniqueId = useId()
  const [state, setState] = useState<TabState>({
    activeTab: defaultTab || null,
    focusedTab: null,
    tabs: new Set(),
  })
  const [currentOrientation, setOrientation] = useState<TabOrientation>(orientation)

  // Refs to store tab elements for focus management
  const tabRefs = useRef<Map<string, HTMLElement>>(new Map())

  const getTabId = useCallback((id: string) => `tabs-${uniqueId}-tab-${id}`, [uniqueId])
  const getPanelId = useCallback((id: string) => `tabs-${uniqueId}-panel-${id}`, [uniqueId])

  const registerTab = useCallback((id: string, element: HTMLElement) => {
    tabRefs.current.set(id, element)
    setState(prev => ({
      ...prev,
      tabs: new Set([...prev.tabs, id]),
      activeTab: prev.activeTab || id, // Set as active if no active tab
    }))

    return () => {
      tabRefs.current.delete(id)
      setState(prev => ({
        ...prev,
        tabs: new Set([...prev.tabs].filter(tabId => tabId !== id)),
      }))
    }
  }, [])

  const focusTab = useCallback((id: string) => {
    const element = tabRefs.current.get(id)
    if (element) {
      element.focus()
      setState(prev => ({
        ...prev,
        focusedTab: id,
      }))
    }
  }, [])

  const activateTab = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      activeTab: id,
      focusedTab: id,
    }))
  }, [])

  const getNextTabIdx = useCallback((idx: number, tabs: string[]) => (idx + 1) % tabs.length, [])
  const getPrevTabIdx = useCallback((idx: number, tabs: string[]) => (idx - 1 + tabs.length) % tabs.length, [])

  const onTabKeyDown = useCallback(
    (event: React.KeyboardEvent, id: string) => {
      const tabs = [...state.tabs]
      const currentIndex = tabs.indexOf(id)

      switch (true) {
        case event.key === 'ArrowLeft' && currentOrientation === 'horizontal':
        case event.key === 'ArrowUp' && currentOrientation === 'vertical': {
          event.preventDefault()
          const prevIdx = getPrevTabIdx(currentIndex, tabs)
          const prevTab = tabs[prevIdx]
          focusTab(prevTab)
          if (autoActivate) activateTab(prevTab)
          break
        }

        case event.key === 'ArrowRight' && currentOrientation === 'horizontal':
        case event.key === 'ArrowDown' && currentOrientation === 'vertical': {
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
    [state.tabs, currentOrientation, getPrevTabIdx, focusTab, autoActivate, activateTab, getNextTabIdx],
  )

  const onTabClick = useCallback(
    (id: string) => {
      activateTab(id)
    },
    [activateTab],
  )

  const onTabFocus = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      focusedTab: id,
    }))
  }, [])

  const getTabListProps = useCallback(
    ({label, labelledBy}: TabListProps = {}) => ({
      role: 'tablist',
      'aria-orientation': currentOrientation,
      ...(label && {'aria-label': label}),
      ...(labelledBy && {'aria-labelledby': labelledBy}),
    }),
    [currentOrientation],
  )

  const getTabProps = useCallback(
    (id: string) => ({
      role: 'tab',
      id: getTabId(id),
      'aria-controls': getPanelId(id),
      'aria-selected': id === state.activeTab,
      tabIndex: id === state.activeTab ? 0 : -1,
      onClick: () => onTabClick(id),
      onKeyDown: (event: React.KeyboardEvent) => onTabKeyDown(event, id),
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
    // State
    activeTab: state.activeTab,
    focusedTab: state.focusedTab,

    // Registration
    registerTab,

    // Event handlers
    onTabKeyDown,
    onTabClick,
    onTabFocus,

    // Prop getters
    getTabListProps,
    getTabProps,
    getTabPanelProps,

    // Actions
    activateTab,
    focusTab,

    // Configuration
    orientation: currentOrientation,
    setOrientation,
  }
}
