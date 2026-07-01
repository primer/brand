import React, {render, cleanup, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'

import {SubdomainNavBar, SubdomainNavBarSearchResultProps, type SubdomainNavBarProps} from './SubdomainNavBar'
import {axe, toHaveNoViolations} from 'jest-axe'

import {useWindowSize} from '../hooks/useWindowSize'

expect.extend(toHaveNoViolations)

jest.mock('../hooks/useWindowSize')
const mockUseWindowSize = useWindowSize as jest.Mock
mockUseWindowSize.mockImplementation(() => ({isSmall: false, isMedium: false}))

describe('SubdomainNavBar', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  beforeEach(() => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: false, isMedium: false}))

    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = jest.fn()
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    })
    window.IntersectionObserver = mockIntersectionObserver
  })

  const Component = ({
    fullWidth,
    searchResults,
    titleHref,
    title = 'Subdomain',
    variant,
  }: {
    fullWidth?: boolean
    searchResults?: SubdomainNavBarSearchResultProps[]
    titleHref?: string
    title?: string
    variant?: SubdomainNavBarProps['variant']
  }) => (
    <SubdomainNavBar title={title} titleHref={titleHref} fullWidth={fullWidth} variant={variant}>
      <SubdomainNavBar.Link href="#">Collections</SubdomainNavBar.Link>
      <SubdomainNavBar.Link href="#">Topics</SubdomainNavBar.Link>
      <SubdomainNavBar.Link href="#">Articles</SubdomainNavBar.Link>
      <SubdomainNavBar.Link href="#">Events</SubdomainNavBar.Link>
      <SubdomainNavBar.Link href="#">Video</SubdomainNavBar.Link>
      <SubdomainNavBar.Link href="#">Social</SubdomainNavBar.Link>
      <SubdomainNavBar.Search
        searchTerm="devops"
        searchResults={searchResults}
        onChange={jest.fn}
        onSubmit={jest.fn()}
      />
      <SubdomainNavBar.PrimaryAction href="#">Primary CTA</SubdomainNavBar.PrimaryAction>
      <SubdomainNavBar.SecondaryAction href="#">Secondary CTA</SubdomainNavBar.SecondaryAction>
    </SubdomainNavBar>
  )

  it('renders a navigation bar correctly using the right landmarks', () => {
    const {getByRole, getAllByRole} = render(<Component />)

    expect(getByRole('banner')).toBeInTheDocument() // <header>
    expect(getAllByRole('navigation').length > 0).toBeTruthy() // <nav>
  })

  it('has no a11y violations by default', async () => {
    const {container} = render(<Component />)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('renders search results if searchResults are passed', async () => {
    const mockResultsData = [
      {
        title: 'mock title',
        description: 'mock description',
        url: 'https://github.com',
        date: '2022-08-29T00:00+02:00',
      },
    ]

    const {getByTestId, getByRole} = render(<Component searchResults={mockResultsData} />)
    const searchTrigger = getByTestId('toggle-search')

    fireEvent.click(searchTrigger)

    const searchResultsDialog = getByRole('dialog')
    const searchResultsLandmark = getByRole('search')

    expect(searchResultsDialog).toBeInTheDocument()
    expect(searchResultsLandmark).toBeInTheDocument()
  })

  it('applies "/" as the default title href', async () => {
    const {getByRole} = render(<Component />)
    const linkEl = getByRole('link', {name: 'Subdomain home'})

    expect(linkEl).toHaveAttribute('href', '/')
  })

  it('removes the default separator and menu title when title is empty', async () => {
    const {container} = render(<Component title="" />)

    const separator = container.querySelector('.SubdomainNavBar-title-separator')
    const menuTitle = container.querySelector('.SubdomainNavBar-title')

    expect(separator).not.toBeInTheDocument()
    expect(menuTitle).not.toBeInTheDocument()
  })

  it('can apply an alternative href on the title', async () => {
    const mockTitleHref = '/mock-title-href'
    const {getByRole} = render(<Component titleHref={mockTitleHref} />)
    const linkEl = getByRole('link', {name: 'Subdomain home'})

    expect(linkEl).toHaveAttribute('href', mockTitleHref)
  })

  it('applies visual styling logic for fullWidth prop by default', () => {
    const {getByTestId} = render(<Component />)

    const innerContainerEl = getByTestId(SubdomainNavBar.testIds.innerContainer)

    expect(innerContainerEl.classList).toContain(`SubdomainNavBar-inner-container--centered`)
  })

  it('optionally applies removes visual styling logic for fullWidth prop', () => {
    const {getByTestId} = render(<Component fullWidth={true} />)

    const innerContainerEl = getByTestId(SubdomainNavBar.testIds.innerContainer)

    expect(innerContainerEl.classList).not.toContain(`SubdomainNavBar-inner-container--centered`)
  })

  it('does not render a menu toggling button with 0 menu links', () => {
    const {queryByTestId} = render(<SubdomainNavBar title="Subdomain" />)

    const menuButtonEl = queryByTestId(SubdomainNavBar.testIds.menuButton)

    expect(menuButtonEl).toBe(null)
  })

  it('does not render an action container when no actions are provided', () => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: true, isMedium: true}))

    const {container} = render(
      <SubdomainNavBar title="Subdomain" variant="gridline">
        <SubdomainNavBar.Link href="#">Docs</SubdomainNavBar.Link>
      </SubdomainNavBar>,
    )

    const actionContainer = container.querySelector('.SubdomainNavBar-button-area')
    expect(actionContainer).not.toBeInTheDocument()
  })

  it('does not add a trailing border class to search when no actions are provided', () => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: true, isMedium: true}))

    const {getByTestId} = render(
      <SubdomainNavBar title="Subdomain" variant="gridline">
        <SubdomainNavBar.Search searchTerm="docs" onChange={jest.fn} onSubmit={jest.fn()} />
      </SubdomainNavBar>,
    )

    const searchTrigger = getByTestId('toggle-search').parentElement
    expect(searchTrigger).not.toHaveClass('SubdomainNavBar-search-trigger--has-trailing-item')
  })

  it('adds a trailing border class to search when actions follow it', () => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: true, isMedium: true}))

    const {getByTestId} = render(
      <SubdomainNavBar title="Subdomain" variant="gridline">
        <SubdomainNavBar.Search searchTerm="docs" onChange={jest.fn} onSubmit={jest.fn()} />
        <SubdomainNavBar.PrimaryAction href="#">Primary CTA</SubdomainNavBar.PrimaryAction>
      </SubdomainNavBar>,
    )

    const searchTrigger = getByTestId('toggle-search').parentElement
    expect(searchTrigger).toHaveClass('SubdomainNavBar-search-trigger--has-trailing-item')
  })

  it('can append a classname to the root element', () => {
    const mockClass = 'custom-class'
    const {getByTestId} = render(<SubdomainNavBar title="Subdomain" className={mockClass} />)

    const headerEl = getByTestId(SubdomainNavBar.testIds.root)

    expect(headerEl.classList).toContain(mockClass)
  })

  it('renders with default variant by default', () => {
    const {getByTestId} = render(<Component />)

    const headerEl = getByTestId(SubdomainNavBar.testIds.root)
    expect(headerEl).toHaveClass('SubdomainNavBar--variant-default')
    expect(headerEl).not.toHaveClass('SubdomainNavBar--variant-gridline')
  })

  it('renders with gridline variant', () => {
    const {getByTestId} = render(<Component variant="gridline" />)

    const headerEl = getByTestId(SubdomainNavBar.testIds.root)
    expect(headerEl).toHaveClass('SubdomainNavBar--variant-gridline')
    expect(headerEl).not.toHaveClass('SubdomainNavBar--variant-default')
  })

  it('does not render the title separator with gridline variant', () => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: true, isMedium: true}))

    const {container} = render(<Component variant="gridline" />)

    const separator = container.querySelector('.SubdomainNavBar-title-separator')
    expect(separator).not.toBeInTheDocument()
  })

  it('renders live region when search is active', async () => {
    const {getByTestId, getByLabelText} = render(<Component />)
    const searchTrigger = getByTestId('toggle-search')

    fireEvent.click(searchTrigger)

    const liveRegion = getByTestId(SubdomainNavBar.testIds.liveRegion)
    const liveRegionSpace = liveRegion.querySelector('span')
    const searchClose = getByLabelText('Close')

    expect(liveRegion).toBeInTheDocument()
    expect(liveRegionSpace).toBeInTheDocument()

    fireEvent.click(searchClose)

    expect(liveRegion).not.toBeInTheDocument()
  })

  it('renders a trailing icon when the `isExternal` prop is `true`', async () => {
    const {getByRole} = render(
      <SubdomainNavBar title="test">
        <SubdomainNavBar.Link href="#">Collections</SubdomainNavBar.Link>
        <SubdomainNavBar.Link href="#" isExternal>
          Topics
        </SubdomainNavBar.Link>
        <SubdomainNavBar.Link href="#">Articles</SubdomainNavBar.Link>
      </SubdomainNavBar>,
    )

    expect(getByRole('img', {name: 'External link'})).toBeInTheDocument()
  })

  it('calls onNarrowMenuToggle when the mobile menu is toggled', async () => {
    mockUseWindowSize.mockImplementation(() => ({isSmall: true, isMedium: false}))

    const mockonNarrowMenuToggle = jest.fn()
    const {getByTestId} = render(
      <SubdomainNavBar title="test" onNarrowMenuToggle={mockonNarrowMenuToggle}>
        <SubdomainNavBar.Link href="#">Collections</SubdomainNavBar.Link>
        <SubdomainNavBar.Link href="#" isExternal>
          Topics
        </SubdomainNavBar.Link>
        <SubdomainNavBar.Link href="#">Articles</SubdomainNavBar.Link>
      </SubdomainNavBar>,
    )

    const menuButtonEl = getByTestId(SubdomainNavBar.testIds.menuButton)
    fireEvent.click(menuButtonEl)

    expect(mockonNarrowMenuToggle).toHaveBeenCalledWith(true)

    fireEvent.click(menuButtonEl)

    expect(mockonNarrowMenuToggle).toHaveBeenCalledWith(false)
  })
})
