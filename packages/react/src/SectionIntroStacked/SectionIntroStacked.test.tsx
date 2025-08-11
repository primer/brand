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
    const expectedClass = 'StackedSectionIntro'
    const mockTestId = 'test'

    const {getByTestId} = render(
      <StackedSectionIntro data-testid={mockTestId}>
        <StackedSectionIntro.Heading>Where the most ambitious teams build great things</StackedSectionIntro.Heading>
        <StackedSectionIntro.Link href="#">Link</StackedSectionIntro.Link>
        <StackedSectionIntro.Items>
          <StackedSectionIntro.Item>
            <b>Feature one</b> with detailed description
          </StackedSectionIntro.Item>
          <StackedSectionIntro.Item>
            <b>Feature two</b> with detailed description
          </StackedSectionIntro.Item>
        </StackedSectionIntro.Items>
      </StackedSectionIntro>,
    )

    const StackedSectionIntroEl = getByTestId(mockTestId)
    expect(StackedSectionIntroEl.classList).toContain(expectedClass)
  })

  it('renders the correct default heading type', () => {
    const expectedTag = 'h2'
    const headingText = 'This is your heading'

    const {getByText} = render(
      <StackedSectionIntro>
        <StackedSectionIntro.Heading>{headingText}</StackedSectionIntro.Heading>
        <StackedSectionIntro.Link href="#">Call to action</StackedSectionIntro.Link>
        <StackedSectionIntro.Items>
          <StackedSectionIntro.Item>
            <b>Feature one</b> with detailed description
          </StackedSectionIntro.Item>
        </StackedSectionIntro.Items>
      </StackedSectionIntro>,
    )
    const ctaHeaderEl = getByText(headingText)
    expect(ctaHeaderEl.tagName).toBe(expectedTag.toUpperCase())
  })

  it('renders the correct heading level when an override is used', () => {
    const expectedTag = 'h3'
    const headingText = 'This is your heading'

    const {getByText} = render(
      <StackedSectionIntro>
        <StackedSectionIntro.Heading as={expectedTag}>{headingText}</StackedSectionIntro.Heading>
        <StackedSectionIntro.Link href="#">Call to action</StackedSectionIntro.Link>
        <StackedSectionIntro.Items>
          <StackedSectionIntro.Item>
            <b>Feature one</b> with detailed description
          </StackedSectionIntro.Item>
        </StackedSectionIntro.Items>
      </StackedSectionIntro>,
    )
    const ctaHeaderEl = getByText(headingText)
    expect(ctaHeaderEl.tagName).toBe(expectedTag.toUpperCase())
  })

  it('renders the heading correctly into the document', () => {
    const {getByText} = render(
      <StackedSectionIntro>
        <StackedSectionIntro.Heading>{mockHeading}</StackedSectionIntro.Heading>
        <StackedSectionIntro.Link href="#">Call to action</StackedSectionIntro.Link>
        <StackedSectionIntro.Items>
          <StackedSectionIntro.Item>
            <b>Feature one</b> with detailed description
          </StackedSectionIntro.Item>
        </StackedSectionIntro.Items>
      </StackedSectionIntro>,
    )

    const headingEl = getByText(mockHeading)

    expect(headingEl).toBeInTheDocument()
  })

  it('renders all elements correctly into the document', () => {
    const {getByText} = render(
      <StackedSectionIntro>
        <StackedSectionIntro.Heading>{mockHeading}</StackedSectionIntro.Heading>
        <StackedSectionIntro.Link href="#">{mockLinkText}</StackedSectionIntro.Link>
        <StackedSectionIntro.Items>
          <StackedSectionIntro.Item>
            <b>Feature one</b> with detailed description
          </StackedSectionIntro.Item>
        </StackedSectionIntro.Items>
      </StackedSectionIntro>,
    )

    const headingEl = getByText(mockHeading)
    const linkEl = getByText(mockLinkText)

    expect(headingEl).toBeInTheDocument()
    expect(linkEl).toBeInTheDocument()
  })

  test('renders the default color as muted if <b> or <em> is passed as a child', () => {
    const {getAllByRole} = render(
      <StackedSectionIntro>
        <StackedSectionIntro.Heading>
          <b>Expressive headline</b> about an exclusive set of features.
        </StackedSectionIntro.Heading>
        <StackedSectionIntro.Link href="#">Call to action</StackedSectionIntro.Link>
        <StackedSectionIntro.Items>
          <StackedSectionIntro.Item>
            <b>Feature one</b> with detailed description
          </StackedSectionIntro.Item>
        </StackedSectionIntro.Items>
      </StackedSectionIntro>,
    )

    const headingEls = getAllByRole('heading')

    for (const headingEl of headingEls) {
      expect(headingEl).toHaveClass(`StackedSectionIntro-heading--muted`)
    }
  })

  test('renders the default color as text-default if a non-<b> or non-<em> child is passed', () => {
    const {getByRole} = render(
      <StackedSectionIntro>
        <StackedSectionIntro.Heading>
          <span>Expressive headline</span> about an exclusive set of features.
        </StackedSectionIntro.Heading>
        <StackedSectionIntro.Link href="#">Call to action</StackedSectionIntro.Link>
        <StackedSectionIntro.Items>
          <StackedSectionIntro.Item>
            <b>Feature one</b> with detailed description
          </StackedSectionIntro.Item>
        </StackedSectionIntro.Items>
      </StackedSectionIntro>,
    )
    const headingEl = getByRole('heading')

    expect(headingEl).not.toHaveClass(`StackedSectionIntro-heading--muted`)
  })

  it('has no a11y violations', async () => {
    const {container} = render(
      <StackedSectionIntro>
        <StackedSectionIntro.Heading>{mockHeading}</StackedSectionIntro.Heading>
        <StackedSectionIntro.Link href="#">{mockLinkText}</StackedSectionIntro.Link>
        <StackedSectionIntro.Items>
          <StackedSectionIntro.Item>
            <b>Feature one</b> with detailed description
          </StackedSectionIntro.Item>
          <StackedSectionIntro.Item>
            <b>Feature two</b> with detailed description
          </StackedSectionIntro.Item>
        </StackedSectionIntro.Items>
      </StackedSectionIntro>,
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('renders the items as a semantic unordered list', () => {
    const {getByRole} = render(
      <StackedSectionIntro>
        <StackedSectionIntro.Heading>Test heading</StackedSectionIntro.Heading>
        <StackedSectionIntro.Link href="#">Test link</StackedSectionIntro.Link>
        <StackedSectionIntro.Items>
          <StackedSectionIntro.Item>First item</StackedSectionIntro.Item>
          <StackedSectionIntro.Item>Second item</StackedSectionIntro.Item>
        </StackedSectionIntro.Items>
      </StackedSectionIntro>,
    )

    const listEl = getByRole('list')
    expect(listEl).toHaveClass('StackedSectionIntro-items')
  })

  it('renders items as semantic list items', () => {
    const {getAllByRole} = render(
      <StackedSectionIntro>
        <StackedSectionIntro.Heading>Test heading</StackedSectionIntro.Heading>
        <StackedSectionIntro.Link href="#">Test link</StackedSectionIntro.Link>
        <StackedSectionIntro.Items>
          <StackedSectionIntro.Item>First item</StackedSectionIntro.Item>
          <StackedSectionIntro.Item>Second item</StackedSectionIntro.Item>
          <StackedSectionIntro.Item>Third item</StackedSectionIntro.Item>
        </StackedSectionIntro.Items>
      </StackedSectionIntro>,
    )

    const listItems = getAllByRole('listitem')
    expect(listItems).toHaveLength(3)

    for (const item of listItems) {
      expect(item).toHaveClass('StackedSectionIntroItem-item')
    }
  })

  it('renders item content correctly', () => {
    const itemText = 'Feature description with details'
    const {getByText} = render(
      <StackedSectionIntro>
        <StackedSectionIntro.Heading>Test heading</StackedSectionIntro.Heading>
        <StackedSectionIntro.Link href="#">Test link</StackedSectionIntro.Link>
        <StackedSectionIntro.Items>
          <StackedSectionIntro.Item>{itemText}</StackedSectionIntro.Item>
        </StackedSectionIntro.Items>
      </StackedSectionIntro>,
    )

    const itemEl = getByText(itemText)
    expect(itemEl).toBeInTheDocument()
    expect(itemEl).toHaveClass('StackedSectionIntroItem__item-text')
  })

  it('renders default color text when no <b> or <em> is used', () => {
    const mockItemText = 'Feature description without emphasis'
    const {getByText} = render(
      <StackedSectionIntro>
        <StackedSectionIntro.Heading>Test heading</StackedSectionIntro.Heading>
        <StackedSectionIntro.Link href="#">Test link</StackedSectionIntro.Link>
        <StackedSectionIntro.Items>
          <StackedSectionIntro.Item>{mockItemText}</StackedSectionIntro.Item>
        </StackedSectionIntro.Items>
      </StackedSectionIntro>,
    )

    const itemEl = getByText(mockItemText)
    expect(itemEl).toHaveClass('Text--default')
    expect(itemEl).not.toHaveClass('StackedSectionIntroItem__item-text--muted')
  })

  it('renders muted color text when <b> is used', () => {
    const {getByText} = render(
      <StackedSectionIntro>
        <StackedSectionIntro.Heading>Test heading</StackedSectionIntro.Heading>
        <StackedSectionIntro.Link href="#">Test link</StackedSectionIntro.Link>
        <StackedSectionIntro.Items>
          <StackedSectionIntro.Item>
            <b>Feature description</b> with emphasis
          </StackedSectionIntro.Item>
        </StackedSectionIntro.Items>
      </StackedSectionIntro>,
    )

    const itemEl = getByText('Feature description', {exact: false}).closest('span')
    expect(itemEl).toHaveClass('StackedSectionIntroItem__item-text--muted')
  })
})
