import React, {render, cleanup, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'

import {SubdomainNavBar, SubdomainNavBarSearchResultProps} from './SubdomainNavBar'
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('SubdomainNavBar', () => {
  afterEach(cleanup)

  beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = jest.fn()
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    })
    window.IntersectionObserver = mockIntersectionObserver
  })

  const Component = ({
    fullWidth,
    searchResults,
    titleHref
  }: {
    fullWidth?: boolean
    searchResults?: SubdomainNavBarSearchResultProps[]
    titleHref?: string
  }) => (
    <SubdomainNavBar title="Subdomain" titleHref={titleHref} fullWidth={fullWidth}>
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
    expect(getByRole('search')).toBeInTheDocument() // role="search"
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
        date: '2022-08-29T00:00+02:00'
      }
    ]

    const {getByTestId, getByLabelText} = render(<Component searchResults={mockResultsData} />)
    const searchTrigger = getByTestId('toggle-search')

    fireEvent.click(searchTrigger)

    const searchResultsDialog = getByLabelText('search menu dialog')

    expect(searchResultsDialog).toBeInTheDocument()
  })

  it('applies "/" as the default title href', async () => {
    const {getByRole} = render(<Component />)
    const linkEl = getByRole('link', {name: 'Subdomain home'})

    expect(linkEl).toHaveAttribute('href', '/')
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
})
