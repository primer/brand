import React, {render, cleanup, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'
import {axe, toHaveNoViolations} from 'jest-axe'

import {Pagination} from './Pagination'
import {useWindowSize} from '../hooks/useWindowSize'

jest.mock('../hooks/useWindowSize')
const mockUseWindowSize = useWindowSize as jest.Mock
mockUseWindowSize.mockImplementation(() => ({isMedium: true}))

expect.extend(toHaveNoViolations)

describe('Pagination', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('renders the root element correctly into the document', () => {
    const {getByRole} = render(<Pagination pageCount={5} currentPage={1} />)
    const rootEl = getByRole('navigation')

    const linksAsVerbatimText = Array.from(rootEl.querySelectorAll('a')).map(link => link.textContent)

    expect(rootEl).toBeInTheDocument() // checks it uses a nav element
    expect(linksAsVerbatimText).toEqual(['Previous', '1', '2', '3', '4', '5', 'Next']) // checks it renders the correct number of links, inclusive of prev and next
  })

  it('shows ellipsis just before the final item to reduce pagination links on longer lists, where the first item is selected', () => {
    const {getByRole} = render(<Pagination pageCount={10} currentPage={1} />)
    const rootEl = getByRole('navigation')

    const linksAsVerbatimText = Array.from(rootEl.querySelectorAll('a')).map(link => link.textContent)

    expect(linksAsVerbatimText).toEqual(['Previous', '1', '2', '3', '4', '5', '6', '…', '10', 'Next'])
  })

  it('shows ellipsis just after the first item to reduce pagination links on longer lists, where the final item is selected', () => {
    const {getByRole} = render(<Pagination pageCount={10} currentPage={10} />)
    const rootEl = getByRole('navigation')

    const linksAsVerbatimText = Array.from(rootEl.querySelectorAll('a')).map(link => link.textContent)

    expect(linksAsVerbatimText).toEqual(['Previous', '1', '…', '5', '6', '7', '8', '9', '10', 'Next'])
  })

  it('shows multiple ellipsis on both sides of the current item to reduce pagination links on longer lists, where the middle item is selected', () => {
    const {getByRole} = render(<Pagination pageCount={10} currentPage={5} />)
    const rootEl = getByRole('navigation')

    const linksAsVerbatimText = Array.from(rootEl.querySelectorAll('a')).map(link => link.textContent)
    expect(linksAsVerbatimText).toEqual(['Previous', '1', '…', '3', '4', '5', '6', '7', '…', '10', 'Next'])
  })

  it('can optionally remove paged items', () => {
    const {getByRole} = render(<Pagination pageCount={10} currentPage={5} showPages={false} />)
    const rootEl = getByRole('navigation')
    const linksAsVerbatimText = Array.from(rootEl.querySelectorAll('a')).map(link => link.textContent)
    expect(linksAsVerbatimText).toEqual(['Previous', 'Next'])
  })

  it('can optionally control the href prefix', () => {
    const {getByRole} = render(<Pagination pageCount={3} currentPage={1} hrefBuilder={n => `www.mywebsite.com/${n}`} />)
    const rootEl = getByRole('navigation')

    const pagedItems = Array.from(rootEl.querySelectorAll('a')).slice(1, -1) // remove the previous and next links

    const linksAsVerbatimText = pagedItems.map(link => link.getAttribute('href'))

    expect(linksAsVerbatimText).toEqual(['www.mywebsite.com/1', 'www.mywebsite.com/2', 'www.mywebsite.com/3'])
  })

  it('has no a11y violations on initial render', async () => {
    const {container} = render(<Pagination pageCount={5} currentPage={1} />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('accepts an onchange handler', () => {
    const onChange = jest.fn()
    const {getByRole} = render(<Pagination pageCount={5} currentPage={1} onPageChange={onChange} />)
    const rootEl = getByRole('navigation')

    const nextButton = rootEl.querySelector('a[rel="next"]') as HTMLAnchorElement
    fireEvent.click(nextButton)

    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('can hide paged items at different viewports', () => {
    const {getByRole} = render(
      <Pagination
        pageCount={5}
        currentPage={1}
        showPages={{
          narrow: false,
          regular: true,
          wide: true,
        }}
      />,
    )

    const rootEl = getByRole('navigation')
    const pagedItems = Array.from(rootEl.querySelectorAll('a')).slice(1, -1) // remove the previous and next links

    for (const item of pagedItems) {
      expect(item).toHaveClass('Pagination__hidden-narrow')
      expect(item).toHaveClass('Pagination__visible-regular')
      expect(item).toHaveClass('Pagination__visible-wide')
    }
  })

  it('applies custom attributes to pagination items correctly using pageAttributesBuilder', () => {
    const customAttributes = n => ({
      'data-custom-attr': `custom-value-${n}`,
      'aria-label': `Go to page ${n}`,
    })

    const {getByRole} = render(<Pagination pageCount={3} currentPage={1} pageAttributesBuilder={customAttributes} />)
    const rootEl = getByRole('navigation')

    const pagedItems = Array.from(rootEl.querySelectorAll('a'))

    for (const [index, item] of pagedItems.entries()) {
      if (index !== 0 && index !== pagedItems.length - 1) {
        expect(item).toHaveAttribute('data-custom-attr', `custom-value-${index}`)
        expect(item).toHaveAttribute('aria-label', `Go to page ${index}`)
      }
    }
  })

  it('does not show paged items by default on narrow viewports', () => {
    const {getByRole} = render(<Pagination pageCount={5} currentPage={1} />)

    const button = getByRole('button', {name: 'Page 1'})

    expect(button).toHaveClass('Pagination__hidden-narrow')
    expect(button).toHaveClass('Pagination__visible-regular')
    expect(button).toHaveClass('Pagination__visible-wide')
  })

  it('shows a pagination summary when page numbers are not shown', () => {
    const {getByText} = render(<Pagination pageCount={5} currentPage={1} showPages={false} />)

    expect(getByText('Page 1 of 5')).toBeVisible()
  })

  it('does not show a pagination summary when page numbers are shown', () => {
    const {queryByText} = render(<Pagination pageCount={5} currentPage={1} showPages={true} />)
    expect(queryByText('Page 1 of 5')).toHaveClass('Pagination__hidden')
  })

  it('shows a pagination summary when page numbers are not shown across different viewports', () => {
    const {queryByText} = render(
      <Pagination
        pageCount={10}
        currentPage={3}
        showPages={{
          narrow: true,
          regular: true,
          wide: false,
        }}
      />,
    )

    const summary = queryByText('Page 3 of 10')

    expect(summary).toHaveClass('Pagination__hidden-narrow')
    expect(summary).toHaveClass('Pagination__hidden-regular')
    expect(summary).toHaveClass('Pagination__visible-wide')
  })
})
