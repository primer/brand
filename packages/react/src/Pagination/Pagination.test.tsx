import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
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

  it('applies the correct attributes to the ellipsis button', () => {
    const {getByRole} = render(<Pagination pageCount={10} currentPage={1} />)

    const ellipsisButton = getByRole('presentation')

    expect(ellipsisButton).toHaveTextContent('…')
    expect(ellipsisButton).not.toHaveAttribute('href')
    expect(ellipsisButton).not.toHaveAttribute('aria-current')
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

  it('calls onPageChange when the page changes', async () => {
    const user = userEvent.setup()
    const onPageChange = jest.fn()

    const {getByRole} = render(<Pagination pageCount={5} currentPage={1} onPageChange={onPageChange} />)

    await user.click(getByRole('button', {name: 'Next Page'}))

    expect(onPageChange).toHaveBeenCalledTimes(1)
  })

  it('does not call the onPageChange callback when clicking an ellipsis button', async () => {
    const user = userEvent.setup()
    const onPageChange = jest.fn()

    const {getByRole} = render(<Pagination pageCount={10} currentPage={1} onPageChange={onPageChange} />)
    const ellipsisButton = getByRole('presentation')

    await user.click(ellipsisButton)

    expect(onPageChange).not.toHaveBeenCalled()
  })

  it('applies custom attributes to pagination items correctly using pageAttributesBuilder', () => {
    const customAttributes = n => ({
      'data-custom-attr': `custom-value-${n}`,
      'aria-label': `Go to page ${n}`,
    })

    const {getByRole} = render(<Pagination pageCount={3} currentPage={1} pageAttributesBuilder={customAttributes} />)
    const rootEl = getByRole('navigation')

    const pagedItems = rootEl.querySelectorAll('a')

    for (const [index, item] of pagedItems.entries()) {
      if (index !== 0 && index !== pagedItems.length - 1) {
        expect(item).toHaveAttribute('data-custom-attr', `custom-value-${index}`)
        expect(item).toHaveAttribute('aria-label', `Go to page ${index}`)
      }
    }
  })

  it('focuses the elements in the correct order', async () => {
    const user = userEvent.setup()
    const {getByRole} = render(<Pagination pageCount={10} currentPage={4} />)

    await user.tab()
    expect(getByRole('button', {name: 'Previous Page'})).toHaveFocus()

    await user.tab()
    expect(getByRole('button', {name: 'Page 1'})).toHaveFocus()

    await user.tab()
    expect(getByRole('button', {name: 'Page 2'})).toHaveFocus()

    await user.tab()
    expect(getByRole('button', {name: 'Page 3'})).toHaveFocus()

    await user.tab()
    expect(getByRole('button', {name: 'Page 4'})).toHaveFocus()

    await user.tab()
    expect(getByRole('button', {name: 'Page 5'})).toHaveFocus()

    await user.tab()
    expect(getByRole('button', {name: 'Page 6...'})).toHaveFocus()

    // Note that the ellipsis button is not focusable

    await user.tab()
    expect(getByRole('button', {name: 'Page 10'})).toHaveFocus()

    await user.tab()
    expect(getByRole('button', {name: 'Next Page'})).toHaveFocus()
  })

  it('applies `role="button"` to all items', () => {
    const {getAllByRole} = render(<Pagination pageCount={5} currentPage={1} />)
    expect(getAllByRole('button')).toHaveLength(7) // 5 pages + prev + next
  })

  it('applies the correct "rel" to prev/next buttons', () => {
    const {getByRole} = render(<Pagination pageCount={5} currentPage={1} />)

    expect(getByRole('button', {name: 'Previous Page'})).toHaveAttribute('rel', 'prev')
    expect(getByRole('button', {name: 'Next Page'})).toHaveAttribute('rel', 'next')
  })

  it('does not apply "rel" to page buttons', () => {
    const {getByRole} = render(<Pagination pageCount={5} currentPage={1} />)

    expect(getByRole('button', {name: 'Page 1'})).not.toHaveAttribute('rel')
    expect(getByRole('button', {name: 'Page 2'})).not.toHaveAttribute('rel')
    expect(getByRole('button', {name: 'Page 3'})).not.toHaveAttribute('rel')
    expect(getByRole('button', {name: 'Page 4'})).not.toHaveAttribute('rel')
    expect(getByRole('button', {name: 'Page 5...'})).not.toHaveAttribute('rel')
  })

  it('only applies `aria-current="page"` to the selected page button', () => {
    const {getByRole} = render(<Pagination pageCount={5} currentPage={3} />)

    expect(getByRole('button', {name: 'Previous Page'})).not.toHaveAttribute('aria-current')
    expect(getByRole('button', {name: 'Page 1'})).not.toHaveAttribute('aria-current')
    expect(getByRole('button', {name: 'Page 2'})).not.toHaveAttribute('aria-current')
    expect(getByRole('button', {name: 'Page 3'})).toHaveAttribute('aria-current', 'page')
    expect(getByRole('button', {name: 'Page 4'})).not.toHaveAttribute('aria-current')
    expect(getByRole('button', {name: 'Page 5...'})).not.toHaveAttribute('aria-current')
    expect(getByRole('button', {name: 'Next Page'})).not.toHaveAttribute('aria-current')
  })

  it('applies the correct hrefs to all buttons', () => {
    const {getByRole} = render(<Pagination pageCount={5} currentPage={3} />)

    expect(getByRole('button', {name: 'Previous Page'})).toHaveAttribute('href', '#2')
    expect(getByRole('button', {name: 'Page 1'})).toHaveAttribute('href', '#1')
    expect(getByRole('button', {name: 'Page 2'})).toHaveAttribute('href', '#2')
    expect(getByRole('button', {name: 'Page 3'})).toHaveAttribute('href', '#3')
    expect(getByRole('button', {name: 'Page 4'})).toHaveAttribute('href', '#4')
    expect(getByRole('button', {name: 'Page 5...'})).toHaveAttribute('href', '#5')
    expect(getByRole('button', {name: 'Next Page'})).toHaveAttribute('href', '#4')
  })

  it('sets the correct text content for all buttons', () => {
    const {getByRole} = render(<Pagination pageCount={5} currentPage={3} />)

    expect(getByRole('button', {name: 'Previous Page'})).toHaveTextContent('Previous')
    expect(getByRole('button', {name: 'Page 1'})).toHaveTextContent('1')
    expect(getByRole('button', {name: 'Page 2'})).toHaveTextContent('2')
    expect(getByRole('button', {name: 'Page 3'})).toHaveTextContent('3')
    expect(getByRole('button', {name: 'Page 4'})).toHaveTextContent('4')
    expect(getByRole('button', {name: 'Page 5...'})).toHaveTextContent('5')
    expect(getByRole('button', {name: 'Next Page'})).toHaveTextContent('Next')
  })

  it('sets "aria-disabled" to true for just the "Previous" button when on the first page', () => {
    const {getByRole} = render(<Pagination pageCount={5} currentPage={1} />)

    expect(getByRole('button', {name: 'Previous Page'})).toHaveAttribute('aria-disabled', 'true')
    expect(getByRole('button', {name: 'Page 1'})).not.toHaveAttribute('aria-disabled')
    expect(getByRole('button', {name: 'Page 2'})).not.toHaveAttribute('aria-disabled')
    expect(getByRole('button', {name: 'Page 3'})).not.toHaveAttribute('aria-disabled')
    expect(getByRole('button', {name: 'Page 4'})).not.toHaveAttribute('aria-disabled')
    expect(getByRole('button', {name: 'Page 5...'})).not.toHaveAttribute('aria-disabled')
    expect(getByRole('button', {name: 'Next Page'})).not.toHaveAttribute('aria-disabled')
  })

  it('sets "aria-disabled" to true for just the "Next" button when on the last page', () => {
    const {getByRole} = render(<Pagination pageCount={5} currentPage={5} />)

    expect(getByRole('button', {name: 'Previous Page'})).not.toHaveAttribute('aria-disabled')
    expect(getByRole('button', {name: 'Page 1'})).not.toHaveAttribute('aria-disabled')
    expect(getByRole('button', {name: 'Page 2'})).not.toHaveAttribute('aria-disabled')
    expect(getByRole('button', {name: 'Page 3'})).not.toHaveAttribute('aria-disabled')
    expect(getByRole('button', {name: 'Page 4'})).not.toHaveAttribute('aria-disabled')
    expect(getByRole('button', {name: 'Page 5...'})).not.toHaveAttribute('aria-disabled')
    expect(getByRole('button', {name: 'Next Page'})).toHaveAttribute('aria-disabled', 'true')
  })

  it('removes the "href" from the "Previous" button when on the first page', () => {
    const {getByRole} = render(<Pagination pageCount={5} currentPage={1} />)

    expect(getByRole('button', {name: 'Previous Page'})).not.toHaveAttribute('href')
  })

  it('removes the "href" from the "Next" button when on the last page', () => {
    const {getByRole} = render(<Pagination pageCount={5} currentPage={5} />)

    expect(getByRole('button', {name: 'Next Page'})).not.toHaveAttribute('href')
  })
})
