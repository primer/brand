import React, {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom'

import {SectionIntroStacked} from './SectionIntroStacked'
import {axe, toHaveNoViolations} from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('SectionIntroStacked', () => {
  const mockHeading = 'Mock heading'
  const mockLinkText = 'Call to action'

  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('renders correctly into the document', () => {
    const expectedClass = 'SectionIntroStacked'
    const mockTestId = 'test'

    const {getByTestId} = render(
      <SectionIntroStacked data-testid={mockTestId}>
        <SectionIntroStacked.Heading>Where the most ambitious teams build great things</SectionIntroStacked.Heading>
        <SectionIntroStacked.Link href="#">Link</SectionIntroStacked.Link>
        <SectionIntroStacked.Items>
          <SectionIntroStacked.Item>
            <b>Feature one</b> with detailed description
          </SectionIntroStacked.Item>
          <SectionIntroStacked.Item>
            <b>Feature two</b> with detailed description
          </SectionIntroStacked.Item>
        </SectionIntroStacked.Items>
      </SectionIntroStacked>,
    )

    const SectionIntroStackedEl = getByTestId(mockTestId)
    expect(SectionIntroStackedEl.classList).toContain(expectedClass)
  })

  it('renders the correct default heading type', () => {
    const expectedTag = 'h2'
    const headingText = 'This is your heading'

    const {getByText} = render(
      <SectionIntroStacked>
        <SectionIntroStacked.Heading>{headingText}</SectionIntroStacked.Heading>
        <SectionIntroStacked.Link href="#">Call to action</SectionIntroStacked.Link>
        <SectionIntroStacked.Items>
          <SectionIntroStacked.Item>
            <b>Feature one</b> with detailed description
          </SectionIntroStacked.Item>
        </SectionIntroStacked.Items>
      </SectionIntroStacked>,
    )
    const ctaHeaderEl = getByText(headingText)
    expect(ctaHeaderEl.tagName).toBe(expectedTag.toUpperCase())
  })

  it('renders the correct heading level when an override is used', () => {
    const expectedTag = 'h3'
    const headingText = 'This is your heading'

    const {getByText} = render(
      <SectionIntroStacked>
        <SectionIntroStacked.Heading as={expectedTag}>{headingText}</SectionIntroStacked.Heading>
        <SectionIntroStacked.Link href="#">Call to action</SectionIntroStacked.Link>
        <SectionIntroStacked.Items>
          <SectionIntroStacked.Item>
            <b>Feature one</b> with detailed description
          </SectionIntroStacked.Item>
        </SectionIntroStacked.Items>
      </SectionIntroStacked>,
    )
    const ctaHeaderEl = getByText(headingText)
    expect(ctaHeaderEl.tagName).toBe(expectedTag.toUpperCase())
  })

  it('renders the heading correctly into the document', () => {
    const {getByText} = render(
      <SectionIntroStacked>
        <SectionIntroStacked.Heading>{mockHeading}</SectionIntroStacked.Heading>
        <SectionIntroStacked.Link href="#">Call to action</SectionIntroStacked.Link>
        <SectionIntroStacked.Items>
          <SectionIntroStacked.Item>
            <b>Feature one</b> with detailed description
          </SectionIntroStacked.Item>
        </SectionIntroStacked.Items>
      </SectionIntroStacked>,
    )

    const headingEl = getByText(mockHeading)

    expect(headingEl).toBeInTheDocument()
  })

  it('renders all elements correctly into the document', () => {
    const {getByText} = render(
      <SectionIntroStacked>
        <SectionIntroStacked.Heading>{mockHeading}</SectionIntroStacked.Heading>
        <SectionIntroStacked.Link href="#">{mockLinkText}</SectionIntroStacked.Link>
        <SectionIntroStacked.Items>
          <SectionIntroStacked.Item>
            <b>Feature one</b> with detailed description
          </SectionIntroStacked.Item>
        </SectionIntroStacked.Items>
      </SectionIntroStacked>,
    )

    const headingEl = getByText(mockHeading)
    const linkEl = getByText(mockLinkText)

    expect(headingEl).toBeInTheDocument()
    expect(linkEl).toBeInTheDocument()
  })

  test('renders the default color as muted if <b> or <em> is passed as a child', () => {
    const {getAllByRole} = render(
      <SectionIntroStacked>
        <SectionIntroStacked.Heading>
          <b>Expressive headline</b> about an exclusive set of features.
        </SectionIntroStacked.Heading>
        <SectionIntroStacked.Link href="#">Call to action</SectionIntroStacked.Link>
        <SectionIntroStacked.Items>
          <SectionIntroStacked.Item>
            <b>Feature one</b> with detailed description
          </SectionIntroStacked.Item>
        </SectionIntroStacked.Items>
      </SectionIntroStacked>,
    )

    const headingEls = getAllByRole('heading')

    for (const headingEl of headingEls) {
      expect(headingEl).toHaveClass(`SectionIntroStacked-heading--muted`)
    }
  })

  test('renders the default color as text-default if a non-<b> or non-<em> child is passed', () => {
    const {getByRole} = render(
      <SectionIntroStacked>
        <SectionIntroStacked.Heading>
          <span>Expressive headline</span> about an exclusive set of features.
        </SectionIntroStacked.Heading>
        <SectionIntroStacked.Link href="#">Call to action</SectionIntroStacked.Link>
        <SectionIntroStacked.Items>
          <SectionIntroStacked.Item>
            <b>Feature one</b> with detailed description
          </SectionIntroStacked.Item>
        </SectionIntroStacked.Items>
      </SectionIntroStacked>,
    )
    const headingEl = getByRole('heading')

    expect(headingEl).not.toHaveClass(`SectionIntroStacked-heading--muted`)
  })

  it('has no a11y violations', async () => {
    const {container} = render(
      <SectionIntroStacked>
        <SectionIntroStacked.Heading>{mockHeading}</SectionIntroStacked.Heading>
        <SectionIntroStacked.Link href="#">{mockLinkText}</SectionIntroStacked.Link>
        <SectionIntroStacked.Items>
          <SectionIntroStacked.Item>
            <b>Feature one</b> with detailed description
          </SectionIntroStacked.Item>
          <SectionIntroStacked.Item>
            <b>Feature two</b> with detailed description
          </SectionIntroStacked.Item>
        </SectionIntroStacked.Items>
      </SectionIntroStacked>,
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('renders the items as a semantic unordered list', () => {
    const {getByRole} = render(
      <SectionIntroStacked>
        <SectionIntroStacked.Heading>Test heading</SectionIntroStacked.Heading>
        <SectionIntroStacked.Link href="#">Test link</SectionIntroStacked.Link>
        <SectionIntroStacked.Items>
          <SectionIntroStacked.Item>First item</SectionIntroStacked.Item>
          <SectionIntroStacked.Item>Second item</SectionIntroStacked.Item>
        </SectionIntroStacked.Items>
      </SectionIntroStacked>,
    )

    const listEl = getByRole('list')
    expect(listEl).toHaveClass('SectionIntroStacked-items')
  })

  it('renders items as semantic list items', () => {
    const {getAllByRole} = render(
      <SectionIntroStacked>
        <SectionIntroStacked.Heading>Test heading</SectionIntroStacked.Heading>
        <SectionIntroStacked.Link href="#">Test link</SectionIntroStacked.Link>
        <SectionIntroStacked.Items>
          <SectionIntroStacked.Item>First item</SectionIntroStacked.Item>
          <SectionIntroStacked.Item>Second item</SectionIntroStacked.Item>
          <SectionIntroStacked.Item>Third item</SectionIntroStacked.Item>
        </SectionIntroStacked.Items>
      </SectionIntroStacked>,
    )

    const listItems = getAllByRole('listitem')
    expect(listItems).toHaveLength(3)

    for (const item of listItems) {
      expect(item).toHaveClass('SectionIntroStackedItem-item')
    }
  })

  it('renders item content correctly', () => {
    const itemText = 'Feature description with details'
    const {getByText} = render(
      <SectionIntroStacked>
        <SectionIntroStacked.Heading>Test heading</SectionIntroStacked.Heading>
        <SectionIntroStacked.Link href="#">Test link</SectionIntroStacked.Link>
        <SectionIntroStacked.Items>
          <SectionIntroStacked.Item>{itemText}</SectionIntroStacked.Item>
        </SectionIntroStacked.Items>
      </SectionIntroStacked>,
    )

    const itemEl = getByText(itemText)
    expect(itemEl).toBeInTheDocument()
    expect(itemEl).toHaveClass('SectionIntroStackedItem__item-text')
  })

  it('renders default color text when no <b> or <em> is used', () => {
    const mockItemText = 'Feature description without emphasis'
    const {getByText} = render(
      <SectionIntroStacked>
        <SectionIntroStacked.Heading>Test heading</SectionIntroStacked.Heading>
        <SectionIntroStacked.Link href="#">Test link</SectionIntroStacked.Link>
        <SectionIntroStacked.Items>
          <SectionIntroStacked.Item>{mockItemText}</SectionIntroStacked.Item>
        </SectionIntroStacked.Items>
      </SectionIntroStacked>,
    )

    const itemEl = getByText(mockItemText)
    expect(itemEl).toHaveClass('Text--default')
    expect(itemEl).not.toHaveClass('SectionIntroStackedItem__item-text--muted')
  })

  it('renders muted color text when <b> is used', () => {
    const {getByText} = render(
      <SectionIntroStacked>
        <SectionIntroStacked.Heading>Test heading</SectionIntroStacked.Heading>
        <SectionIntroStacked.Link href="#">Test link</SectionIntroStacked.Link>
        <SectionIntroStacked.Items>
          <SectionIntroStacked.Item>
            <b>Feature description</b> with emphasis
          </SectionIntroStacked.Item>
        </SectionIntroStacked.Items>
      </SectionIntroStacked>,
    )

    const itemEl = getByText('Feature description', {exact: false}).closest('span')
    expect(itemEl).toHaveClass('SectionIntroStackedItem__item-text--muted')
  })
})
