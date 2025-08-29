import React, {MutableRefObject} from 'react'

import {act, render} from '@testing-library/react'
import '@testing-library/jest-dom'

import {useTabs, type UseTabs, type UseTabsOptions} from './useTabs'

jest.mock('../hooks/useId', () => ({
  useId: jest.fn(() => ':xyz:'),
}))

type TestComponentProps = {
  useTabsOptions?: UseTabsOptions
}

/**
 * Heavily inspired by React Testing Library's renderHook function.
 * We've created our own here because:
 * 1. This is the recommended approach in the Testing Library docs:
 *    https://testing-library.com/docs/react-testing-library/api/#renderhook
 * 2. Our useTabs hook requires DOM nodes to function correctly as it uses refs
 *    to register tabs. Rather than mock this, we've created a custom render
 *    function to match real-world usage.
 */
const renderUseTabsHook = (initialOptions?: UseTabsOptions) => {
  const result = React.createRef<UseTabs>() as MutableRefObject<UseTabs>

  const MockTabs = ({useTabsOptions}: TestComponentProps) => {
    const useTabsResult = useTabs(useTabsOptions)

    React.useEffect(() => {
      result.current = useTabsResult
    })

    return (
      <>
        <div {...useTabsResult.getTabListProps({label: 'Test tabs'})}>
          <div {...useTabsResult.getTabProps('test-1')}>Tab 1</div>
          <div {...useTabsResult.getTabProps('test-2')}>Tab 2</div>
          <div {...useTabsResult.getTabProps('test-3')}>Tab 3</div>
        </div>
        <div>
          <div {...useTabsResult.getTabPanelProps('test-1')}>Panel 1</div>
          <div {...useTabsResult.getTabPanelProps('test-2')}>Panel 2</div>
          <div {...useTabsResult.getTabPanelProps('test-3')}>Panel 3</div>
        </div>
      </>
    )
  }

  const {rerender, ...rest} = render(<MockTabs useTabsOptions={initialOptions} />)

  const rerenderWithProps = (props: TestComponentProps) => rerender(<MockTabs {...props} />)

  return {
    result,
    rerender: rerenderWithProps,
    ...rest,
  }
}

const mockKeyboardEvent = (key: string) =>
  ({
    key,
    preventDefault: jest.fn(),
  } as unknown as React.KeyboardEvent<HTMLElement>)

describe('useTabs', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('returns an object with the expected shape', () => {
    const {result} = renderUseTabsHook()

    expect(result.current).toEqual({
      activeTab: expect.any(String),
      focusedTab: null,
      activateTab: expect.any(Function),
      focusTab: expect.any(Function),
      getTabListProps: expect.any(Function),
      getTabProps: expect.any(Function),
      getTabPanelProps: expect.any(Function),
    })
  })

  it('returns an object with the expected shape from getTabListProps when called with no arguments', () => {
    const {result} = renderUseTabsHook()

    const tabListProps = result.current.getTabListProps()

    expect(tabListProps).toEqual({
      role: expect.any(String),
      'aria-orientation': expect.any(String),
    })
  })

  it('returns an object with the expected shape from getTabListProps when called with label', () => {
    const {result} = renderUseTabsHook()

    const tabListProps = result.current.getTabListProps({label: 'Test tabs'})

    expect(tabListProps).toEqual({
      role: expect.any(String),
      'aria-orientation': expect.any(String),
      'aria-label': expect.any(String),
    })
  })

  it('returns an object with the expected shape from getTabListProps when called with labelledBy', () => {
    const {result} = renderUseTabsHook()

    const tabListProps = result.current.getTabListProps({labelledBy: 'heading-id'})

    expect(tabListProps).toEqual({
      role: expect.any(String),
      'aria-orientation': expect.any(String),
      'aria-labelledby': expect.any(String),
    })
  })

  it('returns an object with the expected shape from getTabProps', () => {
    const {result} = renderUseTabsHook()

    const tabProps = result.current.getTabProps('test-1')

    expect(tabProps).toEqual({
      role: expect.any(String),
      id: expect.any(String),
      'aria-controls': expect.any(String),
      'aria-selected': expect.any(Boolean),
      tabIndex: expect.any(Number),
      onClick: expect.any(Function),
      onFocus: expect.any(Function),
      onKeyDown: expect.any(Function),
      ref: expect.any(Function),
    })
  })

  it('returns an object with the expected shape from getTabPanelProps', () => {
    const {result} = renderUseTabsHook()

    const tabPanelProps = result.current.getTabPanelProps('test-1')

    expect(tabPanelProps).toEqual({
      role: expect.any(String),
      id: expect.any(String),
      'aria-labelledby': expect.any(String),
      hidden: expect.any(Boolean),
      tabIndex: expect.any(Number),
    })
  })

  it('activates the first tab when no activeTab is set', () => {
    const {result} = renderUseTabsHook()

    expect(result.current.activeTab).toBe('test-1')
  })

  it("doesn't focus a tab by default", () => {
    const {result} = renderUseTabsHook()

    expect(result.current.focusedTab).toBeNull()
  })

  it('sets the role of the tab list to "tablist"', () => {
    const {result} = renderUseTabsHook()

    const tabListProps = result.current.getTabListProps()

    expect(tabListProps.role).toBe('tablist')
  })

  it('sets the aria-orientation of the tab list to "horizontal" by default', () => {
    const {result} = renderUseTabsHook()

    const tabListProps = result.current.getTabListProps()

    expect(tabListProps['aria-orientation']).toBe('horizontal')
  })

  it('sets the aria-orientation of the tab list to "vertical" when specified', () => {
    const {result} = renderUseTabsHook({orientation: 'vertical'})

    const tabListProps = result.current.getTabListProps()

    expect(tabListProps['aria-orientation']).toBe('vertical')
  })

  it('sets the aria-label of the tab list when label is provided', () => {
    const {result} = renderUseTabsHook()

    const tabListProps = result.current.getTabListProps({label: 'Test tabs'})

    expect(tabListProps['aria-label']).toBe('Test tabs')
  })

  it('sets the aria-labelledby of the tab list when labelledBy is provided', () => {
    const {result} = renderUseTabsHook()

    const tabListProps = result.current.getTabListProps({labelledBy: 'heading-id'})

    expect(tabListProps['aria-labelledby']).toBe('heading-id')
  })

  it('sets the role of a tab to "tab"', () => {
    const {result} = renderUseTabsHook()

    const tabProps = result.current.getTabProps('test-1')

    expect(tabProps.role).toBe('tab')
  })

  it('sets the correct id for the tab', () => {
    const {result} = renderUseTabsHook()

    const tabProps = result.current.getTabProps('test-1')

    expect(tabProps.id).toBe('tabs-:xyz:-tab-test-1')
  })

  it('sets the aria-controls attribute of a tab to the associated tab panel id', () => {
    const {result} = renderUseTabsHook()

    const tabProps = result.current.getTabProps('test-1')

    expect(tabProps['aria-controls']).toBe('tabs-:xyz:-panel-test-1')
  })

  it('sets the aria-selected attribute of an active tab to true', () => {
    const {result} = renderUseTabsHook({defaultTab: 'test-2'})

    const tabProps = result.current.getTabProps('test-2')

    expect(tabProps['aria-selected']).toBe(true)
  })

  it('sets the aria-selected attribute of an inactive tab to false', () => {
    const {result} = renderUseTabsHook({defaultTab: 'test-2'})

    const tabProps = result.current.getTabProps('test-1')

    expect(tabProps['aria-selected']).toBe(false)
  })

  it('sets the tabindex of an active tab to 0', () => {
    const {result} = renderUseTabsHook({defaultTab: 'test-2'})

    const tabProps = result.current.getTabProps('test-2')

    expect(tabProps.tabIndex).toBe(0)
  })

  it('sets the tabindex of an inactive tab to -1', () => {
    const {result} = renderUseTabsHook({defaultTab: 'test-2'})

    const tabProps = result.current.getTabProps('test-1')

    expect(tabProps.tabIndex).toBe(-1)
  })

  it("changes the active tab when an inactive tab's onClick callback is called", () => {
    const {result} = renderUseTabsHook({defaultTab: 'test-1'})

    expect(result.current.activeTab).toBe('test-1')

    const tabProps = result.current.getTabProps('test-2')

    act(() => {
      // @ts-expect-error The type for onClick isn't correct
      tabProps.onClick?.()
    })

    expect(result.current.activeTab).toBe('test-2')
  })

  it("does not change the active tab when an active tab's onClick callback is called", () => {
    const {result} = renderUseTabsHook({defaultTab: 'test-2'})

    expect(result.current.activeTab).toBe('test-2')

    const tabProps = result.current.getTabProps('test-2')

    act(() => {
      // @ts-expect-error The type for onClick isn't correct
      tabProps.onClick?.()
    })

    expect(result.current.activeTab).toBe('test-2')
  })

  it("focuses the tab when an inactive tab's onFocus callback is called", () => {
    const {result} = renderUseTabsHook({defaultTab: 'test-1'})

    expect(result.current.focusedTab).toBeNull()

    const tabProps = result.current.getTabProps('test-2')

    act(() => {
      // @ts-expect-error The type for onFocus isn't correct
      tabProps.onFocus?.()
    })

    expect(result.current.focusedTab).toBe('test-2')
  })

  it("focuses the tab when an active tab's onFocus callback is called", () => {
    const {result} = renderUseTabsHook({defaultTab: 'test-2'})

    expect(result.current.focusedTab).toBeNull()

    const tabProps = result.current.getTabProps('test-2')

    act(() => {
      // @ts-expect-error The type for onFocus isn't correct
      tabProps.onFocus?.()
    })

    expect(result.current.focusedTab).toBe('test-2')
  })

  it('sets the role of a tab panel to "tabpanel"', () => {
    const {result} = renderUseTabsHook()

    const tabPanelProps = result.current.getTabPanelProps('test-1')

    expect(tabPanelProps.role).toBe('tabpanel')
  })

  it('sets the correct id for the tab panel', () => {
    const {result} = renderUseTabsHook()

    const tabPanelProps = result.current.getTabPanelProps('test-1')

    expect(tabPanelProps.id).toBe('tabs-:xyz:-panel-test-1')
  })

  it('sets the aria-labelledby attribute of a tab panel to the associated tab id', () => {
    const {result} = renderUseTabsHook()

    const tabPanelProps = result.current.getTabPanelProps('test-1')

    expect(tabPanelProps['aria-labelledby']).toBe('tabs-:xyz:-tab-test-1')
  })

  it('sets hidden attribute of the active tab panel to false', () => {
    const {result} = renderUseTabsHook({defaultTab: 'test-2'})

    const tabPanelProps = result.current.getTabPanelProps('test-2')

    expect(tabPanelProps.hidden).toBe(false)
  })

  it('sets hidden attribute of the inactive tab panel to true', () => {
    const {result} = renderUseTabsHook({defaultTab: 'test-2'})

    const tabPanelProps = result.current.getTabPanelProps('test-1')

    expect(tabPanelProps.hidden).toBe(true)
  })

  it('sets the tabindex of a tab panel to 0', () => {
    const {result} = renderUseTabsHook()

    const tabPanelProps = result.current.getTabPanelProps('test-1')

    expect(tabPanelProps.tabIndex).toBe(0)
  })

  it('focuses the previous tab when the orientation is horizontal and the left arrow is pressed', () => {
    const {result} = renderUseTabsHook({defaultTab: 'test-2'})

    const tabProps = result.current.getTabProps('test-2')

    act(() => {
      // @ts-expect-error The type for onFocus isn't correct
      tabProps.onFocus?.()
    })

    expect(result.current.focusedTab).toBe('test-2')

    act(() => {
      tabProps.onKeyDown?.(mockKeyboardEvent('ArrowLeft'))
    })

    expect(result.current.focusedTab).toBe('test-1')
  })

  it('focuses the next tab when the orientation is horizontal and the right arrow is pressed', () => {
    const {result} = renderUseTabsHook({defaultTab: 'test-2'})

    const tabProps = result.current.getTabProps('test-2')

    act(() => {
      // @ts-expect-error The type for onFocus isn't correct
      tabProps.onFocus?.()
    })

    expect(result.current.focusedTab).toBe('test-2')

    act(() => {
      tabProps.onKeyDown?.(mockKeyboardEvent('ArrowRight'))
    })

    expect(result.current.focusedTab).toBe('test-3')
  })

  it('focuses the previous tab when the orientation is vertical and the up arrow is pressed', () => {
    const {result} = renderUseTabsHook({defaultTab: 'test-2', orientation: 'vertical'})

    const tabProps = result.current.getTabProps('test-2')

    act(() => {
      // @ts-expect-error The type for onFocus isn't correct
      tabProps.onFocus?.()
    })

    expect(result.current.focusedTab).toBe('test-2')

    act(() => {
      tabProps.onKeyDown?.(mockKeyboardEvent('ArrowUp'))
    })

    expect(result.current.focusedTab).toBe('test-1')
  })

  it('focuses the next tab when the orientation is vertical and the down arrow is pressed', () => {
    const {result} = renderUseTabsHook({defaultTab: 'test-2', orientation: 'vertical'})

    const tabProps = result.current.getTabProps('test-2')

    act(() => {
      // @ts-expect-error The type for onFocus isn't correct
      tabProps.onFocus?.()
    })

    expect(result.current.focusedTab).toBe('test-2')

    act(() => {
      tabProps.onKeyDown?.(mockKeyboardEvent('ArrowDown'))
    })

    expect(result.current.focusedTab).toBe('test-3')
  })

  it('does not change the focused tab when the orientation is horizontal and the up arrow is pressed', () => {
    const {result} = renderUseTabsHook({defaultTab: 'test-2'})

    const tabProps = result.current.getTabProps('test-2')

    act(() => {
      // @ts-expect-error The type for onFocus isn't correct
      tabProps.onFocus?.()
    })

    expect(result.current.focusedTab).toBe('test-2')

    act(() => {
      tabProps.onKeyDown?.(mockKeyboardEvent('ArrowUp'))
    })

    expect(result.current.focusedTab).toBe('test-2')
  })

  it('does not change the focused tab when the orientation is horizontal and the down arrow is pressed', () => {
    const {result} = renderUseTabsHook({defaultTab: 'test-2'})

    const tabProps = result.current.getTabProps('test-2')

    act(() => {
      // @ts-expect-error The type for onFocus isn't correct
      tabProps.onFocus?.()
    })

    expect(result.current.focusedTab).toBe('test-2')

    act(() => {
      tabProps.onKeyDown?.(mockKeyboardEvent('ArrowDown'))
    })

    expect(result.current.focusedTab).toBe('test-2')
  })

  it('does not change the focused tab when the orientation is vertical and the left arrow is pressed', () => {
    const {result} = renderUseTabsHook({defaultTab: 'test-2', orientation: 'vertical'})

    const tabProps = result.current.getTabProps('test-2')

    act(() => {
      // @ts-expect-error The type for onFocus isn't correct
      tabProps.onFocus?.()
    })

    expect(result.current.focusedTab).toBe('test-2')

    act(() => {
      tabProps.onKeyDown?.(mockKeyboardEvent('ArrowLeft'))
    })

    expect(result.current.focusedTab).toBe('test-2')
  })

  it('does not change the focused tab when the orientation is vertical and the right arrow is pressed', () => {
    const {result} = renderUseTabsHook({defaultTab: 'test-2', orientation: 'vertical'})

    const tabProps = result.current.getTabProps('test-2')

    act(() => {
      // @ts-expect-error The type for onFocus isn't correct
      tabProps.onFocus?.()
    })

    expect(result.current.focusedTab).toBe('test-2')

    act(() => {
      tabProps.onKeyDown?.(mockKeyboardEvent('ArrowRight'))
    })

    expect(result.current.focusedTab).toBe('test-2')
  })

  it('focuses the first tab when the home key is pressed', () => {
    const {result} = renderUseTabsHook({defaultTab: 'test-3'})

    const tabProps = result.current.getTabProps('test-3')

    act(() => {
      // @ts-expect-error The type for onFocus isn't correct
      tabProps.onFocus?.()
    })

    expect(result.current.focusedTab).toBe('test-3')

    act(() => {
      tabProps.onKeyDown?.(mockKeyboardEvent('Home'))
    })

    expect(result.current.focusedTab).toBe('test-1')
  })

  it('focuses the last tab when the end key is pressed', () => {
    const {result} = renderUseTabsHook({defaultTab: 'test-1'})

    const tabProps = result.current.getTabProps('test-1')

    act(() => {
      // @ts-expect-error The type for onFocus isn't correct
      tabProps.onFocus?.()
    })

    expect(result.current.focusedTab).toBe('test-1')

    act(() => {
      tabProps.onKeyDown?.(mockKeyboardEvent('End'))
    })

    expect(result.current.focusedTab).toBe('test-3')
  })

  it('focuses the last tab when the orientation is horizontal, the first tab is focused, and the left arrow is pressed', () => {
    const {result} = renderUseTabsHook({defaultTab: 'test-1'})

    const tabProps = result.current.getTabProps('test-1')

    act(() => {
      // @ts-expect-error The type for onFocus isn't correct
      tabProps.onFocus?.()
    })

    expect(result.current.focusedTab).toBe('test-1')

    act(() => {
      tabProps.onKeyDown?.(mockKeyboardEvent('ArrowLeft'))
    })

    expect(result.current.focusedTab).toBe('test-3')
  })

  it('focuses the first tab when the orientation is horizontal, the last tab is focused, and the right arrow is pressed', () => {
    const {result} = renderUseTabsHook({defaultTab: 'test-3'})

    const tabProps = result.current.getTabProps('test-3')

    act(() => {
      // @ts-expect-error The type for onFocus isn't correct
      tabProps.onFocus?.()
    })

    expect(result.current.focusedTab).toBe('test-3')

    act(() => {
      tabProps.onKeyDown?.(mockKeyboardEvent('ArrowRight'))
    })

    expect(result.current.focusedTab).toBe('test-1')
  })

  it('focuses the last tab when the orientation is vertical, the first tab is focused, and the up arrow is pressed', () => {
    const {result} = renderUseTabsHook({defaultTab: 'test-1', orientation: 'vertical'})

    const tabProps = result.current.getTabProps('test-1')

    act(() => {
      // @ts-expect-error The type for onFocus isn't correct
      tabProps.onFocus?.()
    })

    expect(result.current.focusedTab).toBe('test-1')

    act(() => {
      tabProps.onKeyDown?.(mockKeyboardEvent('ArrowUp'))
    })

    expect(result.current.focusedTab).toBe('test-3')
  })

  it('focuses the first tab when the orientation is vertical, the last tab is focused, and the down arrow is pressed', () => {
    const {result} = renderUseTabsHook({defaultTab: 'test-3', orientation: 'vertical'})

    const tabProps = result.current.getTabProps('test-3')

    act(() => {
      // @ts-expect-error The type for onFocus isn't correct
      tabProps.onFocus?.()
    })

    expect(result.current.focusedTab).toBe('test-3')

    act(() => {
      tabProps.onKeyDown?.(mockKeyboardEvent('ArrowDown'))
    })

    expect(result.current.focusedTab).toBe('test-1')
  })

  it('focuses and activates the previous tab when autoActivate is true, the orientation is horizontal, and the left arrow is pressed', () => {
    const {result} = renderUseTabsHook({defaultTab: 'test-2'})

    const tabProps = result.current.getTabProps('test-2')

    act(() => {
      // @ts-expect-error The type for onFocus isn't correct
      tabProps.onFocus?.()
    })

    expect(result.current.focusedTab).toBe('test-2')
    expect(result.current.activeTab).toBe('test-2')

    act(() => {
      tabProps.onKeyDown?.(mockKeyboardEvent('ArrowLeft'))
    })

    expect(result.current.focusedTab).toBe('test-1')
    expect(result.current.activeTab).toBe('test-1')
  })

  it('focuses and activates the next tab when autoActivate is true, the orientation is horizontal, and the right arrow is pressed', () => {
    const {result} = renderUseTabsHook({defaultTab: 'test-2'})

    const tabProps = result.current.getTabProps('test-2')

    act(() => {
      // @ts-expect-error The type for onFocus isn't correct
      tabProps.onFocus?.()
    })

    expect(result.current.focusedTab).toBe('test-2')
    expect(result.current.activeTab).toBe('test-2')

    act(() => {
      tabProps.onKeyDown?.(mockKeyboardEvent('ArrowRight'))
    })

    expect(result.current.focusedTab).toBe('test-3')
    expect(result.current.activeTab).toBe('test-3')
  })

  it('focuses and activates the previous tab when autoActivate is true, the orientation is vertical, and the up arrow is pressed', () => {
    const {result} = renderUseTabsHook({defaultTab: 'test-2', orientation: 'vertical'})

    const tabProps = result.current.getTabProps('test-2')

    act(() => {
      // @ts-expect-error The type for onFocus isn't correct
      tabProps.onFocus?.()
    })

    expect(result.current.focusedTab).toBe('test-2')
    expect(result.current.activeTab).toBe('test-2')

    act(() => {
      tabProps.onKeyDown?.(mockKeyboardEvent('ArrowUp'))
    })

    expect(result.current.focusedTab).toBe('test-1')
    expect(result.current.activeTab).toBe('test-1')
  })

  it('focuses and activates the next tab when autoActivate is true, the orientation is vertical, and the down arrow is pressed', () => {
    const {result} = renderUseTabsHook({defaultTab: 'test-2', orientation: 'vertical'})

    const tabProps = result.current.getTabProps('test-2')

    act(() => {
      // @ts-expect-error The type for onFocus isn't correct
      tabProps.onFocus?.()
    })

    expect(result.current.focusedTab).toBe('test-2')
    expect(result.current.activeTab).toBe('test-2')

    act(() => {
      tabProps.onKeyDown?.(mockKeyboardEvent('ArrowDown'))
    })

    expect(result.current.focusedTab).toBe('test-3')
    expect(result.current.activeTab).toBe('test-3')
  })

  it('focuses and activates the first tab when autoActivate is true and the home key is pressed', () => {
    const {result} = renderUseTabsHook({defaultTab: 'test-3'})

    const tabProps = result.current.getTabProps('test-3')

    act(() => {
      // @ts-expect-error The type for onFocus isn't correct
      tabProps.onFocus?.()
    })

    expect(result.current.focusedTab).toBe('test-3')
    expect(result.current.activeTab).toBe('test-3')

    act(() => {
      tabProps.onKeyDown?.(mockKeyboardEvent('Home'))
    })

    expect(result.current.focusedTab).toBe('test-1')
    expect(result.current.activeTab).toBe('test-1')
  })

  it('focuses and activates the last tab when autoActivate is true and the end key is pressed', () => {
    const {result} = renderUseTabsHook({defaultTab: 'test-1'})

    const tabProps = result.current.getTabProps('test-1')

    act(() => {
      // @ts-expect-error The type for onFocus isn't correct
      tabProps.onFocus?.()
    })

    expect(result.current.focusedTab).toBe('test-1')
    expect(result.current.activeTab).toBe('test-1')

    act(() => {
      tabProps.onKeyDown?.(mockKeyboardEvent('End'))
    })

    expect(result.current.focusedTab).toBe('test-3')
    expect(result.current.activeTab).toBe('test-3')
  })

  it('activates the focused tab when the space key is pressed', () => {
    const {result} = renderUseTabsHook({defaultTab: 'test-1', autoActivate: false})

    const tab2Props = result.current.getTabProps('test-2')

    act(() => {
      // @ts-expect-error The type for onFocus isn't correct
      tab2Props.onFocus?.()
    })

    expect(result.current.focusedTab).toBe('test-2')
    expect(result.current.activeTab).toBe('test-1')

    act(() => {
      tab2Props.onKeyDown?.(mockKeyboardEvent(' '))
    })

    expect(result.current.activeTab).toBe('test-2')
  })

  it('activates the focused tab when the enter key is pressed', () => {
    const {result} = renderUseTabsHook({defaultTab: 'test-1', autoActivate: false})

    const tab2Props = result.current.getTabProps('test-2')

    act(() => {
      // @ts-expect-error The type for onFocus isn't correct
      tab2Props.onFocus?.()
    })

    expect(result.current.focusedTab).toBe('test-2')
    expect(result.current.activeTab).toBe('test-1')

    act(() => {
      tab2Props.onKeyDown?.(mockKeyboardEvent('Enter'))
    })

    expect(result.current.activeTab).toBe('test-2')
  })

  it('changes the active tab when activateTab is called', () => {
    const {result} = renderUseTabsHook({defaultTab: 'test-1'})

    expect(result.current.activeTab).toBe('test-1')

    act(() => {
      result.current.activateTab('test-2')
    })

    expect(result.current.activeTab).toBe('test-2')
  })

  it('changes the focused tab when activateTab is called', () => {
    const {result} = renderUseTabsHook({defaultTab: 'test-1'})

    expect(result.current.focusedTab).toBe(null)

    act(() => {
      result.current.activateTab('test-2')
    })

    expect(result.current.focusedTab).toBe('test-2')
  })

  it('changes the focused tab when focusTab is called', () => {
    const {result} = renderUseTabsHook({defaultTab: 'test-1'})

    expect(result.current.focusedTab).toBe(null)

    act(() => {
      result.current.focusTab('test-2')
    })

    expect(result.current.focusedTab).toBe('test-2')
  })

  it('does not change the active tab when focusTab is called', () => {
    const {result} = renderUseTabsHook({defaultTab: 'test-1'})

    expect(result.current.activeTab).toBe('test-1')

    act(() => {
      result.current.focusTab('test-2')
    })

    expect(result.current.activeTab).toBe('test-1')
  })

  it('calls onTabActivate when activateTab is called with an inactive tab', () => {
    const onTabActivate = jest.fn()
    const {result} = renderUseTabsHook({onTabActivate})

    act(() => {
      result.current.activateTab('test-2')
    })

    expect(onTabActivate).toHaveBeenLastCalledWith('test-2', expect.any(HTMLElement))
  })

  it('does not call onTabActivate when activateTab is called with an active tab', () => {
    const onTabActivate = jest.fn()
    const {result} = renderUseTabsHook({defaultTab: 'test-2', onTabActivate})

    act(() => {
      result.current.activateTab('test-2')
    })

    expect(onTabActivate).not.toHaveBeenCalled()
  })

  it("calls onTabActivate when a tab's onClick callback is called", () => {
    const onTabActivate = jest.fn()
    const {result} = renderUseTabsHook({defaultTab: 'test-1', onTabActivate})

    const tabProps = result.current.getTabProps('test-2')

    act(() => {
      // @ts-expect-error The type for onClick isn't correct
      tabProps.onClick?.()
    })

    expect(onTabActivate).toHaveBeenLastCalledWith('test-2', expect.any(HTMLElement))
  })

  it('calls onTabActivate when the right arrow key is pressed and autoActivate is true', () => {
    const onTabActivate = jest.fn()
    const {result} = renderUseTabsHook({defaultTab: 'test-2', onTabActivate})

    const tabProps = result.current.getTabProps('test-2')

    act(() => {
      // @ts-expect-error The type for onFocus isn't correct
      tabProps.onFocus?.()
    })

    act(() => {
      tabProps.onKeyDown?.(mockKeyboardEvent('ArrowRight'))
    })

    expect(onTabActivate).toHaveBeenLastCalledWith('test-3', expect.any(HTMLElement))
  })

  it('does not call onTabActivate when the right arrow key is pressed and autoActivate is false', () => {
    const onTabActivate = jest.fn()
    const {result} = renderUseTabsHook({defaultTab: 'test-2', onTabActivate, autoActivate: false})

    const tabProps = result.current.getTabProps('test-2')

    act(() => {
      // @ts-expect-error The type for onFocus isn't correct
      tabProps.onFocus?.()
    })

    act(() => {
      tabProps.onKeyDown?.(mockKeyboardEvent('ArrowRight'))
    })

    expect(onTabActivate).not.toHaveBeenCalled()
  })

  it('calls onTabActivate when the space key is pressed and an inactive tab is focused', () => {
    const onTabActivate = jest.fn()
    const {result} = renderUseTabsHook({defaultTab: 'test-1', autoActivate: false, onTabActivate})

    const tabProps = result.current.getTabProps('test-2')

    act(() => {
      // @ts-expect-error The type for onFocus isn't correct
      tabProps.onFocus?.()
    })

    act(() => {
      tabProps.onKeyDown?.(mockKeyboardEvent(' '))
    })

    expect(onTabActivate).toHaveBeenLastCalledWith('test-2', expect.any(HTMLElement))
  })

  it('calls onTabActivate when the Enter key is pressed and an inactive tab is focused', () => {
    const onTabActivate = jest.fn()
    const {result} = renderUseTabsHook({defaultTab: 'test-1', autoActivate: false, onTabActivate})

    const tabProps = result.current.getTabProps('test-2')

    act(() => {
      // @ts-expect-error The type for onFocus isn't correct
      tabProps.onFocus?.()
    })

    act(() => {
      tabProps.onKeyDown?.(mockKeyboardEvent('Enter'))
    })

    expect(onTabActivate).toHaveBeenLastCalledWith('test-2', expect.any(HTMLElement))
  })

  it('does not call onTabActivate when the space key is pressed and an active tab is focused', () => {
    const onTabActivate = jest.fn()
    const {result} = renderUseTabsHook({defaultTab: 'test-2', autoActivate: false, onTabActivate})

    const tabProps = result.current.getTabProps('test-2')

    act(() => {
      // @ts-expect-error The type for onFocus isn't correct
      tabProps.onFocus?.()
    })

    act(() => {
      tabProps.onKeyDown?.(mockKeyboardEvent(' '))
    })

    expect(onTabActivate).not.toHaveBeenCalled()
  })

  it('does not call onTabActivate when the Enter key is pressed and an active tab is focused', () => {
    const onTabActivate = jest.fn()
    const {result} = renderUseTabsHook({defaultTab: 'test-2', autoActivate: false, onTabActivate})

    const tabProps = result.current.getTabProps('test-2')

    act(() => {
      // @ts-expect-error The type for onFocus isn't correct
      tabProps.onFocus?.()
    })

    act(() => {
      tabProps.onKeyDown?.(mockKeyboardEvent('Enter'))
    })

    expect(onTabActivate).not.toHaveBeenCalled()
  })

  it('passes the correct tab element reference to onTabActivate when called', () => {
    const onTabActivate = jest.fn()

    const {result} = renderUseTabsHook({onTabActivate})

    act(() => {
      result.current.activateTab('test-2')
    })

    expect(onTabActivate).toHaveBeenLastCalledWith('test-2', expect.any(HTMLElement))

    const tabElement = onTabActivate.mock.lastCall[1]
    expect(tabElement).toHaveAttribute('id', 'tabs-:xyz:-tab-test-2')
    expect(tabElement).toHaveAttribute('role', 'tab')
  })

  it('responds to the up arrow key when orientation changes from horizontal to vertical', () => {
    const {result, rerender} = renderUseTabsHook({defaultTab: 'test-3', orientation: 'horizontal'})

    const horizontalTabProps = result.current.getTabProps('test-3')

    act(() => {
      // @ts-expect-error The type for onFocus isn't correct
      horizontalTabProps.onFocus?.()
    })

    act(() => {
      horizontalTabProps.onKeyDown?.(mockKeyboardEvent('ArrowLeft'))
    })

    expect(result.current.focusedTab).toBe('test-2')

    rerender({useTabsOptions: {defaultTab: 'test-3', orientation: 'vertical'}})

    const verticalTabProps = result.current.getTabProps('test-2')

    expect(result.current.focusedTab).toBe('test-2')

    act(() => {
      verticalTabProps.onKeyDown?.(mockKeyboardEvent('ArrowLeft'))
    })

    expect(result.current.focusedTab).toBe('test-2')

    act(() => {
      verticalTabProps.onKeyDown?.(mockKeyboardEvent('ArrowUp'))
    })

    expect(result.current.focusedTab).toBe('test-1')
  })

  it('responds to the left arrow key when orientation changes from vertical to horizontal', () => {
    const {result, rerender} = renderUseTabsHook({defaultTab: 'test-3', orientation: 'vertical'})

    const verticalTabProps = result.current.getTabProps('test-3')

    act(() => {
      // @ts-expect-error The type for onFocus isn't correct
      verticalTabProps.onFocus?.()
    })

    act(() => {
      verticalTabProps.onKeyDown?.(mockKeyboardEvent('ArrowUp'))
    })

    expect(result.current.focusedTab).toBe('test-2')

    rerender({useTabsOptions: {defaultTab: 'test-3', orientation: 'horizontal'}})

    const horizontalTabProps = result.current.getTabProps('test-2')

    expect(result.current.focusedTab).toBe('test-2')

    act(() => {
      horizontalTabProps.onKeyDown?.(mockKeyboardEvent('ArrowUp'))
    })

    expect(result.current.focusedTab).toBe('test-2')

    act(() => {
      horizontalTabProps.onKeyDown?.(mockKeyboardEvent('ArrowLeft'))
    })

    expect(result.current.focusedTab).toBe('test-1')
  })

  it('updates the aria-orientation attribute when orientation changes', () => {
    const {result, rerender} = renderUseTabsHook({orientation: 'horizontal'})

    expect(result.current.getTabListProps()['aria-orientation']).toBe('horizontal')

    rerender({useTabsOptions: {orientation: 'vertical'}})

    expect(result.current.getTabListProps()['aria-orientation']).toBe('vertical')
  })

  it('calls element.focus() when focusTab is called', () => {
    const {result, getAllByRole} = renderUseTabsHook({defaultTab: 'test-1'})

    const tab2 = getAllByRole('tab')[1]
    const focusSpy = jest.spyOn(tab2, 'focus')

    act(() => {
      result.current.focusTab('test-2')
    })

    expect(focusSpy).toHaveBeenCalledTimes(1)
  })

  it('calls element.focus() when keyboard navigation occurs', () => {
    const {result, getAllByRole} = renderUseTabsHook({defaultTab: 'test-2'})

    const tabProps = result.current.getTabProps('test-2')

    act(() => {
      // @ts-expect-error The type for onFocus isn't correct
      tabProps.onFocus?.()
    })

    const tab3 = getAllByRole('tab')[2]
    expect(tab3).not.toBeNull()
    const focusSpy = jest.spyOn(tab3, 'focus')

    act(() => {
      tabProps.onKeyDown?.(mockKeyboardEvent('ArrowRight'))
    })

    expect(focusSpy).toHaveBeenCalledTimes(1)
  })

  it('calls preventDefault on arrow key events', () => {
    const {result} = renderUseTabsHook({defaultTab: 'test-2'})

    const tabProps = result.current.getTabProps('test-2')

    act(() => {
      // @ts-expect-error The type for onFocus isn't correct
      tabProps.onFocus?.()
    })

    const leftArrowEvent = mockKeyboardEvent('ArrowLeft')
    const rightArrowEvent = mockKeyboardEvent('ArrowRight')

    act(() => {
      tabProps.onKeyDown?.(leftArrowEvent)
    })

    act(() => {
      tabProps.onKeyDown?.(rightArrowEvent)
    })

    expect(leftArrowEvent.preventDefault).toHaveBeenCalledTimes(1)
    expect(rightArrowEvent.preventDefault).toHaveBeenCalledTimes(1)
  })

  it('calls preventDefault on Home/End key events', () => {
    const {result} = renderUseTabsHook({defaultTab: 'test-2'})

    const tabProps = result.current.getTabProps('test-2')

    act(() => {
      // @ts-expect-error The type for onFocus isn't correct
      tabProps.onFocus?.()
    })

    const homeEvent = mockKeyboardEvent('Home')
    const endEvent = mockKeyboardEvent('End')

    act(() => {
      tabProps.onKeyDown?.(homeEvent)
    })

    act(() => {
      tabProps.onKeyDown?.(endEvent)
    })

    expect(homeEvent.preventDefault).toHaveBeenCalledTimes(1)
    expect(endEvent.preventDefault).toHaveBeenCalledTimes(1)
  })

  it('calls preventDefault on Space/Enter key events when autoActivate is false', () => {
    const {result} = renderUseTabsHook({defaultTab: 'test-1', autoActivate: false})

    const tabProps = result.current.getTabProps('test-2')

    act(() => {
      // @ts-expect-error The type for onFocus isn't correct
      tabProps.onFocus?.()
    })

    const spaceEvent = mockKeyboardEvent(' ')
    const enterEvent = mockKeyboardEvent('Enter')

    act(() => {
      tabProps.onKeyDown?.(spaceEvent)
    })

    act(() => {
      tabProps.onKeyDown?.(enterEvent)
    })

    expect(spaceEvent.preventDefault).toHaveBeenCalledTimes(1)
    expect(enterEvent.preventDefault).toHaveBeenCalledTimes(1)
  })

  it('does not call preventDefault on unhandled key events', () => {
    const {result} = renderUseTabsHook({defaultTab: 'test-2'})

    const tabProps = result.current.getTabProps('test-2')

    act(() => {
      // @ts-expect-error The type for onFocus isn't correct
      tabProps.onFocus?.()
    })

    const tabEvent = mockKeyboardEvent('Tab')
    const escapeEvent = mockKeyboardEvent('Escape')
    const letterEvent = mockKeyboardEvent('a')

    act(() => {
      tabProps.onKeyDown?.(tabEvent)
    })

    act(() => {
      tabProps.onKeyDown?.(escapeEvent)
    })

    act(() => {
      tabProps.onKeyDown?.(letterEvent)
    })

    expect(tabEvent.preventDefault).not.toHaveBeenCalled()
    expect(escapeEvent.preventDefault).not.toHaveBeenCalled()
    expect(letterEvent.preventDefault).not.toHaveBeenCalled()
  })
})
