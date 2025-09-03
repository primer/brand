import {useCallback, useState, useRef, type KeyboardEvent} from 'react'
import {useId} from '../hooks/useId'

export type OnTabActivate = (id: string, activeTabRef?: HTMLElement) => void

type Orientation = 'horizontal' | 'vertical'
type TabId = `tabs-${string}-tab-${string}`
type TabPanelId = `tabs-${string}-panel-${string}`

export type UseTabsOptions = {
  defaultTab?: string
  autoActivate?: boolean
  onTabActivate?: OnTabActivate
  orientation?: Orientation
}

export type TabState = {
  activeTab: string | null
  focusedTab: string | null
  tabs: Set<string>
}

type TabListProps = {
  role: 'tablist'
  'aria-orientation': Orientation
}

type TabProps = {
  role: 'tab'
  id: TabId
  'aria-controls': TabPanelId
  'aria-selected': boolean
  tabIndex: 0 | -1
  onClick: () => void
  onKeyDown: (event: KeyboardEvent) => void
  onFocus: () => void
  ref: (element: HTMLElement | null) => void
}

type TabPanelProps = {
  role: 'tabpanel'
  id: TabPanelId
  'aria-labelledby': TabId
  hidden: boolean
  tabIndex: 0
}

type LabelOrLabelledBy = {label: string; labelledBy?: never} | {labelledBy: string; label?: never}

export type UseTabs = {
  activeTab: string | null
  focusedTab: string | null
  activateTab: (id: string) => void
  focusTab: (id: string) => void
  getTabListProps: (props: LabelOrLabelledBy) => TabListProps
  getTabProps: (id: string, externalRef?: React.Ref<HTMLElement>) => TabProps
  getTabPanelProps: (id: string) => TabPanelProps
}

export const useTabs = ({
  defaultTab,
  autoActivate = true,
  orientation = 'horizontal',
  onTabActivate,
}: UseTabsOptions = {}): UseTabs => {
  const uniqueId = useId()
  const [tabState, _setTabState] = useState<TabState>({
    activeTab: defaultTab || null,
    focusedTab: null,
    tabs: new Set(),
  })

  const setTabState = useCallback(
    (updater: (state: TabState) => TabState) => {
      _setTabState(prev => {
        const nextState = updater(prev)

        // Only call onTabActivate when activeTab changes from one tab to another (not on mount)
        if (nextState.activeTab && nextState.activeTab !== prev.activeTab && prev.activeTab !== null) {
          onTabActivate?.(nextState.activeTab, tabRefs.current.get(nextState.activeTab))
        }

        return nextState
      })
    },
    [onTabActivate],
  )

  // Refs to store tab elements for focus management
  const tabRefs = useRef<Map<string, HTMLElement>>(new Map())

  const getTabId = useCallback<(id: string) => TabId>(id => `tabs-${uniqueId}-tab-${id}`, [uniqueId])
  const getPanelId = useCallback<(id: string) => TabPanelId>(id => `tabs-${uniqueId}-panel-${id}`, [uniqueId])

  const registerTab = useCallback(
    (id: string, element: HTMLElement) => {
      if (tabRefs.current.has(id)) {
        return
      }

      tabRefs.current.set(id, element)
      setTabState(prev => ({
        ...prev,
        tabs: new Set([...prev.tabs, id]),
        activeTab: prev.activeTab || id, // Set as active if no active tab
      }))
    },
    [setTabState],
  )

  const focusTab = useCallback(
    (id: string) => {
      tabRefs.current.get(id)?.focus()
    },
    [setTabState],
  )

  const activateTab = useCallback(
    (id: string) => {
      setTabState(prev => ({
        ...prev,
        activeTab: id,
        focusedTab: id,
      }))
    },
    [setTabState],
  )

  const getNextTabIndex = useCallback((index: number, tabs: string[]) => (index + 1) % tabs.length, [])
  const getPrevTabIndex = useCallback((index: number, tabs: string[]) => (index - 1 + tabs.length) % tabs.length, [])

  const onTabKeyDown = useCallback(
    (event: KeyboardEvent, id: string) => {
      const tabs = [...tabState.tabs]
      const currentIndex = tabs.indexOf(id)

      switch (true) {
        case event.key === 'ArrowLeft' && orientation === 'horizontal':
        case event.key === 'ArrowUp' && orientation === 'vertical': {
          event.preventDefault()
          const prevIndex = getPrevTabIndex(currentIndex, tabs)
          const prevTab = tabs[prevIndex]
          focusTab(prevTab)
          if (autoActivate) activateTab(prevTab)
          break
        }

        case event.key === 'ArrowRight' && orientation === 'horizontal':
        case event.key === 'ArrowDown' && orientation === 'vertical': {
          event.preventDefault()
          const nextIndex = getNextTabIndex(currentIndex, tabs)
          const nextTab = tabs[nextIndex]
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
    [tabState.tabs, orientation, getPrevTabIndex, focusTab, autoActivate, activateTab, getNextTabIndex],
  )

  const onTabClick = useCallback(
    (id: string) => {
      activateTab(id)
    },
    [activateTab],
  )

  const onTabFocus = useCallback(
    (id: string) => {
      setTabState(prev => {
        if (prev.focusedTab === id) {
          return prev
        }
        return {
          ...prev,
          focusedTab: id,
        }
      })
    },
    [setTabState],
  )

  const getTabListProps = useCallback<UseTabs['getTabListProps']>(
    ({label, labelledBy}) => ({
      role: 'tablist',
      'aria-orientation': orientation,
      ...(label && {'aria-label': label}),
      ...(labelledBy && {'aria-labelledby': labelledBy}),
    }),
    [orientation],
  )

  const getTabProps = useCallback<UseTabs['getTabProps']>(
    (id: string, externalRef?: React.ForwardedRef<HTMLElement>) => ({
      role: 'tab',
      id: getTabId(id),
      'aria-controls': getPanelId(id),
      'aria-selected': id === tabState.activeTab,
      tabIndex: id === tabState.activeTab ? 0 : -1,
      onClick: () => onTabClick(id),
      onKeyDown: (event: KeyboardEvent) => onTabKeyDown(event, id),
      onFocus: () => onTabFocus(id),
      ref: (element: HTMLElement | null) => {
        if (element) registerTab(id, element)

        if (!externalRef) return
        if (typeof externalRef === 'function') {
          externalRef(element)
          return
        }
        if ('current' in externalRef) {
          externalRef.current = element
          return
        }
      },
    }),
    [tabState.activeTab, getTabId, getPanelId, onTabClick, onTabKeyDown, onTabFocus, registerTab],
  )

  const getTabPanelProps = useCallback<UseTabs['getTabPanelProps']>(
    (id: string) => ({
      role: 'tabpanel',
      id: getPanelId(id),
      'aria-labelledby': getTabId(id),
      hidden: id !== tabState.activeTab,
      tabIndex: 0,
    }),
    [tabState.activeTab, getPanelId, getTabId],
  )

  return {
    activeTab: tabState.activeTab,
    focusedTab: tabState.focusedTab,

    activateTab,
    focusTab,

    getTabListProps,
    getTabProps,
    getTabPanelProps,
  }
}
