import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {axe, toHaveNoViolations} from 'jest-axe'

import {Footnotes} from './Footnotes'
import {InlineLink} from '../InlineLink'
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

    const {getByRole, getAllByRole, container} = render(
      <Footnotes>
        {items.map((citation, index) => (
          <Footnotes.Item data-testid={`item-${index}`} key={citation}>
            {citation}
          </Footnotes.Item>
        ))}
      </Footnotes>,
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()

    const listEl = getByRole('list')

    expect(listEl).toBeInTheDocument()
    expect(listEl.tagName).toEqual('OL')

    const listItems = getAllByRole('listitem')

    for (const item of items) {
      const el = listItems.find(listitem => listitem.textContent === item) as HTMLElement
      expect(el).toBeInTheDocument()
      expect(el.tagName).toBe('LI')
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

    const visuallyHiddenHeading = getByRole('heading', {name: expectedHeading, level: 2})
    expect(visuallyHiddenHeading).toBeInTheDocument()
    expect(visuallyHiddenHeading.className).toContain('visually-hidden')
  })

  it('appends an icon with an aria-label when href is passed', async () => {
    const mockHref = 'https://github.com'
    const {getByText, getByRole} = render(
      <Footnotes>
        <Footnotes.Item href={mockHref}>{mockItemText}</Footnotes.Item>
      </Footnotes>,
    )

    const itemEl = getByText(mockItemText)
    expect(itemEl).toBeInTheDocument()

    const backLink = getByRole('link', {name: `Back to content ${mockItemText}`})
    expect(backLink).toBeInTheDocument()
    expect(backLink).toHaveAttribute('href', mockHref)

    const iconEl = backLink.querySelector('svg')
    expect(iconEl).toBeInTheDocument()
  })

  it('extracts text content from nested children for aria-label', async () => {
    const mockHref = 'https://github.com'
    const {getByRole} = render(
      <Footnotes>
        <Footnotes.Item href={mockHref}>
          This factor is based on data from the industry&apos;s{' '}
          <InlineLink href="#">longest running analysis</InlineLink> by Acme Corp.
        </Footnotes.Item>
      </Footnotes>,
    )

    const backLink = getByRole('link', {
      name: "Back to content This factor is based on data from the industry's longest running analysis by Acme Corp.",
    })
    expect(backLink).toBeInTheDocument()
  })
})
