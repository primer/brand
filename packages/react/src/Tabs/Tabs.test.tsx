import React from 'react'
import {render, cleanup, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import {Tabs} from './Tabs'
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('Tabs', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        dispatchEvent: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    })

    Object.defineProperty(window, 'ResizeObserver', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      })),
    })

    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      })),
    })

    Object.defineProperty(Element.prototype, 'scrollTo', {
      value: jest.fn(),
      writable: true,
    })
  })

  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('renders correctly into the document', () => {
    const {getByRole, getAllByRole} = render(
      <Tabs aria-label="Test tabs">
        <Tabs.Item>Tab one</Tabs.Item>
        <Tabs.Item>Tab two</Tabs.Item>
        <Tabs.Item>Tab three</Tabs.Item>

        <Tabs.Panel>Panel one</Tabs.Panel>
        <Tabs.Panel>Panel two</Tabs.Panel>
        <Tabs.Panel>Panel three</Tabs.Panel>
      </Tabs>,
    )

    const tabsContainer = getByRole('tablist')
    expect(tabsContainer).toBeInTheDocument()
    expect(tabsContainer).toHaveAttribute('aria-label', 'Test tabs')

    const tabs = getAllByRole('tab')
    expect(tabs).toHaveLength(3)

    const [tabOne, tabTwo, tabThree] = tabs

    expect(tabOne).toHaveTextContent('Tab one')
    expect(tabTwo).toHaveTextContent('Tab two')
    expect(tabThree).toHaveTextContent('Tab three')

    const panels = getAllByRole('tabpanel', {hidden: true})
    expect(panels).toHaveLength(3)

    const [panelOne, panelTwo, panelThree] = panels
    expect(panelOne).toHaveTextContent('Panel one')
    expect(panelOne).toBeVisible()
    expect(panelTwo).toHaveTextContent('Panel two')
    expect(panelTwo).not.toBeVisible()
    expect(panelThree).toHaveTextContent('Panel three')
    expect(panelThree).not.toBeVisible()
  })

  it('has first tab active by default', () => {
    const {getAllByRole} = render(
      <Tabs aria-label="Test tabs">
        <Tabs.Item>Tab one</Tabs.Item>
        <Tabs.Item>Tab two</Tabs.Item>
        <Tabs.Item>Tab three</Tabs.Item>

        <Tabs.Panel>Panel one</Tabs.Panel>
        <Tabs.Panel>Panel two</Tabs.Panel>
        <Tabs.Panel>Panel three</Tabs.Panel>
      </Tabs>,
    )

    const tabs = getAllByRole('tab')
    const panels = getAllByRole('tabpanel', {hidden: true})

    const [tabOne, tabTwo, tabThree] = tabs
    const [panelOne, panelTwo, panelThree] = panels

    expect(tabOne).toHaveAttribute('aria-selected', 'true')
    expect(tabTwo).toHaveAttribute('aria-selected', 'false')
    expect(tabThree).toHaveAttribute('aria-selected', 'false')

    expect(panelOne).not.toHaveAttribute('hidden')
    expect(panelTwo).toHaveAttribute('hidden')
    expect(panelThree).toHaveAttribute('hidden')
  })

  it('supports setting default active tab', () => {
    const {getAllByRole} = render(
      <Tabs aria-label="Test tabs" defaultActiveTab="2">
        <Tabs.Item>Tab one</Tabs.Item>
        <Tabs.Item>Tab two</Tabs.Item>
        <Tabs.Item>Tab three</Tabs.Item>

        <Tabs.Panel>Panel one</Tabs.Panel>
        <Tabs.Panel>Panel two</Tabs.Panel>
        <Tabs.Panel>Panel three</Tabs.Panel>
      </Tabs>,
    )

    const tabs = getAllByRole('tab')
    const panels = getAllByRole('tabpanel', {hidden: true})

    const [tabOne, tabTwo, tabThree] = tabs
    const [panelOne, panelTwo, panelThree] = panels

    expect(tabOne).toHaveAttribute('aria-selected', 'false')
    expect(tabTwo).toHaveAttribute('aria-selected', 'false')
    expect(tabThree).toHaveAttribute('aria-selected', 'true')

    expect(panelOne).toHaveAttribute('hidden')
    expect(panelTwo).toHaveAttribute('hidden')
    expect(panelThree).not.toHaveAttribute('hidden')
  })

  it('switches tabs when clicked', async () => {
    const user = userEvent.setup()

    const {getAllByRole} = render(
      <Tabs aria-label="Test tabs">
        <Tabs.Item>Tab one</Tabs.Item>
        <Tabs.Item>Tab two</Tabs.Item>
        <Tabs.Item>Tab three</Tabs.Item>

        <Tabs.Panel>Panel one</Tabs.Panel>
        <Tabs.Panel>Panel two</Tabs.Panel>
        <Tabs.Panel>Panel three</Tabs.Panel>
      </Tabs>,
    )

    const tabs = getAllByRole('tab')
    const panels = getAllByRole('tabpanel', {hidden: true})

    const [tabOne, tabTwo, tabThree] = tabs
    const [panelOne, panelTwo, panelThree] = panels

    // Click second tab
    await user.click(tabTwo)

    expect(tabOne).toHaveAttribute('aria-selected', 'false')
    expect(tabTwo).toHaveAttribute('aria-selected', 'true')
    expect(tabThree).toHaveAttribute('aria-selected', 'false')

    expect(panelOne).toHaveAttribute('hidden')
    expect(panelTwo).not.toHaveAttribute('hidden')
    expect(panelThree).toHaveAttribute('hidden')
  })

  it('calls onChange callback when tab changes', async () => {
    const user = userEvent.setup()
    const mockChangeHandler = jest.fn()

    const {getAllByRole} = render(
      <Tabs aria-label="Test tabs" onChange={mockChangeHandler}>
        <Tabs.Item>Tab one</Tabs.Item>
        <Tabs.Item>Tab two</Tabs.Item>
        <Tabs.Item>Tab three</Tabs.Item>

        <Tabs.Panel>Panel one</Tabs.Panel>
        <Tabs.Panel>Panel two</Tabs.Panel>
        <Tabs.Panel>Panel three</Tabs.Panel>
      </Tabs>,
    )

    const tabs = getAllByRole('tab')
    const [, tabTwo, tabThree] = tabs

    await user.click(tabTwo)
    expect(mockChangeHandler).toHaveBeenCalledTimes(1)
    expect(mockChangeHandler.mock.lastCall[0]).toBe('1')

    await user.click(tabThree)
    expect(mockChangeHandler).toHaveBeenCalledTimes(2)
    expect(mockChangeHandler.mock.lastCall[0]).toBe('2')
  })

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup()

    const {getAllByRole} = render(
      <Tabs aria-label="Test tabs">
        <Tabs.Item>Tab one</Tabs.Item>
        <Tabs.Item>Tab two</Tabs.Item>
        <Tabs.Item>Tab three</Tabs.Item>

        <Tabs.Panel>Panel one</Tabs.Panel>
        <Tabs.Panel>Panel two</Tabs.Panel>
        <Tabs.Panel>Panel three</Tabs.Panel>
      </Tabs>,
    )

    const tabs = getAllByRole('tab')
    const [tabOne, tabTwo, tabThree] = tabs

    // Focus first tab and use arrow keys
    act(() => {
      tabOne.focus()
    })

    await user.keyboard('{ArrowRight}')
    expect(tabTwo).toHaveAttribute('aria-selected', 'true')

    await user.keyboard('{ArrowRight}')
    expect(tabThree).toHaveAttribute('aria-selected', 'true')

    await user.keyboard('{ArrowLeft}')
    expect(tabTwo).toHaveAttribute('aria-selected', 'true')
  })

  it('renders default variant correctly', () => {
    const {getByRole} = render(
      <Tabs aria-label="Test tabs" variant="default">
        <Tabs.Item>Tab one</Tabs.Item>
        <Tabs.Panel>Panel one</Tabs.Panel>
      </Tabs>,
    )

    const tabsContainer = getByRole('tablist')
    expect(tabsContainer).toHaveClass('Tabs--default')
  })

  it('renders accent variant correctly', () => {
    const {getByRole} = render(
      <Tabs aria-label="Test tabs" variant="accent">
        <Tabs.Item>Tab one</Tabs.Item>
        <Tabs.Panel>Panel one</Tabs.Panel>
      </Tabs>,
    )

    const tabsContainer = getByRole('tablist')
    expect(tabsContainer).toHaveClass('Tabs--accent')
  })

  it('renders underline variant correctly', () => {
    const {getByRole} = render(
      <Tabs aria-label="Test tabs" variant="underline">
        <Tabs.Item>Tab one</Tabs.Item>
        <Tabs.Panel>Panel one</Tabs.Panel>
      </Tabs>,
    )

    const tabsContainer = getByRole('tablist')
    expect(tabsContainer).toHaveClass('Tabs--underline')
  })

  it('renders center alignment by default', () => {
    const {container} = render(
      <Tabs aria-label="Test tabs">
        <Tabs.Item>Tab one</Tabs.Item>
        <Tabs.Panel>Panel one</Tabs.Panel>
      </Tabs>,
    )

    const tabsWrapper = container.querySelector('.Tabs-container')
    expect(tabsWrapper).toHaveClass('Tabs-container--align-center')
  })

  it('renders start alignment optionally', () => {
    const {container} = render(
      <Tabs aria-label="Test tabs" align="start">
        <Tabs.Item>Tab one</Tabs.Item>
        <Tabs.Panel>Panel one</Tabs.Panel>
      </Tabs>,
    )

    const tabsWrapper = container.querySelector('.Tabs-container')
    expect(tabsWrapper).toHaveClass('Tabs-container--align-start')
  })

  it('doesnt render navigation controls when there are fewer than 3 tabs', () => {
    const {queryByTestId} = render(
      <Tabs aria-label="Test tabs">
        <Tabs.Item>Tab one</Tabs.Item>
        <Tabs.Item>Tab two</Tabs.Item>
        <Tabs.Panel>Panel one</Tabs.Panel>
        <Tabs.Panel>Panel two</Tabs.Panel>
      </Tabs>,
    )

    expect(queryByTestId(Tabs.testIds.indicators)).not.toBeInTheDocument()
  })

  it('renders navigation controls when there are 3 or more tabs', () => {
    const {queryByTestId, getByRole} = render(
      <Tabs aria-label="Test tabs">
        <Tabs.Item>Tab one</Tabs.Item>
        <Tabs.Item>Tab two</Tabs.Item>
        <Tabs.Item>Tab three</Tabs.Item>
        <Tabs.Panel>Panel one</Tabs.Panel>
        <Tabs.Panel>Panel two</Tabs.Panel>
        <Tabs.Panel>Panel three</Tabs.Panel>
      </Tabs>,
    )

    // Should show controls with 3+ tabs
    const indicaatorsEl = queryByTestId(Tabs.testIds.indicators)
    expect(indicaatorsEl).toBeInTheDocument()

    const prevButton = getByRole('button', {name: 'Previous tab'})
    const nextButton = getByRole('button', {name: 'Next tab'})

    expect(prevButton).toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()
  })

  it('has navigation controls that work correctly', async () => {
    const user = userEvent.setup()
    const mockChangeHandler = jest.fn()

    const {getByRole} = render(
      <Tabs aria-label="Test tabs" onChange={mockChangeHandler}>
        <Tabs.Item>Tab one</Tabs.Item>
        <Tabs.Item>Tab two</Tabs.Item>
        <Tabs.Item>Tab three</Tabs.Item>
        <Tabs.Panel>Panel one</Tabs.Panel>
        <Tabs.Panel>Panel two</Tabs.Panel>
        <Tabs.Panel>Panel three</Tabs.Panel>
      </Tabs>,
    )

    const prevButton = getByRole('button', {name: 'Previous tab'})
    const nextButton = getByRole('button', {name: 'Next tab'})

    await user.click(nextButton)
    expect(mockChangeHandler).toHaveBeenCalledTimes(1)
    expect(mockChangeHandler.mock.lastCall[0]).toBe('1')

    await user.click(nextButton)
    expect(mockChangeHandler).toHaveBeenCalledTimes(2)
    expect(mockChangeHandler.mock.lastCall[0]).toBe('2')

    await user.click(prevButton)
    expect(mockChangeHandler).toHaveBeenCalledTimes(3)
    expect(mockChangeHandler.mock.lastCall[0]).toBe('1')
  })

  it('supports custom internal accessible labels for l10n', () => {
    const customLabels = {
      controlsNext: 'Go to next tab',
      controlsPrev: 'Go to previous tab',
    }

    const {getByRole} = render(
      <Tabs aria-label="Test tabs" internalAccessibleLabels={customLabels}>
        <Tabs.Item>Tab one</Tabs.Item>
        <Tabs.Item>Tab two</Tabs.Item>
        <Tabs.Item>Tab three</Tabs.Item>
        <Tabs.Panel>Panel one</Tabs.Panel>
        <Tabs.Panel>Panel two</Tabs.Panel>
        <Tabs.Panel>Panel three</Tabs.Panel>
      </Tabs>,
    )

    const prevButton = getByRole('button', {name: 'Go to previous tab'})
    const nextButton = getByRole('button', {name: 'Go to next tab'})

    expect(prevButton).toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()
  })

  it('applies custom className if needed', () => {
    const {getByTestId} = render(
      <Tabs aria-label="Test tabs" className="custom-class">
        <Tabs.Item>Tab one</Tabs.Item>
        <Tabs.Panel>Panel one</Tabs.Panel>
      </Tabs>,
    )

    const tabsContainer = getByTestId('Tabs')
    expect(tabsContainer).toHaveClass('custom-class')
    expect(tabsContainer).toHaveClass('Tabs-container') // also doesn't overwrite the base class
  })

  it('supports RefObject for the root Tabs component', () => {
    const refObject = React.createRef<HTMLDivElement>()

    const {getByTestId} = render(
      <Tabs ref={refObject} aria-label="Test tabs">
        <Tabs.Item>Tab one</Tabs.Item>
        <Tabs.Panel>Panel one</Tabs.Panel>
      </Tabs>,
    )

    const tabsElement = getByTestId(Tabs.testIds.root)
    expect(refObject.current).toBe(tabsElement)
  })

  it('supports RefObject for Tabs.Item child component', () => {
    const refObject = React.createRef<HTMLButtonElement>()

    const {getAllByRole} = render(
      <Tabs aria-label="Test tabs">
        <Tabs.Item ref={refObject}>Tab one</Tabs.Item>
        <Tabs.Item>Tab two</Tabs.Item>
        <Tabs.Panel>Panel one</Tabs.Panel>
        <Tabs.Panel>Panel two</Tabs.Panel>
      </Tabs>,
    )

    const tabs = getAllByRole('tab')
    const [tabOne] = tabs

    expect(refObject.current).toBe(tabOne)
  })

  it('has no a11y violations', async () => {
    const {container} = render(
      <Tabs aria-label="Test tabs">
        <Tabs.Item>Tab one</Tabs.Item>
        <Tabs.Item>Tab two</Tabs.Item>
        <Tabs.Item>Tab three</Tabs.Item>
        <Tabs.Item>Tab four</Tabs.Item>
        <Tabs.Item>Tab five</Tabs.Item>

        <Tabs.Panel>Panel one</Tabs.Panel>
        <Tabs.Panel>Panel two</Tabs.Panel>
        <Tabs.Panel>Panel three</Tabs.Panel>
        <Tabs.Panel>Panel four</Tabs.Panel>
        <Tabs.Panel>Panel five</Tabs.Panel>
      </Tabs>,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has the correct ARIA attributes describing relationships between tabs and panels', () => {
    const {getAllByRole} = render(
      <Tabs aria-label="Test tabs">
        <Tabs.Item>Tab one</Tabs.Item>
        <Tabs.Item>Tab two</Tabs.Item>
        <Tabs.Item>Tab three</Tabs.Item>

        <Tabs.Panel>Panel one</Tabs.Panel>
        <Tabs.Panel>Panel two</Tabs.Panel>
        <Tabs.Panel>Panel three</Tabs.Panel>
      </Tabs>,
    )

    const tabs = getAllByRole('tab')
    const panels = getAllByRole('tabpanel', {hidden: true})

    const [tabOne, tabTwo, tabThree] = tabs
    const [panelOne, panelTwo, panelThree] = panels

    expect(tabOne.getAttribute('aria-controls')).toBe(panelOne.id)
    expect(tabTwo.getAttribute('aria-controls')).toBe(panelTwo.id)
    expect(tabThree.getAttribute('aria-controls')).toBe(panelThree.id)

    expect(panelOne.getAttribute('aria-labelledby')).toBe(tabOne.id)
    expect(panelTwo.getAttribute('aria-labelledby')).toBe(tabTwo.id)
    expect(panelThree.getAttribute('aria-labelledby')).toBe(tabThree.id)

    expect(panelOne).toHaveAttribute('tabIndex', '0')
    expect(panelTwo).toHaveAttribute('tabIndex', '0')
    expect(panelThree).toHaveAttribute('tabIndex', '0')
  })
})
