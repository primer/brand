import React, {render, cleanup, fireEvent} from '@testing-library/react'
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
})
