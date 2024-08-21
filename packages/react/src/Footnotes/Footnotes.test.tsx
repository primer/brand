import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {axe, toHaveNoViolations} from 'jest-axe'

import {Footnotes} from './Footnotes'
import '../test-utils/mocks/match-media-mock'

expect.extend(toHaveNoViolations)

describe('Footnotes', () => {
  const mockItemText = 'There are now 100 million developers around the world using GitHub.'

  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('renders the default footnotes correctly', async () => {
    const items = ['Citation 1', 'Citation 2', 'Citation 3']

    const {getByTestId, container} = render(
      <Footnotes data-testid="footnotes">
        {items.map((citation, index) => (
          <Footnotes.Item data-testid={`item-${index}`} key={citation}>
            {citation}
          </Footnotes.Item>
        ))}
      </Footnotes>,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()

    const rootEl = getByTestId('footnotes')

    expect(rootEl).toBeInTheDocument()
    expect(rootEl.tagName).toEqual('OL')

    let index = 0
    for (const item of items) {
      const itemEl = getByTestId(`item-${index}`)
      expect(itemEl).toHaveTextContent(item)
      expect(itemEl).toBeInTheDocument()
      expect(itemEl.tagName).toEqual('LI')
      index++
    }
  })

  it('renders the disclaimer footnote variant correctly', async () => {
    const items = ['Paragraph 1', 'Paragraph 2', 'Paragraph 3']

    const {getByText, getByTestId, container} = render(
      <Footnotes as="div" data-testid="footnotes">
        {items.map(paragraph => (
          <Footnotes.Item key={paragraph}>{paragraph}</Footnotes.Item>
        ))}
      </Footnotes>,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()

    const rootEl = getByTestId('footnotes')

    expect(rootEl).toBeInTheDocument()
    expect(rootEl.tagName).toEqual('DIV')

    for (const item of items) {
      const itemEl = getByText(item)
      expect(itemEl).toBeInTheDocument()
      expect(itemEl.tagName).toEqual('P')
    }
  })

  it('renders the a visually hidden title by default', async () => {
    const expectedHeading = 'Footnotes'
    const {getByRole} = render(
      <Footnotes>
        <Footnotes.Item>{mockItemText}</Footnotes.Item>
      </Footnotes>,
    )

    const visuallyHiddenHeading = getByRole('heading', {name: expectedHeading})
    expect(visuallyHiddenHeading).toBeInTheDocument()
    expect(visuallyHiddenHeading.tagName).toEqual('H2')
    expect(visuallyHiddenHeading.className).toContain('visually-hidden')
  })

  it('appends an icon with an aria-label when href is passed', async () => {
    const mockHref = 'https://github.com'
    const {getByText} = render(
      <Footnotes>
        <Footnotes.Item href={mockHref}>{mockItemText} </Footnotes.Item>
      </Footnotes>,
    )

    const itemEl = getByText(mockItemText)
    expect(itemEl).toBeInTheDocument()

    const iconLinkEl = itemEl.querySelector('a')
    expect(iconLinkEl).toBeInTheDocument()

    expect(iconLinkEl).toHaveAttribute('href', mockHref)
    expect(iconLinkEl).toHaveAttribute('aria-label', 'Back to content')

    const iconEl = iconLinkEl?.querySelector('svg')
    expect(iconEl).toBeInTheDocument()
  })
})
